import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import tailwindcss from '@tailwindcss/vite';

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
    $meta: {
        name: 'base',
    },
    future: {
        compatibilityVersion: 4,
    },
    compatibilityDate: '2025-07-15',

    css: [
        join(currentDir, 'app/assets/css/tailwind.css'),
        join(currentDir, 'app/assets/css/app.css'),
    ],

    imports: {
        dirs: [join(currentDir, 'app/stores/**')],
    },

    modules: [
        'shadcn-nuxt',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
        '@nuxtjs/i18n',
    ],

    devtools: { enabled: false },

    vite: {
        plugins: [tailwindcss()],
        optimizeDeps: {
            exclude: [
                '@myriaddreamin/typst-ts-web-compiler',
                '@myriaddreamin/typst-ts-renderer',
                '@myriaddreamin/typst.ts',
            ],
        },
        build: {
            target: 'esnext',
        },
    },

    runtimeConfig: {
        public: {
            pocketbaseUrl: process.env.NODE_ENV === 'production'
                ? 'https://api.resumeforfree.com'
                : 'http://localhost:8010',
        },
    },

    i18n: {
        defaultLocale: 'en',
        locales: [
            {
                code: 'en',
                name: 'English',
                file: 'en.json',
                iso: 'en-US',
                dir: 'ltr',
            },
            {
                code: 'ar',
                name: 'العربية',
                file: 'ar.json',
                iso: 'ar-SA',
                dir: 'rtl',
            },
        ],
        lazy: true,
        langDir: 'locales',
        strategy: 'no_prefix',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root',
        },
    },

    piniaPluginPersistedstate: {
        storage: 'localStorage',
    },

    shadcn: {
        prefix: '',
        componentDir: join(currentDir, 'app/components/ui'),
    },
});
