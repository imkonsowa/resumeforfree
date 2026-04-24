export interface Experience {
    company: string;
    position: string;
    location: string;
    companyUrl?: string;
    startDate: string;
    endDate: string;
    isPresent?: boolean;
    achievements: Array<{ text: string }>;
}
export interface Internship {
    company: string;
    position: string;
    location: string;
    companyUrl?: string;
    startDate: string;
    endDate: string;
    isPresent?: boolean;
    achievements: Array<{ text: string }>;
}
export interface Education {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    location: string;
    startDate: string;
    endDate: string;
    isPresent?: boolean;
    description: string;
    graduationScore?: string;
}
export interface Volunteering {
    organization: string;
    organizationUrl?: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    isPresent?: boolean;
    achievements: Array<{ text: string }>;
}
export interface SkillItem {
    title: string;
    description: string;
}
export interface SocialLink {
    platform: string;
    url: string;
    customLabel?: string;
}
export interface ProjectLink {
    url: string;
    label: string;
}
export interface Project {
    title: string;
    description: string;
    links: ProjectLink[];
    startDate: string;
    endDate: string;
    isPresent?: boolean;
    achievements: Array<{ text: string }>;
}
export interface Language {
    name: string;
    proficiency: string;
}
export interface Certificate {
    title: string;
    issuer: string;
    date: string;
    url?: string;
    description?: string;
}
export interface SectionOrder {
    summary: number;
    experience: number;
    internships: number;
    education: number;
    skills: number;
    volunteering: number;
    socialLinks: number;
    projects: number;
    languages: number;
    certificates: number;
}
export interface SectionPlacement {
    skills: 'left' | 'right';
    projects: 'left' | 'right';
    volunteering: 'left' | 'right';
    languages: 'left' | 'right';
    certificates: 'left' | 'right';
}
export interface SectionHeaders {
    personalInfo: string;
    profile: string;
    info: string;
    socialLinks: string;
    projects: string;
    languages: string;
    experience: string;
    internships: string;
    education: string;
    skills: string;
    volunteering: string;
    certificates: string;
}
export interface ResumeData {
    version: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    position: string;
    location: string;
    summary: string;
    experiences: Experience[];
    internships: Internship[];
    education: Education[];
    volunteering: Volunteering[];
    skills: SkillItem[];
    socialLinks: SocialLink[];
    projects: Project[];
    languages: Language[];
    certificates: Certificate[];
    technicalSkills: string;
    softSkills: string;
    sectionOrder: SectionOrder;
    sectionHeaders: SectionHeaders;
    sectionPlacement: SectionPlacement;
}
export interface Resume {
    id: string;
    name: string;
    language: string;
    data: ResumeData;
    settings: ResumeSettings;
    createdAt: string;
    updatedAt: string;
    serverId?: string;
}
export interface MultiResumeState {
    resumes: Record<string, Resume>;
    activeResumeId: string | null;
    nextId: number;
}
export interface ImportResumePreview {
    name: string;
    language: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    settings?: ResumeSettings;
    isDuplicate: boolean;
    itemCount: number;
}
export interface UserSettings {
    locale: string;
    showDownloadMenu?: boolean;
    showFontMenu?: boolean;
    showTemplateMenu?: boolean;
}
export interface ResumeSettings {
    selectedFont: string;
    selectedTemplate: string;
    fontSize: number;
    sectionCollapsed: Record<string, boolean>;
    isRawMode: boolean;
}
export const defaultResumeData: ResumeData = {
    version: 'v1',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    location: '',
    summary: '',
    experiences: [],
    internships: [],
    education: [],
    volunteering: [],
    skills: [],
    socialLinks: [],
    projects: [],
    languages: [],
    certificates: [],
    technicalSkills: '',
    softSkills: '',
    sectionOrder: {
        summary: 0,
        education: 1,
        experience: 2,
        internships: 3,
        skills: 4,
        volunteering: 5,
        socialLinks: 6,
        projects: 7,
        languages: 8,
        certificates: 9,
    },
    sectionHeaders: {} as SectionHeaders,
    sectionPlacement: {
        skills: 'left',
        projects: 'left',
        volunteering: 'left',
        languages: 'right',
        certificates: 'right',
    },
};
export const defaultUserSettings: UserSettings = {
    locale: 'en',
    showDownloadMenu: false,
    showFontMenu: false,
    showTemplateMenu: false,
};
export const defaultResumeSettings: ResumeSettings = {
    selectedFont: 'Calibri',
    selectedTemplate: 'compact',
    fontSize: 12,
    isRawMode: false,
    sectionCollapsed: {
        personal: false,
        experience: true,
        internships: true,
        education: true,
        skills: true,
        volunteering: true,
        projects: true,
        languages: true,
        certificates: true,
    },
};
/**
 * Builds a complete ResumeSettings from a user's legacy settings JSON
 * (pre-refactor shape where font/template/etc lived on user_settings).
 * Any missing field falls back to `defaultResumeSettings`.
 */
export const resumeSettingsFromLegacy = (legacy: Partial<ResumeSettings> | null | undefined): ResumeSettings => {
    const src = legacy || {};
    return {
        selectedFont: src.selectedFont || defaultResumeSettings.selectedFont,
        selectedTemplate: src.selectedTemplate || defaultResumeSettings.selectedTemplate,
        fontSize: src.fontSize ?? defaultResumeSettings.fontSize,
        sectionCollapsed: src.sectionCollapsed && Object.keys(src.sectionCollapsed).length
            ? { ...src.sectionCollapsed }
            : { ...defaultResumeSettings.sectionCollapsed },
        isRawMode: src.isRawMode ?? defaultResumeSettings.isRawMode,
    };
};

// Language-specific font configurations
export const availableFonts = {
    en: [
        { name: 'Calibri', family: 'Calibri' },
        { name: 'Geist', family: 'Geist' },
        { name: 'Roboto', family: 'Roboto' },
    ],
    ar: [
        { name: 'Naskh', family: 'Naskh' },
    ],
};

// Function to get fonts for current language
export const getFontsForLanguage = (language: string) => {
    return availableFonts[language as keyof typeof availableFonts] || availableFonts.en;
};

// Default font for each language
export const getDefaultFontForLanguage = (language: string) => {
    const fonts = getFontsForLanguage(language);
    return fonts[0]?.family || 'Calibri';
};
