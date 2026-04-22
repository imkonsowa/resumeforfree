<script lang="ts" setup>
interface Props {
    size?: number;
}

withDefaults(defineProps<Props>(), {
    size: 28,
});
</script>

<template>
    <svg
        :width="size"
        :height="size"
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
    >
        <rect
            x="5"
            y="3"
            width="19"
            height="26"
            rx="3"
            fill="#fff"
            stroke="#0B1220"
            stroke-width="1.6"
        />
        <line
            x1="9"
            y1="10"
            x2="19"
            y2="10"
            stroke="#0B1220"
            stroke-width="1.6"
            stroke-linecap="round"
        />
        <line
            x1="9"
            y1="14"
            x2="20"
            y2="14"
            stroke="#0B1220"
            stroke-width="1.6"
            stroke-linecap="round"
        />
        <line
            x1="9"
            y1="18"
            x2="17"
            y2="18"
            stroke="#0B1220"
            stroke-width="1.6"
            stroke-linecap="round"
        />
        <circle
            cx="23"
            cy="23"
            r="5"
            fill="#16A34A"
            stroke="#0B1220"
            stroke-width="1.6"
        />
        <path
            d="M20.5 23l2 2 3-3"
            stroke="#fff"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
        />
    </svg>
</template>
