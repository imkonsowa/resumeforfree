import type { D1Database } from '@cloudflare/workers-types';

export default defineEventHandler(async (event) => {
    await requireAdmin(event);

    const db = event.context.cloudflare?.env?.DB as D1Database;
    if (!db) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Database not configured',
        });
    }

    const resumeId = getRouterParam(event, 'id');
    if (!resumeId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Resume ID required',
        });
    }

    const body = await readBody(event);
    const language = typeof body?.language === 'string' ? body.language.trim() : '';
    if (!language) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Language is required',
        });
    }

    try {
        const result = await db
            .prepare('UPDATE resumes SET language = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?')
            .bind(language, resumeId)
            .run();

        if (result.meta.changes === 0) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Resume not found',
            });
        }

        return { success: true, language };
    }
    catch (error: unknown) {
        if ((error as { statusCode?: number }).statusCode) {
            throw error;
        }
        console.error('Error updating resume language:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to update resume language',
        });
    }
});
