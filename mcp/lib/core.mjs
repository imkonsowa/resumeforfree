// Loads the app's own TypeScript modules, so templates, defaults and validation
// stay identical to what the web UI and API do.
import { join, resolve } from 'node:path';
import { createJiti } from 'jiti';
import { APP_ROOT } from './config.mjs';

const jiti = createJiti(import.meta.url, {
    alias: {
        '#layers/core': resolve(APP_ROOT, 'layers/core'),
    },
});

const load = path => jiti.import(join(APP_ROOT, path));

export const templatesModule = await load('layers/core/app/templates/index.ts');
export const resumeTypes = await load('layers/core/app/types/resume.ts');
export const sections = await load('server/utils/resumeSections.ts');
export const direction = await load('layers/core/app/utils/localeDirection.ts');
