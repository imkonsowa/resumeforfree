import type { Resume } from './resume';

export interface LoginRequest {
    email: string;
    password?: string;
    turnstileToken?: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    passwordConfirm: string;
    name: string;
    turnstileToken?: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

export interface Pagination {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export type ResumeCreateRequest = Pick<Resume, 'name' | 'data'>
    & Partial<Pick<Resume, 'language' | 'settings'>>;

export type ResumeUpdateRequest = Partial<Pick<Resume, 'name' | 'language' | 'data' | 'settings'>>
    & { isActive?: boolean };

export interface AdminResumeListItem {
    id: string;
    user_id: string;
    user_email?: string;
    name: string;
    language?: string;
    template?: string;
    is_active?: boolean;
    created_at: string;
    updated_at: string;
}

export interface AdminContactMessage {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'resolved';
    ip_address?: string;
    user_agent?: string;
    created_at: string;
    updated_at: string;
}
