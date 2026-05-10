<template>
    <div class="space-y-3">
        <div class="flex items-center gap-4">
            <div
                class="size-20 overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center shrink-0"
                :class="isCirclePreview ? 'rounded-full' : 'rounded-md'"
            >
                <img
                    v-if="previewUrl"
                    :src="previewUrl"
                    :alt="t('forms.personalInfo.photo.label')"
                    class="size-full object-cover"
                >
                <ImageIcon
                    v-else
                    class="w-8 h-8 text-gray-400"
                />
            </div>
            <div class="flex-1 space-y-2">
                <Label>{{ t('forms.personalInfo.photo.label') }}</Label>
                <div class="flex flex-wrap gap-2">
                    <Button
                        size="sm"
                        variant="outline"
                        :disabled="busy"
                        @click="onPickClick"
                    >
                        <Upload class="w-4 h-4 mr-2" />
                        {{ t('forms.personalInfo.photo.upload') }}
                    </Button>
                    <Button
                        v-if="hasPhoto"
                        size="sm"
                        variant="outline"
                        :disabled="busy"
                        @click="onRemoveClick"
                    >
                        <Trash2 class="w-4 h-4 mr-2" />
                        {{ t('forms.personalInfo.photo.remove') }}
                    </Button>
                </div>
                <div class="flex items-center gap-2 pt-1">
                    <Switch
                        id="photo-shape-switch"
                        :model-value="isCirclePreview"
                        @update:model-value="onShapeToggle"
                    />
                    <Label
                        for="photo-shape-switch"
                        class="text-xs text-gray-600 cursor-pointer"
                    >
                        {{ t('forms.personalInfo.photo.roundedToggle') }}
                    </Label>
                </div>
            </div>
            <input
                ref="fileInputRef"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                class="hidden"
                @change="onFileSelected"
            >
        </div>

        <Dialog
            :open="cropOpen"
            @update:open="onCropDialogToggle"
        >
            <DialogContent class="max-w-xl">
                <DialogHeader>
                    <DialogTitle>{{ t('forms.personalInfo.photo.cropTitle') }}</DialogTitle>
                </DialogHeader>
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
                        class="h-64 flex items-center justify-center text-sm text-gray-500"
                    >
                        {{ t('common.loading') }}
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        :disabled="busy"
                        @click="closeCropDialog"
                    >
                        {{ t('common.cancel') }}
                    </Button>
                    <Button
                        :disabled="busy || !CropperComponent"
                        @click="onConfirmCrop"
                    >
                        {{ t('common.save') }}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, shallowRef } from 'vue';
import { Image as ImageIcon, Trash2, Upload } from 'lucide-vue-next';
import { Label } from '~/components/ui/label';
import { Button } from '~/components/ui/button';
import { Switch } from '~/components/ui/switch';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '~/components/ui/dialog';
import { downscaleAndEncode, validatePhotoFile, type CropResult } from '~/composables/useResumePhoto';
import type { PhotoShape } from '~/types/resume';

const { t } = useResumeT();
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
    const { toast } = await import('vue-sonner');
    toast.error(t(key));
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

const onCropDialogToggle = (open: boolean) => {
    if (!open) closeCropDialog();
};

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
        const { toast } = await import('vue-sonner');
        toast.error(error instanceof Error ? error.message : 'Failed to save photo');
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
