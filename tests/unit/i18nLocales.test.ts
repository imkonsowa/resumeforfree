import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { availableFonts, getFontsForLanguage } from '~/types/resume';
import { isRtlLocale, getLocaleDirection } from '~/composables/useLocale';
import { getOgLocale } from '~/composables/useSEO';

const root = resolve(__dirname, '../..');
const localesDir = resolve(root, 'i18n/locales');

const ALL_LOCALES = ['en', 'ar', 'tr', 'fr', 'de', 'it', 'zh', 'ur', 'hi'] as const;
const NEW_LOCALES = ['de', 'it', 'zh', 'ur', 'hi'] as const;

type NestedObject = { [key: string]: string | NestedObject };

const flattenKeys = (obj: NestedObject, prefix = ''): Record<string, string> => {
    const res: Record<string, string> = {};
    for (const [key, value] of Object.entries(obj)) {
        const fullPath = prefix ? `${prefix}.${key}` : key;
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            Object.assign(res, flattenKeys(value as NestedObject, fullPath));
        }
        else if (typeof value === 'string') {
            res[fullPath] = value;
        }
    }
    return res;
};

const extractPlaceholders = (str: string): string[] => {
    const matches = str.match(/\{[a-zA-Z0-9_]+\}/g);
    return matches ? matches.sort() : [];
};

describe('i18n Locale System', () => {
    const enRaw = JSON.parse(readFileSync(resolve(localesDir, 'en.json'), 'utf8'));
    const flatEn = flattenKeys(enRaw);
    const enKeys = Object.keys(flatEn).sort();

    it('has valid JSON files for all 9 locales', () => {
        for (const locale of ALL_LOCALES) {
            const filePath = resolve(localesDir, `${locale}.json`);
            expect(existsSync(filePath), `Missing locale file: ${filePath}`).toBe(true);
            const content = readFileSync(filePath, 'utf8');
            expect(() => JSON.parse(content), `Invalid JSON in ${locale}.json`).not.toThrow();
        }
    });

    it('en.json has 669 leaf keys', () => {
        expect(enKeys.length).toBe(669);
    });

    describe.each(NEW_LOCALES)('locale "%s" parity with en.json', (locale) => {
        const raw = JSON.parse(readFileSync(resolve(localesDir, `${locale}.json`), 'utf8'));
        const flatTarget = flattenKeys(raw);
        const targetKeys = Object.keys(flatTarget).sort();

        it(`has exactly identical keys to en.json (no missing, no extra)`, () => {
            const missing = enKeys.filter(k => !(k in flatTarget));
            const extra = targetKeys.filter(k => !(k in flatEn));

            expect(missing, `Missing keys in ${locale}.json`).toEqual([]);
            expect(extra, `Extra keys in ${locale}.json`).toEqual([]);
            expect(targetKeys.length).toBe(enKeys.length);
        });

        it(`contains non-empty string values for all keys`, () => {
            for (const [key, value] of Object.entries(flatTarget)) {
                expect(typeof value, `Key ${key} in ${locale} is not string`).toBe('string');
                expect(value.trim().length, `Key ${key} in ${locale} is empty`).toBeGreaterThan(0);
            }
        });

        it(`preserves critical interpolation parameters from en.json`, () => {
            for (const key of enKeys) {
                const enVal = flatEn[key] ?? '';
                const tarVal = flatTarget[key] ?? '';
                const enParams = extractPlaceholders(enVal);
                const tarParams = extractPlaceholders(tarVal);

                for (const param of enParams) {
                    if (['{countPlural}', '{remainingPlural}', '{plural}'].includes(param)) {
                        continue;
                    }
                    expect(
                        tarParams.includes(param),
                        `Missing placeholder ${param} in ${locale}.${key}. EN="${enVal}" vs TARGET="${tarVal}"`,
                    ).toBe(true);
                }
            }
        });
    });

    describe('RTL & Locale Configuration', () => {
        it('recognizes Urdu (ur) as RTL and other new languages as LTR', () => {
            expect(isRtlLocale('ur')).toBe(true);
            expect(getLocaleDirection('ur')).toBe('rtl');

            expect(isRtlLocale('de')).toBe(false);
            expect(getLocaleDirection('de')).toBe('ltr');

            expect(isRtlLocale('it')).toBe(false);
            expect(getLocaleDirection('it')).toBe('ltr');

            expect(isRtlLocale('zh')).toBe(false);
            expect(getLocaleDirection('zh')).toBe('ltr');

            expect(isRtlLocale('hi')).toBe(false);
            expect(getLocaleDirection('hi')).toBe('ltr');
        });

        it('maps Urdu font resolution to Arabic script fonts in availableFonts', () => {
            const urFonts = getFontsForLanguage('ur');
            expect(urFonts).toEqual(availableFonts.ar);
            expect(urFonts.some(f => f.family === 'Noto Naskh Arabic')).toBe(true);
        });
    });

    describe('Public Sample Resume SVGs', () => {
        it.each(ALL_LOCALES)('has sample-resume-%s.svg in public directory', (locale) => {
            const svgPath = resolve(root, `public/sample-resume-${locale}.svg`);
            expect(existsSync(svgPath), `Missing ${svgPath}`).toBe(true);
        });
    });

    describe('SEO & OpenGraph Locale Mapping', () => {
        it.each(ALL_LOCALES)('returns valid OpenGraph locale for %s', (locale) => {
            const ogLocale = getOgLocale(locale);
            expect(ogLocale).toMatch(/^[a-z]{2}_[A-Z]{2}$/);
        });
    });
});
