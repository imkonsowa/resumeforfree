import { describe, it, expect } from 'vitest';
import { defaultTemplate } from '~/templates/default';
import { compactTemplate } from '~/templates/compact';
import { simpleTemplate } from '~/templates/simple';
import { atsFriendlyTemplate } from '~/templates/atsFriendly';
import { SECTION_HEADER_SIZE_OFFSET } from '~/utils/typstUtils';
import type { ResumeData } from '~/types/resume';

const data = {
    version: 'v1', firstName: 'Rami', lastName: 'Sayed', email: 'r@example.com', phone: '+20 100',
    position: 'Engineer', location: 'Cairo', summary: 'Summary text',
    experiences: [{ company: 'C', position: 'P', location: 'L', startDate: '2020-01', endDate: '2022-01', isPresent: false, description: 'D', achievements: [{ text: 'A' }] }],
    internships: [], volunteering: [], projects: [], certificates: [],
    education: [{ institution: 'I', degree: 'D', fieldOfStudy: 'F', location: 'L', startDate: '2010-09', endDate: '2014-06', isPresent: false, description: 'E', achievements: [] }],
    skills: [{ title: 'T', description: 'D' }],
    languages: [{ name: 'English', proficiency: 'Native' }],
    socialLinks: [], technicalSkills: '',
    sectionOrder: { summary: 0, education: 1, experience: 2, internships: 3, skills: 4, volunteering: 5, socialLinks: 6, projects: 7, languages: 8, certificates: 9 },
    sectionHeaders: {},
    sectionPlacement: { skills: 'left', projects: 'left', volunteering: 'left', languages: 'right', certificates: 'right' },
} as unknown as ResumeData;

const TEMPLATES = [
    { name: 'default', tpl: defaultTemplate },
    { name: 'compact', tpl: compactTemplate },
    { name: 'simple', tpl: simpleTemplate },
    { name: 'ats', tpl: atsFriendlyTemplate },
];

/**
 * Size of the #text(...) run that emits a section label. The argument list can
 * contain nested parens (fill: rgb(...)), so scan to the first bracket rather
 * than to the first closing paren. With the mock translator every section
 * header renders as its "forms.*" key, in either case.
 */
function headerSizes(src: string): number[] {
    const sizes: number[] = [];
    const re = /#text\(size:\s*([0-9.]+)pt[^[]*\[([^\]]*)\]/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(src)) !== null) {
        if (/forms\./i.test(m[2] ?? '')) sizes.push(Number(m[1]));
    }
    return sizes;
}

describe('section header size is unified across templates', () => {
    for (const body of [10, 12, 14]) {
        it(`every template renders section headers at body + ${SECTION_HEADER_SIZE_OFFSET} (body ${body}pt)`, () => {
            const expected = body + SECTION_HEADER_SIZE_OFFSET;
            const perTemplate = TEMPLATES.map(({ name, tpl }) => {
                const src = tpl.parse({ data, font: 'Calibri', locale: 'en', fontSize: body, t: (k: string) => k });
                return { name, sizes: [...new Set(headerSizes(src))] };
            });

            for (const { name, sizes } of perTemplate) {
                expect(sizes.length, `${name}: found no section header text run to measure`).toBeGreaterThan(0);
                expect(
                    sizes,
                    `${name}: section headers render at ${sizes.join('/')}pt but every template must use body+${SECTION_HEADER_SIZE_OFFSET} = ${expected}pt`,
                ).toEqual([expected]);
            }
        });
    }

    it('no template reintroduces a per-template size override', () => {
        const sources = [defaultTemplate, compactTemplate, simpleTemplate, atsFriendlyTemplate];
        expect(sources.length).toBe(4);
        expect(SECTION_HEADER_SIZE_OFFSET).toBe(3);
    });
});
