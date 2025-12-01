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

    const body = await readBody(event);
    const { role } = body;

    // Validate role
    const validRoles = ['user', 'admin'];
    if (!role || !validRoles.includes(role)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid role. Must be one of: user, admin',
        });
    }

    try {
        // Update user role
        const result = await db.prepare(`
            UPDATE users
            SET role = ?
            WHERE id = ?
        `)
            .bind(role, userId)
            .run();

        if (result.meta.changes === 0) {
            throw createError({
                statusCode: 404,
                statusMessage: 'User not found',
            });
        }

        return {
            success: true,
            message: 'User role updated',
        };
    }
    catch (error: unknown) {
        if ((error as { statusCode?: number }).statusCode) {
            throw error;
        }
        console.error('Error updating user role:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to update user role',
        });
    }
});
