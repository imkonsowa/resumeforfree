import { createError } from 'h3';

type FieldKind = 'string' | 'boolean' | 'achievements' | 'links';

interface SectionSpec {
    fields: Record<string, FieldKind>;
    required: string[];
}

export const SECTION_SPECS: Record<string, SectionSpec> = {
    experiences: {
        fields: {
            company: 'string', position: 'string', location: 'string', companyUrl: 'string',
            startDate: 'string', endDate: 'string', isPresent: 'boolean',
            description: 'string', achievements: 'achievements',
        },
        required: ['company', 'position'],
    },
    internships: {
        fields: {
            company: 'string', position: 'string', location: 'string', companyUrl: 'string',
            startDate: 'string', endDate: 'string', isPresent: 'boolean',
            description: 'string', achievements: 'achievements',
        },
        required: ['company', 'position'],
    },
    education: {
        fields: {
            institution: 'string', degree: 'string', fieldOfStudy: 'string', location: 'string',
            startDate: 'string', endDate: 'string', isPresent: 'boolean',
            description: 'string', graduationScore: 'string', achievements: 'achievements',
        },
        required: ['institution'],
    },
    volunteering: {
        fields: {
            organization: 'string', organizationUrl: 'string', position: 'string', location: 'string',
            startDate: 'string', endDate: 'string', isPresent: 'boolean',
            description: 'string', achievements: 'achievements',
        },
        required: ['organization'],
    },
    projects: {
        fields: {
            title: 'string', description: 'string', links: 'links',
            startDate: 'string', endDate: 'string', isPresent: 'boolean',
            achievements: 'achievements',
        },
        required: ['title'],
    },
    certificates: {
        fields: {
            title: 'string', issuer: 'string', date: 'string', url: 'string', description: 'string',
        },
        required: ['title'],
    },
    skills: {
        fields: { title: 'string', description: 'string' },
        required: ['title'],
    },
    languages: {
        fields: { name: 'string', proficiency: 'string' },
        required: ['name'],
    },
    socialLinks: {
        fields: { platform: 'string', url: 'string', customLabel: 'string' },
        required: ['platform', 'url'],
    },
};

export const PERSONAL_FIELDS: Record<string, FieldKind> = {
    firstName: 'string', lastName: 'string', email: 'string', phone: 'string',
    position: 'string', location: 'string', summary: 'string', technicalSkills: 'string',
};

export const SECTION_NAMES = Object.keys(SECTION_SPECS);

const bad = (message: string) => createError({ statusCode: 400, statusMessage: message });

function coerceField(field: string, kind: FieldKind, value: unknown): unknown {
    if (kind === 'string') {
        if (typeof value !== 'string') throw bad(`"${field}" must be a string`);
        return value;
    }
    if (kind === 'boolean') {
        if (typeof value !== 'boolean') throw bad(`"${field}" must be a boolean`);
        return value;
    }
    if (kind === 'achievements') {
        if (!Array.isArray(value)) throw bad(`"${field}" must be an array`);
        return value.map((entry, i) => {
            if (typeof entry === 'string') return { text: entry };
            if (entry && typeof entry === 'object' && typeof (entry as { text?: unknown }).text === 'string') {
                return { text: (entry as { text: string }).text };
            }
            throw bad(`"${field}[${i}]" must be a string or { text: string }`);
        });
    }
    if (!Array.isArray(value)) throw bad(`"${field}" must be an array`);
    return value.map((entry, i) => {
        const link = entry as { url?: unknown; label?: unknown };
        if (!link || typeof link.url !== 'string') {
            throw bad(`"${field}[${i}]" must be { url: string, label?: string }`);
        }
        return { url: link.url, label: typeof link.label === 'string' ? link.label : '' };
    });
}

export function getSectionSpec(section: string): SectionSpec {
    const spec = SECTION_SPECS[section];
    if (!spec) {
        throw bad(`Unknown section "${section}". Valid sections: ${SECTION_NAMES.join(', ')}`);
    }
    return spec;
}

export function validateFieldName(section: string, field: string): FieldKind {
    const spec = getSectionSpec(section);
    const kind = spec.fields[field];
    if (!kind) {
        throw bad(`Unknown field "${field}" for section "${section}". Valid fields: ${Object.keys(spec.fields).join(', ')}`);
    }
    return kind;
}

export function buildSectionItem(section: string, input: unknown, base: Record<string, unknown> = {}): Record<string, unknown> {
    const spec = getSectionSpec(section);
    if (!input || typeof input !== 'object' || Array.isArray(input)) {
        throw bad('Request body must be an object');
    }
    const patch = input as Record<string, unknown>;
    const unknownKeys = Object.keys(patch).filter(key => !spec.fields[key]);
    if (unknownKeys.length > 0) {
        throw bad(`Unknown field(s) for "${section}": ${unknownKeys.join(', ')}. Valid fields: ${Object.keys(spec.fields).join(', ')}`);
    }

    const item: Record<string, unknown> = { ...base };
    for (const [field, value] of Object.entries(patch)) {
        item[field] = coerceField(field, spec.fields[field]!, value);
    }
    for (const field of spec.required) {
        if (typeof item[field] !== 'string' || !(item[field] as string).trim()) {
            throw bad(`"${field}" is required for section "${section}"`);
        }
    }
    if (spec.fields.achievements && !Array.isArray(item.achievements)) {
        item.achievements = [];
    }
    if (spec.fields.links && !Array.isArray(item.links)) {
        item.links = [];
    }
    return item;
}

export function buildPersonalPatch(input: unknown): Record<string, unknown> {
    if (!input || typeof input !== 'object' || Array.isArray(input)) {
        throw bad('Request body must be an object');
    }
    const patch = input as Record<string, unknown>;
    const unknownKeys = Object.keys(patch).filter(key => !PERSONAL_FIELDS[key]);
    if (unknownKeys.length > 0) {
        throw bad(`Unknown field(s): ${unknownKeys.join(', ')}. Valid fields: ${Object.keys(PERSONAL_FIELDS).join(', ')}`);
    }
    const result: Record<string, unknown> = {};
    for (const [field, value] of Object.entries(patch)) {
        result[field] = coerceField(field, PERSONAL_FIELDS[field]!, value);
    }
    return result;
}

export function parseIndex(raw: string | undefined, length: number): number {
    const index = Number(raw);
    if (!Number.isInteger(index) || index < 0) {
        throw bad('Index must be a non-negative integer');
    }
    if (index >= length) {
        throw bad(`Index ${index} is out of range; section has ${length} item(s)`);
    }
    return index;
}
