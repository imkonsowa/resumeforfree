import { execFile } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { availableParallelism, tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { promisify } from 'node:util';
import sharp from 'sharp';
import { getTemplate } from '#layers/core/app/templates';
import { defaultResumeData, defaultResumeSettings, getDefaultFontForLanguage } from '#layers/core/app/types/resume';
import type { ResumeData } from '#layers/core/app/types/resume';
import { isRtlLocale } from '#layers/core/app/utils/localeDirection';
import { TEMPLATE_LAYOUTS, TEMPLATE_LOCALES, templatePresetSchema, templateSettingsFor } from '../shared/utils/professionTemplates';
import type { TemplatePreset } from '../shared/utils/professionTemplates';
import { previewInputHash, templatePageTitle } from './templatePreviewHash';

const ROOT = resolve(__dirname, '..');
const TEMPLATES_DIR = resolve(ROOT, 'content/templates');
const OUT_DIR = resolve(ROOT, 'public/template-previews');
const FONTS_DIR = resolve(ROOT, 'layers/core/public/fonts');
const MANIFEST_PATH = resolve(OUT_DIR, 'manifest.json');

const DETAIL_PPI = 100;
const THUMB_WIDTH = 413;
const WEBP_QUALITY = 75;
const SCRIPT_FONT_DIRS: Record<string, string> = { ar: 'ar', ur: 'ar', zh: 'zh', hi: 'hi' };
const PREVIEW_FILES = [...TEMPLATE_LAYOUTS.map(layout => `${layout}.webp`), 'thumb.webp', 'og.png', 'sample.pdf'];

type Dict = Record<string, unknown>;

interface Job {
    slug: string;
    locale: string;
    templateDir: string;
    preset: TemplatePreset;
}

const exec = promisify(execFile);

const readJson = <T>(path: string): T => JSON.parse(readFileSync(path, 'utf8')) as T;

const mergeDeep = (base: Dict, override: Dict): Dict => {
    const merged: Dict = { ...base };
    for (const [key, value] of Object.entries(override)) {
        const existing = merged[key];
        merged[key] = value && typeof value === 'object' && existing && typeof existing === 'object'
            ? mergeDeep(existing as Dict, value as Dict)
            : value;
    }
    return merged;
};

const translator = (locale: string) => {
    const messages = mergeDeep(
        readJson<Dict>(resolve(ROOT, 'layers/core/i18n/locales', `${locale}.json`)),
        readJson<Dict>(resolve(ROOT, 'i18n/locales', `${locale}.json`)),
    );
    return (key: string): string => {
        const value = key.split('.').reduce<unknown>((node, part) => (node as Dict | undefined)?.[part], messages);
        return typeof value === 'string' ? value : key;
    };
};

const fontArgs = (locale: string) => ['en', SCRIPT_FONT_DIRS[locale]]
    .filter(Boolean)
    .flatMap(dir => ['--font-path', resolve(FONTS_DIR, dir!)]);

const typst = (locale: string, args: string[]) =>
    exec('typst', [...args, ...fontArgs(locale), '--ignore-system-fonts'], { maxBuffer: 16 * 1024 * 1024 });

const toWebp = (png: string, webp: string, width?: number) =>
    sharp(png).resize(width ? { width } : undefined).webp({ quality: WEBP_QUALITY }).toFile(webp);

const typstString = (value: string) => `"${value.replaceAll('\\', '\\\\').replaceAll('"', '\\"')}"`;

const scoped = (id: string, markup: string) => `#pagebreak(weak: true)
#[
#context [#metadata((id: "${id}", page: here().page())) <doc-start>]
${markup}
]`;

const ogMarkup = (title: string, font: string, rtl: boolean, previewPng: string) => `#set page(width: 1200pt, height: 630pt, margin: 0pt, fill: rgb("#eef2f9"))
#set text(font: ("${font}", "Calibri"), fill: rgb("#111827")${rtl ? ', dir: rtl' : ''})
#grid(
  columns: (1fr, 460pt),
  [#pad(x: 70pt, y: 90pt)[
    #text(size: 60pt, weight: "bold", ${typstString(title)})
    #v(28pt)
    #text(size: 30pt, fill: rgb("#1d4ed8"))[resumeforfree.com]
  ]],
  [#pad(top: 60pt, right: 60pt)[#box(stroke: 1pt + rgb("#d1d5db"), image("${previewPng}", width: 400pt))]],
)`;

const inPool = async <T>(items: T[], work: (item: T) => Promise<unknown>) => {
    const queue = [...items];
    await Promise.all(Array.from({ length: Math.min(availableParallelism(), queue.length) }, async () => {
        for (let item = queue.shift(); item !== undefined; item = queue.shift()) await work(item);
    }));
};

const renderDocument = async (locale: string, workDir: string, source: string, output: string, ppi: string) => {
    const [{ stdout }] = await Promise.all([
        typst(locale, ['query', '--root', workDir, source, '<doc-start>', '--field', 'value']),
        typst(locale, ['compile', '--root', workDir, '--ppi', ppi, source, output]),
    ]);
    const starts = JSON.parse(stdout) as Array<{ id: string; page: number }>;
    return new Map(starts.map(({ id, page }) => [id, output.replace('{p}', String(page))]));
};

const renderLocale = async (locale: string, jobs: Job[], workDir: string): Promise<Array<() => Promise<unknown>>> => {
    const t = translator(locale);
    const font = getDefaultFontForLanguage(locale);
    const dir = join(workDir, locale);
    mkdirSync(dir, { recursive: true });

    const resumes: string[] = [];
    const samples = new Map<string, string>();
    for (const job of jobs) {
        const data = { ...defaultResumeData, ...readJson<ResumeData>(join(job.templateDir, `${locale}.json`)) };
        for (const layout of TEMPLATE_LAYOUTS) {
            const markup = getTemplate(layout).parse({
                data,
                settings: { ...defaultResumeSettings, selectedFont: font, ...templateSettingsFor(job.preset, locale), selectedTemplate: layout },
                locale,
                t,
            });
            resumes.push(scoped(`${job.slug}/${layout}`, markup));
            if (layout === job.preset.layout) samples.set(job.slug, markup);
        }
    }
    writeFileSync(join(dir, 'resumes.typ'), resumes.join('\n'));
    const pages = await renderDocument(locale, workDir, join(dir, 'resumes.typ'), join(dir, 'page-{p}.png'), String(DETAIL_PPI));

    writeFileSync(join(dir, 'og.typ'), jobs.map((job) => {
        const title = templatePageTitle(readFileSync(join(job.templateDir, `${locale}.md`), 'utf8'));
        const preview = pages.get(`${job.slug}/${job.preset.layout}`)!.replace(workDir, '');
        return scoped(job.slug, ogMarkup(title, font, isRtlLocale(locale), preview));
    }).join('\n'));
    const ogImages = await renderDocument(locale, workDir, join(dir, 'og.typ'), join(dir, 'og-{p}.png'), '72');

    return jobs.flatMap((job) => {
        const outDir = resolve(OUT_DIR, locale, job.slug);
        const page = (layout: string) => pages.get(`${job.slug}/${layout}`)!;
        const sampleSource = join(dir, `${job.slug}.typ`);
        const creationTimestamp = String(Date.parse(job.preset.updatedAt) / 1000);
        mkdirSync(outDir, { recursive: true });
        writeFileSync(sampleSource, samples.get(job.slug)!);
        copyFileSync(ogImages.get(job.slug)!, join(outDir, 'og.png'));
        return [
            ...TEMPLATE_LAYOUTS.map(layout => () => toWebp(page(layout), join(outDir, `${layout}.webp`))),
            () => toWebp(page(job.preset.layout), join(outDir, 'thumb.webp'), THUMB_WIDTH),
            () => typst(locale, ['compile', '--root', workDir, '--creation-timestamp', creationTimestamp, sampleSource, join(outDir, 'sample.pdf')]),
        ];
    });
};

const isUpToDate = (manifest: Record<string, string>, job: Job) =>
    manifest[`${job.locale}/${job.slug}`] === previewInputHash(job.templateDir, job.locale)
    && PREVIEW_FILES.every(file => existsSync(resolve(OUT_DIR, job.locale, job.slug, file)));

const main = async () => {
    const args = process.argv.slice(2);
    const force = args.includes('--force');
    const only = args.filter(arg => !arg.startsWith('--'));
    const locales = process.env.TEMPLATE_LOCALES?.split(',') ?? TEMPLATE_LOCALES;
    const manifest: Record<string, string> = existsSync(MANIFEST_PATH) ? readJson(MANIFEST_PATH) : {};
    const workDir = mkdtempSync(join(tmpdir(), 'template-previews-'));
    try {
        const jobs: Job[] = readdirSync(TEMPLATES_DIR, { withFileTypes: true })
            .filter(entry => entry.isDirectory() && (!only.length || only.includes(entry.name)))
            .flatMap((entry) => {
                const templateDir = join(TEMPLATES_DIR, entry.name);
                const preset = templatePresetSchema.parse(readJson(join(templateDir, 'template.json')));
                return locales
                    .filter(locale => existsSync(join(templateDir, `${locale}.json`)) && existsSync(join(templateDir, `${locale}.md`)))
                    .map(locale => ({ slug: entry.name, templateDir, preset, locale }));
            })
            .filter(job => force || !isUpToDate(manifest, job));

        const byLocale = Map.groupBy(jobs, job => job.locale);
        const tasks = await Promise.all([...byLocale].map(([locale, localeJobs]) => renderLocale(locale, localeJobs, workDir)));
        await inPool(tasks.flat(), task => task());

        for (const job of jobs) manifest[`${job.locale}/${job.slug}`] = previewInputHash(job.templateDir, job.locale);
        console.log(jobs.length ? `${jobs.length} previews rendered` : 'Previews are up to date. Use --force after renderer changes.');

        const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
        writeFileSync(MANIFEST_PATH, `${JSON.stringify(sorted, null, 4)}\n`);
    }
    finally {
        rmSync(workDir, { recursive: true, force: true });
    }
};

await main();
