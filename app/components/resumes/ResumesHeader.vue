<script lang="ts" setup>
import type { DropdownMenuItem } from '@nuxt/ui';

interface Props {
    searchQuery: string;
    resumeCount: number;
    filteredCount: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
    'update:searchQuery': [value: string];
    'import': [];
    'export': [];
    'create': [];
    'cloudSync': [];
}>();

const { t } = useI18n();
const authStore = useAuthStore();

const jsonMenuItems = computed<DropdownMenuItem[][]>(() => [[
    {
        label: t('resumes.actions.importJson'),
        icon: 'i-lucide-upload',
        onSelect: () => emit('import'),
    },
    {
        label: t('resumes.actions.exportJson'),
        icon: 'i-lucide-download',
        disabled: props.resumeCount === 0,
        onSelect: () => emit('export'),
    },
]]);
</script>

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
                class="lg:hidden"
                size="sm"
                icon="i-lucide-plus"
                @click="$emit('create')"
            >
                <span class="hidden xs:inline">{{ $t('resumes.actions.new') }}</span>
            </UButton>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 sm:items-center">
            <UInput
                :model-value="searchQuery"
                icon="i-lucide-search"
                class="w-full sm:w-64"
                :placeholder="$t('resumes.actions.searchPlaceholder')"
                @update:model-value="$emit('update:searchQuery', $event)"
            />

            <div class="flex gap-1 sm:gap-2">
                <UButton
                    v-if="authStore.isLoggedIn && resumeCount > 0"
                    color="neutral"
                    variant="outline"
                    size="sm"
                    icon="i-lucide-cloud"
                    @click="$emit('cloudSync')"
                >
                    <span class="sm:hidden">{{ $t('common.sync') }}</span>
                    <span class="hidden sm:inline">{{ $t('resumes.actions.cloudSync') }}</span>
                </UButton>
                <UButton
                    class="hidden lg:inline-flex"
                    icon="i-lucide-plus"
                    :label="$t('resumes.actions.createNew')"
                    @click="$emit('create')"
                />
                <UDropdownMenu
                    :items="jsonMenuItems"
                    :content="{ align: 'end' }"
                >
                    <UButton
                        color="neutral"
                        variant="outline"
                        size="sm"
                        icon="i-lucide-more-vertical"
                        :aria-label="$t('common.moreActions')"
                    />
                </UDropdownMenu>
            </div>
        </div>
    </div>
</template>
