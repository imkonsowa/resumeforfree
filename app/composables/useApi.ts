import type { ChangePasswordRequest, LoginRequest, RegisterRequest, ResumeCreateRequest, ResumeUpdateRequest } from '~/types/api';

export const useApi = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleError = (error: any) => {
        console.error('API Error:', error);
        const message = error?.data?.message || error?.statusMessage || error?.message || 'An error occurred';
        throw new Error(message);
    };
    return {
        auth: {
            async login(payload: LoginRequest) {
                return await $fetch('/api/auth/login', {
                    method: 'POST',
                    body: payload,
                }).catch(handleError);
            },
            async register(payload: RegisterRequest) {
                return await $fetch('/api/auth/register', {
                    method: 'POST',
                    body: payload,
                }).catch(handleError);
            },
            async logout() {
                return await $fetch('/api/auth/logout', {
                    method: 'POST',
                }).catch(handleError);
            },
            async getSession() {
                return await $fetch('/api/auth/session').catch(handleError);
            },
            async changePassword(payload: ChangePasswordRequest) {
                return await $fetch('/api/auth/change-password', {
                    method: 'POST',
                    body: payload,
                }).catch(handleError);
            },
        },
        resumes: {
            async list() {
                return await $fetch('/api/resumes').then(({ resumes }) => resumes).catch(handleError);
            },
            async get(id: string) {
                return await $fetch(`/api/resumes/${id}`).then(({ resume }) => resume).catch(handleError);
            },
            async create(payload: ResumeCreateRequest) {
                return await $fetch('/api/resumes', {
                    method: 'POST',
                    body: payload,
                }).then(({ resume }) => resume).catch(handleError);
            },
            async update(id: string, updates: ResumeUpdateRequest) {
                return await $fetch(`/api/resumes/${id}`, {
                    method: 'PUT',
                    body: updates,
                }).then(({ resume }) => resume).catch(handleError);
            },
            async delete(id: string) {
                return await $fetch(`/api/resumes/${id}`, {
                    method: 'DELETE',
                }).then(() => true).catch(handleError);
            },
            async duplicate(id: string, name?: string) {
                return await $fetch(`/api/resumes/${id}/duplicate`, {
                    method: 'POST',
                    body: { name },
                }).then(({ resume }) => resume).catch(handleError);
            },
            async activate(id: string) {
                return await $fetch(`/api/resumes/${id}/activate`, {
                    method: 'POST',
                }).then(() => true).catch(handleError);
            },
            async share(id: string, expiresInDays?: number) {
                return await $fetch(`/api/resumes/${id}/share`, {
                    method: 'POST',
                    body: { expiresInDays },
                }).catch(handleError);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            async sync(data: { resumes: any[] }) {
                return await $fetch('/api/resumes/sync', {
                    method: 'POST',
                    body: data,
                }).catch(handleError);
            },
            async uploadPhoto(id: string, file: Blob) {
                const form = new FormData();
                form.append('file', file);
                return await $fetch(`/api/resumes/${id}/photo`, {
                    method: 'POST',
                    body: form,
                }).then(({ photo }) => photo).catch(handleError);
            },
            async deletePhoto(id: string) {
                return await $fetch(`/api/resumes/${id}/photo`, {
                    method: 'DELETE',
                }).then(() => true).catch(handleError);
            },
        },
        share: {
            async getByToken(token: string) {
                return await $fetch(`/api/share/${token}`).then(({ resume }) => resume).catch(handleError);
            },
        },
        settings: {
            async get() {
                return await $fetch('/api/settings').catch(handleError);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            async update(settings: any) {
                return await $fetch('/api/settings', {
                    method: 'PUT',
                    body: { settings },
                }).catch(handleError);
            },
        },
    };
};
