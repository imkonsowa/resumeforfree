import { describe, it, expect } from 'vitest';
import { readFileSync, statSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(__dirname, '../..');
const manifestPath = resolve(root, 'public/fonts/manifest.json');

interface Entry {
    url: string;
    bytes: number;
    info: { family: string; coverage: number[] }[];
    conditions: { t: string; v: string }[];
}

const manifest: Entry[] = JSON.parse(readFileSync(manifestPath, 'utf8'));

describe('font manifest', () => {
    it('is committed and non-empty', () => {
        expect(manifest.length).toBeGreaterThan(0);
    });

    it('references font files that exist on disk', () => {
        for (const entry of manifest) {
            const path = resolve(root, 'public', entry.url.replace(/^\//, ''));
            expect(existsSync(path), `${entry.url} is missing`).toBe(true);
        }
    });

    it('matches the size of every font file on disk', () => {
        for (const entry of manifest) {
            const path = resolve(root, 'public', entry.url.replace(/^\//, ''));
            expect(statSync(path).size, `${entry.url} changed — run: npm run fonts:manifest`).toBe(entry.bytes);
        }
    });

    it('carries the coverage and integrity data lazy loading depends on', () => {
        for (const entry of manifest) {
            expect(entry.info.length, `${entry.url} has no font info`).toBeGreaterThan(0);
            expect(entry.info[0].coverage.length, `${entry.url} has no coverage map`).toBeGreaterThan(0);
            expect(entry.conditions.length, `${entry.url} has no integrity condition`).toBeGreaterThan(0);
        }
    });
});
