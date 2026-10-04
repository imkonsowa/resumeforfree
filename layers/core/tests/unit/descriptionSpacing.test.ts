import { describe, it, expect } from 'vitest';
import { defaultTemplate } from '#layers/core/app/templates/default';
import { compactTemplate } from '#layers/core/app/templates/compact';
import { atsFriendlyTemplate } from '#layers/core/app/templates/atsFriendly';
import { simpleTemplate } from '#layers/core/app/templates/simple';
import { descriptionsResume, fullResume } from '../fixtures/resumes';

const mockT = (key: string): string => {
    const translations: Record<string, string> = {
        'template.present': 'Present',
        'template.at': ' at ',
        'template.separator': ', ',
        'template.grade': 'Grade:',
        'template.from': ' from ',
        'common.link': 'Link',
        'forms.personalInfo.profile': 'Profile',
        'forms.experience.title': 'Experience',
        'forms.education.title': 'Education',
        'forms.skills.title': 'Skills',
        'forms.projects.title': 'Projects',
        'forms.languages.title': 'Languages',
        'forms.certificates.title': 'Certificates',
        'forms.internships.title': 'Internships',
        'forms.volunteering.title': 'Volunteering',
        'forms.socialLinks.title': 'Links',
    };
    return translations[key] || key;
};

const FONT_SIZE = 12;

const wrap = (text: string): string =>
    `#block(above: 0em, below: 0.8em)[#text(size: ${FONT_SIZE}pt)[${text}]]`;

const SECTION_DESCRIPTIONS = {
    experience: 'ExperienceDescriptionMarker',
    internship: 'InternshipDescriptionMarker',
    education: 'EducationDescriptionMarker',
    volunteering: 'VolunteeringDescriptionMarker',
    project: 'ProjectDescriptionMarker',
    certificate: 'CertificateDescriptionMarker',
} as const;

const TEMPLATES = [
    { name: 'default', template: defaultTemplate },
    { name: 'compact', template: compactTemplate },
    { name: 'atsFriendly', template: atsFriendlyTemplate },
    { name: 'simple', template: simpleTemplate },
] as const;

const parseFor = (template: typeof defaultTemplate): string =>
    template.parse({
        data: descriptionsResume,
        settings: { selectedFont: 'Calibri', fontSize: FONT_SIZE },
        locale: 'en',
        t: mockT,
    });

describe('Description spacing standardization', () => {
    for (const { name, template } of TEMPLATES) {
        describe(`${name} template`, () => {
            const result = parseFor(template);

            for (const [section, marker] of Object.entries(SECTION_DESCRIPTIONS)) {
                it(`wraps ${section} description in standardized block`, () => {
                    expect(result).toContain(marker);
                    expect(result).toContain(wrap(marker));
                });
            }

            it('renders education achievement as a list item', () => {
                expect(result).toContain('EducationAchievementMarker');
                expect(result).toMatch(/- EducationAchievementMarker/);
            });

            it('does not emit any description marker as a bare paragraph', () => {
                for (const marker of Object.values(SECTION_DESCRIPTIONS)) {
                    const wrappedIdx = result.indexOf(wrap(marker));
                    expect(wrappedIdx).toBeGreaterThan(-1);
                    const allOccurrences = result.split(marker).length - 1;
                    expect(allOccurrences).toBe(1);
                }
            });

            it('uses the same wrapping markup for every section description', () => {
                const pattern = /#block\(above: 0em, below: 0\.8em\)\[#text\(size: 12pt\)\[/g;
                const matches = result.match(pattern) || [];
                expect(matches.length).toBeGreaterThanOrEqual(Object.keys(SECTION_DESCRIPTIONS).length);
            });
        });
    }

    describe('projects mirror experience layout', () => {
        const inlineTemplates = [
            { name: 'compact', template: compactTemplate },
            { name: 'atsFriendly', template: atsFriendlyTemplate },
        ] as const;

        for (const { name, template } of inlineTemplates) {
            it(`${name}: project title and date share the same line (grid) like experience`, () => {
                const result = parseFor(template);
                const gridPattern = /#grid\(columns: \(1fr, auto\), column-gutter: 0\.8em, \[#text\(size: 13pt, weight: "bold"\)\[[^\]]*Test Project[^\]]*\]\], \[#text\(size: 12pt, weight: "bold", fill: rgb\("#4B5563"\)\)\[/;
                expect(result).toMatch(gridPattern);
            });
        }
    });

    describe('cross-template consistency', () => {
        it('produces the identical wrapping markup across all four templates', () => {
            for (const marker of Object.values(SECTION_DESCRIPTIONS)) {
                const expected = wrap(marker);
                for (const { template } of TEMPLATES) {
                    const out = parseFor(template);
                    expect(out, `wrapped marker missing in template output for ${marker}`).toContain(expected);
                }
            }
        });

        it('uses identical spacing values across templates (no drift)', () => {
            const expected = `above: 0em, below: 0.8em)[#text(size: ${FONT_SIZE}pt)`;
            for (const { name, template } of TEMPLATES) {
                const out = parseFor(template);
                expect(out, `${name} missing standardized description spacing`).toContain(expected);
            }
        });

        it('renders skills with identical item markup in every template', () => {
            const skillsItemPattern = '#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]';
            for (const { name, template } of TEMPLATES) {
                const out = template.parse({
                    data: fullResume,
                    settings: { selectedFont: 'Calibri', fontSize: FONT_SIZE },
                    locale: 'en',
                    t: mockT,
                });
                expect(out, `${name} did not render skill item with standardized block`).toContain(skillsItemPattern);
            }
        });
    });
});
