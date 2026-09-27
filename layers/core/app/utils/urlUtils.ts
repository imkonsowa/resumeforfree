const HOST_LABEL_RULES: Array<{ match: RegExp; label: string }> = [
    { match: /(^|\.)github\.com$/i, label: 'GitHub' },
    { match: /(^|\.)gitlab\.com$/i, label: 'GitLab' },
    { match: /(^|\.)bitbucket\.org$/i, label: 'Bitbucket' },
    { match: /(^|\.)medium\.com$/i, label: 'Medium' },
    { match: /(^|\.)dev\.to$/i, label: 'Dev.to' },
    { match: /(^|\.)youtube\.com$/i, label: 'YouTube' },
    { match: /(^|\.)youtu\.be$/i, label: 'YouTube' },
    { match: /(^|\.)vercel\.app$/i, label: 'Live Demo' },
    { match: /(^|\.)netlify\.app$/i, label: 'Live Demo' },
    { match: /(^|\.)pages\.dev$/i, label: 'Live Demo' },
    { match: /(^|\.)herokuapp\.com$/i, label: 'Live Demo' },
    { match: /(^|\.)linkedin\.com$/i, label: 'LinkedIn' },
    { match: /(^|\.)twitter\.com$/i, label: 'Twitter' },
    { match: /(^|\.)x\.com$/i, label: 'Twitter' },
];

export const inferLabelFromUrl = (url: string): string => {
    if (!url) return 'Link';
    try {
        const parsed = new URL(url.trim());
        const host = parsed.hostname.toLowerCase();
        for (const rule of HOST_LABEL_RULES) {
            if (rule.match.test(host)) return rule.label;
        }
        return 'Link';
    }
    catch {
        return 'Link';
    }
};
