# Resume For Free

Source code for **[resumeforfree.com](https://resumeforfree.com)** — a free resume builder. No accounts, no watermarks, no paywalls.

## How it works

You open the site, pick a template, fill in your details, and download a PDF. No account required. Your data stays in your browser's `localStorage` unless you opt into cloud sync.

PDFs are generated client-side using [Typst.ts](https://github.com/Myriad-Dreamin/typst.ts) (Typst compiled to WebAssembly). There's no server rendering your documents — the compiler runs in your browser.

## Features

- 2 templates (default, compact) with live preview
- Section reordering via drag-and-drop modal
- Import/export resume data as JSON
- Optional cloud sync — free account, up to 3 synced resumes
- English and Arabic with full RTL support (Noto Naskh Arabic font)
- Offline-capable PWA
- Cloudflare Turnstile on auth/contact forms (only third-party script)

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Nuxt 4 (Vue 3, SSR) |
| PDF engine | Typst.ts (WASM, client-side) |
| UI | shadcn-vue + Tailwind CSS v4 |
| State | Pinia with `pinia-plugin-persistedstate` (resume/settings stores) |
| i18n | `@nuxtjs/i18n` (`prefix_except_default`, EN + AR) |
| Hosting | Cloudflare Workers |
| Database | Cloudflare D1 (SQLite, for cloud sync) |
| Auth | `@tsndr/cloudflare-worker-jwt` + bcryptjs |

## Local development

```bash
git clone https://github.com/imkonsowa/resume-builder.git
cd resume-builder
npm install
npm run dev
```

### Cloud sync (optional)

```bash
make local-db       # Apply D1 migrations to local D1 (.wrangler/state/)
npm run dev
```

Server endpoints handle missing D1 gracefully — the app works without it.

### Tests

```bash
npm run test:unit   # Vitest — template parsing, utilities
npm run test:e2e    # Playwright — Typst WASM compilation in browser
```

## Architecture

Templates in `app/templates/` export a `parse()` function that takes resume data and returns a Typst markup string. That string is compiled to SVG (preview) or PDF (download) by `window.$typst` on the client.

Typst.ts is excluded from Vite `optimizeDeps` and gated behind `import.meta.client`. The server never touches it.

i18n translations are bundled (not lazy-loaded) for faster SSR. English at `/`, Arabic at `/ar/*`.

RTL uses explicit `[dir="rtl"]` CSS overrides in `app/assets/css/app.css` rather than logical properties.

## Contributing

1. Open an issue before large changes.
2. Run `npm run lint:fix` and tests before PRs.
3. UI copy must go in both `i18n/locales/en.json` and `i18n/locales/ar.json`.

## License

AGPL-3.0-or-later — see [LICENSE](LICENSE). All derivatives must be open source under the same license.

## Links

- [resumeforfree.com](https://resumeforfree.com)
- [GitHub Issues](https://github.com/imkonsowa/resume-builder/issues)
- [Typst](https://typst.app)
