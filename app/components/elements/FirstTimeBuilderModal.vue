<template>
    <Dialog
        :open="isOpen"
        @update:open="$emit('close')"
    >
        <DialogContent class="max-w-[95vw] sm:max-w-md mx-4 sm:mx-auto">
            <DialogHeader class="pb-2">
                <DialogTitle class="flex items-center gap-2 text-lg">
                    <UIcon name="i-lucide-cloud" class="w-5 h-5 text-secondary" />
                    <span>{{ $t('resumes.modals.firstTime.title') }}</span>
                </DialogTitle>
                <DialogDescription class="text-sm leading-relaxed pt-1">
                    {{ $t('resumes.modals.firstTime.description') }}
                </DialogDescription>
            </DialogHeader>
            <div class="space-y-3 py-3">
                <ul class="text-sm text-muted space-y-1.5">
                    <li class="flex items-center gap-2">
                        <UIcon name="i-lucide-check" class="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{{ $t('resumes.modals.firstTime.accessAnywhere') }}</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <UIcon name="i-lucide-check" class="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{{ $t('resumes.modals.firstTime.autoBackup') }}</span>
                    </li>
                    <li class="flex items-center gap-2">
                        <UIcon name="i-lucide-check" class="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{{ $t('resumes.modals.firstTime.freeResumes') }}</span>
                    </li>
                </ul>
            </div>
            <DialogFooter class="!flex-col space-y-3 pt-2">
                <div class="flex gap-2 w-full">
                    <UButton
                        class="flex-1"
                        @click="$emit('register', dontShowAgain)" icon="i-lucide-user-plus">
{{ $t('resumes.modals.firstTime.signUp') }}
</UButton>
                    <UButton color="neutral" variant="outline"
                        class="flex-1"
                        @click="$emit('login', dontShowAgain)" icon="i-lucide-log-in">
{{ $t('resumes.modals.firstTime.login') }}
</UButton>
                </div>
                <UButton color="neutral" variant="outline"
                    class="w-full"
                    @click="$emit('continueLocally', dontShowAgain)"
                >
                    {{ $t('resumes.modals.firstTime.continueLocally') }}
                </UButton>
                <div class="flex items-center justify-center gap-2 pt-1">
                    <UCheckbox
                        id="dont-show-again"
                        v-model="dontShowAgain"
                    />
                    <label
                        for="dont-show-again"
                        class="text-xs text-muted cursor-pointer"
                    >
                        {{ $t('resumes.modals.firstTime.dontShowAgain') }}
                    </label>
                </div>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script lang="ts" setup>
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '~/components/ui/dialog';

interface Props {
    isOpen: boolean;
}
const props = defineProps<Props>();
defineEmits<{
    close: [];
    register: [dontShowAgain: boolean];
    login: [dontShowAgain: boolean];
    continueLocally: [dontShowAgain: boolean];
}>();
const dontShowAgain = ref(false);
watch(() => props.isOpen, (isOpen) => {
    if (isOpen) {
        dontShowAgain.value = false;
    }
});
</script>
