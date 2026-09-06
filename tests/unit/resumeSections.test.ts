import { describe, it, expect } from 'vitest';
import {
    SECTION_NAMES,
    buildPersonalPatch,
    buildSectionItem,
    getSectionSpec,
    parseIndex,
    validateFieldName,
} from '~~/server/utils/resumeSections';

describe('section registry', () => {
    it('covers every array section of ResumeData', () => {
        expect(SECTION_NAMES.sort()).toEqual([
            'certificates', 'education', 'experiences', 'internships',
            'languages', 'projects', 'skills', 'socialLinks', 'volunteering',
        ]);
    });

    it('rejects an unknown section', () => {
        expect(() => getSectionSpec('nope')).toThrowError(/Unknown section/);
    });

    it('rejects an unknown field on a known section', () => {
        expect(() => validateFieldName('experiences', 'salary')).toThrowError(/Unknown field/);
    });
});

describe('buildSectionItem', () => {
    it('builds a valid experience and defaults achievements', () => {
        const item = buildSectionItem('experiences', { company: 'Saab', position: 'Software Architect' });
        expect(item).toMatchObject({ company: 'Saab', position: 'Software Architect', achievements: [] });
    });

    it('accepts achievements as plain strings and normalises them', () => {
        const item = buildSectionItem('experiences', {
            company: 'Saab', position: 'Architect', achievements: ['Led modernisation', { text: 'Built AI lab' }],
        });
        expect(item.achievements).toEqual([{ text: 'Led modernisation' }, { text: 'Built AI lab' }]);
    });

    it('merges onto a base item instead of dropping untouched fields', () => {
        const base = { company: 'Saab', position: 'Senior Engineer', location: 'Abu Dhabi', achievements: [{ text: 'x' }] };
        const merged = buildSectionItem('experiences', { position: 'Software Architect' }, base);
        expect(merged).toMatchObject({
            company: 'Saab', position: 'Software Architect', location: 'Abu Dhabi', achievements: [{ text: 'x' }],
        });
    });

    it('rejects unknown fields rather than silently storing them', () => {
        expect(() => buildSectionItem('experiences', { company: 'A', position: 'B', salary: 100 }))
            .toThrowError(/Unknown field/);
    });

    it('enforces required fields', () => {
        expect(() => buildSectionItem('experiences', { company: 'Saab' })).toThrowError(/"position" is required/);
    });

    it('rejects wrong types', () => {
        expect(() => buildSectionItem('experiences', { company: 'A', position: 'B', isPresent: 'yes' }))
            .toThrowError(/must be a boolean/);
        expect(() => buildSectionItem('experiences', { company: 'A', position: 'B', achievements: 'nope' }))
            .toThrowError(/must be an array/);
    });

    it('normalises project links and defaults a missing label', () => {
        const item = buildSectionItem('projects', { title: 'Radar', links: [{ url: 'https://x.dev' }] });
        expect(item.links).toEqual([{ url: 'https://x.dev', label: '' }]);
    });

    it('rejects a malformed project link', () => {
        expect(() => buildSectionItem('projects', { title: 'Radar', links: [{ label: 'no url' }] }))
            .toThrowError(/must be \{ url: string/);
    });
});

describe('buildPersonalPatch', () => {
    it('accepts known personal fields', () => {
        expect(buildPersonalPatch({ firstName: 'Ibrahim', summary: 'Architect' }))
            .toEqual({ firstName: 'Ibrahim', summary: 'Architect' });
    });

    it('rejects writes to structural fields', () => {
        expect(() => buildPersonalPatch({ sectionOrder: {} })).toThrowError(/Unknown field/);
        expect(() => buildPersonalPatch({ experiences: [] })).toThrowError(/Unknown field/);
    });
});

describe('parseIndex', () => {
    it('accepts an in-range index', () => {
        expect(parseIndex('2', 5)).toBe(2);
    });

    it('rejects out-of-range and non-integer indexes', () => {
        expect(() => parseIndex('5', 5)).toThrowError(/out of range/);
        expect(() => parseIndex('-1', 5)).toThrowError(/non-negative integer/);
        expect(() => parseIndex('abc', 5)).toThrowError(/non-negative integer/);
    });
});
