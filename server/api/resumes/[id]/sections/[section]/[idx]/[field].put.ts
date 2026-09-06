import { getDb, requireUserId } from '~~/server/utils/apiAuth';
import { loadResume, readSection, saveResumeData } from '~~/server/utils/resumeData';
import { buildSectionItem, parseIndex, validateFieldName } from '~~/server/utils/resumeSections';

export default defineEventHandler(async (event) => {
    const userId = await requireUserId(event);
    const resumeId = getRouterParam(event, 'id')!;
    const section = getRouterParam(event, 'section')!;
    const field = getRouterParam(event, 'field')!;
    validateFieldName(section, field);

    const body = await readBody(event);
    const value = body && typeof body === 'object' && !Array.isArray(body) && 'value' in body
        ? (body as { value: unknown }).value
        : body;

    const db = getDb(event);
    const { data } = await loadResume(db, resumeId, userId);
    const items = readSection(data, section);
    const index = parseIndex(getRouterParam(event, 'idx'), items.length);

    const merged = buildSectionItem(section, { [field]: value }, items[index]);
    items[index] = merged;
    data[section] = items;
    await saveResumeData(db, resumeId, userId, data);

    return { section, index, field, value: merged[field] };
});
