# Resume For Free

Source for [resumeforfree.com](https://resumeforfree.com), a free resume builder.

## Stack

- Nuxt 4 and Nuxt UI
- Typst.ts, the Typst compiler built to WebAssembly, for the preview and PDF
- Pinia, persisted to localStorage
- @nuxtjs/i18n, nine languages including Arabic and Urdu (right to left)
- Cloudflare Workers, with D1 for accounts and cloud sync and R2 for photos and the Typst compiler

## How it works

You pick a template, fill in the forms and download a PDF. Resumes are kept in the browser, and signing in syncs them to D1.

Each template turns the resume data into Typst markup. The browser compiles that markup with the Typst WebAssembly compiler: to SVG for the live preview and to PDF for download. Nothing is rendered on the server.

The rendering code (templates, renderer, fonts and the translations it uses) is a Nuxt layer in `layers/core`, which the app extends.
