import { z } from 'zod';

export const TEMPLATE_LOCALES = ['en', 'ar', 'tr', 'fr', 'de', 'it', 'zh', 'ur', 'hi'] as const;
export type TemplateLocale = typeof TEMPLATE_LOCALES[number];

export const TEMPLATE_LAYOUTS = ['ats-friendly', 'compact', 'default', 'simple'] as const;
export type TemplateLayout = typeof TEMPLATE_LAYOUTS[number];

export const TEMPLATE_CATEGORIES = ['technology', 'healthcare', 'finance', 'education', 'business', 'students'] as const;
export type TemplateCategory = typeof TEMPLATE_CATEGORIES[number];

const hexColor = z.string().regex(/^(#[0-9a-f]{6})?$/i);

const templateSettingsSchema = z.object({
    fontSize: z.number().min(9).max(14).optional(),
    headingColor: hexColor.optional(),
    accentColor: hexColor.optional(),
    showSectionIcons: z.boolean().optional(),
    showSectionHeaderLine: z.boolean().optional(),
    sectionSpacing: z.number().optional(),
    itemSpacing: z.number().optional(),
}).strict();
export type TemplateSettings = z.infer<typeof templateSettingsSchema>;

export const templatePresetSchema = z.object({
    category: z.enum(TEMPLATE_CATEGORIES),
    layout: z.enum(TEMPLATE_LAYOUTS),
    updatedAt: z.iso.date(),
    related: z.array(z.string()).default([]),
    settings: templateSettingsSchema.default({}),
    localeSettings: z.partialRecord(z.enum(TEMPLATE_LOCALES), templateSettingsSchema).default({}),
}).strict();
export type TemplatePreset = z.infer<typeof templatePresetSchema>;

export const templatePageSchema = z.object({
    title: z.string().min(10).max(70),
    description: z.string().min(50).max(170),
    profession: z.string().min(2),
    keywords: z.array(z.string()).min(5),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).min(3),
});
export type TemplatePage = z.infer<typeof templatePageSchema>;

export interface TemplateSummary extends TemplatePage, Omit<TemplatePreset, 'settings' | 'localeSettings'> {
    slug: string;
    locale: TemplateLocale;
}

export const isTemplateLocale = (value: string): value is TemplateLocale =>
    (TEMPLATE_LOCALES as readonly string[]).includes(value);

export const templatePreviewPath = (locale: string, slug: string, file: string) =>
    `/template-previews/${locale}/${slug}/${file}`;

export const templateSettingsFor = (preset: TemplatePreset, locale: string): TemplateSettings => ({
    ...preset.settings,
    ...preset.localeSettings[locale as TemplateLocale],
});
