import jwt from '@tsndr/cloudflare-worker-jwt';
import type { H3Event } from 'h3';

const JWT_SECRET = process.env.JWT_SECRET;

interface JWTPayload {
    sub: string;
    email: string;
    role?: 'user' | 'admin';
    iat: number;
    exp: number;
}

/**
 * Verify JWT token and extract payload
 * Supports both cookie-based auth (web) and Authorization header (mobile)
 */
export async function verifyAuthToken(event: H3Event): Promise<JWTPayload | null> {
    // Check Authorization header first (for mobile/API clients)
    const authHeader = getHeader(event, 'Authorization');
    let token = authHeader?.replace('Bearer ', '');

    // Fall back to cookie for web clients
    if (!token) {
        token = getCookie(event, 'auth-token');
    }

    if (!token) {
        return null;
    }

    try {
        const isValid = await jwt.verify(token, JWT_SECRET);
        if (!isValid) {
            return null;
        }

        const decoded = jwt.decode(token);
        return decoded.payload as JWTPayload;
    }
    catch {
        return null;
    }
}

/**
 * Verify that the user is an admin
 * Throws an error if not authenticated or not an admin
 */
export async function requireAdmin(event: H3Event): Promise<JWTPayload> {
    const payload = await verifyAuthToken(event);

    if (!payload) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Not found',
        });
    }

    if (payload.role !== 'admin') {
        throw createError({
            statusCode: 404,
            statusMessage: 'Not found',
        });
    }

    return payload;
}
