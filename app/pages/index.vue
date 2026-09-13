<script lang="ts" setup>
import type { AccordionItem, PricingTableSection, PricingTableTier } from '@nuxt/ui';
import {
    createFAQStructuredData,
    createOrganizationStructuredData,
    createSoftwareApplicationStructuredData,
    createWebsiteStructuredData,
    getOgLocale,
} from '~/composables/useSEO';

const { t, locale } = useI18n();
const localePath = useLocalePath();

const sampleResumeSrc = computed(() => `/sample-resume-${locale.value}.svg`);

interface PublicStats {
    users: number;
    resumes: number;
    downloads: number;
}

const { data: stats } = await useFetch<PublicStats>('/api/stats', {
    key: 'public-stats',
    default: () => ({ users: 0, resumes: 0, downloads: 0 }),
});

const formatNumber = (n: number) => n.toLocaleString('en-US');

const faqKeys = [
    'reallyFree',
    'dataStorage',
    'needAccount',
    'pdfQuality',
    'atsFriendly',
    'differentFromOthers',
    'offlineWork',
    'multipleResumes',
] as const;

const faqItems = faqKeys.map(key => ({
    question: t(`homepage.faq.items.${key}.question`),
    answer: t(`homepage.faq.items.${key}.answer`),
}));

const faqAccordionItems = computed<AccordionItem[]>(() =>
    faqItems.map(item => ({ label: item.question, content: item.answer })),
);

const comparisonRows = [
    { key: 'pdfDownload', us: true, canva: true, zety: false, resumeio: false },
    { key: 'noAccount', us: true, canva: false, zety: false, resumeio: false },
    { key: 'noWatermark', us: true, canva: true, zety: false, resumeio: false },
    { key: 'noAds', us: true, canva: false, zety: false, resumeio: true },
    { key: 'dataOnDevice', us: true, canva: false, zety: false, resumeio: false },
    { key: 'worksOffline', us: true, canva: false, zety: false, resumeio: false },
    { key: 'unlimitedDownloads', us: true, canva: true, zety: false, resumeio: false },
    { key: 'noTrial', us: true, canva: false, zety: false, resumeio: false },
] as const;

const comparisonTiers = computed<PricingTableTier[]>(() => [
    {
        id: 'us',
        title: t('homepage.comparison.headers.us'),
        price: '$0',
        highlight: true,
        button: { label: t('homepage.hero.ctaBuild'), to: localePath('/builder') },
    },
    { id: 'canva', title: t('homepage.comparison.headers.canva') },
    { id: 'zety', title: t('homepage.comparison.headers.zety') },
    { id: 'resumeio', title: t('homepage.comparison.headers.resumeio') },
]);

const comparisonSections = computed<PricingTableSection[]>(() => [{
    title: t('homepage.comparison.headers.feature'),
    features: comparisonRows.map(row => ({
        id: row.key,
        title: t(`homepage.comparison.rows.${row.key}`),
        tiers: { us: row.us, canva: row.canva, zety: row.zety, resumeio: row.resumeio },
    })),
}]);

const steps = computed(() => [
    { title: t('homepage.howItWorks.step1.title'), body: t('homepage.howItWorks.step1.description') },
    { title: t('homepage.howItWorks.step2.title'), body: t('homepage.howItWorks.step2.description') },
    { title: t('homepage.howItWorks.step3.title'), body: t('homepage.howItWorks.step3.description') },
]);

const featureItems = [
    { icon: 'i-lucide-check', title: t('homepage.features.free.title'), body: t('homepage.features.free.description') },
    { icon: 'i-lucide-lock', title: t('homepage.features.privacy.title'), body: t('homepage.features.privacy.description') },
    { icon: 'i-lucide-shield', title: t('homepage.features.noRegistration.title'), body: t('homepage.features.noRegistration.description') },
    { icon: 'i-lucide-download', title: t('homepage.features.unlimitedDownloads.title'), body: t('homepage.features.unlimitedDownloads.description') },
    { icon: 'i-lucide-layers', title: t('homepage.features.unlimitedResumes.title'), body: t('homepage.features.unlimitedResumes.description') },
    { icon: 'i-lucide-wifi-off', title: t('homepage.features.offline.title'), body: t('homepage.features.offline.description') },
    { icon: 'i-lucide-zap', title: t('homepage.features.atsOptimized.title'), body: t('homepage.features.atsOptimized.description') },
    { icon: 'i-lucide-cloud', title: t('homepage.features.cloudSync.title'), body: t('homepage.features.cloudSync.description') },
] as const;

const route = useRoute();

const HOMEPAGE_KEYWORDS: Record<string, string> = {
    en: 'free resume builder, resume for free, free resume maker, no registration resume builder, privacy resume builder, PDF resume download, resume builder no signup, free CV maker, ATS friendly resume, resume builder no watermark',
    ar: 'إنشاء سيرة ذاتية مجانا, صانع سيرة ذاتية مجاني, سيرة ذاتية بدون تسجيل, سيرة ذاتية بدون علامة مائية, تحميل سيرة ذاتية PDF, سيرة ذاتية متوافقة مع ATS',
    de: 'kostenloser lebenslauf ersteller, lebenslauf online erstellen kostenlos, lebenslauf ohne anmeldung, cv maker kostenlos, lebenslauf pdf download, ats lebenslauf',
    it: 'creare curriculum gratis, creatore di curriculum vitae gratis, curriculum senza registrazione, cv maker gratis, scarica cv pdf, curriculum compatibile ats',
    zh: '免费简历生成器, 在线制作简历, 免费CV制作, 免登录简历制作, 隐私简历生成器, 导出PDF简历, ATS友好简历, 无水印简历制作',
    ur: 'مفت سی وی بنانے والا, مفت ریزیومے میکر, بغیر رجسٹریشن سی وی, پی ڈی ایف سی وی ڈاؤن لوڈ, اے ٹی ایس دوست سی وی, مفت آن لائن سی وی',
    hi: 'फ्री रिज्यूमे मेकर, मुफ्त बायोडाटा मेकर, बिना रजिस्ट्रेशन रिज्यूमे, पीडीएफ रिज्यूमे डाउनलोड, एटीएस फ्रेंडली रिज्यूमे, फ्री सीवी मेकर',
    fr: 'créateur de cv gratuit, faire un cv gratuit en ligne, cv sans inscription, créer cv pdf, cv compatible ats, modèle de cv gratuit',
    tr: 'ücretsiz özgeçmiş oluşturucu, bedava cv hazırla, kayıtsız özgeçmiş yap, cv indir pdf, ats uyumlu cv, filigransız özgeçmiş',
};

useHead(() => {
    const pageUrl = `https://resumeforfree.com${route.path === '/' ? '' : route.path}`;
    const pageTitle = t('homepage.heroTitle');
    const pageDescription = t('homepage.heroDescription');
    const ogLocale = getOgLocale(locale.value);

    return {
        title: pageTitle,
        meta: [
            {
                name: 'description',
                content: pageDescription,
            },
            {
                name: 'keywords',
                content: HOMEPAGE_KEYWORDS[locale.value] || HOMEPAGE_KEYWORDS.en,
            },
            {
                property: 'og:type',
                content: 'website',
            },
            {
                property: 'og:locale',
                content: ogLocale,
            },
            {
                property: 'og:site_name',
                content: 'Resume For Free',
            },
            {
                property: 'og:title',
                content: pageTitle,
            },
            {
                property: 'og:description',
                content: pageDescription,
            },
            {
                property: 'og:url',
                content: pageUrl,
            },
            {
                property: 'og:image',
                content: 'https://resumeforfree.com/og-image.png',
            },
            {
                property: 'og:image:width',
                content: '1200',
            },
            {
                property: 'og:image:height',
                content: '630',
            },
            {
                name: 'twitter:card',
                content: 'summary_large_image',
            },
            {
                name: 'twitter:title',
                content: pageTitle,
            },
            {
                name: 'twitter:description',
                content: pageDescription,
            },
            {
                name: 'twitter:image',
                content: 'https://resumeforfree.com/og-image.png',
            },
        ],
        script: [
            {
                type: 'application/ld+json',
                children: JSON.stringify(createWebsiteStructuredData()),
            },
            {
                type: 'application/ld+json',
                children: JSON.stringify(createSoftwareApplicationStructuredData()),
            },
            {
                type: 'application/ld+json',
                children: JSON.stringify(createOrganizationStructuredData()),
            },
            {
                type: 'application/ld+json',
                children: JSON.stringify(createFAQStructuredData(faqItems)),
            },
        ],
    };
});
</script>

<template>
    <div>
        <UPageHero
            orientation="horizontal"
            :ui="{
                title: 'text-4xl sm:text-5xl lg:text-6xl leading-[1.05]',
                description: 'text-lg text-toned max-w-xl',
                headline: 'mb-6',
            }"
            :title="$t('homepage.hero.title')"
            :description="$t('homepage.hero.sub')"
        >
            <template #headline>
                <UBadge
                    color="secondary"
                    variant="subtle"
                    size="lg"
                >
                    {{ $t('homepage.hero.note') }}
                </UBadge>
            </template>

            <template #footer>
                <UButton
                    :to="localePath('/builder')"
                    :label="$t('homepage.hero.ctaBuild')"
                    trailing-icon="i-lucide-arrow-right"
                    size="xl"
                    color="secondary"
                />

                <p class="text-xs text-muted mt-4">
                    {{ $t('homepage.termsAgreement') }}
                    <ULink
                        :to="localePath('/terms')"
                        class="text-secondary underline underline-offset-2"
                    >
                        {{ $t('homepage.termsLink') }}
                    </ULink>
                </p>

                <dl class="mt-10 pt-8 border-t border-default grid grid-cols-3 gap-6 max-w-md">
                    <div
                        v-for="stat in [
                            { value: formatNumber(stats.users), label: $t('homepage.hero.stat1Label') },
                            { value: formatNumber(stats.downloads), label: $t('homepage.hero.stat2Label') },
                            { value: '$0', label: $t('homepage.hero.stat3Label') },
                        ]"
                        :key="stat.label"
                    >
                        <dt class="text-2xl font-bold tracking-tight text-highlighted tabular-nums">
                            {{ stat.value }}
                        </dt>
                        <dd class="text-xs text-muted mt-1">
                            {{ stat.label }}
                        </dd>
                    </div>
                </dl>
            </template>

            <object
                :data="sampleResumeSrc"
                type="image/svg+xml"
                :aria-label="$t('homepage.sampleResume.alt')"
                class="w-full max-w-[460px] mx-auto aspect-[596/842] rounded-lg ring ring-default bg-white shadow-2xl pointer-events-none"
            />
        </UPageHero>

        <UPageSection
            :title="$t('homepage.features.sectionTitle')"
            :description="$t('homepage.features.sub')"
            :features="featureItems.map(f => ({ title: f.title, description: f.body, icon: f.icon }))"
            :ui="{ features: 'lg:grid-cols-4' }"
        />

        <UPageSection
            :title="$t('homepage.howItWorks.title')"
            class="bg-muted border-y border-default"
        >
            <ol class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                <li
                    v-for="(step, index) in steps"
                    :key="step.title"
                    class="relative md:ps-0"
                >
                    <div class="flex items-baseline gap-3">
                        <span class="text-4xl font-bold tabular-nums text-secondary/40 leading-none">
                            {{ index + 1 }}
                        </span>
                        <h3 class="text-lg font-semibold tracking-tight text-highlighted">
                            {{ step.title }}
                        </h3>
                    </div>
                    <p class="text-sm text-toned leading-relaxed mt-3">
                        {{ step.body }}
                    </p>
                </li>
            </ol>
        </UPageSection>

        <UPageSection
            :title="$t('homepage.comparison.title')"
            :description="$t('homepage.comparison.caption')"
        >
            <UPricingTable
                :tiers="comparisonTiers"
                :sections="comparisonSections"
                :caption="$t('homepage.comparison.title')"
            />
            <p class="text-xs text-muted mt-4 text-center">
                {{ $t('homepage.comparison.footnote') }}
            </p>
        </UPageSection>

        <UPageSection
            :title="$t('homepage.whyBuilt.sectionTitle')"
            class="bg-muted border-y border-default"
        >
            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-base leading-relaxed text-default max-w-4xl">
                <p>{{ $t('homepage.whyBuilt.paragraph1') }}</p>
                <div class="space-y-4">
                    <p>{{ $t('homepage.whyBuilt.paragraph2') }}</p>
                    <p>{{ $t('homepage.whyBuilt.paragraph3') }}</p>
                </div>
            </div>
        </UPageSection>

        <UPageSection
            orientation="horizontal"
            :title="$t('homepage.faq.title')"
            :ui="{ container: 'lg:items-start' }"
        >
            <template #description>
                <p class="text-base text-toned">
                    {{ $t('homepage.faq.contactIntro') }}
                    <ULink
                        :to="localePath('/contact')"
                        class="text-secondary underline underline-offset-2"
                    >{{ $t('homepage.faq.contactLinkContact') }}</ULink>
                    {{ $t('common.or', 'or') }}
                    <ULink
                        to="https://github.com/imkonsowa/resume-builder/issues"
                        target="_blank"
                        class="text-secondary underline underline-offset-2"
                    >{{ $t('homepage.faq.contactLinkGithub') }}</ULink>.
                </p>
            </template>

            <UAccordion
                :items="faqAccordionItems"
                :default-value="'0'"
            />
        </UPageSection>

        <UPageCTA
            :title="$t('homepage.finalCta.title')"
            :description="$t('homepage.finalCta.sub')"
            variant="subtle"
            :links="[{
                label: $t('homepage.finalCta.ctaBuild'),
                to: localePath('/builder'),
                trailingIcon: 'i-lucide-arrow-right',
                size: 'xl',
                color: 'secondary',
            }]"
        />
    </div>
</template>
