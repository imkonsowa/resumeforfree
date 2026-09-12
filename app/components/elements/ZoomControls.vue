<script lang="ts" setup>
interface Props {
    zoomLevel: number;
    minZoom?: number;
    maxZoom?: number;
    zoomStep?: number;
}
interface Emits {
    zoomIn: [];
    zoomOut: [];
}

const props = withDefaults(defineProps<Props>(), {
    minZoom: 0.5,
    maxZoom: 2.5,
    zoomStep: 0.25,
});

const emit = defineEmits<Emits>();

const { t } = useI18n();

const zoomIn = () => {
    if (props.zoomLevel < props.maxZoom) emit('zoomIn');
};

const zoomOut = () => {
    if (props.zoomLevel > props.minZoom) emit('zoomOut');
};
</script>

<template>
    <div class="flex items-center bg-elevated rounded-md p-1">
        <UButton
            :disabled="zoomLevel <= minZoom"
            size="sm"
            color="neutral"
            variant="ghost"
            icon="i-lucide-zoom-out"
            :aria-label="t('builder.zoomOut', 'Zoom out')"
            @click="zoomOut"
        />
        <span class="px-3 text-sm font-medium text-default min-w-[60px] text-center">
            {{ Math.round(zoomLevel * 100) }}%
        </span>
        <UButton
            :disabled="zoomLevel >= maxZoom"
            size="sm"
            color="neutral"
            variant="ghost"
            icon="i-lucide-zoom-in"
            :aria-label="t('builder.zoomIn', 'Zoom in')"
            @click="zoomIn"
        />
    </div>
</template>
