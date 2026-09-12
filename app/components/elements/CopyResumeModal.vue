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
const copyResumeName = ref('');
const navigateToBuilder = ref(true);
watch(() => props.isOpen, (isOpen) => {
    if (isOpen) {
        copyResumeName.value = props.resumeName;
        navigateToBuilder.value = true;
    }
});
const handleConfirm = () => {
    emit('confirm', copyResumeName.value, navigateToBuilder.value);
};
const handleCancel = () => {
    emit('close');
};
const handleEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        handleConfirm();
    }
};
</script>

<template>
    <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center"
        @click="handleCancel"
    >
        <div class="absolute inset-0 bg-black/50" />
        <div
            class="relative bg-white border rounded-lg shadow-xl p-6 w-96 max-w-[90vw]"
            @click.stop
        >
            <div class="space-y-4">
                <h3 class="text-lg font-semibold text-highlighted">
                    {{ $t('resumes.modals.copy.title') }}
                </h3>
                <div class="space-y-2">
                    <label for="copy-resume-name">{{ $t('resumes.modals.copy.resumeName') }}</label>
                    <UInput
                        id="copy-resume-name"
                        v-model="copyResumeName"
                        autofocus
                        :placeholder="$t('resumes.modals.copy.enterName')"
                        @keydown="handleEnter"
                    />
                </div>
                <div class="flex items-center space-x-2 pt-2">
                    <UCheckbox
                        id="copy-navigate-to-builder"
                        v-model="navigateToBuilder"
                    />
                    <label
                        class="text-sm font-normal"
                        for="copy-navigate-to-builder"
                    >
                        {{ $t('resumes.modals.copy.navigateToBuilder') }}
                    </label>
                </div>
                <div class="flex gap-3 pt-4">
                    <UButton
                        class="flex-1"
                        @click="handleConfirm"
                    >
                        {{ $t('resumes.modals.copy.copyButton') }}
                    </UButton>
                    <UButton
                        class="flex-1" color="neutral" variant="outline"
                        @click="handleCancel"
                    >
                        {{ $t('resumes.modals.cancel') }}
                    </UButton>
                </div>
            </div>
        </div>
    </div>
</template>
