<template>
    <!-- Select Variant (for forms/settings) -->
    <div
        v-if="variant === 'select'"
        class="space-y-2"
    >
        <Label
            v-if="showLabel"
            for="language-select"
        >
            {{ t('settings.language.label') }}
        </Label>
        <Select
            :model-value="locale"
            @update:model-value="switchLanguage"
        >
            <SelectTrigger
                id="language-select"
                :class="[
                    size === 'sm' ? 'h-8 text-sm' : '',
                    width,
                ]"
            >
                <Languages
                    v-if="showIcon"
                    class="w-4 h-4 me-2 text-muted-foreground"
                />
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem
                    v-for="lang in localesList"
                    :key="lang.code"
                    :value="lang.code"
                >
                    {{ lang.name }}
                </SelectItem>
            </SelectContent>
        </Select>
    </div>

    <!-- Dropdown Variant (unified menu for all contexts) -->
    <DropdownMenu v-else>
        <DropdownMenuTrigger as-child>
            <Button
                :variant="buttonVariant"
                :size="size === 'sm' ? 'sm' : 'default'"
                :class="[
                    size === 'sm' ? 'h-8 gap-1 px-2' : 'h-9 gap-1.5 px-3',
                    buttonClass,
                ]"
            >
                <!-- Large screens: Icon + Full name -->
                <template v-if="!responsive">
                    <Languages
                        v-if="showIcon"
                        :class="size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'"
                    />
                    <span class="text-sm font-medium">{{ currentLocaleName }}</span>
                </template>
                <!-- Responsive: Full name on large, short code on small -->
                <template v-else>
                    <Languages
                        v-if="showIcon"
                        class="hidden sm:block"
                        :class="size === 'sm' ? 'h-3.5 w-3.5' : 'h-4 w-4'"
                    />
                    <span class="text-sm font-medium hidden sm:inline">{{ currentLocaleName }}</span>
                    <span class="text-sm font-medium uppercase sm:hidden">{{ locale }}</span>
                </template>
                <ChevronDown :class="size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'" />
                <span class="sr-only">{{ t('settings.language.label') }}</span>
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem
                v-for="lang in localesList"
                :key="lang.code"
                :class="{ 'bg-accent': locale === lang.code }"
                @click="switchLanguage(lang.code)"
            >
                <Check
                    v-if="locale === lang.code"
                    class="me-2 h-4 w-4"
                />
                <span :class="locale !== lang.code ? 'ms-6' : ''">{{ lang.name }}</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Languages, Check, ChevronDown } from 'lucide-vue-next';
import { Button } from '~/components/ui/button';
import { Label } from '~/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

// Props
withDefaults(defineProps<{
    variant?: 'select' | 'dropdown';
    showLabel?: boolean;
    showIcon?: boolean;
    responsive?: boolean;
    size?: 'sm' | 'md';
    buttonClass?: string;
    buttonVariant?: 'outline' | 'ghost' | 'default';
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

// i18n
const { locale, locales, t } = useI18n();
const { switchLanguage } = useLanguageSwitcher();

// Computed
const localesList = computed(() => {
    return locales.value.map(l => ({
        code: l.code,
        name: l.name || l.code,
    }));
});

const currentLocaleName = computed(() => {
    const current = locales.value.find(l => l.code === locale.value);
    return current?.name || locale.value;
});
</script>
