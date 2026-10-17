import { describe, it, expect } from 'vitest';
import { generateCertificatesContent, generateProjectsContent } from '#layers/core/app/utils/templateRenderers';

const t = (key: string) => (key === 'common.link' ? 'Link' : key);
const certificate = { title: 'CKA', issuer: 'CNCF', date: '2024-04', url: 'https://example.com/cka' };

describe('certificate link text', () => {
    it('uses the translated Link label by default', () => {
        const [content] = generateCertificatesContent([certificate], t);
        expect(content!.titleContent).toContain('#link("https://example.com/cka")[#text("Link")]');
    });

    it('uses the custom label when provided', () => {
        const [content] = generateCertificatesContent([{ ...certificate, urlLabel: 'Verify "credential"' }], t);
        expect(content!.titleContent).toContain('[#text("Verify \\"credential\\"")]');
    });

    it('falls back to Link when the custom label is blank', () => {
        const [content] = generateCertificatesContent([{ ...certificate, urlLabel: '   ' }], t);
        expect(content!.titleContent).toContain('[#text("Link")]');
    });
});

describe('project link text', () => {
    const project = { title: 'pgmigrate', description: '', links: [] as { url: string; label: string }[] };
    const titleOf = (links: { url: string; label: string }[]) =>
        generateProjectsContent([{ ...project, links }], t)[0]!.titleContent;

    it('uses the link label when provided', () => {
        expect(titleOf([{ url: 'https://github.com/x', label: 'GitHub' }])).toContain('[#text("GitHub")]');
    });

    it('falls back to Link when the label is empty', () => {
        expect(titleOf([{ url: 'https://github.com/x', label: '  ' }])).toContain('#link("https://github.com/x")[#text("Link")]');
    });

    it('skips links without a URL', () => {
        expect(titleOf([{ url: ' ', label: 'GitHub' }])).not.toContain('#link');
    });
});
