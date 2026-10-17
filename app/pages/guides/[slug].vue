<script lang="ts" setup>
import { absolutePageUrl, createBreadcrumbStructuredData, createFAQStructuredData, getOgLocale } from '~/composables/useSEO';

const { t, locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const slug = computed(() => String(route.params.slug));

const { data: guide } = await useFetch(() => `/api/guides/${locale.value}/${slug.value}`, {
    key: () => `guide-${locale.value}-${slug.value}`,
});
if (!guide.value) {
    throw createError({ statusCode: 404, statusMessage: 'Guide not found', fatal: true });
}

const page = computed(() => guide.value!);
const updatedOn = computed(() => new Intl.DateTimeFormat(locale.value, { dateStyle: 'long' }).format(new Date(page.value.updatedAt)));
const tocLinks = computed(() => page.value.toc?.links ?? []);
const pageTitle = computed(() => `${page.value.title} | Resume For Free`);
const pageUrl = computed(() => absolutePageUrl(route.path));
const ogImage = 'https://resumeforfree.com/og-image.png';

useSeoMeta({
    title: pageTitle,
    description: () => page.value.description,
    keywords: () => page.value.keywords.join(', '),
    ogType: 'article',
    ogLocale: () => getOgLocale(locale.value),
    ogSiteName: 'Resume For Free',
    ogTitle: pageTitle,
    ogDescription: () => page.value.description,
    ogUrl: pageUrl,
    ogImage,
    articleModifiedTime: () => page.value.updatedAt,
    twitterCard: 'summary_large_image',
    twitterTitle: pageTitle,
    twitterDescription: () => page.value.description,
    twitterImage: ogImage,
});

useHead({
    script: [
        {
            type: 'application/ld+json',
            innerHTML: () => JSON.stringify(createBreadcrumbStructuredData([
                { name: t('navigation.home'), url: absolutePageUrl(localePath('/')) },
                { name: t('navigation.guides'), url: absolutePageUrl(localePath('/guides')) },
                { name: page.value.title, url: pageUrl.value },
            ])),
        },
        {
            type: 'application/ld+json',
            innerHTML: () => JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Article',
                'headline': page.value.title,
                'description': page.value.description,
                'image': ogImage,
                'inLanguage': locale.value,
                'dateModified': page.value.updatedAt,
                'mainEntityOfPage': pageUrl.value,
                'publisher': { '@id': 'https://resumeforfree.com/#organization' },
            }),
        },
        {
            type: 'application/ld+json',
            innerHTML: () => JSON.stringify(createFAQStructuredData(page.value.faq.map(item => ({ question: item.q, answer: item.a })))),
        },
    ],
});
</script>

<template>
    <UContainer
        v-if="guide"
        class="py-10 sm:py-14"
    >
        <UBreadcrumb
            :items="[
                { label: t('navigation.home'), to: localePath('/') },
                { label: t('navigation.guides'), to: localePath('/guides') },
                { label: guide.title },
            ]"
        />

        <div class="mt-6 grid gap-x-10 gap-y-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
            <article class="min-w-0">
                <header class="space-y-4">
                    <h1 class="text-3xl sm:text-4xl font-bold text-highlighted text-balance">
                        {{ guide.title }}
                    </h1>
                    <p class="text-lg text-muted">
                        {{ guide.description }}
                    </p>
                    <p class="text-sm text-dimmed">
                        {{ t('templates.detail.updated', { date: updatedOn }) }}
                    </p>
                </header>

                <MDCRenderer
                    :body="guide.body"
                    class="mt-8 max-w-3xl"
                />

                <section class="mt-12 max-w-3xl">
                    <h2 class="text-2xl font-bold text-highlighted">
                        {{ t('templates.detail.faq') }}
                    </h2>
                    <UAccordion
                        class="mt-4"
                        type="multiple"
                        :unmount-on-hide="false"
                        :items="guide.faq.map(item => ({ label: item.q, content: item.a }))"
                    />
                </section>

                <section
                    v-if="guide.templates.length"
                    class="mt-12"
                >
                    <h2 class="text-2xl font-bold text-highlighted">
                        {{ t('guides.detail.templates') }}
                    </h2>
                    <ul class="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
                        <li
                            v-for="template in guide.templates"
                            :key="template.slug"
                        >
                            <NuxtLink
                                :to="localePath(`/templates/${template.slug}`)"
                                class="group flex flex-col gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-primary"
                            >
                                <img
                                    :src="templatePreviewPath(locale, template.slug, 'thumb.webp')"
                                    :alt="t('templates.detail.previewAlt', { profession: template.profession, layout: t(`templates.layouts.${template.layout}`) })"
                                    width="420"
                                    height="594"
                                    loading="lazy"
                                    class="w-full aspect-[1/1.414] rounded-md border border-default bg-white object-cover object-top"
                                >
                                <span class="text-sm font-medium text-highlighted group-hover:text-primary">{{ template.profession }}</span>
                            </NuxtLink>
                        </li>
                    </ul>
                </section>

                <section
                    v-if="guide.related.length"
                    class="mt-12"
                >
                    <h2 class="text-2xl font-bold text-highlighted">
                        {{ t('guides.detail.related') }}
                    </h2>
                    <UPageGrid class="mt-6">
                        <UPageCard
                            v-for="related in guide.related"
                            :key="related.slug"
                            :title="related.title"
                            :description="related.description"
                            :to="localePath(`/guides/${related.slug}`)"
                            icon="i-lucide-book-open"
                            variant="subtle"
                        />
                    </UPageGrid>
                </section>
            </article>

            <aside class="flex flex-col gap-4 lg:sticky lg:top-20">
                <UPageCard
                    :title="t('guides.detail.ctaTitle')"
                    :description="t('guides.detail.ctaText')"
                    variant="subtle"
                >
                    <UButton
                        :to="localePath('/builder')"
                        :label="t('homepage.hero.ctaBuild')"
                        trailing-icon="i-lucide-arrow-right"
                        color="secondary"
                        block
                    />
                </UPageCard>
                <nav
                    v-if="tocLinks.length"
                    class="hidden lg:block border-t border-default pt-4"
                    :aria-label="t('templates.detail.onThisPage')"
                >
                    <p class="text-sm font-medium text-muted">
                        {{ t('templates.detail.onThisPage') }}
                    </p>
                    <ul class="mt-2 space-y-1 text-sm">
                        <li
                            v-for="link in tocLinks"
                            :key="link.id"
                        >
                            <a
                                :href="`#${link.id}`"
                                class="text-toned hover:text-primary"
                            >{{ link.text }}</a>
                        </li>
                    </ul>
                </nav>
            </aside>
        </div>
    </UContainer>
</template>
