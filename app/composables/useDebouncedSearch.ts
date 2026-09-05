import { ref, watch, type Ref } from 'vue';

interface UseDebouncedSearchOptions {
    debounceMs?: number;
    minLength?: number;
}

interface UseDebouncedSearchReturn {
    searchQuery: Ref<string>;
    debouncedQuery: Ref<string>;
    isSearching: Ref<boolean>;
    abortController: Ref<AbortController | null>;
}

export function useDebouncedSearch(options: UseDebouncedSearchOptions = {}): UseDebouncedSearchReturn {
    const { debounceMs = 300, minLength = 0 } = options;

    const searchQuery = ref<string>('');
    const debouncedQuery = ref<string>('');
    const isSearching = ref<boolean>(false);
    const abortController = ref<AbortController | null>(null);

    let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

    watch(searchQuery, (newQuery) => {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        if (abortController.value) {
            abortController.value.abort();
            abortController.value = null;
        }

        if (!newQuery || newQuery.length < minLength) {
            debouncedQuery.value = '';
            isSearching.value = false;
            return;
        }

        debounceTimeout = setTimeout(() => {
            debouncedQuery.value = newQuery;
            abortController.value = new AbortController();
        }, debounceMs);
    });

    onUnmounted(() => {
        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }
        if (abortController.value) {
            abortController.value.abort();
        }
    });

    return {
        searchQuery,
        debouncedQuery,
        isSearching,
        abortController,
    };
}
