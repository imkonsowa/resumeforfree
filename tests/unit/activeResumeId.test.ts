import { describe, it, expect } from 'vitest';
import { useResumeStore } from '~/stores/resume';

const seedResumes = (store: ReturnType<typeof useResumeStore>, count: number): string[] => {
    const ids: string[] = [];
    for (let i = 0; i < count; i++) {
        ids.push(store.createResume({ name: `Resume ${i + 1}` }));
    }
    return ids;
};

describe('activeResumeId never dangles', () => {
    it('initialize() reassigns an id pointing at a resume that no longer exists', () => {
        const store = useResumeStore();
        const ids = seedResumes(store, 3);

        store.activeResumeId = 'deleted-on-another-device';
        store.initialize();

        expect(
            store.activeResumeId,
            'a dangling activeResumeId survived initialize() — the builder renders its empty state and the user loses every download path',
        ).not.toBe('deleted-on-another-device');
        expect(ids).toContain(store.activeResumeId);
        expect(store.activeResume).not.toBeNull();
    });

    it('initialize() still adopts a resume when no id is set', () => {
        const store = useResumeStore();
        const ids = seedResumes(store, 2);

        store.activeResumeId = null;
        store.initialize();

        expect(ids).toContain(store.activeResumeId);
    });

    it('initialize() leaves a valid id untouched', () => {
        const store = useResumeStore();
        const ids = seedResumes(store, 3);

        const target = ids[ids.length - 1] ?? null;
        store.activeResumeId = target;
        store.initialize();

        expect(store.activeResumeId).toBe(target);
    });

    it('initialize() nulls the id when there are no resumes at all', () => {
        const store = useResumeStore();

        store.activeResumeId = 'ghost';
        store.initialize();

        expect(store.activeResumeId).toBeNull();
    });

    it('the builder gate stays open whenever resumes exist', () => {
        const store = useResumeStore();
        seedResumes(store, 2);
        store.activeResumeId = 'ghost';
        store.initialize();

        const hasResumes = store.resumeCount > 0;
        const hasActiveResume = Boolean(store.activeResume);

        expect(
            !hasResumes || !hasActiveResume,
            'builder.vue shows "No Resume Selected" while resumes exist — floating buttons and download are both unreachable',
        ).toBe(false);
    });
});

describe('mutations tolerate a dangling id without throwing', () => {
    const seedAndDangle = () => {
        const store = useResumeStore();
        seedResumes(store, 1);
        store.activeResumeId = 'dangling';
        return store;
    };

    it('updateField does not throw', () => {
        const store = seedAndDangle();
        expect(() => store.updateField('firstName', 'Rami')).not.toThrow();
    });

    it('addProjectAchievement does not throw', () => {
        const store = seedAndDangle();
        expect(() => store.addProjectAchievement(0, 'x')).not.toThrow();
    });

    it('updateSectionHeader does not throw', () => {
        const store = seedAndDangle();
        expect(() => store.updateSectionHeader('experience', 'Work')).not.toThrow();
    });

    it('updateSectionPlacement does not throw', () => {
        const store = seedAndDangle();
        expect(() => store.updateSectionPlacement('skills', 'right')).not.toThrow();
    });
});
