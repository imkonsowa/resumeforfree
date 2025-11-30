import { Capacitor } from '@capacitor/core';

export const usePlatform = () => {
    const isNative = Capacitor.isNativePlatform();
    const platform = Capacitor.getPlatform(); // 'ios' | 'android' | 'web'
    const isIOS = platform === 'ios';
    const isAndroid = platform === 'android';
    const isWeb = platform === 'web';

    return {
        isNative,
        platform,
        isIOS,
        isAndroid,
        isWeb,
    };
};
