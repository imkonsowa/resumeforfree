import type { LocalResumePhoto, ResumePhoto } from '~/types/resume';

const ALLOWED_MIMES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_BYTES = 2 * 1024 * 1024;
const MAX_DIMENSION = 800;

export interface CropResult {
    blob: Blob;
    dataUrl: string;
    width: number;
    height: number;
    mime: string;
}

const fileToDataUrl = (file: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
    });
};

export const downscaleAndEncode = async (canvas: HTMLCanvasElement, mime: string): Promise<CropResult> => {
    let { width, height } = canvas;
    if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
        const targetW = Math.round(width * ratio);
        const targetH = Math.round(height * ratio);
        const scaled = document.createElement('canvas');
        scaled.width = targetW;
        scaled.height = targetH;
        const ctx = scaled.getContext('2d');
        if (!ctx) throw new Error('Canvas 2D context unavailable');
        ctx.drawImage(canvas, 0, 0, targetW, targetH);
        canvas = scaled;
        width = targetW;
        height = targetH;
    }
    const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, mime, 0.9));
    if (!blob) throw new Error('Failed to encode photo');
    const dataUrl = await fileToDataUrl(blob);
    return { blob, dataUrl, width, height, mime };
};

export const validatePhotoFile = (file: File): string | null => {
    if (!ALLOWED_MIMES.has(file.type)) return 'forms.personalInfo.photo.invalidType';
    if (file.size > MAX_BYTES) return 'forms.personalInfo.photo.tooLarge';
    return null;
};

export const useResumePhoto = () => {
    const resumeStore = useResumeStore();
    const authStore = useAuthStore();
    const api = useApi();

    const setLocal = (resumeId: string, crop: CropResult): LocalResumePhoto => {
        const photo: LocalResumePhoto = {
            source: 'local',
            dataUrl: crop.dataUrl,
            mime: crop.mime,
            width: crop.width,
            height: crop.height,
        };
        resumeStore.setResumePhoto(resumeId, photo);
        return photo;
    };

    const uploadIfAuthenticated = async (resumeId: string, crop: CropResult): Promise<ResumePhoto | null> => {
        const resume = resumeStore.resumes[resumeId];
        if (!authStore.isLoggedIn || !resume?.serverId) return null;
        const remote = await api.resumes.uploadPhoto(resume.serverId, crop.blob);
        if (remote) {
            resumeStore.setResumePhoto(resumeId, remote);
            return remote;
        }
        return null;
    };

    const attachPhoto = async (resumeId: string, crop: CropResult): Promise<ResumePhoto> => {
        const local = setLocal(resumeId, crop);
        const remote = await uploadIfAuthenticated(resumeId, crop);
        return remote ?? local;
    };

    const removePhoto = async (resumeId: string): Promise<void> => {
        const resume = resumeStore.resumes[resumeId];
        const photo = resume?.data?.photo;
        if (photo?.source === 'r2' && resume.serverId) {
            try {
                await api.resumes.deletePhoto(resume.serverId);
            }
            catch (error) {
                console.error('Failed to delete photo from server:', error);
            }
        }
        resumeStore.clearResumePhoto(resumeId);
    };

    const syncLocalPhotosToServer = async (): Promise<void> => {
        if (!authStore.isLoggedIn) return;
        const candidates = Object.values(resumeStore.resumes).filter(
            r => r.serverId && r.data?.photo?.source === 'local',
        );
        for (const resume of candidates) {
            const photo = resume.data.photo as LocalResumePhoto;
            const serverId = resume.serverId;
            if (!serverId) continue;
            try {
                const bytes = await fetch(photo.dataUrl).then(r => r.blob());
                const remote = await api.resumes.uploadPhoto(serverId, bytes);
                if (remote) resumeStore.setResumePhoto(resume.id, remote);
            }
            catch (error) {
                console.error(`Failed to upload local photo for ${resume.id}:`, error);
            }
        }
    };

    return {
        attachPhoto,
        removePhoto,
        syncLocalPhotosToServer,
    };
};
