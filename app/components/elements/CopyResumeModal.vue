<script lang="ts" setup>
interface Props {
    isOpen: boolean;
    resumeName: string;
}
interface Emits {
    (e: 'close'): void;
    (e: 'confirm', name: string, navigateToBuilder: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const { t } = useI18n();

const copyResumeName = ref('');
const navigateToBuilder = ref(true);

const open = computed({
    get: () => props.isOpen,
    set: (value) => {
        if (!value) emit('close');
    },
});

watch(() => props.isOpen, (isOpen) => {
    if (isOpen) {
        copyResumeName.value = props.resumeName;
        navigateToBuilder.value = true;
    }
});

const handleConfirm = () => {
    emit('confirm', copyResumeName.value, navigateToBuilder.value);
};
</script>

<template>
    <UModal
        v-model:open="open"
        :title="t('resumes.modals.copy.title')"
        :ui="{ footer: 'justify-end' }"
    >
        <template #body>
            <div class="space-y-4">
                <UFormField
                    name="copyResumeName"
                    :label="t('resumes.modals.copy.resumeName')"
                >
                    <UInput
                        v-model="copyResumeName"
                        autofocus
                        class="w-full"
                        :placeholder="t('resumes.modals.copy.enterName')"
                        @keydown.enter="handleConfirm"
                    />
                </UFormField>

                <UCheckbox
                    v-model="navigateToBuilder"
                    :label="t('resumes.modals.copy.navigateToBuilder')"
                />
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
                :label="t('resumes.modals.copy.copyButton')"
                @click="handleConfirm"
            />
        </template>
    </UModal>
</template>
