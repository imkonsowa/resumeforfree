import type { TemplateRenderConfig } from '~/types/template';
import { HEADER_SPACING, ITEMS_SPACING } from '~/utils/typstUtils';

export const DEFAULT_LAYOUT_CONFIG: TemplateRenderConfig = {
    layout: 'two-column',
    sections: {
        spacing: 'block',
        itemSpacing: ITEMS_SPACING,
        joinSeparator: '',
    },
    socialLinks: {
        orientation: 'vertical',
        placement: 'sidebar',
        separator: '',
    },
    header: {
        style: 'simple',
        includeContact: false,
    },
    projects: {
        itemSpacing: HEADER_SPACING,
    },
};

export const COMPACT_LAYOUT_CONFIG: TemplateRenderConfig = {
    layout: 'single-column',
    sections: {
        spacing: 'joined',
        itemSpacing: '',
        joinSeparator: '\n\n',
        datesInline: true,
    },
    socialLinks: {
        orientation: 'horizontal',
        placement: 'header',
        separator: ' • ',
    },
    header: {
        style: 'grid',
        includeContact: true,
    },
    projects: {
        itemSpacing: '',
    },
};
