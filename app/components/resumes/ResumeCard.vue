<template>
    <Card
        :class="{ 'ring-2 ring-secondary': isActive }"
        class="hover:shadow-lg transition-shadow relative"
    >
        <CardHeader class="pb-4">
            <div
                v-if="isEditing"
                class="flex items-center gap-2"
            >
                <input
                    v-model="editingName"
                    autofocus
                    class="flex-1 px-2 py-1 border rounded text-xl font-semibold"
                    @keyup.enter="saveEdit"
                    @keyup.escape="cancelEdit"
                >
                <button
                    class="p-1 text-secondary hover:text-secondary"
                    @click="saveEdit"
                >
                    <UIcon name="i-lucide-check" class="w-4 h-4" />
                </button>
                <button
                    class="p-1 text-red-600 hover:text-red-700"
                    @click="cancelEdit"
                >
                    <UIcon name="i-lucide-x" class="w-4 h-4" />
                </button>
            </div>
            <div
                v-else
                class="flex items-center gap-2"
            >
                <CardTitle class="text-xl font-semibold truncate flex-1">
                    {{ resume.name }}
                </CardTitle>
                <button
                    class="p-1 text-dimmed hover:text-toned transition-colors"
                    :title="$t('resumes.card.editNameTitle')"
                    @click="startEdit"
                >
                    <UIcon name="i-lucide-pencil" class="w-4 h-4" />
                </button>
            </div>
            <div class="flex items-center justify-between gap-2 text-sm text-muted flex-wrap">
                <div class="flex items-center gap-2">
                    <UIcon name="i-lucide-calendar" class="w-4 h-4" />
                    <span>{{ $t('resumes.status.updated') }} {{ formatDate(resume.updatedAt) }}</span>
                </div>
                <div class="flex items-center gap-2">
                    <ResumeLanguageSelector
                        :model-value="resume.language"
                        size="sm"
                        button-variant="ghost"
                        button-class="h-7 text-xs px-2"
                        @update="(code) => resumeStore.setResumeLanguage(resume.id, code)"
                    />
                    <UBadge
                        v-if="isActive"
                        class="bg-secondary text-white text-xs"
                    >
                        {{ $t('resumes.status.active') }}
                    </UBadge>
                    <UBadge
                        v-if="resume.serverId"
                        class="bg-secondary text-white flex items-center gap-1 text-xs"
                    >
                        <UIcon name="i-lucide-cloud" class="w-3 h-3" />
                        {{ $t('resumes.status.synced') }}
                    </UBadge>
                </div>
            </div>
        </CardHeader>
        <CardContent class="pt-0">
            <div class="space-y-2 mb-4">
                <p class="font-medium text-highlighted">
                    {{ resumePreview.fullName }}
                </p>
                <p class="text-sm text-toned">
                    {{ resumePreview.position }}
                </p>
                <p class="text-xs text-muted">
                    {{ resumePreview.sections }}
                </p>
            </div>
            <div class="flex gap-2 mt-4">
                <UButton
                    class="flex items-center gap-1"
                    size="sm" color="neutral" variant="outline"
                    @click="$emit('edit', resume.id)" icon="i-lucide-square-pen">
{{ $t('resumes.card.build') }}
</UButton>
                <UButton
                    class="flex items-center gap-1"
                    size="sm" color="neutral" variant="outline"
                    @click.stop="$emit('copy', resume.id)" icon="i-lucide-copy">
{{ $t('resumes.card.copy') }}
</UButton>
                <UButton
                    class="flex items-center gap-1"
                    size="sm" color="neutral" variant="outline"
                    :title="$t('resumes.card.exportTitle')"
                    @click.stop="$emit('export', resume.id)" icon="i-lucide-download">
{{ $t('common.export') }}
</UButton>
                <UButton
                    v-if="authStore.isLoggedIn"
                    class="flex items-center gap-1"
                    size="sm" color="neutral" variant="outline"
                    :title="$t('resumes.card.syncTitle')"
                    @click.stop="$emit('sync', resume.id)" icon="i-lucide-cloud">
{{ $t('common.sync') }}
</UButton>
                <Popover>
                    <PopoverTrigger as-child>
                        <UButton
                            size="sm" color="neutral" variant="outline"
                            class="p-2"
                            @click.stop icon="i-lucide-more-vertical" />
                    </PopoverTrigger>
                    <PopoverContent
                        class="w-48 p-1"
                        align="end"
                    >
                        <button
                            v-if="authStore.isLoggedIn && resume.serverId"
                            class="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-amber-600 hover:bg-amber-50 rounded transition-colors"
                            @click.stop="$emit('disableSync', resume.id)"
                        >
                            <UIcon name="i-lucide-cloud-off" class="w-3 h-3" />
                            {{ $t('resumes.card.disableSync') }}
                        </button>
                        <button
                            class="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded transition-colors"
                            @click.stop="$emit('delete', resume.id)"
                        >
                            <UIcon name="i-lucide-trash-2" class="w-3 h-3" />
                            {{ $t('resumes.card.delete') }}
                        </button>
                    </PopoverContent>
                </Popover>
            </div>
        </CardContent>
    </Card>
</template>

<script lang="ts" setup>
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';
import type { Resume } from '~/types/resume';
import ResumeLanguageSelector from '~/components/elements/ResumeLanguageSelector.vue';

const props = defineProps<Props>();

defineEmits<{
    edit: [id: string];
    copy: [id: string];
    export: [id: string];
    sync: [id: string];
    delete: [id: string];
    rename: [id: string, newName: string];
    disableSync: [id: string];
}>();

const { t } = useI18n();

interface Props {
    resume: Resume;
    isActive: boolean;
}
const resumeStore = useResumeStore();
const authStore = useAuthStore();
const isEditing = ref(false);
const editingName = ref('');
const resumePreview = computed(() => {
    const data = props.resume.data;
    const fullName = [data.firstName, data.lastName].filter(Boolean).join(' ');
    const position = data.position || t('resumes.card.noPosition');
    const sections = [];
    if (data.experiences?.length) sections.push(`${data.experiences.length} ${data.experiences.length > 1 ? t('resumes.card.experiences') : t('resumes.card.experience')}`);
    if (data.education?.length) sections.push(`${data.education.length} ${t('resumes.card.education')}`);
    if (data.skills?.length) sections.push(`${data.skills.length} ${data.skills.length > 1 ? t('resumes.card.skills') : t('resumes.card.skill')}`);
    return {
        fullName: fullName || t('resumes.card.noName'),
        position,
        sections: sections.join(', ') || t('resumes.card.noSections'),
    };
});
const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};
const startEdit = () => {
    isEditing.value = true;
    editingName.value = props.resume.name;
};
const saveEdit = () => {
    if (editingName.value.trim()) {
        resumeStore.renameResume(props.resume.id, editingName.value.trim());
    }
    cancelEdit();
};
const cancelEdit = () => {
    isEditing.value = false;
    editingName.value = '';
};
</script>
