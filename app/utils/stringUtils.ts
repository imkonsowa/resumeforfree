export function escapeTypstText(text: string): string {
    if (!text) return '';
    let cleaned = text.toString().trim();
    cleaned = cleaned
        .replace(/[""]/g, '"')
        .replace(/['']/g, '\'');
    return cleaned
        .replace(/\\/g, '\\\\')
        .replace(/\$/g, '\\$')
        .replace(/"/g, '\\"')
        .replace(/#/g, '\\#')
        .replace(/\{/g, '\\{')
        .replace(/\}/g, '\\}')
        .replace(/\[/g, '\\[')
        .replace(/\]/g, '\\]')
        .replace(/</g, '\\<')
        .replace(/>/g, '\\>')
        .replace(/~/g, '\\~')
        .replace(/\^/g, '\\^')
        .replace(/_/g, '\\_')
        .replace(/@/g, '\\@')
        .replace(/\*/g, '\\*');
}

export function describeTypstError(error: unknown): string {
    const raw = error instanceof Error ? error.message : String(error ?? '');
    if (!raw) return '';

    const messages = [...raw.matchAll(/message:\s*"((?:[^"\\]|\\.)*)"/g)]
        .map(match => match[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\'))
        .filter(Boolean);

    if (messages.length === 0) return raw.slice(0, 300);
    return [...new Set(messages)].slice(0, 3).join('; ');
}

export function escapeTypstString(text: string): string {
    if (!text) return '';
    let cleaned = text.toString().trim();
    cleaned = cleaned
        .replace(/[""]/g, '"')
        .replace(/['']/g, '\'');
    return cleaned
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"');
}
