import { getDb, requireSessionUserId } from '~~/server/utils/apiAuth';

export default defineEventHandler(async (event) => {
    const userId = await requireSessionUserId(event);
    const db = getDb(event);

    const result = await db
        .prepare(`SELECT id, name, token_prefix, expires_at, last_used_at, revoked_at, created_at
                  FROM api_tokens WHERE user_id = ? ORDER BY created_at DESC LIMIT 50`)
        .bind(userId)
        .all<{
        id: string;
        name: string;
        token_prefix: string;
        expires_at: string;
        last_used_at: string | null;
        revoked_at: string | null;
        created_at: string;
    }>();

    const now = Date.now();
    return {
        tokens: (result.results || []).map(row => ({
            id: row.id,
            name: row.name,
            prefix: row.token_prefix,
            expiresAt: row.expires_at,
            lastUsedAt: row.last_used_at,
            revokedAt: row.revoked_at,
            createdAt: row.created_at,
            active: !row.revoked_at && new Date(`${row.expires_at.replace(' ', 'T')}Z`).getTime() > now,
        })),
    };
});
