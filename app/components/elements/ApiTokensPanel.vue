<script lang="ts" setup>
interface ApiToken {
    id: string;
    name: string;
    prefix: string;
    expiresAt: string;
    lastUsedAt: string | null;
    revokedAt: string | null;
    createdAt: string;
    active: boolean;
}

const { t } = useI18n();

const tokens = ref<ApiToken[]>([]);
const isLoading = ref(false);
const isCreating = ref(false);
const error = ref('');
const newTokenName = ref('');
const newTokenHours = ref(24);
const issuedToken = ref('');
const copied = ref(false);

const loadTokens = async () => {
    isLoading.value = true;
    error.value = '';
    try {
        const res = await $fetch<{ tokens: ApiToken[] }>('/api/tokens');
        tokens.value = res.tokens;
    }
    catch (err) {
        error.value = err instanceof Error ? err.message : t('apiTokens.loadFailed');
    }
    finally {
        isLoading.value = false;
    }
};

const createToken = async () => {
    isCreating.value = true;
    error.value = '';
    issuedToken.value = '';
    try {
        const res = await $fetch<{ token: string }>('/api/tokens', {
            method: 'POST',
            body: { name: newTokenName.value, expiresInHours: newTokenHours.value },
        });
        issuedToken.value = res.token;
        newTokenName.value = '';
        await loadTokens();
    }
    catch (err) {
        error.value = err instanceof Error ? err.message : t('apiTokens.createFailed');
    }
    finally {
        isCreating.value = false;
    }
};

const revokeToken = async (id: string) => {
    error.value = '';
    try {
        await $fetch(`/api/tokens/${id}`, { method: 'DELETE' });
        await loadTokens();
    }
    catch (err) {
        error.value = err instanceof Error ? err.message : t('apiTokens.revokeFailed');
    }
};

const copyToken = async () => {
    await navigator.clipboard.writeText(issuedToken.value);
    copied.value = true;
    setTimeout(() => {
        copied.value = false;
    }, 2000);
};

const formatDate = (value: string | null) => {
    if (!value) return '—';
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleString();
};

onMounted(loadTokens);
</script>

<template>
    <UCard>
        <template #header>
            <div class="flex items-center gap-2 text-highlighted font-semibold">
                <UIcon
                    name="i-lucide-key-round"
                    class="size-5"
                />
                {{ $t('apiTokens.title') }}
            </div>
            <p class="mt-1 text-muted text-sm">
                {{ $t('apiTokens.description') }}
            </p>
        </template>

        <div class="space-y-6">
            <UAlert
                v-if="error"
                color="error"
                variant="soft"
                icon="i-lucide-circle-x"
                :description="error"
            />

            <UAlert
                v-if="issuedToken"
                color="secondary"
                variant="soft"
                icon="i-lucide-key-round"
                :title="$t('apiTokens.copyNow')"
            >
                <template #description>
                    <div class="flex items-center gap-2 mt-2">
                        <UKbd
                            class="flex-1 justify-start font-mono text-xs px-2 py-2 break-all"
                            :value="issuedToken"
                        />
                        <UButton
                            size="sm"
                            color="neutral"
                            variant="outline"
                            icon="i-lucide-copy"
                            :label="copied ? $t('apiTokens.copied') : $t('common.copy')"
                            @click="copyToken"
                        />
                    </div>
                </template>
            </UAlert>

            <div class="grid gap-3 sm:grid-cols-[1fr_auto_auto] sm:items-end">
                <UFormField
                    name="tokenName"
                    :label="$t('apiTokens.name')"
                >
                    <UInput
                        v-model="newTokenName"
                        :placeholder="$t('apiTokens.namePlaceholder')"
                        class="w-full"
                    />
                </UFormField>
                <UFormField
                    name="tokenHours"
                    :label="$t('apiTokens.expiresInHours')"
                >
                    <UInputNumber
                        v-model="newTokenHours"
                        :min="1"
                        :max="720"
                        class="sm:w-32"
                    />
                </UFormField>
                <UButton
                    color="secondary"
                    :loading="isCreating"
                    :label="$t('apiTokens.generate')"
                    @click="createToken"
                />
            </div>

            <div class="space-y-2">
                <div
                    v-if="isLoading"
                    class="space-y-2"
                >
                    <USkeleton
                        v-for="n in 2"
                        :key="n"
                        class="h-14 w-full"
                    />
                </div>
                <p
                    v-else-if="tokens.length === 0"
                    class="text-sm text-muted"
                >
                    {{ $t('apiTokens.empty') }}
                </p>
                <div
                    v-for="token in tokens"
                    v-else
                    :key="token.id"
                    class="flex items-center justify-between gap-3 border border-default rounded-md px-3 py-2"
                >
                    <div class="min-w-0">
                        <p class="text-sm font-medium truncate">
                            {{ token.name }}
                            <span class="text-xs text-dimmed font-mono">rff_{{ token.prefix }}…</span>
                        </p>
                        <p class="text-xs text-muted">
                            {{ $t('apiTokens.expires') }}: {{ formatDate(token.expiresAt) }}
                            · {{ $t('apiTokens.lastUsed') }}: {{ formatDate(token.lastUsedAt) }}
                        </p>
                    </div>
                    <div class="flex items-center gap-2 shrink-0">
                        <UBadge
                            :color="token.active ? 'secondary' : 'neutral'"
                            variant="subtle"
                            size="sm"
                            :label="token.active ? $t('apiTokens.active') : $t('apiTokens.inactive')"
                        />
                        <UButton
                            v-if="token.active"
                            size="sm"
                            color="error"
                            variant="ghost"
                            icon="i-lucide-trash-2"
                            :aria-label="$t('apiTokens.revoke')"
                            @click="revokeToken(token.id)"
                        />
                    </div>
                </div>
            </div>
        </div>
    </UCard>
</template>
