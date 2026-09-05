import { execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BUCKET = 'resume-builder-wasm';

const version = JSON.parse(
    readFileSync(resolve(root, 'node_modules/@myriaddreamin/typst.ts/package.json'), 'utf8'),
).version;

const source = resolve(root, 'node_modules/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm');
const key = `typst-ts-web-compiler-${version}.wasm`;
const mib = (statSync(source).size / 1048576).toFixed(1);

const targets = process.argv.includes('--local')
    ? ['--local']
    : process.argv.includes('--remote')
        ? ['--remote']
        : ['--local', '--remote'];

for (const target of targets) {
    console.log(`Uploading ${key} (${mib} MiB) to ${BUCKET} ${target}`);
    execFileSync('npx', [
        'wrangler', 'r2', 'object', 'put', `${BUCKET}/${key}`,
        '--file', source,
        '--content-type', 'application/wasm',
        target,
    ], { stdio: 'inherit', cwd: root });
}

console.log(`Done. Served at /wasm/${key}`);
