<script lang="ts" setup>
import type { FooterColumn, NavigationMenuItem } from '@nuxt/ui';
import LanguageSelector from '~/components/elements/LanguageSelector.vue';
import Wordmark from '~/components/elements/Wordmark.vue';

const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

const authStore = useAuthStore();
const { initializeSettingsFromServer, startSettingsSync, stopSettingsSync } = useSettingsSync();

const REPO_URL = 'https://github.com/imkonsowa/resume-builder';

const handleLogout = async () => {
    await authStore.logout();
    stopSettingsSync();
};

const navItems = computed<NavigationMenuItem[]>(() => [
    { label: t('navigation.resumes', 'Your resumes'), to: localePath('/resumes') },
    { label: t('navigation.builder'), to: localePath('/builder') },
]);

const footerColumns = computed<FooterColumn[]>(() => [
    {
        label: t('footer.productHeading'),
        children: [
            { label: t('footer.productLinks.builder'), to: localePath('/builder') },
            { label: t('footer.productLinks.yourResumes'), to: localePath('/resumes') },
        ],
    },
    {
        label: t('footer.resourcesHeading'),
        children: [
            { label: t('navigation.qa'), to: localePath('/qa') },
            { label: 'GitHub', to: REPO_URL, target: '_blank' },
        ],
    },
    {
        label: t('footer.supportHeading'),
        children: [
            { label: t('navigation.contact'), to: localePath('/contact') },
            { label: t('footer.supportLinks.terms'), to: localePath('/terms') },
        ],
    },
]);

const showFooter = computed(() => route.path !== localePath('/builder'));

onMounted(async () => {
    await authStore.initializeAuth();

    if (authStore.isAuthenticated) {
        await initializeSettingsFromServer();
        startSettingsSync();
    }
});

watch(
    () => authStore.isAuthenticated,
    async (isAuthenticated) => {
        if (isAuthenticated) {
            await initializeSettingsFromServer();
            startSettingsSync();
        }
        else {
            stopSettingsSync();
        }
    },
);
</script>

<template>
    <div class="min-h-screen flex flex-col">
        <UHeader :ui="{ left: 'lg:flex-1 flex items-center gap-6 min-w-0' }">
            <template #left>
                <NuxtLink
                    :to="localePath('/')"
                    aria-label="ResumeForFree"
                    class="shrink-0"
                >
                    <Wordmark />
                </NuxtLink>

                <UNavigationMenu
                    :items="navItems"
                    class="hidden lg:flex"
                />
            </template>

            <template #right>
                <div class="hidden lg:flex items-center gap-1.5">
                    <LanguageSelector
                        show-icon
                        size="sm"
                        button-variant="ghost"
                    />

                    <UColorModeButton />

                    <UButton
                        :to="REPO_URL"
                        target="_blank"
                        icon="i-lucide-github"
                        color="neutral"
                        variant="ghost"
                        size="sm"
                        :aria-label="t('navigation.github', 'GitHub')"
                    />

                    <USeparator
                        orientation="vertical"
                        class="h-5 mx-1.5"
                    />
                </div>

                <ClientOnly>
                    <template v-if="!authStore.isLoggedIn">
                        <UButton
                            :to="localePath('/auth/login')"
                            :label="t('navigation.signIn')"
                            color="neutral"
                            variant="ghost"
                            size="sm"
                            class="hidden lg:inline-flex"
                        />
                        <UButton
                            :to="localePath('/builder')"
                            :label="t('navigation.startBuilding')"
                            icon="i-lucide-file-plus"
                            color="secondary"
                            size="sm"
                            class="hidden sm:inline-flex"
                        />
                    </template>
                    <template v-else>
                        <UButton
                            :to="localePath('/profile')"
                            icon="i-lucide-user"
                            color="neutral"
                            variant="ghost"
                            size="sm"
                            class="hidden lg:inline-flex max-w-[180px]"
                        >
                            <span class="truncate">
                                {{ authStore.currentUser?.name || authStore.currentUser?.email }}
                            </span>
                        </UButton>
                        <UButton
                            icon="i-lucide-log-out"
                            color="neutral"
                            variant="ghost"
                            size="sm"
                            class="hidden lg:inline-flex"
                            :aria-label="t('navigation.signOut')"
                            @click="handleLogout"
                        />
                    </template>
                </ClientOnly>
            </template>

            <template #body>
                <UNavigationMenu
                    :items="navItems"
                    orientation="vertical"
                    class="-mx-2.5"
                />

                <USeparator class="my-4" />

                <div class="flex flex-col gap-2">
                    <ClientOnly>
                        <template v-if="!authStore.isLoggedIn">
                            <UButton
                                :to="localePath('/builder')"
                                :label="t('navigation.startBuilding')"
                                icon="i-lucide-file-plus"
                                color="secondary"
                                size="lg"
                                block
                            />
                            <UButton
                                :to="localePath('/auth/login')"
                                :label="t('navigation.signIn')"
                                icon="i-lucide-log-in"
                                color="neutral"
                                variant="outline"
                                size="lg"
                                block
                            />
                        </template>
                        <template v-else>
                            <UButton
                                :to="localePath('/profile')"
                                :label="authStore.currentUser?.name || authStore.currentUser?.email"
                                icon="i-lucide-user"
                                color="neutral"
                                variant="outline"
                                size="lg"
                                block
                            />
                            <UButton
                                :label="t('navigation.signOut')"
                                icon="i-lucide-log-out"
                                color="neutral"
                                variant="ghost"
                                size="lg"
                                block
                                @click="handleLogout"
                            />
                        </template>
                    </ClientOnly>
                </div>

                <USeparator class="my-4" />

                <div class="flex items-center justify-between gap-2">
                    <LanguageSelector
                        show-icon
                        size="md"
                        button-variant="outline"
                    />
                    <div class="flex items-center gap-1">
                        <UColorModeButton />
                        <UButton
                            :to="REPO_URL"
                            target="_blank"
                            icon="i-lucide-github"
                            color="neutral"
                            variant="ghost"
                            :aria-label="t('navigation.github', 'GitHub')"
                        />
                    </div>
                </div>
            </template>
        </UHeader>

        <UMain class="flex-1">
            <slot />
        </UMain>

        <UFooter v-if="showFooter">
            <template #top>
                <UContainer>
                    <UFooterColumns :columns="footerColumns">
                        <template #left>
                            <Wordmark />
                            <p class="text-sm text-muted mt-3 max-w-[320px] leading-relaxed">
                                {{ t('footer.tagline') }}
                            </p>
                        </template>
                    </UFooterColumns>
                </UContainer>
            </template>

            <template #left>
                <i18n-t
                    keypath="footer.copyright"
                    tag="span"
                    class="text-sm text-muted"
                >
                    <template #author>
                        <ULink
                            to="https://konsowa.com"
                            target="_blank"
                            class="text-secondary hover:text-secondary/80 underline underline-offset-2"
                        >
                            Ibrahim Konsowa
                        </ULink>
                    </template>
                </i18n-t>
            </template>

            <template #right>
                <span class="text-sm text-muted">{{ t('footer.noTracking') }}</span>
            </template>
        </UFooter>
    </div>
</template>
