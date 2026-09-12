<script lang="ts" setup>
import type { ImportResumePreview } from '~/types/resume';

interface Props {
    isOpen: boolean;
    resumesToImport: ImportResumePreview[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
    close: [];
    import: [indexes: number[]];
}>();

const { t } = useI18n();

const selectedIndexes = ref<number[]>([]);

const open = computed({
    get: () => props.isOpen,
    set: (value) => {
        if (!value) emit('close');
    },
});

watch(() => props.isOpen, (isOpen) => {
    if (isOpen) {
        selectedIndexes.value = props.resumesToImport
            .map((resume, index) => ({ resume, index }))
            .filter(({ resume }) => !resume.isDuplicate)
            .map(({ index }) => index);
    }
});

const duplicateCount = computed(() => props.resumesToImport.filter(r => r.isDuplicate).length);

const items = computed(() =>
    props.resumesToImport.map((resume, index) => ({
        label: resume.name,
        description: t('resumes.modals.import.itemCount', { count: resume.itemCount }),
        value: index,
    })),
);
</script>

<template>
    <UModal
        v-model:open="open"
        :title="t('resumes.modals.import.title')"
        :description="t('resumes.modals.import.foundCount', { count: resumesToImport.length })"
        :ui="{ footer: 'justify-end' }"
    >
        <template #body>
            <div class="space-y-4">
                <UAlert
                    v-if="duplicateCount > 0"
                    color="warning"
                    variant="soft"
                    icon="i-lucide-triangle-alert"
                    :description="t('resumes.modals.import.duplicateWarning', { count: duplicateCount })"
                />

                <UCheckboxGroup
                    v-model="selectedIndexes"
                    :items="items"
                    value-key="value"
                    class="max-h-80 overflow-y-auto border border-default rounded-md p-2"
                />

                <p class="text-sm text-toned">
                    {{ t('resumes.modals.import.selectedCount', { count: selectedIndexes.length }) }}
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
                :disabled="selectedIndexes.length === 0"
                :label="t('resumes.modals.import.importSelected')"
                @click="emit('import', selectedIndexes)"
            />
        </template>
    </UModal>
</template>
