import { describe, it, expect } from 'vitest';
import { toIsoUtc } from '~~/server/utils/datetime';

describe('toIsoUtc', () => {
    it('marks a SQLite CURRENT_TIMESTAMP as UTC', () => {
        expect(toIsoUtc('2026-09-06 13:55:12')).toBe('2026-09-06T13:55:12Z');
    });

    it('makes a server timestamp compare correctly against a client ISO string', () => {
        const serverRaw = '2026-09-06 13:55:12';
        const clientWroteAt = new Date('2026-09-06T13:00:00.000Z');

        const naive = new Date(serverRaw);
        const fixed = new Date(toIsoUtc(serverRaw)!);

        expect(
            fixed > clientWroteAt,
            'a server row written after the local copy must look newer, or the client never pulls it',
        ).toBe(true);

        if (new Date().getTimezoneOffset() < 0) {
            expect(
                naive > clientWroteAt,
                'sanity: east of UTC the naive parse is what caused the missed pull',
            ).toBe(false);
        }
    });

    it('is stable when applied to an already-ISO value', () => {
        const iso = '2026-09-06T13:55:12.000Z';
        expect(new Date(toIsoUtc(iso)!).getTime()).toBe(new Date(iso).getTime());
    });

    it('passes through null and undefined', () => {
        expect(toIsoUtc(null)).toBeNull();
        expect(toIsoUtc(undefined)).toBeNull();
        expect(toIsoUtc('')).toBeNull();
    });

    it('leaves an unparseable value untouched rather than emitting Invalid Date', () => {
        expect(toIsoUtc('not a date')).toBe('not a date');
    });
});
