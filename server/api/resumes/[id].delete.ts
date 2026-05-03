import jwt from '@tsndr/cloudflare-worker-jwt';
import type { D1Database } from '@cloudflare/workers-types';

const JWT_SECRET = process.env.JWT_SECRET;
class DatabaseService {
    constructor(private db: D1Database) {}
    async deleteResume(resumeId: string, userId: string): Promise<boolean> {
        const result = await this.db
            .prepare('DELETE FROM resumes WHERE id = ? AND user_id = ?')
            .bind(resumeId, userId)
            .run();
        return result.changes !== undefined ? result.changes > 0 : result.success;
    }

    async getResumeById(resumeId: string, userId: string): Promise<{ id: string; user_id: string; photo_url: string | null } | null> {
        return await this.db
            .prepare('SELECT id, user_id, photo_url FROM resumes WHERE id = ? AND user_id = ?')
            .bind(resumeId, userId)
            .first();
    }
}
export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth-token');
    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Authentication required',
        });
    }
    const isValid = await jwt.verify(token, JWT_SECRET);
    if (!isValid) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid token',
        });
    }
    const decoded = jwt.decode(token);
    const payload = decoded.payload as { sub: string };
    const userId = payload.sub;
    const resumeId = getRouterParam(event, 'id');
    if (!resumeId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Resume ID is required',
        });
    }
    const db = event.context.cloudflare?.env?.DB;
    if (!db) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Database not configured',
        });
    }
    const dbService = new DatabaseService(db);
    const existingResume = await dbService.getResumeById(resumeId, userId);
    if (!existingResume) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Resume not found',
        });
    }
    if (existingResume.photo_url) {
        const photos = event.context.cloudflare?.env?.PHOTOS;
        if (photos) {
            await photos.delete(`photos/${userId}/${resumeId}`);
        }
    }
    const deleted = await dbService.deleteResume(resumeId, userId);
    if (!deleted) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to delete resume',
        });
    }
    return { success: true };
});
