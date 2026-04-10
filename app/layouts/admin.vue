<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Mobile overlay -->
        <div
            v-if="sidebarOpen"
            class="fixed inset-0 z-40 bg-black/50 lg:hidden"
            @click="sidebarOpen = false"
        />

        <!-- Sidebar -->
        <aside
            class="fixed inset-y-0 start-0 z-50 w-64 bg-white border-e border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0"
            :class="sidebarOpen ? 'translate-x-0' : 'rtl:translate-x-full -translate-x-full'"
        >
            <div class="flex flex-col h-full">
                <!-- Logo/Brand -->
                <div class="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-gray-200">
                    <h1 class="text-lg sm:text-xl font-bold text-gray-900">
                        {{ $t('admin.dashboard.title') }}
                    </h1>
                    <Button
                        variant="ghost"
                        size="sm"
                        class="lg:hidden"
                        @click="sidebarOpen = false"
                    >
                        <X class="w-5 h-5" />
                    </Button>
                </div>

                <!-- Navigation -->
                <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    <NuxtLink
                        v-for="item in navigationItems"
                        :key="item.to"
                        :to="item.to"
                        class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                        :class="isActiveRoute(item.to)
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-100'"
                        @click="sidebarOpen = false"
                    >
                        <component
                            :is="item.icon"
                            class="w-5 h-5 me-3 shrink-0"
                        />
                        <span class="truncate">{{ $t(item.label) }}</span>
                    </NuxtLink>
                </nav>

                <!-- User Section -->
                <div class="p-4 border-t border-gray-200">
                    <div class="flex items-center justify-between gap-2">
                        <div class="flex items-center gap-3 min-w-0">
                            <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                                <span class="text-sm font-medium text-white">
                                    {{ userInitial }}
                                </span>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="text-sm font-medium text-gray-900 truncate">
                                    {{ authStore.user?.email }}
                                </p>
                                <p class="text-xs text-gray-500">
                                    {{ $t('admin.role') }}
                                </p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            @click="handleLogout"
                        >
                            <LogOut class="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <div class="lg:ps-64">
            <!-- Top Bar -->
            <header class="sticky top-0 z-30 bg-white border-b border-gray-200">
                <div class="flex items-center justify-between gap-3 h-14 sm:h-16 px-3 sm:px-6">
                    <div class="flex items-center gap-2 min-w-0 flex-1">
                        <Button
                            variant="ghost"
                            size="sm"
                            class="lg:hidden shrink-0"
                            @click="sidebarOpen = true"
                        >
                            <Menu class="w-5 h-5" />
                        </Button>
                        <h2 class="text-base sm:text-xl md:text-2xl font-semibold text-gray-900 truncate">
                            {{ currentPageTitle }}
                        </h2>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        class="shrink-0"
                        @click="navigateTo('/')"
                    >
                        <span class="hidden sm:inline">{{ $t('admin.viewSite') }}</span>
                        <Home class="w-4 h-4 sm:hidden" />
                    </Button>
                </div>
            </header>

            <!-- Page Content -->
            <main class="p-3 sm:p-4 md:p-6">
                <slot />
            </main>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { LayoutDashboard, Users, FileText, Mail, LogOut, Menu, X, Home } from 'lucide-vue-next';
import { Button } from '~/components/ui/button';

const { t } = useI18n();
const route = useRoute();
const authStore = useAuthStore();

const sidebarOpen = ref(false);

const navigationItems = [
    {
        to: '/admin',
        label: 'admin.nav.dashboard',
        icon: LayoutDashboard,
    },
    {
        to: '/admin/users',
        label: 'admin.nav.users',
        icon: Users,
    },
    {
        to: '/admin/resumes',
        label: 'admin.nav.resumes',
        icon: FileText,
    },
    {
        to: '/admin/contact-messages',
        label: 'admin.nav.contactMessages',
        icon: Mail,
    },
];

const isActiveRoute = (path: string) => {
    if (path === '/admin') {
        return route.path === '/admin';
    }
    return route.path.startsWith(path);
};

const currentPageTitle = computed(() => {
    const item = navigationItems.find(item => isActiveRoute(item.to));
    return item ? t(item.label) : t('admin.dashboard.title');
});

const userInitial = computed(() => {
    const email = authStore.user?.email || '';
    return email.charAt(0).toUpperCase();
});

// Close sidebar on route change
watch(() => route.path, () => {
    sidebarOpen.value = false;
});

const handleLogout = async () => {
    await authStore.logout();
    navigateTo('/auth/login');
};
</script>
