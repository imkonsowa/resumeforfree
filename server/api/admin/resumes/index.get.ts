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

    try {
        // Fetch all resumes with user email
        const result = await db.prepare(`
            SELECT
                r.id,
                r.user_id,
                r.name,
                r.template,
                r.is_active,
                r.created_at,
                r.updated_at,
                u.email as user_email
            FROM resumes r
            LEFT JOIN users u ON r.user_id = u.id
            ORDER BY r.created_at DESC
        `).all();

        return {
            resumes: result.results || [],
        };
    }
    catch (error) {
        console.error('Error fetching resumes:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch resumes',
        });
    }
});
