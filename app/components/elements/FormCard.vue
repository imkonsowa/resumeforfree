<template>
    <UCard class="relative mb-6 form-card">
        <template #header>
            <div class="flex justify-between items-center gap-2">
                <span class="text-highlighted font-semibold">{{ title }}</span>
                <div class="flex items-center gap-2">
                    <UButtonGroup
                        v-if="canMoveUp || canMoveDown"
                        size="sm"
                    >
                        <UButton
                            :disabled="!canMoveUp"
                            icon="i-lucide-chevron-up"
                            color="neutral"
                            variant="outline"
                            :aria-label="t('common.moveUp', 'Move up')"
                            @click="emit('move-up')"
                        />
                        <UButton
                            :disabled="!canMoveDown"
                            icon="i-lucide-chevron-down"
                            color="neutral"
                            variant="outline"
                            :aria-label="t('common.moveDown', 'Move down')"
                            @click="emit('move-down')"
                        />
                    </UButtonGroup>
                    <UButton
                        size="sm"
                        icon="i-lucide-trash-2"
                        color="error"
                        variant="ghost"
                        :aria-label="t('common.delete', 'Delete')"
                        @click="handleRemove"
                    />
                </div>
            </div>
        </template>

        <slot />
    </UCard>

    <ConfirmationModal
        :cancel-text="confirmation.cancelText.value"
        :confirm-text="confirmation.confirmText.value"
        :is-open="confirmation.isOpen.value"
        :message="confirmation.message.value"
        :title="confirmation.title.value"
        @cancel="confirmation.handleCancel"
        @confirm="confirmation.handleConfirm"
    />
</template>

<script lang="ts" setup>
import ConfirmationModal from '~/components/elements/ConfirmationModal.vue';

interface Props {
    title: string;
    confirmTitle?: string;
    confirmMessage?: string;
    canMoveUp?: boolean;
    canMoveDown?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    confirmTitle: 'Delete Item',
    confirmMessage: 'Are you sure you want to delete this item? This action cannot be undone.',
    canMoveUp: false,
    canMoveDown: false,
});
const emit = defineEmits<{
    'remove': [];
    'move-up': [];
    'move-down': [];
}>();

const { t } = useI18n();
const confirmation = useConfirmation();

const handleRemove = async () => {
    const confirmed = await confirmation.confirm({
        title: props.confirmTitle,
        message: props.confirmMessage,
        confirmText: t('common.delete', 'Delete'),
        cancelText: t('common.cancel', 'Cancel'),
    });
    if (confirmed) {
        emit('remove');
    }
};
</script>
