<script setup lang="ts">
import * as z from 'zod';
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui';
import TurnstileWidget from '~/components/elements/TurnstileWidget.vue';

const emit = defineEmits<{ 'switch-to-login': [] }>();

const isOpen = defineModel<boolean>('open', { required: true });

const { t } = useI18n();
const authStore = useAuthStore();
const notify = useNotify();

const turnstileToken = ref<string | null>(null);
const loading = ref(false);
const error = ref('');

const schema = z.object({
    name: z.string().min(1, t('validation.nameRequired', 'Name is required')),
    email: z.email(t('validation.invalidEmail', 'Enter a valid email address')),
    password: z.string().min(6, t('validation.passwordMinLength', 'Password must be at least 6 characters')),
    passwordConfirm: z.string().min(1, t('auth.confirmPassword')),
}).refine(data => data.password === data.passwordConfirm, {
    message: t('auth.passwordsDoNotMatch'),
    path: ['passwordConfirm'],
});

type Schema = z.output<typeof schema>;

const fields = computed<AuthFormField[]>(() => [
    { name: 'name', type: 'text', label: t('common.name'), placeholder: t('auth.enterName'), required: true },
    { name: 'email', type: 'email', label: t('common.email'), placeholder: t('auth.enterEmail'), required: true },
    { name: 'password', type: 'password', label: t('auth.password'), placeholder: t('auth.createPasswordPlaceholder'), required: true },
    { name: 'passwordConfirm', type: 'password', label: t('auth.confirmPassword'), placeholder: t('auth.confirmPasswordPlaceholder'), required: true },
]);

watch(isOpen, (open) => {
    if (!open) {
        turnstileToken.value = null;
        error.value = '';
        loading.value = false;
    }
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
    if (loading.value || !turnstileToken.value) return;

    loading.value = true;
    error.value = '';

    const result = await authStore.register({
        email: event.data.email,
        password: event.data.password,
        passwordConfirm: event.data.passwordConfirm,
        name: event.data.name,
        turnstileToken: turnstileToken.value,
    });

    if (result.success) {
        notify.success(t('auth.accountCreatedSuccess'));
        isOpen.value = false;
        return;
    }

    error.value = result.error || t('auth.registrationFailed');
    turnstileToken.value = null;
    loading.value = false;
}

function switchToLogin() {
    isOpen.value = false;
    emit('switch-to-login');
}
</script>

<template>
    <UModal
        v-model:open="isOpen"
        :dismissible="!loading"
        :title="t('auth.createAccount')"
        :description="t('auth.createAccountDescription')"
    >
        <template #body>
            <UAuthForm
                :schema="schema"
                :fields="fields"
                :submit="{
                    label: t('auth.createAccount'),
                    loading,
                    disabled: !turnstileToken,
                    block: true,
                }"
                @submit="onSubmit"
            >
                <template #validation>
                    <TurnstileWidget v-model="turnstileToken" />
                    <UAlert
                        v-if="error"
                        color="error"
                        variant="soft"
                        icon="i-lucide-circle-x"
                        :description="error"
                    />
                </template>

                <template #footer>
                    {{ t('auth.alreadyHaveAccount') }}
                    <UButton
                        variant="link"
                        color="secondary"
                        class="p-0"
                        :label="t('auth.signIn')"
                        @click="switchToLogin"
                    />
                </template>
            </UAuthForm>
        </template>
    </UModal>
</template>
