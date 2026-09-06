import { getDb, requireSessionUserId } from '~~/server/utils/apiAuth';

export default defineEventHandler(async (event) => {
    const userId = await requireSessionUserId(event);
    const tokenId = getRouterParam(event, 'id');
    if (!tokenId) {
        throw createError({ statusCode: 400, statusMessage: 'Token ID is required' });
    }
    const db = getDb(event);

    const existing = await db
        .prepare('SELECT id FROM api_tokens WHERE id = ? AND user_id = ?')
        .bind(tokenId, userId)
        .first<{ id: string }>();
    if (!existing) {
        throw createError({ statusCode: 404, statusMessage: 'Token not found' });
    }

    await db
        .prepare('UPDATE api_tokens SET revoked_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ? AND revoked_at IS NULL')
        .bind(tokenId, userId)
        .run();

    return { revoked: true, id: tokenId };
});
