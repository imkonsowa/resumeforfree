<script lang="ts" setup>
import { absolutePageUrl, createBreadcrumbStructuredData, getOgLocale } from '~/composables/useSEO';

const { t, locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

const { data: guides } = await useFetch(() => `/api/guides/${locale.value}`, {
    key: () => `guides-${locale.value}`,
    default: () => [],
});

const pageTitle = computed(() => `${t('guides.meta.title')} | Resume For Free`);
const pageUrl = computed(() => absolutePageUrl(route.path));
const ogImage = 'https://resumeforfree.com/og-image.png';

useSeoMeta({
    title: pageTitle,
    description: () => t('guides.meta.description'),
    ogType: 'website',
    ogLocale: () => getOgLocale(locale.value),
    ogSiteName: 'Resume For Free',
    ogTitle: pageTitle,
    ogDescription: () => t('guides.meta.description'),
    ogUrl: pageUrl,
    ogImage,
    twitterCard: 'summary_large_image',
    twitterTitle: pageTitle,
    twitterDescription: () => t('guides.meta.description'),
    twitterImage: ogImage,
});

useHead({
    script: [
        {
            type: 'application/ld+json',
            innerHTML: () => JSON.stringify(createBreadcrumbStructuredData([
                { name: t('navigation.home'), url: absolutePageUrl(localePath('/')) },
                { name: t('navigation.guides'), url: pageUrl.value },
            ])),
        },
        {
            type: 'application/ld+json',
            innerHTML: () => JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                'itemListElement': guides.value.map((guide, index) => ({
                    '@type': 'ListItem',
                    'position': index + 1,
                    'name': guide.title,
                    'url': absolutePageUrl(localePath(`/guides/${guide.slug}`)),
                })),
            }),
        },
    ],
});
</script>

<template>
    <UContainer class="py-12 sm:py-16">
        <UBreadcrumb
            :items="[
                { label: t('navigation.home'), to: localePath('/') },
                { label: t('navigation.guides') },
            ]"
        />
        <div class="mt-6 max-w-2xl space-y-4">
            <h1 class="text-3xl sm:text-4xl font-bold text-highlighted text-balance">
                {{ t('guides.index.title') }}
            </h1>
            <p class="text-lg text-muted">
                {{ t('guides.index.subtitle') }}
            </p>
        </div>

        <UPageGrid class="mt-10">
            <UPageCard
                v-for="guide in guides"
                :key="guide.slug"
                :title="guide.title"
                :description="guide.description"
                :to="localePath(`/guides/${guide.slug}`)"
                icon="i-lucide-book-open"
                variant="subtle"
            />
        </UPageGrid>
    </UContainer>
</template>
