export default defineEventHandler(async (event) => {
    setResponseHeaders(event, {
        'content-type': 'text/plain; charset=utf-8',
        'cache-control': 'public, max-age=3600',
    });
    return buildLlmsText();
});
