export default defineNuxtConfig({
    extends: ['../../layers/base'],

    devtools: { enabled: false },
    ssr: false, // Capacitor requires SPA mode

    app: {
        baseURL: '', // Empty base for Capacitor file:// protocol
        cdnURL: '', // No CDN
        head: {
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
            ],
        },
    },

    runtimeConfig: {
        public: {
            // Android emulator uses 10.0.2.2 to reach host machine
            pocketbaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'https://api.resumeforfree.com',
        },
    },

    nitro: {
        preset: 'static',
        output: {
            publicDir: 'dist',
        },
    },

    // Override storage for mobile (handled by composables)
    piniaPluginPersistedstate: {
        storage: 'localStorage', // Will be overridden by Capacitor Preferences plugin
    },
});
