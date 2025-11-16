export const isRtlLocale = (locale: string): boolean => {
    const rtlLocales = [
        'ar',
        'fa',
        'ur',
        'yi',
        'ji',
        'ps',
        'sd',
        'ug',
        'arc',
        'bcc',
        'bqi',
        'ckb',
        'dv',
        'glk',
        'ku',
        'mzn',
        'pnb',
    ];

    return rtlLocales.includes(locale.toLowerCase());
};

export const getLocaleDirection = (locale: string): 'rtl' | 'ltr' => {
    return isRtlLocale(locale) ? 'rtl' : 'ltr';
};
