export default defineNuxtPlugin({
    name: 'auth-hydrate',
    dependsOn: ['pinia'],
    setup() {
        const authStore = useAuthStore();
        authStore.hydrateFromCookie();
    },
});
