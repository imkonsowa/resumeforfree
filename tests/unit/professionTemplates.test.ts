import { describe, it, expect } from 'vitest';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parseMarkdown } from '@nuxtjs/mdc/runtime';
import { getTemplate } from '#layers/core/app/templates';
import { defaultResumeData, defaultResumeSettings, getDefaultFontForLanguage } from '#layers/core/app/types/resume';
import type { ResumeData } from '#layers/core/app/types/resume';
import {
    TEMPLATE_LAYOUTS,
    TEMPLATE_LOCALES,
    templatePageSchema,
    templatePresetSchema,
    templateSettingsFor,
} from '~~/shared/utils/professionTemplates';
import { previewInputHash } from '~~/scripts/templatePreviewHash';

const ROOT = resolve(__dirname, '../..');
const TEMPLATES_DIR = resolve(ROOT, 'content/templates');
const PREVIEWS_DIR = resolve(ROOT, 'public/template-previews');
const MIN_WORDS = 1500;
const MIN_CJK_CHARACTERS = 3000;

const slugs = readdirSync(TEMPLATES_DIR, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort();
const manifest: Record<string, string> = JSON.parse(readFileSync(join(PREVIEWS_DIR, 'manifest.json'), 'utf8'));
const markdownBody = (markdown: string) => markdown.replace(/^---[\s\S]*?\n---\n/, '');
const readText = (slug: string, file: string) => readFileSync(join(TEMPLATES_DIR, slug, file), 'utf8');
const t = (key: string) => key;

describe('profession templates', () => {
    it('has at least one template', () => {
        expect(slugs.length).toBeGreaterThan(0);
    });

    describe.each(slugs)('%s', (slug) => {
        const preset = templatePresetSchema.parse(JSON.parse(readText(slug, 'template.json')));

        it('links only to existing related templates', () => {
            for (const related of preset.related) {
                expect(slugs, `${slug} relates to missing template ${related}`).toContain(related);
                expect(related).not.toBe(slug);
            }
        });

        describe.each(TEMPLATE_LOCALES)('%s', (locale) => {
            const markdownFile = `${locale}.md`;
            const sampleFile = `${locale}.json`;

            it('has a guide and a sample', () => {
                expect(existsSync(join(TEMPLATES_DIR, slug, markdownFile)), `missing ${slug}/${markdownFile}`).toBe(true);
                expect(existsSync(join(TEMPLATES_DIR, slug, sampleFile)), `missing ${slug}/${sampleFile}`).toBe(true);
            });

            it('has valid frontmatter and enough content', async () => {
                const markdown = readText(slug, markdownFile);
                const parsed = await parseMarkdown(markdown);
                templatePageSchema.parse(parsed.data);
                const body = markdownBody(markdown);
                if (locale === 'zh') {
                    expect((body.match(/[一-鿿]/g) ?? []).length).toBeGreaterThanOrEqual(MIN_CJK_CHARACTERS);
                }
                else {
                    expect(body.split(/\s+/).filter(Boolean).length).toBeGreaterThanOrEqual(MIN_WORDS);
                }
            });

            it('links to template pages in its own language', () => {
                const prefix = locale === 'en' ? '' : `/${locale}`;
                for (const [, path] of readText(slug, markdownFile).matchAll(/\]\((\/[^)\s]*)\)/g)) {
                    const match = path!.match(/^(?:\/(\w{2}))?\/templates\/([\w-]+)$/);
                    expect(match, `${slug}/${markdownFile} links to ${path}`).not.toBeNull();
                    expect(path!.startsWith(`${prefix}/templates/`), `${path} should start with ${prefix}/templates/`).toBe(true);
                    expect(slugs).toContain(match![2]);
                }
            });

            it('renders the sample in every layout', () => {
                const sample = JSON.parse(readText(slug, sampleFile)) as ResumeData;
                for (const layout of TEMPLATE_LAYOUTS) {
                    const markup = getTemplate(layout).parse({
                        data: { ...defaultResumeData, ...sample },
                        settings: { ...defaultResumeSettings, selectedFont: getDefaultFontForLanguage(locale), ...templateSettingsFor(preset, locale) },
                        locale,
                        t,
                    });
                    expect(markup).toContain(sample.experiences[0]?.company ?? sample.education[0]?.institution);
                }
            });

            it('has up-to-date previews', () => {
                const key = `${locale}/${slug}`;
                expect(manifest[key], `run npm run templates:previews ${slug}`).toBe(previewInputHash(join(TEMPLATES_DIR, slug), locale));
                for (const file of [...TEMPLATE_LAYOUTS.map(layout => `${layout}.webp`), 'thumb.webp', 'og.png', 'sample.pdf']) {
                    expect(existsSync(join(PREVIEWS_DIR, locale, slug, file)), `missing preview ${key}/${file}`).toBe(true);
                }
            });
        });
    });

    it.each(TEMPLATE_LOCALES)('does not repeat paragraphs across %s templates', (locale) => {
        const seen = new Map<string, string>();
        for (const slug of slugs) {
            const file = join(TEMPLATES_DIR, slug, `${locale}.md`);
            if (!existsSync(file)) continue;
            const paragraphs = markdownBody(readFileSync(file, 'utf8'))
                .split(/\n\s*\n/)
                .map(paragraph => paragraph.trim())
                .filter(paragraph => paragraph.length > 120 && !paragraph.startsWith('|'));
            for (const paragraph of paragraphs) {
                expect(seen.get(paragraph), `${slug} repeats a paragraph from ${seen.get(paragraph)}`).toBeUndefined();
                seen.set(paragraph, slug);
            }
        }
    });
});
