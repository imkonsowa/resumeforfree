<template>
    <div class="flex items-center gap-2">
        <div
            v-if="isEditing"
            class="flex items-center gap-2 flex-1"
        >
            <input
                ref="inputRef"
                v-model="localValue"
                autofocus
                class="flex-1 px-2 py-1 border rounded text-lg font-semibold"
                @keyup.enter="saveHeader"
                @keyup.escape="cancelEdit"
            >
            <button
                class="p-1 text-green-600 hover:text-green-700"
                @click="saveHeader"
            >
                <Check class="w-4 h-4" />
            </button>
            <button
                class="p-1 text-red-600 hover:text-red-700"
                @click="cancelEdit"
            >
                <X class="w-4 h-4" />
            </button>
        </div>
        <div
            v-else
            class="flex items-center gap-2"
        >
            <h3 class="text-lg font-semibold text-gray-900">
                {{ value }}
            </h3>
            <Button
                class="p-1 h-auto opacity-50 hover:opacity-100"
                size="sm"
                variant="ghost"
                @click="startEdit"
            >
                <Edit2 class="w-4 h-4" />
            </Button>
            <Button
                v-if="canReset"
                :title="t('common.resetToDefaults')"
                class="p-1 h-auto opacity-50 hover:opacity-100 text-ink-3 hover:text-ink"
                size="sm"
                variant="ghost"
                @click="handleReset"
            >
                <RotateCcw class="w-4 h-4" />
            </Button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue';
import { Button } from '~/components/ui/button';
import { Check, Edit2, RotateCcw, X } from 'lucide-vue-next';
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
const inputRef = ref<HTMLInputElement>();
const startEdit = async () => {
    localValue.value = props.value;
    isEditing.value = true;
    await nextTick();
    inputRef.value?.focus();
    inputRef.value?.select();
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
