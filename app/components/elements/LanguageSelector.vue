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

    <!-- Minimal Variant (for header navigation) -->
    <div
        v-else-if="variant === 'minimal'"
        class="relative flex items-center gap-1 text-gray-600 hover:text-gray-900"
    >
        <Languages
            v-if="showIcon"
            class="w-4 h-4"
        />
        <select
            :value="locale"
            class="bg-transparent border-none text-sm font-medium cursor-pointer focus:outline-none appearance-none pe-4"
            @change="(e) => switchLanguage((e.target as HTMLSelectElement).value)"
        >
            <option
                v-for="lang in localesList"
                :key="lang.code"
                :value="lang.code"
            >
                {{ lang.name }}
            </option>
        </select>
    </div>

    <!-- Icon-Only Variant (for compact spaces) -->
    <DropdownMenu v-else-if="variant === 'icon-only'">
        <DropdownMenuTrigger as-child>
            <Button
                variant="outline"
                :size="size === 'sm' ? 'sm' : 'default'"
                :class="[
                    size === 'sm' ? 'h-8 w-8 p-0' : 'h-9 w-9 p-0',
                    buttonClass,
                ]"
            >
                <Languages class="h-4 w-4" />
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

    <!-- Button Group Variant -->
    <div
        v-else-if="variant === 'button-group'"
        class="flex rounded-md border"
    >
        <button
            v-for="(lang, index) in localesList"
            :key="lang.code"
            class="px-3 py-1.5 text-sm font-medium transition-colors"
            :class="[
                locale === lang.code
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-accent',
                index === 0 ? 'rounded-s-md' : '',
                index === localesList.length - 1 ? 'rounded-e-md' : '',
                index !== 0 ? 'border-s' : '',
            ]"
            @click="switchLanguage(lang.code)"
        >
            {{ lang.code.toUpperCase() }}
        </button>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Languages, Check } from 'lucide-vue-next';
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
    variant?: 'select' | 'icon-only' | 'minimal' | 'button-group';
    showLabel?: boolean;
    showIcon?: boolean;
    size?: 'sm' | 'md';
    buttonClass?: string;
    width?: string;
}>(), {
    variant: 'select',
    showLabel: false,
    showIcon: false,
    size: 'md',
    buttonClass: '',
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
</script>
