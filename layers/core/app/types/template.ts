import type { ResumeData, ResumeSettings, SectionHeaders } from './resume';
import type { RendererContext } from '#layers/core/app/utils/rendererContext';

export type TranslateFunction = (key: string) => string;

export interface DateRangeInput {
    startDate: string;
    endDate?: string;
    isPresent?: boolean;
    t?: TranslateFunction;
    locale?: string;
}

export interface TemplateColumnLayout {
    isTwoColumn: boolean;
    leftColumnRatio?: string;
    rightColumnRatio?: string;
    movableSections?: string[];
}

export interface TemplatePhotoConfig {
    supported: boolean;
}

export interface SectionHeading {
    key: keyof SectionHeaders;
    title: string;
}

export interface SectionStyle {
    headerColor?: string;
    headerUnderline?: boolean;
    headerUpperCase?: boolean;
    headerSizeOffset?: number;
    spacingAbove?: string;
    spacingBelow?: string;
    headerBelow?: string;
}

export interface TemplateRenderConfig {
    layout: 'single-column' | 'two-column';
    sections: {
        spacing: 'block' | 'joined';
        itemSpacing: string;
        joinSeparator: string;
        datesInline?: boolean;
    };
    socialLinks: {
        orientation: 'vertical' | 'horizontal';
        placement: 'header' | 'sidebar' | 'section';
        separator: string;
    };
    header: {
        style: 'simple' | 'grid';
        includeContact: boolean;
    };
    photo?: TemplatePhotoConfig;
}

export interface SectionContent {
    title: string;
    titleContent?: string;
    date?: string;
    dateText?: string;
    content?: string;
    achievements?: string[];
    links?: string[];
    description?: string;
}

export interface TemplateParseInput {
    data: ResumeData;
    settings?: Partial<ResumeSettings>;
    locale: string;
    t: TranslateFunction;
}

export interface Template {
    id: string;
    name: string;
    description: string;
    layoutConfig: TemplateColumnLayout;
    parse: (input: TemplateParseInput) => string;
}

export type SectionRenderer = (data: ResumeData, context: RendererContext) => string;
