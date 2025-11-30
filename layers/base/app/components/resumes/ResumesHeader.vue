<template>
    <div class="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">
                    {{ $t('resumes.title') }}
                </h1>
                <ClientOnly>
                    <p class="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">
                        <span v-if="searchQuery && filteredCount !== resumeCount">
                            {{ filteredCount }} {{ $t('resumes.resumeCount.of') }} {{ resumeCount }} {{ resumeCount !== 1 ? $t('resumes.resumeCount.resumes') : $t('resumes.resumeCount.resume') }}
                        </span>
                        <span v-else>
                            {{ resumeCount }} {{ resumeCount !== 1 ? $t('resumes.resumeCount.resumes') : $t('resumes.resumeCount.resume') }} {{ $t('resumes.resumeCount.total') }}
                        </span>
                    </p>
                </ClientOnly>
            </div>
            <Button
                class="flex items-center gap-2 lg:hidden"
                size="sm"
                @click="$emit('create')"
            >
                <Plus class="w-4 h-4" />
                <span class="hidden xs:inline">{{ $t('resumes.actions.new') }}</span>
            </Button>
        </div>
        <div class="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div class="relative">
                <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                    :model-value="searchQuery"
                    class="pl-10 w-full sm:w-64"
                    :placeholder="$t('resumes.actions.searchPlaceholder')"
                    @update:model-value="$emit('update:searchQuery', $event)"
                />
            </div>
            <div class="flex gap-1 sm:gap-2">
                <Button
                    variant="outline"
                    class="flex items-center gap-1 sm:gap-2"
                    size="sm"
                    @click="$emit('import')"
                >
                    <Upload class="w-4 h-4" />
                    {{ $t('resumes.actions.import') }}
                </Button>
                <Button
                    v-if="resumeCount > 0"
                    variant="outline"
                    class="flex items-center gap-1 sm:gap-2"
                    size="sm"
                    @click="$emit('export')"
                >
                    <Download class="w-4 h-4" />
                    {{ $t('common.export') }}
                </Button>
                <Button
                    v-if="authStore.isLoggedIn && resumeCount > 0"
                    variant="outline"
                    class="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                    size="sm"
                    @click="$emit('cloudSync')"
                >
                    <Cloud class="w-4 h-4" />
                    <span class="sm:hidden">{{ $t('common.sync') }}</span>
                    <span class="hidden sm:inline">{{ $t('resumes.actions.cloudSync') }}</span>
                </Button>
                <Button
                    class="hidden lg:flex items-center gap-2"
                    @click="$emit('create')"
                >
                    <Plus class="w-4 h-4" />
                    {{ $t('resumes.actions.createNew') }}
                </Button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Cloud, Download, Plus, Search, Upload } from 'lucide-vue-next';

interface Props {
    searchQuery: string;
    resumeCount: number;
    filteredCount: number;
}

defineProps<Props>();

defineEmits<{
    'update:searchQuery': [value: string];
    'import': [];
    'export': [];
    'create': [];
    'cloudSync': [];
}>();

const authStore = useAuthStore();
</script>
