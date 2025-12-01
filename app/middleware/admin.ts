export default defineNuxtRouteMiddleware(async () => {
    const authStore = useAuthStore();

    // Ensure auth is initialized
    if (!authStore.user) {
        await authStore.initializeAuth();
    }

    // Check if user is logged in
    if (!authStore.isLoggedIn) {
        return navigateTo('/auth/login');
    }

    // Check if user has admin role
    if (authStore.user?.role !== 'admin') {
        // Redirect to home page with error message
        return navigateTo({
            path: '/',
            query: { error: 'unauthorized' },
        });
    }
});
