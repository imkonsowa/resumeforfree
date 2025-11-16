import { computed } from 'vue';
import type { SectionHeaders } from '~/types/resume';

export const SECTION_TRANSLATION_MAP: Record<keyof SectionHeaders, string> = {
    personalInfo: 'forms.personalInfo.title',
    profile: 'forms.personalInfo.summary',
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
    const { t, locale } = useI18n();
    const resumeStore = useResumeStore();

    const getSectionHeader = (section: keyof SectionHeaders) => {
        return computed(() => {
            const data = resumeStore.resumeData;

            const i18nHeader = data.sectionHeadersI18n?.[locale.value]?.[section];
            if (i18nHeader) {
                return i18nHeader as string;
            }

            const oldHeader = data.sectionHeaders?.[section];
            if (oldHeader) {
                return oldHeader;
            }

            const translationKey = SECTION_TRANSLATION_MAP[section];
            return translationKey ? t(translationKey) : '';
        });
    };

    const setSectionHeader = (section: keyof SectionHeaders, value: string) => {
        resumeStore.updateSectionHeader(section, value, locale.value);
    };

    return {
        getSectionHeader,
        setSectionHeader,
    };
}
