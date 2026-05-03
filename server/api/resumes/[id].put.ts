import jwt from '@tsndr/cloudflare-worker-jwt';
import type { D1Database } from '@cloudflare/workers-types';
import type { ResumeUpdatePatch } from '~~/server/types/db';

const JWT_SECRET = process.env.JWT_SECRET;

class DatabaseService {
    constructor(private db: D1Database) {}
    async updateResume(resumeId: string, userId: string, updates: ResumeUpdatePatch): Promise<void> {
        const setParts: string[] = [];
        const values: unknown[] = [];
        if (updates.name !== undefined) {
            setParts.push('name = ?');
            values.push(updates.name);
        }
        if (updates.language !== undefined) {
            setParts.push('language = ?');
            values.push(updates.language);
        }
        if (updates.data !== undefined) {
            setParts.push('data = ?');
            values.push(JSON.stringify(updates.data));
        }
        if (updates.settings !== undefined) {
            setParts.push('settings = ?');
            values.push(JSON.stringify(updates.settings));
            const tmpl = (updates.settings as { selectedTemplate?: string } | null)?.selectedTemplate;
            if (tmpl) {
                setParts.push('template = ?');
                values.push(tmpl);
            }
        }
        if (updates.isActive !== undefined) {
            setParts.push('is_active = ?');
            values.push(updates.isActive ? 1 : 0);
        }
        if (setParts.length === 0) {
            return;
        }
        setParts.push('updated_at = CURRENT_TIMESTAMP');
        values.push(resumeId, userId);
        const query = `UPDATE resumes SET ${setParts.join(', ')} WHERE id = ? AND user_id = ?`;
        await this.db.prepare(query).bind(...values).run();
    }

    async getResumeById(resumeId: string, userId: string): Promise<{
        id: string;
        name: string;
        is_active: number;
        template: string;
        language: string | null;
        data: string | unknown;
        settings: string | unknown;
        photo_url: string | null;
        created_at: string;
        updated_at: string;
    } | null> {
        return await this.db
            .prepare('SELECT * FROM resumes WHERE id = ? AND user_id = ?')
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
    const body = await readBody(event);
    if (body?.data && typeof body.data === 'object') {
        delete (body.data as { photo?: unknown }).photo;
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
    await dbService.updateResume(resumeId, userId, body);
    const updatedResume = await dbService.getResumeById(resumeId, userId);
    const data = typeof updatedResume.data === 'string' ? JSON.parse(updatedResume.data) : updatedResume.data;
    if (updatedResume.photo_url) {
        data.photo = { source: 'r2', url: updatedResume.photo_url };
    }
    else {
        delete data.photo;
    }
    return {
        resume: {
            id: updatedResume.id,
            name: updatedResume.name,
            language: updatedResume.language ?? null,
            isActive: updatedResume.is_active,
            template: updatedResume.template,
            data,
            settings: typeof updatedResume.settings === 'string' ? JSON.parse(updatedResume.settings || '{}') : updatedResume.settings,
            createdAt: updatedResume.created_at,
            updatedAt: updatedResume.updated_at,
        },
    };
});
