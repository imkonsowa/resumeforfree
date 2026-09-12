<script lang="ts" setup>
import * as uiLocales from '@nuxt/ui/locale';

const { locale } = useI18n();

/*
 * UApp propagates `dir` to every Nuxt UI component, so the manual
 * document.documentElement.dir bookkeeping this file used to do is gone.
 * useHead still sets lang/dir on <html> for the CSS logical properties and
 * for assistive tech.
 */
const uiLocale = computed(() => uiLocales[locale.value as keyof typeof uiLocales] ?? uiLocales.en);

const localeHead = useLocaleHead({ dir: true, lang: true, seo: true });

useHead(() => ({
    htmlAttrs: {
        ...localeHead.value.htmlAttrs,
        lang: uiLocale.value.code,
        dir: uiLocale.value.dir,
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
