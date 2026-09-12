<template>
    <FormContainer
        :editable="false"
        :is-empty="false"
        :show-add-button="false"
        add-button-label=""
        empty-message=""
        :title="t('forms.personalInfo.title')"
        section-key="personal"
    >
        <PhotoUploader class="mb-6" />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
                <label for="firstName">{{ t('forms.personalInfo.firstName') }}</label>
                <UInput
                    id="firstName"
                    :model-value="resumeStore.resumeData.firstName"
                    :placeholder="t('forms.personalInfo.firstName')"
                    @update:model-value="(value) => resumeStore.updateField('firstName', value)"
                />
            </div>
            <div class="space-y-2">
                <label for="lastName">{{ t('forms.personalInfo.lastName') }}</label>
                <UInput
                    id="lastName"
                    :model-value="resumeStore.resumeData.lastName"
                    :placeholder="t('forms.personalInfo.lastName')"
                    @update:model-value="(value) => resumeStore.updateField('lastName', value)"
                />
            </div>
            <div class="space-y-2">
                <label for="position">{{ t('forms.personalInfo.position') }}</label>
                <UInput
                    id="position"
                    :model-value="resumeStore.resumeData.position"
                    :placeholder="t('forms.personalInfo.position')"
                    @update:model-value="(value) => resumeStore.updateField('position', value)"
                />
            </div>
            <div class="space-y-2">
                <label for="location">{{ t('common.location') }}</label>
                <UInput
                    id="location"
                    :model-value="resumeStore.resumeData.location"
                    :placeholder="t('common.locationPlaceholder')"
                    @update:model-value="(value) => resumeStore.updateField('location', value)"
                />
            </div>
        </div>
        <div class="mt-6 space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="space-y-2">
                    <label for="email">{{ t('common.emailAddress') }}</label>
                    <UInput
                        id="email"
                        :model-value="resumeStore.resumeData.email"
                        :placeholder="t('common.emailAddress')"
                        type="email"
                        @update:model-value="(value) => resumeStore.updateField('email', value)"
                    />
                </div>
                <div class="space-y-2">
                    <label for="phone">{{ t('forms.personalInfo.phone') }}</label>
                    <UInput
                        id="phone"
                        :model-value="resumeStore.resumeData.phone"
                        :placeholder="t('forms.personalInfo.phone')"
                        type="tel"
                        @update:model-value="(value) => resumeStore.updateField('phone', value)"
                    />
                </div>
            </div>
        </div>
        <div class="mt-6 space-y-4">
            <EditableHeader
                :value="profileHeader"
                section-key="profile"
                @update="(value) => setSectionHeader('profile', value)"
            />
            <div class="space-y-2">
                <UTextarea
                    id="summary"
                    :model-value="resumeStore.resumeData.summary"
                    :placeholder="t('forms.personalInfo.summary')"
                    rows="4"
                    @update:model-value="(value) => resumeStore.updateField('summary', value)"
                />
            </div>
        </div>
        <div class="mt-6 space-y-4">
            <div class="flex justify-between items-center">
                <EditableHeader
                    :value="socialLinksHeader"
                    section-key="socialLinks"
                    @update="(value) => setSectionHeader('socialLinks', value)"
                />
                <UButton
                    size="sm" color="neutral" variant="outline"
                    @click="resumeStore.addSocialLink" icon="i-lucide-plus">
{{ t('forms.personalInfo.addSocialLink') }}
</UButton>
            </div>
            <div class="space-y-3">
                <div
                    v-for="(link, linkIndex) in resumeStore.resumeData.socialLinks"
                    :key="linkIndex"
                    class="space-y-2"
                >
                    <div class="flex items-center space-x-2 md:space-x-2">
                        <div class="flex-none">
                            <component
                                :is="getPlatformIcon(link.platform)"
                                class="w-5 h-5 text-toned"
                            />
                        </div>
                        <div class="w-32 md:w-40">
                            <select
                                :value="link.platform"
                                class="w-full px-3 py-2 border rounded-md border-accented focus:border-secondary focus:ring-secondary/20 focus:ring-[3px] text-sm"
                                @change="(e) => resumeStore.updateSocialLink(linkIndex, 'platform', (e.target as HTMLSelectElement).value)"
                            >
                                <option
                                    v-for="platform in SOCIAL_PLATFORMS"
                                    :key="platform.value"
                                    :value="platform.value"
                                >
                                    {{ platform.label }}
                                </option>
                            </select>
                        </div>
                        <div class="flex-1">
                            <UInput
                                :model-value="link.url"
                                :placeholder="t('forms.personalInfo.url')"
                                type="url"
                                @update:model-value="(value) => resumeStore.updateSocialLink(linkIndex, 'url', value)"
                            />
                        </div>
                        <div
                            v-if="link.platform === 'other'"
                            class="w-32"
                        >
                            <UInput
                                :model-value="link.customLabel || ''"
                                :placeholder="t('forms.personalInfo.customLabel')"
                                @update:model-value="(value) => resumeStore.updateSocialLink(linkIndex, 'customLabel', value)"
                            />
                        </div>
                        <div class="hidden md:flex items-center space-x-1">
                            <UButton
                                :disabled="linkIndex === 0"
                                size="sm" color="neutral" variant="outline"
                                @click="resumeStore.moveSocialLink(linkIndex, linkIndex - 1)" icon="i-lucide-chevron-up" />
                            <UButton
                                :disabled="linkIndex === resumeStore.resumeData.socialLinks.length - 1"
                                size="sm" color="neutral" variant="outline"
                                @click="resumeStore.moveSocialLink(linkIndex, linkIndex + 1)" icon="i-lucide-chevron-down" />
                            <UButton
                                size="sm" color="neutral" variant="outline"
                                @click="handleRemoveSocialLink(linkIndex)" icon="i-lucide-trash-2" />
                        </div>
                    </div>
                    <div class="flex md:hidden items-center justify-center space-x-2">
                        <UButton
                            :disabled="linkIndex === 0"
                            size="sm" color="neutral" variant="outline"
                            @click="resumeStore.moveSocialLink(linkIndex, linkIndex - 1)" icon="i-lucide-chevron-up" />
                        <UButton
                            :disabled="linkIndex === resumeStore.resumeData.socialLinks.length - 1"
                            size="sm" color="neutral" variant="outline"
                            @click="resumeStore.moveSocialLink(linkIndex, linkIndex + 1)" icon="i-lucide-chevron-down" />
                        <UButton
                            size="sm" color="neutral" variant="outline"
                            @click="handleRemoveSocialLink(linkIndex)" icon="i-lucide-trash-2" />
                    </div>
                </div>
            </div>
        </div>
    </FormContainer>
    <ConfirmationModal
        :cancel-text="confirmation.cancelText.value"
        :confirm-text="confirmation.confirmText.value"
        :is-open="confirmation.isOpen.value"
        :message="confirmation.message.value"
        :title="confirmation.title.value"
        @cancel="confirmation.handleCancel"
        @confirm="confirmation.handleConfirm"
    />
</template>

<script lang="ts" setup>
import FormContainer from '~/components/elements/FormContainer.vue';
import ConfirmationModal from '~/components/elements/ConfirmationModal.vue';
import EditableHeader from '~/components/elements/EditableHeader.vue';
import PhotoUploader from '~/components/elements/PhotoUploader.vue';

const { t } = useResumeT();

const SOCIAL_PLATFORMS = computed(() => [
    { value: 'linkedin', label: t('platforms.linkedin'), icon: 'i-lucide-linkedin' },
    { value: 'github', label: t('platforms.github'), icon: 'i-lucide-github' },
    { value: 'twitter', label: t('platforms.twitter'), icon: 'i-lucide-twitter' },
    { value: 'portfolio', label: t('platforms.portfolio'), icon: 'i-lucide-globe' },
    { value: 'dribbble', label: t('platforms.dribbble'), icon: 'i-lucide-dribbble' },
    { value: 'medium', label: t('platforms.medium'), icon: 'i-lucide-book-open' },
    { value: 'devto', label: t('platforms.devto'), icon: 'i-lucide-pen-line' },
    { value: 'personal', label: t('platforms.personal'), icon: 'i-lucide-globe' },
    { value: 'other', label: t('platforms.other'), icon: 'i-lucide-link' },
]);

const resumeStore = useResumeStore();
const confirmation = useConfirmation();
const { getSectionHeader, setSectionHeader } = useSectionHeader();
const profileHeader = getSectionHeader('profile');
const socialLinksHeader = getSectionHeader('socialLinks');
const getPlatformIcon = (platform: string) => {
    const found = SOCIAL_PLATFORMS.value.find(p => p.value === platform);
    return found?.icon || Link;
};
const handleRemoveSocialLink = async (index: number) => {
    const confirmed = await confirmation.confirm({
        title: 'Delete Social Link',
        message: 'Are you sure you want to delete this social link? This action cannot be undone.',
        confirmText: 'Delete',
        cancelText: 'Cancel',
    });
    if (confirmed) {
        resumeStore.removeSocialLink(index);
    }
};
</script>
