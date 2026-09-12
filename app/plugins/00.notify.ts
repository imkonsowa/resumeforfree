import type { Notifier } from '~/composables/useNotify';

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
