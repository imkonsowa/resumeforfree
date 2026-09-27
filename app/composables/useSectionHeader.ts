import { computed } from 'vue';
import type { SectionHeaders } from '~/types/resume';
import { SECTION_TRANSLATION_MAP } from '~/utils/sectionHeaders';

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
