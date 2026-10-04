import type { DateRangeInput } from '#layers/core/app/types/template';
import type { RendererContext } from './rendererContext';
import { escapeTypstString, escapeTypstText } from './stringUtils';

export const HEADER_SPACING = '1em';
export const HEADER_RULE_ABOVE = '0.3em';
export const HEADER_RULE_BELOW = '0.8em';
export const ITEM_TITLE_BELOW = '0.6em';
export const INLINE_DATE_GUTTER = '0.8em';
export const PHOTO_GUTTER = '16pt';
export const ICON_HEIGHT = '0.85em';
export const ICON_BASELINE = '0.1em';
export const ICON_GAP = '0.35em';
export const DATE_COLOR = 'rgb("#4B5563")';
export const LINK_COLOR = 'blue';

const HEX_COLOR = /^#[0-9a-f]{6}$/i;
export const isHexColor = (value: string | undefined): value is string => Boolean(value && HEX_COLOR.test(value));
export const typstColor = (hex: string): string => `rgb("${hex}")`;
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
    return `#link("mailto:${email}")[#text(dir: ltr, "${email}")]`;
};
export const convertLink = (url: string, text: string): string => {
    if (!url || !text) return '';
    return `#link("${url}")[#text("${escapeTypstString(text)}")]`;
};
export const convertUnderlinedLink = (url: string, text: string): string => {
    if (!url || !text) return '';
    return `#link("${url}")[#underline[#text("${escapeTypstString(text)}")]]`;
};
export const convertHeader = (title: string, size = '16pt'): string => {
    if (!title) return '';
    return `#block(below: ${HEADER_SPACING}, above: 0em)[#text("${escapeTypstString(title)}", size: ${size}, weight: "bold")]`;
};
export const convertSubHeader = (title: string, size = '14pt'): string => {
    if (!title) return '';
    return `#block(below: 1em)[#text("${escapeTypstString(title)}", size: ${size}, weight: "bold")]`;
};
export const formatDateToMonthYear = (date: string, locale = 'en'): string => {
    if (!date) return '';
    const parts = date.split('-');
    if (parts.length === 2) {
        const year = parseInt(parts[0]);
        const month = parseInt(parts[1]) - 1;
        const dateObj = new Date(year, month);
        try {
            return dateObj.toLocaleDateString(`${locale}-u-nu-latn`, {
                year: 'numeric',
                month: 'long',
            });
        }
        catch {
            return dateObj.toLocaleDateString('en', { year: 'numeric', month: 'long' });
        }
    }
    return date;
};
export const formatDateRangeText = ({ startDate, endDate, isPresent, t, locale }: DateRangeInput): string => {
    if (!startDate && !endDate && !isPresent) return '';
    const presentText = t ? t('template.present') : 'Present';
    let dateText = '';
    if (startDate) {
        dateText = formatDateToMonthYear(startDate, locale);
    }
    if (endDate && !isPresent && endDate !== startDate) {
        dateText += dateText ? ` - ${formatDateToMonthYear(endDate, locale)}` : formatDateToMonthYear(endDate, locale);
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
export const renderTemplateSubHeader = (text: string, context: Pick<RendererContext, 'fontSize' | 'settings'>): string => {
    return `#block(below: ${ITEM_TITLE_BELOW})[#text("${escapeTypstString(text)}", size: ${context.fontSize + context.settings.titleSizeOffset}pt, weight: "bold")]`;
};
export const renderTemplateSubHeaderContent = (content: string, context: Pick<RendererContext, 'fontSize' | 'settings'>): string => {
    return `#block(below: ${ITEM_TITLE_BELOW})[#text(size: ${context.fontSize + context.settings.titleSizeOffset}pt, weight: "bold")[${content}]]`;
};
export const renderTemplateDate = (dateText: string, fontSize: number): string => {
    return `#block(above: 0em, below: ${ITEM_TITLE_BELOW})[#text(size: ${fontSize - 2}pt, fill: ${DATE_COLOR})[${dateText}]]`;
};
export const renderTemplateDateWithLink = (dateRange: string, link: string | null, fontSize: number): string => {
    if (link) {
        return `#block(above: 0em, below: ${ITEM_TITLE_BELOW})[#text(size: ${fontSize - 2}pt, fill: ${DATE_COLOR})[${dateRange} • ${link}]]`;
    }
    return renderTemplateDate(dateRange, fontSize);
};
