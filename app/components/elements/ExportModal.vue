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

const open = computed({
    get: () => props.isOpen,
    set: (value) => {
        if (!value) emit('close');
    },
});

watch(() => props.isOpen, (isOpen) => {
    if (isOpen) {
        selectedResumes.value = props.resumes.map(r => r.id);
        selectAll.value = true;
    }
});

watch(selectedResumes, (value) => {
    selectAll.value = value.length === props.resumes.length && props.resumes.length > 0;
});

const handleSelectAll = (checked: boolean) => {
    selectedResumes.value = checked ? props.resumes.map(r => r.id) : [];
};

const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
</script>

<template>
    <UModal
        v-model:open="open"
        :title="t('resumes.modals.export.title')"
        :description="t('resumes.modals.export.description')"
        :ui="{ footer: 'justify-end' }"
    >
        <template #body>
            <div class="space-y-4">
                <UAlert
                    color="secondary"
                    variant="soft"
                    icon="i-lucide-info"
                    :description="t('resumes.modals.export.infoMessage')"
                />

                <div class="pb-2 border-b border-default">
                    <UCheckbox
                        v-model="selectAll"
                        :label="t('resumes.modals.export.selectAll')"
                        @update:model-value="handleSelectAll"
                    />
                </div>

                <UCheckboxGroup
                    v-model="selectedResumes"
                    :items="resumes.map(r => ({
                        label: r.name,
                        description: `${t('resumes.status.updated')} ${formatDate(r.updatedAt)}`,
                        value: r.id,
                    }))"
                    value-key="value"
                    class="max-h-60 overflow-y-auto"
                />

                <p class="text-sm text-toned">
                    {{ t('resumes.modals.export.selectedCount', {
                        count: selectedResumes.length,
                        countPlural: selectedResumes.length !== 1 ? t('resumes.resumeCount.resumes') : t('resumes.resumeCount.resume'),
                    }) }}
                </p>
            </div>
        </template>

        <template #footer>
            <UButton
                color="neutral"
                variant="outline"
                :label="t('resumes.modals.cancel')"
                @click="emit('close')"
            />
            <UButton
                :disabled="selectedResumes.length === 0"
                :label="t('common.export')"
                @click="emit('export', selectedResumes)"
            />
        </template>
    </UModal>
</template>
