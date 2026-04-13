export default defineNuxtPlugin(() => {
    const originalFetch = globalThis.$fetch;

    const IGNORED_PATHS = [
        '/api/auth/login',
        '/api/auth/register',
        '/api/auth/forgot-password',
        '/api/auth/reset-password',
    ];

    globalThis.$fetch = originalFetch.create({
        onResponseError({ request, response }) {
            if (response.status !== 401) return;

            const url = typeof request === 'string' ? request : (request as Request).url;
            if (IGNORED_PATHS.some(path => url.includes(path))) return;

            const authStore = useAuthStore();
            if (authStore.isAuthenticated) {
                authStore.clearAuth();
            }
        },
    });
});
