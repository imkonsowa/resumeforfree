import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
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
const THUMB_PPI = 50;
const WEBP_QUALITY = '75';

type Dict = Record<string, unknown>;

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

const typst = (args: string[]) => execFileSync('typst', [...args, '--font-path', FONTS_DIR], { stdio: 'pipe' });
const toWebp = (png: string, webp: string) => execFileSync('cwebp', ['-quiet', '-q', WEBP_QUALITY, png, '-o', webp]);

const typstString = (value: string) => `"${value.replaceAll('\\', '\\\\').replaceAll('"', '\\"')}"`;

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

const renderLocale = (slug: string, templateDir: string, preset: TemplatePreset, locale: string, workDir: string) => {
    const outDir = resolve(OUT_DIR, locale, slug);
    mkdirSync(outDir, { recursive: true });
    const sample = readJson<ResumeData>(join(templateDir, `${locale}.json`));
    const data = { ...defaultResumeData, ...sample };
    const t = translator(locale);
    const font = getDefaultFontForLanguage(locale);

    for (const layout of TEMPLATE_LAYOUTS) {
        const markup = getTemplate(layout).parse({
            data,
            settings: { ...defaultResumeSettings, selectedFont: font, ...templateSettingsFor(preset, locale), selectedTemplate: layout },
            locale,
            t,
        });
        const source = join(workDir, `${locale}-${slug}-${layout}.typ`);
        writeFileSync(source, markup);
        const png = join(workDir, `${locale}-${slug}-${layout}.png`);
        typst(['compile', '--root', workDir, '--pages', '1', '--ppi', String(DETAIL_PPI), source, png]);
        toWebp(png, join(outDir, `${layout}.webp`));

        if (layout === preset.layout) {
            const thumbPng = join(workDir, `${locale}-${slug}-thumb.png`);
            typst(['compile', '--root', workDir, '--pages', '1', '--ppi', String(THUMB_PPI), source, thumbPng]);
            toWebp(thumbPng, join(outDir, 'thumb.webp'));
            typst(['compile', '--root', workDir, source, join(outDir, 'sample.pdf')]);

            const ogSource = join(workDir, `${locale}-${slug}-og.typ`);
            const title = templatePageTitle(readFileSync(join(templateDir, `${locale}.md`), 'utf8'));
            writeFileSync(ogSource, ogMarkup(title, font, isRtlLocale(locale), `/${locale}-${slug}-${layout}.png`));
            typst(['compile', '--root', workDir, '--ppi', '72', ogSource, join(outDir, 'og.png')]);
        }
    }
};

const run = () => {
    const only = process.argv.slice(2);
    const locales = process.env.TEMPLATE_LOCALES?.split(',') ?? TEMPLATE_LOCALES;
    const manifest: Record<string, string> = existsSync(MANIFEST_PATH) ? readJson(MANIFEST_PATH) : {};
    const workDir = mkdtempSync(join(tmpdir(), 'template-previews-'));
    try {
        const slugs = readdirSync(TEMPLATES_DIR, { withFileTypes: true })
            .filter(entry => entry.isDirectory() && (!only.length || only.includes(entry.name)))
            .map(entry => entry.name);
        for (const slug of slugs) {
            const templateDir = join(TEMPLATES_DIR, slug);
            const preset = templatePresetSchema.parse(readJson(join(templateDir, 'template.json')));
            for (const locale of locales) {
                if (!existsSync(join(templateDir, `${locale}.json`)) || !existsSync(join(templateDir, `${locale}.md`))) continue;
                renderLocale(slug, templateDir, preset, locale, workDir);
                manifest[`${locale}/${slug}`] = previewInputHash(templateDir, locale);
                console.log(`rendered ${locale}/${slug}`);
            }
        }
        const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
        writeFileSync(MANIFEST_PATH, `${JSON.stringify(sorted, null, 4)}\n`);
    }
    finally {
        rmSync(workDir, { recursive: true, force: true });
    }
};

run();
