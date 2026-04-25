<script lang="ts" setup>
import { ArrowRight, Github, LogIn, LogOut, Menu, User, X } from 'lucide-vue-next';
import LanguageSelector from '~/components/elements/LanguageSelector.vue';
import Wordmark from '~/components/elements/Wordmark.vue';
import { Toaster } from '@/components/ui/sonner';
import 'vue-sonner/style.css';

const { t } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

const authStore = useAuthStore();
const isMobileMenuOpen = ref(false);
const { initializeSettingsFromServer, startSettingsSync, stopSettingsSync } = useSettingsSync();

const handleLogout = async () => {
    await authStore.logout();
    stopSettingsSync();
};

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false;
};

const navLinks = [
    { label: t('navigation.resumes', 'Your resumes'), path: '/resumes' },
    { label: t('navigation.builder'), path: '/builder' },
] as const;

const isActive = (path: string) => route.path === localePath(path) || route.path.startsWith(localePath(path) + '/');

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
    <div class="min-h-screen bg-white flex flex-col">
        <!-- ─── Nav ────────────────────────────────────────────────────────── -->
        <header class="sticky top-0 z-40 border-b border-rule bg-white/90 backdrop-blur">
            <div class="max-w-[1180px] mx-auto px-6">
                <div class="flex items-center justify-between h-[60px]">
                    <!-- Left: wordmark + nav links -->
                    <div class="flex items-center gap-7">
                        <NuxtLink :to="localePath('/')">
                            <Wordmark />
                        </NuxtLink>

                        <nav class="hidden md:flex items-center gap-1.5">
                            <NuxtLink
                                v-for="link in navLinks"
                                :key="link.path"
                                :to="localePath(link.path)"
                                class="px-2.5 py-1.5 rounded-md text-[13.5px] font-medium transition-colors bg-green-50 text-green-ink hover:bg-green-100"
                                :class="isActive(link.path) ? 'ring-1 ring-green-200' : ''"
                            >
                                {{ link.label }}
                            </NuxtLink>
                        </nav>
                    </div>

                    <!-- Right: lang + github + auth -->
                    <div class="hidden md:flex items-center gap-1.5">
                        <LanguageSelector
                            show-icon
                            button-variant="ghost"
                        />

                        <a
                            href="https://github.com/imkonsowa/resume-builder"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[13px] text-ink-3 hover:text-ink hover:bg-bg-2 transition-colors"
                        >
                            <Github class="w-[15px] h-[15px]" />
                            <span>{{ t('navigation.github', 'GitHub') }}</span>
                        </a>

                        <div class="w-px h-4 bg-rule mx-1" />

                        <ClientOnly>
                            <template v-if="!authStore.isLoggedIn">
                                <NuxtLink :to="localePath('/auth/login')">
                                    <button class="inline-flex items-center gap-1.5 h-[34px] px-3.5 rounded-lg text-[13px] font-medium text-ink border border-rule bg-white hover:bg-bg-2 transition-colors">
                                        <LogIn class="w-3.5 h-3.5" />
                                        {{ t('navigation.signIn') }}
                                    </button>
                                </NuxtLink>
                                <NuxtLink :to="localePath('/builder')">
                                    <button class="inline-flex items-center gap-1.5 h-[34px] px-3.5 rounded-lg text-[13px] font-medium text-white bg-green hover:bg-green-600 transition-colors">
                                        {{ t('navigation.startBuilding') }}
                                        <ArrowRight class="w-3.5 h-3.5" />
                                    </button>
                                </NuxtLink>
                            </template>
                            <template v-else>
                                <NuxtLink
                                    :to="localePath('/profile')"
                                    class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[13px] text-ink-3 hover:text-ink hover:bg-bg-2 transition-colors"
                                >
                                    <User class="w-4 h-4" />
                                    <span>{{ authStore.currentUser?.name || authStore.currentUser?.email }}</span>
                                </NuxtLink>
                                <button
                                    class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[13px] text-ink-3 hover:text-ink hover:bg-bg-2 transition-colors"
                                    @click="handleLogout"
                                >
                                    <LogOut class="w-4 h-4" />
                                    <span>{{ t('navigation.signOut') }}</span>
                                </button>
                            </template>
                        </ClientOnly>
                    </div>

                    <!-- Mobile hamburger -->
                    <button
                        class="md:hidden p-2 text-ink-3 hover:text-ink transition-colors"
                        :aria-label="isMobileMenuOpen ? t('navigation.closeMenu') : t('navigation.openMenu')"
                        @click="isMobileMenuOpen = !isMobileMenuOpen"
                    >
                        <Menu
                            v-if="!isMobileMenuOpen"
                            class="w-5 h-5"
                        />
                        <X
                            v-else
                            class="w-5 h-5"
                        />
                    </button>
                </div>
            </div>

            <!-- Mobile drawer -->
            <div
                v-if="isMobileMenuOpen"
                class="md:hidden border-t border-rule bg-white"
            >
                <div class="max-w-[1180px] mx-auto px-6 py-4 space-y-1">
                    <!-- Nav links -->
                    <NuxtLink
                        v-for="link in navLinks"
                        :key="link.path"
                        :to="localePath(link.path)"
                        class="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors bg-green-50 text-green-ink hover:bg-green-100"
                        :class="isActive(link.path) ? 'ring-1 ring-green-200' : ''"
                        @click="closeMobileMenu"
                    >
                        {{ link.label }}
                    </NuxtLink>

                    <a
                        href="https://github.com/imkonsowa/resume-builder"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium text-ink-3 hover:text-ink hover:bg-bg-2 transition-colors"
                        @click="closeMobileMenu"
                    >
                        <Github class="w-4 h-4" />
                        <span>{{ t('navigation.github', 'GitHub') }}</span>
                    </a>

                    <div class="h-px bg-rule my-2" />

                    <!-- Auth -->
                    <ClientOnly>
                        <div
                            v-if="!authStore.isLoggedIn"
                            class="flex flex-col gap-2 pt-1"
                        >
                            <NuxtLink
                                :to="localePath('/auth/login')"
                                @click="closeMobileMenu"
                            >
                                <button class="w-full inline-flex items-center justify-center gap-1.5 h-10 rounded-lg border border-rule text-sm font-medium text-ink bg-white hover:bg-bg-2 transition-colors">
                                    <LogIn class="w-4 h-4" />
                                    {{ t('navigation.signIn') }}
                                </button>
                            </NuxtLink>
                            <NuxtLink
                                :to="localePath('/builder')"
                                @click="closeMobileMenu"
                            >
                                <button class="w-full inline-flex items-center justify-center gap-1.5 h-10 rounded-lg text-sm font-medium text-white bg-green hover:bg-green-600 transition-colors">
                                    {{ t('navigation.startBuilding') }}
                                    <ArrowRight class="w-4 h-4" />
                                </button>
                            </NuxtLink>
                        </div>
                        <div
                            v-else
                            class="flex flex-col gap-1 pt-1"
                        >
                            <NuxtLink
                                :to="localePath('/profile')"
                                class="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-ink-3 hover:text-ink hover:bg-bg-2 transition-colors"
                                @click="closeMobileMenu"
                            >
                                <User class="w-4 h-4" />
                                <span>{{ authStore.currentUser?.name || authStore.currentUser?.email }}</span>
                            </NuxtLink>
                            <button
                                class="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-ink-3 hover:text-ink hover:bg-bg-2 transition-colors w-full"
                                @click="handleLogout(); closeMobileMenu()"
                            >
                                <LogOut class="w-4 h-4" />
                                <span>{{ t('navigation.signOut') }}</span>
                            </button>
                        </div>
                    </ClientOnly>
                </div>
            </div>
        </header>

        <main class="flex-1">
            <slot />
        </main>

        <!-- ─── Footer ────────────────────────────────────────────────────── -->
        <footer
            v-if="$route.path !== '/builder'"
            class="border-t border-rule bg-white pt-14 pb-7"
        >
            <div class="max-w-[1180px] mx-auto px-6">
                <!-- 4-column grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-10">
                    <!-- Wordmark + tagline -->
                    <div>
                        <Wordmark />
                        <p class="text-[13.5px] text-ink-4 mt-3 max-w-[320px] leading-relaxed">
                            {{ t('footer.tagline') }}
                        </p>
                    </div>

                    <!-- Product -->
                    <div>
                        <div class="text-[12px] uppercase tracking-[0.04em] font-semibold text-ink-4 mb-3">
                            {{ t('footer.productHeading') }}
                        </div>
                        <div class="space-y-1">
                            <NuxtLink
                                :to="localePath('/builder')"
                                class="block text-[13.5px] text-ink-3 hover:text-ink py-1 transition-colors"
                            >{{ t('footer.productLinks.builder') }}</NuxtLink>
                            <NuxtLink
                                :to="localePath('/resumes')"
                                class="block text-[13.5px] text-ink-3 hover:text-ink py-1 transition-colors"
                            >{{ t('footer.productLinks.yourResumes') }}</NuxtLink>
                        </div>
                    </div>

                    <!-- Resources -->
                    <div>
                        <div class="text-[12px] uppercase tracking-[0.04em] font-semibold text-ink-4 mb-3">
                            {{ t('footer.resourcesHeading') }}
                        </div>
                        <div class="space-y-1">
                            <NuxtLink
                                :to="localePath('/qa')"
                                class="block text-[13.5px] text-ink-3 hover:text-ink py-1 transition-colors"
                            >{{ t('navigation.qa') }}</NuxtLink>
                            <a
                                href="https://github.com/imkonsowa/resume-builder"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="block text-[13.5px] text-ink-3 hover:text-ink py-1 transition-colors"
                            >GitHub</a>
                        </div>
                    </div>

                    <!-- Support -->
                    <div>
                        <div class="text-[12px] uppercase tracking-[0.04em] font-semibold text-ink-4 mb-3">
                            {{ t('footer.supportHeading') }}
                        </div>
                        <div class="space-y-1">
                            <NuxtLink
                                :to="localePath('/contact')"
                                class="block text-[13.5px] text-ink-3 hover:text-ink py-1 transition-colors"
                            >{{ t('navigation.contact') }}</NuxtLink>
                            <NuxtLink
                                :to="localePath('/terms')"
                                class="block text-[13.5px] text-ink-3 hover:text-ink py-1 transition-colors"
                            >{{ t('footer.supportLinks.terms') }}</NuxtLink>
                        </div>
                    </div>
                </div>

                <!-- Bottom row -->
                <div class="flex flex-col sm:flex-row justify-between items-center gap-2 pt-5 border-t border-rule text-[12.5px] text-ink-4">
                    <div>
                        <i18n-t
                            keypath="footer.copyright"
                            tag="span"
                        >
                            <template #author>
                                <a
                                    href="https://konsowa.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="text-green-700 hover:text-green-ink underline underline-offset-2"
                                >Ibrahim Konsowa</a>
                            </template>
                        </i18n-t>
                    </div>
                    <div>{{ t('footer.noTracking') }}</div>
                </div>
            </div>
        </footer>

        <ClientOnly>
            <Toaster position="top-right" />
        </ClientOnly>
    </div>
</template>
