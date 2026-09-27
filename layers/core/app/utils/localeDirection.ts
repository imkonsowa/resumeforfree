const RTL_LOCALES = new Set([
    'ar', 'fa', 'ur', 'yi', 'ji', 'ps', 'sd', 'ug',
    'arc', 'bcc', 'bqi', 'ckb', 'dv', 'glk', 'ku', 'mzn', 'pnb',
]);

export const isRtlLocale = (locale: string): boolean => RTL_LOCALES.has(locale.toLowerCase());

export const getLocaleDirection = (locale: string): 'rtl' | 'ltr' => (isRtlLocale(locale) ? 'rtl' : 'ltr');
