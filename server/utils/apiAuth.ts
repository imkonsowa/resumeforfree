import jwt from '@tsndr/cloudflare-worker-jwt';
import type { H3Event } from 'h3';
import type { D1Database } from '@cloudflare/workers-types';

export const TOKEN_PREFIX = 'rff_';
export const DEFAULT_TOKEN_TTL_HOURS = 24;
export const MAX_TOKEN_TTL_HOURS = 24 * 30;

export function getDb(event: H3Event): D1Database {
    const db = event.context.cloudflare?.env?.DB as D1Database | undefined;
    if (!db) {
        throw createError({ statusCode: 500, statusMessage: 'Database not configured' });
    }
    return db;
}

export async function hashToken(token: string): Promise<string> {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(token));
    return [...new Uint8Array(digest)].map(b => b.toString(16).padStart(2, '0')).join('');
}

export function generateToken(): { token: string; prefix: string } {
    const bytes = crypto.getRandomValues(new Uint8Array(32));
    const body = [...bytes].map(b => b.toString(16).padStart(2, '0')).join('');
    return { token: `${TOKEN_PREFIX}${body}`, prefix: body.slice(0, 8) };
}

function bearerToken(event: H3Event): string | null {
    const header = getRequestHeader(event, 'authorization');
    if (!header) return null;
    const match = header.match(/^Bearer\s+(.+)$/i);
    return match ? match[1].trim() : null;
}

async function userIdFromApiToken(event: H3Event, token: string): Promise<string> {
    const db = getDb(event);
    const tokenHash = await hashToken(token);
    const row = await db
        .prepare('SELECT id, user_id, expires_at, revoked_at FROM api_tokens WHERE token_hash = ?')
        .bind(tokenHash)
        .first<{ id: string; user_id: string; expires_at: string; revoked_at: string | null }>();

    if (!row) {
        throw createError({ statusCode: 401, statusMessage: 'Invalid API token' });
    }
    if (row.revoked_at) {
        throw createError({ statusCode: 401, statusMessage: 'API token revoked' });
    }
    if (new Date(`${row.expires_at.replace(' ', 'T')}Z`).getTime() <= Date.now()) {
        throw createError({ statusCode: 401, statusMessage: 'API token expired' });
    }

    await db
        .prepare('UPDATE api_tokens SET last_used_at = CURRENT_TIMESTAMP WHERE id = ?')
        .bind(row.id)
        .run();

    return row.user_id;
}

async function userIdFromCookie(event: H3Event): Promise<string> {
    const token = getCookie(event, 'auth-token');
    if (!token) {
        throw createError({ statusCode: 401, statusMessage: 'Authentication required' });
    }
    const isValid = await jwt.verify(token, process.env.JWT_SECRET);
    if (!isValid) {
        throw createError({ statusCode: 401, statusMessage: 'Invalid token' });
    }
    const payload = jwt.decode(token).payload as { sub: string };
    return payload.sub;
}

export async function requireUserId(event: H3Event): Promise<string> {
    const bearer = bearerToken(event);
    if (bearer) {
        return await userIdFromApiToken(event, bearer);
    }
    return await userIdFromCookie(event);
}

export async function requireSessionUserId(event: H3Event): Promise<string> {
    if (bearerToken(event)) {
        throw createError({
            statusCode: 403,
            statusMessage: 'API tokens cannot manage API tokens; sign in instead',
        });
    }
    return await userIdFromCookie(event);
}
