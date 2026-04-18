import jwt from '@tsndr/cloudflare-worker-jwt';
import type { D1Database } from '@cloudflare/workers-types';
import type { UserSettingsModel } from '~~/server/database/schema';

const JWT_SECRET = process.env.JWT_SECRET;
class DatabaseService {
    constructor(private db: D1Database) {}
    async getUserSettings(userId: string): Promise<UserSettingsModel | null> {
        return await this.db
            .prepare('SELECT * FROM user_settings WHERE user_id = ?')
            .bind(userId)
            .first<UserSettingsModel>();
    }
}
export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth-token');
    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Authentication required',
        });
    }
    const isValid = await jwt.verify(token, JWT_SECRET);
    if (!isValid) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid token',
        });
    }
    const decoded = jwt.decode(token);
    const payload = decoded.payload as { sub: string };
    const userId = payload.sub;
    const db = event.context.cloudflare?.env?.DB;
    if (!db) {
        return {
            settings: {},
        };
    }
    const dbService = new DatabaseService(db);
    const userSettings = await dbService.getUserSettings(userId);
    return {
        settings: userSettings
            ? (typeof userSettings.settings === 'string'
                    ? JSON.parse(userSettings.settings)
                    : userSettings.settings)
            : {},
        updated_at: userSettings?.updated_at || null,
    };
});
