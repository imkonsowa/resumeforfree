import type { Template } from '#layers/core/app/types/template';
import type { TemplateColumnLayout } from '#layers/core/app/types/resume';
import { defaultTemplate } from '#layers/core/app/templates/default';
import { compactTemplate } from '#layers/core/app/templates/compact';

export const useTemplate = () => {
    const settingsStore = useSettingsStore();
    const getCurrentTemplate = (): Template => {
        const templateId = settingsStore.selectedTemplate;
        switch (templateId) {
            case 'default':
                return defaultTemplate;
            case 'compact':
                return compactTemplate;
            default:
                return compactTemplate;
        }
    };
    const getCurrentLayoutConfig = (): TemplateColumnLayout => {
        return getCurrentTemplate().layoutConfig;
    };
    const isCurrentTemplateTwoColumn = (): boolean => {
        return getCurrentLayoutConfig().isTwoColumn;
    };
    const getMovableSections = (): string[] => {
        return getCurrentLayoutConfig().movableSections || [];
    };
    const canMoveSection = (sectionName: string): boolean => {
        const movableSections = getMovableSections();
        return movableSections.includes(sectionName);
    };
    return {
        getCurrentTemplate,
        getCurrentLayoutConfig,
        isCurrentTemplateTwoColumn,
        getMovableSections,
        canMoveSection,
    };
};
