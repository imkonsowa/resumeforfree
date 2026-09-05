import type { D1Database } from '@cloudflare/workers-types';
import { sendPasswordResetEmail, hashToken } from '../../utils/email';

const RATE_LIMIT_WINDOW_MINUTES = 60;
const MAX_REQUESTS_PER_WINDOW = 3;
const MIN_INTERVAL_MINUTES = 5;

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const db = event.context.cloudflare?.env?.DB as D1Database | undefined;
    const sendEmail = event.context.cloudflare?.env?.SEND_EMAIL as {
        send(msg: { from: string; to: string; subject: string; text?: string; html?: string }): Promise<void>;
    } | undefined;

    const body = await readBody(event);
    const { email, turnstileToken } = body;

    if (!email) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email is required',
        });
    }

    if (process.env.NODE_ENV === 'production') {
        const isValidToken = await verifyTurnstileToken(turnstileToken, config.turnstile.secretKey);
        if (!isValidToken) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid captcha verification',
            });
        }
    }

    if (!db) {
        console.log('[DEV] Password reset requested for:', email);
        return {
            success: true,
            message: 'If an account exists with this email, a password reset link has been sent.',
        };
    }

    if (!sendEmail) {
        console.error('SEND_EMAIL binding not configured');
        throw createError({
            statusCode: 500,
            statusMessage: 'Email service not configured',
        });
    }

    try {
        const user = await db
            .prepare('SELECT id, email FROM users WHERE email = ?')
            .bind(email.toLowerCase())
            .first<{ id: string; email: string }>();

        if (!user) {
            return {
                success: true,
                message: 'If an account exists with this email, a password reset link has been sent.',
            };
        }

        const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MINUTES * 60 * 1000).toISOString();
        const recentTokens = await db
            .prepare(`
                SELECT created_at FROM password_reset_tokens
                WHERE user_id = ? AND created_at > ?
                ORDER BY created_at DESC
            `)
            .bind(user.id, windowStart)
            .all<{ created_at: string }>();

        if (recentTokens.results && recentTokens.results.length >= MAX_REQUESTS_PER_WINDOW) {
            throw createError({
                statusCode: 429,
                statusMessage: 'Too many password reset requests. Please try again later.',
            });
        }

        if (recentTokens.results && recentTokens.results.length > 0) {
            const lastRequest = new Date(recentTokens.results[0].created_at);
            const minIntervalMs = MIN_INTERVAL_MINUTES * 60 * 1000;
            const timeSinceLastRequest = Date.now() - lastRequest.getTime();

            if (timeSinceLastRequest < minIntervalMs) {
                const waitMinutes = Math.ceil((minIntervalMs - timeSinceLastRequest) / 60000);
                throw createError({
                    statusCode: 429,
                    statusMessage: `Please wait ${waitMinutes} minute${waitMinutes > 1 ? 's' : ''} before requesting another reset link.`,
                });
            }
        }

        const tokenId = crypto.randomUUID().replace(/-/g, '').slice(0, 16);
        const token = crypto.randomUUID();
        const hashedToken = await hashToken(token);

        const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

        await db.prepare('DELETE FROM password_reset_tokens WHERE user_id = ? AND expires_at < datetime("now")')
            .bind(user.id)
            .run();

        await db.prepare(`
            INSERT INTO password_reset_tokens (id, user_id, token_hash, expires_at)
            VALUES (?, ?, ?, ?)
        `)
            .bind(tokenId, user.id, hashedToken, expiresAt)
            .run();

        const emailSent = await sendPasswordResetEmail(sendEmail, user.email, token);

        if (!emailSent) {
            console.error('Failed to send password reset email to:', email);
        }

        return {
            success: true,
            message: 'If an account exists with this email, a password reset link has been sent.',
        };
    }
    catch (error: unknown) {
        if ((error as { statusCode?: number }).statusCode === 429) {
            throw error;
        }
        console.error('Forgot password error:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to process password reset request',
        });
    }
});
