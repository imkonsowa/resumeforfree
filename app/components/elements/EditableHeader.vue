<template>
    <div class="flex items-center gap-2">
        <div
            v-if="isEditing"
            class="flex items-center gap-2 flex-1"
        >
            <UInput
                ref="inputRef"
                v-model="localValue"
                autofocus
                size="lg"
                class="flex-1"
                @keyup.enter="saveHeader"
                @keyup.escape="cancelEdit"
            />
            <UButton
                size="sm"
                color="secondary"
                variant="ghost"
                icon="i-lucide-check"
                :aria-label="t('common.save')"
                @click="saveHeader"
            />
            <UButton
                size="sm"
                color="error"
                variant="ghost"
                icon="i-lucide-x"
                :aria-label="t('common.cancel')"
                @click="cancelEdit"
            />
        </div>
        <div
            v-else
            class="flex items-center gap-2"
        >
            <h3 class="text-lg font-semibold text-highlighted">
                {{ value }}
            </h3>
            <UButton
                class="p-1 h-auto opacity-50 hover:opacity-100"
                size="sm"
                color="neutral"
                variant="ghost"
                icon="i-lucide-square-pen"
                @click="startEdit"
            />
            <UButton
                v-if="canReset"
                :title="t('common.resetToDefaults')"
                class="p-1 h-auto opacity-50 hover:opacity-100 text-toned hover:text-highlighted"
                size="sm"
                color="neutral"
                variant="ghost"
                icon="i-lucide-rotate-ccw"
                @click="handleReset"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue';
import type { SectionHeaders } from '~/types/resume';
import { SECTION_TRANSLATION_MAP } from '~/composables/useSectionHeader';

interface Props {
    value: string;
    sectionKey?: keyof SectionHeaders;
}
type Emits = (e: 'update', value: string) => void;
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const { t } = useI18n();
const resumeStore = useResumeStore();
const canReset = computed(() => {
    if (!props.sectionKey) return false;
    const override = resumeStore.resumeData.sectionHeaders?.[props.sectionKey];
    if (!override || !String(override).trim()) return false;
    const translationKey = SECTION_TRANSLATION_MAP[props.sectionKey];
    const defaultLabel = translationKey ? t(translationKey) : '';
    return override !== defaultLabel;
});
const handleReset = () => {
    if (props.sectionKey) {
        resumeStore.updateSectionHeader(props.sectionKey, '');
    }
};
const isEditing = ref(false);
const localValue = ref(props.value);
const inputRef = ref<{ inputRef?: HTMLInputElement } | null>(null);
const startEdit = async () => {
    localValue.value = props.value;
    isEditing.value = true;
    await nextTick();
    const el = inputRef.value?.inputRef;
    el?.focus();
    el?.select();
};
const saveHeader = () => {
    if (localValue.value.trim() && localValue.value !== props.value) {
        emit('update', localValue.value.trim());
    }
    isEditing.value = false;
};
const cancelEdit = () => {
    localValue.value = props.value;
    isEditing.value = false;
};
</script>
