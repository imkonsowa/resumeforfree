import type { ResumeData, SectionOrder } from '~/types/resume';
import type { SectionStyle, Template, TemplateParseInput, TemplateRenderConfig } from '~/types/template';
import { escapeTypstText } from '~/utils/stringUtils';
import { convertEmail, convertLink, LATIN_FONT_STACK } from '~/utils/typstUtils';
import { RendererContext } from '~/utils/rendererContext';
import { isRtlLocale } from '~/composables/useLocale';
import { getSharedSectionRenderers, renderProfilePhoto } from '~/utils/sectionRenderers';

const ATS_BLUE = 'rgb("#1d4ed8")';

const ATS_LAYOUT_CONFIG: TemplateRenderConfig = {
    layout: 'single-column',
    sections: {
        spacing: 'joined',
        itemSpacing: '0.8em',
        joinSeparator: '\n\n',
        datesInline: true,
    },
    socialLinks: {
        orientation: 'horizontal',
        placement: 'header',
        separator: ' | ',
    },
    header: {
        style: 'simple',
        includeContact: true,
    },
    projects: {
        itemSpacing: '0.6em',
    },
    photo: {
        supported: true,
    },
};

const ATS_SECTION_STYLE: SectionStyle = {
    headerColor: ATS_BLUE,
    headerUnderline: true,
    headerUpperCase: true,
    spacingAbove: '1em',
};

function renderTopHeader(data: ResumeData, context: RendererContext, fontSize: number): string {
    const firstName = escapeTypstText(data?.firstName || '').toUpperCase();
    const lastName = escapeTypstText(data?.lastName || '').toUpperCase();
    const fullName = `${firstName} ${lastName}`.trim();
    const position = escapeTypstText((data?.position || '')).toUpperCase();

    const contactParts: string[] = [];
    if (data?.location) contactParts.push(escapeTypstText(data.location));
    if (data?.email) contactParts.push(convertEmail(data.email));
    if (data?.phone) contactParts.push(`#text(dir: ltr, font: (${LATIN_FONT_STACK}))[${escapeTypstText(data.phone)}]`);

    const platformLabels: Record<string, string> = {
        linkedin: 'LinkedIn',
        github: 'GitHub',
        twitter: 'Twitter',
        portfolio: 'Portfolio',
        dribbble: 'Dribbble',
        medium: 'Medium',
        devto: 'Dev.to',
        personal: 'Personal',
    };
    const socialParts: string[] = (data?.socialLinks || [])
        .filter(link => link.platform && link.url && link.url.trim() !== '')
        .map((link) => {
            const label = link.platform === 'other' && link.customLabel
                ? link.customLabel
                : (platformLabels[link.platform] || link.platform);
            return convertLink(link.url, label);
        });

    const textBlocks: string[] = [];
    if (fullName) {
        textBlocks.push(`#block(above: 0em, below: 0.8em)[#text(size: ${fontSize + 14}pt, weight: "bold", fill: ${ATS_BLUE})[${fullName}]]`);
    }
    if (position) {
        textBlocks.push(`#block(above: 0em, below: 1em)[#text(size: ${fontSize + 4}pt, weight: "bold")[${position}]]`);
    }
    if (contactParts.length > 0) {
        const below = socialParts.length > 0 ? '0.6em' : '1.4em';
        textBlocks.push(`#block(above: 0em, below: ${below})[#text(size: ${fontSize}pt)[${contactParts.join(' | ')}]]`);
    }
    if (socialParts.length > 0) {
        textBlocks.push(`#block(above: 0em, below: 1.4em)[#text(size: ${fontSize}pt)[${socialParts.join(' | ')}]]`);
    }
    const textColumn = textBlocks.join('\n');

    const photo = renderProfilePhoto(data, context);
    const headerBody = photo
        ? `#grid(
    columns: (1fr, auto),
    column-gutter: 16pt,
    align: (start + top, end + top),
    [${textColumn}],
    [${photo}],
)`
        : textColumn;

    return `${headerBody}
#block(above: 0.6em, below: 0em)[#line(length: 100%, stroke: 0.5pt + ${ATS_BLUE})]`;
}

const parse = ({ data, font, locale, t, fontSize, photoShape }: TemplateParseInput): string => {
    const isRtl = isRtlLocale(locale);
    const context = new RendererContext({
        t,
        fontSize,
        config: ATS_LAYOUT_CONFIG,
        locale,
        photoShape: photoShape || 'rectangle',
        sectionStyle: ATS_SECTION_STYLE,
    });

    const header = renderTopHeader(data, context, fontSize);
    const shared = getSharedSectionRenderers();

    const sectionRenderers: Record<string, () => string> = {
        profile: () => shared.profile(data, context),
        experience: () => shared.experience(data, context),
        internships: () => shared.internships(data, context),
        education: () => shared.education(data, context),
        skills: () => shared.skills(data, context),
        projects: () => shared.projects(data, context),
        languages: () => shared.languages(data, context),
        volunteering: () => shared.volunteering(data, context),
        certificates: () => shared.certificates(data, context),
    };

    const orderedKeys = Object.keys(sectionRenderers).sort((a, b) => {
        if (a === 'profile') return -1;
        if (b === 'profile') return 1;
        const orderA = data.sectionOrder?.[a as keyof SectionOrder] ?? 999;
        const orderB = data.sectionOrder?.[b as keyof SectionOrder] ?? 999;
        return orderA - orderB;
    });

    const sections = orderedKeys
        .map(key => sectionRenderers[key]())
        .filter(content => content.trim() !== '')
        .join('\n');

    const fontConfig = isRtl
        ? `#set text(font: ("${font}", ${LATIN_FONT_STACK}), size: ${fontSize}pt, dir: rtl)`
        : `#set text(font: ("${font}"), size: ${fontSize}pt)`;
    const leading = isRtl ? '0.7em' : '0.45em';

    return `#set page(margin: 1.2cm)
${fontConfig}
#set par(leading: ${leading})
${header}
${sections}
#pagebreak(weak: true)`;
};

export const atsFriendlyTemplate: Template = {
    id: 'ats-friendly',
    name: 'ATS Friendly',
    description: 'Single-column template with blue accents, optimized for applicant tracking systems',
    layoutConfig: {
        isTwoColumn: false,
        movableSections: [],
    },
    parse,
};
