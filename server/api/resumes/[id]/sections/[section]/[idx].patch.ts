import { getDb, requireUserId } from '~~/server/utils/apiAuth';
import { loadResume, readSection, saveResumeData } from '~~/server/utils/resumeData';
import { buildSectionItem, getSectionSpec, parseIndex } from '~~/server/utils/resumeSections';

export default defineEventHandler(async (event) => {
    const userId = await requireUserId(event);
    const resumeId = getRouterParam(event, 'id')!;
    const section = getRouterParam(event, 'section')!;
    getSectionSpec(section);

    const body = await readBody(event);
    const db = getDb(event);
    const { data } = await loadResume(db, resumeId, userId);
    const items = readSection(data, section);
    const index = parseIndex(getRouterParam(event, 'idx'), items.length);

    const merged = buildSectionItem(section, body, items[index]);
    items[index] = merged;
    data[section] = items;
    await saveResumeData(db, resumeId, userId, data);

    return { section, index, item: merged };
});
