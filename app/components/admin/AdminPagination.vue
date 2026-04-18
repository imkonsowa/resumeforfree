<template>
    <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div class="text-xs sm:text-sm text-gray-700 order-2 sm:order-1">
            {{ $t('admin.pagination.showing', {
                from: (pagination.page - 1) * pagination.limit + 1,
                to: Math.min(pagination.page * pagination.limit, pagination.total),
                total: pagination.total,
            }) }}
        </div>
        <div class="flex items-center gap-2 order-1 sm:order-2">
            <Button
                variant="outline"
                size="sm"
                :disabled="currentPage === 1"
                @click="$emit('goToPage', currentPage - 1)"
            >
                <ChevronLeft class="w-4 h-4 rtl:hidden" />
                <ChevronRight class="w-4 h-4 hidden rtl:inline" />
                <span class="hidden sm:inline ms-1">{{ $t('admin.pagination.previous') }}</span>
            </Button>
            <div class="flex items-center gap-1">
                <Button
                    v-for="page in visiblePages"
                    :key="page"
                    variant="outline"
                    size="sm"
                    :class="{ 'bg-blue-50 border-blue-500 text-blue-600': page === currentPage }"
                    @click="$emit('goToPage', Number(page))"
                >
                    {{ page }}
                </Button>
            </div>
            <Button
                variant="outline"
                size="sm"
                :disabled="currentPage === pagination.totalPages"
                @click="$emit('goToPage', currentPage + 1)"
            >
                <span class="hidden sm:inline me-1">{{ $t('admin.pagination.next') }}</span>
                <ChevronRight class="w-4 h-4 rtl:hidden" />
                <ChevronLeft class="w-4 h-4 hidden rtl:inline" />
            </Button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ChevronLeft, ChevronRight } from 'lucide-vue-next';
import { Button } from '~/components/ui/button';
import type { Pagination } from '~/types/api';

const props = defineProps<{
    currentPage: number;
    pagination: Pagination;
}>();

defineEmits<{
    goToPage: [page: number];
}>();

// Show a compact window of pages centered around current (max 5 on mobile, 7 on desktop)
const visiblePages = computed(() => {
    const total = props.pagination.totalPages;
    const current = props.currentPage;
    const maxVisible = 5;

    if (total <= maxVisible) {
        return Array.from({ length: total }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisible / 2);
    let start = Math.max(1, current - half);
    const end = Math.min(total, start + maxVisible - 1);
    start = Math.max(1, end - maxVisible + 1);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});
</script>
