import { getDb, requireUserId } from '~~/server/utils/apiAuth';
import { loadResume, saveResumeData } from '~~/server/utils/resumeData';
import { buildSectionItem, getSectionSpec } from '~~/server/utils/resumeSections';

export default defineEventHandler(async (event) => {
    const userId = await requireUserId(event);
    const resumeId = getRouterParam(event, 'id')!;
    const section = getRouterParam(event, 'section')!;
    getSectionSpec(section);

    const body = await readBody(event);
    const rawItems = Array.isArray(body) ? body : body?.items;
    if (!Array.isArray(rawItems)) {
        throw createError({ statusCode: 400, statusMessage: 'Body must be an array of items, or { items: [...] }' });
    }

    const items = rawItems.map(item => buildSectionItem(section, item));
    const db = getDb(event);
    const { data } = await loadResume(db, resumeId, userId);
    data[section] = items;
    await saveResumeData(db, resumeId, userId, data);

    return { section, count: items.length, items };
});
