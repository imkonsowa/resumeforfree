import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

export const useNativeShare = () => {
    const sharePDF = async (pdfData: Uint8Array, filename: string): Promise<void> => {
        // Convert to base64
        const base64 = btoa(String.fromCharCode(...pdfData));

        // Write file to cache directory
        const result = await Filesystem.writeFile({
            path: `${filename}.pdf`,
            data: base64,
            directory: Directory.Cache,
        });

        // Share via native dialog
        await Share.share({
            title: filename,
            url: result.uri,
        });
    };

    const shareJSON = async (jsonData: string, filename: string): Promise<void> => {
        const result = await Filesystem.writeFile({
            path: `${filename}.json`,
            data: jsonData,
            directory: Directory.Cache,
            encoding: Encoding.UTF8,
        });

        await Share.share({
            title: filename,
            url: result.uri,
        });
    };

    return {
        sharePDF,
        shareJSON,
    };
};
