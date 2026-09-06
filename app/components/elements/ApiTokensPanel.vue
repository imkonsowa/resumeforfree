<script lang="ts" setup>
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import { Copy, KeyRound, Trash2 } from 'lucide-vue-next';

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
    <Card>
        <CardHeader>
            <CardTitle class="flex items-center gap-2">
                <KeyRound class="w-5 h-5" />
                {{ $t('apiTokens.title') }}
            </CardTitle>
            <CardDescription>
                {{ $t('apiTokens.description') }}
            </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
            <p
                v-if="error"
                class="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3"
            >
                {{ error }}
            </p>

            <div
                v-if="issuedToken"
                class="rounded-md border border-green-200 bg-green-50 p-4 space-y-2"
            >
                <p class="text-sm font-medium text-green-ink">
                    {{ $t('apiTokens.copyNow') }}
                </p>
                <div class="flex items-center gap-2">
                    <code class="flex-1 text-xs bg-white border border-green-200 rounded px-2 py-2 break-all">{{ issuedToken }}</code>
                    <Button
                        size="sm"
                        variant="outline"
                        @click="copyToken"
                    >
                        <Copy class="w-4 h-4 me-1" />
                        {{ copied ? $t('apiTokens.copied') : $t('common.copy') }}
                    </Button>
                </div>
            </div>

            <div class="grid gap-3 sm:grid-cols-[1fr_auto_auto] sm:items-end">
                <div class="space-y-1">
                    <Label for="token-name">{{ $t('apiTokens.name') }}</Label>
                    <Input
                        id="token-name"
                        v-model="newTokenName"
                        :placeholder="$t('apiTokens.namePlaceholder')"
                    />
                </div>
                <div class="space-y-1">
                    <Label for="token-hours">{{ $t('apiTokens.expiresInHours') }}</Label>
                    <Input
                        id="token-hours"
                        v-model.number="newTokenHours"
                        type="number"
                        min="1"
                        max="720"
                        class="sm:w-28"
                    />
                </div>
                <Button
                    :disabled="isCreating"
                    class="bg-green hover:bg-green-600 text-white"
                    @click="createToken"
                >
                    {{ isCreating ? $t('common.loading') : $t('apiTokens.generate') }}
                </Button>
            </div>

            <div class="space-y-2">
                <p
                    v-if="isLoading"
                    class="text-sm text-gray-500"
                >
                    {{ $t('common.loading') }}
                </p>
                <p
                    v-else-if="tokens.length === 0"
                    class="text-sm text-gray-500"
                >
                    {{ $t('apiTokens.empty') }}
                </p>
                <div
                    v-for="token in tokens"
                    v-else
                    :key="token.id"
                    class="flex items-center justify-between gap-3 border border-rule rounded-md px-3 py-2"
                >
                    <div class="min-w-0">
                        <p class="text-sm font-medium truncate">
                            {{ token.name }}
                            <span class="text-xs text-gray-400 font-mono">rff_{{ token.prefix }}…</span>
                        </p>
                        <p class="text-xs text-gray-500">
                            {{ $t('apiTokens.expires') }}: {{ formatDate(token.expiresAt) }}
                            · {{ $t('apiTokens.lastUsed') }}: {{ formatDate(token.lastUsedAt) }}
                        </p>
                    </div>
                    <div class="flex items-center gap-2 shrink-0">
                        <span
                            class="text-xs px-2 py-0.5 rounded-full"
                            :class="token.active ? 'bg-green-100 text-green-ink' : 'bg-gray-100 text-gray-500'"
                        >
                            {{ token.active ? $t('apiTokens.active') : $t('apiTokens.inactive') }}
                        </span>
                        <Button
                            v-if="token.active"
                            size="sm"
                            variant="outline"
                            @click="revokeToken(token.id)"
                        >
                            <Trash2 class="w-4 h-4" />
                            <span class="sr-only">{{ $t('apiTokens.revoke') }}</span>
                        </Button>
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
</template>
