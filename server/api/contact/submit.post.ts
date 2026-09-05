import type { D1Database } from '@cloudflare/workers-types';
import { sendContactNotificationEmail } from '../../utils/email';

const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 3;

function checkRateLimit(ipAddress: string): boolean {
    const now = Date.now();
    const timestamps = rateLimitMap.get(ipAddress) || [];

    const recentTimestamps = timestamps.filter(ts => now - ts < RATE_LIMIT_WINDOW);

    if (recentTimestamps.length >= RATE_LIMIT_MAX) {
        return false;
    }

    recentTimestamps.push(now);
    rateLimitMap.set(ipAddress, recentTimestamps);

    if (rateLimitMap.size > 1000) {
        for (const [ip, times] of rateLimitMap.entries()) {
            const validTimes = times.filter(ts => now - ts < RATE_LIMIT_WINDOW);
            if (validTimes.length === 0) {
                rateLimitMap.delete(ip);
            }
        }
    }

    return true;
}

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const db = event.context.cloudflare?.env?.DB as D1Database;

    if (!db) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Database not configured',
        });
    }

    const body = await readBody(event);
    const { name, email, subject, message, turnstileToken } = body;

    if (!name || !email || !subject || !message) {
        throw createError({
            statusCode: 400,
            statusMessage: 'All fields are required',
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Invalid email address',
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

    const ipAddress = getRequestHeader(event, 'cf-connecting-ip')
        || getRequestHeader(event, 'x-forwarded-for')
        || getRequestHeader(event, 'x-real-ip')
        || 'unknown';

    const userAgent = getRequestHeader(event, 'user-agent') || 'unknown';

    if (!checkRateLimit(ipAddress)) {
        throw createError({
            statusCode: 429,
            statusMessage: 'Too many requests. Please try again later.',
        });
    }

    try {
        const messageId = crypto.randomUUID().replace(/-/g, '').slice(0, 16);

        await db.prepare(`
            INSERT INTO contact_messages
            (id, name, email, subject, message, ip_address, user_agent)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `)
            .bind(messageId, name.trim(), email.trim(), subject.trim(), message.trim(), ipAddress, userAgent)
            .run();

        const sendEmail = event.context.cloudflare?.env?.SEND_EMAIL as {
            send(msg: { from: string; to: string; subject: string; text?: string; html?: string }): Promise<void>;
        } | undefined;
        const adminAddress = event.context.cloudflare?.env?.ADMIN_MAIL_ADDRESS as string | undefined;

        if (sendEmail && adminAddress) {
            await sendContactNotificationEmail(sendEmail, adminAddress, {
                name: name.trim(),
                email: email.trim(),
                subject: subject.trim(),
                message: message.trim(),
            });
        }

        return {
            success: true,
            message: 'Message sent successfully',
        };
    }
    catch (error) {
        console.error('Error saving contact message:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to save message',
        });
    }
});
