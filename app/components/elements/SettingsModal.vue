<script lang="ts" setup>
import ResumeLanguageSelector from '~/components/elements/ResumeLanguageSelector.vue';
import { useSettingsStore } from '~/stores/settings';
import { useResumeStore } from '~/stores/resume';
import { getTemplateList } from '~/templates';

const props = defineProps<{ modelValue: boolean }>();

const emit = defineEmits<{ 'update:modelValue': [value: boolean] }>();

const availableTemplates = getTemplateList();

const { t } = useI18n();

const settingsStore = useSettingsStore();
const resumeStore = useResumeStore();

const fontSize = ref(settingsStore.fontSize);
const selectedFont = ref(settingsStore.selectedFont);
const selectedTemplate = ref(settingsStore.selectedTemplate);
const showSectionHeaderLine = computed({
    get: () => settingsStore.showSectionHeaderLine,
    set: value => settingsStore.setShowSectionHeaderLine(value),
});

const isOpen = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
});

const templateItems = computed(() =>
    availableTemplates.map(template => ({
        label: template.name,
        description: template.description,
        value: template.id,
    })),
);

const fontItems = computed(() =>
    settingsStore.availableFontsForCurrentLanguage.map(font => ({
        label: font.name,
        value: font.family,
    })),
);

watch(() => settingsStore.fontSize, (value) => {
    fontSize.value = value;
});

watch(() => settingsStore.selectedFont, (value) => {
    selectedFont.value = value;
});

watch(() => settingsStore.selectedTemplate, (value) => {
    selectedTemplate.value = value;
});

const updateFontSize = (value: number) => settingsStore.setFontSize(value);
const updateFont = (value: string) => settingsStore.setSelectedFont(value);
const updateTemplate = (value: string) => settingsStore.setSelectedTemplate(value);

const resetToDefaults = () => {
    fontSize.value = 14;
    selectedFont.value = 'Calibri';
    selectedTemplate.value = 'compact';
    settingsStore.setFontSize(14);
    settingsStore.setSelectedTemplate('compact');
};
</script>

<template>
    <UModal
        v-model:open="isOpen"
        :title="t('settings.title')"
        :description="t('settings.description')"
        :ui="{ footer: 'justify-end' }"
    >
        <template #body>
            <div class="space-y-6">
                <UFormField
                    v-if="resumeStore.activeResume"
                    name="resumeLanguage"
                    :label="t('settings.language.label')"
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
                        @update:model-value="updateTemplate"
                    />
                </UFormField>

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
                        @update:model-value="updateFont"
                    />
                </UFormField>

                <UFormField
                    name="fontSize"
                    :label="t('settings.fontSize.label')"
                    :description="t('settings.fontSize.description')"
                >
                    <div class="flex items-center gap-4">
                        <USlider
                            v-model="fontSize"
                            :max="16"
                            :min="10"
                            :step="1"
                            class="flex-1"
                            @update:model-value="updateFontSize"
                        />
                        <span class="w-12 text-center font-medium">{{ fontSize }}pt</span>
                    </div>
                </UFormField>

                <UFormField
                    name="sectionHeaderLine"
                    :label="t('settings.sectionHeaderLine.label')"
                    :description="t('settings.sectionHeaderLine.description')"
                    class="flex items-start justify-between gap-4"
                >
                    <USwitch v-model="showSectionHeaderLine" />
                </UFormField>
            </div>
        </template>

        <template #footer>
            <UButton
                color="neutral"
                variant="outline"
                :label="t('common.resetToDefaults')"
                @click="resetToDefaults"
            />
            <UButton
                :label="t('common.done')"
                @click="isOpen = false"
            />
        </template>
    </UModal>
</template>
