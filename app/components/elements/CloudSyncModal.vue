<template>
    <UModal
        v-model:open="open"
        :title="t('resumes.modals.cloudSync.title')"
        :description="t('resumes.modals.cloudSync.description', {
            count: cloudInfo.count,
            limit: cloudInfo.limit,
            remaining: cloudInfo.remaining,
            remainingPlural: cloudInfo.remaining !== 1 ? t('resumes.modals.cloudSync.slots') : t('resumes.modals.cloudSync.slot'),
        })"
        :ui="{ content: 'max-w-2xl' }"
    >
        <template #body>
            <div class="max-h-[60vh] overflow-y-auto space-y-4">
                <div
                    v-for="resume in syncableResumes"
                    :key="resume.id"
                    class="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted transition-colors cursor-pointer"
                    :class="{ 'bg-secondary/10 border-secondary/30': selectedResumes.includes(resume.id) }"
                    @click="toggleResume(resume.id)"
                >
                    <div class="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                        <UIcon
                            v-if="selectedResumes.includes(resume.id)"
                            name="i-lucide-check-circle"
                            class="w-5 h-5 text-secondary"
                        />
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="block font-medium text-highlighted truncate">
                            {{ resume.name }}
                        </div>
                        <div class="text-sm text-muted space-y-1">
                            <p>Updated {{ formatDate(resume.updatedAt) }}</p>
                            <div class="flex items-center gap-4 text-xs">
                                <span class="flex items-center gap-1">
                                    <UIcon
                                        name="i-lucide-alert-circle"
                                        class="w-3 h-3 text-amber-600"
                                    />
                                    {{ $t('resumes.status.notSynced') }}
                                </span>
                                <span>{{ getSectionCount(resume) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <UEmpty
                    v-if="syncableResumes.length === 0"
                    icon="i-lucide-cloud"
                    :title="$t('resumes.modals.cloudSync.allSynced')"
                    :description="$t('resumes.modals.cloudSync.unsyncHint')"
                />
                <UAlert
                    v-if="getNewResumesCount() > cloudInfo.remaining"
                    color="warning"
                    variant="soft"
                    icon="i-lucide-circle-alert"
                    :title="$t('resumes.modals.cloudSync.limitExceeded')"
                    :description="t('resumes.modals.cloudSync.limitExceededMessage', {
                        count: getNewResumesCount(),
                        countPlural: getNewResumesCount() !== 1 ? t('resumes.resumeCount.resumes') : t('resumes.resumeCount.resume'),
                        remaining: cloudInfo.remaining,
                        remainingPlural: cloudInfo.remaining !== 1 ? t('resumes.modals.cloudSync.slots') : t('resumes.modals.cloudSync.slot'),
                    })"
                />
            </div>
        </template>
        <template #footer>
            <div class="flex justify-end gap-2 w-full">
                <UButton
                    color="neutral"
                    variant="outline"
                    :label="$t('resumes.modals.cancel')"
                    @click="emit('close')"
                />
                <UButton
                    color="neutral"
                    variant="outline"
                    :disabled="syncableResumes.length === 0"
                    :label="selectedResumes.length === syncableResumes.length ? t('resumes.modals.cloudSync.deselectAll') : t('resumes.modals.cloudSync.selectAll')"
                    @click="selectAll"
                />
                <UButton
                    color="secondary"
                    :loading="isLoading"
                    :disabled="selectedResumes.length === 0 || getNewResumesCount() > cloudInfo.remaining"
                    :label="t('resumes.modals.cloudSync.syncButton', {
                        count: selectedResumes.length,
                        countPlural: selectedResumes.length !== 1 ? t('resumes.resumeCount.resumes') : t('resumes.resumeCount.resume'),
                    })"
                    @click="handleSync"
                />
            </div>
        </template>
    </UModal>
</template>

<script lang="ts" setup>
import type { Resume } from '~/types/resume';

const props = defineProps<Props>();

const emit = defineEmits<{
    close: [];
    sync: [resumeIds: string[]];
}>();

const open = computed({
    get: () => props.isOpen,
    set: (value) => {
        if (!value) emit('close');
    },
});

const { t } = useI18n();

interface Props {
    isOpen: boolean;
    resumes: Resume[];
}
const selectedResumes = ref<string[]>([]);
const isLoading = ref(false);
const syncableResumes = computed(() => {
    return props.resumes.filter(resume => !resume.serverId);
});
const cloudInfo = computed(() => {
    const syncedCount = props.resumes.filter(resume => resume.serverId).length;
    return {
        count: syncedCount,
        limit: 3,
        remaining: Math.max(0, 3 - syncedCount),
    };
});
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};
const getSectionCount = (resume: Resume): string => {
    const data = resume.data;
    const sections = [];
    if (data.experiences?.length) sections.push(`${data.experiences.length} ${t('resumes.modals.cloudSync.exp')}`);
    if (data.education?.length) sections.push(`${data.education.length} ${t('resumes.modals.cloudSync.edu')}`);
    if (data.skills?.length) sections.push(`${data.skills.length} ${t('resumes.card.skills')}`);
    if (data.projects?.length) sections.push(`${data.projects.length} ${t('resumes.modals.cloudSync.projects')}`);
    return sections.join(', ') || t('resumes.modals.cloudSync.noSections');
};
const getNewResumesCount = (): number => {
    return selectedResumes.value.filter((id) => {
        const resume = props.resumes.find(r => r.id === id);
        return resume && !resume.serverId;
    }).length;
};
const toggleResume = (resumeId: string) => {
    const index = selectedResumes.value.indexOf(resumeId);
    if (index > -1) {
        selectedResumes.value.splice(index, 1);
    }
    else {
        selectedResumes.value.push(resumeId);
    }
};
const selectAll = () => {
    if (selectedResumes.value.length === syncableResumes.value.length) {
        selectedResumes.value = [];
    }
    else {
        selectedResumes.value = syncableResumes.value.map(r => r.id);
    }
};
const handleSync = async () => {
    if (selectedResumes.value.length === 0) return;
    isLoading.value = true;
    await new Promise(resolve => setTimeout(resolve, 500));
    emit('sync', [...selectedResumes.value]);
    selectedResumes.value = [];
    isLoading.value = false;
};
watch(() => props.isOpen, (isOpen) => {
    if (isOpen) {
        selectedResumes.value = [];
    }
});
</script>
