import { readdirSync, readFileSync, statSync } from 'fs';
import { join, relative, resolve } from 'path';
import { describe, it, expect } from 'vitest';

const API_DIR = resolve(__dirname, '../../server/api');
const ROOT = resolve(__dirname, '../..');

const walk = (dir: string): string[] =>
    readdirSync(dir).flatMap((entry) => {
        const full = join(dir, entry);
        return statSync(full).isDirectory() ? walk(full) : full.endsWith('.ts') ? [full] : [];
    });

const DATE_COLUMN = /\b\w+_at\b/;

/**
 * Response fields fed straight from a *_at column ship SQLite's
 * "YYYY-MM-DD HH:MM:SS", which new Date() reads as local time. Every one must
 * go through toIsoUtc so clients get an explicit UTC marker.
 */
function offendingLines(file: string): string[] {
    const src = readFileSync(file, 'utf8');
    return src.split('\n').flatMap((line, i) => {
        const isResponseField = /^\s*\w+:\s*.*\b\w+_at\b/.test(line);
        if (!isResponseField) return [];
        if (line.includes('toIsoUtc')) return [];
        // SQL text and type declarations are not response fields
        if (/SELECT|INSERT|UPDATE|DELETE|prepare\(|WHERE|VALUES|ORDER BY|CURRENT_TIMESTAMP/i.test(line)) return [];
        if (/:\s*(string|number|DATETIME)/.test(line)) return [];
        return [`${relative(ROOT, file)}:${i + 1}  ${line.trim()}`];
    });
}

describe('server responses always carry UTC timestamps', () => {
    const files = walk(API_DIR);

    it('finds API handlers to check', () => {
        expect(files.length).toBeGreaterThan(5);
    });

    it('no endpoint returns a raw SQLite datetime', () => {
        const offenders = files.flatMap(offendingLines);
        expect(
            offenders,
            'these response fields emit "YYYY-MM-DD HH:MM:SS", which clients parse as local time '
            + '— wrap them in toIsoUtc() from server/utils/datetime:\n' + offenders.join('\n'),
        ).toEqual([]);
    });

    it('no handler writes a local-time datetime into the database', () => {
        const offenders = files.filter((f) => {
            const src = readFileSync(f, 'utf8');
            return /datetime\('now',\s*'localtime'\)/.test(src) || /toLocaleString\(\).*INSERT/i.test(src);
        });
        expect(offenders.map(f => relative(ROOT, f))).toEqual([]);
    });

    it('every column the codebase treats as a date is UTC by construction', () => {
        const migrations = readdirSync(resolve(ROOT, 'migrations'))
            .filter(f => f.endsWith('.sql'))
            .map(f => readFileSync(resolve(ROOT, 'migrations', f), 'utf8'))
            .join('\n');
        expect(DATE_COLUMN.test(migrations)).toBe(true);
        expect(
            /localtime/i.test(migrations),
            'a migration defaults a timestamp to localtime; CURRENT_TIMESTAMP is already UTC',
        ).toBe(false);
    });
});
