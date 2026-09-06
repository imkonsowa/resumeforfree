import type { DateRangeInput } from '~/types/template';
import { escapeTypstString, escapeTypstText } from './stringUtils';

export const HEADER_SPACING = '1em';
export const SECTION_HEADER_SIZE_OFFSET = 3;
export const DATE_COLOR = 'rgb("#4B5563")';
export const SECTION_SPACING = '1.6em';
export const ITEMS_SPACING = '0.8em';
export const DESCRIPTION_BELOW = '0.8em';
export const PHOTO_SIZE = '25mm';

export const LATIN_FALLBACK_FAMILIES = ['Calibri', 'Roboto'] as const;
export const LATIN_FONT_STACK = LATIN_FALLBACK_FAMILIES.map(f => `"${f}"`).join(', ');
export const renderDescription = (description: string, fontSize: number): string => {
    if (!description) return '';
    return `#block(above: 0em, below: ${DESCRIPTION_BELOW})[#text(size: ${fontSize}pt)[${description}]]`;
};
export const convertEmail = (email: string): string => {
    if (!email) return '';
    return `#link("mailto:${email}")[#text(fill: blue, dir: ltr, "${email}")]`;
};
export const convertLink = (url: string, text: string): string => {
    if (!url || !text) return '';
    return `#link("${url}")[#text(fill: blue, "${escapeTypstString(text)}")]`;
};
export const convertLinkWithColor = (url: string, text: string, color = 'blue'): string => {
    if (!url || !text) return '';
    return `#link("${url}")[#text(fill: ${color}, "${escapeTypstString(text)}")]`;
};
export const convertUnderlinedLink = (url: string, text: string): string => {
    if (!url || !text) return '';
    return `#link("${url}")[#underline[#text(fill: blue, "${escapeTypstString(text)}")]]`;
};
export const convertHeader = (title: string, size = '16pt'): string => {
    if (!title) return '';
    return `#block(below: ${HEADER_SPACING}, above: 0em)[#text("${escapeTypstString(title)}", size: ${size}, weight: "bold")]`;
};
export const convertSubHeader = (title: string, size = '14pt'): string => {
    if (!title) return '';
    return `#block(below: 1em)[#text("${escapeTypstString(title)}", size: ${size}, weight: "bold")]`;
};
export const formatDateToMonthYear = (date: string): string => {
    if (!date) return '';
    const parts = date.split('-');
    if (parts.length === 2) {
        const year = parseInt(parts[0]);
        const month = parseInt(parts[1]) - 1;
        const dateObj = new Date(year, month);
        return dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
        });
    }
    return date;
};
export const formatDateRangeText = ({ startDate, endDate, isPresent, t }: DateRangeInput): string => {
    if (!startDate && !endDate && !isPresent) return '';
    const presentText = t ? t('template.present') : 'Present';
    let dateText = '';
    if (startDate) {
        dateText = formatDateToMonthYear(startDate);
    }
    if (endDate && !isPresent) {
        dateText += dateText ? ` - ${formatDateToMonthYear(endDate)}` : formatDateToMonthYear(endDate);
    }
    if (isPresent) {
        dateText += dateText ? ` - ${presentText}` : presentText;
    }
    return dateText;
};
export const convertDateRange = (input: DateRangeInput): string => {
    const dateText = formatDateRangeText(input);
    if (!dateText) return '';
    return `#text(fill: ${DATE_COLOR}, "${escapeTypstString(dateText)}")`;
};
export const convertList = (items: string[], indent = '1em'): string => {
    if (!items || items.length === 0) return '';
    const listItems = items
        .filter(item => item && item.trim() !== '')
        .map(item => `- ${escapeTypstText(item)}`)
        .join('\n');
    if (!listItems) return '';
    return `#set list(indent: ${indent})\n\n${listItems}`;
};
export const convertGrid = (content: string[], columns = '(1fr, 1fr)', gutter = '20pt'): string => {
    if (!content || content.length === 0) return '';
    const gridContent = content.map(item => `[${item}]`).join(',\n  ');
    return `#grid(
  columns: ${columns},
  gutter: ${gutter},
  ${gridContent}
)`;
};
export const convertSocialLinks = (links: Array<{ platform: string; url: string }>, separator = ' • '): string => {
    const linkItems = links
        .filter(link => link.platform && link.url)
        .map(link => convertLink(link.url, link.platform));
    if (linkItems.length === 0) return '';
    return linkItems.join(separator);
};
export const renderTemplateHeader = (text: string, fontSize: number): string => {
    return convertHeader(text, `${fontSize + 2}pt`);
};
export const renderTemplateSubHeader = (text: string, fontSize: number): string => {
    return `#block(below: 0.6em)[#text("${escapeTypstString(text)}", size: ${fontSize}pt, weight: "bold")]`;
};
export const renderTemplateSubHeaderContent = (content: string, fontSize: number): string => {
    return `#block(below: 0.6em)[#text(size: ${fontSize}pt, weight: "bold")[${content}]]`;
};
export const renderTemplateDate = (dateText: string, fontSize: number): string => {
    return `#block(above: 0em, below: 0.6em)[#text(size: ${fontSize - 2}pt, fill: ${DATE_COLOR})[${dateText}]]`;
};
export const renderTemplateDateWithLink = (dateRange: string, link: string | null, fontSize: number): string => {
    if (link) {
        return `#block(above: 0em, below: 0.6em)[#text(size: ${fontSize - 2}pt, fill: ${DATE_COLOR})[${dateRange} • ${link}]]`;
    }
    return renderTemplateDate(dateRange, fontSize);
};
