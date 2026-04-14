import jwt from '@tsndr/cloudflare-worker-jwt';
import bcrypt from 'bcryptjs';
import type { D1Database } from '@cloudflare/workers-types';

const JWT_SECRET = process.env.JWT_SECRET || '';

export default defineOAuthGoogleEventHandler({
    config: {
        scope: ['email', 'profile', 'openid'],
    },

    async onSuccess(event, { user: googleUser }) {
        const email = (googleUser?.email || '').toLowerCase();

        if (!email) {
            console.error('[google-oauth] No email on Google user payload');
            return sendRedirect(event, '/auth/login?error=google_no_email');
        }

        try {
            const db = event.context.cloudflare?.env?.DB as D1Database | undefined;

            if (!db) {
                const mockUser = {
                    id: 'dev-user-' + btoa(email).slice(0, 8),
                    email,
                    name: googleUser.name || googleUser.given_name || email.split('@')[0],
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
                return sendRedirect(event, '/resumes');
            }

            const existing = await db
                .prepare('SELECT * FROM users WHERE email = ?')
                .bind(email)
                .first();

            let user = existing;

            if (!user) {
                const randomSecret = crypto.randomUUID() + crypto.randomUUID();
                const passwordHash = await bcrypt.hash(randomSecret, 12);
                const userId = crypto.randomUUID().replace(/-/g, '').slice(0, 16);
                const name = googleUser.name || googleUser.given_name || email.split('@')[0];

                await db
                    .prepare('INSERT INTO users (id, email, password_hash, name, verified, auth_provider) VALUES (?, ?, ?, ?, 1, ?)')
                    .bind(userId, email, passwordHash, name, 'google')
                    .run();

                user = await db
                    .prepare('SELECT * FROM users WHERE email = ?')
                    .bind(email)
                    .first();

                if (!user) {
                    console.error('[google-oauth] No user after insert + refetch');
                    return sendRedirect(event, '/auth/login?error=user_creation_failed');
                }
            }

            const token = await jwt.sign(
                {
                    sub: user.id as string,
                    email: user.email as string,
                    role: (user.role as string) || 'user',
                    iat: Math.floor(Date.now() / 1000),
                    exp: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60),
                },
                JWT_SECRET,
            );

            setAuthCookies(event, token, {
                id: user.id as string,
                email: user.email as string,
                name: (user.name as string) || undefined,
                verified: Boolean(user.verified),
                role: (user.role as 'user' | 'admin') || 'user',
            });

            return sendRedirect(event, '/resumes');
        }
        catch (e: unknown) {
            const error = e as Error;
            console.error('[google-oauth] onSuccess threw:', error?.message, error?.stack);
            return sendRedirect(event, '/auth/login?error=google_handler_error');
        }
    },

    onError(event, error) {
        console.error('[google-oauth] onError:', error);
        return sendRedirect(event, '/auth/login?error=google_oauth_failed');
    },
});
