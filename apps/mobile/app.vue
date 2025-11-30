<script setup lang="ts">
import { Capacitor } from '@capacitor/core';

// Handle safe areas for mobile devices (notches, home indicators)
onMounted(() => {
    if (Capacitor.isNativePlatform()) {
        // Set CSS custom properties for safe area insets
        document.documentElement.style.setProperty(
            '--safe-area-top',
            'env(safe-area-inset-top)',
        );
        document.documentElement.style.setProperty(
            '--safe-area-bottom',
            'env(safe-area-inset-bottom)',
        );
        document.documentElement.style.setProperty(
            '--safe-area-left',
            'env(safe-area-inset-left)',
        );
        document.documentElement.style.setProperty(
            '--safe-area-right',
            'env(safe-area-inset-right)',
        );
    }
});
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<style>
/* Mobile-specific safe area handling */
.safe-area-top {
    padding-top: var(--safe-area-top, 0);
}

.safe-area-bottom {
    padding-bottom: var(--safe-area-bottom, 0);
}

.safe-area-left {
    padding-left: var(--safe-area-left, 0);
}

.safe-area-right {
    padding-right: var(--safe-area-right, 0);
}

/* Keyboard visible adjustments */
body.keyboard-visible {
    /* Prevent layout shift when keyboard appears */
    height: 100vh;
    overflow: hidden;
}

/* Ensure proper viewport on mobile */
html, body {
    overscroll-behavior: none;
    -webkit-overflow-scrolling: touch;
}
</style>
