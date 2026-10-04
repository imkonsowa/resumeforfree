import type { SectionStyle, TemplateRenderConfig, TranslateFunction } from '#layers/core/app/types/template';
import { resolveFontFamily, resumeSettingsFromLegacy } from '#layers/core/app/types/resume';
import type { PhotoShape, ResumeSettings, SectionHeaders } from '#layers/core/app/types/resume';
import { ICON_BASELINE, ICON_GAP, ICON_HEIGHT, isHexColor, LINK_COLOR, typstColor } from './typstUtils';
import { escapeTypstString } from './stringUtils';
import { sectionIconSvg } from './sectionIcons';

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
        const headingColor = isHexColor(this.settings.headingColor) ? this.settings.headingColor : input.sectionStyle?.headerColor;
        this.sectionStyle = {
            headerUnderline: this.settings.showSectionHeaderLine,
            ...(input.sectionStyle ?? {}),
            headerColor: headingColor,
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

    accentColor(templateDefault: string): string {
        return isHexColor(this.settings.accentColor) ? typstColor(this.settings.accentColor) : templateDefault;
    }

    get linkColor(): string {
        return this.accentColor(LINK_COLOR);
    }

    sectionIcon(section: keyof SectionHeaders): string {
        if (!this.settings.showSectionIcons) return '';
        const svg = sectionIconSvg(section, this.sectionStyle.headerColor ?? '#000000');
        return `#box(height: ${ICON_HEIGHT}, baseline: ${ICON_BASELINE}, image(bytes("${escapeTypstString(svg)}"), format: "svg"))#h(${ICON_GAP})`;
    }
}
