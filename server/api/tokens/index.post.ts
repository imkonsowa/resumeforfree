import { DEFAULT_TOKEN_TTL_HOURS, MAX_TOKEN_TTL_HOURS, generateToken, getDb, hashToken, requireSessionUserId } from '~~/server/utils/apiAuth';
import { toIsoUtc } from '~~/server/utils/datetime';

const MAX_ACTIVE_TOKENS = 10;

export default defineEventHandler(async (event) => {
    const userId = await requireSessionUserId(event);
    const db = getDb(event);
    const body = await readBody(event).catch(() => ({}));

    const name = typeof body?.name === 'string' && body.name.trim() ? body.name.trim().slice(0, 60) : 'Agent token';
    const requestedHours = body?.expiresInHours === undefined ? DEFAULT_TOKEN_TTL_HOURS : Number(body.expiresInHours);
    if (!Number.isFinite(requestedHours) || requestedHours <= 0 || requestedHours > MAX_TOKEN_TTL_HOURS) {
        throw createError({
            statusCode: 400,
            statusMessage: `expiresInHours must be between 1 and ${MAX_TOKEN_TTL_HOURS}`,
        });
    }

    const active = await db
        .prepare('SELECT COUNT(*) AS count FROM api_tokens WHERE user_id = ? AND revoked_at IS NULL AND expires_at > CURRENT_TIMESTAMP')
        .bind(userId)
        .first<{ count: number }>();
    if ((active?.count ?? 0) >= MAX_ACTIVE_TOKENS) {
        throw createError({
            statusCode: 429,
            statusMessage: `You already have ${MAX_ACTIVE_TOKENS} active tokens; revoke one first`,
        });
    }

    const { token, prefix } = generateToken();
    const tokenHash = await hashToken(token);
    const expiresAt = new Date(Date.now() + requestedHours * 3600 * 1000).toISOString().replace('T', ' ').slice(0, 19);

    await db
        .prepare('INSERT INTO api_tokens (user_id, name, token_hash, token_prefix, expires_at) VALUES (?, ?, ?, ?, ?)')
        .bind(userId, name, tokenHash, prefix, expiresAt)
        .run();

    const created = await db
        .prepare('SELECT id, name, token_prefix, expires_at, created_at FROM api_tokens WHERE token_hash = ?')
        .bind(tokenHash)
        .first<{ id: string; name: string; token_prefix: string; expires_at: string; created_at: string }>();

    return {
        token,
        warning: 'Copy this token now. It is stored hashed and cannot be shown again.',
        apiToken: {
            id: created?.id,
            name: created?.name,
            prefix: created?.token_prefix,
            expiresAt: toIsoUtc(created?.expires_at),
            createdAt: toIsoUtc(created?.created_at),
        },
    };
});
