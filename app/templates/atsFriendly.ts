import type { ResumeData, SectionHeaders, SectionOrder } from '~/types/resume';
import type { Template, TemplateParseInput, TemplateRenderConfig } from '~/types/template';
import { escapeTypstText } from '~/utils/stringUtils';
import { convertEmail, SECTION_SPACING } from '~/utils/typstUtils';
import { RendererContext } from '~/utils/rendererContext';
import { isRtlLocale } from '~/composables/useLocale';
import { SECTION_TRANSLATION_MAP } from '~/composables/useSectionHeader';
import {
    generateCertificatesContent,
    generateEducationContent,
    generateExperienceContent,
    generateInternshipsContent,
    generateLanguagesContent,
    generateProjectsContent,
    generateSkillsContent,
    generateVolunteeringContent,
} from '~/utils/templateRenderers';
import {
    formatCertificatesItems,
    formatEducationItems,
    formatExperienceItems,
    formatProjectsItems,
    formatSectionItems,
    formatSimpleItems,
} from '~/utils/layoutFormatters';

const ATS_BLUE = 'rgb("#1d4ed8")';

const ATS_LAYOUT_CONFIG: TemplateRenderConfig = {
    layout: 'single-column',
    sections: {
        spacing: 'joined',
        itemSpacing: '0.8em',
        joinSeparator: '\n\n',
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
};

function getHeader(section: keyof SectionHeaders, data: ResumeData, context: RendererContext): string {
    const override = data.sectionHeaders?.[section];
    if (override) return override.toUpperCase();
    const key = SECTION_TRANSLATION_MAP[section];
    return (key ? context.t(key) : '').toUpperCase();
}

function renderAtsSection(headerText: string, body: string, fontSize: number): string {
    if (!body.trim()) return '';
    return `#block(above: 1em, below: ${SECTION_SPACING})[
#text(size: ${fontSize + 1}pt, weight: "bold", fill: ${ATS_BLUE})[${escapeTypstText(headerText)}]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + ${ATS_BLUE})]
${body}
]`;
}

function renderTopHeader(data: ResumeData, fontSize: number): string {
    const firstName = escapeTypstText(data?.firstName || '').toUpperCase();
    const lastName = escapeTypstText(data?.lastName || '').toUpperCase();
    const fullName = `${firstName} ${lastName}`.trim();
    const position = escapeTypstText((data?.position || '')).toUpperCase();

    const contactParts: string[] = [];
    if (data?.location) contactParts.push(escapeTypstText(data.location));
    if (data?.email) contactParts.push(convertEmail(data.email));
    if (data?.phone) contactParts.push(`#text(dir: ltr)[${escapeTypstText(data.phone)}]`);

    const parts: string[] = [];

    if (fullName) {
        parts.push(`#block(above: 0em, below: 0.8em)[#text(size: ${fontSize + 14}pt, weight: "bold", fill: ${ATS_BLUE})[${fullName}]]`);
    }
    if (position) {
        parts.push(`#block(above: 0em, below: 1em)[#text(size: ${fontSize + 4}pt, weight: "bold")[${position}]]`);
    }
    if (contactParts.length > 0) {
        parts.push(`#block(above: 0em, below: 1.4em)[#text(size: ${fontSize}pt)[${contactParts.join(' | ')}]]`);
    }
    parts.push(`#block(above: 0em, below: 0em)[#line(length: 100%, stroke: 0.5pt + ${ATS_BLUE})]`);

    return parts.join('\n');
}

function renderProfile(data: ResumeData, context: RendererContext): string {
    if (!data?.summary) return '';
    const body = `#text(size: ${context.fontSize}pt)[${escapeTypstText(data.summary)}]`;
    return renderAtsSection(context.t('forms.personalInfo.profile') || 'PROFILE', body, context.fontSize);
}

function renderExperience(data: ResumeData, context: RendererContext): string {
    if (!data?.experiences?.length) return '';
    const items = generateExperienceContent(data.experiences, context.t);
    const body = formatExperienceItems(items, context.config, context.fontSize);
    return renderAtsSection(getHeader('experience', data, context), body, context.fontSize);
}

function renderInternships(data: ResumeData, context: RendererContext): string {
    if (!data?.internships?.length) return '';
    const items = generateInternshipsContent(data.internships, context.t);
    const body = formatExperienceItems(items, context.config, context.fontSize);
    return renderAtsSection(getHeader('internships', data, context), body, context.fontSize);
}

function renderEducation(data: ResumeData, context: RendererContext): string {
    if (!data?.education?.length) return '';
    const items = generateEducationContent(data.education, context.t);
    const body = formatEducationItems(items, context.config, context.fontSize);
    return renderAtsSection(getHeader('education', data, context), body, context.fontSize);
}

function renderSkills(data: ResumeData, context: RendererContext): string {
    if (!data?.skills?.length) return '';
    const items = generateSkillsContent(data.skills);
    const body = formatSimpleItems(items, context.config);
    return renderAtsSection(getHeader('skills', data, context), body, context.fontSize);
}

function renderProjects(data: ResumeData, context: RendererContext): string {
    if (!data?.projects?.length) return '';
    const items = generateProjectsContent(data.projects, context.t);
    const body = formatProjectsItems(items, context.config, context.fontSize);
    return renderAtsSection(getHeader('projects', data, context), body, context.fontSize);
}

function renderLanguages(data: ResumeData, context: RendererContext): string {
    if (!data?.languages?.length) return '';
    const items = generateLanguagesContent(data.languages);
    const contents = items.map(i => i.content || '').filter(Boolean);
    const body = formatSectionItems(contents, context.config.sections);
    return renderAtsSection(getHeader('languages', data, context), body, context.fontSize);
}

function renderVolunteering(data: ResumeData, context: RendererContext): string {
    if (!data?.volunteering?.length) return '';
    const items = generateVolunteeringContent(data.volunteering, context.t);
    const body = formatExperienceItems(items, context.config, context.fontSize);
    return renderAtsSection(getHeader('volunteering', data, context), body, context.fontSize);
}

function renderCertificates(data: ResumeData, context: RendererContext): string {
    if (!data?.certificates?.length) return '';
    const items = generateCertificatesContent(data.certificates, context.t);
    const body = formatCertificatesItems(items, context.config, context.fontSize);
    return renderAtsSection(getHeader('certificates', data, context), body, context.fontSize);
}

const parse = ({ data, font, locale, t, fontSize }: TemplateParseInput): string => {
    const isRtl = isRtlLocale(locale);
    const context = new RendererContext({ t, fontSize, config: ATS_LAYOUT_CONFIG, locale });

    const header = renderTopHeader(data, fontSize);

    const sectionRenderers: Record<string, () => string> = {
        profile: () => renderProfile(data, context),
        experience: () => renderExperience(data, context),
        internships: () => renderInternships(data, context),
        education: () => renderEducation(data, context),
        skills: () => renderSkills(data, context),
        projects: () => renderProjects(data, context),
        languages: () => renderLanguages(data, context),
        volunteering: () => renderVolunteering(data, context),
        certificates: () => renderCertificates(data, context),
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
        ? `#set text(font: ("${font}", "Arial"), size: ${fontSize}pt, dir: rtl)`
        : `#set text(font: ("${font}"), size: ${fontSize}pt)`;

    return `#set page(margin: 1.2cm)
${fontConfig}
#set par(leading: 0.45em)
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
