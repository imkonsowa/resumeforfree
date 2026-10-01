export default defineNuxtConfig({
    $meta: {
        name: 'core',
    },

    vite: {
        optimizeDeps: {
            exclude: [
                '@myriaddreamin/typst-ts-web-compiler',
                '@myriaddreamin/typst-ts-renderer',
                '@myriaddreamin/typst.ts',
            ],
        },
    },

    i18n: {
        locales: [
            { code: 'en', language: 'en-US', file: 'en.json' },
            { code: 'ar', language: 'ar-SA', file: 'ar.json' },
            { code: 'tr', language: 'tr-TR', file: 'tr.json' },
            { code: 'fr', language: 'fr-FR', file: 'fr.json' },
            { code: 'de', language: 'de-DE', file: 'de.json' },
            { code: 'it', language: 'it-IT', file: 'it.json' },
            { code: 'zh', language: 'zh-CN', file: 'zh.json' },
            { code: 'ur', language: 'ur-PK', file: 'ur.json' },
            { code: 'hi', language: 'hi-IN', file: 'hi.json' },
        ],
        langDir: 'locales',
    },
});
