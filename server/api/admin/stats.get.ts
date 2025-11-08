import type { D1Database } from '@cloudflare/workers-types';

export default defineEventHandler(async (event) => {
    // Verify admin authentication
    await requireAdmin(event);

    const db = event.context.cloudflare?.env?.DB as D1Database;

    if (!db) {
        // Return mock data for development
        return {
            totalUsers: 0,
            totalResumes: 0,
            totalMessages: 0,
            newMessages: 0,
        };
    }

    try {
        // Get total users count
        const usersResult = await db.prepare('SELECT COUNT(*) as count FROM users').first<{ count: number }>();
        const totalUsers = usersResult?.count || 0;

        // Get total resumes count
        const resumesResult = await db.prepare('SELECT COUNT(*) as count FROM resumes').first<{ count: number }>();
        const totalResumes = resumesResult?.count || 0;

        // Get total contact messages count
        const messagesResult = await db.prepare('SELECT COUNT(*) as count FROM contact_messages').first<{ count: number }>();
        const totalMessages = messagesResult?.count || 0;

        // Get new contact messages count
        const newMessagesResult = await db.prepare('SELECT COUNT(*) as count FROM contact_messages WHERE status = ?').bind('new').first<{ count: number }>();
        const newMessages = newMessagesResult?.count || 0;

        return {
            totalUsers,
            totalResumes,
            totalMessages,
            newMessages,
        };
    }
    catch (error) {
        console.error('Error fetching admin stats:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to fetch statistics',
        });
    }
});
