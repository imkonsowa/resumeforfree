<script lang="ts" setup>
import ResumeLanguageSelector from '~/components/elements/ResumeLanguageSelector.vue';
import SectionOrderList from '~/components/elements/SectionOrderList.vue';
import ColorSetting from '~/components/elements/ColorSetting.vue';
import SettingsGroup from '~/components/elements/SettingsGroup.vue';
import { getTemplateList } from '#layers/core/app/templates';
import { defaultResumeData, defaultResumeSettings, getDefaultFontForLanguage } from '#layers/core/app/types/resume';
import type { ResumeSettings } from '#layers/core/app/types/resume';

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

const resumeSetting = <K extends keyof ResumeSettings>(key: K) => computed({
    get: (): ResumeSettings[K] => resumeStore.activeResumeSettings[key] ?? defaultResumeSettings[key],
    set: (value: ResumeSettings[K]) => settingsStore.updateResumeSettings({ [key]: value }),
});
const headingSizeOffset = resumeSetting('headingSizeOffset');
const titleSizeOffset = resumeSetting('titleSizeOffset');
const spacingSetting = (key: 'sectionSpacing' | 'itemSpacing') => computed({
    get: () => resumeStore.activeResumeSettings[key] ?? defaultResumeSettings[key],
    set: (value: number) => settingsStore.updateResumeSettings({ [key]: Math.round(value * 10) / 10 }),
});
const sectionSpacing = spacingSetting('sectionSpacing');
const itemSpacing = spacingSetting('itemSpacing');
const headingColor = resumeSetting('headingColor');
const accentColor = resumeSetting('accentColor');
const showSectionIcons = resumeSetting('showSectionIcons');

const pickDefaults = <K extends keyof ResumeSettings>(...keys: K[]): Pick<ResumeSettings, K> =>
    Object.fromEntries(keys.map(key => [key, defaultResumeSettings[key]])) as Pick<ResumeSettings, K>;

const resetResume = () => settingsStore.setSelectedTemplate(defaultResumeSettings.selectedTemplate);
const resetTypography = () => {
    settingsStore.setSelectedFont(getDefaultFontForLanguage(resumeStore.activeResumeLanguage));
    settingsStore.updateResumeSettings(pickDefaults('fontSize', 'headingSizeOffset', 'titleSizeOffset'));
};
const resetColors = () => settingsStore.updateResumeSettings(pickDefaults('headingColor', 'accentColor'));
const resetSections = () => {
    settingsStore.updateResumeSettings(pickDefaults('showSectionHeaderLine', 'showSectionIcons', 'sectionSpacing', 'itemSpacing'));
    resumeStore.updateSectionOrder(defaultResumeData.sectionOrder);
};
const resetAll = () => {
    resetResume();
    resetTypography();
    resetColors();
    resetSections();
};
</script>

<template>
    <div class="space-y-6 @container">
        <SettingsGroup
            :title="t('settings.groups.resume')"
            @reset="resetResume"
        >
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
        </SettingsGroup>

        <SettingsGroup
            :title="t('settings.groups.typography')"
            @reset="resetTypography"
        >
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
                        :min="9"
                        :max="16"
                        :step="0.5"
                        class="flex-1"
                    />
                    <span class="w-12 text-end font-medium tabular-nums">{{ fontSize }}pt</span>
                </div>
            </UFormField>
            <UFormField
                name="headingSize"
                :label="t('settings.headingSize.label')"
                :description="t('settings.headingSize.description')"
            >
                <div class="flex items-center gap-4">
                    <USlider
                        v-model="headingSizeOffset"
                        :min="0"
                        :max="8"
                        :step="1"
                        class="flex-1"
                    />
                    <span class="w-12 text-end font-medium tabular-nums">{{ fontSize + headingSizeOffset }}pt</span>
                </div>
            </UFormField>
            <UFormField
                name="titleSize"
                :label="t('settings.titleSize.label')"
                :description="t('settings.titleSize.description')"
            >
                <div class="flex items-center gap-4">
                    <USlider
                        v-model="titleSizeOffset"
                        :min="0"
                        :max="4"
                        :step="1"
                        class="flex-1"
                    />
                    <span class="w-12 text-end font-medium tabular-nums">{{ fontSize + titleSizeOffset }}pt</span>
                </div>
            </UFormField>
        </SettingsGroup>

        <SettingsGroup
            :title="t('settings.groups.colors')"
            @reset="resetColors"
        >
            <UFormField
                name="headingColor"
                :label="t('settings.colors.heading.label')"
                :description="t('settings.colors.heading.description')"
            >
                <ColorSetting
                    v-model="headingColor"
                    class="mt-1"
                />
            </UFormField>
            <UFormField
                name="accentColor"
                :label="t('settings.colors.accent.label')"
                :description="t('settings.colors.accent.description')"
            >
                <ColorSetting
                    v-model="accentColor"
                    class="mt-1"
                />
            </UFormField>
        </SettingsGroup>

        <SettingsGroup
            :title="t('settings.groups.sections')"
            @reset="resetSections"
        >
            <UFormField
                name="sectionHeaderLine"
                :label="t('settings.sectionHeaderLine.label')"
                :description="t('settings.sectionHeaderLine.description')"
                class="flex items-start justify-between gap-4"
            >
                <USwitch v-model="showSectionHeaderLine" />
            </UFormField>
            <UFormField
                name="sectionIcons"
                :label="t('settings.sectionIcons.label')"
                :description="t('settings.sectionIcons.description')"
                class="flex items-start justify-between gap-4"
            >
                <USwitch v-model="showSectionIcons" />
            </UFormField>
            <UFormField
                name="sectionSpacing"
                :label="t('settings.sectionSpacing.label')"
                :description="t('settings.sectionSpacing.description')"
            >
                <div class="flex items-center gap-4">
                    <USlider
                        v-model="sectionSpacing"
                        :min="0.4"
                        :max="2"
                        :step="0.1"
                        class="flex-1"
                    />
                    <span class="w-12 text-end font-medium tabular-nums">{{ sectionSpacing.toFixed(1) }}</span>
                </div>
            </UFormField>
            <UFormField
                name="itemSpacing"
                :label="t('settings.itemSpacing.label')"
                :description="t('settings.itemSpacing.description')"
            >
                <div class="flex items-center gap-4">
                    <USlider
                        v-model="itemSpacing"
                        :min="0.4"
                        :max="2"
                        :step="0.1"
                        class="flex-1"
                    />
                    <span class="w-12 text-end font-medium tabular-nums">{{ itemSpacing.toFixed(1) }}</span>
                </div>
            </UFormField>
            <UFormField
                name="sectionOrder"
                :label="t('settings.sectionOrder.label')"
                :description="t('settings.sectionOrder.description')"
                class="@xl:col-span-2"
            >
                <SectionOrderList class="mt-2" />
            </UFormField>
        </SettingsGroup>

        <div class="flex justify-end">
            <UButton
                color="neutral"
                variant="outline"
                icon="i-lucide-rotate-ccw"
                :label="t('common.resetToDefaults')"
                @click="resetAll"
            />
        </div>
    </div>
</template>
