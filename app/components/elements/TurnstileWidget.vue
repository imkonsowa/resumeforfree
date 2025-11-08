<template>
    <div class="turnstile-wrapper">
        <NuxtTurnstile
            ref="turnstileRef"
            v-model="token"
            :options="{
                theme: 'light',
                size: 'normal',
            }"
            @update:model-value="handleTokenUpdate"
        />
    </div>
</template>

<script lang="ts" setup>
interface Props {
    modelValue?: string | null;
}

interface Emits {
    // eslint-disable-next-line @typescript-eslint/prefer-function-type
    (e: 'update:modelValue', value: string | null): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const turnstileRef = ref();
const token = ref(props.modelValue || null);

const handleTokenUpdate = (newToken: string | null) => {
    emit('update:modelValue', newToken);
};

watch(() => props.modelValue, (newValue) => {
    token.value = newValue;
});

const reset = () => {
    if (turnstileRef.value?.reset) {
        turnstileRef.value.reset();
    }
};

defineExpose({
    reset,
});
</script>

<style scoped>
.turnstile-wrapper {
    display: flex;
    justify-content: flex-start;
    margin: 1rem 0;
}
</style>
