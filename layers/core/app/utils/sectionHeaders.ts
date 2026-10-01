import type { SectionHeaders } from '#layers/core/app/types/resume';

export const SECTION_TRANSLATION_MAP: Record<keyof SectionHeaders, string> = {
    personalInfo: 'forms.personalInfo.title',
    profile: 'forms.personalInfo.profile',
    info: 'forms.personalInfo.title',
    socialLinks: 'forms.personalInfo.socialLinks',
    projects: 'forms.projects.title',
    languages: 'forms.languages.title',
    experience: 'forms.experience.title',
    internships: 'forms.internships.title',
    education: 'forms.education.title',
    skills: 'forms.skills.title',
    volunteering: 'forms.volunteering.title',
    certificates: 'forms.certificates.title',
} as const;
