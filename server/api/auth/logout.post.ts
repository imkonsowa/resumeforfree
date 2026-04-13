export default defineEventHandler((event) => {
    clearAuthCookies(event);
    return { success: true };
});
