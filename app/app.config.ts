export default defineAppConfig({
    ui: {
        colors: {
            primary: 'ink',
            secondary: 'brand',
            success: 'brand',
            info: 'blue',
            warning: 'amber',
            error: 'red',
            neutral: 'slate',
        },
        icons: {
            loading: 'i-lucide-loader-circle',
        },
        pageSection: {
            slots: {
                container: 'py-14 sm:py-16 lg:py-20 gap-8 lg:gap-12',
                title: 'text-3xl sm:text-4xl',
                description: 'text-base sm:text-lg',
                features: 'gap-x-8 gap-y-10',
            },
        },
        pageHero: {
            slots: {
                container: 'py-14 sm:py-20 lg:py-24 gap-10 lg:gap-16',
            },
        },
        pageCTA: {
            slots: {
                container: 'py-14 sm:py-16 lg:py-20',
            },
        },
    },
});
