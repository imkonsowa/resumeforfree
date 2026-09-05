import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const FONT_FILES = [
    'roboto-regular.ttf',
    'roboto-bold.ttf',
    'calibri-regular.ttf',
    'calibri-bold.ttf',
    'geist-regular.ttf',
    'geist-bold.ttf',
    'ar/noto-naskh-regular.ttf',
    'ar/noto-naskh-bold.ttf',
    'ar/cairo-regular.ttf',
    'ar/cairo-bold.ttf',
    'ar/amiri-regular.ttf',
    'ar/amiri-bold.ttf',
    'ar/plex-sans-arabic-regular.ttf',
    'ar/plex-sans-arabic-bold.ttf',
    'ar/tajawal-regular.ttf',
    'ar/tajawal-bold.ttf',
];

const wasmPath = resolve(root, 'node_modules/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm');
const mod = await import('@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler.mjs');
await mod.default({ module_or_path: readFileSync(wasmPath) });

const entries = FONT_FILES.map((file) => {
    const path = resolve(root, 'public/fonts', file);
    const buffer = new Uint8Array(readFileSync(path));
    const { info, conditions } = mod.get_font_info(buffer);
    return {
        url: `/fonts/${file}`,
        bytes: statSync(path).size,
        info,
        conditions,
    };
});

const out = resolve(root, 'public/fonts/manifest.json');
writeFileSync(out, JSON.stringify(entries));

const manifestKb = (statSync(out).size / 1024).toFixed(1);
const fontsKb = (entries.reduce((n, e) => n + e.bytes, 0) / 1024).toFixed(0);
console.log(`font manifest: ${entries.length} fonts, manifest ${manifestKb} KB, deferred payload ${fontsKb} KB`);
for (const e of entries) {
    console.log(`  ${e.info[0].family} ${e.info[0].variant.weight} -> ${e.url}`);
}
