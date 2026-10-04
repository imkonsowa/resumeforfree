<template>
    <FormContainer
        :is-empty="(resumeStore.resumeData.publications?.length || 0) === 0"
        :title="publicationsHeader"
        :add-button-label="t('forms.publications.addPublication')"
        :empty-message="t('forms.publications.emptyMessage')"
        section-key="publications"
        collapsible
        @add="resumeStore.addPublication"
        @edit-title="(value) => setSectionHeader('publications', value)"
    >
        <template #header-actions>
            <div
                v-if="templateConfig.canMoveSection('publications')"
                class="flex items-center gap-2"
            >
                <span class="text-sm text-toned">{{ t('forms.publications.column') }}:</span>
                <USelect
                    :model-value="resumeStore.resumeData.sectionPlacement.publications ?? 'left'"
                    :items="placementItems"
                    value-key="value"
                    size="sm"
                    class="w-28"
                    @update:model-value="(value) => resumeStore.updateSectionPlacement('publications', value as 'left' | 'right')"
                />
            </div>
        </template>
        <FormCard
            v-for="(publication, index) in (resumeStore.resumeData.publications || [])"
            :key="index"
            :can-move-down="index < (resumeStore.resumeData.publications?.length || 0) - 1"
            :can-move-up="index > 0"
            :confirm-message="t('forms.publications.deleteConfirm.message')"
            :confirm-title="t('forms.publications.deleteConfirm.title')"
            :title="publication.title || `${t('forms.publications.publicationTitle')} ${index + 1}`"
            @remove="resumeStore.removePublication(index)"
            @move-up="resumeStore.movePublication(index, index - 1)"
            @move-down="resumeStore.movePublication(index, index + 1)"
        >
            <div class="space-y-4">
                <UFormField :label="t('forms.publications.publicationTitle')">
                    <UInput
                        :model-value="publication.title"
                        :placeholder="t('forms.publications.publicationTitle')"
                        class="w-full"
                        @update:model-value="(value) => resumeStore.updatePublication(index, 'title', value)"
                    />
                </UFormField>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <UFormField :label="t('forms.publications.authors')">
                        <UInput
                            :model-value="publication.authors"
                            :placeholder="t('forms.publications.authors')"
                            class="w-full"
                            @update:model-value="(value) => resumeStore.updatePublication(index, 'authors', value)"
                        />
                    </UFormField>
                    <UFormField :label="t('forms.publications.venue')">
                        <UInput
                            :model-value="publication.venue"
                            :placeholder="t('forms.publications.venue')"
                            class="w-full"
                            @update:model-value="(value) => resumeStore.updatePublication(index, 'venue', value)"
                        />
                    </UFormField>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <MonthYearPicker
                            :model-value="publication.date"
                            :label="t('forms.publications.date')"
                            @update:model-value="(value) => resumeStore.updatePublication(index, 'date', value)"
                        />
                    </div>
                    <UFormField :label="t('forms.publications.url')">
                        <UInput
                            :model-value="publication.url || ''"
                            :placeholder="t('forms.publications.url')"
                            type="url"
                            class="w-full"
                            @update:model-value="(value) => resumeStore.updatePublication(index, 'url', value)"
                        />
                    </UFormField>
                </div>
                <UFormField :label="t('common.description')">
                    <UTextarea
                        :model-value="publication.description || ''"
                        :placeholder="t('common.description')"
                        :rows="3"
                        class="w-full"
                        @update:model-value="(value) => resumeStore.updatePublication(index, 'description', value)"
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
import MonthYearPicker from '~/components/elements/MonthYearPicker.vue';
import FormContainer from '~/components/elements/FormContainer.vue';
import FormCard from '~/components/elements/FormCard.vue';
import ConfirmationModal from '~/components/elements/ConfirmationModal.vue';

const resumeStore = useResumeStore();
const confirmation = useConfirmation();
const templateConfig = useTemplate();
const { t } = useResumeT();

const placementItems = computed(() => [
    { label: t('common.left'), value: 'left' },
    { label: t('common.right'), value: 'right' },
]);
const { getSectionHeader, setSectionHeader } = useSectionHeader();
const publicationsHeader = getSectionHeader('publications');
</script>
