import type { R2Bucket } from '@cloudflare/workers-types';

const ALLOWED = /^[a-zA-Z0-9._-]+\.wasm$/;

export default defineEventHandler(async (event) => {
    const file = getRouterParam(event, 'file');
    if (!file || !ALLOWED.test(file)) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid asset name' });
    }

    const bucket = event.context.cloudflare?.env?.WASM as R2Bucket | undefined;
    if (!bucket) {
        throw createError({ statusCode: 500, statusMessage: 'WASM storage not configured' });
    }

    const object = await bucket.get(file);
    if (!object) {
        throw createError({ statusCode: 404, statusMessage: 'WASM module not found' });
    }

    setHeader(event, 'Content-Type', 'application/wasm');
    setHeader(event, 'Cache-Control', 'public, max-age=31536000, immutable');
    if (object.httpEtag) setHeader(event, 'ETag', object.httpEtag);

    return object.body;
});
