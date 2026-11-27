// Everything the MCP tools can do with resumes, independent of the MCP protocol.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, extname, isAbsolute, join, resolve } from 'node:path';
import sharp from 'sharp';
import { createApi } from './api.mjs';
import { loadConfig, ENV_PATH } from './config.mjs';
import { resumeTypes, sections, templatesModule } from './core.mjs';
import { renderPdf, renderPngPages, toTypst } from './render.mjs';

const { defaultResumeData, defaultResumeSettings, getDefaultFontForLanguage, getFontsForLanguage } = resumeTypes;

export const LANGUAGES = ['en', 'ar', 'tr', 'fr', 'de', 'it', 'zh', 'ur', 'hi'];
export const TEMPLATE_IDS = Object.keys(templatesModule.templates);
export const SECTION_NAMES = sections.SECTION_NAMES;
export const ORDER_KEYS = Object.keys(defaultResumeData.sectionOrder);
export const HEADER_KEYS = [
    'personalInfo', 'profile', 'info', 'socialLinks', 'projects', 'languages', 'experience',
    'internships', 'education', 'skills', 'volunteering', 'certificates', 'publications',
];
export const PLACEMENT_KEYS = Object.keys(defaultResumeData.sectionPlacement);
export const PLATFORMS = ['linkedin', 'github', 'twitter', 'portfolio', 'dribbble', 'medium', 'devto', 'personal', 'other'];
export const PROFICIENCY = ['Native', 'Fluent', 'Proficient', 'Conversational', 'Basic', 'Beginner'];
export const CLOUD_LIMIT = 3;

const DATE_PATTERN = /^(\d{4}(-(0[1-9]|1[0-2]))?)?$/;
const MAX_PHOTO_BYTES = 512 * 1024;

export const config = loadConfig();
const api = createApi(config);

// The section endpoints are read-modify-write, so mutations must not overlap.
let queue = Promise.resolve();
const serialized = (work) => {
    const run = queue.then(work);
    queue = run.catch(() => undefined);
    return run;
};

const resumePath = id => `/api/resumes/${encodeURIComponent(id)}`;

const checkItem = (section, item) => {
    for (const field of ['startDate', 'endDate', 'date']) {
        if (typeof item?.[field] === 'string' && !DATE_PATTERN.test(item[field])) {
            throw new Error(`${section}.${field} must be "YYYY-MM", "YYYY" or "" (got "${item[field]}")`);
        }
    }
    if (section === 'socialLinks' && item?.platform !== undefined && !PLATFORMS.includes(item.platform)) {
        throw new Error(`socialLinks.platform must be one of: ${PLATFORMS.join(', ')} (use "other" with customLabel)`);
    }
};

const buildItem = (section, item) => {
    checkItem(section, item);
    return sections.buildSectionItem(section, item);
};

const normalize = (resume) => {
    const language = resume.language || 'en';
    return {
        ...resume,
        language,
        data: {
            ...structuredClone(defaultResumeData),
            ...resume.data,
            sectionOrder: { ...defaultResumeData.sectionOrder, ...resume.data?.sectionOrder },
            sectionPlacement: { ...defaultResumeData.sectionPlacement, ...resume.data?.sectionPlacement },
        },
        settings: { ...defaultResumeSettings, selectedFont: getDefaultFontForLanguage(language), ...resume.settings },
    };
};

const listRaw = async () => (await api.request('GET', '/api/resumes')).resumes;

export const getResume = async (id) => {
    const resume = (await listRaw()).find(r => r.id === id);
    if (!resume) throw new Error(`Resume "${id}" not found. Use list_resumes to see valid ids.`);
    return normalize(resume);
};

const summarize = resume => ({
    id: resume.id,
    name: resume.name,
    language: resume.language,
    template: resume.settings.selectedTemplate,
    person: [resume.data.firstName, resume.data.lastName].filter(Boolean).join(' '),
    position: resume.data.position,
    hasPhoto: Boolean(resume.data.photo),
    itemCounts: Object.fromEntries(SECTION_NAMES
        .map(section => [section, resume.data[section]?.length ?? 0])
        .filter(([, count]) => count > 0)),
    updatedAt: resume.updatedAt,
});

export const listResumes = async () => {
    const resumes = (await listRaw()).map(normalize);
    return { count: resumes.length, limit: CLOUD_LIMIT, resumes: resumes.map(summarize) };
};

export const getStatus = async () => {
    const list = await listResumes();
    return {
        app: { reachable: true, apiUrl: config.baseUrl, webUrl: `${config.publicUrl}/resumes` },
        webLogin: { email: config.email, passwordIsIn: ENV_PATH, note: 'Sign in on the web UI with this account to see these resumes; reload the page after changes.' },
        exportsDir: config.outputDir,
        ...list,
    };
};

export const getSchema = () => ({
    personal: sections.PERSONAL_FIELDS,
    sections: Object.fromEntries(Object.entries(sections.SECTION_SPECS)
        .map(([name, spec]) => [name, { fields: spec.fields, required: spec.required }])),
    formats: {
        dates: '"YYYY-MM" or "YYYY". For ongoing roles set isPresent: true and leave endDate "".',
        achievements: 'array of strings (bullet points)',
        links: 'array of { url, label }',
        socialLinkPlatforms: PLATFORMS,
        proficiency: PROFICIENCY,
        text: 'Plain text only; no Markdown or Typst markup.',
        technicalSkills: 'Legacy free text inserted as raw Typst; leave empty and use the "skills" section.',
    },
    templates: templatesModule.getTemplateList().map(({ id, name, description, layoutConfig }) =>
        ({ id, name, description, twoColumn: layoutConfig.isTwoColumn })),
    languages: LANGUAGES,
    fonts: Object.fromEntries(LANGUAGES.map(language => [language, getFontsForLanguage(language).map(f => f.family)])),
    settingsDefaults: Object.fromEntries(Object.entries(defaultResumeSettings)
        .filter(([key]) => !['sectionCollapsed', 'isRawMode'].includes(key))),
    sectionOrderKeys: ORDER_KEYS,
    sectionOrderNote: 'The key is "experience" here, while the data section is "experiences".',
    sectionHeaderKeys: HEADER_KEYS,
    sectionPlacementKeys: `${PLACEMENT_KEYS.join(', ')} (left/right; two-column templates only)`,
    limits: { resumesPerAccount: CLOUD_LIMIT },
});

const checkFont = (settings, language) => {
    const fonts = getFontsForLanguage(language).map(f => f.family);
    if (!fonts.includes(settings.selectedFont)) {
        throw new Error(`Font "${settings.selectedFont}" is not available for "${language}". Available: ${fonts.join(', ')}`);
    }
};

/** Listed sections come first in the given order; the rest keep their relative order. */
const applyOrder = (current, ordered) => {
    const rest = Object.keys(current).filter(key => !ordered.includes(key)).sort((a, b) => current[a] - current[b]);
    return Object.fromEntries([...new Set(ordered), ...rest].map((key, index) => [key, index]));
};

const photoBytes = async (resume) => {
    const photo = resume.data.photo;
    if (!photo) return null;
    if (photo.source === 'local') return Buffer.from(photo.dataUrl.slice(photo.dataUrl.indexOf(',') + 1), 'base64');
    return api.request('GET', `${resumePath(resume.id)}/photo`, { binary: true });
};

const uploadPhoto = async (id, bytes, mime) => {
    const form = new FormData();
    form.set('file', new Blob([bytes], { type: mime }), mime === 'image/png' ? 'photo.png' : 'photo.jpg');
    await api.request('POST', `${resumePath(id)}/photo`, { form });
};

const postResume = async ({ name, language, data, settings }) => {
    const { resume } = await api.request('POST', '/api/resumes', { body: { name, language, data, settings } });
    return resume.id;
};

export const createResume = input => serialized(async () => {
    const language = input.language ?? 'en';
    const data = structuredClone(defaultResumeData);
    Object.assign(data, sections.buildPersonalPatch(input.personal ?? {}));
    for (const [section, items] of Object.entries(input.sections ?? {})) {
        sections.getSectionSpec(section);
        if (!Array.isArray(items)) throw new Error(`sections.${section} must be an array`);
        data[section] = items.map(item => buildItem(section, item));
    }
    if (input.sectionOrder) data.sectionOrder = applyOrder(data.sectionOrder, input.sectionOrder);
    Object.assign(data.sectionHeaders = {}, input.sectionHeaders);
    Object.assign(data.sectionPlacement, input.sectionPlacement);

    const settings = {
        ...structuredClone(defaultResumeSettings),
        selectedFont: getDefaultFontForLanguage(language),
        ...input.settings,
    };
    checkFont(settings, language);

    const id = await postResume({ name: input.name, language, data, settings });
    return summarize(await getResume(id));
});

export const updateResume = (id, changes) => serialized(async () => {
    const resume = await getResume(id);
    const body = {};
    if (changes.name !== undefined) body.name = changes.name;

    const language = changes.language ?? resume.language;
    const languageChanged = language !== resume.language;
    if (languageChanged) body.language = language;

    if (changes.settings || languageChanged) {
        body.settings = {
            ...resume.settings,
            ...(languageChanged ? { selectedFont: getDefaultFontForLanguage(language) } : {}),
            ...changes.settings,
        };
        checkFont(body.settings, language);
    }
    if (changes.sectionOrder || changes.sectionHeaders || changes.sectionPlacement) {
        body.data = {
            ...resume.data,
            sectionOrder: changes.sectionOrder ? applyOrder(resume.data.sectionOrder, changes.sectionOrder) : resume.data.sectionOrder,
            sectionHeaders: { ...resume.data.sectionHeaders, ...changes.sectionHeaders },
            sectionPlacement: { ...resume.data.sectionPlacement, ...changes.sectionPlacement },
        };
    }
    if (Object.values(changes).every(value => value === undefined)) throw new Error('Nothing to update');

    // Asking for the current language leaves nothing to send; that is not an error.
    if (Object.keys(body).length > 0) await api.request('PUT', resumePath(id), { body });
    const updated = await getResume(id);
    return {
        ...summarize(updated),
        settings: updated.settings,
        sectionOrder: Object.keys(updated.data.sectionOrder).sort((a, b) => updated.data.sectionOrder[a] - updated.data.sectionOrder[b]),
    };
});

export const duplicateResume = (id, name) => serialized(async () => {
    const source = await getResume(id);
    const bytes = await photoBytes(source);
    const newId = await postResume({ name: name ?? `${source.name} (Copy)`, language: source.language, data: source.data, settings: source.settings });
    if (bytes) await uploadPhoto(newId, bytes, bytes[0] === 0x89 ? 'image/png' : 'image/jpeg');
    return summarize(await getResume(newId));
});

export const deleteResume = id => serialized(async () => {
    const resume = await getResume(id);
    await api.request('DELETE', resumePath(id));
    return { deleted: { id, name: resume.name } };
});

export const updatePersonal = (id, fields) => serialized(() =>
    api.request('PATCH', `${resumePath(id)}/personal`, { body: fields }));

const sectionPath = (id, section) => `${resumePath(id)}/sections/${encodeURIComponent(section)}`;

export const addItem = (id, section, item) => serialized(() => {
    checkItem(section, item);
    return api.request('POST', sectionPath(id, section), { body: item });
});

export const updateItem = (id, section, index, fields) => serialized(() => {
    checkItem(section, fields);
    return api.request('PATCH', `${sectionPath(id, section)}/${index}`, { body: fields });
});

export const removeItem = (id, section, index) => serialized(() =>
    api.request('DELETE', `${sectionPath(id, section)}/${index}`));

export const setItems = (id, section, items) => serialized(() => {
    items.forEach(item => checkItem(section, item));
    return api.request('PUT', sectionPath(id, section), { body: { items } });
});

export const setPhoto = (id, filePath, { square = false } = {}) => serialized(async () => {
    await getResume(id);
    const source = resolve(filePath);
    if (!['.jpg', '.jpeg', '.png'].includes(extname(source).toLowerCase())) {
        throw new Error('Photo must be a .jpg or .png file');
    }
    let image = sharp(readFileSync(source)).rotate();
    image = square
        ? image.resize(800, 800, { fit: 'cover', position: 'attention', withoutEnlargement: true })
        : image.resize(800, 800, { fit: 'inside', withoutEnlargement: true });
    let output;
    for (const quality of [90, 80, 70, 60]) {
        output = await image.clone().flatten({ background: '#ffffff' }).jpeg({ quality }).toBuffer({ resolveWithObject: true });
        if (output.data.length <= MAX_PHOTO_BYTES) break;
    }
    await uploadPhoto(id, output.data, 'image/jpeg');
    return { resumeId: id, width: output.info.width, height: output.info.height, bytes: output.data.length };
});

export const removePhoto = id => serialized(async () => {
    await api.request('DELETE', `${resumePath(id)}/photo`);
    return { resumeId: id, photo: null };
});

export const previewResume = async (id, options) => {
    const resume = await getResume(id);
    return renderPngPages(resume, await photoBytes(resume), options);
};

const fileStem = resume => [resume.data.firstName || 'Resume', resume.data.lastName, resume.data.position, 'resume']
    .filter(Boolean)
    .join('_')
    .replace(/[<>:"/\\|?*\p{Cc}]+/gu, '-')
    .replace(/\s+/g, '_')
    .slice(0, 150);

export const exportResume = async (id, { format = 'pdf', outputPath, overwrite = false } = {}) => {
    const resume = await getResume(id);
    const target = outputPath
        ? (isAbsolute(outputPath) ? resolve(outputPath) : resolve(config.outputDir, outputPath))
        : join(config.outputDir, `${fileStem(resume)}.${format}`);
    if (extname(target).toLowerCase() !== `.${format}`) throw new Error(`outputPath must end in .${format}`);
    // Default names are ours to refresh; a path the caller chose is only replaced on request.
    if (outputPath && !overwrite && existsSync(target)) {
        throw new Error(`${target} already exists. Pass overwrite: true to replace it.`);
    }

    let content;
    let pages;
    if (format === 'pdf') {
        ({ pdf: content, pages } = renderPdf(resume, await photoBytes(resume)));
    }
    else if (format === 'typ') {
        content = toTypst(resume);
    }
    else {
        // Same shape as the web UI's export, with the photo embedded so the file is portable.
        const data = { ...resume.data };
        const bytes = await photoBytes(resume);
        if (bytes) {
            const mime = bytes[0] === 0x89 ? 'image/png' : 'image/jpeg';
            const { width, height } = await sharp(bytes).metadata();
            data.photo = { source: 'local', dataUrl: `data:${mime};base64,${bytes.toString('base64')}`, mime, width, height };
        }
        const { name, language, settings, createdAt, updatedAt } = resume;
        content = JSON.stringify([{ name, language, data, settings, createdAt, updatedAt }], null, 2);
    }
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, content);
    return { path: target, format, ...(pages ? { pages } : {}), bytes: Buffer.byteLength(content) };
};

export const importResumes = filePath => serialized(async () => {
    const parsed = JSON.parse(readFileSync(resolve(filePath), 'utf8'));
    if (!Array.isArray(parsed) || parsed.some(r => !r?.name || !r?.data)) {
        throw new Error('Expected a resume export file: an array of { name, language, data, settings }');
    }
    const free = CLOUD_LIMIT - (await listRaw()).length;
    if (parsed.length > free) {
        throw new Error(`The file holds ${parsed.length} resume(s) but only ${free} of ${CLOUD_LIMIT} slots are free.`);
    }
    const imported = [];
    for (const entry of parsed) {
        const resume = normalize(entry);
        const { photo, ...data } = resume.data;
        const id = await postResume({ name: resume.name, language: resume.language, data, settings: resume.settings });
        if (photo?.source === 'local') {
            const bytes = Buffer.from(photo.dataUrl.slice(photo.dataUrl.indexOf(',') + 1), 'base64');
            await uploadPhoto(id, bytes, photo.mime);
        }
        imported.push(summarize(await getResume(id)));
    }
    return { imported };
});
