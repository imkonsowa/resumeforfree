import { getTemplate } from '~/templates';
import type { Resume, ResumeData } from '~/types/resume';

export const useResumeGenerator = () => {
    const { isReady: typstReady, isLoading: typstLoading } = useTypstLoader();
    const i18n = useI18n({ useScope: 'global' });

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
            t: scopedT(resume.language),
        });
    };

    const generatePreview = async (resume: Resume): Promise<string> => {
        if (!typstReady.value) throw new Error('Typst not ready');
        if (!window.$typst) throw new Error('Typst global object not available yet');
        return await window.$typst.svg({
            mainContent: generateTypstContent(resume),
            // Disable the runtime <script> block Typst.ts adds by default. It provides
            // click-ripple and selection-highlight glue that only works inside its own
            // runtime, and it contains unescaped `&` that breaks strict XML parsing
            // (<object>, xmllint, external viewers). Emitting body+defs+css only
            // produces portable, standards-compliant SVG.
            data_selection: { body: true, defs: true, css: true, js: false },
        });
    };

    const generatePDF = async (resume: Resume): Promise<Uint8Array> => {
        if (!typstReady.value) throw new Error('Typst not ready');
        if (!window.$typst) throw new Error('Typst global object not available');
        try {
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
