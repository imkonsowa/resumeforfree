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

    const messageId = getRouterParam(event, 'id');
    if (!messageId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Message ID required',
        });
    }

    try {
        // Delete message
        const result = await db.prepare(`
            DELETE FROM contact_messages
            WHERE id = ?
        `)
            .bind(messageId)
            .run();

        if (result.meta.changes === 0) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Message not found',
            });
        }

        return {
            success: true,
            message: 'Message deleted',
        };
    }
    catch (error: unknown) {
        if ((error as { statusCode?: number }).statusCode) {
            throw error;
        }
        console.error('Error deleting message:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to delete message',
        });
    }
});
