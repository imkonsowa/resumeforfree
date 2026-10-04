<script lang="ts" setup>
import CreateResumeModal from '~/components/elements/CreateResumeModal.vue';
import { absolutePageUrl, createBreadcrumbStructuredData, createFAQStructuredData, getOgLocale } from '~/composables/useSEO';

const { t, locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const slug = computed(() => String(route.params.slug));

const { data: template } = await useFetch(() => `/api/templates/${locale.value}/${slug.value}`, {
    key: () => `template-${locale.value}-${slug.value}`,
});
if (!template.value) {
    throw createError({ statusCode: 404, statusMessage: 'Template not found', fatal: true });
}

const selectedLayout = ref<TemplateLayout>(template.value.layout);
watch(() => template.value?.layout, (layout) => {
    if (layout) selectedLayout.value = layout;
});

const layoutLabel = (layout: TemplateLayout) => t(`templates.layouts.${layout}`);
const previewSrc = computed(() => templatePreviewPath(locale.value, slug.value, `${selectedLayout.value}.webp`));
const samplePdf = computed(() => templatePreviewPath(locale.value, slug.value, 'sample.pdf'));
const updatedOn = computed(() => template.value
    ? new Intl.DateTimeFormat(locale.value, { dateStyle: 'long' }).format(new Date(template.value.updatedAt))
    : '');
const tocLinks = computed(() => template.value?.toc?.links ?? []);

const showCreateModal = ref(false);
const { createResume } = useCreateResume();
const handleCreateResume = async (name: string, language: string, _navigateToBuilder: boolean, saveToCloud: boolean) => {
    if (!template.value) return;
    showCreateModal.value = false;
    await createResume(name, language, saveToCloud, {
        data: template.value.sample,
        settings: { ...template.value.settings, selectedTemplate: selectedLayout.value },
    });
    await navigateTo(localePath('/builder'));
};

const page = computed(() => template.value!);
const pageTitle = computed(() => `${page.value.title} | Resume For Free`);
const pageUrl = computed(() => absolutePageUrl(route.path));
const ogImage = computed(() => absolutePageUrl(templatePreviewPath(locale.value, page.value.slug, 'og.png')));

useSeoMeta({
    title: pageTitle,
    description: () => page.value.description,
    ogType: 'article',
    ogLocale: () => getOgLocale(locale.value),
    ogSiteName: 'Resume For Free',
    ogTitle: pageTitle,
    ogDescription: () => page.value.description,
    ogUrl: pageUrl,
    ogImage,
    ogImageWidth: 1200,
    ogImageHeight: 630,
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
                { name: t('navigation.templates'), url: absolutePageUrl(localePath('/templates')) },
                { name: page.value.profession, url: pageUrl.value },
            ])),
        },
        {
            type: 'application/ld+json',
            innerHTML: () => JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'Article',
                'headline': page.value.title,
                'description': page.value.description,
                'image': ogImage.value,
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
        v-if="template"
        class="py-10 sm:py-14"
    >
        <UBreadcrumb
            :items="[
                { label: t('navigation.home'), to: localePath('/') },
                { label: t('navigation.templates'), to: localePath('/templates') },
                { label: template.profession },
            ]"
        />

        <div class="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
            <article class="min-w-0">
                <header class="space-y-4">
                    <h1 class="text-3xl sm:text-4xl font-bold text-highlighted text-balance">
                        {{ template.title }}
                    </h1>
                    <p class="text-lg text-muted">
                        {{ template.description }}
                    </p>
                    <p class="text-sm text-dimmed">
                        {{ t(`templates.categories.${template.category}`) }} · {{ t('templates.detail.updated', { date: updatedOn }) }}
                    </p>
                </header>

                <MDCRenderer
                    :body="template.body"
                    class="mt-8 max-w-3xl"
                />

                <section class="mt-12 max-w-3xl">
                    <h2 class="text-2xl font-bold text-highlighted">
                        {{ t('templates.detail.faq') }}
                    </h2>
                    <UAccordion
                        class="mt-4"
                        type="multiple"
                        :items="template.faq.map(item => ({ label: item.q, content: item.a }))"
                    />
                </section>

                <section
                    v-if="template.related.length"
                    class="mt-12"
                >
                    <h2 class="text-2xl font-bold text-highlighted">
                        {{ t('templates.detail.related') }}
                    </h2>
                    <ul class="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
                        <li
                            v-for="related in template.related"
                            :key="related.slug"
                        >
                            <NuxtLink
                                :to="localePath(`/templates/${related.slug}`)"
                                class="group flex flex-col gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-primary"
                            >
                                <img
                                    :src="templatePreviewPath(locale, related.slug, 'thumb.webp')"
                                    :alt="t('templates.detail.previewAlt', { profession: related.profession, layout: layoutLabel(related.layout) })"
                                    width="420"
                                    height="594"
                                    loading="lazy"
                                    class="w-full aspect-[1/1.414] rounded-md border border-default bg-white object-cover object-top"
                                >
                                <span class="text-sm font-medium text-highlighted group-hover:text-primary">{{ related.profession }}</span>
                            </NuxtLink>
                        </li>
                    </ul>
                </section>
            </article>

            <aside class="flex flex-col gap-4 lg:sticky lg:top-20">
                <img
                    :src="previewSrc"
                    :alt="t('templates.detail.previewAlt', { profession: template.profession, layout: layoutLabel(selectedLayout) })"
                    width="827"
                    height="1169"
                    fetchpriority="high"
                    class="w-full aspect-[1/1.414] rounded-md border border-default bg-white shadow-sm"
                >
                <div class="space-y-2">
                    <p class="text-sm font-medium text-muted">
                        {{ t('templates.detail.layout') }}
                    </p>
                    <div class="flex flex-wrap gap-2">
                        <UButton
                            v-for="layout in TEMPLATE_LAYOUTS"
                            :key="layout"
                            :label="layoutLabel(layout)"
                            :variant="selectedLayout === layout ? 'solid' : 'outline'"
                            color="neutral"
                            size="xs"
                            :aria-pressed="selectedLayout === layout"
                            @click="selectedLayout = layout"
                        />
                    </div>
                </div>
                <UButton
                    :label="t('templates.detail.useTemplate')"
                    icon="i-lucide-file-pen"
                    size="lg"
                    block
                    @click="showCreateModal = true"
                />
                <UButton
                    :label="t('templates.detail.downloadSample')"
                    :to="samplePdf"
                    icon="i-lucide-download"
                    color="neutral"
                    variant="outline"
                    target="_blank"
                    external
                    block
                />
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

        <ClientOnly>
            <CreateResumeModal
                :is-open="showCreateModal"
                :show-navigate-option="false"
                :default-name="t('templates.detail.resumeName', { profession: template.profession })"
                @close="showCreateModal = false"
                @confirm="handleCreateResume"
            />
        </ClientOnly>
    </UContainer>
</template>
