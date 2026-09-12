<script setup lang="ts">
import * as z from 'zod';
import type { AuthFormField, ButtonProps, FormSubmitEvent } from '@nuxt/ui';
import TurnstileWidget from '~/components/elements/TurnstileWidget.vue';

const { t } = useI18n();
const localePath = useLocalePath();
const authStore = useAuthStore();

const turnstileToken = ref<string | null>(null);
const turnstileWidgetRef = ref();
const loading = ref(false);
const error = ref('');
const notify = useNotify();

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

const providers = computed<ButtonProps[]>(() => [{
    label: t('auth.continueWithGoogle'),
    icon: 'i-simple-icons-google',
    color: 'neutral',
    variant: 'outline',
    block: true,
    onClick: () => navigateTo('/auth/google', { external: true }),
}]);

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
        await navigateTo(localePath('/resumes'));
        return;
    }

    error.value = result.error || t('auth.registrationFailed');
    loading.value = false;
    turnstileWidgetRef.value?.reset();
}

useHead({
    title: `${t('auth.createAccount')} - Resume For Free`,
    meta: [
        { name: 'description', content: t('auth.createAccountDescription') },
        { name: 'robots', content: 'noindex, follow' },
    ],
});
</script>

<template>
    <div class="flex min-h-dvh items-center justify-center p-4">
        <UPageCard class="w-full max-w-md">
            <UAuthForm
                :schema="schema"
                :fields="fields"
                :providers="providers"
                :title="$t('auth.createAccount')"
                :description="$t('auth.createAccountDescription')"
                icon="i-lucide-user-plus"
                :separator="$t('auth.orContinueWith')"
                :submit="{
                    label: $t('auth.createAccount'),
                    loading,
                    disabled: !turnstileToken,
                    block: true,
                }"
                @submit="onSubmit"
            >
                <template #validation>
                    <TurnstileWidget
                        ref="turnstileWidgetRef"
                        v-model="turnstileToken"
                    />
                    <UAlert
                        v-if="error"
                        color="error"
                        variant="soft"
                        icon="i-lucide-circle-x"
                        :description="error"
                    />
                </template>

                <template #footer>
                    {{ $t('auth.alreadyHaveAccount') }}
                    <ULink
                        :to="localePath('/auth/login')"
                        class="text-secondary font-medium"
                    >
                        {{ $t('auth.signIn') }}
                    </ULink>
                </template>
            </UAuthForm>
        </UPageCard>
    </div>
</template>
