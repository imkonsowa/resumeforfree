import { defineStore } from 'pinia';
import type { UserSettings, ResumeSettings } from '~/types/resume';
import { defaultUserSettings, defaultResumeSettings, getFontsForLanguage } from '~/types/resume';

export const useSettingsStore = defineStore('settings', {
    state: () => ({
        settings: { ...defaultUserSettings } as UserSettings,
        lastUpdated: Date.now() as number,
        isSyncing: false as boolean,
        lastSyncTime: null as number | null,
        lastSyncError: null as string | null,
    }),
    persist: true,
    getters: {
        selectedFont(): string {
            const resumeStore = useResumeStore();
            return resumeStore.activeResumeSettings.selectedFont || defaultResumeSettings.selectedFont;
        },
        selectedTemplate(): string {
            const resumeStore = useResumeStore();
            return resumeStore.activeResumeSettings.selectedTemplate || defaultResumeSettings.selectedTemplate;
        },
        fontSize(): number {
            const resumeStore = useResumeStore();
            return resumeStore.activeResumeSettings.fontSize ?? defaultResumeSettings.fontSize;
        },
        sectionCollapsed(): Record<string, boolean> {
            const resumeStore = useResumeStore();
            return resumeStore.activeResumeSettings.sectionCollapsed || {};
        },
        isRawMode(): boolean {
            const resumeStore = useResumeStore();
            return resumeStore.activeResumeSettings.isRawMode ?? false;
        },
        showDownloadMenu: state => state.settings.showDownloadMenu ?? false,
        showFontMenu: state => state.settings.showFontMenu ?? false,
        showTemplateMenu: state => state.settings.showTemplateMenu ?? false,
        availableFontsForCurrentLanguage: () => {
            const resumeStore = useResumeStore();
            return getFontsForLanguage(resumeStore.activeResumeLanguage);
        },
    },
    actions: {
        updateTimestamp() {
            this.lastUpdated = Date.now();
        },
        setSelectedFont(font: string) {
            const resumeStore = useResumeStore();
            resumeStore.setActiveResumeSetting('selectedFont', font);
            this.updateTimestamp();
        },
        setFontSize(size: number) {
            const resumeStore = useResumeStore();
            resumeStore.setActiveResumeSetting('fontSize', size);
            this.updateTimestamp();
        },
        setSelectedTemplate(template: string) {
            const resumeStore = useResumeStore();
            resumeStore.setActiveResumeSetting('selectedTemplate', template);
            this.updateTimestamp();
        },
        setLocale(locale: string) {
            this.settings.locale = locale;
            this.updateTimestamp();
        },
        toggleRawMode() {
            const resumeStore = useResumeStore();
            resumeStore.setActiveResumeSetting('isRawMode', !resumeStore.activeResumeSettings.isRawMode);
            this.updateTimestamp();
        },
        setIsRawMode(value: boolean) {
            const resumeStore = useResumeStore();
            resumeStore.setActiveResumeSetting('isRawMode', value);
            this.updateTimestamp();
        },
        setShowDownloadMenu(value: boolean) {
            this.settings.showDownloadMenu = value;
            this.updateTimestamp();
        },
        setShowFontMenu(value: boolean) {
            this.settings.showFontMenu = value;
            this.updateTimestamp();
        },
        setShowTemplateMenu(value: boolean) {
            this.settings.showTemplateMenu = value;
            this.updateTimestamp();
        },
        closeAllMenus() {
            this.settings.showDownloadMenu = false;
            this.settings.showFontMenu = false;
            this.settings.showTemplateMenu = false;
            this.updateTimestamp();
        },
        resetSettings() {
            this.settings = { ...defaultUserSettings };
            this.updateTimestamp();
        },
        updateSettings(newSettings: Partial<UserSettings>) {
            this.settings = { ...this.settings, ...newSettings };
            this.updateTimestamp();
        },
        toggleSectionCollapse(sectionKey: string) {
            const resumeStore = useResumeStore();
            resumeStore.toggleActiveResumeSectionCollapse(sectionKey);
            this.updateTimestamp();
        },
        setSectionCollapsed(sectionKey: string, collapsed: boolean) {
            const resumeStore = useResumeStore();
            resumeStore.setActiveResumeSectionCollapsed(sectionKey, collapsed);
            this.updateTimestamp();
        },
        collapseAllSections() {
            const resumeStore = useResumeStore();
            resumeStore.collapseAllActiveResumeSections();
            this.updateTimestamp();
        },
        expandAllSections() {
            const resumeStore = useResumeStore();
            resumeStore.expandAllActiveResumeSections();
            this.updateTimestamp();
        },
        initialize() {
            if (!this.settings.locale) {
                const { locale } = useI18n();
                this.settings.locale = locale.value;
            }
        },
        initializeFromServer(serverSettings: UserSettings, serverUpdatedAt: string) {
            const serverTimestamp = new Date(serverUpdatedAt).getTime();
            if (serverTimestamp > this.lastUpdated) {
                this.settings = { ...serverSettings };
                this.lastUpdated = serverTimestamp;
                return true;
            }
            return false;
        },
        setIsSyncing(value: boolean) {
            this.isSyncing = value;
        },
        setLastSyncTime(time: number) {
            this.lastSyncTime = time;
        },
        setLastSyncError(error: string | null) {
            this.lastSyncError = error;
        },
    },
});

export type { ResumeSettings };
