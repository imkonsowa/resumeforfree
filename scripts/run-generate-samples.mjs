import { createJiti } from 'jiti';
import { resolve } from 'node:path';

const jiti = createJiti(process.cwd(), {
    alias: {
        '~': resolve('./app'),
        '@': resolve('./app'),
    },
});

await jiti.import('./scripts/generate-sample-svgs.ts');
