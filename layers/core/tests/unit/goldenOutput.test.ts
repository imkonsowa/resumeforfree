import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createI18n } from 'vue-i18n';
import { getTemplate, getTemplateList } from '#layers/core/app/templates';
import { getDefaultFontForLanguage, resolveFontFamily } from '#layers/core/app/types/resume';
import type { ResumeData } from '#layers/core/app/types/resume';
import { testResumes } from '../fixtures/resumes';

const LOCALES = ['en', 'ar', 'tr', 'fr', 'de', 'it', 'zh', 'ur', 'hi'] as const;

const messages = Object.fromEntries(
    LOCALES.map(locale => [
        locale,
        JSON.parse(readFileSync(resolve(__dirname, `../../i18n/locales/${locale}.json`), 'utf8')),
    ]),
);

const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages,
    missingWarn: false,
    fallbackWarn: false,
});

const scopedT = (locale: string) => (key: string) => i18n.global.t(key, 1, { locale });

const SETTINGS_VARIANTS = {
    defaults: { fontSize: 12, photoShape: 'rectangle', showSectionHeaderLine: true },
    alternate: { fontSize: 10, photoShape: 'circle', showSectionHeaderLine: false },
} as const;

const fixtures: Record<string, ResumeData> = {
    ...testResumes,
    withPhoto: { ...testResumes.full, photo: { source: 'r2', url: 'https://example.com/photo.jpg' } },
};

const render = (templateId: string, locale: string): string => {
    const template = getTemplate(templateId);
    const sections: string[] = [];
    for (const [variantName, variant] of Object.entries(SETTINGS_VARIANTS)) {
        for (const [fixtureName, data] of Object.entries(fixtures)) {
            const markup = template.parse({
                data,
                font: resolveFontFamily(getDefaultFontForLanguage(locale), locale),
                locale,
                fontSize: variant.fontSize,
                photoShape: variant.photoShape,
                showSectionHeaderLine: variant.showSectionHeaderLine,
                t: scopedT(locale),
            });
            sections.push(`// ===== ${templateId} | ${locale} | ${variantName} | ${fixtureName} =====\n${markup}`);
        }
    }
    return `${sections.join('\n\n')}\n`;
};

describe('golden Typst output', () => {
    for (const template of getTemplateList()) {
        describe(template.id, () => {
            it.each(LOCALES)('%s', async (locale) => {
                await expect(render(template.id, locale)).toMatchFileSnapshot(
                    `./__golden__/${template.id}/${locale}.typ`,
                );
            });
        });
    }
});
