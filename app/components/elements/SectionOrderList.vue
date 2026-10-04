<script lang="ts" setup>
const { t } = useI18n();
const resumeStore = useResumeStore();
const { getSectionHeader } = useSectionHeader();

const entriesLabel = (count: number) => t('builder.stepper.entries', { count }, count);

const orderedSections = computed(() => {
    const data = resumeStore.resumeData;
    const sectionOrder = data.sectionOrder;
    const sectionsData = [
        { id: 'experience', header: 'experience', count: data.experiences.length, order: sectionOrder.experience },
        { id: 'internships', header: 'internships', count: data.internships.length, order: sectionOrder.internships },
        { id: 'education', header: 'education', count: data.education.length, order: sectionOrder.education },
        { id: 'skills', header: 'skills', count: data.skills.length, order: sectionOrder.skills },
        { id: 'projects', header: 'projects', count: data.projects.length, order: sectionOrder.projects ?? 6 },
        { id: 'languages', header: 'languages', count: data.languages.length, order: sectionOrder.languages ?? 7 },
        { id: 'volunteering', header: 'volunteering', count: data.volunteering.length, order: sectionOrder.volunteering },
        { id: 'certificates', header: 'certificates', count: data.certificates.length, order: sectionOrder.certificates },
    ] as const;
    return [...sectionsData]
        .sort((a, b) => a.order - b.order)
        .map(section => ({
            id: section.id,
            title: getSectionHeader(section.header).value,
            subtitle: entriesLabel(section.count),
        }));
});

const moveSection = (fromIndex: number, toIndex: number) => {
    const sections = orderedSections.value;
    if (fromIndex === toIndex || toIndex < 0 || toIndex >= sections.length) return;
    const sectionIds = sections.map(section => section.id);
    const [movedId] = sectionIds.splice(fromIndex, 1);
    if (!movedId) return;
    sectionIds.splice(toIndex, 0, movedId);
    const newOrder = { ...resumeStore.resumeData.sectionOrder };
    sectionIds.forEach((sectionId, index) => {
        newOrder[sectionId as keyof typeof newOrder] = index + 1;
    });
    resumeStore.updateSectionOrder(newOrder);
};

const draggedIndex = ref<number | null>(null);
const dropIndex = ref<number | null>(null);

const onDragStart = (event: DragEvent, index: number) => {
    draggedIndex.value = index;
    if (event.dataTransfer) event.dataTransfer.effectAllowed = 'move';
};
const onDragOver = (event: DragEvent, index: number) => {
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
    dropIndex.value = index;
};
const onDragEnd = () => {
    draggedIndex.value = null;
    dropIndex.value = null;
};
const onDrop = (event: DragEvent, index: number) => {
    event.preventDefault();
    if (draggedIndex.value !== null) moveSection(draggedIndex.value, index);
    onDragEnd();
};
</script>

<template>
    <ol class="divide-y divide-default rounded-md border border-default">
        <li
            v-for="(section, index) in orderedSections"
            :key="section.id"
            draggable="true"
            class="flex items-center gap-3 px-3 py-2 bg-default transition-colors cursor-move"
            :class="[
                draggedIndex === index ? 'opacity-50' : '',
                dropIndex === index && draggedIndex !== null && draggedIndex !== index ? 'bg-elevated' : '',
            ]"
            @dragstart="onDragStart($event, index)"
            @dragover="onDragOver($event, index)"
            @drop="onDrop($event, index)"
            @dragend="onDragEnd"
        >
            <UIcon
                name="i-lucide-grip-vertical"
                class="size-4 shrink-0 text-dimmed"
            />
            <span class="w-5 shrink-0 text-sm text-muted tabular-nums">{{ index + 1 }}</span>
            <span class="flex-1 min-w-0">
                <span class="block text-sm font-medium text-highlighted truncate">{{ section.title }}</span>
                <span class="block text-xs text-muted">{{ section.subtitle }}</span>
            </span>
            <UButton
                :disabled="index === 0"
                size="xs"
                color="neutral"
                variant="ghost"
                icon="i-lucide-chevron-up"
                :aria-label="`${t('common.moveUp')}: ${section.title}`"
                @click="moveSection(index, index - 1)"
            />
            <UButton
                :disabled="index === orderedSections.length - 1"
                size="xs"
                color="neutral"
                variant="ghost"
                icon="i-lucide-chevron-down"
                :aria-label="`${t('common.moveDown')}: ${section.title}`"
                @click="moveSection(index, index + 1)"
            />
        </li>
    </ol>
</template>
