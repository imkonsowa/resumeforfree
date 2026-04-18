<template>
    <div class="mb-8">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
            <div class="flex items-center space-x-3">
                <h1 class="text-2xl font-bold text-gray-900">
                    {{ resumeStore.activeResume?.name || t('builder.defaultTitle') }}
                </h1>
            </div>
            <div class="flex items-center space-x-2">
                <Button
                    v-if="authStore.isLoggedIn && activeResume"
                    size="sm"
                    variant="outline"
                    class="flex items-center gap-2 min-w-fit"
                    :disabled="!canSyncToCloud || isAnySyncing"
                    @click="handleCloudSync"
                >
                    <Loader2
                        v-if="isAnySyncing"
                        class="h-4 w-4 animate-spin"
                    />
                    <Cloud
                        v-else
                        class="h-4 w-4"
                    />
                    <span class="hidden sm:inline whitespace-nowrap">{{ isAnySyncing ? syncingText : syncButtonText }}</span>
                    <span class="sm:hidden whitespace-nowrap">{{ isAnySyncing ? (activeResume.serverId ? t('builder.updating') : t('builder.syncing')) : (activeResume.serverId ? t('builder.update') : t('common.sync')) }}</span>
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    @click="settingsStore.expandAllSections()"
                >
                    <ChevronDown class="h-4 w-4" />
                    <span class="ml-1 sm:hidden">{{ t('builder.expand') }}</span>
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    @click="settingsStore.collapseAllSections()"
                >
                    <ChevronUp class="h-4 w-4" />
                    <span class="ml-1 sm:hidden">{{ t('builder.collapse') }}</span>
                </Button>
                <Button
                    class="flex items-center gap-2"
                    size="sm"
                    variant="outline"
                    @click="showStepper = true"
                >
                    <ListIcon class="h-4 w-4" />
                    {{ t('builder.sections') }}
                </Button>
            </div>
        </div>
    </div>
    <ResumeStepper v-model:show-stepper="showStepper" />
</template>

<script lang="ts" setup>
import { Button } from '~/components/ui/button';
import { ChevronDown, ChevronUp, ListIcon, Cloud, Loader2 } from 'lucide-vue-next';
import ResumeStepper from '~/components/elements/ResumeStepper.vue';

const resumeStore = useResumeStore();
const settingsStore = useSettingsStore();
const authStore = useAuthStore();
const { t } = useI18n();
const showStepper = ref<boolean>(false);
const isSyncing = ref<boolean>(false);
const { isSyncing: isAutoSyncing } = useAutoSync();
const activeResume = computed(() => resumeStore.activeResume);
const isAnySyncing = computed(() => isSyncing.value || isAutoSyncing.value);
const canSyncToCloud = computed(() => {
    const cloudInfo = resumeStore.cloudInfo;
    if (activeResume.value?.serverId) return true;
    return cloudInfo.remaining > 0;
});
const syncButtonText = computed(() => {
    if (!activeResume.value) return t('builder.syncToCloud');
    if (activeResume.value.serverId) {
        return t('builder.updateCloud');
    }
    else {
        return t('builder.syncToCloud');
    }
});
const syncingText = computed(() => {
    if (!activeResume.value) return t('builder.syncingToCloud');
    if (activeResume.value.serverId) {
        return t('builder.updatingCloud');
    }
    else {
        return t('builder.syncingToCloud');
    }
});
const handleCloudSync = async () => {
    if (!activeResume.value || isAnySyncing.value) return;
    const { toast } = await import('vue-sonner');
    try {
        isSyncing.value = true;
        await resumeStore.syncResumeToServer(activeResume.value.id);
        // Silent sync - success toasts are handled by the calling component
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
        console.error('Failed to sync resume:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        toast.error(`Failed to sync resume: ${errorMessage}`);
    }
    finally {
        isSyncing.value = false;
    }
};
</script>
