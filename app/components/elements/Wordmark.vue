<script lang="ts" setup>
import Logo from './Logo.vue';

withDefaults(defineProps<{
    showIcon?: boolean;
    iconSize?: number;
}>(), {
    showIcon: true,
    iconSize: 24,
});
</script>

<template>
    <div class="flex items-center gap-2">
        <Logo
            v-if="showIcon"
            :size="iconSize"
        />
        <span class="text-[15px] font-bold tracking-tight text-highlighted">
            Resume<span class="text-secondary">ForFree</span>
        </span>
    </div>
</template>
