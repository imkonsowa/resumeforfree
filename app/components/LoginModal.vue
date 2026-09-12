<script setup lang="ts">
import * as z from 'zod';
import type { AuthFormField, FormSubmitEvent } from '@nuxt/ui';
import TurnstileWidget from '~/components/elements/TurnstileWidget.vue';

const emit = defineEmits<{ 'switch-to-register': [] }>();

const isOpen = defineModel<boolean>('open', { required: true });

const { t } = useI18n();
const authStore = useAuthStore();

const turnstileToken = ref<string | null>(null);
const loading = ref(false);
const error = ref('');

const schema = z.object({
    email: z.email(t('validation.invalidEmail', 'Enter a valid email address')),
    password: z.string().min(1, t('validation.passwordRequired', 'Password is required')),
});

type Schema = z.output<typeof schema>;

const fields = computed<AuthFormField[]>(() => [
    { name: 'email', type: 'email', label: t('common.email'), placeholder: t('auth.enterEmail'), required: true },
    { name: 'password', type: 'password', label: t('auth.password'), placeholder: t('auth.enterPassword'), required: true },
]);

function reset() {
    turnstileToken.value = null;
    error.value = '';
    loading.value = false;
}

watch(isOpen, (open) => {
    if (!open) reset();
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
        isOpen.value = false;
        return;
    }

    error.value = result.error || t('auth.loginFailed');
    turnstileToken.value = null;
    loading.value = false;
}

function switchToRegister() {
    isOpen.value = false;
    emit('switch-to-register');
}
</script>

<template>
    <UModal
        v-model:open="isOpen"
        :dismissible="!loading"
        :title="t('auth.signIn')"
        :description="t('auth.signInDescription')"
    >
        <template #body>
            <UAuthForm
                :schema="schema"
                :fields="fields"
                :submit="{
                    label: t('auth.signIn'),
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
                    {{ t('auth.dontHaveAccount') }}
                    <UButton
                        variant="link"
                        color="secondary"
                        class="p-0"
                        :label="t('auth.signUp')"
                        @click="switchToRegister"
                    />
                </template>
            </UAuthForm>
        </template>
    </UModal>
</template>
