<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div class="text-center">
                <h1 class="text-3xl font-bold text-gray-900">
                    {{ $t('auth.resetPassword') }}
                </h1>
                <p class="mt-2 text-gray-600">
                    {{ $t('auth.resetPasswordDescription') }}
                </p>
            </div>

            <!-- Success State -->
            <div
                v-if="success"
                class="mt-6 p-6 border border-green-200 rounded-lg bg-green-50 text-center"
            >
                <div class="flex justify-center mb-4">
                    <CheckCircle class="h-12 w-12 text-green-500" />
                </div>
                <p class="text-sm text-green-700">
                    {{ $t('auth.resetPasswordSuccess') }}
                </p>
            </div>

            <!-- Invalid Token State -->
            <div
                v-else-if="!token"
                class="mt-6 p-6 border border-red-200 rounded-lg bg-red-50 text-center"
            >
                <div class="flex justify-center mb-4">
                    <AlertCircle class="h-12 w-12 text-red-500" />
                </div>
                <p class="text-sm text-red-700">
                    {{ $t('auth.invalidResetLink') }}
                </p>
            </div>

            <!-- Form -->
            <form
                v-else
                class="mt-6 space-y-6 p-6 border border-gray-200 rounded-lg bg-white"
                @submit.prevent="handleSubmit"
            >
                <div class="space-y-4">
                    <div>
                        <Label for="password">{{ $t('auth.newPassword') }}</Label>
                        <Input
                            id="password"
                            v-model="password"
                            type="password"
                            :placeholder="$t('auth.enterNewPassword')"
                            required
                            :disabled="loading"
                            class="mt-1"
                        />
                    </div>
                    <div>
                        <Label for="confirmPassword">{{ $t('auth.confirmPassword') }}</Label>
                        <Input
                            id="confirmPassword"
                            v-model="confirmPassword"
                            type="password"
                            :placeholder="$t('auth.confirmNewPassword')"
                            required
                            :disabled="loading"
                            class="mt-1"
                        />
                    </div>
                </div>
                <Button
                    type="submit"
                    class="w-full"
                    :disabled="loading"
                >
                    <Loader2
                        v-if="loading"
                        class="mr-2 h-4 w-4 animate-spin"
                    />
                    {{ loading ? $t('auth.resettingPassword') : $t('auth.resetPassword') }}
                </Button>
                <div
                    v-if="error"
                    class="text-sm text-red-600 text-center"
                >
                    {{ error }}
                </div>
            </form>

            <div class="text-center">
                <NuxtLink
                    to="/auth/login"
                    class="text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline"
                >
                    {{ $t('auth.backToSignIn') }}
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-vue-next';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const token = computed(() => route.query.token as string | undefined);
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);
const error = ref('');
const success = ref(false);

const handleSubmit = async () => {
    if (loading.value) return;

    error.value = '';

    // Validate passwords match
    if (password.value !== confirmPassword.value) {
        error.value = t('auth.passwordsDoNotMatch');
        return;
    }

    // Validate password length
    if (password.value.length < 6) {
        error.value = t('auth.newPasswordMinLength');
        return;
    }

    loading.value = true;

    try {
        const response = await $fetch('/api/auth/reset-password', {
            method: 'POST',
            body: {
                token: token.value,
                password: password.value,
            },
        });

        if (response.success) {
            success.value = true;
            // Redirect to login after 2 seconds
            setTimeout(() => {
                router.push('/auth/login');
            }, 2000);
        }
    }
    catch (err: unknown) {
        const fetchError = err as { data?: { message?: string } };
        error.value = fetchError.data?.message || t('auth.resetPasswordError');
    }
    finally {
        loading.value = false;
    }
};

useHead({
    title: `${t('auth.resetPassword')} - Resume Builder`,
    meta: [
        { name: 'description', content: t('auth.resetPasswordDescription') },
    ],
});
</script>
