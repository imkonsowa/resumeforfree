<template>
    <FormContainer
        :is-empty="resumeStore.resumeData.internships.length === 0"
        :title="internshipsHeader"
        :add-button-label="t('forms.internships.addInternship')"
        :empty-message="t('forms.internships.emptyMessage')"
        section-key="internships"
        @add="resumeStore.addInternship"
        @edit-title="(value) => setSectionHeader('internships', value)"
    >
        <FormCard
            v-for="(internship, index) in resumeStore.resumeData.internships"
            :key="index"
            :can-move-down="index < resumeStore.resumeData.internships.length - 1"
            :can-move-up="index > 0"
            :confirm-message="t('forms.internships.deleteConfirm.message')"
            :confirm-title="t('forms.internships.deleteConfirm.title')"
            :title="`Internship ${index + 1}`"
            @remove="resumeStore.removeInternship(index)"
            @move-up="resumeStore.moveInternship(index, index - 1)"
            @move-down="resumeStore.moveInternship(index, index + 1)"
        >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="space-y-2">
                    <label>{{ t('common.position') }}</label>
                    <UInput
                        :model-value="internship.position"
                        :placeholder="t('common.position')"
                        @update:model-value="(value) => resumeStore.updateInternship(index, 'position', value)"
                    />
                </div>
                <div class="space-y-2">
                    <label>{{ t('common.company') }}</label>
                    <UInput
                        :model-value="internship.company"
                        :placeholder="t('common.company')"
                        @update:model-value="(value) => resumeStore.updateInternship(index, 'company', value)"
                    />
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="space-y-2">
                    <label>{{ t('common.location') }}</label>
                    <UInput
                        :model-value="internship.location"
                        :placeholder="t('common.locationPlaceholder')"
                        @update:model-value="(value) => resumeStore.updateInternship(index, 'location', value)"
                    />
                </div>
                <div class="space-y-2">
                    <label>{{ t('common.companyUrl') }}</label>
                    <UInput
                        :model-value="internship.companyUrl || ''"
                        :placeholder="t('common.companyUrl')"
                        @update:model-value="(value) => resumeStore.updateInternship(index, 'companyUrl', value)"
                    />
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div class="space-y-2">
                    <MonthYearPicker
                        :model-value="internship.startDate"
                        :label="t('common.startDate')"
                        @update:model-value="(value) => resumeStore.updateInternship(index, 'startDate', value)"
                    />
                </div>
                <div class="space-y-2">
                    <MonthYearPicker
                        :disabled="internship.isPresent"
                        :model-value="internship.endDate"
                        :label="t('common.endDate')"
                        @update:model-value="(value) => resumeStore.updateInternship(index, 'endDate', value)"
                    />
                    <div class="flex items-center space-x-2 mt-2">
                        <UCheckbox
                            :id="`present-${index}`"
                            :model-value="internship.isPresent"
                            @update:model-value="(value) => {
                                resumeStore.updateInternship(index, 'isPresent', value);
                                if (value) resumeStore.updateInternship(index, 'endDate', '');
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
                    :model-value="internship.description"
                    :placeholder="t('common.description')"
                    rows="3"
                    @update:model-value="(value) => resumeStore.updateInternship(index, 'description', value)"
                />
            </div>
            <div class="space-y-4">
                <div class="flex justify-between items-center">
                    <label>{{ t('common.achievements') }}</label>
                    <UButton
                        size="sm" color="neutral" variant="outline"
                        @click="resumeStore.addInternshipAchievement(index)" icon="i-lucide-plus">
{{ t('common.addAchievement') }}
</UButton>
                </div>
                <div class="space-y-2">
                    <div
                        v-for="(_, achievementIndex) in internship.achievements"
                        :key="achievementIndex"
                        class="space-y-2"
                    >
                        <div class="flex items-center space-x-2 md:space-x-2">
                            <UInput
                                :model-value="internship.achievements[achievementIndex].text"
                                class="flex-1"
                                :placeholder="t('common.achievementPlaceholder')"
                                @update:model-value="(value) => resumeStore.updateInternshipAchievement(index, achievementIndex, value)"
                                @keydown.enter="resumeStore.addInternshipAchievement(index)"
                            />
                            <div class="hidden md:flex items-center space-x-1">
                                <UButton
                                    :disabled="achievementIndex === 0"
                                    size="sm" color="neutral" variant="outline"
                                    @click="resumeStore.moveInternshipAchievement(index, achievementIndex, achievementIndex - 1)" icon="i-lucide-chevron-up" />
                                <UButton
                                    :disabled="achievementIndex === internship.achievements.length - 1"
                                    size="sm" color="neutral" variant="outline"
                                    @click="resumeStore.moveInternshipAchievement(index, achievementIndex, achievementIndex + 1)" icon="i-lucide-chevron-down" />
                                <UButton
                                    size="sm" color="neutral" variant="outline"
                                    @click="resumeStore.removeInternshipAchievement(index, achievementIndex)" icon="i-lucide-trash-2" />
                            </div>
                        </div>
                        <div class="flex md:hidden items-center justify-center space-x-2">
                            <UButton
                                :disabled="achievementIndex === 0"
                                size="sm" color="neutral" variant="outline"
                                @click="resumeStore.moveInternshipAchievement(index, achievementIndex, achievementIndex - 1)" icon="i-lucide-chevron-up" />
                            <UButton
                                :disabled="achievementIndex === internship.achievements.length - 1"
                                size="sm" color="neutral" variant="outline"
                                @click="resumeStore.moveInternshipAchievement(index, achievementIndex, achievementIndex + 1)" icon="i-lucide-chevron-down" />
                            <UButton
                                size="sm" color="neutral" variant="outline"
                                @click="resumeStore.removeInternshipAchievement(index, achievementIndex)" icon="i-lucide-trash-2" />
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
const internshipsHeader = getSectionHeader('internships');
</script>
