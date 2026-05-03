import jwt from '@tsndr/cloudflare-worker-jwt';
import type { D1Database, R2Bucket } from '@cloudflare/workers-types';

const JWT_SECRET = process.env.JWT_SECRET;
const ALLOWED_MIMES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_BYTES = 2 * 1024 * 1024;

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth-token');
    if (!token) {
        throw createError({ statusCode: 401, statusMessage: 'Authentication required' });
    }
    const isValid = await jwt.verify(token, JWT_SECRET);
    if (!isValid) {
        throw createError({ statusCode: 401, statusMessage: 'Invalid token' });
    }
    const decoded = jwt.decode(token);
    const userId = (decoded.payload as { sub: string }).sub;

    const resumeId = getRouterParam(event, 'id');
    if (!resumeId) {
        throw createError({ statusCode: 400, statusMessage: 'Resume ID is required' });
    }

    const db = event.context.cloudflare?.env?.DB as D1Database | undefined;
    const photos = event.context.cloudflare?.env?.PHOTOS as R2Bucket | undefined;
    if (!db || !photos) {
        throw createError({ statusCode: 500, statusMessage: 'Storage not configured' });
    }

    const owned = await db
        .prepare('SELECT id FROM resumes WHERE id = ? AND user_id = ?')
        .bind(resumeId, userId)
        .first<{ id: string }>();
    if (!owned) {
        throw createError({ statusCode: 404, statusMessage: 'Resume not found' });
    }

    const form = await readFormData(event);
    const fileEntry = form.get('file');
    if (!(fileEntry instanceof File) && !(fileEntry instanceof Blob)) {
        throw createError({ statusCode: 400, statusMessage: 'file field is required' });
    }
    const mime = fileEntry.type || '';
    if (!ALLOWED_MIMES.has(mime)) {
        throw createError({ statusCode: 415, statusMessage: 'File must be JPG, PNG, or WebP' });
    }
    if (fileEntry.size > MAX_BYTES) {
        throw createError({ statusCode: 413, statusMessage: 'File must be under 2 MB' });
    }
    const bytes = new Uint8Array(await fileEntry.arrayBuffer());
    const key = `photos/${userId}/${resumeId}`;
    await photos.put(key, bytes, { httpMetadata: { contentType: mime } });

    const url = `/api/resumes/${resumeId}/photo`;
    await db
        .prepare('UPDATE resumes SET photo_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?')
        .bind(url, resumeId, userId)
        .run();

    return {
        photo: {
            source: 'r2' as const,
            url,
        },
    };
});
