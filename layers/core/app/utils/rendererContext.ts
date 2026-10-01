import type { SectionStyle, TemplateRenderConfig, TranslateFunction } from '#layers/core/app/types/template';
import type { PhotoShape } from '#layers/core/app/types/resume';

export interface RendererContextInput {
    t: TranslateFunction;
    fontSize: number;
    config: TemplateRenderConfig;
    locale: string;
    photoShape: PhotoShape;
    sectionStyle?: SectionStyle;
}

export class RendererContext {
    public readonly t: TranslateFunction;
    public readonly fontSize: number;
    public readonly config: TemplateRenderConfig;
    public readonly locale: string;
    public readonly photoShape: PhotoShape;
    public readonly sectionStyle: SectionStyle;

    constructor(input: RendererContextInput) {
        this.t = input.t;
        this.fontSize = input.fontSize;
        this.config = input.config;
        this.locale = input.locale;
        this.photoShape = input.photoShape;
        this.sectionStyle = {
            ...(input.sectionStyle ?? {}),
            fontSize: input.sectionStyle?.fontSize ?? input.fontSize,
        };
    }
}
