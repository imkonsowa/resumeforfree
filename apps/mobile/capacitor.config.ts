import type { CapacitorConfig } from '@capacitor/cli';

const isDev = process.env.CAPACITOR_DEV === 'true';
const devServerUrl = process.env.DEV_SERVER_URL || 'http://10.0.2.2:3000';

const config: CapacitorConfig = {
    appId: 'com.resumeforfree.app',
    appName: 'Resume Builder',
    webDir: 'dist',
    server: isDev ? {
        url: devServerUrl,
        cleartext: true,
    } : {},
    plugins: {
        SplashScreen: {
            launchShowDuration: 2000,
            launchAutoHide: true,
            backgroundColor: '#3b82f6',
            showSpinner: false,
        },
        Keyboard: {
            resize: 'body',
            resizeOnFullScreen: true,
        },
        StatusBar: {
            overlaysWebView: true,
            style: 'DARK',
            backgroundColor: '#ffffff',
        },
    },
    ios: {
        contentInset: 'automatic',
    },
    android: {
        allowMixedContent: false,
    },
};

export default config;
