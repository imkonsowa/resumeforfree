<script lang="ts" setup>
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
const selectedLanguage = ref(settingsStore.settings.locale || 'en');
const navigateToBuilder = ref(true);
const saveToCloud = ref(false);

const open = computed({
    get: () => props.isOpen,
    set: (value) => {
        if (!value) emit('close');
    },
});

const canSaveToCloud = computed(() => authStore.isLoggedIn && resumeStore.canSaveToCloud);

const languageItems = computed(() =>
    locales.value.map(l => ({ label: l.name || l.code, value: l.code })),
);

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
    }
});

const isValid = computed(() => Boolean(newResumeName.value.trim()));

const handleConfirm = () => {
    if (!isValid.value) return;
    emit('confirm', newResumeName.value, selectedLanguage.value, navigateToBuilder.value, saveToCloud.value);
};
</script>

<template>
    <UModal
        v-model:open="open"
        :title="t('resumes.modals.create.title')"
        :ui="{ footer: 'justify-end' }"
    >
        <template #body>
            <div class="space-y-4">
                <UFormField
                    name="resumeName"
                    :label="t('resumes.modals.create.resumeName')"
                    required
                >
                    <UInput
                        v-model="newResumeName"
                        autofocus
                        class="w-full"
                        :placeholder="t('resumes.modals.create.enterName')"
                        @keydown.enter="handleConfirm"
                    />
                </UFormField>

                <UFormField
                    name="resumeLanguage"
                    :label="t('resumes.modals.create.resumeLanguage')"
                >
                    <URadioGroup
                        v-model="selectedLanguage"
                        :items="languageItems"
                        value-key="value"
                        orientation="horizontal"
                        variant="card"
                    />
                </UFormField>

                <div class="space-y-3 pt-2">
                    <UCheckbox
                        v-model="navigateToBuilder"
                        :label="t('resumes.modals.create.navigateToBuilder')"
                    />

                    <div
                        v-if="authStore.isLoggedIn"
                        class="space-y-2"
                    >
                        <UCheckbox
                            v-if="canSaveToCloud"
                            v-model="saveToCloud"
                            icon="i-lucide-cloud"
                            :label="t('resumes.modals.create.saveToCloud')"
                        />

                        <p
                            class="text-xs flex items-center gap-1"
                            :class="resumeStore.cloudInfo.remaining > 0 ? 'text-muted' : 'text-warning'"
                        >
                            <UIcon
                                name="i-lucide-cloud"
                                class="size-3"
                            />
                            <span v-if="resumeStore.cloudInfo.remaining > 0">
                                {{ t('resumes.modals.create.slotsAvailableMessage', {
                                    remaining: resumeStore.cloudInfo.remaining,
                                    limit: resumeStore.cloudInfo.limit,
                                }) }}
                            </span>
                            <span v-else>
                                {{ t('resumes.modals.create.noSlotsAvailableMessage', {
                                    count: resumeStore.cloudInfo.count,
                                    limit: resumeStore.cloudInfo.limit,
                                }) }}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </template>

        <template #footer>
            <UButton
                color="neutral"
                variant="outline"
                :label="t('resumes.modals.cancel')"
                @click="emit('close')"
            />
            <UButton
                :disabled="!isValid"
                :label="t('resumes.modals.create.createButton')"
                @click="handleConfirm"
            />
        </template>
    </UModal>
</template>
