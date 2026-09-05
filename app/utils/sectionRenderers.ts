import type { ResumeData, SectionHeaders } from '~/types/resume';
import type { SectionRenderer } from '~/types/template';
import { ITEMS_SPACING, PHOTO_SIZE } from './typstUtils';
import { escapeTypstText } from '~/utils/stringUtils';
import { SECTION_TRANSLATION_MAP } from '~/composables/useSectionHeader';
import type { RendererContext } from './rendererContext';
import {
    generateCertificatesContent,
    generateContactContent,
    generateEducationContent,
    generateExperienceContent,
    generateInternshipsContent,
    generateLanguagesContent,
    generateProjectsContent,
    generateSkillsContent,
    generateSocialLinksContent,
    generateVolunteeringContent,
} from './templateRenderers';
import {
    formatCertificatesItems,
    formatEducationItems,
    formatExperienceItems,
    formatProjectsItems,
    formatSectionItems,
    formatSimpleItems,
    formatSocialLinks,
    wrapInSection,
} from './layoutFormatters';

function getLocalizedSectionHeader(
    section: keyof SectionHeaders,
    data: ResumeData,
    context: RendererContext,
): string {
    const override = data.sectionHeaders?.[section];
    if (override) return override;

    const translationKey = SECTION_TRANSLATION_MAP[section];
    return translationKey ? context.t(translationKey) : '';
}

export const renderSharedExperience: SectionRenderer = (data: ResumeData, context: RendererContext): string => {
    if (!data?.experiences || data.experiences.length === 0) {
        return '';
    }

    const sectionContent = generateExperienceContent(data.experiences, context.t);
    const formattedContent = formatExperienceItems(sectionContent, context.config, context.fontSize);
    const headerText = getLocalizedSectionHeader('experience', data, context);

    return wrapInSection(headerText, formattedContent, context);
};

export const renderSharedInternships: SectionRenderer = (data: ResumeData, context: RendererContext): string => {
    if (!data?.internships || data.internships.length === 0) {
        return '';
    }

    const sectionContent = generateInternshipsContent(data.internships, context.t);
    const formattedContent = formatExperienceItems(sectionContent, context.config, context.fontSize);
    const headerText = getLocalizedSectionHeader('internships', data, context);

    return wrapInSection(headerText, formattedContent, context);
};

export const renderSharedEducation: SectionRenderer = (data: ResumeData, context: RendererContext): string => {
    if (!data?.education || data.education.length === 0) {
        return '';
    }

    const sectionContent = generateEducationContent(data.education, context.t);
    const formattedContent = formatEducationItems(sectionContent, context.config, context.fontSize);
    const headerText = getLocalizedSectionHeader('education', data, context);

    return wrapInSection(headerText, formattedContent, context);
};

export const renderSharedVolunteering: SectionRenderer = (data: ResumeData, context: RendererContext): string => {
    if (!data?.volunteering || data.volunteering.length === 0) {
        return '';
    }

    const sectionContent = generateVolunteeringContent(data.volunteering, context.t);
    const formattedContent = formatExperienceItems(sectionContent, context.config, context.fontSize);
    const headerText = getLocalizedSectionHeader('volunteering', data, context);

    return wrapInSection(headerText, formattedContent, context);
};

export const renderSharedProjects: SectionRenderer = (data: ResumeData, context: RendererContext): string => {
    if (!data?.projects || data.projects.length === 0) {
        return '';
    }

    const sectionContent = generateProjectsContent(data.projects, context.t);
    if (sectionContent.length === 0) return '';

    const formattedContent = formatProjectsItems(sectionContent, context.config, context.fontSize);
    const headerText = getLocalizedSectionHeader('projects', data, context);

    return wrapInSection(headerText, formattedContent, context);
};

export const renderSharedSkillsBody = (data: ResumeData): string => {
    if (data?.skills && data.skills.length > 0) {
        const sectionContent = generateSkillsContent(data.skills);
        if (sectionContent.length === 0) return '';
        return formatSectionItems(sectionContent.map(item => item.content || ''), {
            spacing: 'block',
            itemSpacing: ITEMS_SPACING,
            joinSeparator: '',
        });
    }
    if (!data?.technicalSkills || data.technicalSkills.trim() === '') return '';
    return data.technicalSkills.trim();
};

export const renderSharedSkills: SectionRenderer = (data: ResumeData, context: RendererContext): string => {
    const body = renderSharedSkillsBody(data);
    if (!body) return '';
    const headerText = getLocalizedSectionHeader('skills', data, context);
    return wrapInSection(headerText, body, context);
};

export const renderSharedLanguagesBody = (data: ResumeData, context: RendererContext): string => {
    if (!data?.languages || data.languages.length === 0) return '';
    const sectionContent = generateLanguagesContent(data.languages, context.t);
    if (sectionContent.length === 0) return '';
    return formatSectionItems(sectionContent.map(item => item.content || ''), {
        spacing: 'block',
        itemSpacing: ITEMS_SPACING,
        joinSeparator: '',
    });
};

export const renderSharedLanguages: SectionRenderer = (data: ResumeData, context: RendererContext): string => {
    const body = renderSharedLanguagesBody(data, context);
    if (!body) return '';
    const headerText = getLocalizedSectionHeader('languages', data, context);
    return wrapInSection(headerText, body, context);
};

export const renderSharedContactInfo: SectionRenderer = (data: ResumeData, context: RendererContext): string => {
    const sectionContent = generateContactContent(data);
    if (sectionContent.length === 0) return '';

    const formattedContent = formatSimpleItems(sectionContent, context.config);
    const headerText = getLocalizedSectionHeader('info', data, context);

    return wrapInSection(headerText, formattedContent, context);
};

export const renderSharedSocialLinks: SectionRenderer = (data: ResumeData, context: RendererContext): string => {
    const sectionContent = generateSocialLinksContent(data);
    if (sectionContent.length === 0) return '';

    const formattedContent = formatSocialLinks(sectionContent, context.config.socialLinks);
    const headerText = getLocalizedSectionHeader('socialLinks', data, context);

    if (context.config.socialLinks.placement === 'header' && context.config.socialLinks.orientation === 'horizontal') {
        return formattedContent;
    }

    return wrapInSection(headerText, formattedContent, context);
};

export const renderSharedProfileBody = (data: ResumeData): string => {
    if (!data?.summary || !data.summary.trim()) return '';
    return escapeTypstText(data.summary.trim());
};

export const renderSharedProfile: SectionRenderer = (data: ResumeData, context: RendererContext): string => {
    const body = renderSharedProfileBody(data);
    if (!body) return '';
    const headerText = getLocalizedSectionHeader('profile', data, context);
    return wrapInSection(headerText, body, context);
};

export const renderSharedCertificates: SectionRenderer = (data: ResumeData, context: RendererContext): string => {
    if (!data?.certificates || data.certificates.length === 0) {
        return '';
    }

    const sectionContent = generateCertificatesContent(data.certificates, context.t);
    if (sectionContent.length === 0) return '';

    const formattedContent = formatCertificatesItems(sectionContent, context.config, context.fontSize);
    const headerText = getLocalizedSectionHeader('certificates', data, context);

    return wrapInSection(headerText, formattedContent, context);
};

export const renderProfilePhoto = (data: ResumeData, context: RendererContext): string => {
    const photoCfg = context.config.photo;
    if (!photoCfg?.supported || !data.photo) return '';
    const radius = context.photoShape === 'circle' ? '50%' : '1mm';
    return `#box(width: ${PHOTO_SIZE}, height: ${PHOTO_SIZE}, clip: true, radius: ${radius}, image("/photo", width: 100%, height: 100%, fit: "cover"))`;
};

export const getSharedSectionRenderers = () => ({
    experience: renderSharedExperience,
    internships: renderSharedInternships,
    education: renderSharedEducation,
    volunteering: renderSharedVolunteering,
    projects: renderSharedProjects,
    skills: renderSharedSkills,
    languages: renderSharedLanguages,
    contactInfo: renderSharedContactInfo,
    socialLinks: renderSharedSocialLinks,
    profile: renderSharedProfile,
    certificates: renderSharedCertificates,
    photo: renderProfilePhoto,
});
