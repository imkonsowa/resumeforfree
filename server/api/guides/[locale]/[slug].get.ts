export default defineEventHandler(async (event) => {
    const locale = requireTemplateLocale(getRouterParam(event, 'locale'));
    return loadGuideDetail(getRouterParam(event, 'slug') ?? '', locale);
});
