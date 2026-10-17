import en from '~~/i18n/locales/en.json';

const SITE = 'https://resumeforfree.com';
const REPO = 'https://github.com/imkonsowa/resumeforfree';

const languageName = new Intl.DisplayNames(['en'], { type: 'language' });

const intro = `# Resume For Free

> Free, open-source resume builder. Build a resume in the browser and download an ATS-friendly PDF with no account, no watermark and no paywall. Resume data stays in the browser unless the user turns on cloud sync.

- PDFs are typeset in the browser with Typst (WebAssembly), so the text is real, selectable and readable by applicant tracking systems.
- Layouts: ATS Friendly, Compact, Default (two columns) and Simple.
- Languages: ${TEMPLATE_LOCALES.map(locale => languageName.of(locale)).join(', ')}. Arabic and Urdu resumes render right to left.
- An optional free account adds cloud sync for up to 3 resumes and API tokens for agents.`;

const agentApi = `## Agent API

An agent can read and edit a user's cloud resumes over HTTP.

1. The user signs in, opens Profile, and creates a token under API Tokens. Tokens expire after 24 hours by default.
2. Send it as \`Authorization: Bearer <token>\` to ${SITE}/api.
3. \`GET /api/resumes/schema\` returns every route, section and field. \`GET /api/resumes\` lists the user's resumes.
4. Edit with \`PATCH /api/resumes/{resumeId}/personal\` and \`/api/resumes/{resumeId}/sections/{section}\` (GET, PUT, POST, and PATCH or DELETE on \`/{index}\`).

Only resumes saved to the cloud are reachable. Resumes kept only in the browser are not.`;

const templateLinks = (templates: TemplateSummary[]) =>
    templates.map(template => `- [${template.title}](${SITE}/templates/${template.slug}): ${template.description}`).join('\n');

const guideLinks = (guides: GuideSummary[]) =>
    guides.map(guide => `- [${guide.title}](${SITE}/guides/${guide.slug}): ${guide.description}`).join('\n');

const faqMarkdown = (items: Array<{ q: string; a: string }>) =>
    items.map(item => `### ${item.q}\n\n${item.a}`).join('\n\n');

const siteFaq = () => Object.values(en.qa.questions).map(item => ({ q: item.question, a: item.answer }));

export const buildLlmsText = async (): Promise<string> => {
    const [templates, guides] = await Promise.all([listTemplateSummaries('en'), listGuideSummaries('en')]);
    const otherLanguages = TEMPLATE_LOCALES
        .filter(locale => locale !== 'en')
        .map(locale => `- ${languageName.of(locale)}: [home](${SITE}/${locale}), [builder](${SITE}/${locale}/builder), [templates](${SITE}/${locale}/templates), [guides](${SITE}/${locale}/guides)`)
        .join('\n');

    return `${intro}

## Main pages

- [Resume builder](${SITE}/builder): the editor with a live PDF preview.
- [Resume templates](${SITE}/templates): profession templates with a sample resume, example bullets and tips.
- [Guides](${SITE}/guides): how to write an ATS-friendly resume and CVs for specific countries.
- [FAQ](${SITE}/qa): pricing, privacy, PDF export, languages and cloud sync.
- [Source code](${REPO}): the full application.

## Resume templates

${templateLinks(templates)}

## Guides

${guideLinks(guides)}

${agentApi}

## Other languages

${otherLanguages}

## Optional

- [Full text](${SITE}/llms-full.txt): the FAQ, every English guide and every template guide in one file.
`;
};

const fullGuide = async (guide: GuideSummary) => `# ${guide.title}

Source: ${SITE}/guides/${guide.slug}

> ${guide.description}

${await loadGuideMarkdownBody(guide.slug, 'en')}

## Frequently asked questions

${faqMarkdown(guide.faq)}`;

export const buildLlmsFullText = async (): Promise<string> => {
    const [templates, guideSummaries] = await Promise.all([listTemplateSummaries('en'), listGuideSummaries('en')]);
    const guides = await Promise.all(guideSummaries.map(fullGuide));
    const templateGuides = await Promise.all(templates.map(async (template) => {
        const body = await loadTemplateMarkdownBody(template.slug, 'en');
        return `# ${template.title}

Source: ${SITE}/templates/${template.slug}

> ${template.description}

${body}

## Frequently asked questions

${faqMarkdown(template.faq)}`;
    }));

    return `${intro}

${agentApi}

## Frequently asked questions

${faqMarkdown(siteFaq())}

${guides.join('\n\n')}

${templateGuides.join('\n\n')}
`;
};
