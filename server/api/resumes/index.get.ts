import jwt from '@tsndr/cloudflare-worker-jwt';
import type { D1Database } from '@cloudflare/workers-types';
import type { ResumeModel } from '~~/server/database/schema';

const JWT_SECRET = process.env.JWT_SECRET;
class DatabaseService {
    constructor(private db: D1Database) {}
    async getResumesByUserId(userId: string): Promise<ResumeModel[]> {
        return await this.db
            .prepare('SELECT * FROM resumes WHERE user_id = ? ORDER BY updated_at DESC')
            .bind(userId)
            .all<ResumeModel>()
            .then(result => result.results || []);
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
    const db = event.context.cloudflare?.env?.DB;
    if (!db) {
        return {
            resumes: [],
        };
    }
    const dbService = new DatabaseService(db);
    const resumes = await dbService.getResumesByUserId(userId);
    return {
        resumes: resumes.map(resume => ({
            id: resume.id,
            name: resume.name,
            language: resume.language ?? null,
            isActive: resume.is_active,
            template: resume.template,
            data: typeof resume.data === 'string' ? JSON.parse(resume.data) : resume.data,
            settings: typeof resume.settings === 'string' ? JSON.parse(resume.settings || '{}') : resume.settings,
            createdAt: resume.created_at,
            updatedAt: resume.updated_at,
        })),
    };
});
