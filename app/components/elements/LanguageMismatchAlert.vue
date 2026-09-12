<script setup lang="ts">
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
    <UAlert
        v-if="show"
        :dir="uiDir"
        color="secondary"
        variant="soft"
        class="mb-4"
        :description="t('builder.languageMismatch', { language: resumeLanguageName })"
        close
        @update:open="dismiss"
    />
</template>
