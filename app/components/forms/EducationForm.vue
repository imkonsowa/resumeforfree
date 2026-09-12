<template>
    <FormContainer
        :is-empty="resumeStore.resumeData.education.length === 0"
        :title="educationHeader"
        :add-button-label="t('forms.education.addEducation')"
        :empty-message="t('forms.education.emptyMessage')"
        section-key="education"
        @add="resumeStore.addEducation"
        @edit-title="(value) => setSectionHeader('education', value)"
    >
        <FormCard
            v-for="(education, index) in resumeStore.resumeData.education"
            :key="index"
            :can-move-down="index < resumeStore.resumeData.education.length - 1"
            :can-move-up="index > 0"
            :confirm-message="t('forms.education.deleteConfirm.message')"
            :confirm-title="t('forms.education.deleteConfirm.title')"
            :title="`Education ${index + 1}`"
            @remove="resumeStore.removeEducation(index)"
            @move-up="resumeStore.moveEducation(index, index - 1)"
            @move-down="resumeStore.moveEducation(index, index + 1)"
        >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="space-y-2">
                    <label>{{ t('forms.education.institution') }}</label>
                    <UInput
                        :model-value="education.institution"
                        :placeholder="t('forms.education.institution')"
                        @update:model-value="(value) => resumeStore.updateEducation(index, 'institution', value)"
                    />
                </div>
                <div class="space-y-2">
                    <label>{{ t('forms.education.degree') }}</label>
                    <UInput
                        :model-value="education.degree"
                        :placeholder="t('forms.education.degree')"
                        @update:model-value="(value) => resumeStore.updateEducation(index, 'degree', value)"
                    />
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="space-y-2">
                    <label>{{ t('common.location') }}</label>
                    <UInput
                        :model-value="education.location"
                        :placeholder="t('common.locationPlaceholder')"
                        @update:model-value="(value) => resumeStore.updateEducation(index, 'location', value)"
                    />
                </div>
                <div class="space-y-2">
                    <label>{{ t('forms.education.graduationScore') }}</label>
                    <UInput
                        :model-value="education.graduationScore"
                        :placeholder="t('forms.education.graduationScore')"
                        @update:model-value="(value) => resumeStore.updateEducation(index, 'graduationScore', value)"
                    />
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="space-y-2">
                    <MonthYearPicker
                        :model-value="education.startDate"
                        :label="t('common.startDate')"
                        @update:model-value="(value) => resumeStore.updateEducation(index, 'startDate', value)"
                    />
                </div>
                <div class="space-y-2">
                    <MonthYearPicker
                        :disabled="education.isPresent"
                        :model-value="education.endDate"
                        :label="t('common.endDate')"
                        @update:model-value="(value) => resumeStore.updateEducation(index, 'endDate', value)"
                    />
                    <div class="flex items-center space-x-2 mt-2">
                        <UCheckbox
                            :id="`present-${index}`"
                            :model-value="education.isPresent"
                            @update:model-value="(value) => {
                                resumeStore.updateEducation(index, 'isPresent', value);
                                if (value) resumeStore.updateEducation(index, 'endDate', '');
                            }"
                        />
                        <label
                            :for="`present-${index}`"
                            class="text-sm"
                        >{{ t('common.present') }}</label>
                    </div>
                </div>
            </div>
            <div class="space-y-2 mb-4">
                <label>{{ t('common.description') }}</label>
                <UTextarea
                    :model-value="education.description"
                    :placeholder="t('common.description')"
                    rows="3"
                    @update:model-value="(value) => resumeStore.updateEducation(index, 'description', value)"
                />
            </div>
            <div class="space-y-4">
                <div class="flex justify-between items-center">
                    <label>{{ t('common.achievements') }}</label>
                    <UButton
                        size="sm" color="neutral" variant="outline"
                        @click="resumeStore.addEducationAchievement(index)" icon="i-lucide-plus">
{{ t('common.addAchievement') }}
</UButton>
                </div>
                <div class="space-y-2">
                    <div
                        v-for="(_, achievementIndex) in (education.achievements || [])"
                        :key="achievementIndex"
                        class="space-y-2"
                    >
                        <div class="flex items-center space-x-2 md:space-x-2">
                            <UInput
                                :model-value="(education.achievements || [])[achievementIndex].text"
                                class="flex-1"
                                :placeholder="t('common.achievementPlaceholder')"
                                @update:model-value="(value) => resumeStore.updateEducationAchievement(index, achievementIndex, value)"
                                @keydown.enter="resumeStore.addEducationAchievement(index)"
                            />
                            <div class="hidden md:flex items-center space-x-1">
                                <UButton
                                    :disabled="achievementIndex === 0"
                                    size="sm" color="neutral" variant="outline"
                                    @click="resumeStore.moveEducationAchievement(index, achievementIndex, achievementIndex - 1)" icon="i-lucide-chevron-up" />
                                <UButton
                                    :disabled="achievementIndex === (education.achievements || []).length - 1"
                                    size="sm" color="neutral" variant="outline"
                                    @click="resumeStore.moveEducationAchievement(index, achievementIndex, achievementIndex + 1)" icon="i-lucide-chevron-down" />
                                <UButton
                                    size="sm" color="neutral" variant="outline"
                                    @click="resumeStore.removeEducationAchievement(index, achievementIndex)" icon="i-lucide-trash-2" />
                            </div>
                        </div>
                        <div class="flex md:hidden items-center justify-center space-x-2">
                            <UButton
                                :disabled="achievementIndex === 0"
                                size="sm" color="neutral" variant="outline"
                                @click="resumeStore.moveEducationAchievement(index, achievementIndex, achievementIndex - 1)" icon="i-lucide-chevron-up" />
                            <UButton
                                :disabled="achievementIndex === (education.achievements || []).length - 1"
                                size="sm" color="neutral" variant="outline"
                                @click="resumeStore.moveEducationAchievement(index, achievementIndex, achievementIndex + 1)" icon="i-lucide-chevron-down" />
                            <UButton
                                size="sm" color="neutral" variant="outline"
                                @click="resumeStore.removeEducationAchievement(index, achievementIndex)" icon="i-lucide-trash-2" />
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
const educationHeader = getSectionHeader('education');
</script>
