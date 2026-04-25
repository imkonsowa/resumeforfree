<script lang="ts" setup>
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Checkbox } from '~/components/ui/checkbox';
import { Cloud } from 'lucide-vue-next';

interface Props {
    isOpen: boolean;
}
interface Emits {
    (e: 'close'): void;
    (e: 'confirm', name: string, language: string, navigateToBuilder: boolean, saveToCloud: boolean): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();
const { t, locales } = useI18n();
const authStore = useAuthStore();
const resumeStore = useResumeStore();
const settingsStore = useSettingsStore();
const newResumeName = ref('');
const nameInputRef = ref<{ $el?: HTMLElement } | HTMLInputElement | null>(null);
const selectedLanguage = ref(settingsStore.settings.locale || 'en');
const navigateToBuilder = ref(true);
const saveToCloud = ref(false);
const canSaveToCloud = computed(() => {
    return authStore.isLoggedIn && resumeStore.canSaveToCloud;
});
const localesList = computed(() => {
    return locales.value.map(l => ({
        code: l.code,
        name: l.name || l.code,
    }));
});
const getDefaultResumeName = () => {
    if (!authStore.isLoggedIn) return '';
    const userName = authStore.user?.name?.trim();
    return userName ? `${userName} - Resume` : '';
};
watch(() => props.isOpen, (isOpen) => {
    if (isOpen) {
        newResumeName.value = getDefaultResumeName();
        selectedLanguage.value = settingsStore.settings.locale || 'en';
        navigateToBuilder.value = true;
        saveToCloud.value = false;
        nextTick(() => {
            const el = nameInputRef.value as { $el?: HTMLElement } | HTMLInputElement | null;
            const input = el && '$el' in el ? el.$el?.querySelector('input') : (el as HTMLInputElement | null);
            input?.focus();
            input?.select();
        });
    }
});
const isValid = computed(() => Boolean(newResumeName.value.trim()));
const handleConfirm = () => {
    if (!isValid.value) return;
    emit('confirm', newResumeName.value, selectedLanguage.value, navigateToBuilder.value, saveToCloud.value);
};
const handleCancel = () => {
    emit('close');
};
const handleEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
        handleConfirm();
    }
};
</script>

<template>
    <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center"
        @click="handleCancel"
    >
        <div class="absolute inset-0 bg-black/50" />
        <div
            class="relative bg-white border rounded-lg shadow-xl p-6 w-96 max-w-[90vw]"
            @click.stop
        >
            <div class="space-y-4">
                <h3 class="text-lg font-semibold text-gray-900">
                    {{ $t('resumes.modals.create.title') }}
                </h3>
                <div class="space-y-2">
                    <Label for="resume-name">
                        {{ $t('resumes.modals.create.resumeName') }}
                        <span class="text-destructive">*</span>
                    </Label>
                    <Input
                        id="resume-name"
                        ref="nameInputRef"
                        v-model="newResumeName"
                        required
                        :placeholder="$t('resumes.modals.create.enterName')"
                        @keydown="handleEnter"
                    />
                </div>
                <div class="space-y-2">
                    <Label>{{ $t('resumes.modals.create.resumeLanguage') }}</Label>
                    <div class="grid grid-cols-2 gap-2">
                        <button
                            v-for="loc in localesList"
                            :key="loc.code"
                            type="button"
                            class="flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all hover:border-primary hover:bg-secondary"
                            :class="selectedLanguage === loc.code ? 'border-primary bg-secondary' : 'border-border bg-background'"
                            @click="selectedLanguage = loc.code"
                        >
                            <span class="text-sm font-semibold">{{ loc.name }}</span>
                            <span class="text-xs text-muted-foreground uppercase">{{ loc.code }}</span>
                        </button>
                    </div>
                </div>
                <div class="space-y-3 pt-2">
                    <div class="flex items-center space-x-2">
                        <Checkbox
                            id="navigate-to-builder"
                            v-model="navigateToBuilder"
                        />
                        <Label
                            class="text-sm font-normal"
                            for="navigate-to-builder"
                        >
                            {{ $t('resumes.modals.create.navigateToBuilder') }}
                        </Label>
                    </div>
                    <div
                        v-if="authStore.isLoggedIn"
                        class="space-y-2"
                    >
                        <div
                            v-if="canSaveToCloud"
                            class="flex items-center space-x-2"
                        >
                            <Checkbox
                                id="save-to-cloud"
                                v-model="saveToCloud"
                            />
                            <Label
                                class="text-sm font-normal flex items-center gap-1"
                                for="save-to-cloud"
                            >
                                <Cloud class="w-4 h-4 text-green-700" />
                                {{ $t('resumes.modals.create.saveToCloud') }}
                            </Label>
                        </div>
                        <div class="text-xs text-gray-500 flex items-center gap-1">
                            <Cloud class="w-3 h-3" />
                            <span v-if="resumeStore.cloudInfo.remaining > 0">
                                {{ t('resumes.modals.create.slotsAvailableMessage', {
                                    remaining: resumeStore.cloudInfo.remaining,
                                    limit: resumeStore.cloudInfo.limit,
                                }) }}
                            </span>
                            <span
                                v-else
                                class="text-amber-600"
                            >
                                {{ t('resumes.modals.create.noSlotsAvailableMessage', {
                                    count: resumeStore.cloudInfo.count,
                                    limit: resumeStore.cloudInfo.limit,
                                }) }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="flex gap-3 pt-4">
                    <Button
                        class="flex-1"
                        :disabled="!isValid"
                        @click="handleConfirm"
                    >
                        {{ $t('resumes.modals.create.createButton') }}
                    </Button>
                    <Button
                        class="flex-1"
                        variant="outline"
                        @click="handleCancel"
                    >
                        {{ $t('resumes.modals.cancel') }}
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>
