# core layer

The resume engine: templates, the Typst renderer, fonts, the compiler WASM route, and the translations the renderer uses. Output is Typst markup compiled to SVG or PDF in the browser.

This site consumes it as a local layer. Other Nuxt apps can consume it with `extends`, pinned to a commit:

```ts
export default defineNuxtConfig({
    extends: ['github:imkonsowa/resumeforfree/layers/core#<commit-sha>'],
});
```

## What a consuming app must provide

- **Modules:** `@nuxtjs/i18n`. The layer declares its locale files but does not register the module.
- **Dependencies:** `@myriaddreamin/typst.ts`, `@myriaddreamin/typst-ts-web-compiler` and `@myriaddreamin/typst-ts-renderer` at the same version as this repo (currently `0.7.0`), and `@cloudflare/workers-types` for types. The compiler WASM in R2 is keyed by that version.
- **Cloudflare bindings:** an R2 binding named `WASM` holding `typst-ts-web-compiler-<version>.wasm`. Upload it with the layer's script from the consuming app's directory: `node <layer>/scripts/upload-wasm.mjs --local` (or `--remote`).
- **Locales:** the layer adds all nine locale codes (`en`, `ar`, `tr`, `fr`, `de`, `it`, `zh`, `ur`, `hi`) to the app's i18n config.

## Conventions

- Import layer code through the named alias `#layers/core/...` (it resolves to this folder). Inside the layer, never use `~/`, `@/` or `~~/`; they resolve against the consuming app.
- The 23 translation keys in `i18n/locales/*.json` are owned by this layer. Do not redefine them in an app's locale files: the app's copy would silently override the layer's (`tests/unit/i18nLayerKeys.test.ts` guards this in the site).
- `tests/unit/__golden__/` holds the Typst output for every template and locale. A change to rendering must update those snapshots deliberately. Snapshots depend on Node's ICU data for dates, so run them on Node 22.

## Scripts

- `scripts/generate-font-manifest.mjs`: regenerates `public/fonts/manifest.json` after adding or replacing a font (`npm run fonts:manifest` in the site).
- `scripts/upload-wasm.mjs`: uploads the compiler WASM to R2 (`npm run wasm:upload` in the site). Run it after bumping `@myriaddreamin/typst.ts`.
