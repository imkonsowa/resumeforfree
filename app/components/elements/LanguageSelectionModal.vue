<template>
    <Dialog :open="isOpen">
        <DialogContent
            hide-close
            class="max-w-[95vw] sm:max-w-md mx-4 sm:mx-auto"
            @pointer-down-outside.prevent
            @escape-key-down.prevent
            @interact-outside.prevent
        >
            <DialogHeader class="pb-2 sm:pb-4">
                <DialogTitle class="flex items-center gap-2 sm:gap-3 text-lg sm:text-xl">
                    <div class="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-secondary rounded-full">
                        <Globe class="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
                    </div>
                    <span class="leading-tight">{{ $t('languageModal.title') }}</span>
                </DialogTitle>
                <DialogDescription class="text-sm sm:text-base leading-relaxed pt-1 sm:pt-2">
                    {{ $t('languageModal.description') }}
                </DialogDescription>
            </DialogHeader>
            <div class="grid grid-cols-2 gap-3 sm:gap-4 py-4">
                <button
                    v-for="loc in localesList"
                    :key="loc.code"
                    class="flex flex-col items-center justify-center p-4 sm:p-6 rounded-lg border-2 transition-all hover:border-primary hover:bg-secondary"
                    :class="locale === loc.code ? 'border-primary bg-secondary' : 'border-border bg-background'"
                    @click="$emit('select', loc.code)"
                >
                    <span class="text-lg sm:text-xl font-semibold mb-1">{{ loc.name }}</span>
                    <span class="text-xs sm:text-sm text-muted-foreground uppercase">{{ loc.code }}</span>
                </button>
            </div>
        </DialogContent>
    </Dialog>
</template>

<script lang="ts" setup>
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '~/components/ui/dialog';
import { Globe } from 'lucide-vue-next';

interface Props {
    isOpen: boolean;
}
defineProps<Props>();
defineEmits<{
    select: [locale: string];
}>();

const { locale, locales } = useI18n();

const localesList = computed(() => {
    return locales.value.map(l => ({
        code: l.code,
        name: l.name || l.code,
    }));
});
</script>
