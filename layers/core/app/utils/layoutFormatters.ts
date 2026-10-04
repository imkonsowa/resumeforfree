import type { SectionContent, TemplateRenderConfig } from '#layers/core/app/types/template';
import { escapeTypstText } from './stringUtils';
import type { RendererContext } from './rendererContext';
import {
    convertList,
    HEADER_SPACING,
    ITEMS_SPACING,
    renderDescription,
    renderTemplateDate,
    renderTemplateDateWithLink,
    renderTemplateSubHeader,
    renderTemplateSubHeaderContent,
    DATE_COLOR,
} from './typstUtils';

const joinItems = (items: string[], config: TemplateRenderConfig, spacing?: string): string => {
    const gap = spacing || config.sections.itemSpacing || ITEMS_SPACING;
    return items
        .filter(content => content.trim())
        .map(content => `#block(above: 0em, below: ${gap})[${content}]`)
        .join('');
};

const renderItemTitle = (item: SectionContent, context: RendererContext): string => {
    if (item.titleContent) return renderTemplateSubHeaderContent(item.titleContent, context);
    return renderTemplateSubHeader(item.title, context);
};

const renderInlineTitleAndDate = (
    titleContent: string,
    dateText: string,
    context: RendererContext,
): string => {
    const title = `#text(size: ${context.fontSize + context.settings.titleSizeOffset}pt, weight: "bold")[${titleContent}]`;
    const styledDate = `#text(size: ${context.fontSize}pt, weight: "bold", fill: ${DATE_COLOR})[${dateText}]`;
    return `#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [${title}], [${styledDate}])]`;
};

export const formatSectionItems = (
    items: string[],
    config: TemplateRenderConfig['sections'],
): string => {
    if (config.spacing === 'block' && config.itemSpacing) {
        return items
            .map(item => `#block(above: 0em, below: ${config.itemSpacing})[${item}]`)
            .join('');
    }
    return items.join(config.joinSeparator);
};
export const formatSocialLinks = (
    sectionContent: SectionContent[],
    config: TemplateRenderConfig['socialLinks'],
): string => {
    const linkItems = sectionContent.map(item => item.content || '').filter(Boolean);
    if (config.orientation === 'horizontal') {
        return linkItems.join(config.separator);
    }
    return formatSectionItems(linkItems, {
        spacing: 'block',
        itemSpacing: config.placement === 'sidebar' ? ITEMS_SPACING : '',
        joinSeparator: '',
    });
};
export const formatExperienceItems = (
    sectionContent: SectionContent[],
    context: RendererContext,
): string => {
    const { config, fontSize } = context;
    const inline = config.sections.datesInline === true;
    const formattedItems = sectionContent.map((item) => {
        let content: string;
        if (inline && item.dateText) {
            content = renderInlineTitleAndDate(item.titleContent || item.title, item.dateText, context);
            if (item.content) {
                content += `\n\n#text(size: ${fontSize - 1}pt)[${item.content}]`;
            }
        }
        else {
            content = renderItemTitle(item, context);
            if (item.date || item.content) {
                content += '\n\n';
                content += renderTemplateDateWithLink(item.date || '', item.content || null, fontSize);
            }
        }
        if (item.description) {
            content += `\n\n${renderDescription(item.description, fontSize)}`;
        }
        if (item.achievements && item.achievements.length > 0) {
            content += '\n\n';
            content += convertList(item.achievements);
        }
        return content;
    });
    return joinItems(formattedItems, config);
};
export const formatEducationItems = (
    sectionContent: SectionContent[],
    context: RendererContext,
): string => {
    const { config, fontSize } = context;
    const inline = config.sections.datesInline === true;
    const formattedItems = sectionContent.map((item) => {
        let content: string;
        if (inline && item.dateText) {
            content = renderInlineTitleAndDate(item.title, item.dateText, context);
        }
        else {
            content = renderTemplateSubHeader(item.title, context);
            if (item.date) {
                content += '\n\n';
                content += renderTemplateDate(item.date, fontSize);
            }
        }
        if (item.description) {
            content += `\n\n${renderDescription(item.description, fontSize)}`;
        }
        if (item.achievements && item.achievements.length > 0) {
            content += '\n\n';
            content += convertList(item.achievements);
        }
        return content;
    });
    return joinItems(formattedItems, config);
};
export const formatProjectsItems = (
    sectionContent: SectionContent[],
    context: RendererContext,
): string => {
    const { config, fontSize } = context;
    const inline = config.sections.datesInline === true;
    const formattedItems = sectionContent.map((item) => {
        let content: string;
        if (inline && item.dateText) {
            content = renderInlineTitleAndDate(item.titleContent || item.title, item.dateText, context);
        }
        else {
            content = renderItemTitle(item, context);
            if (item.date) {
                content += '\n\n';
                content += renderTemplateDate(item.date, fontSize);
            }
        }
        if (item.description) {
            content += `\n\n${renderDescription(item.description, fontSize)}`;
        }
        if (item.achievements && item.achievements.length > 0) {
            content += '\n\n';
            content += convertList(item.achievements);
        }
        return content;
    });
    return joinItems(formattedItems, config, config.projects.itemSpacing);
};
export const formatCertificatesItems = (
    sectionContent: SectionContent[],
    context: RendererContext,
): string => {
    const { config, fontSize } = context;
    const inline = config.sections.datesInline === true;
    const formattedItems = sectionContent.map((item) => {
        let content: string;
        if (inline && item.dateText) {
            content = renderInlineTitleAndDate(item.titleContent || item.title, item.dateText, context);
        }
        else {
            content = renderItemTitle(item, context);
            if (item.date) {
                content += '\n\n';
                content += renderTemplateDate(item.date, fontSize);
            }
        }
        if (item.description) {
            content += `\n\n${renderDescription(item.description, fontSize)}`;
        }
        return content;
    });
    return joinItems(formattedItems, config);
};
export const formatSimpleItems = (
    sectionContent: SectionContent[],
    config: TemplateRenderConfig,
): string => {
    const contentItems = sectionContent.map(item => item.content || '').filter(Boolean);
    return formatSectionItems(contentItems, config.sections);
};
const buildSectionHeader = (headerText: string, context: RendererContext): string => {
    const style = context.sectionStyle;
    const display = style.headerUpperCase ? headerText.toUpperCase() : headerText;
    const size = `${context.fontSize + (style.headerSizeOffset ?? context.settings.headingSizeOffset)}pt`;
    const fillProp = style.headerColor ? `, fill: ${style.headerColor}` : '';
    const headerText$ = `#text(size: ${size}, weight: "bold"${fillProp})[${escapeTypstText(display)}]`;

    if (style.headerUnderline) {
        const stroke = style.headerColor ? `0.5pt + ${style.headerColor}` : '0.5pt';
        const line = `#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: ${stroke})]`;
        return `${headerText$}\n${line}`;
    }
    const below = style.headerBelow ?? HEADER_SPACING;
    return `#block(below: ${below}, above: 0em)[${headerText$}]`;
};

export const wrapInSection = (
    headerText: string,
    content: string,
    context: RendererContext,
): string => {
    if (!content.trim()) return '';
    const style = context.sectionStyle;
    const above = style.spacingAbove ?? '0em';
    const below = style.spacingBelow ?? `${context.settings.sectionSpacing}em`;
    return `#block(above: ${above}, below: ${below})[
${buildSectionHeader(headerText, context)}
${content}
]`;
};
