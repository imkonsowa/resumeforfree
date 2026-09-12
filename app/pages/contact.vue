<template>
    <UContainer class="py-16">
        <div class="w-full max-w-2xl mx-auto">
            <h1 class="text-4xl font-bold text-highlighted mb-8 text-center">
                {{ $t('contact.title') }}
            </h1>

            <UCard>
                <p class="text-default mb-8 text-center">
                    {{ $t('contact.description') }}
                </p>

                <UForm
                    v-if="!formSubmitted"
                    :schema="schema"
                    :state="formData"
                    class="space-y-4"
                    @submit="onSubmit"
                >
                    <UFormField
                        name="name"
                        :label="$t('common.name')"
                        required
                    >
                        <UInput
                            v-model="formData.name"
                            :placeholder="$t('contact.form.name.placeholder')"
                            :disabled="loading"
                            class="w-full"
                        />
                    </UFormField>

                    <UFormField
                        name="email"
                        :label="$t('common.email')"
                        required
                    >
                        <UInput
                            v-model="formData.email"
                            type="email"
                            :placeholder="$t('contact.form.email.placeholder')"
                            :disabled="loading"
                            class="w-full"
                        />
                    </UFormField>

                    <UFormField
                        name="subject"
                        :label="$t('contact.form.subject.label')"
                        required
                    >
                        <UInput
                            v-model="formData.subject"
                            :placeholder="$t('contact.form.subject.placeholder')"
                            :disabled="loading"
                            class="w-full"
                        />
                    </UFormField>

                    <UFormField
                        name="message"
                        :label="$t('contact.form.message.label')"
                        required
                    >
                        <UTextarea
                            v-model="formData.message"
                            :placeholder="$t('contact.form.message.placeholder')"
                            :disabled="loading"
                            :rows="6"
                            class="w-full"
                        />
                    </UFormField>

                    <TurnstileWidget
                        ref="turnstileWidgetRef"
                        v-model="turnstileToken"
                    />

                    <UAlert
                        v-if="errorMessage"
                        color="error"
                        variant="soft"
                        icon="i-lucide-circle-x"
                        :description="errorMessage"
                    />

                    <UButton
                        type="submit"
                        block
                        size="lg"
                        :loading="loading"
                        :disabled="!turnstileToken"
                        :label="loading ? $t('contact.form.sending') : $t('contact.form.submit')"
                    />
                </UForm>

                <div
                    v-else
                    class="text-center py-8"
                >
                    <UIcon
                        name="i-lucide-circle-check"
                        class="size-16 text-secondary mx-auto mb-4"
                    />
                    <h2 class="text-xl font-semibold text-highlighted mb-2">
                        {{ $t('contact.success.title') }}
                    </h2>
                    <p class="text-default mb-6">
                        {{ $t('contact.success.message') }}
                    </p>
                    <UButton
                        :label="$t('contact.success.keepBuilding')"
                        @click="navigateTo(localePath('/resumes'))"
                    />
                </div>
            </UCard>

            <p class="mt-8 text-center text-sm text-toned">
                {{ $t('contact.alternative.text') }}
                <ULink
                    to="mailto:contact@resumeforfree.com"
                    class="text-secondary font-medium underline"
                >
                    contact@resumeforfree.com
                </ULink>
            </p>
        </div>
    </UContainer>
</template>

<script lang="ts" setup>
import * as z from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';
import TurnstileWidget from '~/components/elements/TurnstileWidget.vue';

const { t } = useI18n();
const notify = useNotify();
const localePath = useLocalePath();

const schema = z.object({
    name: z.string().min(1, t('validation.nameRequired', 'Name is required')),
    email: z.email(t('validation.invalidEmail', 'Enter a valid email address')),
    subject: z.string().min(1, t('contact.form.subject.label')),
    message: z.string().min(1, t('contact.form.message.label')),
});

type Schema = z.output<typeof schema>;

const formData = reactive<Partial<Schema>>({
    name: '',
    email: '',
    subject: '',
    message: '',
});

const turnstileToken = ref<string | null>(null);
const turnstileWidgetRef = ref();
const loading = ref(false);
const formSubmitted = ref(false);
const errorMessage = ref('');

async function onSubmit(event: FormSubmitEvent<Schema>) {
    if (!turnstileToken.value) return;

    loading.value = true;
    errorMessage.value = '';

    try {
        await $fetch('/api/contact/submit', {
            method: 'POST',
            body: { ...event.data, turnstileToken: turnstileToken.value },
        });

        formSubmitted.value = true;
        notify.success(t('contact.success.toast'));
    }
    catch (error: unknown) {
        console.error('Contact form submission error:', error);
        const err = error as { statusCode?: number };

        if (err.statusCode === 429) {
            errorMessage.value = t('contact.errors.rateLimit');
        }
        else if (err.statusCode === 400) {
            errorMessage.value = t('contact.errors.validation');
        }
        else {
            errorMessage.value = t('contact.errors.generic');
        }

        notify.error(errorMessage.value);

        turnstileWidgetRef.value?.reset();
        turnstileToken.value = null;
    }
    finally {
        loading.value = false;
    }
}

useHead({
    title: t('contact.seo.title'),
    meta: [
        {
            name: 'description',
            content: t('contact.seo.description'),
        },
        {
            name: 'keywords',
            content: 'resume builder support, contact resume help, customer service, resume builder assistance, help with resume',
        },
        {
            name: 'robots',
            content: 'index, follow',
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
            content: t('contact.seo.title'),
        },
        {
            property: 'og:description',
            content: t('contact.seo.description'),
        },
        {
            property: 'og:url',
            content: 'https://resumeforfree.com/contact',
        },
        {
            property: 'og:image',
            content: 'https://resumeforfree.com/og-image.png',
        },
        {
            name: 'twitter:card',
            content: 'summary_large_image',
        },
        {
            name: 'twitter:title',
            content: t('contact.seo.title'),
        },
        {
            name: 'twitter:description',
            content: t('contact.seo.description'),
        },
        {
            name: 'twitter:image',
            content: 'https://resumeforfree.com/og-image.png',
        },
    ],
    link: [
        {
            rel: 'canonical',
            href: 'https://resumeforfree.com/contact',
        },
    ],
});
</script>
