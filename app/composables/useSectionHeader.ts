import { computed } from 'vue';
import type { SectionHeaders } from '~/types/resume';

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

export function useSectionHeader() {
    const { t } = useI18n({ useScope: 'global' });
    const resumeStore = useResumeStore();

    const getSectionHeader = (section: keyof SectionHeaders) => {
        return computed(() => {
            const override = resumeStore.resumeData.sectionHeaders?.[section];
            if (override) return override;

            const translationKey = SECTION_TRANSLATION_MAP[section];
            return translationKey
                ? t(translationKey, 1, { locale: resumeStore.activeResumeLanguage })
                : '';
        });
    };

    const setSectionHeader = (section: keyof SectionHeaders, value: string) => {
        resumeStore.updateSectionHeader(section, value);
    };

    return {
        getSectionHeader,
        setSectionHeader,
    };
}
