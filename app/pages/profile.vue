<script lang="ts" setup>
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
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
                        <Card>
                            <CardContent class="p-4">
                                <nav class="space-y-1">
                                    <button
                                        class="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-left"
                                        :class="activeSection === 'personal' ? 'bg-secondary/10 text-secondary font-medium' : 'text-default hover:bg-elevated'"
                                        @click="activeSection = 'personal'"
                                    >
                                        <UIcon name="i-lucide-user" class="w-4 h-4" />
                                        {{ $t('profile.personalInformation') }}
                                    </button>
                                    <button
                                        class="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-left"
                                        :class="activeSection === 'password' ? 'bg-secondary/10 text-secondary font-medium' : 'text-default hover:bg-elevated'"
                                        @click="activeSection = 'password'"
                                    >
                                        <UIcon name="i-lucide-lock" class="w-4 h-4" />
                                        {{ $t('auth.changePassword') }}
                                    </button>
                                    <button
                                        class="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors text-left"
                                        :class="activeSection === 'tokens' ? 'bg-secondary/10 text-secondary font-medium' : 'text-default hover:bg-elevated'"
                                        @click="activeSection = 'tokens'"
                                    >
                                        <UIcon name="i-lucide-key-round" class="w-4 h-4" />
                                        {{ $t('apiTokens.title') }}
                                    </button>
                                </nav>
                            </CardContent>
                        </Card>
                    </div>

                    <div class="md:col-span-3">
                        <Card v-if="activeSection === 'personal'">
                            <CardHeader>
                                <CardTitle class="flex items-center gap-2">
                                    <UIcon name="i-lucide-user" class="w-5 h-5" />
                                    {{ $t('profile.personalInformation') }}
                                </CardTitle>
                                <CardDescription>
                                    {{ $t('profile.viewAndManage') }}
                                </CardDescription>
                            </CardHeader>
                            <CardContent class="space-y-8">
                                <div class="space-y-6">
                                    <div>
                                        <label
                                            for="name"
                                            class="text-sm font-medium text-default mb-2 block"
                                        >{{ $t('common.name') }}</label>
                                        <div class="p-4 bg-muted rounded-lg border border-default text-base">
                                            {{ authStore.currentUser?.name || $t('profile.notProvided') }}
                                        </div>
                                    </div>
                                    <div>
                                        <label
                                            for="email"
                                            class="text-sm font-medium text-default mb-2 block"
                                        >{{ $t('common.emailAddress') }}</label>
                                        <div class="p-4 bg-muted rounded-lg border border-default text-base">
                                            {{ authStore.currentUser?.email }}
                                        </div>
                                    </div>
                                </div>

                                <USeparator />

                                <div class="bg-secondary/10 border border-secondary/30 rounded-lg p-4">
                                    <div class="flex items-start gap-3">
                                        <div class="w-5 h-5 text-secondary mt-0.5">
                                            ℹ️
                                        </div>
                                        <div>
                                            <h4 class="text-sm font-medium text-secondary mb-1">
                                                {{ $t('profile.accountInformation') }}
                                            </h4>
                                            <p class="text-sm text-secondary">
                                                {{ $t('profile.accountInfoDescription') }}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card v-if="activeSection === 'password'">
                            <CardHeader>
                                <CardTitle class="flex items-center gap-2">
                                    <UIcon name="i-lucide-lock" class="w-5 h-5" />
                                    {{ $t('auth.changePassword') }}
                                </CardTitle>
                                <CardDescription>
                                    {{ $t('profile.updatePasswordDescription') }}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form
                                    class="space-y-6"
                                    @submit.prevent="handleChangePassword"
                                >
                                    <div
                                        v-if="passwordErrors.length > 0"
                                        class="bg-red-50 border border-red-200 rounded-md p-4"
                                    >
                                        <div class="flex items-start gap-3">
                                            <div class="w-5 h-5 text-red-600 mt-0.5">
                                                ⚠️
                                            </div>
                                            <div>
                                                <h4 class="text-sm font-medium text-red-900 mb-2">
                                                    {{ $t('profile.pleaseFixErrors') }}
                                                </h4>
                                                <ul class="text-sm text-red-700 space-y-1">
                                                    <li
                                                        v-for="error in passwordErrors"
                                                        :key="error"
                                                    >
                                                        • {{ error }}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            for="current-password"
                                            class="text-sm font-medium text-default"
                                        >{{ $t('auth.currentPassword') }}</label>
                                        <div class="relative mt-1">
                                            <UInput
                                                id="current-password"
                                                v-model="passwordForm.currentPassword"
                                                :type="showCurrentPassword ? 'text' : 'password'"
                                                :placeholder="$t('auth.enterCurrentPassword')"
                                                class="pr-10"
                                                :disabled="isChangingPassword"
                                                required
                                            />
                                            <button
                                                type="button"
                                                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                @click="showCurrentPassword = !showCurrentPassword"
                                            >
                                                <UIcon name="i-lucide-eye"
                                                    v-if="!showCurrentPassword"
                                                    class="w-4 h-4 text-dimmed"
                                                />
                                                <UIcon name="i-lucide-eye-off"
                                                    v-else
                                                    class="w-4 h-4 text-dimmed"
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            for="new-password"
                                            class="text-sm font-medium text-default"
                                        >{{ $t('auth.newPassword') }}</label>
                                        <div class="relative mt-1">
                                            <UInput
                                                id="new-password"
                                                v-model="passwordForm.newPassword"
                                                :type="showNewPassword ? 'text' : 'password'"
                                                :placeholder="$t('auth.enterNewPassword')"
                                                class="pr-10"
                                                :disabled="isChangingPassword"
                                                required
                                                minlength="8"
                                            />
                                            <button
                                                type="button"
                                                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                @click="showNewPassword = !showNewPassword"
                                            >
                                                <UIcon name="i-lucide-eye"
                                                    v-if="!showNewPassword"
                                                    class="w-4 h-4 text-dimmed"
                                                />
                                                <UIcon name="i-lucide-eye-off"
                                                    v-else
                                                    class="w-4 h-4 text-dimmed"
                                                />
                                            </button>
                                        </div>
                                        <p class="mt-1 text-xs text-muted">
                                            {{ $t('auth.passwordMinLengthHint') }}
                                        </p>
                                    </div>

                                    <div>
                                        <label
                                            for="confirm-password"
                                            class="text-sm font-medium text-default"
                                        >{{ $t('auth.confirmNewPassword') }}</label>
                                        <div class="relative mt-1">
                                            <UInput
                                                id="confirm-password"
                                                v-model="passwordForm.confirmPassword"
                                                :type="showConfirmPassword ? 'text' : 'password'"
                                                :placeholder="$t('auth.confirmNewPassword')"
                                                class="pr-10"
                                                :disabled="isChangingPassword"
                                                required
                                            />
                                            <button
                                                type="button"
                                                class="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                @click="showConfirmPassword = !showConfirmPassword"
                                            >
                                                <UIcon name="i-lucide-eye"
                                                    v-if="!showConfirmPassword"
                                                    class="w-4 h-4 text-dimmed"
                                                />
                                                <UIcon name="i-lucide-eye-off"
                                                    v-else
                                                    class="w-4 h-4 text-dimmed"
                                                />
                                            </button>
                                        </div>
                                    </div>

                                    <div class="flex gap-3 pt-4">
                                        <UButton
                                            type="submit"
                                            :disabled="isChangingPassword"
                                            class="flex items-center gap-2" icon="i-lucide-lock">
{{ isChangingPassword ? $t('auth.changingPassword') : $t('auth.changePassword') }}
</UButton>
                                        <UButton
                                            type="button" color="neutral" variant="outline"
                                            :disabled="isChangingPassword"
                                            @click="passwordForm = { currentPassword: '', newPassword: '', confirmPassword: '' }; passwordErrors = []"
                                        >
                                            {{ $t('auth.clearForm') }}
                                        </UButton>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>

                        <ApiTokensPanel v-if="activeSection === 'tokens'" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
