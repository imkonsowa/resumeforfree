<script lang="ts" setup>
interface Props {
    modelValue: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    label: '',
    placeholder: '',
    disabled: false,
});

const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const { t, locale } = useI18n();

const YEAR_SPAN_PAST = 60;
const YEAR_SPAN_FUTURE = 10;

const monthItems = computed(() => {
    const formatter = new Intl.DateTimeFormat(locale.value, { month: 'long' });
    return Array.from({ length: 12 }, (_, i) => ({
        label: formatter.format(new Date(2000, i, 1)),
        value: String(i + 1).padStart(2, '0'),
    }));
});

const yearItems = computed(() => {
    const current = new Date().getFullYear();
    return Array.from(
        { length: YEAR_SPAN_PAST + YEAR_SPAN_FUTURE + 1 },
        (_, i) => {
            const year = current + YEAR_SPAN_FUTURE - i;
            return { label: String(year), value: String(year) };
        },
    );
});

const selectedMonth = ref('');
const selectedYear = ref('');

const combined = computed(() =>
    selectedYear.value && selectedMonth.value ? `${selectedYear.value}-${selectedMonth.value}` : '',
);

watch(() => props.modelValue, (value) => {
    if (value === combined.value) return;
    const [year, month] = (value || '').split('-');
    selectedYear.value = year || '';
    selectedMonth.value = month || '';
}, { immediate: true });

watch(combined, (value) => {
    if (value !== props.modelValue) emit('update:modelValue', value);
});
</script>

<template>
    <UFormField
        :label="label || undefined"
        name="monthYear"
        class="mb-4"
    >
        <UFieldGroup class="w-full">
            <USelect
                v-model="selectedMonth"
                :items="monthItems"
                value-key="value"
                :disabled="disabled"
                :placeholder="placeholder || t('common.month', 'Month')"
                class="flex-1"
            />
            <USelect
                v-model="selectedYear"
                :items="yearItems"
                value-key="value"
                :disabled="disabled"
                :placeholder="t('common.year', 'Year')"
                class="w-32"
            />
        </UFieldGroup>
    </UFormField>
</template>
