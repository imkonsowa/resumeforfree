<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui';
import type { Resume } from '~/types/resume';
import ResumeLanguageSelector from '~/components/elements/ResumeLanguageSelector.vue';

interface Props {
    resume: Resume;
    isActive: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    edit: [id: string];
    copy: [id: string];
    export: [id: string];
    sync: [id: string];
    delete: [id: string];
    rename: [id: string, newName: string];
    disableSync: [id: string];
}>();

const { t } = useI18n();

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

const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

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

const menuItems = computed<DropdownMenuItem[][]>(() => {
    const items: DropdownMenuItem[][] = [];

    if (authStore.isLoggedIn && props.resume.serverId) {
        items.push([{
            label: t('resumes.card.disableSync'),
            icon: 'i-lucide-cloud-off',
            color: 'warning' as const,
            onSelect: () => emit('disableSync', props.resume.id),
        }]);
    }

    items.push([{
        label: t('resumes.card.delete'),
        icon: 'i-lucide-trash-2',
        color: 'error' as const,
        onSelect: () => emit('delete', props.resume.id),
    }]);

    return items;
});
</script>

<template>
    <UCard
        class="hover:shadow-lg transition-shadow relative"
        :class="{ 'ring-2 ring-secondary': isActive }"
    >
        <template #header>
            <div
                v-if="isEditing"
                class="flex items-center gap-2"
            >
                <UInput
                    v-model="editingName"
                    autofocus
                    class="flex-1"
                    size="lg"
                    @keyup.enter="saveEdit"
                    @keyup.escape="cancelEdit"
                />
                <UButton
                    icon="i-lucide-check"
                    color="secondary"
                    variant="ghost"
                    size="sm"
                    :aria-label="$t('common.save')"
                    @click="saveEdit"
                />
                <UButton
                    icon="i-lucide-x"
                    color="error"
                    variant="ghost"
                    size="sm"
                    :aria-label="$t('common.cancel')"
                    @click="cancelEdit"
                />
            </div>
            <div
                v-else
                class="flex items-center gap-2"
            >
                <h3 class="text-xl font-semibold truncate flex-1 text-highlighted">
                    {{ resume.name }}
                </h3>
                <UButton
                    icon="i-lucide-pencil"
                    color="neutral"
                    variant="ghost"
                    size="sm"
                    :aria-label="$t('resumes.card.editNameTitle')"
                    @click="startEdit"
                />
            </div>

            <div class="flex items-center justify-between gap-2 text-sm text-muted flex-wrap mt-2">
                <div class="flex items-center gap-2">
                    <UIcon
                        name="i-lucide-calendar"
                        class="size-4"
                    />
                    <span>{{ $t('resumes.status.updated') }} {{ formatDate(resume.updatedAt) }}</span>
                </div>
                <div class="flex items-center gap-2">
                    <ResumeLanguageSelector
                        :model-value="resume.language"
                        size="sm"
                        button-variant="ghost"
                        @update="(code) => resumeStore.setResumeLanguage(resume.id, code)"
                    />
                    <UBadge
                        v-if="isActive"
                        color="secondary"
                        variant="subtle"
                        size="sm"
                        :label="$t('resumes.status.active')"
                    />
                    <UBadge
                        v-if="resume.serverId"
                        color="secondary"
                        variant="subtle"
                        size="sm"
                        icon="i-lucide-cloud"
                        :label="$t('resumes.status.synced')"
                    />
                </div>
            </div>
        </template>

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

        <div class="flex flex-wrap gap-2">
            <UButton
                size="sm"
                color="neutral"
                variant="outline"
                icon="i-lucide-square-pen"
                :label="$t('resumes.card.build')"
                @click="emit('edit', resume.id)"
            />
            <UButton
                size="sm"
                color="neutral"
                variant="outline"
                icon="i-lucide-copy"
                :label="$t('resumes.card.copy')"
                @click.stop="emit('copy', resume.id)"
            />
            <UButton
                size="sm"
                color="neutral"
                variant="outline"
                icon="i-lucide-download"
                :label="$t('common.export')"
                :aria-label="$t('resumes.card.exportTitle')"
                @click.stop="emit('export', resume.id)"
            />
            <UButton
                v-if="authStore.isLoggedIn"
                size="sm"
                color="neutral"
                variant="outline"
                icon="i-lucide-cloud"
                :label="$t('common.sync')"
                :aria-label="$t('resumes.card.syncTitle')"
                @click.stop="emit('sync', resume.id)"
            />

            <UDropdownMenu
                :items="menuItems"
                :content="{ align: 'end' }"
            >
                <UButton
                    size="sm"
                    color="neutral"
                    variant="outline"
                    icon="i-lucide-more-vertical"
                    :aria-label="$t('common.moreActions', 'More actions')"
                    @click.stop
                />
            </UDropdownMenu>
        </div>
    </UCard>
</template>
