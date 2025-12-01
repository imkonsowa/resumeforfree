import { describe, it, expect } from 'vitest';
import { escapeTypstText, escapeTypstString } from '~/utils/stringUtils';

describe('escapeTypstText', () => {
    describe('hash character (#) escaping for content blocks', () => {
        it('should escape # in C# programming language', () => {
            const result = escapeTypstText('C#');
            expect(result).toBe('C\\#');
        });

        it('should escape # in F# programming language', () => {
            const result = escapeTypstText('F#');
            expect(result).toBe('F\\#');
        });

        it('should escape multiple # characters', () => {
            const result = escapeTypstText('C#, F#, and issue #123');
            expect(result).toBe('C\\#, F\\#, and issue \\#123');
        });

        it('should escape # in project titles', () => {
            const result = escapeTypstText('Operators Logic App - C#, Windows App');
            expect(result).toBe('Operators Logic App - C\\#, Windows App');
        });
    });

    describe('dollar sign ($) escaping', () => {
        it('should escape $ in monetary values', () => {
            const result = escapeTypstText('Revenue: $500K');
            expect(result).toBe('Revenue: \\$500K');
        });

        it('should escape multiple $ signs', () => {
            const result = escapeTypstText('Saved $50,000 from $100,000 budget');
            expect(result).toBe('Saved \\$50,000 from \\$100,000 budget');
        });
    });

    describe('quote escaping', () => {
        it('should escape double quotes', () => {
            const result = escapeTypstText('Project with "quotes"');
            expect(result).toBe('Project with \\"quotes\\"');
        });

        it('should normalize curly quotes to straight quotes and escape', () => {
            const result = escapeTypstText('Text with "curly quotes"');
            expect(result).toBe('Text with \\"curly quotes\\"');
        });
    });

    describe('bracket escaping', () => {
        it('should escape curly braces', () => {
            const result = escapeTypstText('Object {key: value}');
            expect(result).toBe('Object \\{key: value\\}');
        });

        it('should escape square brackets', () => {
            const result = escapeTypstText('Array [1, 2, 3]');
            expect(result).toBe('Array \\[1, 2, 3\\]');
        });

        it('should escape angle brackets', () => {
            const result = escapeTypstText('Generic<Type>');
            expect(result).toBe('Generic\\<Type\\>');
        });
    });

    describe('markup character escaping', () => {
        it('should escape asterisks', () => {
            const result = escapeTypstText('*bold* text');
            expect(result).toBe('\\*bold\\* text');
        });

        it('should escape underscores', () => {
            const result = escapeTypstText('_italic_ text');
            expect(result).toBe('\\_italic\\_ text');
        });

        it('should escape tildes', () => {
            const result = escapeTypstText('~strikethrough~');
            expect(result).toBe('\\~strikethrough\\~');
        });

        it('should escape carets', () => {
            const result = escapeTypstText('x^2 power');
            expect(result).toBe('x\\^2 power');
        });
    });

    describe('backslash escaping', () => {
        it('should escape backslashes', () => {
            const result = escapeTypstText('path\\to\\file');
            expect(result).toBe('path\\\\to\\\\file');
        });

        it('should handle backslash before special char', () => {
            const result = escapeTypstText('text\\#hash');
            expect(result).toBe('text\\\\\\#hash');
        });
    });

    describe('edge cases', () => {
        it('should handle empty string', () => {
            const result = escapeTypstText('');
            expect(result).toBe('');
        });

        it('should handle null-ish values', () => {
            // @ts-expect-error - testing runtime behavior
            expect(escapeTypstText(null)).toBe('');
            // @ts-expect-error - testing runtime behavior
            expect(escapeTypstText(undefined)).toBe('');
        });

        it('should trim whitespace', () => {
            const result = escapeTypstText('  text with spaces  ');
            expect(result).toBe('text with spaces');
        });

        it('should handle text with no special characters', () => {
            const result = escapeTypstText('Simple text without special chars');
            expect(result).toBe('Simple text without special chars');
        });

        it('should handle complex mixed content', () => {
            const result = escapeTypstText('C# Developer - $100K salary, uses *React* and {JSON}');
            expect(result).toBe('C\\# Developer - \\$100K salary, uses \\*React\\* and \\{JSON\\}');
        });
    });
});

describe('escapeTypstString', () => {
    describe('string context (inside "...")', () => {
        it('should NOT escape # in strings', () => {
            const result = escapeTypstString('C#');
            expect(result).toBe('C#');
        });

        it('should NOT escape $ in strings', () => {
            const result = escapeTypstString('$100');
            expect(result).toBe('$100');
        });

        it('should escape double quotes', () => {
            const result = escapeTypstString('text with "quotes"');
            expect(result).toBe('text with \\"quotes\\"');
        });

        it('should escape backslashes', () => {
            const result = escapeTypstString('path\\to\\file');
            expect(result).toBe('path\\\\to\\\\file');
        });

        it('should NOT escape brackets in strings', () => {
            const result = escapeTypstString('text [with] {brackets}');
            expect(result).toBe('text [with] {brackets}');
        });

        it('should NOT escape markup chars in strings', () => {
            const result = escapeTypstString('*bold* _italic_');
            expect(result).toBe('*bold* _italic_');
        });
    });

    describe('edge cases for strings', () => {
        it('should handle empty string', () => {
            expect(escapeTypstString('')).toBe('');
        });

        it('should trim whitespace', () => {
            expect(escapeTypstString('  text  ')).toBe('text');
        });

        it('should normalize curly quotes', () => {
            const result = escapeTypstString('"quoted"');
            expect(result).toBe('\\"quoted\\"');
        });
    });
});
