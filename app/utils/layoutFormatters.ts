import type { SectionContent, TemplateRenderConfig } from '~/types/template';
import {
    convertList,
    ITEMS_SPACING,
    renderTemplateDate,
    renderTemplateDateWithLink,
    renderTemplateHeader,
    renderTemplateSubHeader,
    renderTemplateSubHeaderContent,
    SECTION_SPACING,
} from './typstUtils';

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
        if (item.achievements && item.achievements.length > 0) {
            content += '\n\n';
            content += convertList(item.achievements);
        }
        return content;
    });
    if (config.layout === 'two-column') {
        return formattedItems.join('\n\n');
    }
    return formattedItems.join(config.sections.joinSeparator);
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
        if (item.additionalInfo) {
            content += '\n\n';
            content += item.additionalInfo;
        }
        return content;
    });
    if (config.layout === 'two-column') {
        return formattedItems.join('\n\n');
    }
    return formattedItems.join(config.sections.joinSeparator);
};
export const formatProjectsItems = (
    sectionContent: SectionContent[],
    config: TemplateRenderConfig,
    fontSize: number,
): string => {
    const formattedItems = sectionContent.map((item) => {
        let content = '';
        if (item.titleContent) {
            content += `#block(below: 0.4em)[${item.titleContent}]`;
        }
        else if (item.title) {
            content += item.title;
        }
        if (item.date) {
            if (content) content += '\n\n';
            content += renderTemplateDate(item.date, fontSize);
        }
        if (item.content) {
            if (content) content += '\n\n';
            content += item.content;
        }
        if (item.achievements && item.achievements.length > 0) {
            if (content) content += '\n\n';
            content += convertList(item.achievements);
        }
        return content;
    }).filter(content => content.trim());
    if (config.sections.spacing === 'block' && config.projects.itemSpacing) {
        return formattedItems
            .map(content => `#block(above: 0em, below: ${config.projects.itemSpacing})[${content}]`)
            .join('');
    }
    return formattedItems.join(config.sections.joinSeparator);
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
        if (item.additionalInfo) {
            content += '\n\n';
            content += item.additionalInfo;
        }
        return content;
    });
    if (config.layout === 'two-column') {
        return formattedItems.join('\n\n');
    }
    return formattedItems.join(config.sections.joinSeparator);
};
export const formatSimpleItems = (
    sectionContent: SectionContent[],
    config: TemplateRenderConfig,
): string => {
    const contentItems = sectionContent.map(item => item.content || '').filter(Boolean);
    return formatSectionItems(contentItems, config.sections);
};
export const wrapInSectionBlock = (
    headerText: string,
    content: string,
    fontSize: number,
): string => {
    if (!content.trim()) return '';
    return `#block(above: 0em, below: ${SECTION_SPACING})[
${renderTemplateHeader(headerText, fontSize)}
${content}
]`;
};
