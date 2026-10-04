import type { TemplateRenderConfig } from '#layers/core/app/types/template';
import { ITEMS_SPACING } from '#layers/core/app/utils/typstUtils';

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
    photo: {
        supported: true,
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
    photo: {
        supported: true,
    },
};
