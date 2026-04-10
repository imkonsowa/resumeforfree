import type { D1Database } from '@cloudflare/workers-types';
import { count, eq } from 'drizzle-orm';
import { users, resumes, contactMessages } from '../../database/schema';

export default defineEventHandler(async (event) => {
    // Verify admin authentication
    await requireAdmin(event);

    try {
        const db = useDrizzle(event);
        const rawDb = event.context.cloudflare?.env?.DB as D1Database | undefined;

        // Get all stats in parallel using Promise.all
        const [
            totalUsersResult,
            totalResumesResult,
            totalMessagesResult,
            newMessagesResult,
            downloadsResult,
        ] = await Promise.all([
            db.select({ count: count() }).from(users),
            db.select({ count: count() }).from(resumes),
            db.select({ count: count() }).from(contactMessages),
            db.select({ count: count() }).from(contactMessages).where(eq(contactMessages.status, 'new')),
            rawDb
                ? rawDb.prepare(`SELECT count FROM counters WHERE name = 'downloads'`).first<{ count: number }>()
                : Promise.resolve(null),
        ]);

        return {
            totalUsers: totalUsersResult[0]?.count || 0,
            totalResumes: totalResumesResult[0]?.count || 0,
            totalMessages: totalMessagesResult[0]?.count || 0,
            newMessages: newMessagesResult[0]?.count || 0,
            totalDownloads: downloadsResult?.count || 0,
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
