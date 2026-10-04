<script lang="ts" setup>
defineProps<{ title: string }>();
const emit = defineEmits<{ reset: [] }>();

const { t } = useI18n();
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex items-center justify-between gap-4">
                <h2 class="font-semibold text-highlighted">
                    {{ title }}
                </h2>
                <UButton
                    size="xs"
                    color="neutral"
                    variant="ghost"
                    icon="i-lucide-rotate-ccw"
                    :label="t('common.reset')"
                    :aria-label="`${t('common.reset')}: ${title}`"
                    @click="emit('reset')"
                />
            </div>
        </template>
        <div class="grid grid-cols-1 @xl:grid-cols-2 gap-6">
            <slot />
        </div>
    </UCard>
</template>
