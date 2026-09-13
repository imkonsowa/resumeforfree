<script lang="ts" setup>
import * as uiLocales from '@nuxt/ui/locale';

const { locale } = useI18n();

const UI_LOCALE_MAP: Record<string, keyof typeof uiLocales> = {
    zh: 'zh_cn',
};

const uiLocale = computed(() => {
    const key = UI_LOCALE_MAP[locale.value] ?? (locale.value as keyof typeof uiLocales);
    return uiLocales[key] ?? uiLocales.en;
});

const localeHead = useLocaleHead({ dir: true, lang: true, seo: true });

useHead(() => ({
    htmlAttrs: {
        ...localeHead.value.htmlAttrs,
        lang: localeHead.value.htmlAttrs?.lang || uiLocale.value.code,
        dir: localeHead.value.htmlAttrs?.dir || uiLocale.value.dir,
    },
    link: localeHead.value.link ?? [],
    meta: localeHead.value.meta ?? [],
}));
</script>

<template>
    <UApp :locale="uiLocale">
        <NuxtRouteAnnouncer />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </UApp>
</template>
