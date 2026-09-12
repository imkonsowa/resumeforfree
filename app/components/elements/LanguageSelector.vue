<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui';

withDefaults(defineProps<{
    variant?: 'select' | 'dropdown';
    showLabel?: boolean;
    showIcon?: boolean;
    responsive?: boolean;
    size?: 'sm' | 'md';
    buttonClass?: string;
    buttonVariant?: 'outline' | 'ghost' | 'solid' | 'soft' | 'subtle';
    width?: string;
}>(), {
    variant: 'dropdown',
    showLabel: false,
    showIcon: false,
    responsive: false,
    size: 'md',
    buttonClass: '',
    buttonVariant: 'outline',
    width: '',
});

const { locale, locales, t } = useI18n();
const { switchLanguage } = useLanguageSwitcher();

const localesList = computed(() =>
    locales.value.map(l => ({ code: l.code, name: l.name || l.code })),
);

const currentLocaleName = computed(() =>
    locales.value.find(l => l.code === locale.value)?.name || locale.value,
);

/*
 * UDropdownMenu marks the active entry with `checked`, which renders its own
 * indicator — the manual Check icon and ms-6 spacer the shadcn version needed
 * are no longer necessary.
 */
const menuItems = computed<DropdownMenuItem[]>(() =>
    localesList.value.map(lang => ({
        label: lang.name,
        type: 'checkbox' as const,
        checked: locale.value === lang.code,
        onSelect: () => switchLanguage(lang.code),
    })),
);
</script>

<template>
    <UFormField
        v-if="variant === 'select'"
        :label="showLabel ? t('settings.language.label') : undefined"
        name="language"
    >
        <USelectMenu
            :model-value="locale"
            :items="localesList"
            value-key="code"
            label-key="name"
            :icon="showIcon ? 'i-lucide-languages' : undefined"
            :size="size"
            :class="width"
            :search-input="false"
            @update:model-value="switchLanguage"
        />
    </UFormField>

    <UDropdownMenu
        v-else
        :items="menuItems"
        :content="{ align: 'end' }"
    >
        <UButton
            :variant="buttonVariant"
            color="neutral"
            :size="size"
            :icon="showIcon ? 'i-lucide-languages' : undefined"
            trailing-icon="i-lucide-chevron-down"
            :class="buttonClass"
            :aria-label="t('settings.language.label')"
        >
            <template v-if="!responsive">
                {{ currentLocaleName }}
            </template>
            <template v-else>
                <span class="hidden sm:inline">{{ currentLocaleName }}</span>
                <span class="uppercase sm:hidden">{{ locale }}</span>
            </template>
        </UButton>
    </UDropdownMenu>
</template>
