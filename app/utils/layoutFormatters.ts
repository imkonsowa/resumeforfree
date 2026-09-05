import type { SectionContent, SectionStyle, TemplateRenderConfig } from '~/types/template';
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
    SECTION_SPACING,
} from './typstUtils';

const joinItems = (items: string[], config: TemplateRenderConfig, spacing?: string): string => {
    const gap = spacing || config.sections.itemSpacing || ITEMS_SPACING;
    return items
        .filter(content => content.trim())
        .map(content => `#block(above: 0em, below: ${gap})[${content}]`)
        .join('');
};

const renderItemTitle = (item: SectionContent, fontSize: number): string => {
    if (item.titleContent) return renderTemplateSubHeaderContent(item.titleContent, fontSize);
    return renderTemplateSubHeader(item.title, fontSize);
};

const renderInlineTitleAndDate = (
    titleMarkup: string,
    dateText: string,
    fontSize: number,
): string => {
    const styledDate = `#text(size: ${fontSize}pt, weight: "bold", fill: rgb("#4B5563"))[${dateText}]`;
    return `#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [${titleMarkup}], [${styledDate}])]`;
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
    config: TemplateRenderConfig,
    fontSize: number,
): string => {
    const inline = config.sections.datesInline === true;
    const formattedItems = sectionContent.map((item) => {
        let content = '';
        if (inline && item.dateText) {
            const titleInner = item.titleContent ? item.titleContent : item.title;
            const titleMarkup = `#text(size: ${fontSize}pt, weight: "bold")[${titleInner}]`;
            content = renderInlineTitleAndDate(titleMarkup, item.dateText, fontSize);
            if (item.content) {
                content += `\n\n#text(size: ${fontSize - 1}pt)[${item.content}]`;
            }
        }
        else {
            content = renderItemTitle(item, fontSize);
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
    config: TemplateRenderConfig,
    fontSize: number,
): string => {
    const inline = config.sections.datesInline === true;
    const formattedItems = sectionContent.map((item) => {
        let content = '';
        if (inline && item.dateText) {
            const titleMarkup = `#text(size: ${fontSize}pt, weight: "bold")[${item.title}]`;
            content = renderInlineTitleAndDate(titleMarkup, item.dateText, fontSize);
        }
        else {
            content = renderTemplateSubHeader(item.title, fontSize);
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
    config: TemplateRenderConfig,
    fontSize: number,
): string => {
    const inline = config.sections.datesInline === true;
    const formattedItems = sectionContent.map((item) => {
        let content = '';
        if (inline && item.dateText) {
            const titleInner = item.titleContent ? item.titleContent : item.title;
            const titleMarkup = `#text(size: ${fontSize}pt, weight: "bold")[${titleInner}]`;
            content = renderInlineTitleAndDate(titleMarkup, item.dateText, fontSize);
        }
        else {
            content = renderItemTitle(item, fontSize);
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
    config: TemplateRenderConfig,
    fontSize: number,
): string => {
    const inline = config.sections.datesInline === true;
    const formattedItems = sectionContent.map((item) => {
        let content = '';
        if (inline && item.dateText) {
            const titleInner = item.titleContent ? item.titleContent : item.title;
            const titleMarkup = `#text(size: ${fontSize}pt, weight: "bold")[${titleInner}]`;
            content = renderInlineTitleAndDate(titleMarkup, item.dateText, fontSize);
        }
        else {
            content = renderItemTitle(item, fontSize);
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
const buildSectionHeader = (headerText: string, style: SectionStyle): string => {
    const fontSize = style.fontSize ?? 12;
    const display = style.headerUpperCase ? headerText.toUpperCase() : headerText;
    const size = `${fontSize + (style.headerSizeOffset ?? 2)}pt`;
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
    const below = style.spacingBelow ?? SECTION_SPACING;
    return `#block(above: ${above}, below: ${below})[
${buildSectionHeader(headerText, style)}
${content}
]`;
};
