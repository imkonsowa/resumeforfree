import { describe, it, expect } from 'vitest';
import { generateCertificatesContent } from '#layers/core/app/utils/templateRenderers';

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
