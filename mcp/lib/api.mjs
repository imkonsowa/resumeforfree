const REQUEST_TIMEOUT_MS = 120_000; // the dev server compiles routes on first hit

const apiError = (status, message) => Object.assign(new Error(message), { status });

/** Client for the app's own API, signed in as the local account from the config. */
export const createApi = (config) => {
    let token = null;
    let pendingLogin = null;

    const send = async (method, path, { body, form, auth, binary } = {}) => {
        const headers = {};
        if (auth) headers.cookie = `auth-token=${auth}`;
        if (body !== undefined) headers['content-type'] = 'application/json';

        let response;
        try {
            response = await fetch(`${config.baseUrl}${path}`, {
                method,
                headers,
                body: form ?? (body === undefined ? undefined : JSON.stringify(body)),
                // A redirect could carry the credentials away from the local address.
                redirect: 'error',
                signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
            });
        }
        catch (error) {
            const reason = error.cause?.code || error.cause?.message || error.name;
            throw apiError(0, `Cannot reach the app at ${config.baseUrl} (${reason}). `
                + 'Start it with "npm run dev"; if it uses another address, set RFF_BASE_URL.');
        }

        if (response.ok && binary) return Buffer.from(await response.arrayBuffer());

        const text = await response.text();
        let payload;
        try {
            payload = text ? JSON.parse(text) : null;
        }
        catch {
            payload = null;
        }
        if (!response.ok) {
            const message = payload?.statusMessage || payload?.message || text.slice(0, 300) || response.statusText;
            throw apiError(response.status, `${method} ${path} failed (${response.status}): ${message}`);
        }
        if (payload === null) {
            throw apiError(response.status, `${method} ${path} returned a non-JSON response`);
        }
        return payload;
    };

    const authenticate = async () => {
        const { email, password } = config;
        let session;
        try {
            session = await send('POST', '/api/auth/login', { body: { email, password } });
        }
        catch (error) {
            if (error.status !== 401) throw error;
            try {
                session = await send('POST', '/api/auth/register', { body: { email, password, name: 'Resume Agent' } });
            }
            catch (registerError) {
                if (/already exists/i.test(registerError.message)) {
                    throw apiError(401, `The account ${email} exists but its password does not match mcp/.env.`);
                }
                throw registerError;
            }
        }
        // Without a database binding the app hands out a mock user and nothing is persisted.
        if (String(session.user?.id).startsWith('dev-user-')) {
            throw apiError(500, 'The app has no database binding. Run "npx wrangler d1 migrations apply resume-builder-db --local", then restart it.');
        }
        token = session.token;
    };

    const login = () => {
        pendingLogin ??= authenticate().finally(() => {
            pendingLogin = null;
        });
        return pendingLogin;
    };

    const request = async (method, path, options = {}) => {
        if (!token) await login();
        try {
            return await send(method, path, { ...options, auth: token });
        }
        catch (error) {
            if (error.status !== 401) throw error;
            token = null;
            await login();
            return send(method, path, { ...options, auth: token });
        }
    };

    return { request };
};
