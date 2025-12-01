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

    const userId = getRouterParam(event, 'id');
    if (!userId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'User ID required',
        });
    }

    try {
        // Delete user's resumes first (foreign key constraint)
        await db.prepare('DELETE FROM resumes WHERE user_id = ?')
            .bind(userId)
            .run();

        // Delete user's settings
        await db.prepare('DELETE FROM user_settings WHERE user_id = ?')
            .bind(userId)
            .run();

        // Delete user
        const result = await db.prepare('DELETE FROM users WHERE id = ?')
            .bind(userId)
            .run();

        if (result.meta.changes === 0) {
            throw createError({
                statusCode: 404,
                statusMessage: 'User not found',
            });
        }

        return {
            success: true,
            message: 'User deleted',
        };
    }
    catch (error: unknown) {
        if ((error as { statusCode?: number }).statusCode) {
            throw error;
        }
        console.error('Error deleting user:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to delete user',
        });
    }
});
