<template>
    <div class="space-y-3">
        <div class="flex items-center gap-4">
            <div
                class="size-20 overflow-hidden bg-elevated border border-default flex items-center justify-center shrink-0"
                :class="isCirclePreview ? 'rounded-full' : 'rounded-md'"
            >
                <img
                    v-if="previewUrl"
                    :src="previewUrl"
                    :alt="t('forms.personalInfo.photo.label')"
                    class="size-full object-cover"
                >
                <UIcon
                    v-else
                    name="i-lucide-image"
                    class="w-8 h-8 text-dimmed"
                />
            </div>
            <div class="flex-1 space-y-2">
                <h4 class="text-sm font-medium text-default">
                    {{ t('forms.personalInfo.photo.label') }}
                </h4>
                <div class="flex flex-wrap gap-2">
                    <UButton
                        size="sm"
                        color="neutral"
                        variant="outline"
                        :disabled="busy"
                        icon="i-lucide-upload"
                        @click="onPickClick"
                    >
                        {{ t('forms.personalInfo.photo.upload') }}
                    </UButton>
                    <UButton
                        v-if="hasPhoto"
                        size="sm"
                        color="neutral"
                        variant="outline"
                        :disabled="busy"
                        icon="i-lucide-trash-2"
                        @click="onRemoveClick"
                    >
                        {{ t('forms.personalInfo.photo.remove') }}
                    </UButton>
                </div>
                <p class="text-xs text-muted">
                    {{ t('forms.personalInfo.photo.constraints') }}
                </p>
                <div class="flex items-center gap-2 pt-1">
                    <USwitch
                        id="photo-shape-switch"
                        :model-value="isCirclePreview"
                        @update:model-value="onShapeToggle"
                    />
                    <label
                        for="photo-shape-switch"
                        class="text-xs text-toned cursor-pointer"
                    >
                        {{ t('forms.personalInfo.photo.roundedToggle') }}
                    </label>
                </div>
            </div>
            <input
                ref="fileInputRef"
                type="file"
                accept="image/jpeg,image/png"
                class="hidden"
                @change="onFileSelected"
            >
        </div>

        <UModal
            v-model:open="cropModalOpen"
            :title="t('forms.personalInfo.photo.cropTitle')"
            :ui="{ content: 'max-w-xl', footer: 'justify-end' }"
        >
            <template #body>
                <div
                    v-if="cropSrc"
                    class="bg-black/5 rounded overflow-hidden"
                >
                    <component
                        :is="CropperComponent"
                        v-if="CropperComponent"
                        ref="cropperRef"
                        class="cropper"
                        :src="cropSrc"
                        :stencil-component="cropperStencilComponent"
                        :stencil-props="{ aspectRatio: 1 }"
                        :default-size="cropperDefaultSize"
                        image-restriction="stencil"
                        :min-width="80"
                        :min-height="80"
                    />
                    <div
                        v-else
                        class="h-64 flex items-center justify-center text-sm text-muted"
                    >
                        {{ t('common.loading') }}
                    </div>
                </div>
            </template>

            <template #footer>
                <UButton
                    color="neutral"
                    variant="outline"
                    :disabled="busy"
                    :label="t('common.cancel')"
                    @click="closeCropDialog"
                />
                <UButton
                    :loading="busy"
                    :disabled="!CropperComponent"
                    :label="t('common.save')"
                    @click="onConfirmCrop"
                />
            </template>
        </UModal>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, shallowRef } from 'vue';
import { downscaleAndEncode, validatePhotoFile, type CropResult } from '~/composables/useResumePhoto';
import type { PhotoShape } from '~/types/resume';

const { t } = useResumeT();
const notify = useNotify();
const resumeStore = useResumeStore();
const { attachPhoto, removePhoto } = useResumePhoto();

const fileInputRef = ref<HTMLInputElement | null>(null);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cropperRef = ref<any>(null);
const cropOpen = ref(false);
const cropSrc = ref<string | null>(null);
const cropMime = ref<string>('image/jpeg');
const busy = ref(false);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CropperComponent = shallowRef<any>(null);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cropperStencilComponent = shallowRef<any>(null);

const previewUrl = computed(() => {
    const photo = resumeStore.resumeData.photo;
    if (!photo) return null;
    return photo.source === 'local' ? photo.dataUrl : photo.url;
});

const hasPhoto = computed(() => Boolean(resumeStore.resumeData.photo));

const isCirclePreview = computed(() => resumeStore.activeResume?.settings?.photoShape === 'circle');

const onShapeToggle = (value: boolean) => {
    const next: PhotoShape = value ? 'circle' : 'rectangle';
    resumeStore.setActiveResumeSetting('photoShape', next);
};

const cropperDefaultSize = ({ imageSize, visibleArea }: { imageSize: { width: number; height: number }; visibleArea: { width: number; height: number } | null }) => {
    const base = visibleArea || imageSize;
    const side = Math.min(base.width, base.height);
    return { width: side, height: side };
};

const ensureCropperLoaded = async () => {
    if (CropperComponent.value) return;
    const [mod] = await Promise.all([
        import('vue-advanced-cropper'),
        import('vue-advanced-cropper/dist/style.css'),
    ]);
    CropperComponent.value = mod.Cropper;
    cropperStencilComponent.value = mod.RectangleStencil;
};

const showError = async (key: string) => {
    notify.error(t(key));
};

const onPickClick = () => {
    fileInputRef.value?.click();
};

const onFileSelected = async (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;
    const error = validatePhotoFile(file);
    if (error) {
        await showError(error);
        return;
    }
    cropMime.value = file.type;
    const reader = new FileReader();
    reader.onload = async () => {
        cropSrc.value = reader.result as string;
        await ensureCropperLoaded();
        cropOpen.value = true;
    };
    reader.readAsDataURL(file);
};

const closeCropDialog = () => {
    cropOpen.value = false;
    cropSrc.value = null;
};

const cropModalOpen = computed({
    get: () => cropOpen.value,
    set: (value) => {
        if (!value) closeCropDialog();
    },
});

const onConfirmCrop = async () => {
    if (!cropperRef.value || !resumeStore.activeResumeId) return;
    busy.value = true;
    try {
        const result = cropperRef.value.getResult();
        const canvas: HTMLCanvasElement | undefined = result?.canvas;
        if (!canvas) {
            await showError('forms.personalInfo.photo.invalidType');
            return;
        }
        const crop: CropResult = await downscaleAndEncode(canvas, cropMime.value);
        await attachPhoto(resumeStore.activeResumeId, crop);
        closeCropDialog();
    }
    catch (error) {
        console.error('Photo crop/upload failed:', error);
        notify.error(error instanceof Error ? error.message : 'Failed to save photo');
    }
    finally {
        busy.value = false;
    }
};

const onRemoveClick = async () => {
    if (!resumeStore.activeResumeId) return;
    busy.value = true;
    try {
        await removePhoto(resumeStore.activeResumeId);
    }
    finally {
        busy.value = false;
    }
};
</script>

<style scoped>
.cropper {
    height: 360px;
}
</style>
