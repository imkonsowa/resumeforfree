<script lang="ts" setup>
const props = withDefaults(defineProps<{
    isOpen: boolean;
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
}>(), {
    title: undefined,
    message: undefined,
    confirmText: undefined,
    cancelText: undefined,
});

const emit = defineEmits<{ confirm: []; cancel: [] }>();

const { t } = useI18n();

const open = computed({
    get: () => props.isOpen,
    set: (value) => {
        if (!value) emit('cancel');
    },
});

const labels = computed(() => ({
    title: props.title || t('common.confirmAction', 'Confirm action'),
    message: props.message || t('common.confirmMessage', 'Are you sure you want to proceed?'),
    confirm: props.confirmText || t('common.confirm', 'Confirm'),
    cancel: props.cancelText || t('common.cancel', 'Cancel'),
}));
</script>

<template>
    <UModal
        v-model:open="open"
        :title="labels.title"
        :description="labels.message"
        :ui="{ footer: 'justify-end' }"
    >
        <template #body>
            <div class="flex items-start gap-3">
                <UIcon
                    name="i-lucide-triangle-alert"
                    class="size-6 shrink-0 text-error"
                />
                <p class="text-toned">
                    {{ labels.message }}
                </p>
            </div>
        </template>

        <template #footer>
            <UButton
                color="neutral"
                variant="outline"
                :label="labels.cancel"
                @click="emit('cancel')"
            />
            <UButton
                color="error"
                :label="labels.confirm"
                @click="emit('confirm')"
            />
        </template>
    </UModal>
</template>
