<template>
    <FormContainer
        :is-empty="resumeStore.resumeData.skills.length === 0"
        :title="skillsHeader"
        :add-button-label="t('forms.skills.addSkill')"
        :empty-message="t('forms.skills.emptyMessage')"
        section-key="skills"
        @add="resumeStore.addSkill"
        @edit-title="(value) => setSectionHeader('skills', value)"
    >
        <template #header-actions>
            <div
                v-if="templateConfig.canMoveSection('skills')"
                class="flex items-center gap-2"
            >
                <span class="text-sm text-toned">{{ t('forms.skills.column') }}:</span>
                <USelect
                    :model-value="resumeStore.resumeData.sectionPlacement.skills"
                    :items="placementItems"
                    value-key="value"
                    size="sm"
                    class="w-28"
                    @update:model-value="(value) => resumeStore.updateSectionPlacement('skills', value as 'left' | 'right')"
                />
            </div>
        </template>
        <FormCard
            v-for="(skill, index) in resumeStore.resumeData.skills"
            :key="index"
            :can-move-down="index < resumeStore.resumeData.skills.length - 1"
            :can-move-up="index > 0"
            :confirm-message="t('forms.skills.deleteConfirm.message')"
            :confirm-title="t('forms.skills.deleteConfirm.title')"
            :title="`Skill ${index + 1}`"
            @remove="resumeStore.removeSkill(index)"
            @move-up="resumeStore.moveSkill(index, index - 1)"
            @move-down="resumeStore.moveSkill(index, index + 1)"
        >
            <div class="space-y-4">
                <UFormField :label="t('forms.skills.skillTitle')">
                    <UInput
                        :model-value="skill.title"
                        :placeholder="t('forms.skills.skillTitle')"
                        class="w-full"
                        @update:model-value="(value) => resumeStore.updateSkill(index, 'title', value)"
                    />
                </UFormField>
                <UFormField :label="t('common.description')">
                    <UTextarea
                        :model-value="skill.description"
                        :placeholder="t('common.description')"
                        rows="3"
                        class="w-full"
                        @update:model-value="(value) => resumeStore.updateSkill(index, 'description', value)"
                    />
                </UFormField>
            </div>
        </FormCard>
    </FormContainer>
</template>

<script lang="ts" setup>
import FormCard from '~/components/elements/FormCard.vue';
import FormContainer from '~/components/elements/FormContainer.vue';

const resumeStore = useResumeStore();
const templateConfig = useTemplate();
const { t } = useResumeT();

const placementItems = computed(() => [
    { label: t('common.left', 'Left'), value: 'left' },
    { label: t('common.right', 'Right'), value: 'right' },
]);
const { getSectionHeader, setSectionHeader } = useSectionHeader();
const skillsHeader = getSectionHeader('skills');
</script>
