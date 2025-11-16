import type { ResumeData } from '~/types/resume';
import { defaultTemplate } from './default';
import { compactTemplate } from './compact';

/**
 * Context object that groups all template rendering parameters
 * This eliminates the parameter smell of passing 4+ individual parameters
 */
export interface TemplateContext {
    resumeData: ResumeData;
    font: string;
    locale: string;
    t: (key: string) => string;
}

/**
 * Template interface with refactored parse signature
 */
export interface Template {
    id: string;
    name: string;
    description: string;
    layoutConfig: {
        isTwoColumn: boolean;
        leftColumnRatio?: string;
        rightColumnRatio?: string;
        movableSections?: string[];
    };
    parse: (context: TemplateContext) => string;
}

export const templates: Record<string, Template> = {
    default: defaultTemplate,
    compact: compactTemplate,
};
export const getTemplate = (id: string): Template => {
    return templates[id] || defaultTemplate;
};
export const getTemplateList = () => {
    return Object.values(templates);
};
export { defaultTemplate } from './default';
export { compactTemplate } from './compact';
