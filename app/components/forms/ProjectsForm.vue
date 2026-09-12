<template>
    <FormContainer
        :is-empty="resumeStore.resumeData.projects.length === 0"
        :title="projectsHeader"
        :add-button-label="t('forms.projects.addProject')"
        :empty-message="t('forms.projects.emptyMessage')"
        section-key="projects"
        @add="resumeStore.addProject"
        @edit-title="(value) => setSectionHeader('projects', value)"
    >
        <template #header-actions>
            <div
                v-if="templateConfig.canMoveSection('projects')"
                class="flex items-center gap-2"
            >
                <span class="text-sm text-toned">{{ t('forms.projects.column') }}:</span>
                <USelect
                    :model-value="resumeStore.resumeData.sectionPlacement.projects"
                    :items="placementItems"
                    value-key="value"
                    size="sm"
                    class="w-28"
                    @update:model-value="(value) => resumeStore.updateSectionPlacement('projects', value as 'left' | 'right')"
                />
            </div>
        </template>
        <FormCard
            v-for="(project, index) in resumeStore.resumeData.projects"
            :key="index"
            :can-move-down="index < resumeStore.resumeData.projects.length - 1"
            :can-move-up="index > 0"
            :confirm-message="t('forms.projects.deleteConfirm.message')"
            :confirm-title="t('forms.projects.deleteConfirm.title')"
            :title="`Project ${index + 1}`"
            @remove="resumeStore.removeProject(index)"
            @move-up="resumeStore.moveProject(index, index - 1)"
            @move-down="resumeStore.moveProject(index, index + 1)"
        >
            <div class="space-y-4">
                <UFormField :label="t('forms.projects.projectTitle')">
                    <UInput
                        :model-value="project.title"
                        :placeholder="t('forms.projects.projectTitle')"
                        class="w-full"
                        @update:model-value="(value) => resumeStore.updateProject(index, 'title', value)"
                    />
                </UFormField>
                <UFormField :label="t('common.description')">
                    <UTextarea
                        :model-value="project.description"
                        :placeholder="t('common.description')"
                        rows="2"
                        class="w-full"
                        @update:model-value="(value) => resumeStore.updateProject(index, 'description', value)"
                    />
                </UFormField>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <MonthYearPicker
                            :model-value="project.startDate || ''"
                            :label="t('common.startDate')"
                            @update:model-value="(value) => resumeStore.updateProject(index, 'startDate', value)"
                        />
                    </div>
                    <div class="space-y-2">
                        <MonthYearPicker
                            :disabled="project.isPresent"
                            :model-value="project.endDate || ''"
                            :label="t('common.endDate')"
                            @update:model-value="(value) => resumeStore.updateProject(index, 'endDate', value)"
                        />
                        <UCheckbox
                            :model-value="project.isPresent"
                            :label="t('common.present')"
                            @update:model-value="(value) => {
                                resumeStore.updateProject(index, 'isPresent', value);
                                if (value) resumeStore.updateProject(index, 'endDate', '');
                            }"
                        />
                    </div>
                </div>
                <div class="space-y-2">
                    <div class="flex items-center justify-between">
                        <h4 class="text-sm font-medium text-default">
                            {{ t('forms.projects.links') }}
                        </h4>
                        <UButton
                            type="button"
                            color="neutral"
                            variant="outline"
                            size="sm"
                            icon="i-lucide-plus"
                            @click="resumeStore.addProjectLink(index)"
                        >
                            {{ t('forms.projects.addLink') }}
                        </UButton>
                    </div>
                    <div
                        v-if="!project.links?.length"
                        class="text-xs text-muted"
                    >
                        {{ t('forms.projects.emptyLinks') }}
                    </div>
                    <div
                        v-for="(link, linkIndex) in project.links || []"
                        :key="linkIndex"
                        class="flex items-start gap-2"
                    >
                        <UInput
                            :model-value="link.label"
                            :placeholder="t('forms.projects.linkLabel')"
                            class="flex-1 md:max-w-[180px]"
                            @update:model-value="(value) => resumeStore.updateProjectLink(index, linkIndex, 'label', String(value))"
                        />
                        <UInput
                            :model-value="link.url"
                            :placeholder="t('forms.projects.linkUrl')"
                            type="url"
                            class="flex-1"
                            @update:model-value="(value) => resumeStore.updateProjectLink(index, linkIndex, 'url', String(value))"
                        />
                        <UButton
                            type="button"
                            color="neutral"
                            variant="ghost"
                            size="sm"
                            class="text-red-600 hover:text-red-700"
                            icon="i-lucide-trash-2"
                            @click="resumeStore.removeProjectLink(index, linkIndex)"
                        >
                            <span class="sr-only">{{ t('forms.projects.removeLink') }}</span>
                        </UButton>
                    </div>
                </div>
                <div class="space-y-2">
                    <div class="flex items-center justify-between">
                        <h4 class="text-sm font-medium text-default">
                            {{ t('common.achievements') }}
                        </h4>
                        <UButton
                            size="sm"
                            color="neutral"
                            variant="outline"
                            icon="i-lucide-plus"
                            @click="resumeStore.addProjectAchievement(index)"
                        >
                            {{ t('common.addAchievement') }}
                        </UButton>
                    </div>
                    <div
                        v-for="(_, achievementIndex) in project.achievements || []"
                        :key="achievementIndex"
                        class="space-y-2"
                    >
                        <div class="flex items-center gap-2">
                            <UInput
                                :model-value="project.achievements[achievementIndex].text"
                                class="flex-1"
                                :placeholder="t('common.achievementPlaceholder')"
                                @update:model-value="(value) => resumeStore.updateProjectAchievement(index, achievementIndex, String(value))"
                                @keydown.enter="resumeStore.addProjectAchievement(index)"
                            />
                            <div class="flex items-center gap-1">
                                <UButton
                                    :disabled="achievementIndex === 0"
                                    size="sm"
                                    color="neutral"
                                    variant="outline"
                                    icon="i-lucide-chevron-up"
                                    @click="resumeStore.moveProjectAchievement(index, achievementIndex, achievementIndex - 1)"
                                />
                                <UButton
                                    :disabled="achievementIndex === (project.achievements.length - 1)"
                                    size="sm"
                                    color="neutral"
                                    variant="outline"
                                    icon="i-lucide-chevron-down"
                                    @click="resumeStore.moveProjectAchievement(index, achievementIndex, achievementIndex + 1)"
                                />
                                <UButton
                                    size="sm"
                                    color="neutral"
                                    variant="outline"
                                    icon="i-lucide-trash-2"
                                    @click="resumeStore.removeProjectAchievement(index, achievementIndex)"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </FormCard>
    </FormContainer>
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
import MonthYearPicker from '~/components/elements/MonthYearPicker.vue';
import FormContainer from '~/components/elements/FormContainer.vue';
import FormCard from '~/components/elements/FormCard.vue';
import ConfirmationModal from '~/components/elements/ConfirmationModal.vue';

const resumeStore = useResumeStore();
const confirmation = useConfirmation();
const templateConfig = useTemplate();
const { t } = useResumeT();

const placementItems = computed(() => [
    { label: t('common.left', 'Left'), value: 'left' },
    { label: t('common.right', 'Right'), value: 'right' },
]);
const { getSectionHeader, setSectionHeader } = useSectionHeader();
const projectsHeader = getSectionHeader('projects');
</script>
