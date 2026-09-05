<template>
    <Dialog v-model:open="isOpen">
        <DialogContent class="sm:max-w-md">
            <DialogHeader>
                <DialogTitle>{{ t('settings.title') }}</DialogTitle>
                <DialogDescription>
                    {{ t('settings.description') }}
                </DialogDescription>
            </DialogHeader>

            <div class="space-y-6 py-4">
                <div
                    v-if="resumeStore.activeResume"
                    class="space-y-2"
                >
                    <Label>{{ t('settings.language.label') }}</Label>
                    <ResumeLanguageSelector
                        :model-value="resumeStore.activeResume.language"
                        size="default"
                        button-class="w-full justify-between"
                        @update="(code) => resumeStore.setResumeLanguage(resumeStore.activeResume!.id, code)"
                    />
                </div>

                <div class="space-y-2">
                    <Label for="template">{{ t('settings.template.label') }}</Label>
                    <Select
                        v-model="selectedTemplate"
                        @update:model-value="updateTemplate"
                    >
                        <SelectTrigger id="template">
                            <SelectValue :placeholder="t('settings.template.placeholder')">
                                {{ selectedTemplateName }}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem
                                v-for="template in availableTemplates"
                                :key="template.id"
                                :value="template.id"
                            >
                                <div class="flex flex-col space-y-1">
                                    <div class="font-medium">
                                        {{ template.name }}
                                    </div>
                                    <div class="text-xs text-muted-foreground">
                                        {{ template.description }}
                                    </div>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <p class="text-sm text-muted-foreground">
                        {{ t('settings.template.description') }}
                    </p>
                </div>

                <div class="space-y-2">
                    <Label for="font-family">{{ t('settings.font.label') }}</Label>
                    <Select
                        v-model="selectedFont"
                        @update:model-value="updateFont"
                    >
                        <SelectTrigger id="font-family">
                            <SelectValue :placeholder="t('settings.font.placeholder')" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem
                                v-for="font in availableFonts"
                                :key="font.family"
                                :value="font.family"
                            >
                                {{ font.name }}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <p class="text-sm text-muted-foreground">
                        {{ t('settings.font.description') }}
                    </p>
                </div>

                <div class="space-y-2">
                    <Label for="font-size">{{ t('settings.fontSize.label') }}</Label>
                    <div class="flex items-center space-x-4">
                        <Slider
                            id="font-size"
                            v-model="fontSize"
                            :max="16"
                            :min="10"
                            :step="1"
                            class="flex-1"
                            @update:model-value="updateFontSize"
                        />
                        <span class="w-12 text-center font-medium">{{ fontSize[0] }}pt</span>
                    </div>
                    <p class="text-sm text-muted-foreground">
                        {{ t('settings.fontSize.description') }}
                    </p>
                </div>

                <div class="flex items-start justify-between gap-4">
                    <div class="space-y-1">
                        <Label
                            for="section-header-line"
                            class="cursor-pointer"
                        >
                            {{ t('settings.sectionHeaderLine.label') }}
                        </Label>
                        <p class="text-sm text-muted-foreground">
                            {{ t('settings.sectionHeaderLine.description') }}
                        </p>
                    </div>
                    <Switch
                        id="section-header-line"
                        :model-value="showSectionHeaderLine"
                        @update:model-value="updateShowSectionHeaderLine"
                    />
                </div>
            </div>

            <DialogFooter>
                <Button
                    variant="outline"
                    @click="resetToDefaults"
                >
                    {{ t('common.resetToDefaults') }}
                </Button>
                <Button @click="close">
                    {{ t('common.done') }}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { Slider } from '~/components/ui/slider';
import { Switch } from '~/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import ResumeLanguageSelector from '~/components/elements/ResumeLanguageSelector.vue';
import { useSettingsStore } from '~/stores/settings';
import { useResumeStore } from '~/stores/resume';
import { getTemplateList } from '~/templates';

const props = defineProps<{
    modelValue: boolean;
}>();

const emit = defineEmits<{
    'update:modelValue': [value: boolean];
}>();

const availableTemplates = getTemplateList();

const { t } = useI18n();

const settingsStore = useSettingsStore();
const resumeStore = useResumeStore();

const fontSize = ref([settingsStore.fontSize]);
const selectedFont = ref(settingsStore.selectedFont);
const selectedTemplate = ref(settingsStore.selectedTemplate);
const showSectionHeaderLine = computed(() => settingsStore.showSectionHeaderLine);

const isOpen = computed({
    get: () => props.modelValue,
    set: value => emit('update:modelValue', value),
});

const selectedTemplateName = computed(() => {
    const template = availableTemplates.find(t => t.id === selectedTemplate.value);
    return template ? template.name : '';
});

const availableFonts = computed(() => {
    return settingsStore.availableFontsForCurrentLanguage;
});

watch(() => settingsStore.fontSize, (newSize) => {
    fontSize.value = [newSize];
});

watch(() => settingsStore.selectedFont, (newFont) => {
    selectedFont.value = newFont;
});

watch(() => settingsStore.selectedTemplate, (newTemplate) => {
    selectedTemplate.value = newTemplate;
});

const updateFontSize = (value: number[]) => {
    settingsStore.setFontSize(value[0]);
};

const updateFont = (value: string) => {
    settingsStore.setSelectedFont(value);
};

const updateShowSectionHeaderLine = (value: boolean) => {
    settingsStore.setShowSectionHeaderLine(value);
};

const updateTemplate = (value: string) => {
    settingsStore.setSelectedTemplate(value);
};

const resetToDefaults = () => {
    fontSize.value = [14];
    selectedFont.value = 'Calibri';
    selectedTemplate.value = 'compact';
    settingsStore.setFontSize(14);
    settingsStore.setSelectedTemplate('compact');
};

const close = () => {
    isOpen.value = false;
};
</script>
