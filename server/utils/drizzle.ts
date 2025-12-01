import { drizzle } from 'drizzle-orm/d1';
import type { D1Database } from '@cloudflare/workers-types';
import type { H3Event } from 'h3';
import * as schema from '../database/schema';

// Re-export schema for use in API routes
export * from '../database/schema';

export function useDrizzle(event: H3Event) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d1 = (event.context as any).cloudflare?.env?.DB as D1Database;

    if (!d1) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Database not configured',
        });
    }

    return drizzle(d1, { schema });
}

export function getD1(event: H3Event): D1Database {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d1 = (event.context as any).cloudflare?.env?.DB as D1Database;

    if (!d1) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Database not configured',
        });
    }

    return d1;
}
