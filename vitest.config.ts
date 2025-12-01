import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
    test: {
        environment: 'happy-dom',
        include: ['tests/unit/**/*.test.ts'],
        globals: true,
        setupFiles: ['./tests/setup.ts'],
    },
    resolve: {
        alias: {
            '~': resolve(__dirname, './app'),
            '@': resolve(__dirname, './app'),
        },
    },
});
