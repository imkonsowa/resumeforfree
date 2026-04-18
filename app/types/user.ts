export interface User {
    id: string;
    email: string;
    name?: string;
    verified: boolean;
    role: 'user' | 'admin';
    createdAt?: string;
    updatedAt?: string;
}
