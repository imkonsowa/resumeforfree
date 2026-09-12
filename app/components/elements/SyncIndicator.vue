<template>
    <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-2 scale-95"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        leave-to-class="opacity-0 translate-y-2 scale-95"
    >
        <div
            v-if="show"
            class="fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-lg shadow-lg border backdrop-blur-sm"
            :class="indicatorClasses"
        >
            <template v-if="isSyncing">
                <UIcon
                    name="i-lucide-loader-circle"
                    class="w-4 h-4 animate-spin"
                />
                <span class="text-sm font-medium">{{ t('builder.syncing') }}</span>
            </template>
            <template v-else-if="showSuccess">
                <UIcon
                    name="i-lucide-check-circle"
                    class="w-4 h-4"
                />
                <span class="text-sm font-medium">{{ t('common.saved', 'Saved') }}</span>
            </template>
            <template v-else-if="showError">
                <UIcon
                    name="i-lucide-alert-circle"
                    class="w-4 h-4"
                />
                <span class="text-sm font-medium">{{ t('common.syncFailed', 'Sync failed') }}</span>
            </template>
        </div>
    </Transition>
</template>

<script lang="ts" setup>
const props = defineProps<Props>();
const { t } = useI18n();
interface Props {
    isSyncing: boolean;
    lastSyncSuccess: boolean;
    lastSyncTime: Date | null;
    errorMessage?: string;
}
const showSuccess = ref(false);
const showError = ref(false);
const successTimeout = ref<number>();
const errorTimeout = ref<number>();
watch(() => props.isSyncing, (isSyncing, wasSyncing) => {
    if (successTimeout.value) {
        clearTimeout(successTimeout.value);
        successTimeout.value = undefined;
    }
    if (errorTimeout.value) {
        clearTimeout(errorTimeout.value);
        errorTimeout.value = undefined;
    }
    if (isSyncing) {
        showSuccess.value = false;
        showError.value = false;
        return;
    }
    if (wasSyncing && !isSyncing) {
        if (props.lastSyncSuccess) {
            showSuccess.value = true;
            successTimeout.value = setTimeout(() => {
                showSuccess.value = false;
            }, 2000);
        }
        else {
            showError.value = true;
            errorTimeout.value = setTimeout(() => {
                showError.value = false;
            }, 3000);
        }
    }
});
const show = computed(() =>
    props.isSyncing || showSuccess.value || showError.value,
);
const indicatorClasses = computed(() => {
    if (props.isSyncing) {
        return 'bg-secondary/10 border-secondary/30 text-secondary';
    }
    else if (showSuccess.value) {
        return 'bg-secondary/10 border-secondary/30 text-secondary';
    }
    else if (showError.value) {
        return 'bg-error/10 border-error/30 text-error';
    }
    return 'bg-muted border-default text-default';
});
onUnmounted(() => {
    if (successTimeout.value) {
        clearTimeout(successTimeout.value);
    }
    if (errorTimeout.value) {
        clearTimeout(errorTimeout.value);
    }
});
</script>

<style scoped>
@media (max-width: 640px) {
    .fixed {
        top: 1rem;
        right: 1rem;
    }
}
</style>
