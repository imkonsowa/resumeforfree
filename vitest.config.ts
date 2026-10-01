import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
    test: {
        environment: 'happy-dom',
        include: ['tests/unit/**/*.test.ts', 'layers/*/tests/unit/**/*.test.ts'],
        globals: true,
        setupFiles: ['./tests/setup.ts'],
    },
    resolve: {
        alias: {
            '#layers/core': resolve(__dirname, './layers/core'),
            '~~': resolve(__dirname, '.'),
            '~': resolve(__dirname, './app'),
            '@': resolve(__dirname, './app'),
        },
    },
});
