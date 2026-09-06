import { getDb, requireUserId } from '~~/server/utils/apiAuth';
import { loadResume, readSection } from '~~/server/utils/resumeData';
import { getSectionSpec } from '~~/server/utils/resumeSections';

export default defineEventHandler(async (event) => {
    const userId = await requireUserId(event);
    const resumeId = getRouterParam(event, 'id')!;
    const section = getRouterParam(event, 'section')!;
    getSectionSpec(section);

    const { data } = await loadResume(getDb(event), resumeId, userId);
    const items = readSection(data, section);
    return { section, count: items.length, items };
});
