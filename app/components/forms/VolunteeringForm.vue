<template>
    <FormContainer
        :is-empty="resumeStore.resumeData.volunteering.length === 0"
        :title="volunteeringHeader"
        :add-button-label="t('forms.volunteering.addVolunteering')"
        :empty-message="t('forms.volunteering.emptyMessage')"
        section-key="volunteering"
        @add="resumeStore.addVolunteering"
        @edit-title="(value) => setSectionHeader('volunteering', value)"
    >
        <template #header-actions>
            <div
                v-if="templateConfig.canMoveSection('volunteering')"
                class="flex items-center gap-2"
            >
                <span class="text-sm text-toned">{{ t('forms.volunteering.column') }}:</span>
                <USelect
                    :model-value="resumeStore.resumeData.sectionPlacement.volunteering"
                    :items="placementItems"
                    value-key="value"
                    size="sm"
                    class="w-28"
                    @update:model-value="(value) => resumeStore.updateSectionPlacement('volunteering', value as 'left' | 'right')"
                />
            </div>
        </template>
        <FormCard
            v-for="(volunteering, index) in resumeStore.resumeData.volunteering"
            :key="index"
            :can-move-down="index < resumeStore.resumeData.volunteering.length - 1"
            :can-move-up="index > 0"
            :confirm-message="t('forms.volunteering.deleteConfirm.message')"
            :confirm-title="t('forms.volunteering.deleteConfirm.title')"
            :title="`Volunteering ${index + 1}`"
            @remove="resumeStore.removeVolunteering(index)"
            @move-up="resumeStore.moveVolunteering(index, index - 1)"
            @move-down="resumeStore.moveVolunteering(index, index + 1)"
        >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <UFormField :label="t('common.position')">
                    <UInput
                        :model-value="volunteering.position"
                        :placeholder="t('common.position')"
                        class="w-full"
                        @update:model-value="(value) => resumeStore.updateVolunteering(index, 'position', value)"
                    />
                </UFormField>
                <UFormField :label="t('forms.volunteering.organization')">
                    <UInput
                        :model-value="volunteering.organization"
                        :placeholder="t('forms.volunteering.organization')"
                        class="w-full"
                        @update:model-value="(value) => resumeStore.updateVolunteering(index, 'organization', value)"
                    />
                </UFormField>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <UFormField :label="t('common.location')">
                    <UInput
                        :model-value="volunteering.location"
                        :placeholder="t('common.locationPlaceholder')"
                        class="w-full"
                        @update:model-value="(value) => resumeStore.updateVolunteering(index, 'location', value)"
                    />
                </UFormField>
                <UFormField :label="t('common.organizationUrl')">
                    <UInput
                        :model-value="volunteering.organizationUrl || ''"
                        :placeholder="t('common.organizationUrl')"
                        class="w-full"
                        @update:model-value="(value) => resumeStore.updateVolunteering(index, 'organizationUrl', value)"
                    />
                </UFormField>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="space-y-2">
                    <MonthYearPicker
                        :model-value="volunteering.startDate"
                        :label="t('common.startDate')"
                        @update:model-value="(value) => resumeStore.updateVolunteering(index, 'startDate', value)"
                    />
                </div>
                <div class="space-y-2">
                    <MonthYearPicker
                        :disabled="volunteering.isPresent"
                        :model-value="volunteering.endDate"
                        :label="t('common.endDate')"
                        @update:model-value="(value) => resumeStore.updateVolunteering(index, 'endDate', value)"
                    />
                    <UCheckbox
                        :model-value="volunteering.isPresent"
                        :label="t('common.present')"
                        @update:model-value="(value) => {
                            resumeStore.updateVolunteering(index, 'isPresent', value);
                            if (value) resumeStore.updateVolunteering(index, 'endDate', '');
                        }"
                    />
                </div>
            </div>
            <UFormField :label="t('common.description')">
                <UTextarea
                    :model-value="volunteering.description"
                    :placeholder="t('common.description')"
                    rows="3"
                    class="w-full"
                    @update:model-value="(value) => resumeStore.updateVolunteering(index, 'description', value)"
                />
            </UFormField>
            <div class="space-y-4">
                <div class="flex justify-between items-center">
                    <h4 class="text-sm font-medium text-default">
                        {{ t('common.achievements') }}
                    </h4>
                    <UButton
                        size="sm"
                        color="neutral"
                        variant="outline"
                        icon="i-lucide-plus"
                        @click="resumeStore.addVolunteeringAchievement(index)"
                    >
                        {{ t('common.addAchievement') }}
                    </UButton>
                </div>
                <div class="space-y-2">
                    <div
                        v-for="(_, achievementIndex) in volunteering.achievements"
                        :key="achievementIndex"
                        class="space-y-2"
                    >
                        <div class="flex items-center gap-2 md:gap-2">
                            <UInput
                                :model-value="volunteering.achievements[achievementIndex].text"
                                class="flex-1"
                                :placeholder="t('common.achievementPlaceholder')"
                                @update:model-value="(value) => resumeStore.updateVolunteeringAchievement(index, achievementIndex, value)"
                                @keydown.enter="resumeStore.addVolunteeringAchievement(index)"
                            />
                            <div class="hidden md:flex items-center gap-1">
                                <UButton
                                    :disabled="achievementIndex === 0"
                                    size="sm"
                                    color="neutral"
                                    variant="outline"
                                    icon="i-lucide-chevron-up"
                                    @click="resumeStore.moveVolunteeringAchievement(index, achievementIndex, achievementIndex - 1)"
                                />
                                <UButton
                                    :disabled="achievementIndex === volunteering.achievements.length - 1"
                                    size="sm"
                                    color="neutral"
                                    variant="outline"
                                    icon="i-lucide-chevron-down"
                                    @click="resumeStore.moveVolunteeringAchievement(index, achievementIndex, achievementIndex + 1)"
                                />
                                <UButton
                                    size="sm"
                                    color="neutral"
                                    variant="outline"
                                    icon="i-lucide-trash-2"
                                    @click="resumeStore.removeVolunteeringAchievement(index, achievementIndex)"
                                />
                            </div>
                        </div>
                        <div class="flex md:hidden items-center justify-center gap-2">
                            <UButton
                                :disabled="achievementIndex === 0"
                                size="sm"
                                color="neutral"
                                variant="outline"
                                icon="i-lucide-chevron-up"
                                @click="resumeStore.moveVolunteeringAchievement(index, achievementIndex, achievementIndex - 1)"
                            />
                            <UButton
                                :disabled="achievementIndex === volunteering.achievements.length - 1"
                                size="sm"
                                color="neutral"
                                variant="outline"
                                icon="i-lucide-chevron-down"
                                @click="resumeStore.moveVolunteeringAchievement(index, achievementIndex, achievementIndex + 1)"
                            />
                            <UButton
                                size="sm"
                                color="neutral"
                                variant="outline"
                                icon="i-lucide-trash-2"
                                @click="resumeStore.removeVolunteeringAchievement(index, achievementIndex)"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </FormCard>
    </FormContainer>
</template>

<script lang="ts" setup>
import MonthYearPicker from '~/components/elements/MonthYearPicker.vue';
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
const volunteeringHeader = getSectionHeader('volunteering');
</script>
