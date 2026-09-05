import type { FontManifestEntry, LazyFontSpec } from '~/types/typst';

const MANIFEST_URL = '/fonts/manifest.json';

const bytesCache = new Map<string, Uint8Array>();
let manifestPromise: Promise<FontManifestEntry[]> | null = null;

export const loadFontManifest = (): Promise<FontManifestEntry[]> => {
    if (!manifestPromise) {
        manifestPromise = fetch(MANIFEST_URL)
            .then((response) => {
                if (!response.ok) throw new Error(`Font manifest ${response.status}`);
                return response.json() as Promise<FontManifestEntry[]>;
            })
            .catch((error) => {
                manifestPromise = null;
                throw error;
            });
    }
    return manifestPromise;
};

export const warmFonts = async (urls: string[]): Promise<void> => {
    const pending = urls.filter(url => !bytesCache.has(url));
    if (pending.length === 0) return;
    await Promise.all(pending.map(async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Font ${url} -> ${response.status}`);
        bytesCache.set(url, new Uint8Array(await response.arrayBuffer()));
    }));
};

const fetchSync = (url: string): Uint8Array => {
    const xhr = new XMLHttpRequest();
    xhr.overrideMimeType('text/plain; charset=x-user-defined');
    xhr.open('GET', url, false);
    xhr.send(null);
    if (xhr.status === 200 && typeof xhr.response === 'string') {
        return Uint8Array.from(xhr.response, c => c.charCodeAt(0));
    }
    return new Uint8Array();
};

export const buildLazyFonts = (manifest: FontManifestEntry[]): LazyFontSpec[] =>
    manifest.map(entry => ({
        info: entry.info,
        conditions: entry.conditions,
        blob: () => {
            const cached = bytesCache.get(entry.url);
            if (cached) return cached;
            console.warn(`Font ${entry.url} was not pre-warmed; falling back to blocking fetch`);
            const bytes = fetchSync(entry.url);
            bytesCache.set(entry.url, bytes);
            return bytes;
        },
    }));

export const resolveFontUrls = (manifest: FontManifestEntry[], families: string[]): string[] => {
    const wanted = families.map(family => family.toLowerCase());
    return manifest
        .filter(entry => entry.info.some((info) => {
            const family = info.family.toLowerCase();
            return wanted.some(name => family === name || family.includes(name));
        }))
        .map(entry => entry.url);
};
