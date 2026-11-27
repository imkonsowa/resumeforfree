// End-to-end check of every tool against the running app, through the real MCP protocol.
// Creates throwaway resumes and deletes only those. Needs 2 free resume slots.
//   node test/smoke.mjs [folder for preview images and exports]
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import sharp from 'sharp';

const out = resolve(process.argv[2] || mkdtempSync(join(tmpdir(), 'rff-smoke-')));
mkdirSync(out, { recursive: true });

const client = new Client({ name: 'smoke', version: '1.0.0' });
await client.connect(new StdioClientTransport({
    command: process.execPath,
    args: [fileURLToPath(new URL('../server.mjs', import.meta.url))],
    env: { ...process.env, RFF_OUTPUT_DIR: out },
    stderr: 'inherit',
}));

const raw = (name, args = {}) => client.callTool({ name, arguments: args }, undefined, { timeout: 180_000 });
const call = async (name, args) => {
    const result = await raw(name, args);
    assert.ok(!result.isError, `${name} failed: ${result.content[0]?.text}`);
    return result.content[0].type === 'text' && result.content.length === 1 ? JSON.parse(result.content[0].text) : result.content;
};
const fails = async (name, args, pattern) => {
    const result = await raw(name, args);
    assert.ok(result.isError, `${name} should have failed`);
    assert.match(result.content[0].text, pattern);
};

const created = new Set();
let step = '';
const check = (label) => {
    step = label;
    console.log(`- ${label}`);
};

try {
    check('a remote address is refused');
    const remote = spawnSync(process.execPath, [fileURLToPath(new URL('../server.mjs', import.meta.url))], {
        env: { ...process.env, RFF_BASE_URL: 'https://resumeforfree.com' },
        encoding: 'utf8',
        timeout: 60_000,
    });
    assert.notEqual(remote.status, 0);
    assert.match(remote.stderr, /must point to a local instance/);

    check('tools are listed');
    const { tools } = await client.listTools();
    assert.equal(tools.length, 18);

    check('status and schema');
    const status = await call('get_status');
    assert.ok(status.limit - status.count >= 2, 'smoke test needs 2 free resume slots');
    const schema = await call('get_schema');
    assert.equal(schema.templates.length, 4);

    check('create a full resume');
    const special = 'Cut costs by 40% (~$2k) with C#, F* & <XML> [v2] {beta} at @acme_co ^up "quoted" \\ done.';
    const resume = await call('create_resume', {
        name: 'MCP smoke test',
        language: 'en',
        personal: { firstName: 'Test', lastName: 'Person', email: 'test@example.com', phone: '+20 100 000 0000', position: 'QA Engineer', location: 'Cairo, Egypt', summary: special },
        sections: {
            experiences: [
                { company: 'Acme', position: 'Engineer', startDate: '2022-03', endDate: '', isPresent: true, achievements: [special, 'Second bullet'] },
                { company: 'Beta', position: 'Intern', startDate: '2020-01', endDate: '2021-12', description: special },
            ],
            internships: [{ company: 'Gamma', position: 'Trainee', startDate: '2019-06', endDate: '2019-09' }],
            education: [{ institution: 'Cairo University', degree: 'BSc', fieldOfStudy: 'CS', startDate: '2016', endDate: '2020' }],
            volunteering: [{ organization: 'Club', position: 'Mentor' }],
            projects: [{ title: 'Tool', description: special, links: [{ url: 'https://example.com/a_b#c', label: 'Demo' }] }],
            certificates: [{ title: 'Cert', issuer: 'Body', date: '2023-05', url: 'https://example.com' }],
            publications: [{ title: 'Paper', authors: 'T. Person', venue: 'Journal', date: '2021' }],
            skills: [{ title: 'Languages', description: 'C#, C++, Go' }],
            languages: [{ name: 'Arabic', proficiency: 'Native' }],
            socialLinks: [{ platform: 'github', url: 'https://github.com/example' }],
        },
        sectionOrder: ['summary', 'experience', 'education'],
        settings: { selectedTemplate: 'ats-friendly' },
    });
    created.add(resume.id);
    assert.equal(resume.template, 'ats-friendly');

    check('input validation');
    await fails('create_resume', { name: 'bad', sections: { experiences: [{ company: 'x' }] } }, /position/);
    await fails('add_section_item', { resumeId: resume.id, section: 'experiences', item: { company: 'x', position: 'y', startDate: 'March 2020' } }, /YYYY-MM/);
    await fails('add_section_item', { resumeId: resume.id, section: 'skills', item: { title: 'x', nope: 'y' } }, /Unknown field/);
    await fails('update_resume', { resumeId: resume.id, settings: { selectedFont: 'Comic Sans' } }, /not available/);
    await fails('get_resume', { resumeId: 'missing' }, /not found/);
    await fails('delete_resume', { resumeId: resume.id }, /confirm/);

    check('edit personal info and items');
    await call('update_personal_info', { resumeId: resume.id, position: 'Senior QA Engineer' });
    await Promise.all(['One', 'Two', 'Three'].map(title =>
        call('add_section_item', { resumeId: resume.id, section: 'skills', item: { title, description: 'x' } })));
    await call('update_section_item', { resumeId: resume.id, section: 'skills', index: 1, fields: { description: 'changed' } });
    await call('remove_section_item', { resumeId: resume.id, section: 'skills', index: 3 });
    await call('set_section_items', { resumeId: resume.id, section: 'languages', items: [{ name: 'English', proficiency: 'Fluent' }, { name: 'Arabic', proficiency: 'Native' }] });
    let full = await call('get_resume', { resumeId: resume.id });
    assert.equal(full.data.position, 'Senior QA Engineer');
    assert.equal(full.data.firstName, 'Test');
    assert.deepEqual(full.data.skills.map(s => s.title), ['Languages', 'One', 'Two']);
    assert.equal(full.data.skills[1].description, 'changed');
    assert.equal(full.data.languages[0].name, 'English');
    assert.equal(full.data.sectionOrder.experience, 1);

    check('photo');
    const photoPath = join(out, 'photo.png');
    writeFileSync(photoPath, await sharp({ create: { width: 1600, height: 1200, channels: 3, background: '#3b82f6' } }).png().toBuffer());
    const photo = await call('set_photo', { resumeId: resume.id, filePath: photoPath, square: true });
    assert.equal(photo.width, 800);
    full = await call('get_resume', { resumeId: resume.id });
    assert.equal(full.data.photo.source, 'r2');

    check('every template renders to PDF and images');
    for (const { id } of schema.templates) {
        await call('update_resume', { resumeId: resume.id, settings: { selectedTemplate: id, showSectionIcons: true } });
        const preview = await call('preview_resume', { resumeId: resume.id, width: 800 });
        const images = preview.filter(c => c.type === 'image');
        assert.ok(images.length >= 1, 'no preview images');
        images.forEach((image, i) => writeFileSync(join(out, `${id}-p${i + 1}.png`), Buffer.from(image.data, 'base64')));
        const pdf = await call('export_resume', { resumeId: resume.id, outputPath: `${id}.pdf`, overwrite: true });
        assert.equal(readFileSync(pdf.path).subarray(0, 5).toString(), '%PDF-');
        assert.equal(pdf.pages, images.length);
    }

    check('every page of a multi-page preview has content');
    await call('add_section_item', {
        resumeId: resume.id,
        section: 'experiences',
        item: { company: 'Long', position: 'Filler', achievements: Array.from({ length: 80 }, (_, i) => `Filler bullet ${i + 1}`) },
    });
    for (const { id } of schema.templates) {
        await call('update_resume', { resumeId: resume.id, settings: { selectedTemplate: id } });
        const pages = (await call('preview_resume', { resumeId: resume.id, width: 600 })).filter(c => c.type === 'image');
        assert.ok(pages.length >= 2, `${id}: expected more than one page`);
        for (const [i, page] of pages.entries()) {
            const { channels } = await sharp(Buffer.from(page.data, 'base64')).greyscale().stats();
            assert.ok(channels[0].min < 128, `${id}: page ${i + 1} is blank`);
            writeFileSync(join(out, `long-${id}-p${i + 1}.png`), Buffer.from(page.data, 'base64'));
        }
    }

    check('typ and json export, overwrite guard');
    const typ = await call('export_resume', { resumeId: resume.id, format: 'typ', outputPath: 'resume.typ', overwrite: true });
    assert.ok(statSync(typ.path).size > 100);
    await call('export_resume', { resumeId: resume.id, format: 'json', outputPath: 'backup.json', overwrite: true });
    await fails('export_resume', { resumeId: resume.id, format: 'json', outputPath: 'backup.json' }, /already exists/);
    await call('remove_photo', { resumeId: resume.id });

    check('import and duplicate');
    const { imported } = await call('import_resumes', { filePath: join(out, 'backup.json') });
    created.add(imported[0].id);
    assert.equal(imported[0].hasPhoto, true);
    await call('delete_resume', { resumeId: imported[0].id, confirm: true });
    created.delete(imported[0].id);
    const copy = await call('duplicate_resume', { resumeId: resume.id, name: 'MCP smoke copy' });
    created.add(copy.id);
    assert.equal(copy.itemCounts.experiences, 3);

    check('other languages render');
    for (const language of schema.languages) {
        await call('update_resume', { resumeId: copy.id, language });
        const pdf = await call('export_resume', { resumeId: copy.id, outputPath: `lang-${language}.pdf`, overwrite: true });
        assert.ok(pdf.pages >= 1);
    }

    console.log(`\nAll checks passed. Output: ${out}`);
}
catch (error) {
    console.error(`\nFailed at "${step}": ${error.message}`);
    process.exitCode = 1;
}
finally {
    for (const id of created) await raw('delete_resume', { resumeId: id, confirm: true });
    await client.close();
}
