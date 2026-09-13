<script lang="ts" setup>
import type { AccordionItem } from '@nuxt/ui';
import { createFAQStructuredData, getOgLocale } from '~/composables/useSEO';

const { t, locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

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

const QA_KEYWORDS: Record<string, string> = {
    en: 'resume builder FAQ, free resume questions, PDF export help, Typst resume, privacy resume builder, resume builder help',
    ar: 'الأسئلة الشائعة حول السيرة الذاتية, أسئلة صانع السيرة الذاتية, مساعدة تصدير PDF, خصوصية السيرة الذاتية',
    de: 'lebenslauf faq, fragen zum lebenslauf-ersteller, hilfe pdf export, kostenloser lebenslauf fragen',
    it: 'faq curriculum vitae, domande creatore cv, supporto esportazione pdf, assistenza cv gratis',
    zh: '简历生成器常见问题, 制作简历问答, PDF导出帮助, 免费简历帮助, 隐私简历',
    ur: 'سی وی بنانے سے متعلق سوالات, مفت ریزیومے کے سوالات, پی ڈی ایف ایکسپورٹ مدد, سی وی پرائیویسی',
    hi: 'रिज्यूमे मेकर एफएक्यू, फ्री बायोडाटा से जुड़े सवाल, पीडीएफ एक्सपोर्ट सहायता, रिज्यूमे हेल्प',
    fr: 'faq créateur de cv, questions cv gratuit, aide export pdf, assistance modèle cv',
    tr: 'özgeçmiş sss, cv oluşturucu soruları, pdf dışa aktarma yardımı, ücretsiz cv yardım',
};

useHead(() => {
    const pageTitle = `${t('qa.title')} ${t('qa.titleHighlight')} | Resume For Free`;
    const pageUrl = `https://resumeforfree.com${route.path}`;
    const ogLocale = getOgLocale(locale.value);

    return {
        title: pageTitle,
        meta: [
            { name: 'description', content: t('qa.subtitle') },
            { name: 'keywords', content: QA_KEYWORDS[locale.value] || QA_KEYWORDS.en },
            { name: 'robots', content: 'index, follow' },
            { property: 'og:type', content: 'website' },
            { property: 'og:locale', content: ogLocale },
            { property: 'og:site_name', content: 'Resume For Free' },
            { property: 'og:title', content: pageTitle },
            { property: 'og:description', content: t('qa.subtitle') },
            { property: 'og:url', content: pageUrl },
            { property: 'og:image', content: 'https://resumeforfree.com/og-image.png' },
            { name: 'twitter:card', content: 'summary_large_image' },
            { name: 'twitter:title', content: pageTitle },
            { name: 'twitter:description', content: t('qa.subtitle') },
            { name: 'twitter:image', content: 'https://resumeforfree.com/og-image.png' },
        ],
        script: [{ type: 'application/ld+json', children: JSON.stringify(createFAQStructuredData(faqs)) }],
    };
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
