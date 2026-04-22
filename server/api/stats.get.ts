import type { D1Database } from '@cloudflare/workers-types';

interface PublicStats {
    users: number;
    resumes: number;
    downloads: number;
}

const DEFAULT_STATS: PublicStats = { users: 0, resumes: 0, downloads: 0 };
const SIX_HOURS = 60 * 60 * 6;

export default defineEventHandler(async (event): Promise<PublicStats> => {
    setResponseHeader(
        event,
        'Cache-Control',
        `public, max-age=60, s-maxage=${SIX_HOURS}, stale-while-revalidate=${SIX_HOURS}`,
    );

    const db = event.context.cloudflare?.env?.DB as D1Database | undefined;
    if (!db) return DEFAULT_STATS;

    try {
        const result = await db
            .prepare(`SELECT name, count FROM counters WHERE name IN ('users', 'resumes', 'downloads')`)
            .all<{ name: string; count: number }>();

        const stats = { ...DEFAULT_STATS };
        for (const row of result.results ?? []) {
            if (row.name in stats) {
                (stats as Record<string, number>)[row.name] = row.count ?? 0;
            }
        }
        return stats;
    }
    catch (error) {
        console.error('Failed to fetch stats:', error);
        return DEFAULT_STATS;
    }
});
