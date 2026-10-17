import { describe, it, expect } from 'vitest';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { parseMarkdown } from '@nuxtjs/mdc/runtime';
import { TEMPLATE_LOCALES } from '~~/shared/utils/professionTemplates';
import { guideMetaSchema, guidePageSchema } from '~~/shared/utils/guides';

const ROOT = resolve(__dirname, '../..');
const GUIDES_DIR = resolve(ROOT, 'content/guides');
const TEMPLATES_DIR = resolve(ROOT, 'content/templates');
const MIN_WORDS = 1200;
const MIN_CJK_CHARACTERS = 2400;

const directories = (dir: string) => readdirSync(dir, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort();
const guides = directories(GUIDES_DIR);
const templates = directories(TEMPLATES_DIR);
const markdownBody = (markdown: string) => markdown.replace(/^---[\s\S]*?\n---\n/, '');
const readText = (slug: string, file: string) => readFileSync(join(GUIDES_DIR, slug, file), 'utf8');

describe('guides', () => {
    it('has at least one guide', () => {
        expect(guides.length).toBeGreaterThan(0);
    });

    describe.each(guides)('%s', (slug) => {
        const meta = guideMetaSchema.parse(JSON.parse(readText(slug, 'guide.json')));

        it('links only to existing templates and guides', () => {
            for (const template of meta.templates) expect(templates).toContain(template);
            for (const guide of meta.related) {
                expect(guides).toContain(guide);
                expect(guide).not.toBe(slug);
            }
        });

        describe.each(TEMPLATE_LOCALES)('%s', (locale) => {
            const file = `${locale}.md`;

            it('has valid frontmatter and enough content', async () => {
                expect(existsSync(join(GUIDES_DIR, slug, file)), `missing ${slug}/${file}`).toBe(true);
                const markdown = readText(slug, file);
                guidePageSchema.parse((await parseMarkdown(markdown)).data);
                const body = markdownBody(markdown);
                if (locale === 'zh') {
                    expect((body.match(/[一-鿿]/g) ?? []).length).toBeGreaterThanOrEqual(MIN_CJK_CHARACTERS);
                }
                else {
                    expect(body.split(/\s+/).filter(Boolean).length).toBeGreaterThanOrEqual(MIN_WORDS);
                }
            });

            it('links to pages in its own language', () => {
                const prefix = locale === 'en' ? '' : `/${locale}`;
                for (const [, path] of readText(slug, file).matchAll(/\]\((\/[^)\s]*)\)/g)) {
                    const match = path!.match(/^(?:\/(\w{2}))?\/(templates|guides)\/([\w-]+)$|^(?:\/(\w{2}))?\/builder$/);
                    expect(match, `${slug}/${file} links to ${path}`).not.toBeNull();
                    expect(path!.startsWith(`${prefix}/`), `${path} should start with ${prefix}/`).toBe(true);
                    if (match![2] === 'templates') expect(templates).toContain(match![3]);
                    if (match![2] === 'guides') expect(guides).toContain(match![3]);
                }
            });
        });
    });
});
