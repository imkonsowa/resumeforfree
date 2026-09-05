import type { ResumeData, SectionOrder } from '~/types/resume';
import type { Template, TemplateParseInput } from '~/types/template';
import { COMPACT_LAYOUT_CONFIG } from '~/templates/layouts';
import { escapeTypstText } from '~/utils/stringUtils';
import { convertEmail, convertLink, LATIN_FONT_STACK } from '~/utils/typstUtils';
import { getSharedSectionRenderers, renderProfilePhoto } from '~/utils/sectionRenderers';
import { RendererContext } from '~/utils/rendererContext';
import { isRtlLocale } from '~/composables/useLocale';

const renderHeaderRows = (data: ResumeData, fontSize: number, isRtl: boolean): string[] => {
    const rows: string[] = [];
    const fullName = `${escapeTypstText(data?.firstName || '')} ${escapeTypstText(data?.lastName || '')}`.trim();
    const position = escapeTypstText(data?.position || '');
    rows.push(`#text(size: ${fontSize + 12}pt, weight: "bold")[${fullName}]`);
    if (position) {
        const nameGap = isRtl ? '1.3em' : '0.8em';
        rows.push(`#block(above: ${nameGap})[#text(size: ${fontSize + 2}pt)[${position}]]`);
    }

    const contactParts: string[] = [];
    if (data?.email) contactParts.push(convertEmail(data.email));
    if (data?.phone) contactParts.push(`#text(dir: ltr, font: (${LATIN_FONT_STACK}))[${escapeTypstText(data.phone)}]`);
    if (data?.location) contactParts.push(escapeTypstText(data.location));
    if (contactParts.length > 0) {
        rows.push(`#block(above: 0.8em)[#text(size: ${fontSize - 1}pt)[${contactParts.join(' • ')}]]`);
    }

    const socialLinks = (data?.socialLinks || [])
        .filter(link => link.platform && link.url && link.url.trim() !== '')
        .map((link) => {
            let linkText = '';
            if (link.platform === 'other' && link.customLabel) {
                linkText = link.customLabel;
            }
            else {
                const platformLabels = {
                    linkedin: 'LinkedIn',
                    github: 'GitHub',
                    twitter: 'Twitter',
                    portfolio: 'Portfolio',
                    dribbble: 'Dribbble',
                    medium: 'Medium',
                    devto: 'Dev.to',
                    personal: 'Personal',
                };
                linkText = platformLabels[link.platform as keyof typeof platformLabels] || link.platform;
            }
            return convertLink(link.url, linkText);
        });
    if (socialLinks.length > 0) {
        rows.push(`#block(above: 0.8em)[#text(size: ${fontSize - 1}pt)[${socialLinks.join(' • ')}]]`);
    }
    return rows;
};
const convertResumeHeader = (data: ResumeData, context: RendererContext, fontSize: number, isRtl = false) => {
    const headerRows = renderHeaderRows(data, fontSize, isRtl);
    const photo = renderProfilePhoto(data, context);
    const startAlign = isRtl ? 'right' : 'left';
    const endAlign = isRtl ? 'left' : 'right';
    const textBlock = headerRows.join('\n');

    const body = photo
        ? `#grid(
    columns: (1fr, auto),
    column-gutter: 16pt,
    align: (${startAlign}, ${endAlign} + horizon),
    [${textBlock}],
    [${photo}],
)`
        : textBlock;

    return `${body}
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]`;
};
const parse = ({ data, font, locale, t, fontSize, photoShape, showSectionHeaderLine }: TemplateParseInput): string => {
    const isRtl = isRtlLocale(locale);

    const config = COMPACT_LAYOUT_CONFIG;
    const context = new RendererContext({
        t,
        fontSize,
        config,
        locale,
        photoShape: photoShape || 'rectangle',
        sectionStyle: { headerUnderline: showSectionHeaderLine ?? true },
    });
    const sharedRenderers = getSharedSectionRenderers();

    const sectionRenderers: Record<string, () => string> = {
        education: () => sharedRenderers.education(data, context),
        experience: () => sharedRenderers.experience(data, context),
        internships: () => sharedRenderers.internships(data, context),
        skills: () => sharedRenderers.skills(data, context),
        projects: () => sharedRenderers.projects(data, context),
        volunteering: () => sharedRenderers.volunteering(data, context),
        languages: () => sharedRenderers.languages(data, context),
        certificates: () => sharedRenderers.certificates(data, context),
    };
    const sectionsToRender = Object.keys(sectionRenderers);
    const sortedSections = sectionsToRender.sort((a, b) => {
        const orderA = data.sectionOrder?.[a as keyof SectionOrder] ?? 999;
        const orderB = data.sectionOrder?.[b as keyof SectionOrder] ?? 999;
        return orderA - orderB;
    });
    const sections = sortedSections
        .map(section => sectionRenderers[section]())
        .filter(content => content.trim() !== '');
    const sectionsContent = sections.join('\n\n');
    const profileSection = sharedRenderers.profile(data, context);
    const fullContent = `${convertResumeHeader(data, context, fontSize, isRtl)}${profileSection ? `\n${profileSection}` : ''}${sectionsContent ? `\n\n${sectionsContent}` : ''}`;

    const fontConfig = isRtl
        ? `#set text(font: ("${font}", ${LATIN_FONT_STACK}), size: ${fontSize}pt, dir: rtl)`
        : `#set text(font: ("${font}"), size: ${fontSize}pt)`;
    const leading = isRtl ? '0.65em' : '0.4em';

    return `#set page(margin: 1cm)
${fontConfig}
#set par(leading: ${leading})
${fullContent}
#pagebreak(weak: true)`;
};
export const compactTemplate: Template = {
    id: 'compact',
    name: 'Compact',
    description: 'Single column ATS friendly template',
    layoutConfig: {
        isTwoColumn: false,
        movableSections: [],
    },
    parse,
};
