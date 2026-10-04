export default defineEventHandler(async (event) => {
    const locale = requireTemplateLocale(getRouterParam(event, 'locale'));
    return loadTemplateDetail(getRouterParam(event, 'slug') ?? '', locale);
});
