<script lang="ts" setup>
const props = defineProps<{ isOpen: boolean }>();

const emit = defineEmits<{
    close: [];
    register: [dontShowAgain: boolean];
    login: [dontShowAgain: boolean];
    continueLocally: [dontShowAgain: boolean];
}>();

const { t } = useI18n();

const dontShowAgain = ref(false);

const open = computed({
    get: () => props.isOpen,
    set: (value) => {
        if (!value) emit('close');
    },
});

watch(() => props.isOpen, (isOpen) => {
    if (isOpen) dontShowAgain.value = false;
});

const benefits = computed(() => [
    t('resumes.modals.firstTime.accessAnywhere'),
    t('resumes.modals.firstTime.autoBackup'),
    t('resumes.modals.firstTime.freeResumes'),
]);
</script>

<template>
    <UModal
        v-model:open="open"
        :title="t('resumes.modals.firstTime.title')"
        :description="t('resumes.modals.firstTime.description')"
        :ui="{ footer: 'flex-col items-stretch gap-3' }"
    >
        <template #body>
            <ul class="text-sm text-muted space-y-1.5">
                <li
                    v-for="benefit in benefits"
                    :key="benefit"
                    class="flex items-center gap-2"
                >
                    <UIcon
                        name="i-lucide-check"
                        class="size-4 text-secondary shrink-0"
                    />
                    <span>{{ benefit }}</span>
                </li>
            </ul>
        </template>

        <template #footer>
            <div class="flex gap-2 w-full">
                <UButton
                    class="flex-1 justify-center"
                    icon="i-lucide-user-plus"
                    :label="t('resumes.modals.firstTime.signUp')"
                    @click="emit('register', dontShowAgain)"
                />
                <UButton
                    class="flex-1 justify-center"
                    color="neutral"
                    variant="outline"
                    icon="i-lucide-log-in"
                    :label="t('resumes.modals.firstTime.login')"
                    @click="emit('login', dontShowAgain)"
                />
            </div>

            <UButton
                color="neutral"
                variant="ghost"
                block
                :label="t('resumes.modals.firstTime.continueLocally')"
                @click="emit('continueLocally', dontShowAgain)"
            />

            <UCheckbox
                v-model="dontShowAgain"
                :label="t('resumes.modals.firstTime.dontShowAgain')"
                :ui="{ label: 'text-xs text-muted' }"
                class="justify-center"
            />
        </template>
    </UModal>
</template>
