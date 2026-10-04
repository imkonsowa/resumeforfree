export default defineEventHandler(async (event) => {
    const locale = requireTemplateLocale(getRouterParam(event, 'locale'));
    return listTemplateSummaries(locale);
});
