<script setup lang="ts">
import * as z from 'zod';
import type { AuthFormField, ButtonProps, FormSubmitEvent } from '@nuxt/ui';
import TurnstileWidget from '~/components/elements/TurnstileWidget.vue';

const { t } = useI18n();
const localePath = useLocalePath();
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const turnstileToken = ref<string | null>(null);
const turnstileWidgetRef = ref();
const loading = ref(false);
const error = ref('');

const schema = z.object({
    email: z.email(t('validation.invalidEmail', 'Enter a valid email address')),
    password: z.string().min(1, t('validation.passwordRequired', 'Password is required')),
});

type Schema = z.output<typeof schema>;

const fields = computed<AuthFormField[]>(() => [
    {
        name: 'email',
        type: 'email',
        label: t('common.email'),
        placeholder: t('auth.enterEmail'),
        required: true,
    },
    {
        name: 'password',
        type: 'password',
        label: t('auth.password'),
        placeholder: t('auth.enterPassword'),
        required: true,
    },
]);

const providers = computed<ButtonProps[]>(() => [{
    label: t('auth.continueWithGoogle'),
    icon: 'i-simple-icons-google',
    color: 'neutral',
    variant: 'outline',
    block: true,
    onClick: () => navigateTo('/auth/google', { external: true }),
}]);

const googleErrorMessages: Record<string, string> = {
    google_oauth_failed: t('auth.googleOAuthFailed'),
    google_no_email: t('auth.googleNoEmail'),
    google_handler_error: t('auth.googleHandlerError'),
    user_creation_failed: t('auth.googleUserCreationFailed'),
};

onMounted(() => {
    const errorParam = route.query.error as string | undefined;
    if (errorParam && googleErrorMessages[errorParam]) {
        error.value = googleErrorMessages[errorParam];
    }
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
    if (loading.value || !turnstileToken.value) return;

    loading.value = true;
    error.value = '';

    const result = await authStore.login({
        email: event.data.email,
        password: event.data.password,
        turnstileToken: turnstileToken.value,
    });

    if (result.success) {
        router.push(localePath('/resumes'));
    }
    else {
        error.value = result.error || t('auth.loginFailed');
    }

    loading.value = false;
    turnstileWidgetRef.value?.reset();
}

useHead({
    title: `${t('auth.signIn')} - Resume For Free`,
    meta: [
        { name: 'description', content: t('auth.signInDescription') },
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
                :title="$t('auth.signIn')"
                :description="$t('auth.signInDescription')"
                icon="i-lucide-lock"
                :separator="$t('auth.orContinueWith')"
                :submit="{
                    label: $t('auth.signIn'),
                    loading,
                    disabled: !turnstileToken,
                    block: true,
                }"
                @submit="onSubmit"
            >
                <template #password-hint>
                    <ULink
                        :to="localePath('/auth/forgot-password')"
                        class="text-secondary font-medium"
                    >
                        {{ $t('auth.forgotPassword') }}
                    </ULink>
                </template>

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
                    {{ $t('auth.dontHaveAccount') }}
                    <ULink
                        :to="localePath('/auth/register')"
                        class="text-secondary font-medium"
                    >
                        {{ $t('auth.signUp') }}
                    </ULink>
                </template>
            </UAuthForm>
        </UPageCard>
    </div>
</template>
