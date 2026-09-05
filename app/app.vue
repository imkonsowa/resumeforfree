<template>
    <div ref="rootEl">
        <NuxtRouteAnnouncer />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </div>
</template>

<script lang="ts" setup>
const { locale, locales } = useI18n();
const rootEl = ref<HTMLElement | null>(null);

const localeHead = useLocaleHead({ dir: true, lang: true, seo: true });
useHead(() => ({
    htmlAttrs: localeHead.value.htmlAttrs ?? {},
    link: localeHead.value.link ?? [],
    meta: localeHead.value.meta ?? [],
}));

onMounted(() => {
    updateDirection();
});

watch(locale, () => {
    updateDirection();
});

function updateDirection() {
    if (import.meta.client) {
        const localeConfig = locales.value.find(l => l.code === locale.value);
        const dir = localeConfig?.dir || 'ltr';
        const isRtl = dir === 'rtl';

        document.documentElement.dir = dir;
        document.documentElement.lang = locale.value;

        if (rootEl.value) {
            rootEl.value.dir = dir;
            if (isRtl) {
                rootEl.value.classList.add('rtl-mode');
            }
            else {
                rootEl.value.classList.remove('rtl-mode');
            }
        }
    }
}
</script>
