<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div class="text-center">
                <h1 class="text-3xl font-bold text-gray-900">
                    {{ $t('auth.createAccount') }}
                </h1>
                <p class="mt-2 text-gray-600">
                    {{ $t('auth.createAccountDescription') }}
                </p>
            </div>
            <form
                class="mt-6 space-y-6 p-6 border border-gray-200 rounded-lg bg-white"
                @submit.prevent="handleRegister"
            >
                <a
                    href="/auth/google"
                    class="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                    <svg
                        class="h-5 w-5"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                    {{ $t('auth.continueWithGoogle') }}
                </a>

                <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                        <span class="w-full border-t border-gray-200" />
                    </div>
                    <div class="relative flex justify-center text-xs uppercase">
                        <span class="bg-white px-2 text-gray-500">{{ $t('auth.orContinueWith') }}</span>
                    </div>
                </div>
                <div class="space-y-4">
                    <div>
                        <Label for="name">{{ $t('common.name') }}</Label>
                        <Input
                            id="name"
                            v-model="name"
                            type="text"
                            :placeholder="$t('auth.enterName')"
                            required
                            :disabled="loading"
                            class="mt-1"
                        />
                    </div>
                    <div>
                        <Label for="email">{{ $t('common.email') }}</Label>
                        <Input
                            id="email"
                            v-model="email"
                            type="email"
                            :placeholder="$t('auth.enterEmail')"
                            required
                            :disabled="loading"
                            class="mt-1"
                        />
                    </div>
                    <div>
                        <Label for="password">{{ $t('auth.password') }}</Label>
                        <Input
                            id="password"
                            v-model="password"
                            type="password"
                            :placeholder="$t('auth.createPasswordPlaceholder')"
                            required
                            minlength="6"
                            :disabled="loading"
                            class="mt-1"
                        />
                    </div>
                    <div>
                        <Label for="passwordConfirm">{{ $t('auth.confirmPassword') }}</Label>
                        <Input
                            id="passwordConfirm"
                            v-model="passwordConfirm"
                            type="password"
                            :placeholder="$t('auth.confirmPasswordPlaceholder')"
                            required
                            :disabled="loading"
                            class="mt-1"
                        />
                    </div>
                </div>
                <TurnstileWidget
                    ref="turnstileWidgetRef"
                    v-model="turnstileToken"
                />
                <Button
                    type="submit"
                    class="w-full"
                    :disabled="loading || !isFormValid || !turnstileToken"
                >
                    <Loader2
                        v-if="loading"
                        class="mr-2 h-4 w-4 animate-spin"
                    />
                    {{ $t('auth.createAccount') }}
                </Button>
                <div
                    v-if="error"
                    class="text-sm text-red-600 text-center"
                >
                    {{ error }}
                </div>
                <div
                    v-if="success"
                    class="text-sm text-green-600 text-center"
                >
                    {{ success }}
                </div>
            </form>
            <div class="text-center">
                <p class="text-sm text-gray-600">
                    {{ $t('auth.alreadyHaveAccount') }}
                    <NuxtLink
                        to="/auth/login"
                        class="font-medium text-green-700 hover:text-green-ink hover:underline"
                    >
                        {{ $t('auth.signIn') }}
                    </NuxtLink>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Loader2 } from 'lucide-vue-next';
import TurnstileWidget from '~/components/elements/TurnstileWidget.vue';

const { t } = useI18n();
const localePath = useLocalePath();
const authStore = useAuthStore();
const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const passwordConfirm = ref('');
const turnstileToken = ref<string | null>(null);
const turnstileWidgetRef = ref();
const loading = ref(false);
const error = ref('');
const success = ref('');
const isFormValid = computed(() => {
    return name.value
        && email.value
        && password.value
        && password.value.length >= 6
        && passwordConfirm.value
        && password.value === passwordConfirm.value;
});
watch([password, passwordConfirm], () => {
    if (password.value && passwordConfirm.value && password.value !== passwordConfirm.value) {
        error.value = t('auth.passwordsDoNotMatch');
    }
    else {
        error.value = '';
    }
});
const handleRegister = async () => {
    if (loading.value || !isFormValid.value || !turnstileToken.value) return;
    loading.value = true;
    error.value = '';
    success.value = '';
    const result = await authStore.register({
        email: email.value,
        password: password.value,
        passwordConfirm: passwordConfirm.value,
        name: name.value,
        turnstileToken: turnstileToken.value,
    });
    if (result.success) {
        success.value = t('auth.accountCreatedSuccess');
        setTimeout(() => {
            router.push(localePath('/resumes'));
        }, 1500);
    }
    else {
        error.value = result.error || t('auth.registrationFailed');
    }
    loading.value = false;
    turnstileWidgetRef.value?.reset();
};
useHead({
    title: `${t('auth.createAccount')} - Resume Builder`,
    meta: [
        { name: 'description', content: t('auth.createAccountDescription') },
        { name: 'robots', content: 'noindex, follow' },
    ],
});
</script>
