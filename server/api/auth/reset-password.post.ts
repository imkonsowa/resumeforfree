import bcrypt from 'bcryptjs';
import type { D1Database } from '@cloudflare/workers-types';
import type { PasswordResetTokenModel } from '~~/server/database/schema';
import { hashToken } from '../../utils/email';

export default defineEventHandler(async (event) => {
    const db = event.context.cloudflare?.env?.DB as D1Database | undefined;

    const body = await readBody(event);
    const { token, password } = body;

    if (!token) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Reset token is required',
        });
    }

    if (!password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Password is required',
        });
    }

    if (password.length < 6) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Password must be at least 6 characters long',
        });
    }

    if (!db) {
        console.log('[DEV] Password reset with token:', token);
        return {
            success: true,
            message: 'Password has been reset successfully.',
        };
    }

    try {
        const hashedToken = await hashToken(token);

        const tokenRecord = await db
            .prepare(`
                SELECT id, user_id, expires_at
                FROM password_reset_tokens
                WHERE token_hash = ?
            `)
            .bind(hashedToken)
            .first<PasswordResetTokenModel>();

        if (!tokenRecord) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid or expired reset link',
            });
        }

        const expiresAt = new Date(tokenRecord.expires_at);
        if (expiresAt < new Date()) {
            await db.prepare('DELETE FROM password_reset_tokens WHERE id = ?')
                .bind(tokenRecord.id)
                .run();

            throw createError({
                statusCode: 400,
                statusMessage: 'Reset link has expired. Please request a new one.',
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        await db.prepare(`
            UPDATE users
            SET password_hash = ?, updated_at = datetime("now")
            WHERE id = ?
        `)
            .bind(passwordHash, tokenRecord.user_id)
            .run();

        await db.prepare('DELETE FROM password_reset_tokens WHERE user_id = ?')
            .bind(tokenRecord.user_id)
            .run();

        return {
            success: true,
            message: 'Password has been reset successfully.',
        };
    }
    catch (error: unknown) {
        if ((error as { statusCode?: number }).statusCode) {
            throw error;
        }
        console.error('Reset password error:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to reset password',
        });
    }
});
