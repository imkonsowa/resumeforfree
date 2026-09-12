<script setup lang="ts">
import * as z from 'zod';
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui';
import TurnstileWidget from '~/components/elements/TurnstileWidget.vue';

const { t } = useI18n();
const localePath = useLocalePath();

const turnstileToken = ref<string | null>(null);
const turnstileWidgetRef = ref();
const loading = ref(false);
const error = ref('');
const success = ref(false);

const schema = z.object({
    email: z.email(t('validation.invalidEmail', 'Enter a valid email address')),
});

type Schema = z.output<typeof schema>;

const fields = computed<AuthFormField[]>(() => [{
    name: 'email',
    type: 'email',
    label: t('common.email'),
    placeholder: t('auth.enterEmail'),
    required: true,
}]);

async function onSubmit(event: FormSubmitEvent<Schema>) {
    if (loading.value || !turnstileToken.value) return;

    loading.value = true;
    error.value = '';

    try {
        const response = await $fetch('/api/auth/forgot-password', {
            method: 'POST',
            body: { email: event.data.email, turnstileToken: turnstileToken.value },
        });

        if (response.success) success.value = true;
    }
    catch (err: unknown) {
        const fetchError = err as { data?: { message?: string } };
        error.value = fetchError.data?.message || t('auth.resetPasswordError');
        turnstileWidgetRef.value?.reset();
    }
    finally {
        loading.value = false;
    }
}

useHead({
    title: `${t('auth.forgotPasswordTitle')} - Resume For Free`,
    meta: [
        { name: 'description', content: t('auth.forgotPasswordDescription') },
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
                :title="$t('auth.resetLinkSent')"
                :description="$t('auth.resetLinkSentDescription')"
            />

            <UAuthForm
                v-else
                :schema="schema"
                :fields="fields"
                :title="$t('auth.forgotPasswordTitle')"
                :description="$t('auth.forgotPasswordDescription')"
                icon="i-lucide-key-round"
                :submit="{
                    label: loading ? $t('auth.sendingResetLink') : $t('auth.sendResetLink'),
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
