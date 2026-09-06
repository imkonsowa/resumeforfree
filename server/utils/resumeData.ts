import type { D1Database } from '@cloudflare/workers-types';

export interface ResumeRow {
    id: string;
    name: string;
    language: string | null;
    data: string | Record<string, unknown>;
    photo_url: string | null;
    updated_at: string;
}

export type ResumeDataRecord = Record<string, unknown>;

export async function loadResume(db: D1Database, resumeId: string, userId: string): Promise<{ row: ResumeRow; data: ResumeDataRecord }> {
    const row = await db
        .prepare('SELECT id, name, language, data, photo_url, updated_at FROM resumes WHERE id = ? AND user_id = ?')
        .bind(resumeId, userId)
        .first<ResumeRow>();

    if (!row) {
        throw createError({ statusCode: 404, statusMessage: 'Resume not found' });
    }
    const data = (typeof row.data === 'string' ? JSON.parse(row.data) : row.data) as ResumeDataRecord;
    return { row, data };
}

export async function saveResumeData(db: D1Database, resumeId: string, userId: string, data: ResumeDataRecord): Promise<void> {
    const payload = { ...data };
    delete payload.photo;
    await db
        .prepare('UPDATE resumes SET data = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?')
        .bind(JSON.stringify(payload), resumeId, userId)
        .run();
}

export function readSection(data: ResumeDataRecord, section: string): Record<string, unknown>[] {
    const value = data[section];
    return Array.isArray(value) ? value as Record<string, unknown>[] : [];
}
