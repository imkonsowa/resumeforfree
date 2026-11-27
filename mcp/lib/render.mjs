// Headless version of layers/core/app/composables/useResumeGenerator.ts: same templates,
// same translations, same font files, compiled with the native build of the same Typst release.
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { NodeCompiler } from '@myriaddreamin/typst-ts-node-compiler';
import { Resvg } from '@resvg/resvg-js';
import { APP_ROOT } from './config.mjs';
import { templatesModule } from './core.mjs';

const readJson = path => JSON.parse(readFileSync(path, 'utf8'));

const mergeDeep = (base, override) => {
    const merged = { ...base };
    for (const [key, value] of Object.entries(override)) {
        const existing = merged[key];
        merged[key] = value && typeof value === 'object' && existing && typeof existing === 'object'
            ? mergeDeep(existing, value)
            : value;
    }
    return merged;
};

const translator = (locale) => {
    const messages = mergeDeep(
        readJson(join(APP_ROOT, 'layers/core/i18n/locales', `${locale}.json`)),
        readJson(join(APP_ROOT, 'i18n/locales', `${locale}.json`)),
    );
    return (key) => {
        const value = key.split('.').reduce((node, part) => node?.[part], messages);
        return typeof value === 'string' ? value : key;
    };
};

let fontBlobs = null;
const loadFonts = () => {
    if (!fontBlobs) {
        const publicDir = join(APP_ROOT, 'layers/core/public');
        fontBlobs = readJson(join(publicDir, 'fonts/manifest.json'))
            .map(entry => readFileSync(join(publicDir, entry.url)));
    }
    return fontBlobs;
};

export const toTypst = resume => templatesModule.getTemplate(resume.settings.selectedTemplate).parse({
    data: resume.data,
    settings: resume.settings,
    locale: resume.language,
    t: translator(resume.language),
});

const compile = (resume, photoBytes, use) => {
    const workspace = mkdtempSync(join(tmpdir(), 'rff-mcp-'));
    try {
        // Templates reference the photo as "/photo", relative to the Typst root.
        if (photoBytes) writeFileSync(join(workspace, 'photo'), photoBytes);
        const compiler = NodeCompiler.create({ workspace, fontArgs: [{ fontBlobs: loadFonts() }] });
        const result = compiler.compile({ mainFileContent: toTypst(resume) });
        if (result.hasError()) {
            const diagnostics = result.takeError() ?? result.takeDiagnostics();
            const details = diagnostics
                ? compiler.fetchDiagnostics(diagnostics).map(d => d.message ?? JSON.stringify(d)).join('; ')
                : 'unknown error';
            throw new Error(`Typst could not compile this resume: ${details}`);
        }
        return use(compiler, result.result);
    }
    finally {
        rmSync(workspace, { recursive: true, force: true });
    }
};

export const renderPdf = (resume, photoBytes) => compile(resume, photoBytes, (compiler, document) => ({
    pdf: compiler.pdf(document),
    pages: document.numOfPages,
}));

/** Renders each page to a PNG of the given pixel width. */
export const renderPngPages = (resume, photoBytes, { width = 1000, pages } = {}) =>
    compile(resume, photoBytes, (compiler, document) => {
        const total = document.numOfPages;
        // Typst emits all pages stacked in one SVG; each page is a window into it.
        const stacked = compiler.plainSvg(document);
        const root = stacked.match(/<svg\b[^>]*>/)[0];
        const [, , fullWidth, fullHeight] = root.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
        const pageHeight = fullHeight / total;
        // typst.ts 0.7.0 leaves every page's background (the top-level paths) at y=0, where
        // the later ones hide page 1. Move each down to its own page.
        let backgrounds = 0;
        const svg = stacked.replace(/^ {4}<path class="typst-shape"/gm, match =>
            `${match} transform="translate(0 ${backgrounds++ * pageHeight})"`);
        const wanted = (pages?.length ? pages : Array.from({ length: total }, (_, i) => i + 1))
            .filter(page => page >= 1 && page <= total);

        const images = wanted.map((page) => {
            const pageRoot = root
                .replace(/viewBox="[^"]+"/, `viewBox="0 ${(page - 1) * pageHeight} ${fullWidth} ${pageHeight}"`)
                .replace(/\bwidth="[^"]+"/, `width="${fullWidth}"`)
                .replace(/\bheight="[^"]+"/, `height="${pageHeight}"`);
            const png = new Resvg(svg.replace(root, pageRoot), {
                fitTo: { mode: 'width', value: width },
                background: 'white',
                font: { loadSystemFonts: false },
            }).render().asPng();
            return { page, png };
        });
        return { images, totalPages: total };
    });
