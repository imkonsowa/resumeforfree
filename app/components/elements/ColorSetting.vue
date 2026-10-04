<script lang="ts" setup>
const model = defineModel<string>({ required: true });

const { t } = useI18n();

const PRESETS = ['#000000', '#374151', '#1d4ed8', '#0f766e', '#15803d', '#b91c1c', '#7c3aed', '#b45309'];

const isCustom = computed(() => Boolean(model.value) && !PRESETS.includes(model.value.toLowerCase()));
const pickerValue = computed({
    get: () => model.value || '#000000',
    set: (value: string | undefined) => {
        if (value) model.value = value.toLowerCase();
    },
});
</script>

<template>
    <div class="flex flex-wrap items-center gap-2">
        <UTooltip :text="t('settings.colors.templateDefault')">
            <button
                type="button"
                class="size-7 rounded-full border border-default bg-default flex items-center justify-center text-muted focus-visible:outline-2 focus-visible:outline-primary"
                :class="!model ? 'ring-2 ring-primary ring-offset-2 ring-offset-default' : ''"
                :aria-label="t('settings.colors.templateDefault')"
                :aria-pressed="!model"
                @click="model = ''"
            >
                <UIcon
                    name="i-lucide-ban"
                    class="size-4"
                />
            </button>
        </UTooltip>
        <button
            v-for="color in PRESETS"
            :key="color"
            type="button"
            class="size-7 rounded-full border border-default focus-visible:outline-2 focus-visible:outline-primary"
            :class="model.toLowerCase() === color ? 'ring-2 ring-primary ring-offset-2 ring-offset-default' : ''"
            :style="{ backgroundColor: color }"
            :aria-label="color"
            :aria-pressed="model.toLowerCase() === color"
            @click="model = color"
        />
        <UPopover>
            <UTooltip :text="t('settings.colors.custom')">
                <button
                    type="button"
                    class="size-7 rounded-full border border-default flex items-center justify-center text-muted focus-visible:outline-2 focus-visible:outline-primary"
                    :class="isCustom ? 'ring-2 ring-primary ring-offset-2 ring-offset-default text-inverted' : 'bg-default'"
                    :style="isCustom ? { backgroundColor: model } : undefined"
                    :aria-label="t('settings.colors.custom')"
                >
                    <UIcon
                        name="i-lucide-pipette"
                        class="size-4"
                    />
                </button>
            </UTooltip>
            <template #content>
                <div class="p-3">
                    <UColorPicker
                        v-model="pickerValue"
                        format="hex"
                    />
                </div>
            </template>
        </UPopover>
    </div>
</template>
