import jwt from '@tsndr/cloudflare-worker-jwt';
import bcrypt from 'bcryptjs';
import type { D1Database } from '@cloudflare/workers-types';
import type { UserModel } from '~~/server/database/schema';

const JWT_SECRET = process.env.JWT_SECRET;
class DatabaseService {
    constructor(private db: D1Database) {}
    async getUserByEmail(email: string): Promise<UserModel | null> {
        return await this.db
            .prepare('SELECT * FROM users WHERE email = ?')
            .bind(email)
            .first<UserModel>();
    }

    async createUser(email: string, passwordHash: string, name?: string): Promise<string> {
        const userId = crypto.randomUUID().replace(/-/g, '').slice(0, 16);
        await this.db
            .prepare('INSERT INTO users (id, email, password_hash, name, verified) VALUES (?, ?, ?, ?, 1)')
            .bind(userId, email, passwordHash, name || email.split('@')[0])
            .run();
        return userId;
    }
}
export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const db = event.context.cloudflare?.env?.DB;

    if (!db) {
        const body = await readBody(event);
        const { email, password, name, turnstileToken } = body;

        if (process.env.NODE_ENV === 'production' && turnstileToken) {
            const isValidToken = await verifyTurnstileToken(turnstileToken, config.turnstile.secretKey);
            if (!isValidToken) {
                throw createError({
                    statusCode: 400,
                    statusMessage: 'Invalid captcha verification',
                });
            }
        }
        if (!email || !password) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Email and password are required',
            });
        }
        if (password.length < 6) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Password must be at least 6 characters long',
            });
        }
        const mockUser = {
            id: 'dev-user-' + Buffer.from(email).toString('base64').slice(0, 8),
            email,
            name: name || email.split('@')[0],
            verified: true,
            role: 'user' as const,
        };
        const token = await jwt.sign(
            {
                sub: mockUser.id,
                email: mockUser.email,
                role: mockUser.role,
                iat: Math.floor(Date.now() / 1000),
                exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60),
            },
            JWT_SECRET,
        );
        setAuthCookies(event, token, mockUser);
        return {
            user: mockUser,
            token,
        };
    }
    const body = await readBody(event);
    const { email, password, name, turnstileToken } = body;

    if (process.env.NODE_ENV === 'production') {
        const isValidToken = await verifyTurnstileToken(turnstileToken, config.turnstile.secretKey);
        if (!isValidToken) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Invalid captcha verification',
            });
        }
    }

    if (!email || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email and password are required',
        });
    }
    if (password.length < 6) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Password must be at least 6 characters long',
        });
    }
    const dbService = new DatabaseService(db);
    const existingUser = await dbService.getUserByEmail(email);
    if (existingUser) {
        throw createError({
            statusCode: 400,
            statusMessage: 'User already exists',
        });
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const userId = await dbService.createUser(email, passwordHash, name);
    const defaultRole = 'user';
    const token = await jwt.sign(
        {
            sub: userId,
            email: email,
            role: defaultRole,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60),
        },
        JWT_SECRET,
    );
    const publicUser = {
        id: userId,
        email: email,
        name: name || email.split('@')[0],
        verified: true,
        role: defaultRole,
    };
    setAuthCookies(event, token, publicUser);
    return {
        user: publicUser,
        token,
    };
});
