<script lang="ts" setup>
type Emits = {
    'update:token': [token: string | null];
};

const emit = defineEmits<Emits>();

const config = useRuntimeConfig();
const invisibleSiteKey = config.public.turnstile?.invisibleSiteKey as string;

const turnstileRef = ref();
const currentToken = ref<string | null>(null);

const handleUpdate = (token: string | null) => {
    currentToken.value = token;
    emit('update:token', token);
};

const reset = () => {
    currentToken.value = null;
    turnstileRef.value?.reset?.();
};

const getToken = async (timeoutMs = 4000): Promise<string | null> => {
    if (currentToken.value) return currentToken.value;

    return new Promise((resolve) => {
        const start = Date.now();
        const tick = () => {
            if (currentToken.value) {
                resolve(currentToken.value);
                return;
            }
            if (Date.now() - start > timeoutMs) {
                resolve(null);
                return;
            }
            setTimeout(tick, 150);
        };
        tick();
    });
};

defineExpose({ reset, getToken });
</script>

<template>
    <div
        aria-hidden="true"
        class="sr-only"
    >
        <NuxtTurnstile
            ref="turnstileRef"
            :model-value="currentToken"
            :site-key="invisibleSiteKey"
            :options="{ size: 'invisible' }"
            @update:model-value="handleUpdate"
        />
    </div>
</template>
