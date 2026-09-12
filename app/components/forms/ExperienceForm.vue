<template>
    <FormContainer
        :is-empty="resumeStore.resumeData.experiences.length === 0"
        :title="experienceHeader"
        :add-button-label="t('forms.experience.addExperience')"
        :empty-message="t('forms.experience.emptyMessage')"
        section-key="experience"
        @add="resumeStore.addExperience"
        @edit-title="(value) => setSectionHeader('experience', value)"
    >
        <FormCard
            v-for="(experience, index) in resumeStore.resumeData.experiences"
            :key="index"
            :can-move-down="index < resumeStore.resumeData.experiences.length - 1"
            :can-move-up="index > 0"
            :confirm-message="t('forms.experience.deleteConfirm.message')"
            :confirm-title="t('forms.experience.deleteConfirm.title')"
            :title="`Experience ${index + 1}`"
            @remove="resumeStore.removeExperience(index)"
            @move-up="resumeStore.moveExperience(index, index - 1)"
            @move-down="resumeStore.moveExperience(index, index + 1)"
        >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <UFormField :label="t('common.position')">
                    <UInput
                        :model-value="experience.position"
                        :placeholder="t('common.position')"
                        class="w-full"
                        @update:model-value="(value) => resumeStore.updateExperience(index, 'position', value)"
                    />
                </UFormField>
                <UFormField :label="t('common.company')">
                    <UInput
                        :model-value="experience.company"
                        :placeholder="t('common.company')"
                        class="w-full"
                        @update:model-value="(value) => resumeStore.updateExperience(index, 'company', value)"
                    />
                </UFormField>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <UFormField :label="t('common.location')">
                    <UInput
                        :model-value="experience.location"
                        :placeholder="t('common.locationPlaceholder')"
                        class="w-full"
                        @update:model-value="(value) => resumeStore.updateExperience(index, 'location', value)"
                    />
                </UFormField>
                <UFormField :label="t('common.companyUrl')">
                    <UInput
                        :model-value="experience.companyUrl || ''"
                        :placeholder="t('common.companyUrl')"
                        class="w-full"
                        @update:model-value="(value) => resumeStore.updateExperience(index, 'companyUrl', value)"
                    />
                </UFormField>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="space-y-2">
                    <MonthYearPicker
                        :model-value="experience.startDate"
                        :label="t('common.startDate')"
                        @update:model-value="(value) => resumeStore.updateExperience(index, 'startDate', value)"
                    />
                </div>
                <div class="space-y-2">
                    <MonthYearPicker
                        :disabled="experience.isPresent"
                        :model-value="experience.endDate"
                        :label="t('common.endDate')"
                        @update:model-value="(value) => resumeStore.updateExperience(index, 'endDate', value)"
                    />
                    <UCheckbox
                        :model-value="experience.isPresent"
                        :label="t('common.present')"
                        @update:model-value="(value) => {
                            resumeStore.updateExperience(index, 'isPresent', value);
                            if (value) resumeStore.updateExperience(index, 'endDate', '');
                        }"
                    />
                </div>
            </div>
            <UFormField :label="t('common.description')">
                <UTextarea
                    :model-value="experience.description"
                    :placeholder="t('common.description')"
                    rows="3"
                    class="w-full"
                    @update:model-value="(value) => resumeStore.updateExperience(index, 'description', value)"
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
                        @click="resumeStore.addExperienceAchievement(index)"
                    >
                        {{ t('common.addAchievement') }}
                    </UButton>
                </div>
                <div class="space-y-2">
                    <div
                        v-for="(_, achievementIndex) in experience.achievements"
                        :key="achievementIndex"
                        class="space-y-2"
                    >
                        <div class="flex items-center gap-2 md:gap-2">
                            <UInput
                                :model-value="experience.achievements[achievementIndex].text"
                                class="flex-1"
                                :placeholder="t('common.achievementPlaceholder')"
                                @update:model-value="(value) => resumeStore.updateExperienceAchievement(index, achievementIndex, value)"
                                @keydown.enter="resumeStore.addExperienceAchievement(index)"
                            />
                            <div class="hidden md:flex items-center gap-1">
                                <UButton
                                    :disabled="achievementIndex === 0"
                                    size="sm"
                                    color="neutral"
                                    variant="outline"
                                    icon="i-lucide-chevron-up"
                                    @click="resumeStore.moveExperienceAchievement(index, achievementIndex, achievementIndex - 1)"
                                />
                                <UButton
                                    :disabled="achievementIndex === experience.achievements.length - 1"
                                    size="sm"
                                    color="neutral"
                                    variant="outline"
                                    icon="i-lucide-chevron-down"
                                    @click="resumeStore.moveExperienceAchievement(index, achievementIndex, achievementIndex + 1)"
                                />
                                <UButton
                                    size="sm"
                                    color="neutral"
                                    variant="outline"
                                    icon="i-lucide-trash-2"
                                    @click="resumeStore.removeExperienceAchievement(index, achievementIndex)"
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
                                @click="resumeStore.moveExperienceAchievement(index, achievementIndex, achievementIndex - 1)"
                            />
                            <UButton
                                :disabled="achievementIndex === experience.achievements.length - 1"
                                size="sm"
                                color="neutral"
                                variant="outline"
                                icon="i-lucide-chevron-down"
                                @click="resumeStore.moveExperienceAchievement(index, achievementIndex, achievementIndex + 1)"
                            />
                            <UButton
                                size="sm"
                                color="neutral"
                                variant="outline"
                                icon="i-lucide-trash-2"
                                @click="resumeStore.removeExperienceAchievement(index, achievementIndex)"
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
const { t } = useResumeT();
const { getSectionHeader, setSectionHeader } = useSectionHeader();
const experienceHeader = getSectionHeader('experience');
</script>
