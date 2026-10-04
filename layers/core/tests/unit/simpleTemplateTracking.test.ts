import { describe, it, expect } from 'vitest';
import { simpleTemplate } from '#layers/core/app/templates/simple';
import { fullResume } from '../fixtures/resumes';

const render = (locale: string) =>
    simpleTemplate.parse({ data: fullResume, settings: { selectedFont: 'Calibri', fontSize: 12 }, locale, t: (key: string) => key });

describe('Simple template section labels', () => {
    it.each(['en', 'fr', 'de', 'it', 'tr'])('letter-spaces labels for Latin-script %s', (locale) => {
        expect(render(locale)).toContain('tracking: 0.08em');
    });

    it.each(['ar', 'ur', 'hi', 'zh'])('keeps %s labels unspaced so joined and hanging scripts stay connected', (locale) => {
        expect(render(locale)).not.toContain('tracking');
    });
});
