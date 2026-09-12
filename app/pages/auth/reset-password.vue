<script setup lang="ts">
import * as z from 'zod';
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui';

const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const router = useRouter();

const token = computed(() => route.query.token as string | undefined);
const loading = ref(false);
const error = ref('');
const success = ref(false);

const schema = z.object({
    password: z.string().min(6, t('auth.newPasswordMinLength')),
    confirmPassword: z.string().min(1, t('auth.confirmPassword')),
}).refine(data => data.password === data.confirmPassword, {
    message: t('auth.passwordsDoNotMatch'),
    path: ['confirmPassword'],
});

type Schema = z.output<typeof schema>;

const fields = computed<AuthFormField[]>(() => [
    { name: 'password', type: 'password', label: t('auth.newPassword'), placeholder: t('auth.enterNewPassword'), required: true },
    { name: 'confirmPassword', type: 'password', label: t('auth.confirmPassword'), placeholder: t('auth.confirmNewPassword'), required: true },
]);

async function onSubmit(event: FormSubmitEvent<Schema>) {
    if (loading.value) return;

    loading.value = true;
    error.value = '';

    try {
        const response = await $fetch('/api/auth/reset-password', {
            method: 'POST',
            body: { token: token.value, password: event.data.password },
        });

        if (response.success) {
            success.value = true;
            setTimeout(() => router.push(localePath('/auth/login')), 2000);
        }
    }
    catch (err: unknown) {
        const fetchError = err as { data?: { message?: string } };
        error.value = fetchError.data?.message || t('auth.resetPasswordError');
    }
    finally {
        loading.value = false;
    }
}

useHead({
    title: `${t('auth.resetPassword')} - Resume For Free`,
    meta: [
        { name: 'description', content: t('auth.resetPasswordDescription') },
        { name: 'robots', content: 'noindex, follow' },
    ],
});
</script>

<template>
    <div class="flex min-h-dvh items-center justify-center p-4">
        <UPageCard class="w-full max-w-md">
            <UAlert
                v-if="success"
                color="success"
                variant="soft"
                icon="i-lucide-circle-check"
                :description="$t('auth.resetPasswordSuccess')"
            />

            <UAlert
                v-else-if="!token"
                color="error"
                variant="soft"
                icon="i-lucide-circle-alert"
                :description="$t('auth.invalidResetLink')"
            />

            <UAuthForm
                v-else
                :schema="schema"
                :fields="fields"
                :title="$t('auth.resetPassword')"
                :description="$t('auth.resetPasswordDescription')"
                icon="i-lucide-key-round"
                :submit="{
                    label: loading ? $t('auth.resettingPassword') : $t('auth.resetPassword'),
                    loading,
                    block: true,
                }"
                @submit="onSubmit"
            >
                <template #validation>
                    <UAlert
                        v-if="error"
                        color="error"
                        variant="soft"
                        icon="i-lucide-circle-x"
                        :description="error"
                    />
                </template>

                <template #footer>
                    <ULink
                        :to="localePath('/auth/login')"
                        class="text-secondary font-medium"
                    >
                        {{ $t('auth.backToSignIn') }}
                    </ULink>
                </template>
            </UAuthForm>
        </UPageCard>
    </div>
</template>
