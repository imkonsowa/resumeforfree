import type { ResumePhoto } from '~/types/resume';

export const PHOTO_VFS_PATH = '/photo';

const dataUrlToBytes = (dataUrl: string): Uint8Array => {
    const commaIdx = dataUrl.indexOf(',');
    if (commaIdx < 0) throw new Error('Invalid data URL');
    const base64 = dataUrl.slice(commaIdx + 1);
    const bin = atob(base64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
};

export const loadPhotoBytes = async (photo: ResumePhoto): Promise<Uint8Array> => {
    if (photo.source === 'local') {
        return dataUrlToBytes(photo.dataUrl);
    }
    const response = await fetch(photo.url, { credentials: 'include' });
    if (!response.ok) {
        throw new Error(`Failed to fetch photo: ${response.status}`);
    }
    const buf = await response.arrayBuffer();
    return new Uint8Array(buf);
};
