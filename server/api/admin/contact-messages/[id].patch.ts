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

    const body = await readBody(event);
    const { status } = body;

    // Validate status
    const validStatuses = ['new', 'read', 'resolved'];
    if (!status || !validStatuses.includes(status)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid status. Must be one of: new, read, resolved',
        });
    }

    try {
        // Update message status
        const result = await db.prepare(`
            UPDATE contact_messages
            SET status = ?
            WHERE id = ?
        `)
            .bind(status, messageId)
            .run();

        if (result.meta.changes === 0) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Message not found',
            });
        }

        return {
            success: true,
            message: 'Message status updated',
        };
    }
    catch (error: unknown) {
        if ((error as { statusCode?: number }).statusCode) {
            throw error;
        }
        console.error('Error updating message status:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to update message status',
        });
    }
});
