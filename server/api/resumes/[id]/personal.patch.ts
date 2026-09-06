import { getDb, requireUserId } from '~~/server/utils/apiAuth';
import { loadResume, saveResumeData } from '~~/server/utils/resumeData';
import { PERSONAL_FIELDS, buildPersonalPatch } from '~~/server/utils/resumeSections';

export default defineEventHandler(async (event) => {
    const userId = await requireUserId(event);
    const resumeId = getRouterParam(event, 'id')!;

    const patch = buildPersonalPatch(await readBody(event));
    const db = getDb(event);
    const { data } = await loadResume(db, resumeId, userId);
    Object.assign(data, patch);
    await saveResumeData(db, resumeId, userId, data);

    const current: Record<string, unknown> = {};
    for (const field of Object.keys(PERSONAL_FIELDS)) {
        current[field] = data[field];
    }
    return { updated: Object.keys(patch), personal: current };
});
