<script lang="ts" setup>
import type { AccordionItem } from '@nuxt/ui';
import { createFAQStructuredData } from '~/composables/useSEO';

const { t } = useI18n();
const localePath = useLocalePath();

const qKeys = [
    'isFree', 'signUp', 'pdfExport', 'privacy', 'atsFriendly', 'differentFromOthers',
    'mobile', 'offline', 'importExport', 'sections', 'customize', 'cloudSync',
    'browsers', 'support',
] as const;

const faqs = qKeys.map(key => ({
    question: t(`qa.questions.${key}.question`),
    answer: t(`qa.questions.${key}.answer`),
}));

const toItems = (entries: typeof faqs): AccordionItem[] =>
    entries.map(faq => ({ label: faq.question, content: faq.answer }));

const faqCategories = computed(() => [
    {
        title: t('qa.categories.gettingStarted'),
        icon: 'i-lucide-help-circle',
        items: toItems(faqs.slice(0, 6)),
    },
    {
        title: t('qa.categories.features'),
        icon: 'i-lucide-circle-check',
        items: toItems(faqs.slice(6, 12)),
    },
    {
        title: t('qa.categories.technical'),
        icon: 'i-lucide-settings',
        items: toItems(faqs.slice(12)),
    },
]);

const pageTitle = `Free Resume Builder FAQ - ${t('qa.title')} ${t('qa.titleHighlight')} | Resume For Free`;

useHead({
    title: pageTitle,
    meta: [
        { name: 'description', content: t('qa.subtitle') },
        { name: 'keywords', content: 'resume builder FAQ, free resume questions, PDF export help, Typst resume, privacy resume builder, resume builder help' },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Resume For Free' },
        { property: 'og:title', content: pageTitle },
        { property: 'og:description', content: t('qa.subtitle') },
        { property: 'og:url', content: 'https://resumeforfree.com/qa' },
        { property: 'og:image', content: 'https://resumeforfree.com/og-image.png' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: pageTitle },
        { name: 'twitter:description', content: t('qa.subtitle') },
        { name: 'twitter:image', content: 'https://resumeforfree.com/og-image.png' },
    ],
    script: [{ type: 'application/ld+json', children: JSON.stringify(createFAQStructuredData(faqs)) }],
});
</script>

<template>
    <div>
        <UPageHero
            :title="t('qa.title')"
            :description="t('qa.subtitle')"
            :ui="{
                container: 'py-16 sm:py-20 lg:py-24 gap-8',
                title: 'text-4xl sm:text-5xl',
            }"
        >
            <template #headline>
                <UBadge
                    color="secondary"
                    variant="subtle"
                    :label="t('qa.badge')"
                />
            </template>
        </UPageHero>

        <UPageSection>
            <div class="space-y-12">
                <section
                    v-for="category in faqCategories"
                    :key="category.title"
                >
                    <div class="flex items-center gap-3 mb-6">
                        <UIcon
                            :name="category.icon"
                            class="size-5 text-primary"
                        />
                        <h2 class="text-2xl font-semibold tracking-tight">
                            {{ category.title }}
                        </h2>
                    </div>

                    <UPageCard variant="subtle">
                        <UAccordion :items="category.items" />
                    </UPageCard>
                </section>
            </div>
        </UPageSection>

        <UPageCTA
            :title="t('qa.ctaTitle')"
            :description="t('qa.ctaSubtitle')"
            variant="subtle"
            :links="[{
                label: t('common.startBuilding'),
                to: localePath('/builder'),
                trailingIcon: 'i-lucide-arrow-right',
                size: 'lg',
            }]"
        />
    </div>
</template>
