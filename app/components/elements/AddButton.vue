<template>
    <button
        class="w-full border-2 border-dashed border-accented hover:border-accented bg-transparent hover:bg-muted text-toned hover:text-default px-4 py-1.5 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        @click="$emit('click')"
    >
        <UIcon
            name="i-lucide-plus"
            class="w-4 h-4"
        />
        <span class="text-sm font-medium">{{ label }}</span>
    </button>
</template>

<script lang="ts" setup>
interface Props {
    label: string;
}
defineProps<Props>();
defineEmits<{
    click: [];
}>();
</script>
