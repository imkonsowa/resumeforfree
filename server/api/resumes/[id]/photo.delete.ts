import jwt from '@tsndr/cloudflare-worker-jwt';
import type { D1Database, R2Bucket } from '@cloudflare/workers-types';

const JWT_SECRET = process.env.JWT_SECRET;

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

    const row = await db
        .prepare('SELECT photo_url FROM resumes WHERE id = ? AND user_id = ?')
        .bind(resumeId, userId)
        .first<{ photo_url: string | null }>();
    if (!row) {
        throw createError({ statusCode: 404, statusMessage: 'Resume not found' });
    }

    if (row.photo_url) {
        await photos.delete(`photos/${userId}/${resumeId}`);
    }
    await db
        .prepare('UPDATE resumes SET photo_url = NULL, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?')
        .bind(resumeId, userId)
        .run();

    return { success: true };
});
