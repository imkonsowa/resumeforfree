import type { TemplateRenderConfig, TranslateFunction } from '~/types/template';
import type { PhotoShape } from '~/types/resume';

export interface RendererContextInput {
    t: TranslateFunction;
    fontSize: number;
    config: TemplateRenderConfig;
    locale: string;
    photoShape: PhotoShape;
}

export class RendererContext {
    public readonly t: TranslateFunction;
    public readonly fontSize: number;
    public readonly config: TemplateRenderConfig;
    public readonly locale: string;
    public readonly photoShape: PhotoShape;

    constructor(input: RendererContextInput) {
        this.t = input.t;
        this.fontSize = input.fontSize;
        this.config = input.config;
        this.locale = input.locale;
        this.photoShape = input.photoShape;
    }
}
