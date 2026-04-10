<template>
    <div class="space-y-4 sm:space-y-6">
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <!-- Total Users -->
            <Card>
                <CardHeader class="flex flex-row items-center justify-between pb-2 px-4 pt-4">
                    <CardTitle class="text-xs sm:text-sm font-medium text-gray-600">
                        {{ $t('admin.dashboard.totalUsers') }}
                    </CardTitle>
                    <Users class="w-4 h-4 text-gray-400 shrink-0" />
                </CardHeader>
                <CardContent class="px-4 pb-4">
                    <div class="text-xl sm:text-2xl font-bold">
                        {{ stats.totalUsers }}
                    </div>
                </CardContent>
            </Card>

            <!-- Total Resumes -->
            <Card>
                <CardHeader class="flex flex-row items-center justify-between pb-2 px-4 pt-4">
                    <CardTitle class="text-xs sm:text-sm font-medium text-gray-600">
                        {{ $t('admin.dashboard.totalResumes') }}
                    </CardTitle>
                    <FileText class="w-4 h-4 text-gray-400 shrink-0" />
                </CardHeader>
                <CardContent class="px-4 pb-4">
                    <div class="text-xl sm:text-2xl font-bold">
                        {{ stats.totalResumes }}
                    </div>
                </CardContent>
            </Card>

            <!-- Total Downloads -->
            <Card>
                <CardHeader class="flex flex-row items-center justify-between pb-2 px-4 pt-4">
                    <CardTitle class="text-xs sm:text-sm font-medium text-gray-600">
                        {{ $t('admin.dashboard.totalDownloads') }}
                    </CardTitle>
                    <Download class="w-4 h-4 text-gray-400 shrink-0" />
                </CardHeader>
                <CardContent class="px-4 pb-4">
                    <div class="text-xl sm:text-2xl font-bold">
                        {{ stats.totalDownloads }}
                    </div>
                </CardContent>
            </Card>

            <!-- Total Messages -->
            <Card>
                <CardHeader class="flex flex-row items-center justify-between pb-2 px-4 pt-4">
                    <CardTitle class="text-xs sm:text-sm font-medium text-gray-600">
                        {{ $t('admin.dashboard.totalMessages') }}
                    </CardTitle>
                    <Mail class="w-4 h-4 text-gray-400 shrink-0" />
                </CardHeader>
                <CardContent class="px-4 pb-4">
                    <div class="text-xl sm:text-2xl font-bold">
                        {{ stats.totalMessages }}
                    </div>
                    <p
                        v-if="stats.newMessages > 0"
                        class="text-xs text-blue-600 mt-1"
                    >
                        {{ stats.newMessages }} new
                    </p>
                </CardContent>
            </Card>
        </div>

        <!-- Quick Actions -->
        <Card>
            <CardHeader class="px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
                <CardTitle class="text-base sm:text-lg">
                    {{ $t('common.quickActions') }}
                </CardTitle>
            </CardHeader>
            <CardContent class="px-4 pb-4 sm:px-6 sm:pb-6">
                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    <Button
                        variant="outline"
                        class="justify-start"
                        @click="navigateTo('/admin/users')"
                    >
                        <Users class="w-4 h-4 me-2" />
                        {{ $t('admin.nav.users') }}
                    </Button>
                    <Button
                        variant="outline"
                        class="justify-start"
                        @click="navigateTo('/admin/resumes')"
                    >
                        <FileText class="w-4 h-4 me-2" />
                        {{ $t('admin.nav.resumes') }}
                    </Button>
                    <Button
                        variant="outline"
                        class="justify-start"
                        @click="navigateTo('/admin/contact-messages')"
                    >
                        <Mail class="w-4 h-4 me-2" />
                        {{ $t('admin.nav.contactMessages') }}
                    </Button>
                </div>
            </CardContent>
        </Card>

        <!-- Loading State -->
        <div
            v-if="loading"
            class="text-center py-12"
        >
            <p class="text-gray-500">
                {{ $t('common.loading') }}
            </p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Users, FileText, Mail, Download } from 'lucide-vue-next';
import { Card, CardHeader, CardTitle, CardContent } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { toast } from 'vue-sonner';

definePageMeta({
    middleware: 'admin',
    layout: 'admin',
});

const { t } = useI18n();

const stats = ref({
    totalUsers: 0,
    totalResumes: 0,
    totalMessages: 0,
    newMessages: 0,
    totalDownloads: 0,
});

const loading = ref(true);

const fetchStats = async () => {
    loading.value = true;
    try {
        const data = await $fetch('/api/admin/stats');
        stats.value = data;
    }
    catch (error) {
        console.error('Error fetching stats:', error);
        toast.error(t('common.error'));
    }
    finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchStats();
});
</script>
