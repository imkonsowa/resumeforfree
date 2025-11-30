<template>
    <Dialog
        :open="isOpen"
        @update:open="$emit('close')"
    >
        <DialogContent class="!max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
            <DialogHeader class="flex-shrink-0">
                <DialogTitle class="flex items-center gap-2">
                    <Cloud class="w-5 h-5" />
                    {{ $t('resumes.modals.cloudSync.title') }}
                </DialogTitle>
                <DialogDescription>
                    {{ t('resumes.modals.cloudSync.description', {
                        count: cloudInfo.count,
                        limit: cloudInfo.limit,
                        remaining: cloudInfo.remaining,
                        remainingPlural: cloudInfo.remaining !== 1 ? t('resumes.modals.cloudSync.slots') : t('resumes.modals.cloudSync.slot'),
                    }) }}
                </DialogDescription>
            </DialogHeader>
            <div class="flex-1 overflow-y-auto space-y-4 py-4">
                <div
                    v-for="resume in syncableResumes"
                    :key="resume.id"
                    class="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    :class="{ 'bg-blue-50 border-blue-200': selectedResumes.includes(resume.id) }"
                    @click="toggleResume(resume.id)"
                >
                    <div class="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                        <CheckCircle
                            v-if="selectedResumes.includes(resume.id)"
                            class="w-5 h-5 text-blue-600"
                        />
                    </div>
                    <div class="flex-1 min-w-0">
                        <div class="block font-medium text-gray-900 truncate">
                            {{ resume.name }}
                        </div>
                        <div class="text-sm text-gray-500 space-y-1">
                            <p>Updated {{ formatDate(resume.updatedAt) }}</p>
                            <div class="flex items-center gap-4 text-xs">
                                <span class="flex items-center gap-1">
                                    <AlertCircle class="w-3 h-3 text-amber-600" />
                                    {{ $t('resumes.status.notSynced') }}
                                </span>
                                <span>{{ getSectionCount(resume) }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    v-if="syncableResumes.length === 0"
                    class="text-center py-8 text-gray-500"
                >
                    <Cloud class="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>{{ $t('resumes.modals.cloudSync.allSynced') }}</p>
                    <p class="text-xs mt-2">
                        {{ $t('resumes.modals.cloudSync.unsyncHint') }}
                    </p>
                </div>
                <div
                    v-if="getNewResumesCount() > cloudInfo.remaining"
                    class="bg-amber-50 border border-amber-200 rounded-lg p-4"
                >
                    <div class="flex items-start gap-3">
                        <AlertCircle class="w-5 h-5 text-amber-600 mt-0.5" />
                        <div>
                            <h4 class="text-sm font-medium text-amber-800">
                                {{ $t('resumes.modals.cloudSync.limitExceeded') }}
                            </h4>
                            <p class="text-sm text-amber-700 mt-1">
                                {{ t('resumes.modals.cloudSync.limitExceededMessage', {
                                    count: getNewResumesCount(),
                                    countPlural: getNewResumesCount() !== 1 ? t('resumes.resumeCount.resumes') : t('resumes.resumeCount.resume'),
                                    remaining: cloudInfo.remaining,
                                    remainingPlural: cloudInfo.remaining !== 1 ? t('resumes.modals.cloudSync.slots') : t('resumes.modals.cloudSync.slot'),
                                }) }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <DialogFooter class="flex-shrink-0 gap-2">
                <Button
                    variant="outline"
                    @click="$emit('close')"
                >
                    {{ $t('resumes.modals.cancel') }}
                </Button>
                <Button
                    variant="outline"
                    :disabled="syncableResumes.length === 0"
                    @click="selectAll"
                >
                    {{ selectedResumes.length === syncableResumes.length ? t('resumes.modals.cloudSync.deselectAll') : t('resumes.modals.cloudSync.selectAll') }}
                </Button>
                <Button
                    :disabled="selectedResumes.length === 0 || isLoading || getNewResumesCount() > cloudInfo.remaining"
                    @click="handleSync"
                >
                    <Loader2
                        v-if="isLoading"
                        class="w-4 h-4 mr-2 animate-spin"
                    />
                    {{ t('resumes.modals.cloudSync.syncButton', {
                        count: selectedResumes.length,
                        countPlural: selectedResumes.length !== 1 ? t('resumes.resumeCount.resumes') : t('resumes.resumeCount.resume'),
                    }) }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script lang="ts" setup>
import { Button } from '~/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '~/components/ui/dialog';
import {
    AlertCircle,
    CheckCircle,
    Cloud,
    Loader2,
} from 'lucide-vue-next';
import type { Resume } from '~/types/resume';

const props = defineProps<Props>();

const emit = defineEmits<{
    close: [];
    sync: [resumeIds: string[]];
}>();

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
