import type { ResumeData, SectionHeaders, SectionOrder } from '~/types/resume';
import type { SectionContent, Template, TemplateParseInput, TemplateRenderConfig } from '~/types/template';
import { escapeTypstText } from '~/utils/stringUtils';
import { convertEmail, convertLink, convertList, SECTION_SPACING } from '~/utils/typstUtils';
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

const SIMPLE_LAYOUT_CONFIG: TemplateRenderConfig = {
    layout: 'single-column',
    sections: { spacing: 'joined', itemSpacing: '', joinSeparator: '\n\n' },
    socialLinks: { orientation: 'horizontal', placement: 'header', separator: ', ' },
    header: { style: 'simple', includeContact: true },
    projects: { itemSpacing: '' },
};

interface SimpleRow {
    date?: string;
    content: string;
}

interface SimpleSection {
    label: string;
    rows: SimpleRow[];
}

function getSectionLabel(section: keyof SectionHeaders, data: ResumeData, context: RendererContext): string {
    const override = data.sectionHeaders?.[section];
    if (override) return override.toUpperCase();
    const key = SECTION_TRANSLATION_MAP[section];
    return (key ? context.t(key) : '').toUpperCase();
}

function titleMarkup(item: SectionContent): string {
    if (item.titleContent) return `#text(weight: "bold")[${item.titleContent}]`;
    if (item.title) return `*${escapeTypstText(item.title)}*`;
    return '';
}

function renderRowContent(item: SectionContent): string {
    const parts: string[] = [];
    const title = titleMarkup(item);
    if (title) parts.push(title);
    if (item.content) parts.push(item.content);
    if (item.additionalInfo) parts.push(item.additionalInfo);
    if (item.achievements?.length) {
        const list = convertList(item.achievements);
        if (list) parts.push(list);
    }
    return parts.join('\n\n');
}

function itemsToRows(items: SectionContent[]): SimpleRow[] {
    return items
        .map(item => ({ date: item.date, content: renderRowContent(item) }))
        .filter(r => r.content.trim());
}

function buildSection(label: string, rows: SimpleRow[]): SimpleSection | null {
    if (!rows.length) return null;
    return { label, rows };
}

function renderProfile(data: ResumeData, context: RendererContext): SimpleSection | null {
    if (!data?.summary) return null;
    return buildSection(
        context.t('forms.personalInfo.profile') || 'PROFILE',
        [{ content: escapeTypstText(data.summary) }],
    );
}

function renderLinks(data: ResumeData, context: RendererContext): SimpleSection | null {
    const socialLinks = (data?.socialLinks || []).filter(l => l.platform && l.url?.trim());
    if (!socialLinks.length) return null;

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

    const parts = socialLinks.map((link) => {
        const label = link.platform === 'other' && link.customLabel
            ? link.customLabel
            : (platformLabels[link.platform] || link.platform);
        return convertLink(link.url, label);
    });

    return buildSection(
        context.t('forms.personalInfo.socialLinks') || 'LINKS',
        [{ content: parts.join(', ') }],
    );
}

function renderSimpleSection(section: SimpleSection, fontSize: number, isFirst: boolean): string {
    if (!section.rows.length) return '';

    const label = `#text(size: ${fontSize - 1}pt, tracking: 0.08em)[${escapeTypstText(section.label)}]`;

    const cells: string[] = [];
    section.rows.forEach((row, idx) => {
        const leftParts: string[] = [];
        if (idx === 0) leftParts.push(label);
        if (row.date) {
            leftParts.push(`#text(size: ${fontSize - 1}pt)[${row.date}]`);
        }
        cells.push(`[${leftParts.join('\n\n')}]`);
        cells.push(`[${row.content}]`);
    });

    const topRule = isFirst ? '' : `#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]`;

    return `${topRule}
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    ${cells.join(',\n    ')}
)`;
}

function renderHeader(data: ResumeData, fontSize: number): string {
    const fullName = `${escapeTypstText(data?.firstName || '')} ${escapeTypstText(data?.lastName || '')}`.trim();
    const position = escapeTypstText(data?.position || '');

    const contactParts: string[] = [];
    if (data?.location) contactParts.push(escapeTypstText(data.location));
    if (data?.phone) contactParts.push(`#text(dir: ltr)[${escapeTypstText(data.phone)}]`);
    if (data?.email) contactParts.push(convertEmail(data.email));

    const parts: string[] = [];
    if (fullName) {
        parts.push(`#block(width: 100%, above: 0em, below: 0.6em)[#align(center)[#text(size: ${fontSize + 8}pt, weight: "bold")[${fullName}]]]`);
    }
    if (position) {
        parts.push(`#block(width: 100%, above: 0em, below: 1em)[#align(center)[#text(size: ${fontSize + 2}pt)[${position}]]]`);
    }
    if (contactParts.length) {
        parts.push(`#block(width: 100%, above: 0em, below: 1.4em)[#align(center)[#text(size: ${fontSize}pt)[${contactParts.join(' · ')}]]]`);
    }
    parts.push(`#block(above: 0em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]`);

    return parts.join('\n');
}

const parse = ({ data, font, locale, t, fontSize }: TemplateParseInput): string => {
    const isRtl = isRtlLocale(locale);
    const context = new RendererContext({ t, fontSize, config: SIMPLE_LAYOUT_CONFIG, locale });

    const sectionMap: Record<string, () => SimpleSection | null> = {
        links: () => renderLinks(data, context),
        profile: () => renderProfile(data, context),
        education: () => buildSection(
            getSectionLabel('education', data, context),
            itemsToRows(generateEducationContent(data.education || [], context.t)),
        ),
        experience: () => buildSection(
            getSectionLabel('experience', data, context),
            itemsToRows(generateExperienceContent(data.experiences || [], context.t)),
        ),
        internships: () => buildSection(
            getSectionLabel('internships', data, context),
            itemsToRows(generateInternshipsContent(data.internships || [], context.t)),
        ),
        skills: () => buildSection(
            getSectionLabel('skills', data, context),
            itemsToRows(generateSkillsContent(data.skills || [])),
        ),
        languages: () => buildSection(
            getSectionLabel('languages', data, context),
            itemsToRows(generateLanguagesContent(data.languages || [])),
        ),
        projects: () => buildSection(
            getSectionLabel('projects', data, context),
            itemsToRows(generateProjectsContent(data.projects || [], context.t)),
        ),
        volunteering: () => buildSection(
            getSectionLabel('volunteering', data, context),
            itemsToRows(generateVolunteeringContent(data.volunteering || [], context.t)),
        ),
        certificates: () => buildSection(
            getSectionLabel('certificates', data, context),
            itemsToRows(generateCertificatesContent(data.certificates || [], context.t)),
        ),
    };

    const fixedOrder = ['links', 'profile'];
    const orderedDataSections = Object.keys(sectionMap)
        .filter(k => !fixedOrder.includes(k))
        .sort((a, b) => {
            const orderA = data.sectionOrder?.[a as keyof SectionOrder] ?? 999;
            const orderB = data.sectionOrder?.[b as keyof SectionOrder] ?? 999;
            return orderA - orderB;
        });

    const rendered: string[] = [];
    let first = true;
    for (const key of [...fixedOrder, ...orderedDataSections]) {
        const section = sectionMap[key]();
        if (!section) continue;
        const out = renderSimpleSection(section, fontSize, first);
        if (out) {
            rendered.push(out);
            first = false;
        }
    }

    const fontConfig = isRtl
        ? `#set text(font: ("${font}", "Arial"), size: ${fontSize}pt, dir: rtl)`
        : `#set text(font: ("${font}"), size: ${fontSize}pt)`;

    return `#set page(margin: 1.5cm)
${fontConfig}
#set par(leading: 0.5em, justify: false)
${renderHeader(data, fontSize)}
#v(${SECTION_SPACING})
${rendered.join('\n')}
#pagebreak(weak: true)`;
};

export const simpleTemplate: Template = {
    id: 'simple',
    name: 'Simple',
    description: 'Traditional academic CV layout with labeled columns and horizontal rules',
    layoutConfig: {
        isTwoColumn: false,
        movableSections: [],
    },
    parse,
};
