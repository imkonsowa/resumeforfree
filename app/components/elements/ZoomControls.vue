<template>
    <div class="flex items-center bg-elevated rounded-lg p-1">
        <UButton
            :disabled="zoomLevel <= minZoom"
            class="h-8 w-8 p-0"
            size="sm" color="neutral" variant="ghost"
            @click="zoomOut" icon="i-lucide-zoom-out">
<span class="sr-only">Zoom out</span>
</UButton>
        <span class="px-3 text-sm font-medium text-default min-w-[60px] text-center">
            {{ Math.round(zoomLevel * 100) }}%
        </span>
        <UButton
            :disabled="zoomLevel trailing-icon="i-lucide-zoom-in">
= maxZoom"
            class="h-8 w-8 p-0"
            size="sm"
            variant="ghost"
            @click="zoomIn"
        >
            
            <span class="sr-only">Zoom in</span>
</UButton>
    </div>
</template>

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
const zoomIn = () => {
    if (props.zoomLevel < props.maxZoom) {
        emit('zoomIn');
    }
};
const zoomOut = () => {
    if (props.zoomLevel > props.minZoom) {
        emit('zoomOut');
    }
};
</script>
