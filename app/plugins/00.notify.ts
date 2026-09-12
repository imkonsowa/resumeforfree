import type { Notifier } from '~/composables/useNotify';

/**
 * Exposes the notifier as `$notify` so code that runs outside a component
 * setup — Pinia actions, other plugins — can raise toasts without needing a
 * live Nuxt instance at call time. The composable is resolved once here, while
 * context is guaranteed, and the resulting object is just closures.
 */
export default defineNuxtPlugin(() => {
    const notify = useNotify();

    return {
        provide: { notify },
    };
});

declare module '#app' {
    interface NuxtApp {
        $notify: Notifier;
    }
}
