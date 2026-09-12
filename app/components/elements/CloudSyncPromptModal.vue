<script lang="ts" setup>
import { useResumeStore } from '~/stores/resume';

const props = defineProps<{ isOpen: boolean }>();

const emit = defineEmits<{
    close: [];
    enableSync: [dontShowAgain: boolean];
    continueLocally: [dontShowAgain: boolean];
}>();

const { t } = useI18n();
const resumeStore = useResumeStore();
const dontShowAgain = ref(false);

const cloudInfo = computed(() => resumeStore.cloudInfo);
const canSaveToCloud = computed(() => resumeStore.canSaveToCloud);

const open = computed({
    get: () => props.isOpen,
    set: (value) => {
        if (!value) emit('close');
    },
});

const benefits = computed(() => [
    t('resumes.modals.cloudSyncPrompt.benefits.accessAnywhere'),
    t('resumes.modals.cloudSyncPrompt.benefits.autoBackup'),
    t('resumes.modals.cloudSyncPrompt.benefits.realTimeSync'),
    t('resumes.modals.cloudSyncPrompt.benefits.neverLose'),
]);

watch(() => props.isOpen, (isOpen) => {
    if (isOpen) dontShowAgain.value = false;
});
</script>

<template>
    <UModal
        v-model:open="open"
        :title="t('resumes.modals.cloudSyncPrompt.title')"
        :description="t('resumes.modals.cloudSyncPrompt.description')"
        :ui="{ content: 'max-w-lg', footer: 'flex-col items-stretch gap-4' }"
    >
        <template #body>
            <div class="space-y-4">
                <UAlert
                    color="secondary"
                    variant="soft"
                    icon="i-lucide-cloud-upload"
                    :title="t('resumes.modals.cloudSyncPrompt.benefits.title')"
                >
                    <template #description>
                        <ul class="space-y-1 mt-1">
                            <li
                                v-for="benefit in benefits"
                                :key="benefit"
                                class="flex items-center gap-2"
                            >
                                <UIcon
                                    name="i-lucide-check"
                                    class="size-4 shrink-0"
                                />
                                <span>{{ benefit }}</span>
                            </li>
                        </ul>
                    </template>
                </UAlert>

                <UAlert
                    color="warning"
                    variant="soft"
                    icon="i-lucide-info"
                    :title="t('resumes.modals.cloudSyncPrompt.limit.title')"
                    :description="t('resumes.modals.cloudSyncPrompt.limit.description', { remaining: cloudInfo.remaining })"
                />

                <UAlert
                    color="neutral"
                    variant="soft"
                    icon="i-lucide-hard-drive"
                    :title="t('resumes.modals.cloudSyncPrompt.local.title')"
                    :description="t('resumes.modals.cloudSyncPrompt.local.description')"
                />
            </div>
        </template>

        <template #footer>
            <UCheckbox
                v-model="dontShowAgain"
                :label="t('resumes.modals.cloudSyncPrompt.dontAskAgain')"
            />

            <div class="flex flex-row justify-between w-full gap-2">
                <UButton
                    color="secondary"
                    icon="i-lucide-cloud-upload"
                    :disabled="!canSaveToCloud"
                    :label="t('resumes.modals.cloudSyncPrompt.enableSync')"
                    @click="emit('enableSync', dontShowAgain)"
                />
                <UButton
                    color="neutral"
                    variant="outline"
                    icon="i-lucide-hard-drive"
                    :label="t('resumes.modals.cloudSyncPrompt.keepLocal')"
                    @click="emit('continueLocally', dontShowAgain)"
                />
            </div>
        </template>
    </UModal>
</template>
