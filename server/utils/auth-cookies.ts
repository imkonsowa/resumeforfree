import type { H3Event } from 'h3';

export interface AuthedUserPublic {
    id: string;
    email: string;
    name?: string;
    verified: boolean;
    role: 'user' | 'admin';
}

const TOKEN_COOKIE = 'auth-token';
const USER_COOKIE = 'user_info';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

const baseOptions = () => ({
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
});

export function setAuthCookies(event: H3Event, token: string, user: AuthedUserPublic) {
    setCookie(event, TOKEN_COOKIE, token, {
        ...baseOptions(),
        httpOnly: true,
        maxAge: MAX_AGE_SECONDS,
    });

    const payload = {
        id: user.id,
        email: user.email,
        name: user.name,
        verified: user.verified,
        role: user.role,
    };
    const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(payload))));

    setCookie(event, USER_COOKIE, encoded, {
        ...baseOptions(),
        httpOnly: false,
        maxAge: MAX_AGE_SECONDS,
    });
}

export function clearAuthCookies(event: H3Event) {
    setCookie(event, TOKEN_COOKIE, '', {
        ...baseOptions(),
        httpOnly: true,
        maxAge: 0,
    });
    setCookie(event, USER_COOKIE, '', {
        ...baseOptions(),
        httpOnly: false,
        maxAge: 0,
    });
}
