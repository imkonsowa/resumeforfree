import { $typst } from '@myriaddreamin/typst.ts';
import { disableDefaultFontAssets } from '@myriaddreamin/typst.ts/dist/esm/options.init.mjs';
import { version as TYPST_VERSION } from '@myriaddreamin/typst.ts/package.json';

import type { TypstLoaderState } from '~/types/typst';
import { buildLazyFonts, loadFontManifest } from '~/utils/fontLoader';

const CACHE_PREFIX = 'typst-assets-';
const CACHE_NAME = `${CACHE_PREFIX}${TYPST_VERSION}`;

async function purgeStaleCaches(): Promise<void> {
    const names = await caches.keys();
    await Promise.all(
        names
            .filter(name => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
            .map(name => caches.delete(name)),
    );
}

async function cachedFetch(url: string | URL): Promise<Response> {
    const request = new Request(url);
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);
    if (cached) return cached;
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
}
class TypstLoader {
    private static instance: TypstLoader;
    private state: TypstLoaderState = {
        isLoading: false,
        isReady: false,
        error: null,
        hasInitialized: false,
    };

    private listeners = new Set<(state: TypstLoaderState) => void>();
    private initPromise: Promise<void> | null = null;
    static getInstance(): TypstLoader {
        if (!TypstLoader.instance) {
            TypstLoader.instance = new TypstLoader();
        }
        return TypstLoader.instance;
    }

    getState(): TypstLoaderState {
        return { ...this.state };
    }

    subscribe(listener: (state: TypstLoaderState) => void): () => void {
        this.listeners.add(listener);
        setTimeout(() => listener({ ...this.state }), 0);
        return () => {
            this.listeners.delete(listener);
        };
    }

    async initialize(): Promise<void> {
        if (this.initPromise) {
            return this.initPromise;
        }
        if (this.state.isReady && this.state.hasInitialized) {
            return Promise.resolve();
        }
        if (this.state.isLoading) {
            return this.initPromise || Promise.resolve();
        }
        this.setState({ isLoading: true, error: null });
        this.initPromise = this.performInitialization();
        try {
            await this.initPromise;
            this.setState({
                isLoading: false,
                isReady: true,
                error: null,
                hasInitialized: true,
            });
            window.$typst = $typst;
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to initialize Typst';
            this.setState({
                isLoading: false,
                isReady: false,
                error: errorMessage,
                hasInitialized: false,
            });
            throw error;
        }
        finally {
            this.initPromise = null;
        }
    }

    reset() {
        this.state = {
            isLoading: false,
            isReady: false,
            error: null,
            hasInitialized: false,
        };
        this.initPromise = null;
        this.notifyListeners();
    }

    async retry(): Promise<void> {
        this.setState({ hasInitialized: false, error: null });
        await this.initialize();
    }

    async registerPhoto(path: string, bytes: Uint8Array): Promise<void> {
        if (!this.state.isReady || !window.$typst) return;
        await window.$typst.mapShadow(path, bytes);
    }

    async unregisterPhoto(path: string): Promise<void> {
        if (!this.state.isReady || !window.$typst) return;
        await Promise.resolve(window.$typst.unmapShadow(path)).catch(() => undefined);
    }

    private setState(newState: Partial<TypstLoaderState>) {
        this.state = { ...this.state, ...newState };
        this.notifyListeners();
    }

    private notifyListeners() {
        setTimeout(() => {
            this.listeners.forEach((listener) => {
                try {
                    listener({ ...this.state });
                }
                catch (error) {
                    console.error('Error in typst loader listener:', error);
                }
            });
        }, 0);
    }

    private async performInitialization(): Promise<void> {
        try {
            console.log('Initializing Typst...');
            await purgeStaleCaches();
            $typst.setCompilerInitOptions({
                getModule: async () => {
                    const wasmUrl = new URL('@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm', import.meta.url);
                    const wasmResponse = await cachedFetch(wasmUrl);
                    if (!wasmResponse.ok) {
                        throw new Error(`Failed to fetch compiler WASM: ${wasmResponse.status}`);
                    }
                    return await wasmResponse.arrayBuffer();
                },
                beforeBuild: [disableDefaultFontAssets()],
            });
            $typst.setRendererInitOptions({
                getModule: async () => {
                    const wasmUrl = new URL('@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm', import.meta.url);
                    const wasmResponse = await cachedFetch(wasmUrl);
                    if (!wasmResponse.ok) {
                        throw new Error(`Failed to fetch renderer WASM: ${wasmResponse.status}`);
                    }
                    return await wasmResponse.arrayBuffer();
                },
            });
            const manifest = await loadFontManifest();
            await $typst.setFonts(buildLazyFonts(manifest));
            console.log(`Typst initialized with ${manifest.length} lazy fonts`);
        }
        catch (error) {
            console.error('Failed to initialize Typst:', error);
            throw error;
        }
    }
}
export const typstLoader = TypstLoader.getInstance();
