import type { ResumeData, SectionOrder } from '~/types/resume';
import type { Template, TemplateParseInput } from '~/types/template';
import { COMPACT_LAYOUT_CONFIG } from '~/templates/layouts';
import { escapeTypstText } from '~/utils/stringUtils';
import { convertEmail, convertLink } from '~/utils/typstUtils';
import { getSharedSectionRenderers, renderProfilePhoto } from '~/utils/sectionRenderers';
import { RendererContext } from '~/utils/rendererContext';
import { isRtlLocale } from '~/composables/useLocale';

const renderHeaderLeftColumn = (data: ResumeData, fontSize: number): string[] => {
    const rows: string[] = [];
    const fullName = `${escapeTypstText(data?.firstName || '')} ${escapeTypstText(data?.lastName || '')}`.trim();
    const position = escapeTypstText(data?.position || '');
    rows.push(`#text(size: ${fontSize + 12}pt, weight: "bold")[${fullName}]`);
    if (position) {
        rows.push(`#block(above: 0.8em)[#text(size: ${fontSize + 2}pt)[${position}]]`);
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
        const linksSpacing = rows.length > 0 ? '0.8em' : '0em';
        const linksContent = socialLinks.join(' • ');
        rows.push(`#block(above: ${linksSpacing})[#text(size: ${fontSize - 1}pt)[${linksContent}]]`);
    }
    return rows;
};
const renderHeaderRightColumn = (data: ResumeData, fontSize: number): string[] => {
    const rows: string[] = [];
    if (data?.email) {
        const email = convertEmail(data.email);
        rows.push(`#block(above: 0em)[#text(size: ${fontSize - 1}pt)[${email}]]`);
    }
    if (data?.phone) {
        const phone = escapeTypstText(data.phone);
        const phoneSpacing = rows.length > 0 ? '0.8em' : '0em';
        rows.push(`#block(above: ${phoneSpacing})[#text(size: ${fontSize - 1}pt, dir: ltr)[${phone}]]`);
    }
    if (data?.location) {
        const location = escapeTypstText(data.location);
        const locationSpacing = rows.length > 0 ? '0.8em' : '0em';
        rows.push(`#block(above: ${locationSpacing})[#text(size: ${fontSize - 1}pt)[${location}]]`);
    }

    return rows;
};
const convertResumeHeader = (data: ResumeData, context: RendererContext, fontSize: number, isRtl = false) => {
    const leftColumnRows = renderHeaderLeftColumn(data, fontSize);
    const rightColumnRows = renderHeaderRightColumn(data, fontSize);
    const photo = renderProfilePhoto(data, context);
    const startAlign = isRtl ? 'right' : 'left';
    const endAlign = isRtl ? 'left' : 'right';
    const headerParts: string[] = [];
    headerParts.push('#grid(');
    if (photo) {
        headerParts.push('    columns: (6fr, 4fr, auto),');
        headerParts.push('    column-gutter: 16pt,');
        headerParts.push(`    align: (${startAlign}, ${startAlign}, ${endAlign} + horizon),`);
    }
    else {
        headerParts.push('    columns: (6fr, 4fr),');
        headerParts.push('    column-gutter: 20pt,');
        headerParts.push(`    align: (${startAlign}, ${startAlign}),`);
    }
    headerParts.push('    [');
    leftColumnRows.forEach((row) => {
        headerParts.push(`        ${row}`);
    });
    headerParts.push('    ],');
    headerParts.push('    [');
    rightColumnRows.forEach((row) => {
        headerParts.push(`        ${row}`);
    });
    headerParts.push(photo ? '    ],' : '    ]');
    if (photo) {
        headerParts.push(`    [${photo}]`);
    }
    headerParts.push(')');
    headerParts.push('#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 1pt + black)]');
    return headerParts.join('\n');
};
const parse = ({ data, font, locale, t, fontSize, photoShape }: TemplateParseInput): string => {
    const isRtl = isRtlLocale(locale);

    const config = COMPACT_LAYOUT_CONFIG;
    const context = new RendererContext({ t, fontSize, config, locale, photoShape: photoShape || 'rectangle' });
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

    // Configure font and text direction for RTL languages
    const fontConfig = isRtl
        ? `#set text(font: ("${font}", "Arial"), size: ${fontSize}pt, dir: rtl)`
        : `#set text(font: ("${font}"), size: ${fontSize}pt)`;

    return `#set page(margin: 1cm)
${fontConfig}
#set par(leading: 0.4em)
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
