import { describe, it, expect } from 'vitest';
import { defaultTemplate } from '~/templates/default';
import { compactTemplate } from '~/templates/compact';
import { simpleTemplate } from '~/templates/simple';
import { atsFriendlyTemplate } from '~/templates/atsFriendly';
import type { ResumeData } from '~/types/resume';

const mockT = (key: string) => key;

const fixture = {
    version: 'v1',
    firstName: 'Rami', lastName: 'Sayed',
    email: 'rami@example.com', phone: '+20 100 555 1234',
    position: 'Software Engineer', location: 'Cairo',
    summary: 'ZsumDesc',
    experiences: [{
        company: 'ExpCompany', position: 'ExpPosition', location: 'ExpLoc',
        startDate: '2020-01', endDate: '2022-01', isPresent: false,
        description: 'ZexpDesc', achievements: [{ text: 'ZexpAch' }],
    }],
    internships: [{
        company: 'IntCompany', position: 'IntPosition', location: 'IntLoc',
        startDate: '2019-01', endDate: '2019-06', isPresent: false,
        description: 'ZintDesc', achievements: [{ text: 'ZintAch' }],
    }],
    education: [{
        institution: 'EduInstitution', degree: 'EduDegree', fieldOfStudy: 'EduField',
        location: 'EduLoc', startDate: '2010-09', endDate: '2014-06', isPresent: false,
        description: 'ZeduDesc', graduationScore: 'VeryGood',
        achievements: [{ text: 'ZeduAch' }],
    }],
    volunteering: [{
        organization: 'VolOrg', position: 'VolPosition', location: 'VolLoc',
        startDate: '2018-01', endDate: '2018-12', isPresent: false,
        description: 'ZvolDesc', achievements: [{ text: 'ZvolAch' }],
    }],
    projects: [{
        title: 'ProjTitle', description: 'ZprjDesc',
        links: [{ url: 'https://example.com', label: 'Link' }],
        startDate: '2023-01', endDate: '2023-08', isPresent: false,
        achievements: [{ text: 'ZprjAch' }],
    }],
    certificates: [{
        title: 'CertTitle', issuer: 'CertIssuer', date: '2023-05',
        url: 'https://example.com', description: 'ZcerDesc',
    }],
    skills: [{ title: 'SkillTitle', description: 'ZsklDesc' }],
    languages: [{ name: 'LangName', proficiency: 'LangProf' }],
    socialLinks: [{ platform: 'github', url: 'https://github.com/x' }],
    technicalSkills: '',
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

const TITLED_SECTIONS = [
    { marker: 'ZexpDesc', title: 'ExpPosition', label: 'experience' },
    { marker: 'ZintDesc', title: 'IntPosition', label: 'internships' },
    { marker: 'ZeduDesc', title: 'EduDegree', label: 'education' },
    { marker: 'ZvolDesc', title: 'VolPosition', label: 'volunteering' },
    { marker: 'ZprjDesc', title: 'ProjTitle', label: 'projects' },
    { marker: 'ZcerDesc', title: 'CertTitle', label: 'certificates' },
];

/**
 * Walks the Typst source tracking bracket nesting and returns the header of the
 * innermost `#block(...)` still open at `index`. A title rendered outside any
 * spaced block collides with the description that follows it.
 */
function innermostOpenBlock(src: string, index: number): string | null {
    const stack: (string | null)[] = [];
    let i = 0;
    while (i < index) {
        if (src[i] === '\\') {
            i += 2;
            continue;
        }
        if (src.startsWith('#block(', i)) {
            const close = src.indexOf(')', i);
            const open = close === -1 ? -1 : src.indexOf('[', close);
            if (open !== -1 && open < index) {
                stack.push(src.slice(i, close + 1));
                i = open + 1;
                continue;
            }
        }
        if (src[i] === '[') {
            stack.push(null);
        }
        else if (src[i] === ']') {
            stack.pop();
        }
        i++;
    }
    for (let k = stack.length - 1; k >= 0; k--) {
        if (stack[k]) return stack[k];
    }
    return null;
}

const render = (tpl: typeof defaultTemplate) =>
    tpl.parse({ data: fixture, font: 'Calibri', locale: 'en', fontSize: 12, t: mockT });

describe('template consistency', () => {
    describe('an item title is always inside a block that spaces it from its description', () => {
        for (const { name, tpl } of TEMPLATES) {
            for (const { marker, title, label } of TITLED_SECTIONS) {
                it(`${name}: ${label}`, () => {
                    const src = render(tpl);
                    const mIdx = src.indexOf(marker);
                    expect(mIdx, `${label} description missing from ${name}`).toBeGreaterThan(-1);

                    const tIdx = src.lastIndexOf(title, mIdx);
                    expect(tIdx, `${label} title missing from ${name}`).toBeGreaterThan(-1);

                    const block = innermostOpenBlock(src, tIdx);
                    expect(
                        block,
                        `${name}/${label}: title is not inside any #block — it will render imploded into the description`,
                    ).not.toBeNull();
                    expect(
                        /below:\s*[0-9.]+em/.test(block ?? ''),
                        `${name}/${label}: enclosing block "${block}" declares no below: spacing`,
                    ).toBe(true);
                });
            }
        }
    });

    it('renders every section in every template', () => {
        const markers = ['ZexpDesc', 'ZintDesc', 'ZeduDesc', 'ZvolDesc', 'ZprjDesc', 'ZcerDesc', 'ZsklDesc'];
        for (const { name, tpl } of TEMPLATES) {
            const src = render(tpl);
            for (const marker of markers) {
                expect(src.includes(marker), `${name} dropped ${marker}`).toBe(true);
            }
        }
    });

    describe('items are separated uniformly regardless of their content', () => {
        const edu = (n: string, withAchievements: boolean) => ({
            institution: `Inst${n}`, degree: `Deg${n}`, fieldOfStudy: 'F', location: 'L',
            startDate: '2010-09', endDate: '2014-06', isPresent: false,
            description: `Desc${n}`, graduationScore: '',
            achievements: withAchievements ? [{ text: `Ach${n}` }] : [],
        });

        const mixed = {
            ...fixture,
            education: [edu('One', true), edu('Two', false), edu('Three', true)],
        } as unknown as ResumeData;

        const BLOCK_WRAPPED = TEMPLATES.filter(t => t.name !== 'simple');

        for (const { name, tpl } of BLOCK_WRAPPED) {
            it(`${name}: an item without bullets gets the same gap as one with bullets`, () => {
                const src = tpl.parse({ data: mixed, font: 'Calibri', locale: 'en', fontSize: 12, t: mockT });
                const gaps = ['One', 'Two', 'Three'].map((n) => {
                    const i = src.indexOf(`Deg${n}`);
                    expect(i, `Deg${n} missing from ${name}`).toBeGreaterThan(-1);
                    const before = src.slice(0, i);
                    const opens = [...before.matchAll(/#block\(above: 0em, below:\s*([0-9.]+em)\)\[/g)];
                    const last = opens[opens.length - 1];
                    expect(last, `${name}: item ${n} has no spacing wrapper before it`).toBeDefined();
                    const tail = before.slice((last?.index ?? 0) + (last?.[0].length ?? 0));
                    expect(
                        tail.includes(']'),
                        `${name}: item ${n} is not inside its spacing wrapper — its gap comes from the previous item's content instead`,
                    ).toBe(false);
                    return last?.[1];
                });
                expect(
                    new Set(gaps).size,
                    `${name}: item gaps differ by content (${gaps.join(' | ')}) — items without bullets will look glued to the next item`,
                ).toBe(1);
            });
        }

        it('simple: separates items with a fixed grid row-gutter', () => {
            const src = simpleTemplate.parse({ data: mixed, font: 'Calibri', locale: 'en', fontSize: 12, t: mockT });
            const gutters = [...src.matchAll(/row-gutter:\s*([0-9.]+em)/g)].map(m => m[1]);
            expect(gutters.length, 'simple emits no row-gutter — item spacing would depend on content').toBeGreaterThan(0);
            expect(
                new Set(gutters).size,
                `simple: inconsistent row gutters (${[...new Set(gutters)].join(' | ')})`,
            ).toBe(1);
        });
    });
});
