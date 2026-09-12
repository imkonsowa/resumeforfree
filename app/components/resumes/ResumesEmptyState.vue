<template>
    <div class="text-center py-16">
        <div v-if="type === 'no-resumes'">
            <UIcon name="i-lucide-file-text" class="w-24 h-24 text-dimmed mx-auto mb-4" />
            <h2 class="text-2xl font-semibold text-highlighted mb-2">
                {{ $t('resumes.empty.noResumes') }}
            </h2>
            <p class="text-toned mb-6">
                {{ $t('resumes.empty.createFirst') }}
            </p>
            <UButton
                size="lg"
                @click="$emit('create')"
            >
                {{ $t('resumes.empty.createFirstButton') }}
            </UButton>
        </div>
        <div v-else-if="type === 'no-search-results'">
            <UIcon name="i-lucide-search" class="w-24 h-24 text-dimmed mx-auto mb-4" />
            <h2 class="text-2xl font-semibold text-highlighted mb-2">
                {{ $t('resumes.empty.noResults') }}
            </h2>
            <p class="text-toned mb-6">
                {{ $t('resumes.empty.noResultsMessage') }} "{{ searchQuery }}"
            </p>
            <div class="flex gap-3 justify-center">
                <UButton color="neutral" variant="outline"
                    @click="$emit('clear-search')"
                >
                    {{ $t('resumes.empty.clearSearch') }}
                </UButton>
                <UButton @click="$emit('create')">
                    {{ $t('resumes.empty.createNew') }}
                </UButton>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

interface Props {
    type: 'no-resumes' | 'no-search-results';
    searchQuery?: string;
}

defineProps<Props>();

defineEmits<{
    'create': [];
    'clear-search': [];
}>();
</script>
