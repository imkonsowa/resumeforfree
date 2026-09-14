import type { Certificate, Education, Experience, Internship, Language, Project, ResumeData, SkillItem, Volunteering } from '~/types/resume';
import type { SectionContent, TranslateFunction } from '~/types/template';
import { convertDateRange, convertEmail, convertLink, convertUnderlinedLink, formatDateRangeText } from './typstUtils';
import { escapeTypstText } from './stringUtils';

const buildPositionAtCompanyContent = (
    position: string,
    company: string,
    companyUrl: string | undefined,
    location: string,
    at: string,
    separator: string,
): string => {
    let content = escapeTypstText(position);
    if (company) {
        const companyMarkup = companyUrl?.trim()
            ? convertUnderlinedLink(companyUrl.trim(), company)
            : escapeTypstText(company);
        content += at + companyMarkup;
    }
    if (location) {
        content += separator + escapeTypstText(location);
    }
    return content;
};

export const SOCIAL_PLATFORM_LABELS = {
    linkedin: 'LinkedIn',
    github: 'GitHub',
    twitter: 'Twitter',
    portfolio: 'Portfolio',
    dribbble: 'Dribbble',
    medium: 'Medium',
    devto: 'Dev.to',
    personal: 'Personal',
} as const;
const isBlankValue = (value: unknown): boolean => {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim() === '';
    if (typeof value === 'boolean') return true;
    if (Array.isArray(value)) return value.every(isBlankValue);
    if (typeof value === 'object') return Object.values(value as Record<string, unknown>).every(isBlankValue);
    return false;
};

export const hasSectionItemContent = (item: unknown): boolean => !isBlankValue(item);

export const generateExperienceContent = (experiences: Experience[], t?: TranslateFunction, locale?: string): SectionContent[] => {
    return experiences.filter(hasSectionItemContent).map((experience) => {
        const at = t ? t('template.at') : ' at ';
        const separator = t ? t('template.separator') : ', ';
        const titleContent = buildPositionAtCompanyContent(
            experience.position,
            experience.company,
            experience.companyUrl,
            experience.location,
            at,
            separator,
        );
        const dateInput = { startDate: experience.startDate, endDate: experience.endDate, isPresent: experience.isPresent, t, locale };
        const achievements = experience.achievements
            .filter(achievement => achievement.text && achievement.text.trim() !== '')
            .map(achievement => achievement.text);
        const description = experience.description?.trim();
        return {
            title: '',
            titleContent,
            date: convertDateRange(dateInput),
            dateText: formatDateRangeText(dateInput),
            description: description ? escapeTypstText(description) : undefined,
            achievements,
        };
    });
};
export const generateInternshipsContent = (internships: Internship[], t?: TranslateFunction, locale?: string): SectionContent[] => {
    return internships.filter(hasSectionItemContent).map((internship) => {
        const at = t ? t('template.at') : ' at ';
        const separator = t ? t('template.separator') : ', ';
        const titleContent = buildPositionAtCompanyContent(
            internship.position,
            internship.company,
            internship.companyUrl,
            internship.location,
            at,
            separator,
        );
        const dateInput = { startDate: internship.startDate, endDate: internship.endDate, isPresent: internship.isPresent, t, locale };
        const achievements = internship.achievements
            .filter(achievement => achievement.text && achievement.text.trim() !== '')
            .map(achievement => achievement.text);
        const description = internship.description?.trim();
        return {
            title: '',
            titleContent,
            date: convertDateRange(dateInput),
            dateText: formatDateRangeText(dateInput),
            description: description ? escapeTypstText(description) : undefined,
            achievements,
        };
    });
};
export const generateEducationContent = (education: Education[], t?: TranslateFunction, locale?: string): SectionContent[] => {
    return education.filter(hasSectionItemContent).map((edu) => {
        const at = t ? t('template.at') : ' at ';
        const separator = t ? t('template.separator') : ', ';
        const gradeLabel = t ? t('template.grade') : 'Grade:';
        const title = edu.degree && edu.institution
            ? `${edu.degree}${at}${edu.institution}${edu.location ? separator + edu.location : ''}`
            : `${edu.degree || edu.institution}${edu.location ? separator + edu.location : ''}`;
        const dateInput = { startDate: edu.startDate, endDate: edu.endDate, isPresent: edu.isPresent || false, t, locale };
        let description = '';
        if (edu.graduationScore && edu.graduationScore.trim()) {
            description += `*${gradeLabel}* ${escapeTypstText(edu.graduationScore)}`;
        }
        if (edu.description && edu.description.trim()) {
            if (description) description += '\n\n';
            description += escapeTypstText(edu.description);
        }
        const achievements = (edu.achievements || [])
            .filter(achievement => achievement.text && achievement.text.trim() !== '')
            .map(achievement => achievement.text);
        return {
            title,
            date: convertDateRange(dateInput),
            dateText: formatDateRangeText(dateInput),
            description: description || undefined,
            achievements,
        };
    });
};
export const generateVolunteeringContent = (volunteering: Volunteering[], t?: TranslateFunction, locale?: string): SectionContent[] => {
    return volunteering.filter(hasSectionItemContent).map((vol) => {
        const at = t ? t('template.at') : ' at ';
        const separator = t ? t('template.separator') : ', ';
        const titleContent = buildPositionAtCompanyContent(
            vol.position,
            vol.organization,
            vol.organizationUrl,
            vol.location,
            at,
            separator,
        );
        const dateInput = { startDate: vol.startDate, endDate: vol.endDate, isPresent: vol.isPresent, t, locale };
        const achievements = vol.achievements
            .filter(achievement => achievement.text && achievement.text.trim() !== '')
            .map(achievement => achievement.text);
        const description = vol.description?.trim();
        return {
            title: '',
            titleContent,
            date: convertDateRange(dateInput),
            dateText: formatDateRangeText(dateInput),
            description: description ? escapeTypstText(description) : undefined,
            achievements,
        };
    });
};
export const generateProjectsContent = (projects: Project[], t?: TranslateFunction, locale?: string): SectionContent[] => {
    return projects
        .filter((project) => {
            const hasLinks = Array.isArray(project.links) && project.links.length > 0;
            const hasAchievements = Array.isArray(project.achievements)
                && project.achievements.some(a => a.text?.trim());
            return project.title.trim() || project.description.trim() || hasLinks || hasAchievements;
        })
        .map((project) => {
            const name = project.title.trim() ? escapeTypstText(project.title.trim()) : '';
            const linkMarkups = (project.links || [])
                .map((link) => {
                    const url = link.url?.trim();
                    const label = link.label?.trim();
                    return url && label ? convertLink(url, label) : '';
                })
                .filter(Boolean);
            const titleContent = [name, ...linkMarkups].filter(Boolean).join(' • ');
            const desc = project.description.trim() ? escapeTypstText(project.description.trim()) : '';

            const dateInput = {
                startDate: project.startDate,
                endDate: project.endDate,
                isPresent: project.isPresent,
                t,
                locale,
            };
            const achievements = (project.achievements || [])
                .filter(a => a.text && a.text.trim() !== '')
                .map(a => a.text);

            return {
                title: '',
                titleContent: titleContent || undefined,
                date: convertDateRange(dateInput),
                dateText: formatDateRangeText(dateInput),
                description: desc || undefined,
                achievements,
            };
        });
};
export const generateSkillsContent = (skills: SkillItem[]): SectionContent[] => {
    return skills
        .filter(skill => skill.title.trim() || skill.description.trim())
        .map((skill) => {
            let content: string;
            if (!skill.title.trim()) {
                content = escapeTypstText(skill.description);
            }
            else if (!skill.description.trim()) {
                content = `*${escapeTypstText(skill.title)}*`;
            }
            else {
                content = `*${escapeTypstText(skill.title)}:* ${escapeTypstText(skill.description)}`;
            }
            return {
                title: '',
                content,
            };
        });
};
const PROFICIENCY_KEYS = new Set(['native', 'fluent', 'proficient', 'conversational', 'basic', 'beginner']);
const localizeProficiency = (value: string, t?: TranslateFunction): string => {
    if (!t) return value;
    const key = value.trim().toLowerCase();
    if (!PROFICIENCY_KEYS.has(key)) return value;
    return t(`proficiency.${key}`);
};
export const generateLanguagesContent = (languages: Language[], t?: TranslateFunction): SectionContent[] => {
    return languages
        .filter(language => language.name.trim())
        .map((language) => {
            let content = `*${escapeTypstText(language.name)}*`;
            if (language.proficiency.trim()) {
                content += ` - ${escapeTypstText(localizeProficiency(language.proficiency, t))}`;
            }
            return {
                title: '',
                content,
            };
        });
};
export const generateContactContent = (data: ResumeData): SectionContent[] => {
    const contactInfo: SectionContent[] = [];
    if (data?.email) {
        contactInfo.push({
            title: '',
            content: convertEmail(data.email),
        });
    }
    if (data?.phone) {
        contactInfo.push({
            title: '',
            content: `#text(dir: ltr)[${escapeTypstText(data.phone)}]`,
        });
    }
    if (data?.location) {
        contactInfo.push({
            title: '',
            content: escapeTypstText(data.location),
        });
    }
    return contactInfo;
};
export const generateSocialLinksContent = (data: ResumeData): SectionContent[] => {
    const socialLinks = (data?.socialLinks || [])
        .filter(link => link.platform && link.url && link.url.trim() !== '');
    return socialLinks.map((link) => {
        let linkText: string;
        if (link.platform === 'other' && link.customLabel) {
            linkText = link.customLabel;
        }
        else {
            linkText = SOCIAL_PLATFORM_LABELS[link.platform as keyof typeof SOCIAL_PLATFORM_LABELS] || link.platform;
        }
        return {
            title: '',
            content: convertLink(link.url, linkText),
        };
    });
};
export const generateCertificatesContent = (certificates: Certificate[], t?: TranslateFunction, locale?: string): SectionContent[] => {
    const linkLabel = t ? t('common.link') : 'Link';
    const fromLabel = t ? t('template.from') : ' from ';
    return certificates
        .filter(cert => cert.title.trim() || cert.issuer.trim())
        .map((cert) => {
            const title = `${cert.title}${cert.issuer ? fromLabel + cert.issuer : ''}`;
            const certLink = cert.url?.trim() ? convertLink(cert.url, linkLabel) : '';
            const titleContent = certLink
                ? `${escapeTypstText(title)} · ${certLink}`
                : undefined;
            const dateInput = { startDate: cert.date, locale };
            const description = cert.description?.trim() ? escapeTypstText(cert.description) : '';
            return {
                title,
                titleContent,
                date: cert.date ? convertDateRange(dateInput) : '',
                dateText: cert.date ? formatDateRangeText(dateInput) : '',
                description: description || undefined,
            };
        });
};
