import type { D1Database } from '@cloudflare/workers-types';
import type { ResumeModel } from '~~/server/database/schema';
import { requireUserId } from '~~/server/utils/apiAuth';
import { toIsoUtc } from '~~/server/utils/datetime';

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
    const userId = await requireUserId(event);
    const db = event.context.cloudflare?.env?.DB;
    if (!db) {
        return {
            resumes: [],
        };
    }
    const dbService = new DatabaseService(db);
    const resumes = await dbService.getResumesByUserId(userId);
    return {
        resumes: resumes.map((resume) => {
            const data = typeof resume.data === 'string' ? JSON.parse(resume.data) : resume.data;
            if (resume.photo_url) {
                data.photo = { source: 'r2', url: resume.photo_url };
            }
            else {
                delete data.photo;
            }
            return {
                id: resume.id,
                name: resume.name,
                language: resume.language ?? null,
                isActive: resume.is_active,
                template: resume.template,
                data,
                settings: typeof resume.settings === 'string' ? JSON.parse(resume.settings || '{}') : resume.settings,
                createdAt: toIsoUtc(resume.created_at),
                updatedAt: toIsoUtc(resume.updated_at),
            };
        }),
    };
});
