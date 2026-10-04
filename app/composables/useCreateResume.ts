import { defaultResumeSettings, getDefaultFontForLanguage } from '#layers/core/app/types/resume';
import type { ResumeData, ResumeSettings } from '#layers/core/app/types/resume';

export interface ResumeStart {
    data: ResumeData;
    settings: Partial<ResumeSettings>;
}

export const useCreateResume = () => {
    const { t } = useI18n();
    const notify = useNotify();
    const resumeStore = useResumeStore();
    const authStore = useAuthStore();

    const defaultResumeName = () => {
        const userName = authStore.isLoggedIn ? authStore.user?.name?.trim() : '';
        return userName ? `${userName} - Resume` : 'Untitled Resume';
    };

    const saveNewResumeToCloud = async (resumeId: string, name: string) => {
        try {
            notify.info(t('resumes.notify.creatingInCloud'));
            const resume = resumeStore.resumes[resumeId];
            if (!resume) return;
            const cloudResume = await useApi().resumes.create(resume);
            if (resumeStore.resumes[resumeId] && cloudResume) {
                resumeStore.resumes[resumeId].serverId = cloudResume.id;
                resumeStore.resumes[resumeId].updatedAt = new Date().toISOString();
            }
            notify.success(t('resumes.notify.createdAndSaved', { name }));
        }
        catch (error: unknown) {
            console.error('Failed to save resume to cloud:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            notify.warning(t('resumes.notify.createdLocallyFailed', { name, error: errorMessage }));
        }
    };

    const createResume = async (name: string, language: string, saveToCloud: boolean, start?: ResumeStart) => {
        const resumeName = name.trim() || defaultResumeName();
        const resumeId = resumeStore.createResume({
            name: resumeName,
            language,
            settings: { ...defaultResumeSettings, selectedFont: getDefaultFontForLanguage(language), ...start?.settings },
            data: start ? structuredClone(start.data) : undefined,
        });
        resumeStore.setActiveResume(resumeId);

        if (saveToCloud && authStore.isLoggedIn) {
            await saveNewResumeToCloud(resumeId, resumeName);
        }
        else if (saveToCloud) {
            notify.warning(t('resumes.notify.loginToSaveCloud'));
        }
        else {
            notify.success(t('resumes.notify.created', { name: resumeName }));
        }
        return resumeId;
    };

    return { createResume, defaultResumeName };
};
