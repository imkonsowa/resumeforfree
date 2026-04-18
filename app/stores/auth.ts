import { defineStore } from 'pinia';
import type { User } from '~/types/user';
import type { LoginRequest, RegisterRequest } from '~/types/api';

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

const USER_COOKIE = 'user_info';

function decodeUserCookie(raw: string | null | undefined): User | null {
    if (!raw) return null;
    try {
        const json = decodeURIComponent(escape(atob(raw)));
        const parsed = JSON.parse(json) as User;
        if (!parsed?.id || !parsed?.email) return null;
        return parsed;
    }
    catch {
        return null;
    }
}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        user: null,
        token: null,
        isAuthenticated: false,
    }),
    getters: {
        currentUser: state => state.user,
        isLoggedIn: state => state.isAuthenticated && Boolean(state.user),
    },
    actions: {
        hydrateFromCookie() {
            const cookie = useCookie<string | null>(USER_COOKIE, {
                default: () => null,
                sameSite: 'lax',
                path: '/',
                secure: import.meta.env.PROD,
            });
            const user = decodeUserCookie(cookie.value);
            if (user) {
                this.user = user;
                this.isAuthenticated = true;
                this.token = 'session';
            }
            else {
                this.clearAuth();
            }
        },
        async login(payload: LoginRequest) {
            const api = useApi();
            return await api.auth.login(payload)
                .then((result) => {
                    if (result?.user) {
                        this.setAuth(result.user);
                    }
                    return { success: true };
                })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .catch((error: any) => {
                    console.error('Login error:', error);
                    return {
                        success: false,
                        error: error?.message || 'Login failed',
                    };
                });
        },
        async register(payload: RegisterRequest) {
            const api = useApi();
            return await api.auth.register(payload)
                .then((result) => {
                    if (result?.user) {
                        this.setAuth(result.user);
                    }
                    return { success: true };
                })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .catch((error: any) => {
                    console.error('Registration error:', error);
                    return {
                        success: false,
                        error: error?.message || 'Registration failed',
                    };
                });
        },
        async logout() {
            const api = useApi();
            return await api.auth.logout()
                .then(() => {
                    this.clearAuth();
                    return { success: true };
                })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .catch((error: any) => {
                    console.error('Logout error:', error);
                    this.clearAuth();
                    return {
                        success: false,
                        error: error?.message || 'Logout failed',
                    };
                });
        },
        async refreshAuth() {
            const api = useApi();
            return await api.auth.getSession()
                .then((result) => {
                    if (result?.user) {
                        this.setAuth(result.user);
                        return { success: true };
                    }
                    this.clearAuth();
                    return { success: false, error: 'No valid session' };
                })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .catch((error: any) => {
                    console.error('Auth refresh error:', error);
                    this.clearAuth();
                    return {
                        success: false,
                        error: error?.message || 'Auth refresh failed',
                    };
                });
        },
        setAuth(user: User) {
            this.user = user;
            this.token = 'session';
            this.isAuthenticated = true;
        },
        clearAuth() {
            this.user = null;
            this.token = null;
            this.isAuthenticated = false;
            const cookie = useCookie<string | null>(USER_COOKIE, {
                sameSite: 'lax',
                path: '/',
                secure: import.meta.env.PROD,
            });
            cookie.value = null;
        },
        async initializeAuth() {
            await this.refreshAuth().catch((error) => {
                console.error('Auth initialization error:', error);
                this.clearAuth();
            });
        },
    },
});
