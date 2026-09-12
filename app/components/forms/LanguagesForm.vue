<template>
    <FormContainer
        :is-empty="resumeStore.resumeData.languages.length === 0"
        :title="sectionHeaderTitle"
        :add-button-label="t('forms.languages.addLanguage')"
        :empty-message="t('forms.languages.emptyMessage')"
        section-key="languages"
        @add="resumeStore.addLanguage"
        @edit-title="(value) => setSectionHeader('languages', value)"
    >
        <template #header-actions>
            <div
                v-if="templateConfig.canMoveSection('languages')"
                class="flex items-center gap-2"
            >
                <span class="text-sm text-toned">{{ t('forms.languages.column') }}:</span>
                <USelect
                    :model-value="resumeStore.resumeData.sectionPlacement.languages"
                    :items="placementItems"
                    value-key="value"
                    size="sm"
                    class="w-28"
                    @update:model-value="(value) => resumeStore.updateSectionPlacement('languages', value as 'left' | 'right')"
                />
            </div>
        </template>
        <FormCard
            v-for="(language, index) in resumeStore.resumeData.languages"
            :key="index"
            :can-move-down="index < resumeStore.resumeData.languages.length - 1"
            :can-move-up="index > 0"
            :confirm-message="t('forms.languages.deleteConfirm.message')"
            :confirm-title="t('forms.languages.deleteConfirm.title')"
            :title="`Language ${index + 1}`"
            @remove="resumeStore.removeLanguage(index)"
            @move-up="resumeStore.moveLanguage(index, index - 1)"
            @move-down="resumeStore.moveLanguage(index, index + 1)"
        >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <UFormField :label="t('forms.languages.languageName')">
                    <UInput
                        :model-value="language.name"
                        :placeholder="t('forms.languages.languageName')"
                        class="w-full"
                        @update:model-value="(value) => resumeStore.updateLanguage(index, 'name', value)"
                    />
                </UFormField>
                <UFormField :label="t('forms.languages.proficiency')">
                    <USelect
                        :model-value="language.proficiency"
                        :items="proficiencyItems"
                        value-key="value"
                        class="w-full"
                        :placeholder="t('forms.languages.proficiency')"
                        @update:model-value="(value) => resumeStore.updateLanguage(index, 'proficiency', value)"
                    />
                </UFormField>
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
import FormContainer from '~/components/elements/FormContainer.vue';
import FormCard from '~/components/elements/FormCard.vue';
import ConfirmationModal from '~/components/elements/ConfirmationModal.vue';

const resumeStore = useResumeStore();
const confirmation = useConfirmation();
const templateConfig = useTemplate();
const { t } = useResumeT();

const proficiencyItems = computed(() => [
    { label: t('proficiency.native', 'Native'), value: 'Native' },
    { label: t('proficiency.fluent', 'Fluent'), value: 'Fluent' },
    { label: t('proficiency.proficient', 'Proficient'), value: 'Proficient' },
    { label: t('proficiency.conversational', 'Conversational'), value: 'Conversational' },
    { label: t('proficiency.basic', 'Basic'), value: 'Basic' },
    { label: t('proficiency.beginner', 'Beginner'), value: 'Beginner' },
]);

const placementItems = computed(() => [
    { label: t('common.left', 'Left'), value: 'left' },
    { label: t('common.right', 'Right'), value: 'right' },
]);
const { getSectionHeader, setSectionHeader } = useSectionHeader();
const sectionHeaderTitle = getSectionHeader('languages');
</script>
