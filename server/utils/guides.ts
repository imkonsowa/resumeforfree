import { parseMarkdown } from '@nuxtjs/mdc/runtime';

const storage = () => useStorage('assets:guides');

const notFound = () => createError({ statusCode: 404, statusMessage: 'Guide not found' });

const readRaw = async (key: string): Promise<string> => {
    const raw = await storage().getItem(key);
    if (raw === null || raw === undefined) throw notFound();
    return typeof raw === 'string' ? raw : JSON.stringify(raw);
};

export const listGuideSlugs = async (): Promise<string[]> => {
    const keys = await storage().getKeys();
    return keys
        .filter(key => key.endsWith(':guide.json'))
        .map(key => key.split(':')[0]!)
        .sort();
};

const loadMeta = async (slug: string): Promise<GuideMeta> =>
    guideMetaSchema.parse(JSON.parse(await readRaw(`${slug}:guide.json`)));

const loadMarkdown = async (slug: string, locale: TemplateLocale) => {
    const parsed = await parseMarkdown(await readRaw(`${slug}:${locale}.md`), { toc: { depth: 2, searchDepth: 2 } });
    return { page: guidePageSchema.parse(parsed.data), body: parsed.body, toc: parsed.toc };
};

export const loadGuideMarkdownBody = async (slug: string, locale: TemplateLocale): Promise<string> =>
    (await readRaw(`${slug}:${locale}.md`)).replace(/^---\n[\s\S]*?\n---\n/, '').trim();

export const loadGuideSummary = async (slug: string, locale: TemplateLocale): Promise<GuideSummary> => {
    const [meta, { page }] = await Promise.all([loadMeta(slug), loadMarkdown(slug, locale)]);
    return { slug, locale, updatedAt: meta.updatedAt, ...page };
};

export const listGuideSummaries = async (locale: TemplateLocale): Promise<GuideSummary[]> =>
    Promise.all((await listGuideSlugs()).map(slug => loadGuideSummary(slug, locale)));

export const loadGuideDetail = async (slug: string, locale: TemplateLocale) => {
    if (!(await listGuideSlugs()).includes(slug)) throw notFound();
    const [meta, markdown] = await Promise.all([loadMeta(slug), loadMarkdown(slug, locale)]);
    const [templates, related] = await Promise.all([
        Promise.all(meta.templates.map(template => loadTemplateSummary(template, locale))),
        Promise.all(meta.related.map(guide => loadGuideSummary(guide, locale))),
    ]);
    return {
        slug,
        locale,
        updatedAt: meta.updatedAt,
        ...markdown.page,
        body: markdown.body,
        toc: markdown.toc,
        templates,
        related,
    };
};
