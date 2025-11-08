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
import type { ImportResumePreview } from '~/components/elements/ImportConfirmationModal.vue';
import type { Resume } from '~/types/resume';
import { Button } from '~/components/ui/button';
import { CheckCircle, Cloud, LogIn, UserPlus } from 'lucide-vue-next';

const { t } = useI18n();
const resumeStore = useResumeStore();
const authStore = useAuthStore();
const router = useRouter();
const confirmation = useConfirmation();
const { exportResumes, exportSingleResume, parseImportFile, importSelectedResumes } = useResumeImportExport();
const searchQuery = ref('');
const fetchServerResumesIfLoggedIn = async () => {
    if (authStore.isLoggedIn) {
        try {
            await resumeStore.fetchServerResumes();
        }
        catch (error) {
            console.error('Failed to fetch server resumes:', error);
        }
    }
};
onMounted(async () => {
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
const handleCreateResume = async (name: string, navigateToBuilder: boolean, saveToCloud: boolean) => {
    const { toast } = await import('vue-sonner');
    const resumeName = name.trim() || 'Untitled Resume';
    const newResumeId = resumeStore.createResume(resumeName);
    resumeStore.setActiveResume(newResumeId);
    showCreateModal.value = false;
    if (saveToCloud && authStore.isLoggedIn) {
        try {
            toast.info(t('resumes.toast.creatingInCloud'));
            const api = useApi();
            const resume = resumeStore.resumesList.find(r => r.id === newResumeId);
            if (resume) {
                const newCloudResume = await api.resumes.create(resume.name, resume.data);
                if (resumeStore.resumes[newResumeId] && newCloudResume) {
                    resumeStore.resumes[newResumeId].serverId = newCloudResume.id;
                    resumeStore.resumes[newResumeId].updatedAt = new Date().toISOString();
                }
                toast.success(t('resumes.toast.createdAndSaved').replace('{name}', resumeName));
            }
        }
        catch (error: unknown) {
            console.error('Failed to save resume to cloud:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            toast.warning(t('resumes.toast.createdLocallyFailed').replace('{name}', resumeName).replace('{error}', errorMessage));
        }
    }
    else if (saveToCloud && !authStore.isLoggedIn) {
        toast.warning(t('resumes.toast.loginToSaveCloud'));
    }
    else {
        toast.success(t('resumes.toast.created').replace('{name}', resumeName));
    }
    if (navigateToBuilder) {
        router.push('/builder');
    }
};
const editResume = (id: string) => {
    resumeStore.setActiveResume(id);
    router.push('/builder');
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
        const resumeName = name.trim() || 'Untitled Resume';
        const newResumeId = resumeStore.duplicateResume(resumeToCopy.value.id, resumeName);
        if (newResumeId) {
            resumeStore.setActiveResume(newResumeId);
            showCopyModal.value = false;
            resumeToCopy.value = null;
            if (navigateToBuilder) {
                router.push('/builder');
            }
        }
    }
};
const deleteResume = async (id: string) => {
    const { toast } = await import('vue-sonner');
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
                toast.success(t('resumes.toast.deletedFromCloud').replace('{name}', resumeName));
            }
            catch (error) {
                console.error('Failed to delete resume from cloud:', error);
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                toast.warning(t('resumes.toast.deletedLocallyFailed').replace('{error}', errorMessage));
            }
        }
        else {
            toast.success(t('resumes.toast.deleted').replace('{name}', resumeName));
        }
    }
};
const syncResume = async (id: string) => {
    const { toast } = await import('vue-sonner');
    if (!authStore.isLoggedIn) {
        toast.error(t('resumes.toast.loginToSync'));
        return;
    }
    try {
        const api = useApi();
        const resume = resumeStore.resumesList.find(r => r.id === id);
        if (!resume) {
            toast.error(t('resumes.toast.resumeNotFound'));
            return;
        }
        toast.info(t('resumes.toast.syncingToCloud'));
        if (resume.serverId) {
            try {
                await api.resumes.update(resume.serverId, {
                    name: resume.name,
                    data: resume.data,
                });
                toast.success(t('resumes.toast.updatedInCloud').replace('{name}', resume.name));
            }
            catch (error: unknown) {
                if (error && typeof error === 'object' && 'statusCode' in error && error.statusCode === 404) {
                    const newResume = await api.resumes.create(resume.name, resume.data);
                    if (resumeStore.resumes[id] && newResume) {
                        resumeStore.resumes[id].serverId = newResume.id;
                        resumeStore.resumes[id].updatedAt = new Date().toISOString();
                    }
                    toast.success(t('resumes.toast.syncedNewCopy').replace('{name}', resume.name));
                }
                else {
                    throw error;
                }
            }
        }
        else {
            const newResume = await api.resumes.create(resume.name, resume.data);
            if (resumeStore.resumes[id] && newResume) {
                resumeStore.resumes[id].serverId = newResume.id;
                resumeStore.resumes[id].updatedAt = new Date().toISOString();
            }
            toast.success(t('resumes.toast.syncedToCloud').replace('{name}', resume.name));
        }
    }
    catch (error: unknown) {
        console.error('Failed to sync resume:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        toast.error(t('resumes.toast.syncFailed').replace('{error}', errorMessage));
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
    const { toast } = await import('vue-sonner');
    if (resumeIds.length === 0) {
        showCloudSyncModal.value = false;
        return;
    }
    try {
        const pluralSuffix = resumeIds.length !== 1 ? t('resumes.resumeCount.resumes') : t('resumes.resumeCount.resume');
        toast.info(t('resumes.toast.syncingMultiple').replace('{count}', resumeIds.length.toString()).replace('{plural}', pluralSuffix));
        for (const resumeId of resumeIds) {
            await resumeStore.syncResumeToServer(resumeId);
        }
        toast.success(t('resumes.toast.syncedMultiple').replace('{count}', resumeIds.length.toString()).replace('{plural}', pluralSuffix));
        showCloudSyncModal.value = false;
    }
    catch (error: unknown) {
        console.error('Failed to sync resumes:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        toast.error(t('resumes.toast.syncMultipleFailed').replace('{error}', errorMessage));
    }
};
const disableCloudSync = async (id: string) => {
    const { toast } = await import('vue-sonner');
    const resume = resumeStore.resumesList.find(r => r.id === id);
    const resumeName = resume?.name || 'this resume';
    if (!resume?.serverId) {
        toast.error(t('resumes.toast.resumeNotSynced'));
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
            toast.success(t('resumes.toast.removedFromCloud').replace('{name}', resumeName));
        }
        catch (error: unknown) {
            console.error('Failed to disable cloud sync:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            toast.error(t('resumes.toast.removeFailed').replace('{error}', errorMessage));
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
            content: 'Free Resume Builder',
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
    link: [
        {
            rel: 'canonical',
            href: 'https://resumeforfree.com/resumes',
        },
    ],
});
</script>

<template>
    <div class="px-4 py-8">
        <div class="container mx-auto">
            <ClientOnly>
                <div
                    v-if="!authStore.isLoggedIn"
                    class="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
                >
                    <div class="flex items-start gap-3">
                        <Cloud class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div class="flex-1">
                            <h3 class="text-sm font-medium text-blue-900 mb-1">
                                {{ $t('resumes.banner.saveToCloud') }}
                            </h3>
                            <p class="text-sm text-blue-700 mb-3">
                                {{ $t('resumes.banner.registerPrompt') }}
                            </p>
                            <div class="flex gap-2">
                                <Button
                                    size="sm"
                                    class="bg-blue-600 hover:bg-blue-700"
                                    @click="$router.push('/auth/register')"
                                >
                                    <UserPlus class="w-4 h-4 mr-1" />
                                    {{ $t('resumes.banner.registerFree') }}
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    class="border-blue-300 text-blue-700 hover:bg-blue-100"
                                    @click="$router.push('/auth/login')"
                                >
                                    <LogIn class="w-4 h-4 mr-1" />
                                    {{ $t('resumes.banner.login') }}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    v-else
                    class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                    <div class="flex items-start gap-3">
                        <CheckCircle class="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div class="flex-1">
                            <h3 class="text-sm font-medium text-green-900 mb-1">
                                {{ $t('resumes.banner.cloudAvailable') }}
                            </h3>
                            <p class="text-sm text-green-700">
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
                        <div class="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
                        <p class="text-gray-600">
                            {{ $t('resumes.status.loading') }}
                        </p>
                    </div>
                </div>
                <div
                    v-else-if="resumeStore.error"
                    class="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
                >
                    <div class="flex items-start gap-3">
                        <div class="w-5 h-5 text-red-600 mt-0.5">
                            ⚠️
                        </div>
                        <div>
                            <h3 class="text-sm font-medium text-red-900 mb-1">
                                {{ $t('resumes.status.failed') }}
                            </h3>
                            <p class="text-sm text-red-700">
                                {{ resumeStore.error }}
                            </p>
                            <Button
                                size="sm"
                                variant="outline"
                                class="mt-2 border-red-300 text-red-700 hover:bg-red-100"
                                @click="fetchServerResumesIfLoggedIn"
                            >
                                {{ $t('resumes.actions.tryAgain') }}
                            </Button>
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
                        @edit="editResume"
                        @copy="showCopyResumeModal"
                        @export="exportSingleResume"
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
