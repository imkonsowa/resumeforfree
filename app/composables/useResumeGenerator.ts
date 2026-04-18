import { getTemplate } from '~/templates';
import type { ResumeData } from '~/types/resume';
import type { ResumeRenderOptions } from '~/types/template';

export const useResumeGenerator = () => {
    const { isReady: typstReady, isLoading: typstLoading } = useTypstLoader();
    const i18n = useI18n({ useScope: 'global' });

    const scopedT = (targetLocale: string) => {
        return (key: string) => i18n.t(key, 1, { locale: targetLocale });
    };

    const resolve = (options: ResumeRenderOptions) => ({
        resumeData: options.resumeData,
        templateId: options.templateId || 'default',
        font: options.font || 'Calibri',
        locale: options.locale || i18n.locale.value,
        fontSize: options.fontSize ?? 12,
    });

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

    const generateTypstContent = (options: ResumeRenderOptions): string => {
        const { resumeData, templateId, font, locale, fontSize } = resolve(options);
        const template = getTemplate(templateId);
        return template.parse({
            data: resumeData,
            font,
            locale,
            fontSize,
            t: scopedT(locale),
        });
    };

    const generatePreview = async (options: ResumeRenderOptions): Promise<string> => {
        if (!typstReady.value) {
            throw new Error('Typst not ready');
        }
        if (!window.$typst) {
            throw new Error('Typst global object not available yet');
        }
        return await window.$typst.svg({ mainContent: generateTypstContent(options) });
    };

    const generatePDF = async (options: ResumeRenderOptions): Promise<Uint8Array> => {
        if (!typstReady.value) {
            throw new Error('Typst not ready');
        }
        if (!window.$typst) {
            throw new Error('Typst global object not available');
        }
        try {
            return await window.$typst.pdf({ mainContent: generateTypstContent(options) });
        }
        catch (error) {
            console.error('PDF generation error:', error);
            throw error;
        }
    };

    const downloadPDF = async (options: ResumeRenderOptions): Promise<void> => {
        try {
            const pdfData = await generatePDF(options);
            triggerDownload(pdfData, 'application/pdf', buildFilename(options.resumeData, 'pdf'));
        }
        catch (error) {
            console.error('PDF download error:', error);
            throw error;
        }
    };

    const downloadSVG = async (options: ResumeRenderOptions): Promise<void> => {
        try {
            const svgContent = await generatePreview(options);
            triggerDownload(svgContent, 'image/svg+xml', buildFilename(options.resumeData, 'svg'));
        }
        catch (error) {
            console.error('SVG download error:', error);
            throw error;
        }
    };

    const downloadTypst = (options: ResumeRenderOptions): void => {
        try {
            triggerDownload(generateTypstContent(options), 'text/plain', buildFilename(options.resumeData, 'typ'));
        }
        catch (error) {
            console.error('Typst download error:', error);
            throw error;
        }
    };

    const downloadTypstText = (options: ResumeRenderOptions): void => {
        try {
            triggerDownload(generateTypstContent(options), 'text/plain', buildFilename(options.resumeData, 'txt'));
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
