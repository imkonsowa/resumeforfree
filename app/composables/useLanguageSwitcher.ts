import { getDefaultFontForLanguage } from '~/types/resume';

export const useLanguageSwitcher = () => {
    const { setLocale, locales } = useI18n();
    const settingsStore = useSettingsStore();

    const switchLanguage = (newLocale: string) => {
        setLocale(newLocale);

        settingsStore.setLocale(newLocale);

        if (import.meta.client) {
            const localeConfig = locales.value.find(l => l.code === newLocale);
            const dir = localeConfig?.dir || 'ltr';

            document.documentElement.dir = dir;
            document.documentElement.lang = newLocale;

            const newDefaultFont = getDefaultFontForLanguage(newLocale);
            settingsStore.setSelectedFont(newDefaultFont);
        }
    };

    return { switchLanguage };
};
