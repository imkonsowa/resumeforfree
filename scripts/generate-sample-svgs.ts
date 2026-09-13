import { readFileSync, writeFileSync, unlinkSync, statSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { execSync } from 'node:child_process';
import { compactTemplate } from '../app/templates/compact';
import type { ResumeData } from '../app/types/resume';

const ROOT = resolve(__dirname, '..');
const SAMPLES_DIR = resolve(ROOT, 'scripts/sample-resumes');
const LOCALES_DIR = resolve(ROOT, 'i18n/locales');
const PUBLIC_DIR = resolve(ROOT, 'public');
const FONTS_DIR = resolve(ROOT, 'public/fonts');

const LOCALES = ['en', 'ar', 'de', 'it', 'zh', 'ur', 'hi', 'fr', 'tr'] as const;

// Fonts optimized for each language family with clean rendering
const FONT_MAP: Record<string, string> = {
    en: 'Calibri',
    de: 'Calibri',
    it: 'Calibri',
    fr: 'Calibri',
    tr: 'Calibri',
    ar: 'Noto Naskh Arabic',
    ur: 'Noto Naskh Arabic',
    zh: 'Heiti SC',
    hi: 'Kohinoor Devanagari',
};

const getTranslator = (localeDict: Record<string, unknown>) => {
    return (key: string): string => {
        const parts = key.split('.');
        let cur: unknown = localeDict;
        for (const p of parts) {
            if (cur && typeof cur === 'object' && p in cur) {
                cur = (cur as Record<string, unknown>)[p];
            }
            else {
                return key;
            }
        }
        return typeof cur === 'string' ? cur : key;
    };
};

async function generateSampleSvgs() {
    console.log('🚀 Generating localized sample resume SVGs...\n');

    for (const locale of LOCALES) {
        const resumePath = resolve(SAMPLES_DIR, `${locale}.json`);
        const localePath = resolve(LOCALES_DIR, `${locale}.json`);
        const outSvgPath = resolve(PUBLIC_DIR, `sample-resume-${locale}.svg`);
        const tmpTypPath = resolve(SAMPLES_DIR, `.tmp-${locale}.typ`);

        if (!existsSync(resumePath)) {
            console.error(`❌ Missing sample resume for ${locale} at ${resumePath}`);
            continue;
        }

        const resumeData = JSON.parse(readFileSync(resumePath, 'utf8')) as ResumeData;
        const localeDict = JSON.parse(readFileSync(localePath, 'utf8')) as Record<string, unknown>;
        const t = getTranslator(localeDict);
        const font = FONT_MAP[locale] || 'Calibri';

        const typstContent = compactTemplate.parse({
            data: resumeData,
            font,
            locale,
            fontSize: 11.5,
            photoShape: 'rectangle',
            showSectionHeaderLine: true,
            t,
        });

        writeFileSync(tmpTypPath, typstContent, 'utf8');

        try {
            execSync(
                `typst compile --font-path "${FONTS_DIR}" --pages 1 --format svg "${tmpTypPath}" "${outSvgPath}"`,
                { stdio: 'pipe' },
            );
            const size = statSync(outSvgPath).size;
            console.log(`✅ [${locale.padEnd(2)}] Generated ${outSvgPath.split('/').pop()} (${(size / 1024).toFixed(1)} KB)`);
        }
        catch (err: unknown) {
            console.error(`❌ Failed to compile SVG for ${locale}:`, err);
        }
        finally {
            if (existsSync(tmpTypPath)) {
                unlinkSync(tmpTypPath);
            }
        }
    }

    console.log('\n🎉 All localized sample resume SVGs successfully generated!');
}

generateSampleSvgs().catch(console.error);
