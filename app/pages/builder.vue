<script lang="ts" setup>
import { useResumeStore } from '~/stores/resume';
import ZoomControls from '~/components/elements/ZoomControls.vue';
import ResumeBuilderHeader from '~/components/elements/ResumeBuilderHeader.vue';
import ResumeLanguageSelector from '~/components/elements/ResumeLanguageSelector.vue';
import { getLocaleDirection } from '~/composables/useLocale';
import PersonalInfoForm from '~/components/forms/PersonalInfoForm.vue';
import ExperienceForm from '~/components/forms/ExperienceForm.vue';
import InternshipsForm from '~/components/forms/InternshipsForm.vue';
import EducationForm from '~/components/forms/EducationForm.vue';
import SkillsForm from '~/components/forms/SkillsForm.vue';
import ProjectsForm from '~/components/forms/ProjectsForm.vue';
import LanguagesForm from '~/components/forms/LanguagesForm.vue';
import VolunteeringForm from '~/components/forms/VolunteeringForm.vue';
import CertificatesForm from '~/components/forms/CertificatesForm.vue';
import ResumePreview from '~/components/elements/ResumePreview.vue';
import InvisibleTurnstile from '~/components/elements/InvisibleTurnstile.vue';
import FirstTimeBuilderModal from '~/components/elements/FirstTimeBuilderModal.vue';
import CloudSyncPromptModal from '~/components/elements/CloudSyncPromptModal.vue';
import SyncIndicator from '~/components/elements/SyncIndicator.vue';
import LanguageMismatchAlert from '~/components/elements/LanguageMismatchAlert.vue';

const { t, loadLocaleMessages } = useI18n({ useScope: 'global' });
const localePath = useLocalePath();

useHead({
    title: t('builder.pageTitle'),
    meta: [
        {
            name: 'description',
            content: t('builder.pageDescription'),
        },
        {
            name: 'keywords',
            content: 'resume builder, CV maker, professional resume, free resume template, PDF resume, online resume builder, privacy resume maker',
        },
        {
            name: 'robots',
            content: 'index, follow',
        },
        {
            property: 'og:type',
            content: 'website',
        },
        {
            property: 'og:site_name',
            content: 'Resume For Free',
        },
        {
            property: 'og:title',
            content: t('builder.pageTitle'),
        },
        {
            property: 'og:description',
            content: t('builder.pageDescription'),
        },
        {
            property: 'og:url',
            content: 'https://resumeforfree.com/builder',
        },
        {
            property: 'og:image',
            content: 'https://resumeforfree.com/og-image.png',
        },
        {
            name: 'twitter:card',
            content: 'summary_large_image',
        },
        {
            name: 'twitter:title',
            content: t('builder.pageTitle'),
        },
        {
            name: 'twitter:description',
            content: t('builder.pageDescription'),
        },
        {
            name: 'twitter:image',
            content: 'https://resumeforfree.com/og-image.png',
        },
    ],
    link: [
        {
            rel: 'canonical',
            href: 'https://resumeforfree.com/builder',
        },
    ],
});
const resumeStore = useResumeStore();
const settingsStore = useSettingsStore();
const authStore = useAuthStore();
const { hasSeenModal, markModalSeen } = useModalSeen('firstTimeBuilder');
const { startAutoSync, stopAutoSync, isSyncing, lastSyncSuccess, lastSyncTime, lastSyncError } = useAutoSync();
useTypstLoader();

const checkOtherModals = () => {
    if (!hasSeenModal() && !authStore.isAuthenticated && resumeStore.resumeCount > 0) {
        showFirstTimeModal.value = true;
        return;
    }

    if (authStore.isAuthenticated) {
        startAutoSync();

        const activeResume = resumeStore.activeResume;
        if (activeResume && !activeResume.serverId && resumeStore.canSaveToCloud) {
            const { isDismissed } = useCloudSyncPrompt(activeResume.id);
            if (!isDismissed()) {
                showCloudSyncModal.value = true;
            }
        }
    }
};

const resumeLanguageDir = computed(() => getLocaleDirection(resumeStore.activeResumeLanguage));

if (import.meta.client && resumeStore.activeResumeLanguage) {
    await loadLocaleMessages(resumeStore.activeResumeLanguage).catch(err => console.error('[builder] locale load failed:', err));
}

watch(
    () => resumeStore.activeResumeLanguage,
    (lang) => {
        if (lang) loadLocaleMessages(lang).catch(err => console.error('[builder] locale load failed:', err));
    },
);

onMounted(async () => {
    settingsStore.initialize();
    resumeStore.initialize();
    if (authStore.isLoggedIn) {
        await resumeStore.fetchServerResumes().catch((err) => {
            console.error('[builder] server fetch failed:', err);
        });
    }
    checkOtherModals();
});
watch(() => authStore.isAuthenticated, (isAuthenticated) => {
    if (isAuthenticated) {
        startAutoSync();
    }
    else {
        stopAutoSync();
    }
});

watch(() => resumeStore.activeResumeId, (newResumeId) => {
    if (newResumeId && authStore.isAuthenticated) {
        const activeResume = resumeStore.activeResume;
        if (activeResume && !activeResume.serverId && resumeStore.canSaveToCloud) {
            const { isDismissed } = useCloudSyncPrompt(activeResume.id);
            if (!isDismissed()) {
                showCloudSyncModal.value = true;
            }
        }
    }
});
const showMobilePreview = ref(false);

const { downloadPDF } = useResumeGenerator();
const turnstileRef = ref<InstanceType<typeof InvisibleTurnstile> | null>(null);
const isDownloading = ref(false);
const downloadError = ref('');

const handleQuickDownload = async () => {
    if (!resumeStore.activeResume || isDownloading.value) return;
    isDownloading.value = true;
    downloadError.value = '';
    try {
        await downloadPDF(resumeStore.activeResume);
        const token = await turnstileRef.value?.getToken();
        $fetch('/api/increase-downloads-count', {
            method: 'POST',
            body: { turnstileToken: token },
        })
            .catch(console.debug)
            .finally(() => turnstileRef.value?.reset());
    }
    catch (err) {
        downloadError.value = err instanceof Error ? err.message : 'Failed to download PDF';
        console.error('PDF download error:', err);
    }
    finally {
        isDownloading.value = false;
    }
};
const showFirstTimeModal = ref(false);
const showCloudSyncModal = ref(false);
const zoomLevel = ref(1);
const minZoom = 0.5;
const maxZoom = 2.5;
const zoomStep = 0.25;
const zoomIn = () => {
    if (zoomLevel.value < maxZoom) {
        zoomLevel.value = Math.min(zoomLevel.value + zoomStep, maxZoom);
    }
};
const zoomOut = () => {
    if (zoomLevel.value > minZoom) {
        zoomLevel.value = Math.max(zoomLevel.value - zoomStep, minZoom);
    }
};
const resetZoom = () => {
    zoomLevel.value = 1;
};
watch(showMobilePreview, (newValue) => {
    if (!newValue) {
        resetZoom();
    }
});
const handleFirstTimeModalClose = () => {
    showFirstTimeModal.value = false;
};
const handleContinueLocally = (dontShowAgain: boolean) => {
    showFirstTimeModal.value = false;
    if (dontShowAgain) {
        markModalSeen();
    }
};
const handleRegister = (dontShowAgain: boolean) => {
    showFirstTimeModal.value = false;
    if (dontShowAgain) {
        markModalSeen();
    }
    useCloudSyncIntent().markIntent();
    navigateTo(localePath('/auth/register'));
};
const handleLogin = (dontShowAgain: boolean) => {
    showFirstTimeModal.value = false;
    if (dontShowAgain) {
        markModalSeen();
    }
    useCloudSyncIntent().markIntent();
    navigateTo(localePath('/auth/login'));
};

const handleCloudSyncModalClose = () => {
    showCloudSyncModal.value = false;
};

const handleEnableSync = async (dontShowAgain: boolean) => {
    showCloudSyncModal.value = false;

    if (dontShowAgain && resumeStore.activeResumeId) {
        const { dismissPrompt } = useCloudSyncPrompt(resumeStore.activeResumeId);
        dismissPrompt();
    }

    if (resumeStore.activeResumeId) {
        try {
            await resumeStore.syncResumeToServer(resumeStore.activeResumeId);
        }
        catch (error) {
            console.error('Failed to enable cloud sync:', error);
        }
    }
};

const handleContinueWithoutSync = (dontShowAgain: boolean) => {
    showCloudSyncModal.value = false;

    if (dontShowAgain && resumeStore.activeResumeId) {
        const { dismissPrompt } = useCloudSyncPrompt(resumeStore.activeResumeId);
        dismissPrompt();
    }
};

const sectionComponents = {
    experiences: ExperienceForm,
    internships: InternshipsForm,
    education: EducationForm,
    technicalSkills: SkillsForm,
    projects: ProjectsForm,
    languages: LanguagesForm,
    volunteering: VolunteeringForm,
    certificates: CertificatesForm,
};
const allSections = Object.keys(sectionComponents);
const hasResumes = computed(() => resumeStore.resumeCount > 0);
const hasActiveResume = computed(() => Boolean(resumeStore.activeResume));
const orderedSections = computed(() => {
    const activeData = resumeStore.activeResumeData;
    if (!activeData?.sectionOrder) return allSections;
    const sectionOrder = activeData.sectionOrder;
    const leftSectionOrder = {
        experiences: sectionOrder.experience || 1,
        internships: sectionOrder.internships || 2,
        education: sectionOrder.education || 3,
        technicalSkills: sectionOrder.skills || 4,
        projects: sectionOrder.projects || 5,
        languages: sectionOrder.languages || 6,
        volunteering: sectionOrder.volunteering || 7,
        certificates: sectionOrder.certificates || 8,
    };
    return [...allSections].sort((a, b) => {
        return (leftSectionOrder[a as keyof typeof leftSectionOrder] || 999) - (leftSectionOrder[b as keyof typeof leftSectionOrder] || 999);
    });
});
</script>

<template>
    <ClientOnly>
        <div
            class="bg-muted min-h-screen"
            :dir="resumeLanguageDir"
        >
            <SyncIndicator
                :is-syncing="isSyncing"
                :last-sync-success="lastSyncSuccess"
                :last-sync-time="lastSyncTime"
                :error-message="lastSyncError"
            />
            <div
                v-if="!hasResumes || !hasActiveResume"
                class="min-h-screen flex items-center justify-center p-4"
            >
                <div class="max-w-md w-full text-center space-y-6">
                    <div class="space-y-4">
                        <div class="mx-auto w-16 h-16 bg-secondary/15 rounded-full flex items-center justify-center">
                            <UIcon
                                name="i-lucide-file-text"
                                class="w-8 h-8 text-secondary"
                            />
                        </div>
                        <div>
                            <h2 class="text-2xl font-semibold text-highlighted mb-2">
                                {{ t('builder.noResumeSelected') }}
                            </h2>
                            <p class="text-toned">
                                {{ t('builder.noResumeDescription') }}
                            </p>
                        </div>
                    </div>
                    <div>
                        <NuxtLink to="/resumes">
                            <UButton
                                class="w-full"
                                icon="i-lucide-file-text"
                            >
                                {{ t('builder.goToResumesPage') }} →
                            </UButton>
                        </NuxtLink>
                    </div>
                </div>
            </div>
            <div
                v-else
                class="flex flex-col lg:flex-row"
            >
                <div class="w-full lg:w-1/2 min-h-screen">
                    <div class="p-4 lg:p-8 pb-32">
                        <ResumeBuilderHeader />
                        <LanguageMismatchAlert />
                        <div class="space-y-6">
                            <PersonalInfoForm />
                            <div
                                v-for="sectionKey in orderedSections"
                                :id="sectionKey === 'personal' ? 'personal-info' : sectionKey === 'experiences' ? 'experience' : sectionKey === 'technicalSkills' ? 'skills' : sectionKey"
                                :key="sectionKey"
                            >
                                <component :is="sectionComponents[sectionKey as keyof typeof sectionComponents]" />
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="hidden lg:block fixed top-16 right-0 w-1/2 h-[calc(100vh-64px)] border-l border-default bg-muted overflow-y-auto z-10"
                >
                    <div class="p-4 lg:p-8 pt-[calc(2rem+4rem)]">
                        <ClientOnly>
                            <ResumePreview />
                        </ClientOnly>
                    </div>
                </div>
                <div
                    v-if="!showMobilePreview"
                    class="lg:hidden fixed bottom-[calc(1.5rem_+_env(safe-area-inset-bottom))] right-[calc(1.5rem_+_env(safe-area-inset-right))] z-40 flex items-center gap-2"
                >
                    <ResumeLanguageSelector
                        v-if="resumeStore.activeResume"
                        :model-value="resumeStore.activeResume.language"
                        button-variant="solid"
                        button-class="shadow-lg"
                        @update="(code) => resumeStore.setResumeLanguage(resumeStore.activeResume!.id, code)"
                    />
                    <UButton
                        size="sm"
                        icon="i-lucide-eye"
                        class="shadow-lg"
                        :aria-label="t('common.preview')"
                        @click="showMobilePreview = true"
                    />
                    <UButton
                        size="sm"
                        icon="i-lucide-download"
                        class="shadow-lg"
                        :loading="isDownloading"
                        :aria-label="t('builder.download')"
                        @click="handleQuickDownload"
                    />
                    <InvisibleTurnstile ref="turnstileRef" />
                </div>
                <UModal
                    v-model:open="showMobilePreview"
                    :title="t('builder.resumePreview')"
                    fullscreen
                    class="lg:hidden"
                >
                    <template #header>
                        <div class="flex items-center justify-between w-full gap-2">
                            <h3 class="text-lg font-medium text-highlighted">
                                {{ t('builder.resumePreview') }}
                            </h3>
                            <div class="flex items-center gap-2">
                                <ResumeLanguageSelector
                                    v-if="resumeStore.activeResume"
                                    :model-value="resumeStore.activeResume.language"
                                    @update="(code) => resumeStore.setResumeLanguage(resumeStore.activeResume!.id, code)"
                                />
                                <ZoomControls
                                    :max-zoom="maxZoom"
                                    :min-zoom="minZoom"
                                    :zoom-level="zoomLevel"
                                    :zoom-step="zoomStep"
                                    @zoom-in="zoomIn"
                                    @zoom-out="zoomOut"
                                />
                                <UButton
                                    color="neutral"
                                    variant="ghost"
                                    icon="i-lucide-x"
                                    :aria-label="t('common.close')"
                                    @click="showMobilePreview = false"
                                />
                            </div>
                        </div>
                    </template>

                    <template #body>
                        <div class="mobile-preview-wrapper">
                            <ResumePreview />
                        </div>
                    </template>
                </UModal>
            </div>
        </div>
        <FirstTimeBuilderModal
            :is-open="showFirstTimeModal"
            @close="handleFirstTimeModalClose"
            @register="handleRegister"
            @login="handleLogin"
            @continue-locally="handleContinueLocally"
        />
        <CloudSyncPromptModal
            :is-open="showCloudSyncModal"
            @close="handleCloudSyncModalClose"
            @enable-sync="handleEnableSync"
            @continue-locally="handleContinueWithoutSync"
        />
    </ClientOnly>
</template>

<style scoped>
    .mobile-preview-wrapper :deep(.resume-preview-wrapper svg) {
        transform: scale(v-bind(zoomLevel));
        transform-origin: top left;
        transition: transform 0.2s ease-in-out;
        margin: 0;
        display: block;
    }
    .mobile-preview-wrapper :deep(.resume-preview-wrapper) {
        width: max-content;
        margin: 0;
    }
    .mobile-preview-wrapper :deep(.preview-container) {
        display: flex;
        justify-content: flex-start;
        width: 100%;
    }
</style>
