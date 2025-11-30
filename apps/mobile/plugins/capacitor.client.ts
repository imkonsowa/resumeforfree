import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Keyboard } from '@capacitor/keyboard';
import { SplashScreen } from '@capacitor/splash-screen';
import { Capacitor } from '@capacitor/core';

export default defineNuxtPlugin(async () => {
    if (!Capacitor.isNativePlatform()) {
        return;
    }

    // Add native-app class to html for CSS targeting
    document.documentElement.classList.add('native-app');
    document.documentElement.classList.add(`platform-${Capacitor.getPlatform()}`);

    // Hide splash screen once app is ready
    await SplashScreen.hide();

    // Configure status bar - make it overlay the webview so content goes behind it
    if (Capacitor.getPlatform() === 'ios') {
        await StatusBar.setStyle({ style: Style.Dark });
    } else if (Capacitor.getPlatform() === 'android') {
        await StatusBar.setStyle({ style: Style.Dark });
        await StatusBar.setOverlaysWebView({ overlay: true });
        await StatusBar.setBackgroundColor({ color: '#00000000' }); // Transparent
    }

    // Handle keyboard
    Keyboard.addListener('keyboardWillShow', (info) => {
        document.body.classList.add('keyboard-visible');
        document.body.style.setProperty('--keyboard-height', `${info.keyboardHeight}px`);
    });

    Keyboard.addListener('keyboardWillHide', () => {
        document.body.classList.remove('keyboard-visible');
        document.body.style.setProperty('--keyboard-height', '0px');
    });

    // Handle app state
    App.addListener('appStateChange', ({ isActive }) => {
        console.log('App state changed. Is active:', isActive);
    });

    // Handle back button (Android)
    App.addListener('backButton', ({ canGoBack }) => {
        if (canGoBack) {
            window.history.back();
        } else {
            App.exitApp();
        }
    });
});
