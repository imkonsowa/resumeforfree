# MCP server

Lets an AI assistant that speaks the [Model Context Protocol](https://modelcontextprotocol.io)
build resumes in a local instance of this app: create and edit them, change templates and design,
look at rendered pages and export the PDF.

It uses the app's own HTTP API, so everything it changes also shows up in the web UI. Pages and
PDFs are rendered in Node with the templates, translations and fonts from `layers/core`, compiled
by the native build of the same Typst.ts release the browser uses.

It only connects to a local instance.

## Set up

From the repository root:

```bash
npm install

# A secret for local sign-in (appends to .env)
node -e "require('fs').appendFileSync('.env','\nJWT_SECRET='+require('crypto').randomBytes(48).toString('hex')+'\n')"

# The local database
npx wrangler d1 migrations apply resume-builder-db --local

npm run dev
```

Skip the secret if your `.env` already has `JWT_SECRET`. The web preview also needs the compiler in
local R2 (`npm run wasm:upload -- --local`); the MCP server does not.

Then install the server:

```bash
cd mcp
npm install
```

## Connect a client

The server speaks stdio. Register it with your client using the absolute path to `server.mjs`, for
example:

```json
{
    "mcpServers": {
        "resumeforfree": {
            "command": "node",
            "args": ["/path/to/resumeforfree/mcp/server.mjs"]
        }
    }
}
```

On first use it writes `mcp/.env` (git-ignored) with a generated account and registers that account
in the local app. Sign in on the web UI with it to see the same resumes, and reload the page after
changes made through the server.

## Settings

Environment variables, or lines in `mcp/.env`:

| Variable | Default | Meaning |
|----------|---------|---------|
| `RFF_BASE_URL` | `http://localhost:3000` | The running app. Must be local: `localhost`, `127.0.0.1`, `[::1]`, `*.localhost` or `*.test` |
| `RFF_PUBLIC_URL` | same as `RFF_BASE_URL` | Address shown for opening the web UI |
| `RFF_EMAIL`, `RFF_PASSWORD` | generated | Account the server signs in with |
| `RFF_OUTPUT_DIR` | `output/` in the repository | Where exports are written (git-ignored) |

## Tools

| Tool | Does |
|------|------|
| `get_status`, `get_schema` | App state; accepted fields, templates, fonts, settings |
| `list_resumes`, `get_resume` | Read |
| `create_resume`, `update_resume`, `duplicate_resume`, `delete_resume` | Manage resumes, template and design |
| `update_personal_info` | Name, contacts, headline, summary |
| `add_section_item`, `update_section_item`, `remove_section_item`, `set_section_items` | Experience, education, skills and other sections |
| `set_photo`, `remove_photo` | Photo (resized to fit the app's limit) |
| `preview_resume` | Page images |
| `export_resume`, `import_resumes` | PDF, Typst source, JSON backup and restore |

The app allows 3 resumes per account.

## Test

With the app running, inside `mcp/`:

```bash
npm test
```

It calls the tools over the real protocol, creating temporary resumes and deleting only those. The
account needs two free resume slots; to use a separate one, set `RFF_EMAIL`.
