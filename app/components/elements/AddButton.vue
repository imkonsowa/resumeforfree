<template>
    <UButton
        block
        color="neutral"
        variant="outline"
        icon="i-lucide-plus"
        :label="label"
        class="border-2 border-dashed"
        @click="$emit('click')"
    />
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
