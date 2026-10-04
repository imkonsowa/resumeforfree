import { parseMarkdown } from '@nuxtjs/mdc/runtime';
import type { ResumeData } from '#layers/core/app/types/resume';

const storage = () => useStorage('assets:templates');

const readJson = async <T>(key: string): Promise<T | null> => {
    const value = await storage().getItem(key);
    if (value === null || value === undefined) return null;
    return (typeof value === 'string' ? JSON.parse(value) : value) as T;
};

const notFound = () => createError({ statusCode: 404, statusMessage: 'Template not found' });

export const requireTemplateLocale = (locale: string | undefined): TemplateLocale => {
    if (!locale || !isTemplateLocale(locale)) throw notFound();
    return locale;
};

export const listTemplateSlugs = async (): Promise<string[]> => {
    const keys = await storage().getKeys();
    return keys
        .filter(key => key.endsWith(':template.json'))
        .map(key => key.split(':')[0]!)
        .sort();
};

const loadPreset = async (slug: string): Promise<TemplatePreset> =>
    templatePresetSchema.parse(await readJson(`${slug}:template.json`));

const loadMarkdown = async (slug: string, locale: TemplateLocale) => {
    const raw = await storage().getItem(`${slug}:${locale}.md`);
    if (raw === null || raw === undefined) throw notFound();
    const parsed = await parseMarkdown(String(raw), { toc: { depth: 2, searchDepth: 2 } });
    return { page: templatePageSchema.parse(parsed.data), body: parsed.body, toc: parsed.toc };
};

const toSummary = (slug: string, locale: TemplateLocale, preset: TemplatePreset, page: TemplatePage): TemplateSummary => {
    const { settings: _settings, localeSettings: _localeSettings, ...presetMeta } = preset;
    return { slug, locale, ...presetMeta, ...page };
};

export const loadTemplateSummary = async (slug: string, locale: TemplateLocale): Promise<TemplateSummary> => {
    const [preset, { page }] = await Promise.all([loadPreset(slug), loadMarkdown(slug, locale)]);
    return toSummary(slug, locale, preset, page);
};

export const listTemplateSummaries = async (locale: TemplateLocale): Promise<TemplateSummary[]> => {
    const slugs = await listTemplateSlugs();
    return Promise.all(slugs.map(slug => loadTemplateSummary(slug, locale)));
};

export const loadTemplateDetail = async (slug: string, locale: TemplateLocale) => {
    if (!(await listTemplateSlugs()).includes(slug)) throw notFound();
    const [preset, markdown, sample] = await Promise.all([
        loadPreset(slug),
        loadMarkdown(slug, locale),
        readJson<ResumeData>(`${slug}:${locale}.json`),
    ]);
    if (!sample) throw notFound();
    const related = await Promise.all(preset.related.map(relatedSlug => loadTemplateSummary(relatedSlug, locale)));
    return {
        ...toSummary(slug, locale, preset, markdown.page),
        settings: templateSettingsFor(preset, locale),
        body: markdown.body,
        toc: markdown.toc,
        sample,
        related,
    };
};
