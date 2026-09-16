<script lang="ts" setup>
import type { Resume } from '~/types/resume';
import { isRtlLocale } from '~/composables/useLocale';

type Side = 'left' | 'right';

interface Props {
    isOpen: boolean;
    resumes: Resume[];
    initialLeftId?: string | null;
    initialRightId?: string | null;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    close: [];
}>();

const { t, locale, loadLocaleMessages } = useI18n({ useScope: 'global' });
const { generatePreview, typstReady } = useResumeGenerator();

type LoadableLocale = Parameters<typeof loadLocaleMessages>[0];

const sides = ['left', 'right'] as const;

const selection = reactive<Record<Side, string>>({ left: '', right: '' });
const previews = reactive<Record<Side, string>>({ left: '', right: '' });
const isRendering = reactive<Record<Side, boolean>>({ left: false, right: false });
const renderError = reactive<Record<Side, string>>({ left: '', right: '' });

const syncScroll = ref(true);
const panes: Record<Side, HTMLElement | null> = { left: null, right: null };
let isMirroringScroll = false;

const isOpen = computed({
    get: () => props.isOpen,
    set: (value) => {
        if (!value) emit('close');
    },
});

const sideLabel = (side: Side) => {
    const rendersOnTheLeft = isRtlLocale(locale.value) ? side === 'right' : side === 'left';
    return rendersOnTheLeft ? t('common.left') : t('common.right');
};

const itemsFor = (side: Side) => {
    const other = side === 'left' ? selection.right : selection.left;
    return props.resumes.map(resume => ({
        label: resume.name,
        value: resume.id,
        disabled: resume.id === other,
    }));
};

const waitForTypst = () => new Promise<void>((resolve, reject) => {
    if (typstReady.value) return resolve();
    const timeout = setTimeout(() => {
        stop();
        reject(new Error(t('resumes.splitView.failed')));
    }, 120000);
    const stop = watch(typstReady, (ready) => {
        if (!ready) return;
        clearTimeout(timeout);
        stop();
        resolve();
    });
});

const resetScroll = () => {
    isMirroringScroll = true;
    for (const side of sides) {
        if (panes[side]) panes[side].scrollTop = 0;
    }
    requestAnimationFrame(() => {
        isMirroringScroll = false;
    });
};

const renderSide = async (side: Side) => {
    const resume = props.resumes.find(item => item.id === selection[side]);
    if (!resume) {
        previews[side] = '';
        return;
    }

    isRendering[side] = true;
    renderError[side] = '';
    try {
        await waitForTypst();
        await loadLocaleMessages(resume.language as LoadableLocale);
        previews[side] = await generatePreview(resume);
        await nextTick();
        resetScroll();
    }
    catch (error) {
        console.error('Split view render failed:', error);
        previews[side] = '';
        renderError[side] = t('resumes.splitView.failed');
    }
    finally {
        isRendering[side] = false;
    }
};

let renderQueue: Promise<void> = Promise.resolve();

const queueRender = (side: Side) => {
    renderQueue = renderQueue.then(() => renderSide(side));
};

const selectSide = (side: Side, resumeId: string) => {
    if (selection[side] === resumeId) return;
    selection[side] = resumeId;
    queueRender(side);
};

const swapSides = () => {
    [selection.left, selection.right] = [selection.right, selection.left];
    [previews.left, previews.right] = [previews.right, previews.left];
    [renderError.left, renderError.right] = [renderError.right, renderError.left];

    if (!panes.left || !panes.right) return;
    const leftScroll = panes.left.scrollTop;
    isMirroringScroll = true;
    panes.left.scrollTop = panes.right.scrollTop;
    panes.right.scrollTop = leftScroll;
    requestAnimationFrame(() => {
        isMirroringScroll = false;
    });
};

const setPaneRef = (side: Side, el: Element | ComponentPublicInstance | null) => {
    panes[side] = el instanceof HTMLElement ? el : null;
};

const mirrorScroll = (from: Side) => {
    if (!syncScroll.value || isMirroringScroll) return;
    const source = panes[from];
    const target = panes[from === 'left' ? 'right' : 'left'];
    if (!source || !target) return;

    const sourceRange = source.scrollHeight - source.clientHeight;
    const targetRange = target.scrollHeight - target.clientHeight;
    if (sourceRange <= 0 || targetRange <= 0) return;

    isMirroringScroll = true;
    target.scrollTop = (source.scrollTop / sourceRange) * targetRange;
    requestAnimationFrame(() => {
        isMirroringScroll = false;
    });
};

watch(() => props.isOpen, (open) => {
    if (!open) return;
    const first = props.initialLeftId || props.resumes[0]?.id || '';
    const second = props.initialRightId && props.initialRightId !== first
        ? props.initialRightId
        : props.resumes.find(resume => resume.id !== first)?.id || '';

    selection.left = first;
    selection.right = second;
    queueRender('left');
    queueRender('right');
}, { immediate: true });
</script>

<template>
    <UModal
        v-model:open="isOpen"
        :title="t('resumes.splitView.title')"
        :description="t('resumes.splitView.description')"
        :ui="{ content: 'max-w-[96vw] w-[96vw] h-[94vh]' }"
    >
        <template #body>
            <div class="flex flex-col h-full min-h-0 gap-4">
                <div class="flex flex-wrap items-center justify-end gap-3">
                    <USwitch
                        v-model="syncScroll"
                        :label="t('resumes.splitView.syncScroll')"
                    />
                    <UButton
                        color="neutral"
                        variant="outline"
                        size="sm"
                        icon="i-lucide-arrow-left-right"
                        :label="t('resumes.splitView.swap')"
                        :disabled="!selection.left || !selection.right"
                        @click="swapSides"
                    />
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
                    <section
                        v-for="side in sides"
                        :key="side"
                        class="flex flex-col min-h-0 border border-default rounded-lg overflow-hidden"
                    >
                        <header class="flex items-center gap-2 p-3 border-b border-default bg-elevated">
                            <span class="text-xs font-medium text-muted uppercase tracking-wide shrink-0">
                                {{ sideLabel(side) }}
                            </span>
                            <USelectMenu
                                :model-value="selection[side]"
                                :items="itemsFor(side)"
                                value-key="value"
                                label-key="label"
                                :placeholder="t('resumes.splitView.selectResume')"
                                class="flex-1 min-w-0"
                                @update:model-value="(value) => selectSide(side, value as string)"
                            />
                        </header>

                        <div
                            :ref="(el) => setPaneRef(side, el)"
                            class="flex-1 min-h-0 overflow-auto bg-muted p-4"
                            @scroll="mirrorScroll(side)"
                        >
                            <div
                                v-if="isRendering[side]"
                                class="flex flex-col items-center justify-center h-full gap-3"
                            >
                                <UIcon
                                    name="i-lucide-loader-circle"
                                    class="size-8 text-secondary animate-spin"
                                />
                                <p class="text-sm text-toned">
                                    {{ t('resumes.splitView.rendering') }}
                                </p>
                            </div>

                            <div
                                v-else-if="renderError[side]"
                                class="flex flex-col items-center justify-center h-full gap-3 text-center"
                            >
                                <UIcon
                                    name="i-lucide-triangle-alert"
                                    class="size-8 text-error"
                                />
                                <p class="text-sm text-error">
                                    {{ renderError[side] }}
                                </p>
                            </div>

                            <!-- eslint-disable vue/no-v-html -->
                            <div
                                v-else-if="previews[side]"
                                class="split-view-pane bg-white rounded shadow-sm"
                                v-html="previews[side]"
                            />
                            <!-- eslint-enable vue/no-v-html -->

                            <div
                                v-else
                                class="flex items-center justify-center h-full"
                            >
                                <p class="text-sm text-muted">
                                    {{ t('resumes.splitView.selectResume') }}
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </template>

        <template #footer>
            <UButton
                color="neutral"
                variant="outline"
                :label="t('common.close')"
                @click="emit('close')"
            />
        </template>
    </UModal>
</template>

<style scoped>
.split-view-pane :deep(svg) {
    width: 100% !important;
    height: auto !important;
    max-width: 100% !important;
    display: block;
    margin: 0 auto;
}

.split-view-pane :deep(svg) + :deep(svg) {
    margin-top: 16px;
}
</style>
