import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { generateLanguagesContent } from '#layers/core/app/utils/templateRenderers';
import { escapeTypstText } from '#layers/core/app/utils/stringUtils';

const LOCALES = ['en', 'ar', 'tr', 'fr', 'de', 'it', 'zh', 'ur', 'hi'] as const;
const LEVELS = ['Native', 'Fluent', 'Proficient', 'Conversational', 'Basic', 'Beginner'] as const;

const loadProficiency = (locale: string): Record<string, string> =>
    JSON.parse(readFileSync(resolve(__dirname, `../../i18n/locales/${locale}.json`), 'utf8')).proficiency;

describe('proficiency labels', () => {
    it.each(LOCALES)('renders every level translated in %s', (locale) => {
        const labels = loadProficiency(locale);
        const t = (key: string) => labels[key.replace('proficiency.', '')] ?? key;
        for (const level of LEVELS) {
            const label = labels[level.toLowerCase()];
            expect(label, `${locale}: proficiency.${level.toLowerCase()}`).toBeTruthy();
            const [item] = generateLanguagesContent([{ name: 'Language', proficiency: level }], t);
            expect(item?.content).toBe(`*Language* - ${escapeTypstText(label ?? '')}`);
        }
    });
});
