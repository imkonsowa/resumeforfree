import { computed } from 'vue';

const RTL_LOCALES = new Set([
    'ar', 'fa', 'ur', 'yi', 'ji', 'ps', 'sd', 'ug',
    'arc', 'bcc', 'bqi', 'ckb', 'dv', 'glk', 'ku', 'mzn', 'pnb',
]);

export const isRtlLocale = (locale: string): boolean => RTL_LOCALES.has(locale.toLowerCase());

export const getLocaleDirection = (locale: string): 'rtl' | 'ltr' => (isRtlLocale(locale) ? 'rtl' : 'ltr');

export const useResumeT = () => {
    const { t } = useI18n({ useScope: 'global' });
    const resumeStore = useResumeStore();

    const locale = computed(() => resumeStore.activeResumeLanguage);

    const translate = (key: string, values?: Record<string, unknown>): string =>
        values
            ? t(key, values, { locale: locale.value })
            : t(key, 1, { locale: locale.value });

    return { t: translate, locale };
};

export const useLanguageSwitcher = () => {
    const { setLocale, locales } = useI18n();
    const settingsStore = useSettingsStore();

    const switchLanguage = (newLocale: string) => {
        setLocale(newLocale);
        settingsStore.setLocale(newLocale);

        if (import.meta.client) {
            const localeConfig = locales.value.find(l => l.code === newLocale);
            document.documentElement.dir = localeConfig?.dir || 'ltr';
            document.documentElement.lang = newLocale;
        }
    };

    return { switchLanguage };
};
