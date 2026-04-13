<script lang="ts" setup>
import { Button } from '~/components/ui/button';
import {
    Check,
    ChevronDown,
    Cloud,
    Download,
    FileText,
    Shield,
    WifiOff,
    X,
    Zap,
} from 'lucide-vue-next';
import LanguageSelector from '~/components/elements/LanguageSelector.vue';
import {
    createFAQStructuredData,
    createOrganizationStructuredData,
    createSoftwareApplicationStructuredData,
    createWebsiteStructuredData,
} from '~/composables/useSEO';

const { t } = useI18n();

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

const openFaqIndex = ref<number | null>(null);
const toggleFaq = (index: number) => {
    openFaqIndex.value = openFaqIndex.value === index ? null : index;
};

const comparisonRows = [
    { key: 'pdfDownload', us: 'yes', canva: 'yes', zety: 'no', resumeio: 'no' },
    { key: 'noAccount', us: 'yes', canva: 'no', zety: 'no', resumeio: 'no' },
    { key: 'noWatermark', us: 'yes', canva: 'yes', zety: 'no', resumeio: 'no' },
    { key: 'noAds', us: 'yes', canva: 'no', zety: 'no', resumeio: 'yes' },
    { key: 'dataOnDevice', us: 'yes', canva: 'no', zety: 'no', resumeio: 'no' },
    { key: 'worksOffline', us: 'yes', canva: 'no', zety: 'no', resumeio: 'no' },
    { key: 'unlimitedDownloads', us: 'yes', canva: 'yes', zety: 'no', resumeio: 'no' },
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
        <!-- Hero -->
        <section class="py-20 px-4 sm:px-6 lg:px-8">
            <div class="max-w-4xl mx-auto text-center">
                <h1 class="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
                    {{ t('homepage.title') }}<br>
                    <span class="text-gray-500">{{ t('homepage.subtitle') }}</span>
                </h1>
                <p class="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
                    {{ t('homepage.heroSubheadline') }}
                </p>
                <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                    <NuxtLink to="/resumes">
                        <Button
                            size="lg"
                            class="text-base px-8 py-3"
                        >
                            {{ t('common.buildNow') }}
                        </Button>
                    </NuxtLink>
                    <LanguageSelector
                        show-icon
                        responsive
                    />
                </div>
                <p class="text-xs text-gray-400">
                    {{ t('homepage.termsAgreement') }}
                    <NuxtLink
                        to="/terms"
                        class="text-blue-500 hover:text-blue-700 underline"
                    >
                        {{ t('homepage.termsLink') }}
                    </NuxtLink>
                </p>
            </div>
        </section>

        <!-- Features -->
        <section class="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div class="max-w-5xl mx-auto">
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div class="text-center">
                        <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Check class="w-6 h-6 text-green-600" />
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">
                            {{ t('homepage.features.free.title') }}
                        </h3>
                        <p class="text-sm text-gray-600">
                            {{ t('homepage.features.free.description') }}
                        </p>
                    </div>
                    <div class="text-center">
                        <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Shield class="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">
                            {{ t('homepage.features.privacy.title') }}
                        </h3>
                        <p class="text-sm text-gray-600">
                            {{ t('homepage.features.privacy.description') }}
                        </p>
                    </div>
                    <div class="text-center">
                        <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Zap class="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">
                            {{ t('homepage.features.noRegistration.title') }}
                        </h3>
                        <p class="text-sm text-gray-600">
                            {{ t('homepage.features.noRegistration.description') }}
                        </p>
                    </div>
                    <div class="text-center">
                        <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Download class="w-6 h-6 text-orange-600" />
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">
                            {{ t('homepage.features.unlimitedDownloads.title') }}
                        </h3>
                        <p class="text-sm text-gray-600">
                            {{ t('homepage.features.unlimitedDownloads.description') }}
                        </p>
                    </div>
                    <div class="text-center">
                        <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FileText class="w-6 h-6 text-red-600" />
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">
                            {{ t('homepage.features.unlimitedResumes.title') }}
                        </h3>
                        <p class="text-sm text-gray-600">
                            {{ t('homepage.features.unlimitedResumes.description') }}
                        </p>
                    </div>
                    <div class="text-center">
                        <div class="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <WifiOff class="w-6 h-6 text-indigo-600" />
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">
                            {{ t('homepage.features.offline.title') }}
                        </h3>
                        <p class="text-sm text-gray-600">
                            {{ t('homepage.features.offline.description') }}
                        </p>
                    </div>
                    <div class="text-center sm:col-span-2 lg:col-span-1">
                        <div class="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Cloud class="w-6 h-6 text-sky-600" />
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">
                            {{ t('homepage.features.cloudSync.title') }}
                        </h3>
                        <p class="text-sm text-gray-600">
                            {{ t('homepage.features.cloudSync.description') }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- How It Works -->
        <section class="py-16 px-4 sm:px-6 lg:px-8">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-3xl font-bold text-gray-900 text-center mb-3">
                    {{ t('homepage.howItWorks.title') }}
                </h2>
                <p class="text-gray-500 text-center mb-12">
                    {{ t('homepage.howItWorks.subtitle') }}
                </p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="text-center">
                        <div class="w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                            1
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">
                            {{ t('homepage.howItWorks.step1.title') }}
                        </h3>
                        <p class="text-sm text-gray-600">
                            {{ t('homepage.howItWorks.step1.description') }}
                        </p>
                    </div>
                    <div class="text-center">
                        <div class="w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                            2
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">
                            {{ t('homepage.howItWorks.step2.title') }}
                        </h3>
                        <p class="text-sm text-gray-600">
                            {{ t('homepage.howItWorks.step2.description') }}
                        </p>
                    </div>
                    <div class="text-center">
                        <div class="w-14 h-14 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                            3
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-2">
                            {{ t('homepage.howItWorks.step3.title') }}
                        </h3>
                        <p class="text-sm text-gray-600">
                            {{ t('homepage.howItWorks.step3.description') }}
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Comparison Table -->
        <section class="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-3xl font-bold text-gray-900 text-center mb-3">
                    {{ t('homepage.comparison.title') }}
                </h2>
                <p class="text-gray-500 text-center mb-10">
                    {{ t('homepage.comparison.subtitle') }}
                </p>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm border-collapse">
                        <thead>
                            <tr class="border-b-2 border-gray-200">
                                <th class="text-left py-3 px-4 font-semibold text-gray-700">
                                    {{ t('homepage.comparison.headers.feature') }}
                                </th>
                                <th class="text-center py-3 px-4 font-bold text-gray-900 bg-green-50">
                                    {{ t('homepage.comparison.headers.us') }}
                                </th>
                                <th class="text-center py-3 px-4 font-semibold text-gray-500">
                                    {{ t('homepage.comparison.headers.canva') }}
                                </th>
                                <th class="text-center py-3 px-4 font-semibold text-gray-500">
                                    {{ t('homepage.comparison.headers.zety') }}
                                </th>
                                <th class="text-center py-3 px-4 font-semibold text-gray-500">
                                    {{ t('homepage.comparison.headers.resumeio') }}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="row in comparisonRows"
                                :key="row.key"
                                class="border-b border-gray-100"
                            >
                                <td class="py-3 px-4 text-gray-700">
                                    {{ t(`homepage.comparison.rows.${row.key}`) }}
                                </td>
                                <td class="py-3 px-4 text-center bg-green-50">
                                    <Check
                                        v-if="row.us === 'yes' || row.us === 'free'"
                                        class="w-5 h-5 text-green-600 mx-auto"
                                    />
                                    <X
                                        v-else
                                        class="w-5 h-5 text-red-400 mx-auto"
                                    />
                                </td>
                                <td class="py-3 px-4 text-center">
                                    <Check
                                        v-if="row.canva === 'yes' || row.canva === 'free'"
                                        class="w-5 h-5 text-green-600 mx-auto"
                                    />
                                    <X
                                        v-else
                                        class="w-5 h-5 text-red-400 mx-auto"
                                    />
                                </td>
                                <td class="py-3 px-4 text-center">
                                    <Check
                                        v-if="row.zety === 'yes' || row.zety === 'free'"
                                        class="w-5 h-5 text-green-600 mx-auto"
                                    />
                                    <X
                                        v-else
                                        class="w-5 h-5 text-red-400 mx-auto"
                                    />
                                </td>
                                <td class="py-3 px-4 text-center">
                                    <Check
                                        v-if="row.resumeio === 'yes' || row.resumeio === 'free'"
                                        class="w-5 h-5 text-green-600 mx-auto"
                                    />
                                    <X
                                        v-else
                                        class="w-5 h-5 text-red-400 mx-auto"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p class="text-xs text-gray-400 mt-4 text-center">
                    {{ t('homepage.comparison.footnote') }}
                </p>
            </div>
        </section>

        <!-- Why This Exists -->
        <section class="py-16 px-4 sm:px-6 lg:px-8">
            <div class="max-w-3xl mx-auto">
                <h2 class="text-3xl font-bold text-gray-900 text-center mb-8">
                    {{ t('homepage.whyBuilt.title') }}
                </h2>
                <div class="space-y-4 text-gray-600 leading-relaxed">
                    <p>{{ t('homepage.whyBuilt.paragraph1') }}</p>
                    <p>{{ t('homepage.whyBuilt.paragraph2') }}</p>
                    <p>{{ t('homepage.whyBuilt.paragraph3') }}</p>
                </div>
            </div>
        </section>

        <!-- FAQ -->
        <section class="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div class="max-w-3xl mx-auto">
                <h2 class="text-3xl font-bold text-gray-900 text-center mb-10">
                    {{ t('homepage.faq.title') }}
                </h2>
                <div class="space-y-3">
                    <div
                        v-for="(item, index) in faqItems"
                        :key="index"
                        class="bg-white rounded-lg border border-gray-200"
                    >
                        <button
                            class="w-full text-left px-5 py-4 flex items-center justify-between gap-4 cursor-pointer"
                            :aria-expanded="openFaqIndex === index"
                            @click="toggleFaq(index)"
                        >
                            <span class="font-medium text-gray-900">{{ item.question }}</span>
                            <ChevronDown
                                class="w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200"
                                :class="{ 'rotate-180': openFaqIndex === index }"
                            />
                        </button>
                        <div
                            v-show="openFaqIndex === index"
                            class="px-5 pb-4 text-sm text-gray-600 leading-relaxed"
                        >
                            {{ item.answer }}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Final CTA -->
        <section class="py-20 px-4 sm:px-6 lg:px-8">
            <div class="max-w-2xl mx-auto text-center">
                <h2 class="text-3xl font-bold text-gray-900 mb-4">
                    {{ t('homepage.finalCta.title') }}
                </h2>
                <p class="text-gray-500 mb-8">
                    {{ t('homepage.finalCta.subtitle') }}
                </p>
                <NuxtLink to="/resumes">
                    <Button
                        size="lg"
                        class="text-base px-8 py-3"
                    >
                        {{ t('common.buildNow') }}
                    </Button>
                </NuxtLink>
            </div>
        </section>
    </main>
</template>
