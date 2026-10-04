import type { ResumeData, SectionOrder } from '#layers/core/app/types/resume';
import type { Template, TemplateParseInput } from '#layers/core/app/types/template';
import { COMPACT_LAYOUT_CONFIG } from '#layers/core/app/templates/layouts';
import { escapeTypstText } from '#layers/core/app/utils/stringUtils';
import { convertEmail, convertLink, LATIN_FONT_STACK, PHOTO_GUTTER } from '#layers/core/app/utils/typstUtils';
import { getSharedSectionRenderers, renderProfilePhoto } from '#layers/core/app/utils/sectionRenderers';
import { RendererContext } from '#layers/core/app/utils/rendererContext';
import { isRtlLocale } from '#layers/core/app/utils/localeDirection';

const renderHeaderRows = (data: ResumeData, context: RendererContext, isRtl: boolean): string[] => {
    const { fontSize } = context;
    const rows: string[] = [];
    const fullName = `${escapeTypstText(data?.firstName || '')} ${escapeTypstText(data?.lastName || '')}`.trim();
    const position = escapeTypstText(data?.position || '');
    const nameFill = context.headingColor ? `, fill: ${context.headingColor}` : '';
    rows.push(`#text(size: ${fontSize + 12}pt, weight: "bold"${nameFill})[${fullName}]`);
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
            let linkText: string;
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
const convertResumeHeader = (data: ResumeData, context: RendererContext, isRtl = false) => {
    const headerRows = renderHeaderRows(data, context, isRtl);
    const photo = renderProfilePhoto(data, context);
    const startAlign = isRtl ? 'right' : 'left';
    const endAlign = isRtl ? 'left' : 'right';
    const textBlock = headerRows.join('\n');

    const body = photo
        ? `#grid(
    columns: (1fr, auto),
    column-gutter: ${PHOTO_GUTTER},
    align: (${startAlign}, ${endAlign} + horizon),
    [${textBlock}],
    [${photo}],
)`
        : textBlock;

    return `${body}
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]`;
};
const parse = ({ data, settings, locale, t }: TemplateParseInput): string => {
    const isRtl = isRtlLocale(locale);

    const config = COMPACT_LAYOUT_CONFIG;
    const context = new RendererContext({ t, locale, settings, config });
    const { font, fontSize } = context;
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
        publications: () => sharedRenderers.publications(data, context),
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
    const fullContent = `${convertResumeHeader(data, context, isRtl)}${profileSection ? `\n${profileSection}` : ''}${sectionsContent ? `\n\n${sectionsContent}` : ''}`;

    const fontConfig = isRtl
        ? `#set text(font: ("${font}", ${LATIN_FONT_STACK}), size: ${fontSize}pt, dir: rtl)`
        : `#set text(font: ("${font}"), size: ${fontSize}pt)`;
    const leading = isRtl ? '0.65em' : '0.4em';

    return `#set page(margin: 1cm)
${fontConfig}
#show link: set text(fill: ${context.linkColor})
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
