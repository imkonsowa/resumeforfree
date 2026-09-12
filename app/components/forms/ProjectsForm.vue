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
                <select
                    :value="resumeStore.resumeData.sectionPlacement.projects"
                    class="px-2 py-1 text-sm border rounded focus:ring-[3px] focus:ring-secondary/20 focus:border-secondary"
                    @change="(e) => resumeStore.updateSectionPlacement('projects', (e.target as HTMLSelectElement).value as 'left' | 'right')"
                >
                    <option value="left">
                        {{ t('common.left', 'Left') }}
                    </option>
                    <option value="right">
                        {{ t('common.right', 'Right') }}
                    </option>
                </select>
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
                <div class="space-y-2">
                    <label :for="`project-title-${index}`">{{ t('forms.projects.projectTitle') }}</label>
                    <UInput
                        :id="`project-title-${index}`"
                        :model-value="project.title"
                        :placeholder="t('forms.projects.projectTitle')"
                        @update:model-value="(value) => resumeStore.updateProject(index, 'title', value)"
                    />
                </div>
                <div class="space-y-2">
                    <label :for="`project-description-${index}`">{{ t('common.description') }}</label>
                    <UTextarea
                        :id="`project-description-${index}`"
                        :model-value="project.description"
                        :placeholder="t('common.description')"
                        rows="2"
                        @update:model-value="(value) => resumeStore.updateProject(index, 'description', value)"
                    />
                </div>
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
                        <div class="flex items-center space-x-2 mt-2">
                            <UCheckbox
                                :id="`project-present-${index}`"
                                :model-value="project.isPresent"
                                @update:model-value="(value) => {
                                    resumeStore.updateProject(index, 'isPresent', value);
                                    if (value) resumeStore.updateProject(index, 'endDate', '');
                                }"
                            />
                            <label
                                :for="`project-present-${index}`"
                                class="text-sm"
                            >{{ t('common.present') }}</label>
                        </div>
                    </div>
                </div>
                <div class="space-y-2">
                    <div class="flex items-center justify-between">
                        <label>{{ t('forms.projects.links') }}</label>
                        <UButton
                            type="button" color="neutral" variant="outline"
                            size="sm"
                            @click="resumeStore.addProjectLink(index)" icon="i-lucide-plus">
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
                            type="button" color="neutral" variant="ghost"
                            size="sm"
                            class="text-red-600 hover:text-red-700"
                            @click="resumeStore.removeProjectLink(index, linkIndex)" icon="i-lucide-trash-2">
<span class="sr-only">{{ t('forms.projects.removeLink') }}</span>
</UButton>
                    </div>
                </div>
                <div class="space-y-2">
                    <div class="flex items-center justify-between">
                        <label>{{ t('common.achievements') }}</label>
                        <UButton
                            size="sm" color="neutral" variant="outline"
                            @click="resumeStore.addProjectAchievement(index)" icon="i-lucide-plus">
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
                                    size="sm" color="neutral" variant="outline"
                                    @click="resumeStore.moveProjectAchievement(index, achievementIndex, achievementIndex - 1)" icon="i-lucide-chevron-up" />
                                <UButton
                                    :disabled="achievementIndex === (project.achievements.length - 1)"
                                    size="sm" color="neutral" variant="outline"
                                    @click="resumeStore.moveProjectAchievement(index, achievementIndex, achievementIndex + 1)" icon="i-lucide-chevron-down" />
                                <UButton
                                    size="sm" color="neutral" variant="outline"
                                    @click="resumeStore.removeProjectAchievement(index, achievementIndex)" icon="i-lucide-trash-2" />
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
const { getSectionHeader, setSectionHeader } = useSectionHeader();
const projectsHeader = getSectionHeader('projects');
</script>
