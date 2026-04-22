const SITE_URL = 'https://resumeforfree.com';
const SITE_NAME = 'Resume For Free';
const LOGO_URL = `${SITE_URL}/icon.svg`;

export const createOrganizationStructuredData = () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    'name': SITE_NAME,
    'url': SITE_URL,
    'logo': {
        '@type': 'ImageObject',
        'url': LOGO_URL,
        'width': 512,
        'height': 512,
    },
    'description': 'Free, privacy-first online resume builder. Build and download unlimited resumes without accounts, watermarks, or tracking.',
});

export const createWebsiteStructuredData = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    'name': SITE_NAME,
    'alternateName': 'Resume Builder',
    'description': 'Build professional resumes for free. No servers, no registration, no payments. Unlimited downloads and resumes with complete privacy.',
    'url': SITE_URL,
    'inLanguage': ['en', 'ar'],
    'publisher': {
        '@id': `${SITE_URL}/#organization`,
    },
});

export const createSoftwareApplicationStructuredData = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${SITE_URL}/#webapp`,
    'name': SITE_NAME,
    'alternateName': 'Free Resume Builder',
    'description': 'Free online resume builder with privacy-first approach. Create professional resumes without registration, ads, or watermarks.',
    'url': SITE_URL,
    'applicationCategory': 'BusinessApplication',
    'applicationSubCategory': 'Resume Builder',
    'operatingSystem': 'Web Browser',
    'browserRequirements': 'Requires JavaScript. Works offline after first load.',
    'softwareVersion': '1.0',
    'isAccessibleForFree': true,
    'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD',
        'availability': 'https://schema.org/InStock',
    },
    'featureList': [
        'Free resume builder - no payments, ever',
        'No registration required',
        'Unlimited resume downloads',
        'Unlimited number of resumes',
        'PDF export via Typst',
        'Real-time preview',
        'Data stays on your device',
        'Works offline',
        'English and Arabic (RTL) support',
    ],
    'screenshot': `${SITE_URL}/og-image.png`,
    'publisher': {
        '@id': `${SITE_URL}/#organization`,
    },
});

export const createBreadcrumbStructuredData = (items: Array<{ name: string; url: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': item.url,
    })),
});

export const createFAQStructuredData = (faqs: Array<{ question: string; answer: string }>) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer,
        },
    })),
});
