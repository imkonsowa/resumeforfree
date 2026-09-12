<script lang="ts" setup>
import type { TabsItem } from '@nuxt/ui';
import ApiTokensPanel from '~/components/elements/ApiTokensPanel.vue';

const { t } = useI18n();
const notify = useNotify();
const localePath = useLocalePath();
const authStore = useAuthStore();

if (!authStore.isLoggedIn) {
    await navigateTo(localePath('/auth/login'));
}

useHead({
    meta: [
        { name: 'robots', content: 'noindex, follow' },
    ],
});

const activeSection = ref<'personal' | 'password' | 'tokens'>('personal');

const sectionItems = computed<TabsItem[]>(() => [
    { label: t('profile.personalInformation'), icon: 'i-lucide-user', value: 'personal' },
    { label: t('auth.changePassword'), icon: 'i-lucide-lock', value: 'password' },
    { label: t('apiTokens.title'), icon: 'i-lucide-key-round', value: 'tokens' },
]);
const isChangingPassword = ref(false);
const showCurrentPassword = ref(false);
const showNewPassword = ref(false);
const showConfirmPassword = ref(false);

const passwordForm = ref({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
});

const passwordErrors = ref<string[]>([]);

const resetPasswordForm = () => {
    passwordForm.value = { currentPassword: '', newPassword: '', confirmPassword: '' };
    passwordErrors.value = [];
};

const handleChangePassword = async () => {
    passwordErrors.value = [];

    if (!passwordForm.value.currentPassword) {
        passwordErrors.value.push(t('auth.currentPasswordRequired'));
        return;
    }

    if (!passwordForm.value.newPassword) {
        passwordErrors.value.push(t('auth.newPasswordRequired'));
        return;
    }

    if (passwordForm.value.newPassword.length < 8) {
        passwordErrors.value.push(t('auth.newPasswordMinLength'));
        return;
    }

    if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
        passwordErrors.value.push(t('auth.newPasswordsDoNotMatch'));
        return;
    }

    try {
        isChangingPassword.value = true;

        const api = useApi();
        await api.auth.changePassword({
            currentPassword: passwordForm.value.currentPassword,
            newPassword: passwordForm.value.newPassword,
        });

        passwordForm.value = {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        };

        notify.success(t('auth.passwordChangedSuccess'));
    }
    catch (error: unknown) {
        console.error('Password change error:', error);
        const errorMessage = (error as Error)?.message || t('auth.passwordChangeError');
        passwordErrors.value.push(errorMessage);
        notify.error(errorMessage);
    }
    finally {
        isChangingPassword.value = false;
    }
};

useHead({
    title: t('profile.title'),
    meta: [
        {
            name: 'description',
            content: t('profile.description'),
        },
    ],
});
</script>

<template>
    <div class="min-h-screen bg-muted">
        <div class="container mx-auto px-4 py-8">
            <div class="max-w-6xl mx-auto">
                <div class="mb-8">
                    <h1 class="text-3xl font-bold text-highlighted mb-2">
                        {{ $t('profile.title') }}
                    </h1>
                    <p class="text-toned">
                        {{ $t('profile.description') }}
                    </p>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div class="md:col-span-1">
                        <UTabs
                            v-model="activeSection"
                            :items="sectionItems"
                            orientation="vertical"
                            color="secondary"
                            :ui="{ list: 'w-full', trigger: 'justify-start grow' }"
                        />
                    </div>

                    <div class="md:col-span-3">
                        <UCard v-if="activeSection === 'personal'">
                            <template #header>
                                <div class="flex items-center gap-2 text-highlighted font-semibold">
                                    <UIcon
                                        name="i-lucide-user"
                                        class="size-5"
                                    />
                                    {{ $t('profile.personalInformation') }}
                                </div>
                                <p class="mt-1 text-muted text-sm">
                                    {{ $t('profile.viewAndManage') }}
                                </p>
                            </template>
                            <div class="space-y-8">
                                <div class="space-y-6">
                                    <UFormField
                                        name="name"
                                        :label="$t('common.name')"
                                    >
                                        <p class="p-4 bg-muted rounded-lg border border-default text-base">
                                            {{ authStore.currentUser?.name || $t('profile.notProvided') }}
                                        </p>
                                    </UFormField>
                                    <UFormField
                                        name="email"
                                        :label="$t('common.emailAddress')"
                                    >
                                        <p class="p-4 bg-muted rounded-lg border border-default text-base">
                                            {{ authStore.currentUser?.email }}
                                        </p>
                                    </UFormField>
                                </div>

                                <USeparator />

                                <UAlert
                                    color="secondary"
                                    variant="soft"
                                    icon="i-lucide-info"
                                    :title="$t('profile.accountInformation')"
                                    :description="$t('profile.accountInfoDescription')"
                                />
                            </div>
                        </UCard>

                        <UCard v-if="activeSection === 'password'">
                            <template #header>
                                <div class="flex items-center gap-2 text-highlighted font-semibold">
                                    <UIcon
                                        name="i-lucide-lock"
                                        class="size-5"
                                    />
                                    {{ $t('auth.changePassword') }}
                                </div>
                                <p class="mt-1 text-muted text-sm">
                                    {{ $t('profile.updatePasswordDescription') }}
                                </p>
                            </template>
                            <UForm
                                :state="passwordForm"
                                class="space-y-6"
                                @submit="handleChangePassword"
                            >
                                <UAlert
                                    v-if="passwordErrors.length > 0"
                                    color="error"
                                    variant="soft"
                                    icon="i-lucide-triangle-alert"
                                    :title="$t('profile.pleaseFixErrors')"
                                >
                                    <template #description>
                                        <ul class="space-y-1 mt-1">
                                            <li
                                                v-for="error in passwordErrors"
                                                :key="error"
                                            >
                                                {{ error }}
                                            </li>
                                        </ul>
                                    </template>
                                </UAlert>

                                <UFormField
                                    name="currentPassword"
                                    :label="$t('auth.currentPassword')"
                                >
                                    <UInput
                                        v-model="passwordForm.currentPassword"
                                        :type="showCurrentPassword ? 'text' : 'password'"
                                        :placeholder="$t('auth.enterCurrentPassword')"
                                        :disabled="isChangingPassword"
                                        class="w-full"
                                    >
                                        <template #trailing>
                                            <UButton
                                                color="neutral"
                                                variant="link"
                                                size="sm"
                                                :icon="showCurrentPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                                                :aria-label="$t('auth.togglePassword', 'Toggle password visibility')"
                                                @click="showCurrentPassword = !showCurrentPassword"
                                            />
                                        </template>
                                    </UInput>
                                </UFormField>

                                <UFormField
                                    name="newPassword"
                                    :label="$t('auth.newPassword')"
                                    :description="$t('auth.passwordMinLengthHint')"
                                >
                                    <UInput
                                        v-model="passwordForm.newPassword"
                                        :type="showNewPassword ? 'text' : 'password'"
                                        :placeholder="$t('auth.enterNewPassword')"
                                        :disabled="isChangingPassword"
                                        class="w-full"
                                    >
                                        <template #trailing>
                                            <UButton
                                                color="neutral"
                                                variant="link"
                                                size="sm"
                                                :icon="showNewPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                                                :aria-label="$t('auth.togglePassword', 'Toggle password visibility')"
                                                @click="showNewPassword = !showNewPassword"
                                            />
                                        </template>
                                    </UInput>
                                </UFormField>

                                <UFormField
                                    name="confirmPassword"
                                    :label="$t('auth.confirmNewPassword')"
                                >
                                    <UInput
                                        v-model="passwordForm.confirmPassword"
                                        :type="showConfirmPassword ? 'text' : 'password'"
                                        :placeholder="$t('auth.confirmNewPassword')"
                                        :disabled="isChangingPassword"
                                        class="w-full"
                                    >
                                        <template #trailing>
                                            <UButton
                                                color="neutral"
                                                variant="link"
                                                size="sm"
                                                :icon="showConfirmPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                                                :aria-label="$t('auth.togglePassword', 'Toggle password visibility')"
                                                @click="showConfirmPassword = !showConfirmPassword"
                                            />
                                        </template>
                                    </UInput>
                                </UFormField>

                                <div class="flex gap-3 pt-4">
                                    <UButton
                                        type="submit"
                                        icon="i-lucide-lock"
                                        :loading="isChangingPassword"
                                        :label="$t('auth.changePassword')"
                                    />
                                    <UButton
                                        type="button"
                                        color="neutral"
                                        variant="outline"
                                        :disabled="isChangingPassword"
                                        :label="$t('auth.clearForm')"
                                        @click="resetPasswordForm"
                                    />
                                </div>
                            </UForm>
                        </UCard>

                        <ApiTokensPanel v-if="activeSection === 'tokens'" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
