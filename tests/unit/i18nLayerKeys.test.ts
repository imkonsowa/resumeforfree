import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const LOCALES = ['en', 'ar', 'tr', 'fr', 'de', 'it', 'zh', 'ur', 'hi'] as const;

const flatten = (obj: Record<string, unknown>, prefix = ''): Record<string, unknown> =>
    Object.entries(obj).reduce<Record<string, unknown>>((acc, [key, value]) => {
        const path = prefix ? `${prefix}.${key}` : key;
        if (value && typeof value === 'object') Object.assign(acc, flatten(value as Record<string, unknown>, path));
        else acc[path] = value;
        return acc;
    }, {});

const load = (dir: string, locale: string) =>
    flatten(JSON.parse(readFileSync(resolve(__dirname, `../../${dir}/${locale}.json`), 'utf8')));

describe('core layer locale keys', () => {
    const coreEn = Object.keys(load('layers/core/i18n/locales', 'en')).sort();

    it('defines the renderer keys', () => {
        expect(coreEn.length).toBe(23);
    });

    it.each(LOCALES)('%s has the same non-empty core keys as en', (locale) => {
        const core = load('layers/core/i18n/locales', locale);
        expect(Object.keys(core).sort()).toEqual(coreEn);
        for (const [key, value] of Object.entries(core)) {
            expect(typeof value === 'string' && value.trim().length > 0, `${locale}: ${key}`).toBe(true);
        }
    });

    it.each(LOCALES)('%s defines no core key in the site locale file', (locale) => {
        const site = load('i18n/locales', locale);
        expect(coreEn.filter(key => key in site)).toEqual([]);
    });
});
