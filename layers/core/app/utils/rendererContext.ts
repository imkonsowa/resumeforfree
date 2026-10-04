import type { SectionStyle, TemplateRenderConfig, TranslateFunction } from '#layers/core/app/types/template';
import { resolveFontFamily, resumeSettingsFromLegacy } from '#layers/core/app/types/resume';
import type { PhotoShape, ResumeSettings } from '#layers/core/app/types/resume';

export interface RendererContextInput {
    t: TranslateFunction;
    locale: string;
    settings?: Partial<ResumeSettings>;
    config: TemplateRenderConfig;
    sectionStyle?: SectionStyle;
}

export class RendererContext {
    public readonly t: TranslateFunction;
    public readonly locale: string;
    public readonly settings: ResumeSettings;
    public readonly config: TemplateRenderConfig;
    public readonly sectionStyle: SectionStyle;

    constructor(input: RendererContextInput) {
        this.t = input.t;
        this.locale = input.locale;
        this.settings = resumeSettingsFromLegacy(input.settings);
        this.config = input.config;
        this.sectionStyle = {
            headerUnderline: this.settings.showSectionHeaderLine,
            ...(input.sectionStyle ?? {}),
        };
    }

    get font(): string {
        return resolveFontFamily(this.settings.selectedFont, this.locale);
    }

    get fontSize(): number {
        return this.settings.fontSize;
    }

    get photoShape(): PhotoShape {
        return this.settings.photoShape;
    }
}
