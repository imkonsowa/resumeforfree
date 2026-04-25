<script lang="ts" setup>
import {
    ArrowRight,
    Check,
    ChevronDown,
    Cloud,
    Download,
    Layers,
    Lock,
    Shield,
    WifiOff,
    X,
    Zap,
} from 'lucide-vue-next';
import {
    createFAQStructuredData,
    createOrganizationStructuredData,
    createSoftwareApplicationStructuredData,
    createWebsiteStructuredData,
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

const openFaqIndex = ref<number>(0);
const toggleFaq = (index: number) => {
    openFaqIndex.value = openFaqIndex.value === index ? -1 : index;
};

const comparisonRows = [
    { key: 'pdfDownload', us: 'yes', canva: 'yes', zety: 'no', resumeio: 'no' },
    { key: 'noAccount', us: 'yes', canva: 'no', zety: 'no', resumeio: 'no' },
    { key: 'noWatermark', us: 'yes', canva: 'yes', zety: 'no', resumeio: 'no' },
    { key: 'noAds', us: 'yes', canva: 'no', zety: 'no', resumeio: 'yes' },
    { key: 'dataOnDevice', us: 'yes', canva: 'no', zety: 'no', resumeio: 'no' },
    { key: 'worksOffline', us: 'yes', canva: 'no', zety: 'no', resumeio: 'no' },
    { key: 'unlimitedDownloads', us: 'yes', canva: 'yes', zety: 'no', resumeio: 'no' },
    { key: 'noTrial', us: 'yes', canva: 'no', zety: 'no', resumeio: 'no' },
] as const;

const featureItems = [
    { icon: Check, title: t('homepage.features.free.title'), body: t('homepage.features.free.description') },
    { icon: Lock, title: t('homepage.features.privacy.title'), body: t('homepage.features.privacy.description') },
    { icon: Shield, title: t('homepage.features.noRegistration.title'), body: t('homepage.features.noRegistration.description') },
    { icon: Download, title: t('homepage.features.unlimitedDownloads.title'), body: t('homepage.features.unlimitedDownloads.description') },
    { icon: Layers, title: t('homepage.features.unlimitedResumes.title'), body: t('homepage.features.unlimitedResumes.description') },
    { icon: WifiOff, title: t('homepage.features.offline.title'), body: t('homepage.features.offline.description') },
    { icon: Zap, title: t('homepage.features.atsOptimized.title'), body: t('homepage.features.atsOptimized.description') },
    { icon: Cloud, title: t('homepage.features.cloudSync.title'), body: t('homepage.features.cloudSync.description') },
] as const;

useHead({
    title: t('homepage.heroTitle'),
    meta: [
        {
            name: 'description',
            content: t('homepage.heroDescription'),
        },
        {
            name: 'keywords',
            content: 'free resume builder, resume for free, free resume maker, no registration resume builder, privacy resume builder, PDF resume download, resume builder no signup, free CV maker, ATS friendly resume, resume builder no watermark',
        },
        {
            property: 'og:type',
            content: 'website',
        },
        {
            property: 'og:site_name',
            content: 'Resume For Free',
        },
        {
            property: 'og:title',
            content: t('homepage.heroTitle'),
        },
        {
            property: 'og:description',
            content: t('homepage.heroDescription'),
        },
        {
            property: 'og:url',
            content: 'https://resumeforfree.com',
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
            content: t('homepage.heroTitle'),
        },
        {
            name: 'twitter:description',
            content: t('homepage.heroDescription'),
        },
        {
            name: 'twitter:image',
            content: 'https://resumeforfree.com/og-image.png',
        },
    ],
    link: [
        {
            rel: 'canonical',
            href: 'https://resumeforfree.com',
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
});
</script>

<template>
    <main>
        <!-- ─── Hero ─────────────────────────────────────────────────────── -->
        <section class="border-b border-rule py-[72px] md:py-[88px]">
            <div class="max-w-[1180px] mx-auto px-6">
                <div class="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-16 items-center">
                    <!-- Left: copy -->
                    <div>
                        <!-- Stats chip -->
                        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-xs font-medium text-green-700 mb-5">
                            <span class="w-1.5 h-1.5 rounded-full bg-green shrink-0" />
                            {{ formatNumber(stats.users) }} {{ $t('homepage.hero.stat1Label') }} · {{ formatNumber(stats.downloads) }} {{ $t('homepage.hero.stat2Label') }}
                        </div>

                        <h1 class="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight text-ink">
                            {{ $t('homepage.hero.title') }}
                        </h1>
                        <p class="text-lg text-ink-3 mt-4 max-w-xl leading-relaxed">
                            {{ $t('homepage.hero.sub') }}
                        </p>

                        <div class="flex flex-wrap gap-2.5 mt-7">
                            <NuxtLink :to="localePath('/builder')">
                                <button class="inline-flex items-center gap-2 h-[46px] px-[22px] rounded-lg bg-green text-white font-medium text-[15px] hover:bg-green-600 transition-colors">
                                    {{ $t('homepage.hero.ctaBuild') }}
                                    <ArrowRight class="w-4 h-4" />
                                </button>
                            </NuxtLink>
                        </div>

                        <p class="text-sm text-ink-4 mt-3.5">
                            {{ $t('homepage.hero.note') }}
                        </p>

                        <p class="text-xs text-ink-4 mt-2">
                            {{ $t('homepage.termsAgreement') }}
                            <NuxtLink
                                :to="localePath('/terms')"
                                class="text-green-700 underline underline-offset-2 hover:text-green-ink"
                            >
                                {{ $t('homepage.termsLink') }}
                            </NuxtLink>
                        </p>

                        <!-- Stats row -->
                        <div class="mt-10 pt-6 border-t border-rule grid grid-cols-3 gap-8">
                            <div>
                                <div class="text-[22px] font-bold tracking-tight text-ink">
                                    {{ formatNumber(stats.users) }}
                                </div>
                                <div class="text-xs text-ink-4 mt-0.5">
                                    {{ $t('homepage.hero.stat1Label') }}
                                </div>
                            </div>
                            <div>
                                <div class="text-[22px] font-bold tracking-tight text-ink">
                                    {{ formatNumber(stats.downloads) }}
                                </div>
                                <div class="text-xs text-ink-4 mt-0.5">
                                    {{ $t('homepage.hero.stat2Label') }}
                                </div>
                            </div>
                            <div>
                                <div class="text-[22px] font-bold tracking-tight text-ink">
                                    $0
                                </div>
                                <div class="text-xs text-ink-4 mt-0.5">
                                    {{ $t('homepage.hero.stat3Label') }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Right: sample resume preview (SVG as object; content isn't indexed as page content) -->
                    <div class="hidden lg:flex justify-center">
                        <object
                            :data="sampleResumeSrc"
                            type="image/svg+xml"
                            :aria-label="$t('homepage.sampleResume.alt')"
                            class="w-[420px] aspect-[596/842] rounded-[10px] border border-rule bg-white pointer-events-none"
                            style="box-shadow: 0 1px 2px rgb(11 18 32 / 0.04), 0 20px 40px -12px rgb(11 18 32 / 0.12);"
                        />
                    </div>
                </div>
            </div>
        </section>

        <!-- ─── Features ──────────────────────────────────────────────────── -->
        <section class="py-[88px] bg-white">
            <div class="max-w-[1180px] mx-auto px-6">
                <div class="max-w-[620px] mb-12">
                    <div class="text-xs uppercase tracking-widest font-semibold text-green-700 mb-3">
                        {{ $t('homepage.features.eyebrow') }}
                    </div>
                    <h2 class="text-[clamp(28px,3.5vw,40px)] font-semibold tracking-tight leading-tight text-ink">
                        {{ $t('homepage.features.sectionTitle') }}
                    </h2>
                    <p class="text-base text-ink-3 mt-3.5">
                        {{ $t('homepage.features.sub') }}
                    </p>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div
                        v-for="item in featureItems"
                        :key="item.title"
                        class="bg-white border border-rule rounded-[10px] p-[22px]"
                    >
                        <div class="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center mb-4">
                            <component
                                :is="item.icon"
                                class="w-[18px] h-[18px] text-green-700"
                            />
                        </div>
                        <h3 class="text-[15px] font-semibold tracking-tight text-ink">
                            {{ item.title }}
                        </h3>
                        <p class="text-sm text-ink-3 leading-relaxed mt-1.5">
                            {{ item.body }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ─── How It Works ──────────────────────────────────────────────── -->
        <section class="py-[88px] bg-bg-2 border-t border-b border-rule">
            <div class="max-w-[1180px] mx-auto px-6">
                <div class="text-center max-w-[640px] mx-auto mb-12">
                    <div class="text-xs uppercase tracking-widest font-semibold text-green-700 mb-3">
                        {{ $t('homepage.howItWorks.eyebrow') }}
                    </div>
                    <h2 class="text-[clamp(28px,3.5vw,40px)] font-semibold tracking-tight leading-tight text-ink">
                        {{ $t('homepage.howItWorks.title') }}
                    </h2>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div
                        v-for="step in [
                            { n: '1', title: t('homepage.howItWorks.step1.title'), body: t('homepage.howItWorks.step1.description') },
                            { n: '2', title: t('homepage.howItWorks.step2.title'), body: t('homepage.howItWorks.step2.description') },
                            { n: '3', title: t('homepage.howItWorks.step3.title'), body: t('homepage.howItWorks.step3.description') },
                        ]"
                        :key="step.n"
                        class="bg-white border border-rule rounded-[10px] p-7"
                    >
                        <div class="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center text-sm font-semibold mb-[18px]">
                            {{ step.n }}
                        </div>
                        <h3 class="text-[17px] font-semibold tracking-tight text-ink">
                            {{ step.title }}
                        </h3>
                        <p class="text-sm text-ink-3 mt-2 leading-relaxed">
                            {{ step.body }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- ─── Compare Table ─────────────────────────────────────────────── -->
        <section class="py-[88px] bg-white">
            <div class="max-w-[980px] mx-auto px-6">
                <div class="text-center mb-10">
                    <div class="text-xs uppercase tracking-widest font-semibold text-green-700 mb-3">
                        {{ $t('homepage.comparison.eyebrow') }}
                    </div>
                    <h2 class="text-[clamp(28px,3.5vw,40px)] font-semibold tracking-tight leading-tight text-ink">
                        {{ $t('homepage.comparison.title') }}
                    </h2>
                    <p class="text-[15px] text-ink-3 mt-2.5">
                        {{ $t('homepage.comparison.caption') }}
                    </p>
                </div>

                <div class="bg-white border border-rule rounded-[10px] overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full border-collapse text-sm">
                            <thead>
                                <tr>
                                    <th class="py-4 px-[18px] text-left text-[13px] font-semibold text-ink bg-bg-2 border-b border-rule">
                                        {{ t('homepage.comparison.headers.feature') }}
                                    </th>
                                    <th class="py-4 px-[18px] text-center text-[13px] font-semibold text-green-700 bg-green-50 border-b border-rule">
                                        {{ t('homepage.comparison.headers.us') }}
                                    </th>
                                    <th class="py-4 px-[18px] text-center text-[13px] font-semibold text-ink bg-bg-2 border-b border-rule">
                                        {{ t('homepage.comparison.headers.canva') }}
                                    </th>
                                    <th class="py-4 px-[18px] text-center text-[13px] font-semibold text-ink bg-bg-2 border-b border-rule">
                                        {{ t('homepage.comparison.headers.zety') }}
                                    </th>
                                    <th class="py-4 px-[18px] text-center text-[13px] font-semibold text-ink bg-bg-2 border-b border-rule">
                                        {{ t('homepage.comparison.headers.resumeio') }}
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="(row, ri) in comparisonRows"
                                    :key="row.key"
                                    :class="ri < comparisonRows.length - 1 ? 'border-b border-rule-soft' : ''"
                                >
                                    <td class="py-3.5 px-[18px] text-sm text-ink-2">
                                        {{ $t(`homepage.comparison.rows.${row.key}`) }}
                                    </td>
                                    <td class="py-3.5 px-[18px] text-center bg-green-50/60">
                                        <Check
                                            v-if="row.us === 'yes'"
                                            class="w-[17px] h-[17px] text-green-600 mx-auto"
                                            :stroke-width="2.4"
                                        />
                                        <X
                                            v-else
                                            class="w-[17px] h-[17px] text-destructive mx-auto"
                                            :stroke-width="2.2"
                                        />
                                    </td>
                                    <td class="py-3.5 px-[18px] text-center">
                                        <Check
                                            v-if="row.canva === 'yes'"
                                            class="w-[17px] h-[17px] text-green-600 mx-auto"
                                            :stroke-width="2.4"
                                        />
                                        <X
                                            v-else
                                            class="w-[17px] h-[17px] text-destructive mx-auto"
                                            :stroke-width="2.2"
                                        />
                                    </td>
                                    <td class="py-3.5 px-[18px] text-center">
                                        <Check
                                            v-if="row.zety === 'yes'"
                                            class="w-[17px] h-[17px] text-green-600 mx-auto"
                                            :stroke-width="2.4"
                                        />
                                        <X
                                            v-else
                                            class="w-[17px] h-[17px] text-destructive mx-auto"
                                            :stroke-width="2.2"
                                        />
                                    </td>
                                    <td class="py-3.5 px-[18px] text-center">
                                        <Check
                                            v-if="row.resumeio === 'yes'"
                                            class="w-[17px] h-[17px] text-green-600 mx-auto"
                                            :stroke-width="2.4"
                                        />
                                        <X
                                            v-else
                                            class="w-[17px] h-[17px] text-destructive mx-auto"
                                            :stroke-width="2.2"
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <p class="text-xs text-ink-4 mt-3 text-center">
                    {{ t('homepage.comparison.footnote') }}
                </p>
            </div>
        </section>

        <!-- ─── Why This Exists ───────────────────────────────────────────── -->
        <section class="py-[88px] bg-bg-2 border-t border-b border-rule">
            <div
                class="max-w-[980px] mx-auto px-6"
                style="max-width: 780px;"
            >
                <div class="text-xs uppercase tracking-widest font-semibold text-green-700 mb-3">
                    {{ $t('homepage.whyBuilt.eyebrow') }}
                </div>
                <h2 class="text-[clamp(28px,3.5vw,38px)] font-semibold tracking-tight leading-snug text-ink mb-6">
                    {{ $t('homepage.whyBuilt.sectionTitle') }}
                </h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-base leading-[1.65] text-ink-2">
                    <p>{{ t('homepage.whyBuilt.paragraph1') }}</p>
                    <p>
                        {{ t('homepage.whyBuilt.paragraph2') }}
                        <br><br>
                        {{ t('homepage.whyBuilt.paragraph3') }}
                    </p>
                </div>
            </div>
        </section>

        <!-- ─── FAQ ───────────────────────────────────────────────────────── -->
        <section class="py-[88px] bg-white">
            <div class="max-w-[1180px] mx-auto px-6">
                <div class="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-[72px]">
                    <!-- Left: heading -->
                    <div>
                        <div class="text-xs uppercase tracking-widest font-semibold text-green-700 mb-3">
                            {{ $t('homepage.faq.eyebrow') }}
                        </div>
                        <h2 class="text-[clamp(26px,3vw,36px)] font-semibold tracking-tight leading-snug text-ink">
                            {{ $t('homepage.faq.title') }}
                        </h2>
                        <p class="text-[14.5px] text-ink-3 mt-3.5">
                            {{ $t('homepage.faq.contactIntro') }}
                            <NuxtLink
                                :to="localePath('/contact')"
                                class="text-green-700 underline underline-offset-2 hover:text-green-600"
                            >
                                {{ $t('homepage.faq.contactLinkContact') }}
                            </NuxtLink>
                            or
                            <a
                                href="https://github.com/imkonsowa/resume-builder/issues"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="text-green-700 underline underline-offset-2 hover:text-green-600"
                            >{{ $t('homepage.faq.contactLinkGithub') }}</a>.
                        </p>
                    </div>

                    <!-- Right: accordion -->
                    <div class="bg-white border border-rule rounded-[10px] overflow-hidden">
                        <div
                            v-for="(item, index) in faqItems"
                            :key="index"
                            :class="index < faqItems.length - 1 ? 'border-b border-rule-soft' : ''"
                        >
                            <button
                                class="w-full text-left px-[22px] py-[18px] flex items-center justify-between gap-4 cursor-pointer"
                                :aria-expanded="openFaqIndex === index"
                                @click="toggleFaq(index)"
                            >
                                <span class="text-[15px] font-medium text-ink pe-4">{{ item.question }}</span>
                                <ChevronDown
                                    class="w-[17px] h-[17px] text-ink-4 shrink-0 transition-transform duration-200"
                                    :class="{ 'rotate-180': openFaqIndex === index }"
                                />
                            </button>
                            <div
                                class="overflow-hidden transition-all duration-[250ms] ease-in-out"
                                :style="openFaqIndex === index ? 'max-height: 240px' : 'max-height: 0'"
                            >
                                <p class="px-[22px] pb-5 text-[14.5px] text-ink-3 leading-[1.6]">
                                    {{ item.answer }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ─── Final CTA ─────────────────────────────────────────────────── -->
        <section class="py-[88px] bg-bg-2 border-t border-rule">
            <div class="max-w-[640px] mx-auto px-6 text-center">
                <h2 class="text-[clamp(30px,4vw,44px)] font-semibold tracking-tight leading-tight text-ink">
                    {{ t('homepage.finalCta.title') }}
                </h2>
                <p class="text-[17px] text-ink-3 mt-3.5">
                    {{ $t('homepage.finalCta.sub') }}
                </p>
                <div class="flex flex-wrap gap-2.5 justify-center mt-6">
                    <NuxtLink :to="localePath('/builder')">
                        <button class="inline-flex items-center gap-2 h-[46px] px-[22px] rounded-lg bg-green text-white font-medium text-[15px] hover:bg-green-600 transition-colors">
                            {{ $t('homepage.finalCta.ctaBuild') }}
                            <ArrowRight class="w-4 h-4" />
                        </button>
                    </NuxtLink>
                </div>
            </div>
        </section>
    </main>
</template>
