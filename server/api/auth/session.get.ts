import jwt from '@tsndr/cloudflare-worker-jwt';
import type { D1Database } from '@cloudflare/workers-types';

const JWT_SECRET = process.env.JWT_SECRET;
interface User {
    id: string;
    email: string;
    password_hash: string;
    name?: string;
    verified: boolean;
    role: 'user' | 'admin';
    verification_token?: string;
    verification_sent_at?: string;
    created_at: string;
    updated_at: string;
}
class DatabaseService {
    constructor(private db: D1Database) {}
    async getUserById(id: string): Promise<User | null> {
        return await this.db
            .prepare('SELECT * FROM users WHERE id = ?')
            .bind(id)
            .first<User>();
    }
}
export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth-token');
    if (!token) {
        clearAuthCookies(event);
        throw createError({
            statusCode: 401,
            statusMessage: 'No authentication token',
        });
    }
    try {
        const isValid = await jwt.verify(token, JWT_SECRET);
        if (!isValid) {
            clearAuthCookies(event);
            throw createError({
                statusCode: 401,
                statusMessage: 'Invalid token',
            });
        }
        const decoded = jwt.decode(token);
        const payload = decoded.payload as { sub: string; email?: string; role?: 'user' | 'admin' };
        const db = event.context.cloudflare?.env?.DB;
        if (!db) {
            if (!payload.email) {
                clearAuthCookies(event);
                throw createError({
                    statusCode: 401,
                    statusMessage: 'Invalid session',
                });
            }
            const mockUser = {
                id: payload.sub,
                email: payload.email,
                name: payload.email.split('@')[0],
                verified: true,
                role: payload.role || 'user' as const,
            };
            setAuthCookies(event, token, mockUser);
            return { user: mockUser };
        }
        const dbService = new DatabaseService(db);
        const user = await dbService.getUserById(payload.sub);
        if (!user) {
            clearAuthCookies(event);
            throw createError({
                statusCode: 401,
                statusMessage: 'User not found',
            });
        }
        const publicUser = {
            id: user.id,
            email: user.email,
            name: user.name,
            verified: user.verified,
            role: user.role,
        };
        setAuthCookies(event, token, publicUser);
        return { user: publicUser };
    }
    catch {
        clearAuthCookies(event);
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid token',
        });
    }
});
