export interface TypstLoaderState {
    isLoading: boolean;
    isReady: boolean;
    error: string | null;
    hasInitialized: boolean;
}

export interface TypstFontVariant {
    style: string;
    weight: number;
    stretch: number;
}

export interface TypstFontFace {
    family: string;
    variant: TypstFontVariant;
    flags: string;
    coverage: number[];
}

export interface TypstFontCondition {
    t: string;
    v: string;
}

export interface FontManifestEntry {
    url: string;
    bytes: number;
    info: TypstFontFace[];
    conditions: TypstFontCondition[];
}

export interface LazyFontSpec {
    info: TypstFontFace[];
    conditions: TypstFontCondition[];
    blob: (index: number) => Uint8Array;
}
