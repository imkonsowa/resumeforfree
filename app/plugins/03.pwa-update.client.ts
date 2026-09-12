export default defineNuxtPlugin(async () => {
    if (!import.meta.client) return;
    if (!('serviceWorker' in navigator)) return;

    const { useRegisterSW } = await import('virtual:pwa-register/vue');
    const { t } = useNuxtApp().$i18n as { t: (key: string) => string };
    const notify = useNuxtApp().$notify;

    const { needRefresh, updateServiceWorker } = useRegisterSW({
        immediate: true,
        onRegisteredSW(_swUrl, registration) {
            if (!registration) return;
            setInterval(() => {
                registration.update().catch(console.debug);
            }, 60 * 1000);
        },
    });

    let notified = false;
    watch(needRefresh, (value) => {
        if (!value || notified) return;
        notified = true;
        notify.info(t('notifications.updateAvailable'), {
            description: t('notifications.updateAvailableDescription'),
            duration: Infinity,
            action: {
                label: t('notifications.updateRefresh'),
                onClick: () => updateServiceWorker(true),
            },
        });
    });
});
