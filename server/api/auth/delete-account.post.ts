import bcrypt from 'bcryptjs';
import type { R2Bucket } from '@cloudflare/workers-types';
import type { UserModel } from '~~/server/database/schema';

const USER_TABLES = ['resumes', 'user_settings', 'password_reset_tokens', 'api_tokens'] as const;

async function deleteUserPhotos(photos: R2Bucket, userId: string) {
    let cursor: string | undefined;
    do {
        const listing = await photos.list({ prefix: `photos/${userId}/`, cursor });
        const keys = listing.objects.map(object => object.key);
        if (keys.length > 0) {
            await photos.delete(keys);
        }
        cursor = listing.truncated ? listing.cursor : undefined;
    } while (cursor);
}

export default defineEventHandler(async (event) => {
    const userId = await requireSessionUserId(event);
    const db = getDb(event);

    const body = await readBody<{ email?: string; password?: string }>(event);
    const email = (body?.email || '').trim().toLowerCase();
    if (!email) {
        throw createError({ statusCode: 400, statusMessage: 'Email is required' });
    }

    const user = await db
        .prepare('SELECT * FROM users WHERE id = ?')
        .bind(userId)
        .first<UserModel>();
    if (!user) {
        clearAuthCookies(event);
        throw createError({ statusCode: 401, statusMessage: 'User not found' });
    }

    if (email !== user.email.toLowerCase()) {
        throw createError({ statusCode: 400, statusMessage: 'Email does not match your account' });
    }

    if (user.auth_provider !== 'google') {
        if (!body?.password) {
            throw createError({ statusCode: 400, statusMessage: 'Password is required' });
        }
        const isPasswordValid = await bcrypt.compare(body.password, user.password_hash);
        if (!isPasswordValid) {
            throw createError({ statusCode: 400, statusMessage: 'Password is incorrect' });
        }
    }

    const photos = event.context.cloudflare?.env?.PHOTOS as R2Bucket | undefined;
    if (photos) {
        await deleteUserPhotos(photos, userId);
    }

    await db.batch([
        ...USER_TABLES.map(table => db.prepare(`DELETE FROM ${table} WHERE user_id = ?`).bind(userId)),
        db.prepare('DELETE FROM users WHERE id = ?').bind(userId),
    ]);

    clearAuthCookies(event);
    return { success: true };
});
