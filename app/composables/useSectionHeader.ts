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
    const { t } = useI18n({ useScope: 'global' });
    const resumeStore = useResumeStore();

    const resumeLanguage = computed(() => resumeStore.activeResumeLanguage);

    const getSectionHeader = (section: keyof SectionHeaders) => {
        return computed(() => {
            const data = resumeStore.resumeData;
            const lang = resumeLanguage.value;

            const i18nHeader = data.sectionHeadersI18n?.[lang]?.[section];
            if (i18nHeader) {
                return i18nHeader as string;
            }

            const oldHeader = data.sectionHeaders?.[section];
            if (oldHeader) {
                return oldHeader;
            }

            const translationKey = SECTION_TRANSLATION_MAP[section];
            return translationKey ? t(translationKey, 1, { locale: lang }) : '';
        });
    };

    const setSectionHeader = (section: keyof SectionHeaders, value: string) => {
        resumeStore.updateSectionHeader(section, value, resumeLanguage.value);
    };

    return {
        getSectionHeader,
        setSectionHeader,
    };
}
