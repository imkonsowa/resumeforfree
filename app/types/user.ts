export type AuthProvider = 'email' | 'google';

export interface User {
    id: string;
    email: string;
    name?: string;
    verified: boolean;
    authProvider?: AuthProvider;
    createdAt?: string;
    updatedAt?: string;
}
