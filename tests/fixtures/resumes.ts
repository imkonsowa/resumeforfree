import type { ResumeData } from '~/types/resume';

/**
 * Test fixtures for various resume scenarios
 * Each fixture tests different edge cases for Typst rendering
 */

// Base resume with minimal data
export const minimalResume: ResumeData = {
    version: 'v1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+1 555 123 4567',
    position: 'Software Engineer',
    location: 'New York, USA',
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
    sectionHeaders: {} as ResumeData['sectionHeaders'],
    sectionPlacement: {
        skills: 'left',
        projects: 'left',
        volunteering: 'left',
        languages: 'right',
        certificates: 'right',
    },
};

// Resume with special characters that need escaping
export const specialCharsResume: ResumeData = {
    ...minimalResume,
    firstName: 'John#',
    lastName: 'Doe$',
    position: 'C# Developer',
    summary: 'Expert in C#, F#, and .NET development. Worked with $100M+ projects.',
    skills: [
        { title: 'Languages', description: 'C#, F#, TypeScript, JavaScript, C++' },
        { title: 'Frameworks', description: '.NET, ASP.NET MVC, Entity Framework' },
        { title: 'Tools', description: 'Git, Docker, Azure DevOps' },
    ],
    projects: [
        {
            title: 'Operators Logic App - C#, Windows App',
            url: '',
            description: 'Developed automated logical operations for Issue #123',
        },
        {
            title: 'E-Commerce Platform (Revenue: $500K+)',
            url: 'https://example.com',
            description: 'Built with C# & React. Handles ~10,000 transactions/day.',
        },
    ],
    experiences: [
        {
            company: 'Tech Corp',
            position: 'Senior C# Developer',
            location: 'San Francisco',
            companyUrl: 'https://techcorp.com',
            startDate: '2020-01',
            endDate: '',
            isPresent: true,
            achievements: [
                { text: 'Led team of 5+ developers on C# projects' },
                { text: 'Reduced costs by $50,000/year through optimization' },
                { text: 'Implemented feature #42 using .NET 8' },
            ],
        },
    ],
};

// Resume with Typst markup characters
export const typstMarkupResume: ResumeData = {
    ...minimalResume,
    firstName: 'Test*User',
    lastName: 'With_Underscore',
    position: 'Developer [Senior]',
    summary: 'I work with *bold* text and _italic_ formatting. Also {curly} and <angle> brackets.',
    skills: [
        { title: 'Special~Chars', description: 'Testing ^caret and ~tilde characters' },
        { title: 'Brackets', description: 'Using [square] and {curly} brackets' },
    ],
    projects: [
        {
            title: 'Project with "quotes" inside',
            url: '',
            description: 'Description with backslash \\ and more "quotes"',
        },
    ],
};

// Resume with Unicode and international characters
export const unicodeResume: ResumeData = {
    ...minimalResume,
    firstName: 'Jose',
    lastName: 'Garcia',
    position: 'Desarrollador',
    location: 'Madrid, Espana',
    summary: 'Desarrollador con experiencia en tecnologias web.',
    skills: [
        { title: 'Idiomas', description: 'Espanol (nativo), English, Francais' },
    ],
};

// Arabic RTL resume
export const arabicResume: ResumeData = {
    ...minimalResume,
    firstName: 'Ahmed',
    lastName: 'Hassan',
    position: 'Software Engineer',
    location: 'Cairo, Egypt',
    summary: 'Full-Stack Developer with experience in web technologies',
    skills: [
        { title: 'Languages', description: 'JavaScript, TypeScript, Python' },
    ],
};

// Full comprehensive resume
export const fullResume: ResumeData = {
    version: 'v1',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 555 987 6543',
    position: 'Full Stack Developer',
    location: 'Austin, TX',
    summary: 'Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.',
    experiences: [
        {
            company: 'TechStart Inc.',
            position: 'Senior Developer',
            location: 'Austin, TX',
            companyUrl: 'https://techstart.com',
            startDate: '2020-03',
            endDate: '',
            isPresent: true,
            achievements: [
                { text: 'Led development of microservices architecture' },
                { text: 'Mentored team of 4 junior developers' },
                { text: 'Improved system performance by 40%' },
            ],
        },
        {
            company: 'WebDev Co.',
            position: 'Developer',
            location: 'Houston, TX',
            companyUrl: '',
            startDate: '2017-06',
            endDate: '2020-02',
            isPresent: false,
            achievements: [
                { text: 'Built RESTful APIs using Node.js' },
                { text: 'Developed React frontend applications' },
            ],
        },
    ],
    internships: [
        {
            company: 'StartupXYZ',
            position: 'Software Intern',
            location: 'Remote',
            companyUrl: '',
            startDate: '2016-05',
            endDate: '2016-08',
            isPresent: false,
            achievements: [
                { text: 'Assisted in mobile app development' },
            ],
        },
    ],
    education: [
        {
            institution: 'University of Texas',
            degree: 'Bachelor of Science',
            fieldOfStudy: 'Computer Science',
            location: 'Austin, TX',
            startDate: '2013-08',
            endDate: '2017-05',
            isPresent: false,
            description: 'Focused on software engineering and distributed systems',
            graduationScore: '3.8 GPA',
        },
    ],
    volunteering: [
        {
            organization: 'Code for Good',
            position: 'Volunteer Developer',
            location: 'Austin, TX',
            startDate: '2019-01',
            endDate: '',
            isPresent: true,
            achievements: [
                { text: 'Built websites for local nonprofits' },
            ],
        },
    ],
    skills: [
        { title: 'Frontend', description: 'React, Vue.js, TypeScript, HTML, CSS' },
        { title: 'Backend', description: 'Node.js, Python, Go, PostgreSQL' },
        { title: 'DevOps', description: 'Docker, Kubernetes, AWS, CI/CD' },
    ],
    socialLinks: [
        { platform: 'linkedin', url: 'https://linkedin.com/in/sarahjohnson', customLabel: '' },
        { platform: 'github', url: 'https://github.com/sarahjohnson', customLabel: '' },
    ],
    projects: [
        {
            title: 'Open Source CLI Tool',
            url: 'https://github.com/sarahjohnson/cli-tool',
            description: 'A command-line tool for automating development workflows',
        },
        {
            title: 'Personal Blog',
            url: 'https://sarahjohnson.dev',
            description: 'Technical blog about web development best practices',
        },
    ],
    languages: [
        { name: 'English', proficiency: 'Native' },
        { name: 'Spanish', proficiency: 'Intermediate' },
    ],
    certificates: [
        {
            title: 'AWS Solutions Architect',
            issuer: 'Amazon Web Services',
            date: '2022-06',
            url: 'https://aws.amazon.com/certification',
            description: 'Professional level certification',
        },
    ],
    technicalSkills: '',
    softSkills: '',
    sectionOrder: {
        summary: 0,
        experience: 1,
        education: 2,
        internships: 3,
        skills: 4,
        projects: 5,
        volunteering: 6,
        socialLinks: 7,
        languages: 8,
        certificates: 9,
    },
    sectionHeaders: {} as ResumeData['sectionHeaders'],
    sectionPlacement: {
        skills: 'left',
        projects: 'left',
        volunteering: 'left',
        languages: 'right',
        certificates: 'right',
    },
};

// Resume with empty/null edge cases
export const edgeCaseResume: ResumeData = {
    ...minimalResume,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    location: '',
    summary: '   ', // whitespace only
    skills: [
        { title: '', description: 'Only description, no title' },
        { title: 'Only title', description: '' },
        { title: '', description: '' }, // completely empty
    ],
    projects: [
        { title: '', url: '', description: '' },
    ],
};

// All test fixtures exported as a collection
export const testResumes = {
    minimal: minimalResume,
    specialChars: specialCharsResume,
    typstMarkup: typstMarkupResume,
    unicode: unicodeResume,
    arabic: arabicResume,
    full: fullResume,
    edgeCase: edgeCaseResume,
};
