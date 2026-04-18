export interface JWTPayload {
    sub: string;
    email: string;
    role?: 'user' | 'admin';
    iat: number;
    exp: number;
}

export interface ResumeUpdatePatch {
    name?: string;
    language?: string;
    data?: unknown;
    settings?: unknown;
    isActive?: boolean;
}
