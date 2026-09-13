<script lang="ts" setup>
import ConfirmationModal from '~/components/elements/ConfirmationModal.vue';
import CreateResumeModal from '~/components/elements/CreateResumeModal.vue';
import CopyResumeModal from '~/components/elements/CopyResumeModal.vue';
import ExportModal from '~/components/elements/ExportModal.vue';
import ImportConfirmationModal from '~/components/elements/ImportConfirmationModal.vue';
import CloudSyncModal from '~/components/elements/CloudSyncModal.vue';
import ResumesHeader from '~/components/resumes/ResumesHeader.vue';
import ResumesGrid from '~/components/resumes/ResumesGrid.vue';
import ResumesEmptyState from '~/components/resumes/ResumesEmptyState.vue';
import type { ImportResumePreview, Resume } from '~/types/resume';

const { t } = useI18n();
const notify = useNotify();
const localePath = useLocalePath();
const resumeStore = useResumeStore();
const authStore = useAuthStore();
const router = useRouter();
const confirmation = useConfirmation();
const { exportResumes, parseImportFile, importSelectedResumes } = useResumeImportExport();
useTypstLoader();
const { downloadPDF, typstReady } = useResumeGenerator();

const waitForTypst = () => new Promise<void>((resolve, reject) => {
    if (typstReady.value) return resolve();
    const timeout = setTimeout(() => {
        stop();
        reject(new Error('Typst renderer timed out'));
    }, 120000);
    const stop = watch(typstReady, (ready) => {
        if (!ready) return;
        clearTimeout(timeout);
        stop();
        resolve();
    });
});

const downloadingId = ref<string | null>(null);

const handleDownloadPdf = async (resumeId: string) => {
    if (downloadingId.value) return;
    const resume = resumeStore.resumesList.find(item => item.id === resumeId);
    if (!resume) return;

    downloadingId.value = resumeId;
    try {
        await waitForTypst();
        await downloadPDF(resume);
        $fetch('/api/increase-downloads-count', { method: 'POST', body: {} }).catch(console.debug);
    }
    catch (error) {
        console.error('PDF download error:', error);
        notify.error(t('resumes.card.downloadPdfFailed'));
    }
    finally {
        downloadingId.value = null;
    }
};
const searchQuery = ref('');
const fetchServerResumesIfLoggedIn = async () => {
    if (authStore.isLoggedIn) {
        try {
            await resumeStore.fetchServerResumes();
            await maybeFulfilCloudSyncIntent();
        }
        catch (error) {
            console.error('Failed to fetch server resumes:', error);
        }
    }
};

const maybeFulfilCloudSyncIntent = async () => {
    const { consumeIntent } = useCloudSyncIntent();
    if (!consumeIntent()) return;

    const { synced, skipped } = await resumeStore.syncLocalOnlyResumes();
    if (synced > 0) {
        notify.success(t('notifications.autoSyncedToCloud', { count: synced }));
    }
    if (skipped > 0) {
        notify.info(t('notifications.cloudLimitReached', { count: skipped }));
    }
    await useResumePhoto().syncLocalPhotosToServer();
};

onMounted(async () => {
    resumeStore.initialize();
    await fetchServerResumesIfLoggedIn();
});
watch(() => authStore.isLoggedIn, async (isLoggedIn) => {
    if (isLoggedIn) {
        await fetchServerResumesIfLoggedIn();
    }
});
const resumes = computed(() => {
    const allResumes = resumeStore.resumesList;
    if (!searchQuery.value.trim()) {
        return allResumes;
    }
    const query = searchQuery.value.toLowerCase().trim();
    return allResumes.filter(resume =>
        resume.name.toLowerCase().includes(query),
    );
});
const resumeCount = computed(() => resumeStore.resumeCount);
const filteredCount = computed(() => resumes.value.length);
const showCreateModal = ref(false);
const showCopyModal = ref(false);
const resumeToCopy = ref<Resume | null>(null);
const showExportModal = ref(false);
const showImportModal = ref(false);
const importPreviews = ref<ImportResumePreview[]>([]);
const showCloudSyncModal = ref(false);
const importInputRef = ref<HTMLInputElement>();
const createNewResume = () => {
    showCreateModal.value = true;
};
const getDefaultResumeName = () => {
    if (!authStore.isLoggedIn) return 'Untitled Resume';
    const userName = authStore.user?.name?.trim();
    return userName ? `${userName} - Resume` : 'Untitled Resume';
};
const handleCreateResume = async (name: string, language: string, navigateToBuilder: boolean, saveToCloud: boolean) => {
    const { defaultResumeSettings, getDefaultFontForLanguage } = await import('~/types/resume');
    const resumeName = name.trim() || getDefaultResumeName();
    const seededSettings = {
        ...defaultResumeSettings,
        selectedFont: getDefaultFontForLanguage(language),
    };
    const newResumeId = resumeStore.createResume({ name: resumeName, language, settings: seededSettings });
    resumeStore.setActiveResume(newResumeId);
    showCreateModal.value = false;
    if (saveToCloud && authStore.isLoggedIn) {
        try {
            notify.info(t('resumes.notify.creatingInCloud'));
            const api = useApi();
            const resume = resumeStore.resumesList.find(r => r.id === newResumeId);
            if (resume) {
                const newCloudResume = await api.resumes.create(resume);
                if (resumeStore.resumes[newResumeId] && newCloudResume) {
                    resumeStore.resumes[newResumeId].serverId = newCloudResume.id;
                    resumeStore.resumes[newResumeId].updatedAt = new Date().toISOString();
                }
                notify.success(t('resumes.notify.createdAndSaved').replace('{name}', resumeName));
            }
        }
        catch (error: unknown) {
            console.error('Failed to save resume to cloud:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            notify.warning(t('resumes.notify.createdLocallyFailed').replace('{name}', resumeName).replace('{error}', errorMessage));
        }
    }
    else if (saveToCloud && !authStore.isLoggedIn) {
        notify.warning(t('resumes.notify.loginToSaveCloud'));
    }
    else {
        notify.success(t('resumes.notify.created').replace('{name}', resumeName));
    }
    if (navigateToBuilder) {
        router.push(localePath('/builder'));
    }
};
const editResume = (id: string) => {
    resumeStore.setActiveResume(id);
    router.push(localePath('/builder'));
};
const showCopyResumeModal = (id: string) => {
    const resume = resumeStore.resumesList.find(r => r.id === id);
    if (resume) {
        resumeToCopy.value = resume;
        showCopyModal.value = true;
    }
};
const handleCopyResume = (name: string, navigateToBuilder: boolean) => {
    if (resumeToCopy.value) {
        const resumeName = name.trim() || getDefaultResumeName();
        const newResumeId = resumeStore.duplicateResume(resumeToCopy.value.id, resumeName);
        if (newResumeId) {
            resumeStore.setActiveResume(newResumeId);
            showCopyModal.value = false;
            resumeToCopy.value = null;
            if (navigateToBuilder) {
                router.push(localePath('/builder'));
            }
        }
    }
};
const deleteResume = async (id: string) => {
    const resume = resumeStore.resumesList.find(r => r.id === id);
    const resumeName = resume?.name || 'this resume';
    const confirmed = await confirmation.confirm({
        title: t('resumes.modals.delete.title'),
        message: t('resumes.modals.delete.message').replace('{name}', resumeName),
        confirmText: t('resumes.modals.delete.confirmButton'),
        cancelText: t('resumes.modals.cancel'),
    });
    if (confirmed) {
        resumeStore.deleteResume(id);
        if (authStore.isLoggedIn && resume?.serverId) {
            try {
                const api = useApi();
                await api.resumes.delete(resume.serverId);
                notify.success(t('resumes.notify.deletedFromCloud').replace('{name}', resumeName));
            }
            catch (error) {
                console.error('Failed to delete resume from cloud:', error);
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                notify.warning(t('resumes.notify.deletedLocallyFailed').replace('{error}', errorMessage));
            }
        }
        else {
            notify.success(t('resumes.notify.deleted').replace('{name}', resumeName));
        }
    }
};
const syncResume = async (id: string) => {
    if (!authStore.isLoggedIn) {
        notify.error(t('resumes.notify.loginToSync'));
        return;
    }
    try {
        const api = useApi();
        const resume = resumeStore.resumesList.find(r => r.id === id);
        if (!resume) {
            notify.error(t('resumes.notify.resumeNotFound'));
            return;
        }
        notify.info(t('resumes.notify.syncingToCloud'));
        if (resume.serverId) {
            try {
                await api.resumes.update(resume.serverId, resume);
                notify.success(t('resumes.notify.updatedInCloud').replace('{name}', resume.name));
            }
            catch (error: unknown) {
                if (error && typeof error === 'object' && 'statusCode' in error && error.statusCode === 404) {
                    const newResume = await api.resumes.create(resume);
                    if (resumeStore.resumes[id] && newResume) {
                        resumeStore.resumes[id].serverId = newResume.id;
                        resumeStore.resumes[id].updatedAt = new Date().toISOString();
                    }
                    notify.success(t('resumes.notify.syncedNewCopy').replace('{name}', resume.name));
                }
                else {
                    throw error;
                }
            }
        }
        else {
            const newResume = await api.resumes.create(resume);
            if (resumeStore.resumes[id] && newResume) {
                resumeStore.resumes[id].serverId = newResume.id;
                resumeStore.resumes[id].updatedAt = new Date().toISOString();
            }
            notify.success(t('resumes.notify.syncedToCloud').replace('{name}', resume.name));
        }
    }
    catch (error: unknown) {
        console.error('Failed to sync resume:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        notify.error(t('resumes.notify.syncFailed').replace('{error}', errorMessage));
    }
};
const clearSearch = () => {
    searchQuery.value = '';
};
const triggerImport = () => {
    importInputRef.value?.click();
};
const handleExportModal = () => {
    showExportModal.value = true;
};
const handleExport = (resumeIds: string[]) => {
    exportResumes(resumeIds);
    showExportModal.value = false;
};
const handleFileSelect = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const result = await parseImportFile(file);
    if (result.success && result.previews) {
        importPreviews.value = result.previews;
        showImportModal.value = true;
    }
    else {
        console.error('Failed to parse file:', result.error);
    }
    input.value = '';
};
const handleImportConfirm = (selectedIndexes: number[]) => {
    const importedCount = importSelectedResumes(importPreviews.value, selectedIndexes);
    console.log(`Successfully imported ${importedCount} resume${importedCount !== 1 ? 's' : ''}`);
    showImportModal.value = false;
    importPreviews.value = [];
};
const handleCloudSyncModal = () => {
    if (!authStore.isLoggedIn) {
        return;
    }
    showCloudSyncModal.value = true;
};
const handleCloudSync = async (resumeIds: string[]) => {
    if (resumeIds.length === 0) {
        showCloudSyncModal.value = false;
        return;
    }
    try {
        const pluralSuffix = resumeIds.length !== 1 ? t('resumes.resumeCount.resumes') : t('resumes.resumeCount.resume');
        notify.info(t('resumes.notify.syncingMultiple').replace('{count}', resumeIds.length.toString()).replace('{plural}', pluralSuffix));
        for (const resumeId of resumeIds) {
            await resumeStore.syncResumeToServer(resumeId);
        }
        notify.success(t('resumes.notify.syncedMultiple').replace('{count}', resumeIds.length.toString()).replace('{plural}', pluralSuffix));
        showCloudSyncModal.value = false;
    }
    catch (error: unknown) {
        console.error('Failed to sync resumes:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        notify.error(t('resumes.notify.syncMultipleFailed').replace('{error}', errorMessage));
    }
};
const disableCloudSync = async (id: string) => {
    const resume = resumeStore.resumesList.find(r => r.id === id);
    const resumeName = resume?.name || 'this resume';
    if (!resume?.serverId) {
        notify.error(t('resumes.notify.resumeNotSynced'));
        return;
    }
    const confirmed = await confirmation.confirm({
        title: t('resumes.modals.disableSync.title'),
        message: t('resumes.modals.disableSync.message').replace('{name}', resumeName),
        confirmText: t('resumes.modals.disableSync.confirmButton'),
        cancelText: t('resumes.modals.cancel'),
    });
    if (confirmed) {
        try {
            const api = useApi();
            await api.resumes.delete(resume.serverId);
            notify.success(t('resumes.notify.removedFromCloud').replace('{name}', resumeName));
        }
        catch (error: unknown) {
            console.error('Failed to disable cloud sync:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            notify.error(t('resumes.notify.removeFailed').replace('{error}', errorMessage));
        }
        finally {
            if (resumeStore.resumes[id]) {
                resumeStore.resumes[id].serverId = undefined;
                resumeStore.resumes[id].updatedAt = new Date().toISOString();
            }
        }
    }
};
useHead({
    title: t('resumes.pageTitle'),
    meta: [
        {
            name: 'description',
            content: t('resumes.pageDescription'),
        },
        {
            name: 'keywords',
            content: 'resume management, multiple resumes, organize resumes, duplicate resume, resume dashboard, free resume storage',
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
            content: t('resumes.pageTitle'),
        },
        {
            property: 'og:description',
            content: t('resumes.pageDescription'),
        },
        {
            property: 'og:url',
            content: 'https://resumeforfree.com/resumes',
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
            content: t('resumes.pageTitle'),
        },
        {
            name: 'twitter:description',
            content: t('resumes.pageDescription'),
        },
        {
            name: 'twitter:image',
            content: 'https://resumeforfree.com/og-image.png',
        },
    ],
});
</script>

<template>
    <div class="px-4 py-8 pb-20">
        <div class="container mx-auto">
            <ClientOnly>
                <div
                    v-if="!authStore.isLoggedIn"
                    class="mb-6 p-4 bg-secondary/10 border border-secondary/30 rounded-[10px]"
                >
                    <div class="flex items-start gap-3">
                        <UIcon
                            name="i-lucide-cloud"
                            class="w-5 h-5 text-secondary mt-0.5 flex-shrink-0"
                        />
                        <div class="flex-1">
                            <h3 class="text-sm font-semibold text-secondary mb-1">
                                {{ $t('resumes.banner.saveToCloud') }}
                            </h3>
                            <p class="text-sm text-secondary/90 mb-3">
                                {{ $t('resumes.banner.registerPrompt') }}
                            </p>
                            <div class="flex gap-2">
                                <UButton
                                    size="sm"
                                    color="secondary"
                                    icon="i-lucide-user-plus"
                                    :label="$t('resumes.banner.registerFree')"
                                    @click="router.push(localePath('/auth/register'))"
                                />
                                <UButton
                                    size="sm"
                                    color="neutral"
                                    variant="outline"
                                    icon="i-lucide-log-in"
                                    :label="$t('resumes.banner.login')"
                                    @click="router.push(localePath('/auth/login'))"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    v-else
                    class="mb-6 p-4 bg-secondary/10 border border-secondary/30 rounded-lg"
                >
                    <div class="flex items-start gap-3">
                        <UIcon
                            name="i-lucide-check-circle"
                            class="w-5 h-5 text-secondary mt-0.5 flex-shrink-0"
                        />
                        <div class="flex-1">
                            <h3 class="text-sm font-medium text-secondary mb-1">
                                {{ $t('resumes.banner.cloudAvailable') }}
                            </h3>
                            <p class="text-sm text-secondary">
                                {{ $t('resumes.banner.cloudAvailableDescription') }}
                            </p>
                        </div>
                    </div>
                </div>
            </ClientOnly>
            <ResumesHeader
                v-model:search-query="searchQuery"
                :resume-count="resumeCount"
                :filtered-count="filteredCount"
                @import="triggerImport"
                @export="handleExportModal"
                @create="createNewResume"
                @cloud-sync="handleCloudSyncModal"
            />
            <ClientOnly>
                <div
                    v-if="resumeStore.isLoading"
                    class="flex items-center justify-center py-12"
                >
                    <div class="flex flex-col items-center gap-3">
                        <UIcon
                            name="i-lucide-loader-circle"
                            class="size-8 text-secondary animate-spin"
                        />
                        <p class="text-toned">
                            {{ $t('resumes.status.loading') }}
                        </p>
                    </div>
                </div>
                <div
                    v-else-if="resumeStore.error"
                    class="bg-error/10 border border-error/30 rounded-lg p-4 mb-6"
                >
                    <div class="flex items-start gap-3">
                        <div class="w-5 h-5 text-error mt-0.5">
                            ⚠️
                        </div>
                        <div>
                            <h3 class="text-sm font-medium text-error mb-1">
                                {{ $t('resumes.status.failed') }}
                            </h3>
                            <p class="text-sm text-error">
                                {{ resumeStore.error }}
                            </p>
                            <UButton
                                size="sm"
                                color="neutral"
                                variant="outline"
                                class="mt-2 border-error/40 text-error hover:bg-error/15"
                                @click="fetchServerResumesIfLoggedIn"
                            >
                                {{ $t('common.tryAgain') }}
                            </UButton>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <ResumesEmptyState
                        v-if="resumeCount === 0"
                        type="no-resumes"
                        @create="createNewResume"
                    />
                    <ResumesEmptyState
                        v-else-if="filteredCount === 0 && searchQuery"
                        type="no-search-results"
                        :search-query="searchQuery"
                        @create="createNewResume"
                        @clear-search="clearSearch"
                    />
                    <ResumesGrid
                        v-else
                        :resumes="resumes"
                        :active-resume-id="resumeStore.activeResumeId"
                        :downloading-id="downloadingId"
                        @edit="editResume"
                        @copy="showCopyResumeModal"
                        @download-pdf="handleDownloadPdf"
                        @delete="deleteResume"
                        @sync="syncResume"
                        @disable-sync="disableCloudSync"
                    />
                </div>
                <CreateResumeModal
                    :is-open="showCreateModal"
                    @close="showCreateModal = false"
                    @confirm="handleCreateResume"
                />
                <CopyResumeModal
                    :is-open="showCopyModal"
                    :resume-name="resumeToCopy ? `${resumeToCopy.name} (Copy)` : ''"
                    @close="showCopyModal = false; resumeToCopy = null"
                    @confirm="handleCopyResume"
                />
                <ExportModal
                    :is-open="showExportModal"
                    :resumes="resumes"
                    @close="showExportModal = false"
                    @export="handleExport"
                />
                <ImportConfirmationModal
                    :is-open="showImportModal"
                    :resumes-to-import="importPreviews"
                    @close="showImportModal = false; importPreviews = []"
                    @import="handleImportConfirm"
                />
                <CloudSyncModal
                    :is-open="showCloudSyncModal"
                    :resumes="resumes"
                    @close="showCloudSyncModal = false"
                    @sync="handleCloudSync"
                />
                <ConfirmationModal
                    :cancel-text="confirmation.cancelText.value"
                    :confirm-text="confirmation.confirmText.value"
                    :is-open="confirmation.isOpen.value"
                    :message="confirmation.message.value"
                    :title="confirmation.title.value"
                    @cancel="confirmation.handleCancel"
                    @confirm="confirmation.handleConfirm"
                />
                <input
                    ref="importInputRef"
                    accept=".json"
                    class="hidden"
                    type="file"
                    @change="handleFileSelect"
                >
            </ClientOnly>
        </div>
    </div>
</template>
