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
        // Fetch all contact messages, ordered by newest first
        const result = await db.prepare(`
            SELECT
                id,
                name,
                email,
                subject,
                message,
                status,
                ip_address,
                user_agent,
                created_at,
                updated_at
            FROM contact_messages
            ORDER BY created_at DESC
        `).all();

        return {
            messages: result.results || [],
        };
    }
    catch (error) {
        console.error('Error fetching contact messages:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch contact messages',
        });
    }
});
