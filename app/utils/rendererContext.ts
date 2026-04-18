import type { TemplateRenderConfig, TranslateFunction } from '~/types/template';

export interface RendererContextInput {
    t: TranslateFunction;
    fontSize: number;
    config: TemplateRenderConfig;
    locale: string;
}

export class RendererContext {
    public readonly t: TranslateFunction;
    public readonly fontSize: number;
    public readonly config: TemplateRenderConfig;
    public readonly locale: string;

    constructor(input: RendererContextInput) {
        this.t = input.t;
        this.fontSize = input.fontSize;
        this.config = input.config;
        this.locale = input.locale;
    }
}
