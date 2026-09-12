<template>
    <FormContainer
        :is-empty="(resumeStore.resumeData.certificates?.length || 0) === 0"
        :title="certificatesHeader"
        :add-button-label="t('forms.certificates.addCertificate')"
        :empty-message="t('forms.certificates.emptyMessage')"
        section-key="certificates"
        collapsible
        @add="resumeStore.addCertificate"
        @edit-title="(value) => setSectionHeader('certificates', value)"
    >
        <template #header-actions>
            <div
                v-if="templateConfig.canMoveSection('certificates')"
                class="flex items-center gap-2"
            >
                <span class="text-sm text-toned">{{ t('forms.certificates.column') }}:</span>
                <USelect
                    :model-value="resumeStore.resumeData.sectionPlacement.certificates"
                    :items="placementItems"
                    value-key="value"
                    size="sm"
                    class="w-28"
                    @update:model-value="(value) => resumeStore.updateSectionPlacement('certificates', value as 'left' | 'right')"
                />
            </div>
        </template>
        <FormCard
            v-for="(certificate, index) in (resumeStore.resumeData.certificates || [])"
            :key="index"
            :can-move-down="index < (resumeStore.resumeData.certificates?.length || 0) - 1"
            :can-move-up="index > 0"
            :confirm-message="t('forms.certificates.deleteConfirm.message')"
            :confirm-title="t('forms.certificates.deleteConfirm.title')"
            :title="`Certificate ${index + 1}`"
            @remove="resumeStore.removeCertificate(index)"
            @move-up="resumeStore.moveCertificate(index, index - 1)"
            @move-down="resumeStore.moveCertificate(index, index + 1)"
        >
            <div class="space-y-4">
                <UFormField :label="t('forms.certificates.certificateTitle')">
                    <UInput
                        :model-value="certificate.title"
                        :placeholder="t('forms.certificates.certificateTitle')"
                        class="w-full"
                        @update:model-value="(value) => resumeStore.updateCertificate(index, 'title', value)"
                    />
                </UFormField>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <UFormField :label="t('forms.certificates.issuer')">
                        <UInput
                            :model-value="certificate.issuer"
                            :placeholder="t('forms.certificates.issuer')"
                            class="w-full"
                            @update:model-value="(value) => resumeStore.updateCertificate(index, 'issuer', value)"
                        />
                    </UFormField>
                    <div class="space-y-2">
                        <MonthYearPicker
                            :model-value="certificate.date"
                            :label="t('forms.certificates.date')"
                            @update:model-value="(value) => resumeStore.updateCertificate(index, 'date', value)"
                        />
                    </div>
                </div>
                <UFormField :label="t('forms.certificates.url')">
                    <UInput
                        :model-value="certificate.url || ''"
                        :placeholder="t('forms.certificates.url')"
                        type="url"
                        class="w-full"
                        @update:model-value="(value) => resumeStore.updateCertificate(index, 'url', value)"
                    />
                </UFormField>
                <UFormField :label="t('common.description')">
                    <UTextarea
                        :model-value="certificate.description || ''"
                        :placeholder="t('common.description')"
                        rows="3"
                        class="w-full"
                        @update:model-value="(value) => resumeStore.updateCertificate(index, 'description', value)"
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
    { label: t('common.left', 'Left'), value: 'left' },
    { label: t('common.right', 'Right'), value: 'right' },
]);
const { getSectionHeader, setSectionHeader } = useSectionHeader();
const certificatesHeader = getSectionHeader('certificates');
</script>
