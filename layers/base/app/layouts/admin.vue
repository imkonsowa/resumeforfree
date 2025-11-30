<template>
    <div class="min-h-screen bg-gray-50">
        <!-- Sidebar -->
        <aside class="fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200">
            <div class="flex flex-col h-full">
                <!-- Logo/Brand -->
                <div class="flex items-center h-16 px-6 border-b border-gray-200">
                    <h1 class="text-xl font-bold text-gray-900">
                        {{ $t('admin.dashboard.title') }}
                    </h1>
                </div>

                <!-- Navigation -->
                <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    <NuxtLink
                        v-for="item in navigationItems"
                        :key="item.to"
                        :to="item.to"
                        class="flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors"
                        :class="isActiveRoute(item.to)
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-100'"
                    >
                        <component
                            :is="item.icon"
                            class="w-5 h-5 mr-3"
                        />
                        {{ $t(item.label) }}
                    </NuxtLink>
                </nav>

                <!-- User Section -->
                <div class="p-4 border-t border-gray-200">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div class="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
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
        <div class="pl-64">
            <!-- Top Bar -->
            <header class="sticky top-0 z-40 bg-white border-b border-gray-200">
                <div class="flex items-center justify-between h-16 px-6">
                    <div>
                        <h2 class="text-2xl font-semibold text-gray-900">
                            {{ currentPageTitle }}
                        </h2>
                    </div>
                    <div class="flex items-center space-x-4">
                        <Button
                            variant="outline"
                            size="sm"
                            @click="navigateTo('/')"
                        >
                            {{ $t('admin.viewSite') }}
                        </Button>
                    </div>
                </div>
            </header>

            <!-- Page Content -->
            <main class="p-6">
                <slot />
            </main>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { LayoutDashboard, Users, FileText, Mail, LogOut } from 'lucide-vue-next';
import { Button } from '~/components/ui/button';

const { t } = useI18n();
const route = useRoute();
const authStore = useAuthStore();
const router = useRouter();

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

const handleLogout = async () => {
    await authStore.logout();
    navigateTo('/auth/login');
};
</script>
