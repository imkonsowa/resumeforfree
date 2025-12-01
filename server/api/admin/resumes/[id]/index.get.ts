import type { D1Database } from '@cloudflare/workers-types';

export default defineEventHandler(async (event) => {
    // Verify admin authentication
    await requireAdmin(event);

    const db = event.context.cloudflare?.env?.DB as D1Database;

    if (!db) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Database not configured',
        });
    }

    const resumeId = getRouterParam(event, 'id');
    if (!resumeId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Resume ID required',
        });
    }

    try {
        // Fetch resume data
        const result = await db.prepare(`
            SELECT
                r.id,
                r.user_id,
                r.name,
                r.template,
                r.data,
                r.settings,
                r.created_at,
                r.updated_at,
                u.email as user_email
            FROM resumes r
            LEFT JOIN users u ON r.user_id = u.id
            WHERE r.id = ?
        `)
            .bind(resumeId)
            .first();

        if (!result) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Resume not found',
            });
        }

        // Parse JSON data
        const data = typeof result.data === 'string' ? JSON.parse(result.data) : result.data;
        const settings = result.settings ? (typeof result.settings === 'string' ? JSON.parse(result.settings) : result.settings) : null;

        return {
            id: result.id,
            user_id: result.user_id,
            user_email: result.user_email,
            name: result.name,
            template: result.template,
            data,
            settings,
            created_at: result.created_at,
            updated_at: result.updated_at,
        };
    }
    catch (error: unknown) {
        if ((error as { statusCode?: number }).statusCode) {
            throw error;
        }
        console.error('Error fetching resume:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch resume',
        });
    }
});
