import { getTemplate } from '~/templates';
import type { Resume, ResumeData, ResumePhoto } from '~/types/resume';
import { typstLoader } from '~/utils/typstLoader';
import { loadPhotoBytes, PHOTO_VFS_PATH } from '~/utils/photoLoader';
import { loadFontManifest, resolveFontUrls, warmFonts } from '~/utils/fontLoader';
import { LATIN_FALLBACK_FAMILIES } from '~/utils/typstUtils';

let lastSyncedPhotoKey: string | null = null;

const photoIdentity = (photo: ResumePhoto | undefined): string | null => {
    if (!photo) return null;
    return photo.source === 'local' ? `local:${photo.dataUrl.length}:${photo.dataUrl.slice(-32)}` : `r2:${photo.url}`;
};

export const useResumeGenerator = () => {
    const { isReady: typstReady, isLoading: typstLoading } = useTypstLoader();
    const i18n = useI18n({ useScope: 'global' });

    const syncPhotoToVfs = async (resume: Resume): Promise<void> => {
        const photo = resume.data.photo;
        const key = photoIdentity(photo);
        if (key === lastSyncedPhotoKey) return;

        if (!photo) {
            await typstLoader.unregisterPhoto(PHOTO_VFS_PATH);
            lastSyncedPhotoKey = null;
            return;
        }
        try {
            const bytes = await loadPhotoBytes(photo);
            await typstLoader.registerPhoto(PHOTO_VFS_PATH, bytes);
            lastSyncedPhotoKey = key;
        }
        catch (error) {
            console.error('Failed to register resume photo with Typst:', error);
            await typstLoader.unregisterPhoto(PHOTO_VFS_PATH);
            lastSyncedPhotoKey = null;
        }
    };

    const warmResumeFonts = async (resume: Resume): Promise<void> => {
        try {
            const manifest = await loadFontManifest();
            const families = [resume.settings.selectedFont, ...LATIN_FALLBACK_FAMILIES];
            const urls = resolveFontUrls(manifest, families);
            await warmFonts(urls.length > 0 ? urls : manifest.map(entry => entry.url));
        }
        catch (error) {
            console.error('Failed to warm fonts before compile:', error);
        }
    };

    const scopedT = (targetLocale: string) => {
        return (key: string) => i18n.t(key, 1, { locale: targetLocale });
    };

    const buildFilename = (resumeData: ResumeData, extension: string): string => {
        const parts = [
            resumeData.firstName || 'Resume',
            resumeData.lastName || '',
            resumeData.position || '',
            'resume',
        ].filter(Boolean);
        return `${parts.join('_')}.${extension}`;
    };

    const triggerDownload = (content: string | Uint8Array, mimeType: string, filename: string): void => {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    };

    const generateTypstContent = (resume: Resume): string => {
        const template = getTemplate(resume.settings.selectedTemplate);
        return template.parse({
            data: resume.data,
            font: resume.settings.selectedFont,
            locale: resume.language,
            fontSize: resume.settings.fontSize,
            photoShape: resume.settings.photoShape || 'rectangle',
            showSectionHeaderLine: resume.settings.showSectionHeaderLine ?? false,
            t: scopedT(resume.language),
        });
    };

    const generatePreview = async (resume: Resume): Promise<string> => {
        if (!typstReady.value) throw new Error('Typst not ready');
        if (!window.$typst) throw new Error('Typst global object not available yet');
        await warmResumeFonts(resume);
        await syncPhotoToVfs(resume);
        return await window.$typst.svg({
            mainContent: generateTypstContent(resume),
            data_selection: { body: true, defs: true, css: true, js: false },
        });
    };

    const generatePDF = async (resume: Resume): Promise<Uint8Array> => {
        if (!typstReady.value) throw new Error('Typst not ready');
        if (!window.$typst) throw new Error('Typst global object not available');
        try {
            await warmResumeFonts(resume);
            await syncPhotoToVfs(resume);
            return await window.$typst.pdf({ mainContent: generateTypstContent(resume) });
        }
        catch (error) {
            console.error('PDF generation error:', error);
            throw error;
        }
    };

    const downloadPDF = async (resume: Resume): Promise<void> => {
        try {
            const pdfData = await generatePDF(resume);
            triggerDownload(pdfData, 'application/pdf', buildFilename(resume.data, 'pdf'));
        }
        catch (error) {
            console.error('PDF download error:', error);
            throw error;
        }
    };

    const downloadSVG = async (resume: Resume): Promise<void> => {
        try {
            const svgContent = await generatePreview(resume);
            triggerDownload(svgContent, 'image/svg+xml', buildFilename(resume.data, 'svg'));
        }
        catch (error) {
            console.error('SVG download error:', error);
            throw error;
        }
    };

    const downloadTypst = (resume: Resume): void => {
        try {
            triggerDownload(generateTypstContent(resume), 'text/plain', buildFilename(resume.data, 'typ'));
        }
        catch (error) {
            console.error('Typst download error:', error);
            throw error;
        }
    };

    const downloadTypstText = (resume: Resume): void => {
        try {
            triggerDownload(generateTypstContent(resume), 'text/plain', buildFilename(resume.data, 'txt'));
        }
        catch (error) {
            console.error('Typst text download error:', error);
            throw error;
        }
    };

    return {
        typstReady,
        typstLoading,
        generateTypstContent,
        generatePreview,
        generatePDF,
        downloadPDF,
        downloadSVG,
        downloadTypst,
        downloadTypstText,
    };
};
