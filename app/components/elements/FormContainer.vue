<template>
    <UCard class="w-full">
        <template #header>
            <div class="flex items-center justify-between gap-2">
                <div class="flex-1 min-w-0">
                    <EditableHeader
                        v-if="props.editable"
                        :value="props.title"
                        :section-key="typedSectionKey"
                        @update="$emit('edit-title', $event)"
                    />
                    <h3
                        v-else
                        class="text-lg font-semibold text-highlighted"
                    >
                        {{ props.title }}
                    </h3>
                </div>
                <div class="flex items-center gap-2">
                    <slot
                        v-if="$slots['header-actions']"
                        name="header-actions"
                    />
                    <UButton
                        v-if="props.collapsible"
                        color="neutral"
                        variant="ghost"
                        size="sm"
                        square
                        :aria-expanded="!isCollapsed"
                        :aria-label="isCollapsed ? t('common.expand', 'Expand') : t('common.collapse', 'Collapse')"
                        @click="toggleCollapse"
                    >
                        <UIcon
                            name="i-lucide-chevron-down"
                            class="w-4 h-4 transition-transform duration-200"
                            :class="isCollapsed ? '-rotate-90 rtl:rotate-90' : 'rotate-0'"
                        />
                    </UButton>
                </div>
            </div>
        </template>

        <div v-if="!isCollapsed">
            <div
                v-if="props.isEmpty"
                class="text-center py-8 text-muted"
            >
                {{ props.emptyMessage }}
            </div>
            <slot v-else />

            <div
                v-if="props.showAddButton"
                class="mt-6"
            >
                <AddButton
                    :label="props.addButtonLabel"
                    @click="$emit('add')"
                />
            </div>
        </div>
    </UCard>
</template>

<script lang="ts" setup>
import AddButton from '~/components/elements/AddButton.vue';
import EditableHeader from '~/components/elements/EditableHeader.vue';
import type { SectionHeaders } from '~/types/resume';

interface Props {
    title: string;
    isEmpty: boolean;
    emptyMessage: string;
    addButtonLabel: string;
    showAddButton?: boolean;
    editable?: boolean;
    sectionKey?: string;
    collapsible?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    showAddButton: true,
    editable: true,
    collapsible: true,
});
defineEmits<{
    'add': [];
    'edit-title': [value: string];
}>();

const { t } = useI18n();
const settingsStore = useSettingsStore();

const typedSectionKey = computed(() => props.sectionKey as keyof SectionHeaders | undefined);

const isCollapsed = computed(() => {
    if (!props.collapsible || !props.sectionKey) return false;
    return settingsStore.sectionCollapsed[props.sectionKey] || false;
});

const toggleCollapse = () => {
    if (props.collapsible && props.sectionKey) {
        settingsStore.toggleSectionCollapse(props.sectionKey);
    }
};
</script>
