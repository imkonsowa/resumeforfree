import type { D1Database } from '@cloudflare/workers-types';

export default defineEventHandler(async (event) => {
    // Verify admin authentication
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

    try {
        // Delete resume
        const result = await db.prepare('DELETE FROM resumes WHERE id = ?')
            .bind(resumeId)
            .run();

        if (result.meta.changes === 0) {
            throw createError({
                statusCode: 404,
                statusMessage: 'Resume not found',
            });
        }

        return {
            success: true,
            message: 'Resume deleted',
        };
    }
    catch (error: unknown) {
        if ((error as { statusCode?: number }).statusCode) {
            throw error;
        }
        console.error('Error deleting resume:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to delete resume',
        });
    }
});
