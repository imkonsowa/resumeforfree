import type { D1Database } from '@cloudflare/workers-types';
import { verifyTurnstileToken } from '../utils/turnstile';

export default defineEventHandler(async (event) => {
    const db = event.context.cloudflare?.env?.DB as D1Database;

    if (!db) {
        return { success: false };
    }

    if (process.env.NODE_ENV === 'production') {
        const config = useRuntimeConfig();
        const body = await readBody(event).catch(() => ({}));
        const token = body?.turnstileToken;
        const verified = await verifyTurnstileToken(token, config.turnstile.invisibleSecretKey);
        if (!verified) {
            return { success: false };
        }
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
