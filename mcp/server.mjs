#!/usr/bin/env node
// MCP server for a local Resume For Free instance (stdio transport).
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// stdout carries the protocol; anything the loaded app modules log must go to stderr.
console.log = console.info = console.debug = (...args) => console.error(...args);

const resumes = await import('./lib/resumes.mjs');

const server = new McpServer({ name: 'resumeforfree', version: '1.0.0' }, {
    instructions: 'Controls the local Resume For Free resume builder. Call get_schema before writing content. '
        + 'After editing, call preview_resume and look at the pages before exporting the PDF. '
        + `An account holds at most ${resumes.CLOUD_LIMIT} resumes.`,
});

const json = value => ({ content: [{ type: 'text', text: JSON.stringify(value, null, 2) }] });

const resumeId = z.string().min(1).describe('Resume id from list_resumes');
const section = z.enum(resumes.SECTION_NAMES).describe('Section name');
const index = z.number().int().min(0).describe('Zero-based position within the section');
const item = z.record(z.string(), z.unknown()).describe('Section item; see get_schema for fields');
const language = z.enum(resumes.LANGUAGES).describe('Resume language (headings, dates, direction)');
const hexColor = z.string().regex(/^(#[0-9a-fA-F]{6})?$/, 'Use #rrggbb, or "" for the template default');
const layout = z.enum(['stacked', 'inline']);

const settings = z.strictObject({
    selectedTemplate: z.enum(resumes.TEMPLATE_IDS),
    selectedFont: z.string(),
    fontSize: z.number().min(9).max(16),
    headingSizeOffset: z.number().int().min(0).max(8),
    titleSizeOffset: z.number().int().min(0).max(4),
    sectionSpacing: z.number().min(0.4).max(2),
    itemSpacing: z.number().min(0.1).max(2),
    showSectionHeaderLine: z.boolean(),
    showSectionIcons: z.boolean(),
    headingColor: hexColor,
    accentColor: hexColor,
    photoShape: z.enum(['circle', 'rectangle']),
    languagesLayout: layout,
    skillsLayout: layout,
}).partial().describe('Only the settings to change');

const sectionOrder = z.array(z.enum(resumes.ORDER_KEYS)).describe('Section keys in display order; unlisted ones follow');
const sectionHeaders = z.partialRecord(z.enum(resumes.HEADER_KEYS), z.string()).describe('Custom section titles');
const sectionPlacement = z.partialRecord(z.enum(resumes.PLACEMENT_KEYS), z.enum(['left', 'right'])).describe('Column placement in two-column templates');

const personalShape = Object.fromEntries(
    ['firstName', 'lastName', 'email', 'phone', 'position', 'location', 'summary', 'technicalSkills']
        .map(field => [field, z.string().optional()]),
);

const READ = { readOnlyHint: true, openWorldHint: false };
const WRITE = { readOnlyHint: false, destructiveHint: false, openWorldHint: false };
const DESTRUCTIVE = { readOnlyHint: false, destructiveHint: true, openWorldHint: false };

const tool = (name, description, inputSchema, annotations, handler) =>
    server.registerTool(name, { description, inputSchema, annotations }, handler);

tool('get_status', 'Check the app is running; show web login details, export folder and existing resumes.', {}, READ,
    async () => json(await resumes.getStatus()));

tool('get_schema', 'Fields, formats, templates, fonts, settings and section keys accepted by the other tools.', {}, READ,
    async () => json(resumes.getSchema()));

tool('list_resumes', 'List resumes with a short summary of each.', {}, READ,
    async () => json(await resumes.listResumes()));

tool('get_resume', 'Get the full data and settings of one resume. Item indexes follow array order.', { resumeId }, READ,
    async ({ resumeId: id }) => json(await resumes.getResume(id)));

tool('create_resume', 'Create a resume, optionally filled in one call.', {
    name: z.string().min(1).describe('Internal name shown in the resume list'),
    language: language.optional(),
    personal: z.strictObject(personalShape).optional(),
    sections: z.partialRecord(z.enum(resumes.SECTION_NAMES), z.array(item)).optional()
        .describe('Items per section, e.g. { "experiences": [...], "skills": [...] }'),
    settings: settings.optional(),
    sectionOrder: sectionOrder.optional(),
    sectionHeaders: sectionHeaders.optional(),
    sectionPlacement: sectionPlacement.optional(),
}, WRITE, async input => json(await resumes.createResume(input)));

tool('update_resume', 'Change name, language, template/design settings, section order, titles or placement.', {
    resumeId,
    name: z.string().min(1).optional(),
    language: language.optional(),
    settings: settings.optional(),
    sectionOrder: sectionOrder.optional(),
    sectionHeaders: sectionHeaders.optional(),
    sectionPlacement: sectionPlacement.optional(),
}, WRITE, async ({ resumeId: id, ...changes }) => json(await resumes.updateResume(id, changes)));

tool('duplicate_resume', 'Copy a resume, including its photo (useful for a job-specific variant).', {
    resumeId,
    name: z.string().min(1).optional(),
}, WRITE, async ({ resumeId: id, name }) => json(await resumes.duplicateResume(id, name)));

tool('delete_resume', 'Permanently delete a resume. Ask the user first.', {
    resumeId,
    confirm: z.literal(true).describe('Must be true: the user agreed to delete this resume'),
}, DESTRUCTIVE, async ({ resumeId: id }) => json(await resumes.deleteResume(id)));

tool('update_personal_info', 'Set name, contact details, headline (position), location or summary. Only given fields change.', {
    resumeId,
    ...personalShape,
}, WRITE, async ({ resumeId: id, ...fields }) => json(await resumes.updatePersonal(id, fields)));

tool('add_section_item', 'Append one item to a section.', { resumeId, section, item }, WRITE,
    async args => json(await resumes.addItem(args.resumeId, args.section, args.item)));

tool('update_section_item', 'Merge fields into one item; other fields are kept. Arrays such as achievements are replaced.', {
    resumeId, section, index, fields: item,
}, WRITE, async args => json(await resumes.updateItem(args.resumeId, args.section, args.index, args.fields)));

tool('remove_section_item', 'Remove one item from a section.', { resumeId, section, index }, DESTRUCTIVE,
    async args => json(await resumes.removeItem(args.resumeId, args.section, args.index)));

tool('set_section_items', 'Replace a whole section (use to reorder, bulk edit or clear it).', {
    resumeId, section, items: z.array(item),
}, DESTRUCTIVE, async args => json(await resumes.setItems(args.resumeId, args.section, args.items)));

tool('set_photo', 'Set the resume photo from a local JPG/PNG file (resized automatically).', {
    resumeId,
    filePath: z.string().min(1).describe('Absolute path of the image'),
    square: z.boolean().optional().describe('Smart-crop to a square'),
}, WRITE, async args => json(await resumes.setPhoto(args.resumeId, args.filePath, { square: args.square })));

tool('remove_photo', 'Remove the resume photo.', { resumeId }, DESTRUCTIVE,
    async ({ resumeId: id }) => json(await resumes.removePhoto(id)));

tool('preview_resume', 'Render the resume and return its pages as images, to check the layout.', {
    resumeId,
    pages: z.array(z.number().int().min(1)).optional().describe('Page numbers; default all'),
    width: z.number().int().min(400).max(1600).optional().describe('Image width in pixels (default 1000)'),
}, READ, async ({ resumeId: id, pages, width }) => {
    const { images, totalPages } = await resumes.previewResume(id, { pages, width });
    return {
        content: [
            { type: 'text', text: `${totalPages} page(s). Showing: ${images.map(i => i.page).join(', ') || 'none'}` },
            ...images.map(({ png }) => ({ type: 'image', data: png.toString('base64'), mimeType: 'image/png' })),
        ],
    };
});

tool('export_resume', 'Write the resume to a file: pdf (the deliverable), typ (Typst source) or json (backup / web import).', {
    resumeId,
    format: z.enum(['pdf', 'typ', 'json']).optional(),
    outputPath: z.string().optional().describe('Absolute, or relative to the export folder; default name is built from the person'),
    overwrite: z.boolean().optional(),
}, WRITE, async ({ resumeId: id, ...options }) => json(await resumes.exportResume(id, options)));

tool('import_resumes', 'Create resumes from a JSON export file (from this server or the web UI).', {
    filePath: z.string().min(1),
}, WRITE, async ({ filePath }) => json(await resumes.importResumes(filePath)));

await server.connect(new StdioServerTransport());
console.error('resumeforfree MCP server ready');
