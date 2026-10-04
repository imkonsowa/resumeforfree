import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export const templatePageTitle = (markdown: string): string => {
    const raw = markdown.match(/^title:\s*(.+)$/m)?.[1]?.trim() ?? '';
    return raw.startsWith('"') ? JSON.parse(raw) : raw.replace(/^'(.*)'$/, '$1');
};

export const previewInputHash = (templateDir: string, locale: string): string => createHash('sha256')
    .update(readFileSync(join(templateDir, 'template.json')))
    .update(readFileSync(join(templateDir, `${locale}.json`)))
    .update(templatePageTitle(readFileSync(join(templateDir, `${locale}.md`), 'utf8')))
    .digest('hex')
    .slice(0, 16);
