<template>
    <main class="min-h-screen flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
        <div class="w-full max-w-2xl mx-auto">
            <h1 class="text-4xl font-bold text-black mb-8 text-center">
                {{ $t('contact.title') }}
            </h1>

            <Card class="p-6 sm:p-8">
                <CardContent class="pt-0">
                    <p class="text-gray-700 mb-8 text-center">
                        {{ $t('contact.description') }}
                    </p>

                    <form
                        v-if="!formSubmitted"
                        @submit.prevent="handleSubmit"
                    >
                        <!-- Name Field -->
                        <div class="mb-4">
                            <Label for="name">
                                {{ $t('common.name') }}
                                <span class="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                v-model="formData.name"
                                type="text"
                                :placeholder="$t('contact.form.name.placeholder')"
                                :disabled="loading"
                                required
                                class="mt-1"
                            />
                        </div>

                        <!-- Email Field -->
                        <div class="mb-4">
                            <Label for="email">
                                {{ $t('common.email') }}
                                <span class="text-red-500">*</span>
                            </Label>
                            <Input
                                id="email"
                                v-model="formData.email"
                                type="email"
                                :placeholder="$t('contact.form.email.placeholder')"
                                :disabled="loading"
                                required
                                class="mt-1"
                            />
                        </div>

                        <!-- Subject Field -->
                        <div class="mb-4">
                            <Label for="subject">
                                {{ $t('contact.form.subject.label') }}
                                <span class="text-red-500">*</span>
                            </Label>
                            <Input
                                id="subject"
                                v-model="formData.subject"
                                type="text"
                                :placeholder="$t('contact.form.subject.placeholder')"
                                :disabled="loading"
                                required
                                class="mt-1"
                            />
                        </div>

                        <!-- Message Field -->
                        <div class="mb-6">
                            <Label for="message">
                                {{ $t('contact.form.message.label') }}
                                <span class="text-red-500">*</span>
                            </Label>
                            <Textarea
                                id="message"
                                v-model="formData.message"
                                :placeholder="$t('contact.form.message.placeholder')"
                                :disabled="loading"
                                rows="6"
                                required
                                class="mt-1"
                            />
                        </div>

                        <!-- Turnstile Widget -->
                        <div class="mb-6">
                            <TurnstileWidget
                                ref="turnstileWidgetRef"
                                v-model="turnstileToken"
                            />
                        </div>

                        <!-- Submit Button -->
                        <Button
                            type="submit"
                            class="w-full"
                            :disabled="loading || !isFormValid || !turnstileToken"
                        >
                            <span v-if="loading">{{ $t('contact.form.sending') }}</span>
                            <span v-else>{{ $t('contact.form.submit') }}</span>
                        </Button>

                        <!-- Error Message -->
                        <p
                            v-if="errorMessage"
                            class="mt-4 text-sm text-red-600 text-center"
                        >
                            {{ errorMessage }}
                        </p>
                    </form>

                    <!-- Success Message -->
                    <div
                        v-else
                        class="text-center py-8"
                    >
                        <div class="mb-4 text-green-600">
                            <svg
                                class="w-16 h-16 mx-auto"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-2">
                            {{ $t('contact.success.title') }}
                        </h3>
                        <p class="text-gray-700 mb-6">
                            {{ $t('contact.success.message') }}
                        </p>
                        <Button
                            @click="navigateTo('/resumes')"
                        >
                            {{ $t('contact.success.keepBuilding') }}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <!-- Alternative Contact Info -->
            <div class="mt-8 text-center text-sm text-gray-600">
                <p>
                    {{ $t('contact.alternative.text') }}
                    <a
                        class="text-blue-600 hover:text-blue-800 font-medium underline"
                        href="mailto:contact@resumeforfree.com"
                    >
                        contact@resumeforfree.com
                    </a>
                </p>
            </div>
        </div>
    </main>
</template>

<script lang="ts" setup>
import { toast } from 'vue-sonner';
import { Card, CardContent } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { Label } from '~/components/ui/label';
import { Button } from '~/components/ui/button';
import TurnstileWidget from '~/components/elements/TurnstileWidget.vue';

const { t } = useI18n();

const formData = ref({
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

const isFormValid = computed(() => {
    return formData.value.name.trim() !== ''
        && formData.value.email.trim() !== ''
        && formData.value.subject.trim() !== ''
        && formData.value.message.trim() !== '';
});

const handleSubmit = async () => {
    if (!isFormValid.value || !turnstileToken.value) {
        return;
    }

    loading.value = true;
    errorMessage.value = '';

    try {
        await $fetch('/api/contact/submit', {
            method: 'POST',
            body: {
                name: formData.value.name,
                email: formData.value.email,
                subject: formData.value.subject,
                message: formData.value.message,
                turnstileToken: turnstileToken.value,
            },
        });

        formSubmitted.value = true;
        toast.success(t('contact.success.toast'));
    }
    catch (error: unknown) {
        console.error('Contact form submission error:', error);
        const err = error as { statusCode?: number };

        // Handle specific error messages
        if (err.statusCode === 429) {
            errorMessage.value = t('contact.errors.rateLimit');
        }
        else if (err.statusCode === 400) {
            errorMessage.value = t('contact.errors.validation');
        }
        else {
            errorMessage.value = t('contact.errors.generic');
        }

        toast.error(errorMessage.value);

        // Reset Turnstile widget
        turnstileWidgetRef.value?.reset();
        turnstileToken.value = null;
    }
    finally {
        loading.value = false;
    }
};

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
