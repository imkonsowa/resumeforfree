import type { TemplateRenderConfig, TranslateFunction } from '~/types/template';

export class RendererContext {
    constructor(
        public readonly t: TranslateFunction,
        public readonly fontSize: number,
        public readonly config: TemplateRenderConfig,
        public readonly locale: string,
    ) {}
}
