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
        // Fetch all users
        const result = await db.prepare(`
            SELECT
                id,
                email,
                name,
                role,
                verified,
                created_at,
                updated_at
            FROM users
            ORDER BY created_at DESC
        `).all();

        return {
            users: result.results || [],
        };
    }
    catch (error) {
        console.error('Error fetching users:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch users',
        });
    }
});
