# Capacitor Mobile App Migration Plan (Nuxt Layers Architecture)

## Executive Summary

This plan outlines the conversion of the Resume Builder web application (https://resumeforfree.com) to a native mobile application using Capacitor, utilizing **Nuxt Layers architecture** to share code between web and mobile platforms.

**Current Stack:** Nuxt 4 + Typst.ts WASM + Cloudflare Workers + D1 Database
**Target Stack:** Nuxt Layers (base/web/mobile) + Capacitor 7 + Native iOS/Android

---

## Architecture Overview

```
resume-builder/
├── layers/
│   └── base/                    # Shared layer (moved from current app/)
│       ├── nuxt.config.ts       # Base config (modules, i18n, etc.)
│       ├── package.json         # Base dependencies
│       ├── tsconfig.json
│       ├── app/
│       │   ├── app.vue
│       │   ├── assets/
│       │   ├── components/
│       │   ├── composables/
│       │   ├── layouts/
│       │   ├── lib/
│       │   ├── middleware/
│       │   ├── pages/
│       │   ├── plugins/
│       │   ├── stores/
│       │   ├── templates/
│       │   ├── types/
│       │   └── utils/
│       ├── i18n/
│       │   └── locales/
│       ├── public/
│       │   └── fonts/
│       └── server/              # API routes (base layer)
│           ├── api/
│           └── utils/
│
├── apps/
│   ├── web/                     # Web-specific (Cloudflare Workers)
│   │   ├── nuxt.config.ts       # extends: ['../../layers/base']
│   │   ├── package.json         # Web-specific deps
│   │   ├── tsconfig.json
│   │   └── wrangler.toml        # Cloudflare config
│   │
│   └── mobile/                  # Mobile-specific (Capacitor)
│       ├── nuxt.config.ts       # extends: ['../../layers/base'], ssr: false
│       ├── package.json         # Capacitor deps
│       ├── tsconfig.json
│       ├── capacitor.config.ts
│       ├── app.vue              # Override for mobile (safe areas, etc.)
│       ├── composables/         # Mobile-specific composables
│       │   ├── useTokenStorage.ts
│       │   ├── useNativeShare.ts
│       │   ├── useNativeFilePicker.ts
│       │   └── usePlatform.ts
│       ├── plugins/             # Mobile-specific plugins
│       │   └── capacitor.client.ts
│       ├── ios/                 # iOS native project
│       └── android/             # Android native project
│
├── package.json                 # Root workspaces config
├── drizzle.config.ts
├── migrations/
└── scripts/
```

---

## Critical Rules

1. **NEVER rewrite existing files** - Use `mv` and `cp` commands to relocate files
2. **Patch only when necessary** - Use `Edit` tool for minimal changes
3. **Web layer = current files exactly** - No modifications to existing functionality
4. **Mobile layer = overrides only** - Platform-specific composables and configs

---

## Phase 1: Project Restructuring (File Operations Only)

### 1.1 Create Directory Structure

```bash
# Create layers and apps directories
mkdir -p layers/base/app
mkdir -p layers/base/i18n
mkdir -p layers/base/public
mkdir -p layers/base/server
mkdir -p apps/web
mkdir -p apps/mobile/composables
mkdir -p apps/mobile/plugins
```

### 1.2 Move Files to Base Layer

```bash
# Move app directory contents
mv app/assets layers/base/app/
mv app/components layers/base/app/
mv app/composables layers/base/app/
mv app/layouts layers/base/app/
mv app/lib layers/base/app/
mv app/middleware layers/base/app/
mv app/pages layers/base/app/
mv app/plugins layers/base/app/
mv app/stores layers/base/app/
mv app/templates layers/base/app/
mv app/types layers/base/app/
mv app/utils layers/base/app/
mv app/app.vue layers/base/app/

# Move i18n locales
mv i18n/locales layers/base/i18n/

# Move public assets
mv public/fonts layers/base/public/
mv public/favicon.svg layers/base/public/
mv public/icon.svg layers/base/public/

# Move server
mv server/api layers/base/server/
mv server/utils layers/base/server/
```

### 1.3 Move Web-Specific Files

```bash
# Move Cloudflare/web-specific files
mv wrangler.toml apps/web/
```

### 1.4 Keep Root-Level Files

Files that stay at root (not moved):
- `drizzle.config.ts`
- `migrations/`
- `scripts/`
- `tailwind.config.js`
- `eslint.config.mjs`
- `.gitignore`
- `LICENSE`
- `README.md`
- `Makefile`

---

## Phase 2: Configuration Files

### 2.1 Root package.json (NEW)

Create new root `package.json` with workspaces:

```json
{
  "name": "resume-builder",
  "private": true,
  "type": "module",
  "workspaces": [
    "layers/base",
    "apps/web",
    "apps/mobile"
  ],
  "scripts": {
    "dev": "npm run dev:web",
    "dev:web": "npm run --prefix apps/web dev",
    "dev:mobile": "npm run --prefix apps/mobile dev",
    "build": "npm run build:web",
    "build:web": "npm run --prefix apps/web build",
    "build:mobile": "npm run --prefix apps/mobile build",
    "deploy": "npm run --prefix apps/web deploy",
    "deploy:staging": "npm run --prefix apps/web deploy:staging",
    "lint": "npm run --prefix apps/web lint",
    "lint:fix": "npm run --prefix apps/web lint:fix",
    "mobile:android": "npm run --prefix apps/mobile android",
    "mobile:ios": "npm run --prefix apps/mobile ios",
    "mobile:dev:android": "npm run --prefix apps/mobile dev:android",
    "mobile:dev:ios": "npm run --prefix apps/mobile dev:ios",
    "db:generate": "drizzle-kit generate",
    "db:push": "drizzle-kit push",
    "db:studio": "drizzle-kit studio"
  },
  "devDependencies": {
    "drizzle-kit": "^0.31.6",
    "typescript": "^5.8.3"
  }
}
```

### 2.2 layers/base/nuxt.config.ts (NEW)

Extract shared config from current `nuxt.config.ts`:

```typescript
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import tailwindcss from '@tailwindcss/vite';

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
    $meta: {
        name: 'base',
    },
    future: {
        compatibilityVersion: 4,
    },
    compatibilityDate: '2025-07-15',

    css: [
        join(currentDir, 'app/assets/css/tailwind.css'),
        join(currentDir, 'app/assets/css/app.css'),
    ],

    imports: {
        dirs: [join(currentDir, 'app/stores/**')],
    },

    modules: [
        'shadcn-nuxt',
        '@pinia/nuxt',
        'pinia-plugin-persistedstate/nuxt',
        '@nuxtjs/i18n',
    ],

    vite: {
        plugins: [tailwindcss()],
        optimizeDeps: {
            exclude: [
                '@myriaddreamin/typst-ts-web-compiler',
                '@myriaddreamin/typst-ts-renderer',
                '@myriaddreamin/typst.ts',
            ],
        },
        build: {
            target: 'esnext',
        },
    },

    runtimeConfig: {
        public: {
            pocketbaseUrl: process.env.NODE_ENV === 'production'
                ? 'https://api.resumeforfree.com'
                : 'http://localhost:8010',
        },
    },

    i18n: {
        defaultLocale: 'en',
        locales: [
            { code: 'en', name: 'English', file: 'en.json', iso: 'en-US', dir: 'ltr' },
            { code: 'ar', name: 'العربية', file: 'ar.json', iso: 'ar-SA', dir: 'rtl' },
        ],
        lazy: true,
        langDir: 'locales',
        strategy: 'no_prefix',
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_redirected',
            redirectOn: 'root',
        },
    },

    piniaPluginPersistedstate: {
        storage: 'localStorage',
    },

    shadcn: {
        prefix: '',
        componentDir: join(currentDir, 'app/components/ui'),
    },
});
```

### 2.3 layers/base/package.json (NEW)

```json
{
  "name": "@resume-builder/base",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "dependencies": {
    "@myriaddreamin/typst-ts-renderer": "^0.6.0",
    "@myriaddreamin/typst-ts-web-compiler": "^0.6.0",
    "@myriaddreamin/typst.ts": "^0.6.0",
    "@nuxtjs/i18n": "^10.2.0",
    "@pinia/nuxt": "^0.11.1",
    "@tailwindcss/vite": "^4.1.11",
    "@vee-validate/zod": "^4.15.1",
    "@vuepic/vue-datepicker": "^11.0.2",
    "@vueuse/core": "^13.9.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-vue-next": "^0.525.0",
    "nuxt": "^4.0.0",
    "pinia-plugin-persistedstate": "^4.4.1",
    "reka-ui": "^2.6.0",
    "shadcn-nuxt": "^2.2.0",
    "tailwind-merge": "^3.3.1",
    "tailwindcss": "^4.1.11",
    "tw-animate-css": "^1.3.5",
    "vee-validate": "^4.15.1",
    "vue": "^3.5.17",
    "vue-router": "^4.5.1",
    "vue-sonner": "^2.0.8",
    "zod": "^3.25.76"
  }
}
```

### 2.4 apps/web/nuxt.config.ts (NEW)

```typescript
export default defineNuxtConfig({
    extends: ['../../layers/base'],

    devtools: { enabled: false },
    ssr: true,

    modules: [
        '@nuxt/eslint',
        '@vite-pwa/nuxt',
        'nitro-cloudflare-dev',
        '@nuxtjs/turnstile',
    ],

    app: {
        head: {
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
                { rel: 'canonical', href: 'https://resumeforfree.com' },
            ],
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { name: 'format-detection', content: 'telephone=no' },
                { name: 'robots', content: 'index, follow' },
                { name: 'author', content: 'Resume Builder' },
                { name: 'theme-color', content: '#3b82f6' },
            ],
        },
    },

    site: {
        url: 'https://resumeforfree.com',
        name: 'Resume Builder',
        description: 'Build professional resumes for free.',
        defaultLocale: 'en',
    },

    runtimeConfig: {
        public: {
            turnstile: {
                siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA',
            },
        },
        turnstile: {
            secretKey: process.env.NUXT_TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA',
        },
    },

    nitro: {
        preset: 'cloudflare-module',
        cloudflare: {
            d1: {
                DB: process.env.NODE_ENV === 'production' ? undefined : './dev.db',
            },
        },
    },

    eslint: {
        config: {
            stylistic: {
                indent: 4,
                semi: true,
                quotes: 'single',
            },
        },
    },

    pwa: {
        manifest: {
            name: 'Resume Builder',
            short_name: 'Resume Builder',
            description: 'Build professional resumes for free',
            theme_color: '#3b82f6',
            background_color: '#ffffff',
            display: 'standalone',
            start_url: '/',
            icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }],
        },
        workbox: { navigateFallback: '/' },
        devOptions: { enabled: false },
    },

    seo: {
        redirectToCanonicalSiteUrl: true,
    },
});
```

### 2.5 apps/web/package.json (NEW)

```json
{
  "name": "@resume-builder/web",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build",
    "deploy": "nuxt build && wrangler deploy",
    "deploy:staging": "nuxt build && wrangler deploy --env staging",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "preview": "nuxt preview"
  },
  "dependencies": {
    "@cloudflare/workers-types": "^4.20250906.0",
    "@tsndr/cloudflare-worker-jwt": "^2.5.2",
    "@vite-pwa/nuxt": "^1.0.4",
    "@nuxtjs/turnstile": "^1.0.0",
    "bcryptjs": "^2.4.3",
    "drizzle-orm": "^0.44.7",
    "nitro-cloudflare-dev": "^0.2.2"
  },
  "devDependencies": {
    "@nuxt/eslint": "^1.6.0",
    "@types/bcryptjs": "^2.4.6",
    "eslint": "^9.0.0",
    "wrangler": "^4.25.0"
  }
}
```

### 2.6 apps/mobile/nuxt.config.ts (NEW)

```typescript
export default defineNuxtConfig({
    extends: ['../../layers/base'],

    devtools: { enabled: false },
    ssr: false, // Capacitor requires SPA mode

    app: {
        head: {
            meta: [
                { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
            ],
        },
    },

    runtimeConfig: {
        public: {
            // Android emulator uses 10.0.2.2 to reach host machine
            pocketbaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'https://api.resumeforfree.com',
        },
    },

    nitro: {
        preset: 'static',
        output: {
            publicDir: 'dist',
        },
    },

    // Override storage for mobile (handled by composables)
    piniaPluginPersistedstate: {
        storage: 'localStorage', // Will be overridden by Capacitor Preferences plugin
    },
});
```

### 2.7 apps/mobile/package.json (NEW)

```json
{
  "name": "@resume-builder/mobile",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "NUXT_PUBLIC_API_BASE_URL=http://10.0.2.2:8010 nuxt dev --host 0.0.0.0 --port 3000",
    "build": "nuxt generate",
    "cap:sync": "npx cap sync",
    "cap:open:ios": "npx cap open ios",
    "cap:open:android": "npx cap open android",
    "dev:android": "CAPACITOR_DEV=true npx cap run android",
    "dev:ios": "CAPACITOR_DEV=true npx cap run ios",
    "android": "npm run build && npx cap sync android && npx cap open android",
    "ios": "npm run build && npx cap sync ios && npx cap open ios"
  },
  "dependencies": {
    "@capacitor/android": "^7.0.0",
    "@capacitor/app": "^7.0.0",
    "@capacitor/cli": "^7.0.0",
    "@capacitor/core": "^7.0.0",
    "@capacitor/filesystem": "^7.0.0",
    "@capacitor/ios": "^7.0.0",
    "@capacitor/keyboard": "^7.0.0",
    "@capacitor/network": "^7.0.0",
    "@capacitor/preferences": "^7.0.0",
    "@capacitor/share": "^7.0.0",
    "@capacitor/splash-screen": "^7.0.0",
    "@capacitor/status-bar": "^7.0.0"
  }
}
```

### 2.8 apps/mobile/capacitor.config.ts (NEW)

```typescript
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
    },
    ios: {
        contentInset: 'automatic',
        scheme: 'ResumeBuilder',
    },
    android: {
        allowMixedContent: false,
    },
};

export default config;
```

### 2.9 tsconfig.json files (NEW)

Each layer/app needs a `tsconfig.json`:

**layers/base/tsconfig.json:**
```json
{
  "extends": "./.nuxt/tsconfig.json"
}
```

**apps/web/tsconfig.json:**
```json
{
  "extends": "./.nuxt/tsconfig.json"
}
```

**apps/mobile/tsconfig.json:**
```json
{
  "extends": "./.nuxt/tsconfig.json"
}
```

---

## Phase 3: Mobile-Specific Composables (NEW FILES)

### 3.1 apps/mobile/composables/useTokenStorage.ts

Secure token storage using Capacitor Preferences:

```typescript
import { Preferences } from '@capacitor/preferences';

export const useTokenStorage = () => {
    const getToken = async (): Promise<string | null> => {
        const { value } = await Preferences.get({ key: 'auth_token' });
        return value;
    };

    const setToken = async (token: string): Promise<void> => {
        await Preferences.set({ key: 'auth_token', value: token });
    };

    const removeToken = async (): Promise<void> => {
        await Preferences.remove({ key: 'auth_token' });
    };

    const getUserEmail = async (): Promise<string | null> => {
        const { value } = await Preferences.get({ key: 'user_email' });
        return value;
    };

    const setUserEmail = async (email: string): Promise<void> => {
        await Preferences.set({ key: 'user_email', value: email });
    };

    const removeUserEmail = async (): Promise<void> => {
        await Preferences.remove({ key: 'user_email' });
    };

    const clearAll = async (): Promise<void> => {
        await Preferences.clear();
    };

    return {
        getToken,
        setToken,
        removeToken,
        getUserEmail,
        setUserEmail,
        removeUserEmail,
        clearAll,
    };
};
```

### 3.2 apps/mobile/composables/useNativeShare.ts

Native file sharing for PDFs:

```typescript
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

export const useNativeShare = () => {
    const sharePDF = async (pdfData: Uint8Array, filename: string): Promise<void> => {
        // Convert to base64
        const base64 = btoa(String.fromCharCode(...pdfData));

        // Write file to Documents
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
            encoding: 'utf8',
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
```

### 3.3 apps/mobile/composables/usePlatform.ts

Platform detection utility:

```typescript
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
```

### 3.4 apps/mobile/composables/useNetworkStatus.ts

Network state monitoring:

```typescript
import { Network } from '@capacitor/network';
import { ref, onMounted, onUnmounted } from 'vue';

export const useNetworkStatus = () => {
    const isOnline = ref(true);
    const connectionType = ref<string>('unknown');

    let listener: any = null;

    const checkStatus = async () => {
        const status = await Network.getStatus();
        isOnline.value = status.connected;
        connectionType.value = status.connectionType;
    };

    onMounted(async () => {
        await checkStatus();
        listener = await Network.addListener('networkStatusChange', (status) => {
            isOnline.value = status.connected;
            connectionType.value = status.connectionType;
        });
    });

    onUnmounted(() => {
        if (listener) {
            listener.remove();
        }
    });

    return {
        isOnline,
        connectionType,
        checkStatus,
    };
};
```

### 3.5 apps/mobile/plugins/capacitor.client.ts

Capacitor initialization plugin:

```typescript
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Keyboard } from '@capacitor/keyboard';
import { SplashScreen } from '@capacitor/splash-screen';
import { Capacitor } from '@capacitor/core';

export default defineNuxtPlugin(async () => {
    if (!Capacitor.isNativePlatform()) {
        return;
    }

    // Configure status bar
    if (Capacitor.getPlatform() === 'ios') {
        await StatusBar.setStyle({ style: Style.Light });
    }

    // Handle keyboard
    Keyboard.addListener('keyboardWillShow', () => {
        document.body.classList.add('keyboard-visible');
    });

    Keyboard.addListener('keyboardWillHide', () => {
        document.body.classList.remove('keyboard-visible');
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

    // Hide splash screen after app is ready
    await SplashScreen.hide();
});
```

---

## Phase 4: Authentication Refactoring

### 4.1 Patch Server Auth to Support Headers

**Problem:** Mobile apps cannot reliably use HTTP-only cookies.

**Files to Patch:** `layers/base/server/utils/auth.ts`

**Patch Required:**
```typescript
// Add header-based auth support (check Authorization header first, then cookies)
const token = getHeader(event, 'Authorization')?.replace('Bearer ', '')
           || getCookie(event, 'auth-token');
```

### 4.2 Mobile Auth Override

The mobile app uses `useTokenStorage.ts` composable (Phase 3) which stores tokens in Capacitor Preferences instead of cookies.

### 4.3 Update useApi Composable

**Files to Patch:** `layers/base/app/composables/useApi.ts`

Add platform detection to send Authorization header on mobile:
```typescript
// Detect if running in Capacitor
const isNative = typeof window !== 'undefined' && window.Capacitor?.isNativePlatform();

// If native, get token from storage and add Authorization header
if (isNative) {
    const token = await getStoredToken();
    headers['Authorization'] = `Bearer ${token}`;
}
```

---

## Phase 5: WASM Integration for Mobile

### 5.1 Bundle WASM Files

**Problem:** Current code fetches WASM from npm package URLs at runtime.

**Solution:**
- WASM files are already bundled via node_modules
- Capacitor serves from `dist/` which includes bundled assets
- No changes needed - Typst.ts works in WebView

### 5.2 Font Bundling

Fonts are in `layers/base/public/fonts/` and automatically included in the Capacitor build.

### 5.3 Memory Optimization (Optional)

- Monitor WASM memory usage on mobile devices
- Consider cleanup after PDF generation for low-memory devices

---

## Phase 6: File Operations (Mobile Overrides)

### 6.1 PDF Export & Sharing

**Files to Patch:** `layers/base/app/composables/useResumeGenerator.ts`

Add platform detection for download vs native share:
```typescript
// In downloadPDF function
if (Capacitor.isNativePlatform()) {
    // Use useNativeShare() from mobile layer
    const { sharePDF } = useNativeShare();
    await sharePDF(pdfData, filename);
} else {
    // Existing browser download logic
    link.download = 'resume.pdf';
    link.click();
}
```

### 6.2 JSON Import/Export

**Files to Patch:** `layers/base/app/composables/useResumeImportExport.ts`

Similar pattern - detect platform and use native share for exports.

---

## Phase 7: Mobile app.vue Override

### 7.1 apps/mobile/app.vue (NEW)

Override the base app.vue to handle mobile-specific concerns:

```vue
<script setup lang="ts">
import { StatusBar } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';

// Import base app functionality
// The base app.vue is inherited, this extends it

onMounted(async () => {
    if (Capacitor.isNativePlatform()) {
        // Handle safe areas
        document.documentElement.style.setProperty(
            '--safe-area-top',
            'env(safe-area-inset-top)'
        );
        document.documentElement.style.setProperty(
            '--safe-area-bottom',
            'env(safe-area-inset-bottom)'
        );
    }
});
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>

<style>
/* Mobile-specific safe area handling */
.safe-area-top {
    padding-top: var(--safe-area-top, 0);
}

.safe-area-bottom {
    padding-bottom: var(--safe-area-bottom, 0);
}

/* Keyboard visible adjustments */
body.keyboard-visible {
    /* Adjust layout when keyboard is shown */
}
</style>
```

---

## Phase 8: Initialize Capacitor Platforms

### 8.1 Add iOS Platform

```bash
cd apps/mobile
npx cap add ios
```

### 8.2 Add Android Platform

```bash
cd apps/mobile
npx cap add android
```

### 8.3 Configure Native Projects

**iOS (apps/mobile/ios/):**
- Update `Info.plist` with app permissions
- Configure app icons and launch screens
- Set minimum deployment target

**Android (apps/mobile/android/):**
- Update `AndroidManifest.xml` with permissions
- Configure app icons and splash screens
- Set minSdkVersion in `build.gradle`

---

## Phase 9: Testing & Debugging

### 9.1 Local Development

```bash
# Run Nuxt dev server for mobile
npm run dev:mobile

# Open Android Studio with live reload
npm run mobile:dev:android

# Open Xcode with live reload
npm run mobile:dev:ios
```

### 9.2 Build Testing

```bash
# Build and open in Android Studio
npm run mobile:android

# Build and open in Xcode
npm run mobile:ios
```

### 9.3 Testing Checklist

- [ ] App launches without crashes
- [ ] All pages render correctly
- [ ] Form inputs work with mobile keyboard
- [ ] RTL (Arabic) displays correctly
- [ ] Resume preview renders SVG
- [ ] PDF generation works
- [ ] PDF sharing works via native dialog
- [ ] Authentication login/logout works
- [ ] Cloud sync (if authenticated) works
- [ ] Offline editing works
- [ ] Hardware back button works (Android)
- [ ] Safe areas display correctly (iPhone notch)

---

## Phase 10: Build & Distribution

### 10.1 iOS App Store

- Enroll in Apple Developer Program
- Create App Store Connect listing
- Configure signing certificates and provisioning profiles
- Submit for App Store review

### 10.2 Google Play Store

- Create Google Play Developer account
- Create app listing
- Generate signed APK/AAB
- Submit for review

### 10.3 App Icons & Splash Screens

Use existing `/public/icon.svg` to generate:
- iOS: All required icon sizes via Asset Catalog
- Android: Adaptive icons for all densities
- Splash screens for both platforms

---

## Files Changed Summary

### New Files (apps/mobile/)

| File | Purpose |
|------|---------|
| `nuxt.config.ts` | Mobile-specific Nuxt config (SPA mode) |
| `package.json` | Capacitor dependencies |
| `tsconfig.json` | TypeScript config |
| `capacitor.config.ts` | Capacitor configuration |
| `app.vue` | Mobile app override (safe areas) |
| `composables/useTokenStorage.ts` | Secure token storage |
| `composables/useNativeShare.ts` | Native file sharing |
| `composables/usePlatform.ts` | Platform detection |
| `composables/useNetworkStatus.ts` | Network monitoring |
| `plugins/capacitor.client.ts` | Capacitor initialization |
| `ios/` | iOS native project (generated) |
| `android/` | Android native project (generated) |

### New Files (apps/web/)

| File | Purpose |
|------|---------|
| `nuxt.config.ts` | Web-specific config (SSR, Cloudflare) |
| `package.json` | Web-specific dependencies |
| `tsconfig.json` | TypeScript config |
| `wrangler.toml` | Moved from root |

### New Files (layers/base/)

| File | Purpose |
|------|---------|
| `nuxt.config.ts` | Shared base config |
| `package.json` | Shared dependencies |
| `tsconfig.json` | TypeScript config |

### New Files (root)

| File | Purpose |
|------|---------|
| `package.json` | Workspaces configuration (replaces existing) |

### Moved Files

| From | To |
|------|-----|
| `app/*` | `layers/base/app/*` |
| `i18n/locales/` | `layers/base/i18n/locales/` |
| `public/fonts/` | `layers/base/public/fonts/` |
| `public/favicon.svg` | `layers/base/public/favicon.svg` |
| `public/icon.svg` | `layers/base/public/icon.svg` |
| `server/api/` | `layers/base/server/api/` |
| `server/utils/` | `layers/base/server/utils/` |
| `wrangler.toml` | `apps/web/wrangler.toml` |

### Patched Files

| File | Change |
|------|--------|
| `layers/base/server/utils/auth.ts` | Add Authorization header support |
| `layers/base/app/composables/useApi.ts` | Add platform detection for auth headers |
| `layers/base/app/composables/useResumeGenerator.ts` | Add native share support |
| `layers/base/app/composables/useResumeImportExport.ts` | Add native share support |

### Files Kept at Root (unchanged)

- `drizzle.config.ts`
- `migrations/`
- `scripts/`
- `tailwind.config.js`
- `eslint.config.mjs`
- `.gitignore`
- `LICENSE`
- `README.md`
- `Makefile`

---

## Migration Script

Execute these commands in order to restructure the project:

```bash
#!/bin/bash
# Run from project root: /Users/ibrahim/projects/nuxt/resume-builder

# Phase 1: Create directory structure
mkdir -p layers/base/app
mkdir -p layers/base/i18n
mkdir -p layers/base/public
mkdir -p layers/base/server
mkdir -p apps/web
mkdir -p apps/mobile/composables
mkdir -p apps/mobile/plugins

# Phase 2: Move app contents to base layer
mv app/assets layers/base/app/
mv app/components layers/base/app/
mv app/composables layers/base/app/
mv app/layouts layers/base/app/
mv app/lib layers/base/app/
mv app/middleware layers/base/app/
mv app/pages layers/base/app/
mv app/plugins layers/base/app/
mv app/stores layers/base/app/
mv app/templates layers/base/app/
mv app/types layers/base/app/
mv app/utils layers/base/app/
mv app/app.vue layers/base/app/

# Phase 3: Move i18n locales
mv i18n/locales layers/base/i18n/

# Phase 4: Move public assets
mv public/fonts layers/base/public/
mv public/favicon.svg layers/base/public/
mv public/icon.svg layers/base/public/

# Phase 5: Move server
mv server/api layers/base/server/
mv server/utils layers/base/server/

# Phase 6: Move web-specific files
mv wrangler.toml apps/web/

# Phase 7: Clean up empty directories
rmdir app 2>/dev/null || true
rmdir i18n 2>/dev/null || true
rmdir server 2>/dev/null || true

# Phase 8: Remove old nuxt.config.ts (will be replaced)
rm nuxt.config.ts

# Note: After running this script, create the new config files
# as specified in Phase 2 of this plan
```

---

## Estimated Timeline (Updated for Layers)

| Phase | Duration | Description |
|-------|----------|-------------|
| Phase 1 | 1 day | Create directories, move files |
| Phase 2 | 2 days | Create all config files |
| Phase 3 | 1 day | Create mobile composables |
| Phase 4 | 1 day | Patch auth for headers |
| Phase 5 | 0.5 days | Verify WASM works |
| Phase 6 | 1 day | Patch file operations |
| Phase 7 | 0.5 days | Create mobile app.vue |
| Phase 8 | 1 day | Init Capacitor platforms |
| Phase 9 | 2-3 days | Testing & debugging |
| Phase 10 | 2-3 days | App store preparation |
| **Total** | **12-15 days** | ~2-3 weeks |

---

## Success Criteria

1. `npm run dev:web` works identically to current `npm run dev`
2. `npm run build:web` + `npm run deploy` deploys to Cloudflare
3. `npm run dev:mobile` starts dev server for mobile
4. `npm run mobile:android` builds and opens Android Studio
5. `npm run mobile:ios` builds and opens Xcode
6. All existing functionality preserved in web version
7. Mobile app launches and functions correctly
8. PDF generation and sharing works on mobile
9. Authentication works on mobile (header-based)
10. RTL (Arabic) support works on mobile

---

## Rollback Strategy

If issues arise during migration:

1. **Git-based rollback:** All changes are file moves/additions
    - `git checkout .` reverts any patches
    - `git clean -fd` removes new directories

2. **Incremental approach:**
    - Complete Phase 1-2 first, verify web still works
    - Then add mobile layer incrementally

3. **Feature flags:**
    - Use `Capacitor.isNativePlatform()` for mobile-only code
    - Web version remains unaffected by mobile code
