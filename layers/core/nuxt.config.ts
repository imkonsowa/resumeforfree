import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const currentDir = dirname(fileURLToPath(import.meta.url));

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

    typescript: {
        tsConfig: {
            include: [join(currentDir, 'app/types/global.d.ts')],
        },
    },

    i18n: {
        locales: [
            { code: 'en', file: 'en.json' },
            { code: 'ar', file: 'ar.json' },
            { code: 'tr', file: 'tr.json' },
            { code: 'fr', file: 'fr.json' },
            { code: 'de', file: 'de.json' },
            { code: 'it', file: 'it.json' },
            { code: 'zh', file: 'zh.json' },
            { code: 'ur', file: 'ur.json' },
            { code: 'hi', file: 'hi.json' },
        ],
        langDir: 'locales',
    },
});
