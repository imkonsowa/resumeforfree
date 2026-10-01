import { createJiti } from 'jiti';
import { resolve } from 'node:path';

const jiti = createJiti(process.cwd(), {
    alias: {
        '#layers/core': resolve('./layers/core'),
        '~': resolve('./app'),
        '@': resolve('./app'),
    },
});

await jiti.import('./scripts/generate-sample-svgs.ts');
