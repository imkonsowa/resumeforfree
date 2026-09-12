<template>
    <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center"
        @click="handleBackdropClick"
    >
        <div class="absolute inset-0 bg-black/50" />
        <div
            class="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4"
            @click.stop
        >
            <div class="mb-4">
                <h3 class="text-lg font-semibold">
                    {{ $t('resumes.modals.export.title') }}
                </h3>
                <p class="text-sm text-toned mt-1">
                    {{ $t('resumes.modals.export.description') }}
                </p>
            </div>
            <div class="bg-secondary/10 border border-secondary/30 rounded-md p-3 mb-4">
                <div class="flex">
                    <UIcon name="i-lucide-info" class="h-5 w-5 text-secondary flex-shrink-0" />
                    <div class="ml-3">
                        <p class="text-sm text-secondary">
                            {{ $t('resumes.modals.export.infoMessage') }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="mb-4 pb-2 border-b">
                <label class="flex items-center gap-2 cursor-pointer">
                    <input
                        v-model="selectAll"
                        class="rounded border-accented text-primary focus:ring-primary"
                        type="checkbox"
                        @change="handleSelectAll"
                    >
                    <span class="text-sm font-medium">{{ $t('resumes.modals.export.selectAll') }}</span>
                </label>
            </div>
            <div class="space-y-2 max-h-60 overflow-y-auto mb-6">
                <label
                    v-for="resume in resumes"
                    :key="resume.id"
                    class="flex items-center gap-2 cursor-pointer hover:bg-muted p-2 rounded"
                >
                    <input
                        v-model="selectedResumes"
                        :value="resume.id"
                        class="rounded border-accented text-primary focus:ring-primary"
                        type="checkbox"
                    >
                    <div class="flex-1 min-w-0">
                        <div class="text-sm font-medium truncate">
                            {{ resume.name }}
                        </div>
                        <div class="text-xs text-muted">
                            Updated {{ formatDate(resume.updatedAt) }}
                        </div>
                    </div>
                </label>
            </div>
            <div class="text-sm text-toned mb-4">
                {{ t('resumes.modals.export.selectedCount', {
                    count: selectedResumes.length,
                    countPlural: selectedResumes.length !== 1 ? t('resumes.resumeCount.resumes') : t('resumes.resumeCount.resume'),
                }) }}
            </div>
            <div class="flex justify-end gap-3">
                <UButton color="neutral" variant="outline"
                    @click="handleCancel"
                >
                    {{ $t('resumes.modals.cancel') }}
                </UButton>
                <UButton
                    :disabled="selectedResumes.length === 0"
                    @click="handleExport"
                >
                    {{ $t('common.export') }}
                </UButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { Resume } from '~/types/resume';

interface Props {
    isOpen: boolean;
    resumes: Resume[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
    close: [];
    export: [resumeIds: string[]];
}>();
const { t } = useI18n();
const selectedResumes = ref<string[]>([]);
const selectAll = ref(true);
watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        selectedResumes.value = props.resumes.map(r => r.id);
        selectAll.value = true;
    }
});
const handleSelectAll = () => {
    if (selectAll.value) {
        selectedResumes.value = props.resumes.map(r => r.id);
    }
    else {
        selectedResumes.value = [];
    }
};
watch(selectedResumes, (newVal) => {
    selectAll.value = newVal.length === props.resumes.length && props.resumes.length > 0;
});
const handleBackdropClick = () => {
    emit('close');
};
const handleCancel = () => {
    emit('close');
};
const handleExport = () => {
    emit('export', selectedResumes.value);
};
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};
</script>
