import type { Template } from '~/types/template';
import { defaultTemplate } from './default';
import { compactTemplate } from './compact';
import { atsFriendlyTemplate } from './atsFriendly';
import { boringTemplate } from './boring';

export const templates: Record<string, Template> = {
    'compact': compactTemplate,
    'default': defaultTemplate,
    'ats-friendly': atsFriendlyTemplate,
    'boring': boringTemplate,
};
export const getTemplate = (id: string): Template => {
    return templates[id] || compactTemplate;
};
export const getTemplateList = () => {
    return Object.values(templates);
};
export * from './default';
export * from './compact';
export * from './atsFriendly';
export * from './boring';
