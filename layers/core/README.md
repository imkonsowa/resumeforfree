# core layer

The resume rendering engine as a Nuxt layer: templates, the Typst renderer, fonts, the route that serves the compiler WebAssembly, and the translations the renderer uses.

## Stack

- Typst.ts (`@myriaddreamin/typst.ts` 0.7.0)
- @nuxtjs/i18n, provided by the app that extends the layer
- Cloudflare R2, through a `WASM` binding that holds the compiler

## How it works

Templates turn resume data into Typst markup, and `useResumeGenerator` compiles it in the browser to SVG or PDF.

Apps use it with `extends`, either as a local layer or pinned to a commit with `github:imkonsowa/resumeforfree/layers/core#<commit>`, and import it through `#layers/core/...`. The renderer's translation keys are defined only here, so apps must not redefine them.
