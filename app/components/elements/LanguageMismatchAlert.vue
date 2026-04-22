<script setup lang="ts">
import { X } from 'lucide-vue-next';

const { t, locale: uiLocale, locales } = useI18n();
const resumeStore = useResumeStore();
const { hasSeenModal, markModalSeen } = useModalSeen('resumeLangMismatch');

const dismissed = ref(false);
onMounted(() => {
    dismissed.value = hasSeenModal();
});

const uiDir = computed(() => locales.value.find(l => l.code === uiLocale.value)?.dir || 'ltr');

const resumeLanguageName = computed(() => {
    const code = resumeStore.activeResumeLanguage;
    return locales.value.find(l => l.code === code)?.name || code;
});

const show = computed(() =>
    !dismissed.value && resumeStore.activeResumeLanguage && resumeStore.activeResumeLanguage !== uiLocale.value,
);

const dismiss = () => {
    markModalSeen();
    dismissed.value = true;
};
</script>

<template>
    <div
        v-if="show"
        :dir="uiDir"
        class="mb-4 flex items-center justify-between gap-3 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-ink"
    >
        <span>{{ t('builder.languageMismatch', { language: resumeLanguageName }) }}</span>
        <button
            class="rounded p-1 text-green-700 hover:bg-green-100"
            :aria-label="t('common.close')"
            @click="dismiss"
        >
            <X class="h-4 w-4" />
        </button>
    </div>
</template>
