import { randomBytes } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const MCP_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const APP_ROOT = resolve(MCP_DIR, '..');
export const ENV_PATH = join(MCP_DIR, '.env');

const readEnvFile = () => {
    if (!existsSync(ENV_PATH)) return {};
    return Object.fromEntries(readFileSync(ENV_PATH, 'utf8')
        .split(/\r?\n/)
        .map(line => line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/))
        .filter(Boolean)
        .map(match => [match[1], match[2]]));
};

// Loopback, plus the names reserved for local development (RFC 6761).
const LOCAL_HOSTNAME = /^(localhost|127(\.\d{1,3}){3}|\[::1\]|.+\.localhost|.+\.test)$/;

/** The server registers an account and sends its password, so it only talks to this machine. */
const localUrl = (value) => {
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol) || !LOCAL_HOSTNAME.test(url.hostname)) {
        throw new Error(`RFF_BASE_URL must point to a local instance (localhost, 127.0.0.1, [::1], *.localhost or *.test), got "${value}".`);
    }
    return value.replace(/\/+$/, '');
};

export const loadConfig = () => {
    const file = readEnvFile();
    const get = key => process.env[key] || file[key];
    const baseUrl = localUrl(get('RFF_BASE_URL') || 'http://localhost:3000');

    // First run: create the local account the server will register in the app.
    if (!get('RFF_EMAIL') || !get('RFF_PASSWORD')) {
        file.RFF_EMAIL ||= 'agent@resumeforfree.local';
        file.RFF_PASSWORD ||= randomBytes(18).toString('base64url');
        writeFileSync(ENV_PATH, Object.entries(file).map(([k, v]) => `${k}=${v}`).join('\n') + '\n', { mode: 0o600 });
    }

    return {
        baseUrl,
        // Only shown to the user, for opening the web UI.
        publicUrl: (get('RFF_PUBLIC_URL') || baseUrl).replace(/\/+$/, ''),
        email: get('RFF_EMAIL'),
        password: get('RFF_PASSWORD'),
        outputDir: resolve(get('RFF_OUTPUT_DIR') || join(APP_ROOT, 'output')),
    };
};
