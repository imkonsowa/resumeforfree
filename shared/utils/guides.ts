import { z } from 'zod';
import type { TemplateLocale } from './professionTemplates';

export const guideMetaSchema = z.object({
    updatedAt: z.iso.date(),
    templates: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]),
}).strict();
export type GuideMeta = z.infer<typeof guideMetaSchema>;

export const guidePageSchema = z.object({
    title: z.string().min(10).max(70),
    description: z.string().min(50).max(170),
    keywords: z.array(z.string()).min(5),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).min(3),
});
export type GuidePage = z.infer<typeof guidePageSchema>;

export interface GuideSummary extends GuidePage, Omit<GuideMeta, 'templates' | 'related'> {
    slug: string;
    locale: TemplateLocale;
}
