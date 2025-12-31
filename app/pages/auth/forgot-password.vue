<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div class="text-center">
                <h1 class="text-3xl font-bold text-gray-900">
                    {{ $t('auth.forgotPasswordTitle') }}
                </h1>
                <p class="mt-2 text-gray-600">
                    {{ $t('auth.forgotPasswordDescription') }}
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
                <h2 class="text-lg font-semibold text-green-800 mb-2">
                    {{ $t('auth.resetLinkSent') }}
                </h2>
                <p class="text-sm text-green-700">
                    {{ $t('auth.resetLinkSentDescription') }}
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
                </div>
                <TurnstileWidget
                    ref="turnstileWidgetRef"
                    v-model="turnstileToken"
                />
                <Button
                    type="submit"
                    class="w-full"
                    :disabled="loading || !turnstileToken"
                >
                    <Loader2
                        v-if="loading"
                        class="mr-2 h-4 w-4 animate-spin"
                    />
                    {{ loading ? $t('auth.sendingResetLink') : $t('auth.sendResetLink') }}
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
import { Loader2, CheckCircle } from 'lucide-vue-next';
import TurnstileWidget from '~/components/elements/TurnstileWidget.vue';

const { t } = useI18n();

const email = ref('');
const turnstileToken = ref<string | null>(null);
const turnstileWidgetRef = ref();
const loading = ref(false);
const error = ref('');
const success = ref(false);

const handleSubmit = async () => {
    if (loading.value || !turnstileToken.value) return;

    loading.value = true;
    error.value = '';

    try {
        const response = await $fetch('/api/auth/forgot-password', {
            method: 'POST',
            body: {
                email: email.value,
                turnstileToken: turnstileToken.value,
            },
        });

        if (response.success) {
            success.value = true;
        }
    }
    catch (err: unknown) {
        const fetchError = err as { data?: { message?: string } };
        error.value = fetchError.data?.message || t('auth.resetPasswordError');
        turnstileWidgetRef.value?.reset();
    }
    finally {
        loading.value = false;
    }
};

useHead({
    title: `${t('auth.forgotPasswordTitle')} - Resume Builder`,
    meta: [
        { name: 'description', content: t('auth.forgotPasswordDescription') },
    ],
});
</script>
