<script lang="ts" setup>
import ResumeLanguageSelector from '~/components/elements/ResumeLanguageSelector.vue';
import SectionOrderList from '~/components/elements/SectionOrderList.vue';
import { getTemplateList } from '#layers/core/app/templates';
import { defaultResumeSettings, getDefaultFontForLanguage } from '#layers/core/app/types/resume';

const { t } = useI18n();
const settingsStore = useSettingsStore();
const resumeStore = useResumeStore();

const templateItems = getTemplateList().map(template => ({
    label: template.name,
    description: template.description,
    value: template.id,
}));

const fontItems = computed(() =>
    settingsStore.availableFontsForCurrentLanguage.map(font => ({
        label: font.name,
        value: font.family,
    })),
);

const selectedTemplate = computed({
    get: () => settingsStore.selectedTemplate,
    set: value => settingsStore.setSelectedTemplate(value),
});
const selectedFont = computed({
    get: () => settingsStore.selectedFont,
    set: value => settingsStore.setSelectedFont(value),
});
const fontSize = computed({
    get: () => settingsStore.fontSize,
    set: value => settingsStore.setFontSize(value),
});
const showSectionHeaderLine = computed({
    get: () => settingsStore.showSectionHeaderLine,
    set: value => settingsStore.setShowSectionHeaderLine(value),
});

const resetToDefaults = () => {
    settingsStore.setSelectedTemplate(defaultResumeSettings.selectedTemplate);
    settingsStore.setSelectedFont(getDefaultFontForLanguage(resumeStore.activeResumeLanguage));
    settingsStore.setFontSize(defaultResumeSettings.fontSize);
    settingsStore.setShowSectionHeaderLine(defaultResumeSettings.showSectionHeaderLine);
};
</script>

<template>
    <div class="space-y-6">
        <UCard>
            <template #header>
                <h2 class="font-semibold text-highlighted">
                    {{ t('settings.groups.resume') }}
                </h2>
            </template>
            <div class="space-y-6">
                <UFormField
                    v-if="resumeStore.activeResume"
                    name="resumeLanguage"
                    :label="t('settings.language.label')"
                    :description="t('settings.language.description')"
                >
                    <ResumeLanguageSelector
                        :model-value="resumeStore.activeResume.language"
                        size="md"
                        button-class="w-full justify-between"
                        @update="(code) => resumeStore.setResumeLanguage(resumeStore.activeResume!.id, code)"
                    />
                </UFormField>
                <UFormField
                    name="template"
                    :label="t('settings.template.label')"
                    :description="t('settings.template.description')"
                >
                    <USelectMenu
                        v-model="selectedTemplate"
                        :items="templateItems"
                        value-key="value"
                        label-key="label"
                        :placeholder="t('settings.template.placeholder')"
                        :search-input="false"
                        class="w-full"
                    />
                </UFormField>
            </div>
        </UCard>

        <UCard>
            <template #header>
                <h2 class="font-semibold text-highlighted">
                    {{ t('settings.groups.typography') }}
                </h2>
            </template>
            <div class="space-y-6">
                <UFormField
                    name="font"
                    :label="t('settings.font.label')"
                    :description="t('settings.font.description')"
                >
                    <USelect
                        v-model="selectedFont"
                        :items="fontItems"
                        value-key="value"
                        :placeholder="t('settings.font.placeholder')"
                        class="w-full"
                    />
                </UFormField>
                <UFormField
                    name="fontSize"
                    :label="t('settings.fontSize.label')"
                    :description="t('settings.fontSize.description', { size: defaultResumeSettings.fontSize })"
                >
                    <div class="flex items-center gap-4">
                        <USlider
                            v-model="fontSize"
                            :min="10"
                            :max="16"
                            :step="1"
                            class="flex-1"
                        />
                        <span class="w-12 text-end font-medium tabular-nums">{{ fontSize }}pt</span>
                    </div>
                </UFormField>
            </div>
        </UCard>

        <UCard>
            <template #header>
                <h2 class="font-semibold text-highlighted">
                    {{ t('settings.groups.sections') }}
                </h2>
            </template>
            <div class="space-y-6">
                <UFormField
                    name="sectionHeaderLine"
                    :label="t('settings.sectionHeaderLine.label')"
                    :description="t('settings.sectionHeaderLine.description')"
                    class="flex items-start justify-between gap-4"
                >
                    <USwitch v-model="showSectionHeaderLine" />
                </UFormField>
                <UFormField
                    name="sectionOrder"
                    :label="t('settings.sectionOrder.label')"
                    :description="t('settings.sectionOrder.description')"
                >
                    <SectionOrderList class="mt-2" />
                </UFormField>
            </div>
        </UCard>

        <div class="flex justify-end">
            <UButton
                color="neutral"
                variant="outline"
                icon="i-lucide-rotate-ccw"
                :label="t('common.resetToDefaults')"
                @click="resetToDefaults"
            />
        </div>
    </div>
</template>
