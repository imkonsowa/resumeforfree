<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child>
            <Button
                :variant="buttonVariant"
                :size="size"
                :class="buttonClass"
            >
                <Languages
                    v-if="showIcon"
                    class="w-4 h-4 me-1.5 text-muted-foreground"
                />
                <span>{{ currentName }}</span>
                <ChevronDown class="w-3.5 h-3.5 ms-1 opacity-60" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuItem
                v-for="lang in localesList"
                :key="lang.code"
                @click="handleSelect(lang.code)"
            >
                <Check
                    v-if="props.modelValue === lang.code"
                    class="me-2 h-4 w-4"
                />
                <span :class="props.modelValue !== lang.code ? 'ms-6' : ''">{{ lang.name }}</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Languages, Check, ChevronDown } from 'lucide-vue-next';
import { Button } from '~/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

const props = withDefaults(defineProps<{
    modelValue: string;
    size?: 'sm' | 'default';
    buttonVariant?: 'outline' | 'ghost' | 'default';
    buttonClass?: string;
    showIcon?: boolean;
}>(), {
    size: 'sm',
    buttonVariant: 'outline',
    buttonClass: '',
    showIcon: true,
});

const emit = defineEmits<{
    update: [code: string];
}>();

const { locales, loadLocaleMessages } = useI18n();

const handleSelect = async (code: string) => {
    if (code === props.modelValue) return;
    await loadLocaleMessages(code).catch(err => console.error('[resume-language] load failed:', err));
    emit('update', code);
};

const localesList = computed(() =>
    locales.value.map(l => ({ code: l.code, name: l.name || l.code })),
);

const currentName = computed(() => {
    const match = locales.value.find(l => l.code === props.modelValue);
    return match?.name || props.modelValue;
});
</script>
