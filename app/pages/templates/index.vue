<script lang="ts" setup>
import { absolutePageUrl, createBreadcrumbStructuredData, getOgLocale } from '~/composables/useSEO';

const { t, locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();

const { data: templates } = await useFetch(() => `/api/templates/${locale.value}`, {
    key: () => `templates-${locale.value}`,
    default: () => [],
});

const selectedCategory = ref<TemplateCategory | null>(null);
const search = ref('');

const categories = computed(() =>
    TEMPLATE_CATEGORIES.filter(category => templates.value.some(template => template.category === category)),
);

const visibleTemplates = computed(() => {
    const query = search.value.trim().toLocaleLowerCase(locale.value);
    return templates.value.filter(template =>
        (!selectedCategory.value || template.category === selectedCategory.value)
        && (!query || template.profession.toLocaleLowerCase(locale.value).includes(query)),
    );
});

const pageTitle = computed(() => `${t('templates.meta.title')} | Resume For Free`);
const pageUrl = computed(() => absolutePageUrl(route.path));
const ogImage = 'https://resumeforfree.com/og-image.png';

useSeoMeta({
    title: pageTitle,
    description: () => t('templates.meta.description'),
    ogType: 'website',
    ogLocale: () => getOgLocale(locale.value),
    ogSiteName: 'Resume For Free',
    ogTitle: pageTitle,
    ogDescription: () => t('templates.meta.description'),
    ogUrl: pageUrl,
    ogImage,
    twitterCard: 'summary_large_image',
    twitterTitle: pageTitle,
    twitterDescription: () => t('templates.meta.description'),
    twitterImage: ogImage,
});

useHead({
    script: [
        {
            type: 'application/ld+json',
            innerHTML: () => JSON.stringify(createBreadcrumbStructuredData([
                { name: t('navigation.home'), url: absolutePageUrl(localePath('/')) },
                { name: t('navigation.templates'), url: pageUrl.value },
            ])),
        },
        {
            type: 'application/ld+json',
            innerHTML: () => JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                'itemListElement': templates.value.map((template, index) => ({
                    '@type': 'ListItem',
                    'position': index + 1,
                    'name': template.title,
                    'url': absolutePageUrl(localePath(`/templates/${template.slug}`)),
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
                { label: t('navigation.templates') },
            ]"
        />
        <div class="mt-6 max-w-2xl space-y-4">
            <h1 class="text-3xl sm:text-4xl font-bold text-highlighted text-balance">
                {{ t('templates.gallery.title') }}
            </h1>
            <p class="text-lg text-muted">
                {{ t('templates.gallery.subtitle') }}
            </p>
        </div>

        <div class="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex flex-wrap gap-2">
                <UButton
                    :label="t('templates.gallery.all')"
                    :variant="selectedCategory === null ? 'solid' : 'outline'"
                    color="neutral"
                    size="sm"
                    @click="selectedCategory = null"
                />
                <UButton
                    v-for="category in categories"
                    :key="category"
                    :label="t(`templates.categories.${category}`)"
                    :variant="selectedCategory === category ? 'solid' : 'outline'"
                    color="neutral"
                    size="sm"
                    @click="selectedCategory = category"
                />
            </div>
            <UInput
                v-model="search"
                icon="i-lucide-search"
                :placeholder="t('templates.gallery.search')"
                class="w-full sm:w-72"
            />
        </div>

        <ul
            v-if="visibleTemplates.length"
            class="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4"
        >
            <li
                v-for="template in visibleTemplates"
                :key="template.slug"
            >
                <NuxtLink
                    :to="localePath(`/templates/${template.slug}`)"
                    class="group flex flex-col gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-primary"
                >
                    <img
                        :src="templatePreviewPath(locale, template.slug, 'thumb.webp')"
                        :alt="t('templates.detail.previewAlt', { profession: template.profession, layout: t(`templates.layouts.${template.layout}`) })"
                        width="420"
                        height="594"
                        loading="lazy"
                        class="w-full aspect-[1/1.414] rounded-md border border-default bg-white object-cover object-top shadow-sm transition-shadow group-hover:shadow-md"
                    >
                    <span>
                        <span class="block font-semibold text-highlighted group-hover:text-primary">{{ template.profession }}</span>
                        <span class="block text-sm text-muted">
                            {{ t(`templates.categories.${template.category}`) }} · {{ t(`templates.layouts.${template.layout}`) }}
                        </span>
                    </span>
                </NuxtLink>
            </li>
        </ul>
        <p
            v-else
            class="mt-12 text-center text-muted"
        >
            {{ t('templates.gallery.empty') }}
        </p>
    </UContainer>
</template>
