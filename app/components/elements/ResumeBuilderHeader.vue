<template>
    <div class="mb-6 space-y-4">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
            <div class="flex items-center gap-3">
                <h1 class="text-2xl font-bold text-highlighted">
                    {{ resumeStore.activeResume?.name || t('builder.defaultTitle') }}
                </h1>
            </div>
            <div class="flex items-center gap-2">
                <UButton
                    v-if="authStore.isLoggedIn && activeResume"
                    size="sm"
                    color="neutral"
                    variant="outline"
                    class="min-w-fit"
                    icon="i-lucide-cloud"
                    :loading="isAnySyncing"
                    :disabled="!canSyncToCloud"
                    @click="handleCloudSync"
                >
                    <span class="hidden sm:inline whitespace-nowrap">{{ isAnySyncing ? syncingText : syncButtonText }}</span>
                    <span class="sm:hidden whitespace-nowrap">{{ isAnySyncing ? (activeResume.serverId ? t('builder.updating') : t('builder.syncing')) : (activeResume.serverId ? t('builder.update') : t('common.sync')) }}</span>
                </UButton>
                <UButton
                    v-if="activeTab === 'builder'"
                    size="sm"
                    color="neutral"
                    variant="outline"
                    icon="i-lucide-chevron-down"
                    :aria-label="t('builder.expand')"
                    @click="settingsStore.expandAllSections()"
                >
                    <span class="ms-1 sm:hidden">{{ t('builder.expand') }}</span>
                </UButton>
                <UButton
                    v-if="activeTab === 'builder'"
                    size="sm"
                    color="neutral"
                    variant="outline"
                    icon="i-lucide-chevron-up"
                    :aria-label="t('builder.collapse')"
                    @click="settingsStore.collapseAllSections()"
                >
                    <span class="ms-1 sm:hidden">{{ t('builder.collapse') }}</span>
                </UButton>
            </div>
        </div>
        <UTabs
            v-model="activeTab"
            :items="tabItems"
            :content="false"
            class="w-full"
        />
    </div>
</template>

<script lang="ts" setup>
import type { TabsItem } from '@nuxt/ui';

const resumeStore = useResumeStore();
const settingsStore = useSettingsStore();
const authStore = useAuthStore();
const { t } = useI18n();
const notify = useNotify();
const activeTab = defineModel<'builder' | 'settings'>('tab', { default: 'builder' });
const tabItems = computed<TabsItem[]>(() => [
    { label: t('builder.tabs.builder'), icon: 'i-lucide-pencil-line', value: 'builder' },
    { label: t('builder.tabs.settings'), icon: 'i-lucide-sliders-horizontal', value: 'settings' },
]);
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
    try {
        isSyncing.value = true;
        await resumeStore.syncResumeToServer(activeResume.value.id);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catch (error: any) {
        console.error('Failed to sync resume:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        notify.error(`Failed to sync resume: ${errorMessage}`);
    }
    finally {
        isSyncing.value = false;
    }
};
</script>
