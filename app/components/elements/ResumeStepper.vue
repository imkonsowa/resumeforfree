<template>
    <UModal
        v-model:open="showStepper"
        :title="t('builder.sections')"
        :ui="{ content: 'max-w-sm' }"
    >
        <template #body>
            <div class="space-y-3">
                <UButton
                    v-for="(section, index) in fixedSections"
                    :key="section.id"
                    block
                    color="neutral"
                    :variant="isCurrentSection(section.id) ? 'soft' : 'ghost'"
                    class="justify-start gap-3 p-3"
                    @click="scrollToSection(section.id)"
                >
                    <span
                        class="size-8 shrink-0 rounded-full border-2 border-accented flex items-center justify-center text-sm font-medium"
                        :class="isCurrentSection(section.id) ? 'border-primary text-primary' : ''"
                    >
                        {{ index + 1 }}
                    </span>
                    <span class="flex-1 min-w-0 text-start">
                        <span class="block text-sm font-medium truncate">{{ section.title }}</span>
                        <span class="block text-xs text-muted">{{ section.subtitle }}</span>
                    </span>
                </UButton>
                <div
                    v-for="(section, index) in orderableSections"
                    :key="section.id"
                    class="relative"
                >
                    <div
                        v-if="dropZoneIndex === index && draggedIndex !== null && draggedIndex !== index"
                        class="absolute top-0 start-0 end-0 h-px bg-accented rounded-full z-10 transition-all duration-200"
                    />
                    <div
                        :class="[
                            isCurrentSection(section.id)
                                ? 'bg-primary text-inverted'
                                : 'text-muted',
                            draggedIndex === index ? 'opacity-50' : '',
                            dropZoneIndex === index && draggedIndex !== null && draggedIndex !== index ? 'transform translate-y-1' : '',
                        ]"
                        :draggable="section.orderable"
                        class="w-full flex items-center gap-3 p-3 rounded-md transition-colors hover:bg-elevated hover:text-highlighted cursor-move"
                        @dragend="onDragEnd"
                        @dragover="onDragOver($event, index)"
                        @dragstart="onDragStart($event, index)"
                        @drop="onDrop($event, index)"
                    >
                        <div class="flex-shrink-0">
                            <UIcon
                                name="i-lucide-grip-vertical"
                                class="w-4 h-4 text-dimmed"
                            />
                        </div>
                        <button
                            type="button"
                            class="flex flex-1 min-w-0 items-center gap-3 text-start rounded-md focus-visible:outline-2 focus-visible:outline-primary"
                            @click="scrollToSection(section.id)"
                        >
                            <div
                                :class="[
                                    isCurrentSection(section.id)
                                        ? 'border-inverted bg-inverted text-primary'
                                        : 'border-accented',
                                ]"
                                class="w-8 h-8 shrink-0 rounded-full border-2 flex items-center justify-center text-sm font-medium"
                            >
                                {{ fixedSections.length + index + 1 }}
                            </div>
                            <div class="flex-1 min-w-0">
                                <div class="text-sm font-medium truncate">
                                    {{ section.title }}
                                </div>
                                <div class="text-xs opacity-75">
                                    {{ section.subtitle }}
                                </div>
                            </div>
                        </button>
                        <div class="flex shrink-0 items-center gap-1">
                            <UButton
                                :disabled="index === 0"
                                size="xs"
                                color="neutral"
                                variant="ghost"
                                class="text-inherit"
                                icon="i-lucide-chevron-up"
                                :aria-label="`${t('common.moveUp')}: ${section.title}`"
                                @click.stop="moveSection(index, index - 1)"
                            />
                            <UButton
                                :disabled="index === orderableSections.length - 1"
                                size="xs"
                                color="neutral"
                                variant="ghost"
                                class="text-inherit"
                                icon="i-lucide-chevron-down"
                                :aria-label="`${t('common.moveDown')}: ${section.title}`"
                                @click.stop="moveSection(index, index + 1)"
                            />
                        </div>
                    </div>
                    <div
                        v-if="dropZoneIndex === index + 1 && draggedIndex !== null"
                        class="absolute bottom-0 start-0 end-0 h-px bg-accented rounded-full z-10 transition-all duration-200"
                    />
                </div>
                <div
                    class="h-4 relative"
                    @dragover="onDragOver($event, orderableSections.length)"
                    @drop="onDrop($event, orderableSections.length - 1)"
                >
                    <div
                        v-if="dropZoneIndex === orderableSections.length && draggedIndex !== null"
                        class="absolute top-2 start-0 end-0 h-px bg-accented rounded-full z-10 transition-all duration-200"
                    />
                </div>
            </div>
        </template>
    </UModal>
</template>

<script lang="ts" setup>
import { useResumeStore } from '~/stores/resume';

const { t } = useI18n();

interface Section {
    id: string;
    title: string;
    subtitle: string;
    orderable?: boolean;
}
const resumeStore = useResumeStore();
const { getSectionHeader } = useSectionHeader();
const entriesLabel = (count: number) => t('builder.stepper.entries', { count }, count);
const fullName = computed(() => [resumeStore.resumeData.firstName, resumeStore.resumeData.lastName].filter(Boolean).join(' '));
const fixedSections = computed<Section[]>(() => [
    {
        id: 'personal-info',
        title: getSectionHeader('personalInfo').value,
        subtitle: fullName.value,
        orderable: false,
    },
]);
const orderableSections = computed<Section[]>(() => {
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
            orderable: true,
        }));
});
const sections = computed<Section[]>(() => [
    ...fixedSections.value,
    ...orderableSections.value,
]);
const currentSection = ref<string>('personal-info');
const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
        });
        currentSection.value = sectionId;
        showStepper.value = false;
    }
};
const isCurrentSection = (sectionId: string) => {
    return currentSection.value === sectionId;
};
const draggedIndex = ref<number | null>(null);
const dropZoneIndex = ref<number | null>(null);
const onDragStart = (event: DragEvent, index: number) => {
    const section = orderableSections.value[index];
    if (!section.orderable) return;
    draggedIndex.value = index;
    if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/html', event.target as Element);
    }
};
const onDragOver = (event: DragEvent, index: number) => {
    event.preventDefault();
    if (event.dataTransfer) {
        event.dataTransfer.dropEffect = 'move';
    }
    dropZoneIndex.value = index;
};
const moveSection = (fromIndex: number, toIndex: number) => {
    const sections = orderableSections.value;
    if (fromIndex === toIndex || toIndex < 0 || toIndex >= sections.length) return;
    const sectionIds = sections.map(section => section.id);
    const movedIds = sectionIds.splice(fromIndex, 1);
    sectionIds.splice(toIndex, 0, ...movedIds);
    const newOrder = { ...resumeStore.resumeData.sectionOrder };
    sectionIds.forEach((sectionId, index) => {
        newOrder[sectionId as keyof typeof newOrder] = index + 1;
    });
    resumeStore.updateSectionOrder(newOrder);
};
const onDrop = (event: DragEvent, dropIndex: number) => {
    event.preventDefault();
    if (draggedIndex.value !== null) {
        moveSection(draggedIndex.value, dropIndex);
    }
    draggedIndex.value = null;
    dropZoneIndex.value = null;
};
const onDragEnd = () => {
    draggedIndex.value = null;
    dropZoneIndex.value = null;
};
const showStepper = defineModel<boolean>('showStepper', { default: false });
onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    currentSection.value = entry.target.id;
                }
            });
        },
        {
            threshold: [0.1, 0.5, 0.9],
            rootMargin: '-20% 0px -20% 0px',
        },
    );
    sections.value.forEach((section) => {
        const element = document.getElementById(section.id);
        if (element) {
            observer.observe(element);
        }
    });
    onUnmounted(() => {
        observer.disconnect();
    });
});
</script>
