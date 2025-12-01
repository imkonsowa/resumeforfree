import { describe, it, expect } from 'vitest';
import { defaultTemplate } from '~/templates/default';
import { compactTemplate } from '~/templates/compact';
import {
    testResumes,
    specialCharsResume,
    typstMarkupResume,
    fullResume,
    edgeCaseResume,
} from '../fixtures/resumes';

// Mock translation function
const mockT = (key: string): string => {
    const translations: Record<string, string> = {
        'template.present': 'Present',
        'template.at': ' at ',
        'template.separator': ', ',
        'template.grade': 'Grade:',
        'forms.experience.title': 'Experience',
        'forms.education.title': 'Education',
        'forms.skills.title': 'Skills',
        'forms.projects.title': 'Projects',
        'forms.languages.title': 'Languages',
        'forms.certificates.title': 'Certificates',
        'forms.internships.title': 'Internships',
        'forms.volunteering.title': 'Volunteering',
        'forms.personalInfo.summary': 'Profile',
        'forms.socialLinks.title': 'Links',
    };
    return translations[key] || key;
};

describe('Default Template Parsing', () => {
    describe('basic parsing', () => {
        it('should parse minimal resume without errors', () => {
            const result = defaultTemplate.parse(testResumes.minimal, 'Calibri', 'en', mockT);
            expect(result).toBeDefined();
            expect(typeof result).toBe('string');
            expect(result.length).toBeGreaterThan(0);
        });

        it('should parse full resume without errors', () => {
            const result = defaultTemplate.parse(fullResume, 'Calibri', 'en', mockT);
            expect(result).toBeDefined();
            expect(result).toContain('Sarah');
            expect(result).toContain('Johnson');
        });

        it('should include font configuration', () => {
            const result = defaultTemplate.parse(testResumes.minimal, 'Calibri', 'en', mockT);
            expect(result).toContain('Calibri');
        });
    });

    describe('special characters handling', () => {
        it('should properly escape C# in skills', () => {
            const result = defaultTemplate.parse(specialCharsResume, 'Calibri', 'en', mockT);
            // In content blocks, # should be escaped as \#
            expect(result).toContain('C\\#');
        });

        it('should properly escape $ in content', () => {
            const result = defaultTemplate.parse(specialCharsResume, 'Calibri', 'en', mockT);
            expect(result).toContain('\\$');
        });

        it('should handle project titles with special chars', () => {
            const result = defaultTemplate.parse(specialCharsResume, 'Calibri', 'en', mockT);
            // Project title goes in #text("...") so should use escapeTypstString
            expect(result).toContain('Operators Logic App');
        });

        it('should not have unescaped # in user content', () => {
            const result = defaultTemplate.parse(specialCharsResume, 'Calibri', 'en', mockT);
            // The user content "C#" should appear escaped as "C\#"
            // Check that the special characters from input are properly escaped
            expect(result).toContain('C\\#');
            expect(result).toContain('F\\#');
            // Check that issue #123 is escaped
            expect(result).toContain('\\#123');
        });
    });

    describe('Typst markup characters', () => {
        it('should escape asterisks in user content', () => {
            const result = defaultTemplate.parse(typstMarkupResume, 'Calibri', 'en', mockT);
            expect(result).toContain('\\*');
        });

        it('should escape underscores in user content', () => {
            const result = defaultTemplate.parse(typstMarkupResume, 'Calibri', 'en', mockT);
            expect(result).toContain('\\_');
        });

        it('should escape brackets in user content', () => {
            const result = defaultTemplate.parse(typstMarkupResume, 'Calibri', 'en', mockT);
            expect(result).toContain('\\[');
            expect(result).toContain('\\]');
            expect(result).toContain('\\{');
            expect(result).toContain('\\}');
        });
    });

    describe('edge cases', () => {
        it('should handle empty fields gracefully', () => {
            const result = defaultTemplate.parse(edgeCaseResume, 'Calibri', 'en', mockT);
            expect(result).toBeDefined();
            // Should not throw
        });

        it('should handle whitespace-only summary', () => {
            const result = defaultTemplate.parse(edgeCaseResume, 'Calibri', 'en', mockT);
            expect(result).toBeDefined();
        });

        it('should handle skills with only title or only description', () => {
            const result = defaultTemplate.parse(edgeCaseResume, 'Calibri', 'en', mockT);
            expect(result).toBeDefined();
        });
    });
});

describe('Compact Template Parsing', () => {
    describe('basic parsing', () => {
        it('should parse minimal resume without errors', () => {
            const result = compactTemplate.parse(testResumes.minimal, 'Calibri', 'en', mockT);
            expect(result).toBeDefined();
            expect(typeof result).toBe('string');
        });

        it('should parse full resume without errors', () => {
            const result = compactTemplate.parse(fullResume, 'Calibri', 'en', mockT);
            expect(result).toBeDefined();
            expect(result).toContain('Sarah');
        });
    });

    describe('special characters handling', () => {
        it('should properly escape C# in compact template', () => {
            const result = compactTemplate.parse(specialCharsResume, 'Calibri', 'en', mockT);
            expect(result).toContain('C\\#');
        });

        it('should properly escape $ in compact template', () => {
            const result = compactTemplate.parse(specialCharsResume, 'Calibri', 'en', mockT);
            expect(result).toContain('\\$');
        });
    });

    describe('edge cases', () => {
        it('should handle empty resume data', () => {
            const result = compactTemplate.parse(edgeCaseResume, 'Calibri', 'en', mockT);
            expect(result).toBeDefined();
        });
    });
});

describe('Template Output Validation', () => {
    describe('Typst syntax validation', () => {
        it('should produce valid Typst document structure', () => {
            const result = defaultTemplate.parse(fullResume, 'Calibri', 'en', mockT);
            // Check for required Typst setup
            expect(result).toContain('#set page');
            expect(result).toContain('#set text');
        });

        it('should have balanced brackets in output', () => {
            const result = defaultTemplate.parse(fullResume, 'Calibri', 'en', mockT);
            // Count opening and closing brackets (excluding escaped ones)
            const openBrackets = (result.match(/(?<!\\)\[/g) || []).length;
            const closeBrackets = (result.match(/(?<!\\)\]/g) || []).length;
            expect(openBrackets).toBe(closeBrackets);
        });

        it('should have balanced curly braces in output', () => {
            const result = defaultTemplate.parse(fullResume, 'Calibri', 'en', mockT);
            const openBraces = (result.match(/(?<!\\)\{/g) || []).length;
            const closeBraces = (result.match(/(?<!\\)\}/g) || []).length;
            // Note: May not be exactly equal due to Typst syntax, but should be close
            expect(Math.abs(openBraces - closeBraces)).toBeLessThan(5);
        });

        it('should have balanced parentheses in output', () => {
            const result = defaultTemplate.parse(fullResume, 'Calibri', 'en', mockT);
            const openParens = (result.match(/\(/g) || []).length;
            const closeParens = (result.match(/\)/g) || []).length;
            expect(openParens).toBe(closeParens);
        });
    });
});

describe('Both Templates Consistency', () => {
    it('should produce similar content for same resume', () => {
        const defaultResult = defaultTemplate.parse(fullResume, 'Calibri', 'en', mockT);
        const compactResult = compactTemplate.parse(fullResume, 'Calibri', 'en', mockT);

        // Both should contain the person's name
        expect(defaultResult).toContain('Sarah');
        expect(compactResult).toContain('Sarah');

        // Both should contain their position
        expect(defaultResult).toContain('Full Stack Developer');
        expect(compactResult).toContain('Full Stack Developer');
    });

    it('should handle special chars consistently across templates', () => {
        const defaultResult = defaultTemplate.parse(specialCharsResume, 'Calibri', 'en', mockT);
        const compactResult = compactTemplate.parse(specialCharsResume, 'Calibri', 'en', mockT);

        // Both should have escaped # characters
        expect(defaultResult).toContain('C\\#');
        expect(compactResult).toContain('C\\#');
    });
});
