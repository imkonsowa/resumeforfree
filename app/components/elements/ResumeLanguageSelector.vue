<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui';

const props = withDefaults(defineProps<{
    modelValue: string;
    size?: 'sm' | 'md';
    buttonVariant?: 'outline' | 'ghost' | 'solid' | 'soft' | 'subtle';
    buttonClass?: string;
    showIcon?: boolean;
}>(), {
    size: 'sm',
    buttonVariant: 'outline',
    buttonClass: '',
    showIcon: true,
});

const emit = defineEmits<{ update: [code: string] }>();

const { t, locales, loadLocaleMessages } = useI18n();

const handleSelect = async (code: string) => {
    if (code === props.modelValue) return;
    await loadLocaleMessages(code).catch(err => console.error('[resume-language] load failed:', err));
    emit('update', code);
};

const currentName = computed(() => {
    const match = locales.value.find(l => l.code === props.modelValue);
    return match?.name || props.modelValue;
});

const items = computed<DropdownMenuItem[]>(() =>
    locales.value.map(l => ({
        label: l.name || l.code,
        type: 'checkbox' as const,
        checked: props.modelValue === l.code,
        onSelect: () => handleSelect(l.code),
    })),
);
</script>

<template>
    <UDropdownMenu
        :items="items"
        :content="{ align: 'end' }"
    >
        <UButton
            :variant="buttonVariant"
            color="neutral"
            :size="size"
            :icon="showIcon ? 'i-lucide-languages' : undefined"
            trailing-icon="i-lucide-chevron-down"
            :label="currentName"
            :class="buttonClass"
            :aria-label="t('settings.language.label')"
        />
    </UDropdownMenu>
</template>
