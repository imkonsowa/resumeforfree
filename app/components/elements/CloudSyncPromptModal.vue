<template>
    <Dialog
        :open="isOpen"
        @update:open="$emit('close')"
    >
        <DialogContent class="max-w-[95vw] sm:max-w-lg max-h-[95vh] overflow-y-auto mx-4 sm:mx-auto">
            <DialogHeader class="pb-2 sm:pb-4">
                <DialogTitle class="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
                    <div class="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-secondary/15 rounded-full">
                        <UIcon name="i-lucide-cloud" class="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                    </div>
                    <span class="leading-tight">{{ $t('resumes.modals.cloudSyncPrompt.title') }}</span>
                </DialogTitle>
                <DialogDescription class="text-sm sm:text-base leading-relaxed pt-1 sm:pt-2">
                    {{ $t('resumes.modals.cloudSyncPrompt.description') }}
                </DialogDescription>
            </DialogHeader>
            <div class="space-y-4 sm:space-y-6 py-2 sm:py-4">
                <div class="bg-secondary/10 border border-secondary/30 rounded-lg p-3 sm:p-4">
                    <div class="flex items-start gap-2 sm:gap-3">
                        <UIcon name="i-lucide-cloud-upload" class="w-4 h-4 sm:w-5 sm:h-5 text-secondary mt-0.5 flex-shrink-0" />
                        <div class="flex-1 min-w-0">
                            <h3 class="font-medium text-secondary mb-2 text-sm sm:text-base">
                                {{ $t('resumes.modals.cloudSyncPrompt.benefits.title') }}
                            </h3>
                            <ul class="text-xs sm:text-sm text-secondary space-y-1">
                                <li class="flex items-center gap-2">
                                    <UIcon name="i-lucide-check" class="w-3 h-3 sm:w-4 sm:h-4 text-secondary flex-shrink-0" />
                                    <span>{{ $t('resumes.modals.cloudSyncPrompt.benefits.accessAnywhere') }}</span>
                                </li>
                                <li class="flex items-center gap-2">
                                    <UIcon name="i-lucide-check" class="w-3 h-3 sm:w-4 sm:h-4 text-secondary flex-shrink-0" />
                                    <span>{{ $t('resumes.modals.cloudSyncPrompt.benefits.autoBackup') }}</span>
                                </li>
                                <li class="flex items-center gap-2">
                                    <UIcon name="i-lucide-check" class="w-3 h-3 sm:w-4 sm:h-4 text-secondary flex-shrink-0" />
                                    <span>{{ $t('resumes.modals.cloudSyncPrompt.benefits.realTimeSync') }}</span>
                                </li>
                                <li class="flex items-center gap-2">
                                    <UIcon name="i-lucide-check" class="w-3 h-3 sm:w-4 sm:h-4 text-secondary flex-shrink-0" />
                                    <span>{{ $t('resumes.modals.cloudSyncPrompt.benefits.neverLose') }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4">
                    <div class="flex items-start gap-3">
                        <UIcon name="i-lucide-info" class="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                            <h3 class="font-medium text-amber-900 mb-2">
                                {{ $t('resumes.modals.cloudSyncPrompt.limit.title') }}
                            </h3>
                            <p class="text-sm text-amber-800 leading-relaxed">
                                {{ $t('resumes.modals.cloudSyncPrompt.limit.description', { remaining: cloudInfo.remaining }) }}
                            </p>
                        </div>
                    </div>
                </div>
                <div class="bg-muted border border-default rounded-lg p-3 sm:p-4">
                    <div class="flex items-start gap-2 sm:gap-3">
                        <UIcon name="i-lucide-hard-drive" class="w-4 h-4 sm:w-5 sm:h-5 text-toned mt-0.5 flex-shrink-0" />
                        <div>
                            <h3 class="font-medium text-highlighted mb-2 text-sm sm:text-base">
                                {{ $t('resumes.modals.cloudSyncPrompt.local.title') }}
                            </h3>
                            <p class="text-xs sm:text-sm text-default leading-relaxed">
                                {{ $t('resumes.modals.cloudSyncPrompt.local.description') }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <DialogFooter class="!flex-col space-y-4 pt-4">
                <div class="flex items-center gap-2 w-full">
                    <UCheckbox
                        id="dont-show-cloud-sync"
                        v-model="dontShowAgain"
                    />
                    <label
                        for="dont-show-cloud-sync"
                        class="text-sm text-toned cursor-pointer"
                    >
                        {{ $t('resumes.modals.cloudSyncPrompt.dontAskAgain') }}
                    </label>
                </div>
                <div class="flex flex-row justify-between w-full gap-2">
                    <UButton
                        :disabled="!canSaveToCloud"
                        @click="$emit('enableSync', dontShowAgain)" icon="i-lucide-cloud-upload">
{{ $t('resumes.modals.cloudSyncPrompt.enableSync') }}
</UButton>
                    <UButton color="neutral" variant="outline"
                        @click="$emit('continueLocally', dontShowAgain)" icon="i-lucide-hard-drive">
{{ $t('resumes.modals.cloudSyncPrompt.keepLocal') }}
</UButton>
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
import { useResumeStore } from '~/stores/resume';

interface Props {
    isOpen: boolean;
}

const props = defineProps<Props>();

defineEmits<{
    close: [];
    enableSync: [dontShowAgain: boolean];
    continueLocally: [dontShowAgain: boolean];
}>();

const resumeStore = useResumeStore();
const dontShowAgain = ref(false);

const cloudInfo = computed(() => resumeStore.cloudInfo);
const canSaveToCloud = computed(() => resumeStore.canSaveToCloud);

watch(() => props.isOpen, (isOpen) => {
    if (isOpen) {
        dontShowAgain.value = false;
    }
});
</script>
