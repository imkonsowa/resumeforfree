import type { D1Database } from '@cloudflare/workers-types';

export default defineEventHandler(async (event) => {
    const db = event.context.cloudflare?.env?.DB as D1Database;

    if (!db) {
        return { success: false };
    }

    try {
        await db.prepare(
            `UPDATE counters SET count = count + 1, updated_at = CURRENT_TIMESTAMP WHERE name = 'downloads'`,
        ).run();
    }
    catch (error) {
        console.error('Failed to increment download counter:', error);
    }

    return { success: true };
});
