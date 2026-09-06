const SQLITE_DATETIME = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;

/**
 * SQLite CURRENT_TIMESTAMP yields "YYYY-MM-DD HH:MM:SS" in UTC with no timezone
 * marker. `new Date()` reads that as local time, so clients east of UTC see
 * server rows as older than they are and never pull them. Emit ISO 8601 UTC.
 */
export function toIsoUtc(value: string | null | undefined): string | null {
    if (!value) return null;
    if (SQLITE_DATETIME.test(value)) return `${value.replace(' ', 'T')}Z`;
    const parsed = new Date(value);
    return Number.isNaN(parsed.getTime()) ? value : parsed.toISOString();
}
