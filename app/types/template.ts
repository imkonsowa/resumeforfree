import type { ResumeData } from './resume';
import type { RendererContext } from '~/utils/rendererContext';

export type TranslateFunction = (key: string) => string;

export interface DateRangeInput {
    startDate: string;
    endDate?: string;
    isPresent?: boolean;
    t?: TranslateFunction;
}

export interface TemplateColumnLayout {
    isTwoColumn: boolean;
    leftColumnRatio?: string;
    rightColumnRatio?: string;
    movableSections?: string[];
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
    projects: {
        itemSpacing: string;
    };
}

export interface SectionContent {
    title: string;
    titleContent?: string;
    date?: string;
    dateText?: string;
    content?: string;
    achievements?: string[];
    links?: string[];
    additionalInfo?: string;
}

export interface TemplateParseInput {
    data: ResumeData;
    font: string;
    locale: string;
    fontSize: number;
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
