import { readFileSync } from 'fs';
import { resolve } from 'path';
import { describe, it, expect } from 'vitest';
import { PERSONAL_FIELDS, SECTION_SPECS } from '~~/server/utils/resumeSections';

const source = readFileSync(resolve(__dirname, '../../app/types/resume.ts'), 'utf8');

const SECTION_TO_INTERFACE: Record<string, string> = {
    experiences: 'Experience',
    internships: 'Internship',
    education: 'Education',
    volunteering: 'Volunteering',
    projects: 'Project',
    certificates: 'Certificate',
    skills: 'SkillItem',
    languages: 'Language',
    socialLinks: 'SocialLink',
};

function interfaceBody(name: string): string {
    const match = source.match(new RegExp(`export interface ${name} \\{([\\s\\S]*?)\\n\\}`));
    if (!match) throw new Error(`interface ${name} not found in app/types/resume.ts`);
    return match[1]!;
}

function parseFields(body: string): Record<string, string> {
    const fields: Record<string, string> = {};
    for (const line of body.split('\n')) {
        const m = line.match(/^\s*(\w+)(\??):\s*(.+?);\s*$/);
        if (!m) continue;
        const [, name, , rawType] = m;
        let kind = rawType!.trim();
        if (kind === 'string') kind = 'string';
        else if (kind === 'boolean') kind = 'boolean';
        else if (/^Array<\{\s*text:\s*string\s*\}>$/.test(kind)) kind = 'achievements';
        else if (kind === 'ProjectLink[]') kind = 'links';
        fields[name!] = kind;
    }
    return fields;
}

describe('API request schemas match the resume structure', () => {
    for (const [section, interfaceName] of Object.entries(SECTION_TO_INTERFACE)) {
        it(`${section} exposes exactly the fields of ${interfaceName}`, () => {
            const actual = parseFields(interfaceBody(interfaceName));
            const exposed = SECTION_SPECS[section]!.fields;

            expect(
                Object.keys(exposed).sort(),
                `API schema for "${section}" has drifted from ${interfaceName} in app/types/resume.ts — `
                + 'add or remove the field in server/utils/resumeSections.ts',
            ).toEqual(Object.keys(actual).sort());

            for (const [field, kind] of Object.entries(actual)) {
                expect(exposed[field], `${section}.${field} should be typed "${kind}"`).toBe(kind);
            }
        });
    }

    it('every array field of ResumeData is reachable through the API', () => {
        const body = interfaceBody('ResumeData');
        const arrayFields = Object.entries(parseFields(body))
            .filter(([, kind]) => kind.endsWith('[]'))
            .map(([name]) => name)
            .sort();

        expect(
            Object.keys(SECTION_SPECS).sort(),
            'a list section of ResumeData has no API route — update SECTION_SPECS',
        ).toEqual(arrayFields);
    });

    it('personal fields are scalar strings that really exist on ResumeData', () => {
        const fields = parseFields(interfaceBody('ResumeData'));
        for (const name of Object.keys(PERSONAL_FIELDS)) {
            expect(fields[name], `ResumeData has no "${name}" field`).toBe('string');
        }
    });

    it('structural fields are never writable through the personal route', () => {
        for (const guarded of ['sectionOrder', 'sectionHeaders', 'sectionPlacement', 'photo', 'version']) {
            expect(PERSONAL_FIELDS[guarded], `"${guarded}" must not be writable`).toBeUndefined();
        }
    });
});
