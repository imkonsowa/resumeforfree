// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
    extends: ['../../layers/base'],

    modules: [
        '@nuxt/eslint',
        '@vite-pwa/nuxt',
        'nitro-cloudflare-dev',
        '@nuxtjs/turnstile',
    ],

    ssr: true,

    app: {
        head: {
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
                { rel: 'canonical', href: 'https://resumeforfree.com' },
            ],
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'format-detection', content: 'telephone=no' },
                { name: 'robots', content: 'index, follow' },
                { name: 'author', content: 'Resume Builder' },
                { name: 'theme-color', content: '#3b82f6' },
            ],
        },
    },

    site: {
        url: 'https://resumeforfree.com',
        name: 'Resume Builder',
        description: 'Build professional resumes for free. No servers, no registration, no payments. Unlimited downloads and resumes with complete privacy.',
        defaultLocale: 'en',
    },

    runtimeConfig: {
        public: {
            turnstile: {
                siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA',
            },
        },
        turnstile: {
            secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA',
        },
    },
    nitro: {
        preset: 'cloudflare-module',
        cloudflare: {
            d1: {
                DB: process.env.NODE_ENV === 'production' ? undefined : './dev.db',
            },
        },
    },

    eslint: {
        config: {
            stylistic: {
                indent: 4,
                semi: true,
                quotes: 'single',
            },
        },
    },

    pwa: {
        manifest: {
            name: 'Resume Builder',
            short_name: 'Resume Builder',
            description: 'Build professional resumes for free',
            theme_color: '#3b82f6',
            background_color: '#ffffff',
            display: 'standalone',
            start_url: '/',
            icons: [
                {
                    src: '/icon.svg',
                    sizes: 'any',
                    type: 'image/svg+xml',
                    purpose: 'any maskable',
                },
            ],
        },
        workbox: {
            navigateFallback: '/',
        },
        devOptions: {
            enabled: false,
        },
    },

    seo: {
        redirectToCanonicalSiteUrl: true,
    },
});
