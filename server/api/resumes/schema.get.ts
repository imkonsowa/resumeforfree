import { PERSONAL_FIELDS, SECTION_SPECS } from '~~/server/utils/resumeSections';

export default defineEventHandler(() => ({
    personal: {
        route: 'PATCH /api/resumes/{resumeId}/personal',
        fields: PERSONAL_FIELDS,
    },
    sections: Object.fromEntries(
        Object.entries(SECTION_SPECS).map(([section, spec]) => [section, {
            fields: spec.fields,
            required: spec.required,
        }]),
    ),
    routes: [
        'GET    /api/resumes/{resumeId}/sections/{section}',
        'PUT    /api/resumes/{resumeId}/sections/{section}            (replace whole section)',
        'POST   /api/resumes/{resumeId}/sections/{section}            (append one item)',
        'PUT    /api/resumes/{resumeId}/sections/{section}/{index}    (replace one item)',
        'PATCH  /api/resumes/{resumeId}/sections/{section}/{index}    (merge fields into one item)',
        'DELETE /api/resumes/{resumeId}/sections/{section}/{index}',
        'PUT    /api/resumes/{resumeId}/sections/{section}/{index}/{field}',
        'PATCH  /api/resumes/{resumeId}/personal',
    ],
    auth: 'Authorization: Bearer <token from POST /api/tokens>',
}));
