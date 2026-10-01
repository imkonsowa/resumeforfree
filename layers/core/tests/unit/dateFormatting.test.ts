import { describe, expect, it } from 'vitest';
import { formatDateRangeText, formatDateToMonthYear } from '#layers/core/app/utils/typstUtils';

describe('formatDateToMonthYear', () => {
    it('shows month and year when both are set', () => {
        expect(formatDateToMonthYear('2021-03', 'en')).toBe('March 2021');
    });

    it('shows only the year when no month is set', () => {
        expect(formatDateToMonthYear('2021', 'en')).toBe('2021');
        expect(formatDateToMonthYear('2021', 'ar')).toBe('2021');
    });
});

describe('formatDateRangeText', () => {
    it('mixes year-only and month dates', () => {
        expect(formatDateRangeText({ startDate: '2019', endDate: '2021-06', locale: 'en' })).toBe('2019 - June 2021');
    });

    it('keeps year-only start with present', () => {
        expect(formatDateRangeText({ startDate: '2019', isPresent: true, locale: 'en' })).toBe('2019 - Present');
    });
});
