<script lang="ts" setup>
import * as uiLocales from '@nuxt/ui/locale';

const { locale } = useI18n();

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
