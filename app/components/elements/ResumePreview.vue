<template>
    <ClientOnly>
        <div>
            <div class="flex justify-between items-center mb-8">
                <h2 class="text-xl font-semibold">
                    <span class="hidden md:inline">{{ t('builder.preview') }}</span>
                    <span class="md:hidden text-base">{{ activeResume?.name }}</span>
                </h2>
                <div class="hidden md:flex items-center space-x-3">
                    <div class="zoom-controls-midscreen">
                        <ZoomControls
                            :max-zoom="maxZoom"
                            :min-zoom="minZoom"
                            :zoom-level="zoomLevel"
                            :zoom-step="zoomStep"
                            @zoom-in="handleZoomIn"
                            @zoom-out="handleZoomOut"
                        />
                    </div>
                    <div class="template-selection-desktop">
                        <USelectMenu
                            v-model="selectedTemplateId"
                            :items="templateItems"
                            value-key="value"
                            label-key="label"
                            :search-input="false"
                            size="sm"
                            class="w-56"
                            :ui="{ base: 'h-9' }"
                        />
                    </div>
                    <UButton
                        size="sm"
                        color="neutral"
                        variant="outline"
                        class="h-9"
                        icon="i-lucide-sliders-horizontal"
                        :label="t('builder.settings')"
                        @click="showSettingsModal = true"
                    />
                    <div class="inline-flex items-center rounded-md overflow-hidden">
                        <UButton
                            size="sm"
                            color="secondary"
                            class="rounded-none h-9"
                            icon="i-lucide-download"
                            @click="handleDownload"
                        >
                            <span class="download-text">{{ t('builder.download') }}</span> {{ t('builder.downloadPDF') }}
                        </UButton>
                        <UDropdownMenu
                            :items="downloadItems"
                            :content="{ align: 'end' }"
                        >
                            <UButton
                                size="sm"
                                color="secondary"
                                class="rounded-none h-9 px-2"
                                icon="i-lucide-more-vertical"
                                :aria-label="t('builder.downloadOptions', 'Download options')"
                            />
                        </UDropdownMenu>
                    </div>
                </div>
                <div class="md:hidden flex gap-2">
                    <UButton
                        size="sm"
                        color="neutral"
                        variant="outline"
                        class="h-9"
                        icon="i-lucide-settings"
                        :aria-label="t('builder.settings')"
                        @click="showSettingsModal = true"
                    />
                    <div class="inline-flex items-center rounded-md overflow-hidden">
                        <UButton
                            size="sm"
                            color="secondary"
                            class="rounded-none h-9"
                            icon="i-lucide-download"
                            :label="t('builder.download')"
                            @click="handleDownload"
                        />
                        <UDropdownMenu
                            :items="downloadItems"
                            :content="{ align: 'end' }"
                        >
                            <UButton
                                size="sm"
                                color="secondary"
                                class="rounded-none h-9 px-2"
                                icon="i-lucide-more-vertical"
                                :aria-label="t('builder.downloadOptions', 'Download options')"
                            />
                        </UDropdownMenu>
                    </div>
                </div>
            </div>
            <UCard
                class="h-full"
                :ui="{ body: 'p-0' }"
            >
                <div class="bg-elevated overflow-hidden h-full">
                    <div class="bg-white h-full min-h-[calc(100vh-200px)] flex flex-col">
                        <div
                            v-if="isLoading && !previewContent"
                            class="flex items-center justify-center flex-1"
                        >
                            <div class="text-center">
                                <div
                                    class="w-16 h-16 border-4 border-accented border-t-secondary rounded-full animate-spin mx-auto mb-4"
                                />
                                <h3 class="text-xl font-semibold text-default mb-2">
                                    {{ t('builder.loadingPreview') }}
                                </h3>
                                <p class="text-toned">
                                    {{ t('builder.loadingPreviewDescription') }}
                                </p>
                            </div>
                        </div>
                        <div
                            v-else-if="error && !previewContent"
                            class="flex items-center justify-center flex-1"
                        >
                            <div class="text-center">
                                <div
                                    class="w-16 h-16 bg-error/15 rounded-full flex items-center justify-center mx-auto mb-4"
                                >
                                    <svg
                                        class="w-8 h-8 text-error"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M6 18L18 6M6 6l12 12"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                        />
                                    </svg>
                                </div>
                                <h3 class="text-xl font-semibold text-error mb-2">
                                    {{ t('builder.previewError') }}
                                </h3>
                                <p class="text-error mb-4">
                                    {{ error }}
                                </p>
                                <UButton
                                    size="sm"
                                    color="neutral"
                                    variant="outline"
                                    @click="generatePreview"
                                >
                                    {{ t('common.tryAgain') }}
                                </UButton>
                            </div>
                        </div>
                        <div
                            v-else-if="previewContent"
                            class="flex-1 overflow-auto p-4"
                        >
                            <div class="preview-container flex justify-center min-h-full">
                                <div
                                    class="resume-preview-wrapper"
                                    v-html="previewContent"
                                />
                            </div>
                        </div>
                        <div
                            v-else
                            class="flex items-center justify-center flex-1"
                        >
                            <div class="text-center">
                                <div
                                    class="w-16 h-16 bg-secondary/15 rounded-full flex items-center justify-center mx-auto mb-4"
                                >
                                    <svg
                                        class="w-8 h-8 text-secondary"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                        />
                                    </svg>
                                </div>
                                <h3 class="text-xl font-semibold text-default mb-2">
                                    {{ t('builder.initializingTypst') }}
                                </h3>
                                <p class="text-toned">
                                    {{ t('builder.settingUpCompiler') }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </UCard>
            <SettingsModal v-model="showSettingsModal" />
            <InvisibleTurnstile ref="turnstileRef" />
        </div>
    </ClientOnly>
</template>

<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui';
import { getTemplateList } from '~/templates';
import { useResumeGenerator } from '~/composables/useResumeGenerator';
import { useDebounceFn } from '@vueuse/core';
import SettingsModal from '~/components/elements/SettingsModal.vue';
import ZoomControls from '~/components/elements/ZoomControls.vue';
import InvisibleTurnstile from '~/components/elements/InvisibleTurnstile.vue';
import { useSettingsStore } from '~/stores/settings';
import { useResumeStore } from '~/stores/resume';
import { describeTypstError } from '~/utils/stringUtils';
import { storeToRefs } from 'pinia';

const availableTemplates = getTemplateList();

const turnstileRef = ref<InstanceType<typeof InvisibleTurnstile> | null>(null);

const { t } = useI18n();
const { generatePreview, downloadPDF, downloadSVG, downloadTypst, downloadTypstText } = useResumeGenerator();
const { isReady: typstReady } = useTypstLoader();
const settingsStore = useSettingsStore();
const resumeStore = useResumeStore();
const { resumeData, activeResume } = storeToRefs(resumeStore);
const { selectedFont, selectedTemplate, fontSize, photoShape, showSectionHeaderLine } = storeToRefs(settingsStore);
const isLoading = ref(false);
const error = ref<string | null>(null);
const previewContent = ref<string>('');
const showSettingsModal = ref(false);

const templateItems = computed(() =>
    availableTemplates.map(template => ({
        label: `${template.name} ${t('builder.template')}`,
        description: template.description,
        value: template.id,
    })),
);

const selectedTemplateId = computed({
    get: () => selectedTemplate.value,
    set: value => settingsStore.setSelectedTemplate(value),
});

const downloadItems = computed<DropdownMenuItem[]>(() => [
    { label: t('builder.downloadAsSVG'), icon: 'i-lucide-download', onSelect: handleDownloadSVG },
    { label: t('builder.downloadAsTypst'), icon: 'i-lucide-download', onSelect: handleDownloadTypst },
    { label: t('builder.downloadAsText'), icon: 'i-lucide-download', onSelect: handleDownloadTypstText },
]);
const zoomLevel = ref(1);
const minZoom = 0.5;
const maxZoom = 2.5;
const zoomStep = 0.25;
const handleZoomIn = () => {
    if (zoomLevel.value < maxZoom) {
        zoomLevel.value = Math.min(zoomLevel.value + zoomStep, maxZoom);
    }
};
const handleZoomOut = () => {
    if (zoomLevel.value > minZoom) {
        zoomLevel.value = Math.max(zoomLevel.value - zoomStep, minZoom);
    }
};
const generatePreviewInternal = async () => {
    if (!resumeData.value) return;
    isLoading.value = true;
    error.value = null;
    try {
        if (!typstReady.value) {
            await new Promise((resolve) => {
                const unwatch = watch(
                    typstReady,
                    (ready) => {
                        if (ready) {
                            unwatch();
                            resolve(void 0);
                        }
                    },
                );
            });
        }
        if (!typstReady.value) {
            return;
        }
        if (!resumeStore.activeResume) return;
        previewContent.value = await generatePreview(resumeStore.activeResume);
    }
    catch (err) {
        console.error(err);
        const detail = describeTypstError(err);
        error.value = detail
            ? t('builder.previewErrorDetailed', { detail })
            : t('builder.previewError');
    }
    finally {
        isLoading.value = false;
    }
};
const handleDownload = async () => {
    if (!resumeStore.activeResume) return;
    try {
        await downloadPDF(resumeStore.activeResume);
        const token = await turnstileRef.value?.getToken();
        $fetch('/api/increase-downloads-count', {
            method: 'POST',
            body: { turnstileToken: token },
        })
            .catch(console.debug)
            .finally(() => turnstileRef.value?.reset());
    }
    catch (err) {
        error.value = err instanceof Error ? err.message : 'Failed to download PDF';
        console.error('PDF download error:', err);
    }
};
const handleDownloadSVG = async () => {
    if (!resumeStore.activeResume) return;
    try {
        await downloadSVG(resumeStore.activeResume);
    }
    catch (err) {
        error.value = err instanceof Error ? err.message : 'Failed to download SVG';
        console.error('SVG download error:', err);
    }
};
const handleDownloadTypst = () => {
    if (!resumeStore.activeResume) return;
    try {
        downloadTypst(resumeStore.activeResume);
    }
    catch (err) {
        error.value = err instanceof Error ? err.message : 'Failed to download Typst';
        console.error('Typst download error:', err);
    }
};
const handleDownloadTypstText = () => {
    if (!resumeStore.activeResume) return;
    try {
        downloadTypstText(resumeStore.activeResume);
    }
    catch (err) {
        error.value = err instanceof Error ? err.message : 'Failed to download Typst as text';
        console.error('Typst text download error:', err);
    }
};
const debouncedGeneratePreview = useDebounceFn(() => {
    generatePreviewInternal();
}, 100);
const activeResumeLanguage = computed(() => resumeStore.activeResumeLanguage);
watch(
    [resumeData, selectedTemplate, selectedFont, fontSize, photoShape, showSectionHeaderLine, activeResumeLanguage],
    () => {
        debouncedGeneratePreview();
    },
    { deep: true, immediate: true },
);
defineExpose({
    generatePreview: generatePreviewInternal,
});
</script>

<style scoped>
    /* Base Styles (Mobile First)
       ================================== */
    .resume-preview-wrapper :deep(svg) + :deep(svg) {
        margin-top: 16px; /* Space between pages */
    }
    .preview-container {
        min-width: 100%;
        display: flex;
        justify-content: flex-start;
    }
    .zoom-controls-midscreen {
        display: none;
    }
    .template-selection-desktop {
        display: none !important;
    }
    /* Mobile: < 1024px
       ================================== */
    @media (max-width: 1023px) {
        .resume-preview-wrapper :deep(svg) {
            width: 100% !important;
            height: auto !important;
            max-width: 100% !important;
            max-height: none !important;
            display: block;
            margin: 0 auto;
            background: white;
            box-shadow: none !important;
            border-radius: 0;
        }
        .resume-preview-wrapper {
            width: 100%;
            padding: 0;
            min-width: auto;
        }
    }
    /* Small Desktop: 900px - 1024px
       ================================== */
    @media (min-width: 900px) and (max-width: 1023px) {
        .download-text {
            display: none;
        }
    }
    /* Desktop: >= 1024px
       ================================== */
    @media (min-width: 1024px) {
        .preview-container {
            justify-content: center;
        }
    }
    /* Medium Desktop: 1024px - 1600px
       ================================== */
    @media (min-width: 1024px) and (max-width: 1600px) {
        .resume-preview-wrapper :deep(svg) {
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            max-height: none !important;
            display: block;
            margin: 0;
            background: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 4px;
            transform: scale(v-bind(zoomLevel));
            transform-origin: top left;
            transition: transform 0.2s ease-in-out;
        }
        .resume-preview-wrapper {
            width: max-content;
            padding: 8px;
            margin: 0;
        }
        .preview-container {
            justify-content: flex-start;
        }
        .zoom-controls-midscreen {
            display: flex;
        }
        .download-text {
            display: none;
        }
    }
    /* Large Desktop: > 1600px
       ================================== */
    @media (min-width: 1601px) {
        .resume-preview-wrapper :deep(svg) {
            width: 794px !important; /* A4 width at 96 DPI */
            height: auto !important;
            max-width: none !important;
            max-height: none !important;
            display: block;
            margin: 0;
            background: white;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            border-radius: 4px;
        }
        .resume-preview-wrapper {
            min-width: 810px; /* SVG width + padding */
            padding: 8px;
        }
        .template-selection-desktop {
            display: block !important;
        }
    }
</style>
