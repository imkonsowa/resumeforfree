<template>
    <div class="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-2xl sm:text-3xl font-bold text-highlighted">
                    {{ $t('resumes.title') }}
                </h1>
                <ClientOnly>
                    <p class="text-toned mt-1 sm:mt-2 text-sm sm:text-base">
                        <span v-if="searchQuery && filteredCount !== resumeCount">
                            {{ filteredCount }} {{ $t('resumes.resumeCount.of') }} {{ resumeCount }} {{ resumeCount !== 1 ? $t('resumes.resumeCount.resumes') : $t('resumes.resumeCount.resume') }}
                        </span>
                        <span v-else>
                            {{ resumeCount }} {{ resumeCount !== 1 ? $t('resumes.resumeCount.resumes') : $t('resumes.resumeCount.resume') }} {{ $t('resumes.resumeCount.total') }}
                        </span>
                    </p>
                </ClientOnly>
            </div>
            <UButton
                class="flex items-center gap-2 lg:hidden"
                size="sm"
                @click="$emit('create')" icon="i-lucide-plus">
<span class="hidden xs:inline">{{ $t('resumes.actions.new') }}</span>
</UButton>
        </div>
        <div class="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div class="relative">
                <UIcon name="i-lucide-search" class="absolute left-3 top-1/2 transform -translate-y-1/2 text-dimmed w-4 h-4" />
                <UInput
                    :model-value="searchQuery"
                    class="pl-10 w-full sm:w-64"
                    :placeholder="$t('resumes.actions.searchPlaceholder')"
                    @update:model-value="$emit('update:searchQuery', $event)"
                />
            </div>
            <div class="flex gap-1 sm:gap-2">
                <UButton color="neutral" variant="outline"
                    class="flex items-center gap-1 sm:gap-2"
                    size="sm"
                    @click="$emit('import')" icon="i-lucide-upload">
{{ $t('resumes.actions.import') }}
</UButton>
                <UButton
                    v-if="resumeCount trailing-icon="i-lucide-download">
0"
                    variant="outline"
                    class="flex items-center gap-1 sm:gap-2"
                    size="sm"
                    @click="$emit('export')"
                >
                    
                    {{ $t('common.export') }}
</UButton>
                <UButton
                    v-if="authStore.isLoggedIn && resumeCount trailing-icon="i-lucide-cloud">
0"
                    variant="outline"
                    class="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                    size="sm"
                    @click="$emit('cloudSync')"
                >
                    
                    <span class="sm:hidden">{{ $t('common.sync') }}</span>
                    <span class="hidden sm:inline">{{ $t('resumes.actions.cloudSync') }}</span>
</UButton>
                <UButton
                    class="hidden lg:flex items-center gap-2"
                    @click="$emit('create')" icon="i-lucide-plus">
{{ $t('resumes.actions.createNew') }}
</UButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

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
