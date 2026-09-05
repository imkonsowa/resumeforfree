import type { ResumeData } from '~/types/resume';

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
            description: 'Developed automated logical operations for Issue #123',
            links: [],
            startDate: '',
            endDate: '',
            achievements: [],
        },
        {
            title: 'E-Commerce Platform (Revenue: $500K+)',
            description: 'Built with C# & React. Handles ~10,000 transactions/day.',
            links: [{ url: 'https://example.com', label: 'Live Demo' }],
            startDate: '',
            endDate: '',
            achievements: [],
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
            description: 'Description with backslash \\ and more "quotes"',
            links: [],
            startDate: '',
            endDate: '',
            achievements: [],
        },
    ],
};

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
            description: 'A command-line tool for automating development workflows',
            links: [{ url: 'https://github.com/sarahjohnson/cli-tool', label: 'GitHub' }],
            startDate: '2023-01',
            endDate: '',
            isPresent: true,
            achievements: [
                { text: 'Reached 500+ stars on GitHub' },
                { text: 'Used by 2,000+ developers monthly' },
            ],
        },
        {
            title: 'Personal Blog',
            description: 'Technical blog about web development best practices',
            links: [{ url: 'https://sarahjohnson.dev', label: 'Live Demo' }],
            startDate: '2021-06',
            endDate: '2023-12',
            achievements: [],
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

export const edgeCaseResume: ResumeData = {
    ...minimalResume,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    location: '',
    summary: '   ',
    skills: [
        { title: '', description: 'Only description, no title' },
        { title: 'Only title', description: '' },
        { title: '', description: '' },
    ],
    projects: [
        { title: '', description: '', links: [], startDate: '', endDate: '', achievements: [] },
    ],
};

export const descriptionsResume: ResumeData = {
    ...minimalResume,
    firstName: 'Desc',
    lastName: 'Tester',
    summary: 'Summary text',
    experiences: [
        {
            company: 'Acme',
            position: 'Engineer',
            location: 'Remote',
            companyUrl: '',
            startDate: '2020-01',
            endDate: '',
            isPresent: true,
            description: 'ExperienceDescriptionMarker',
            achievements: [{ text: 'shipped things' }],
        },
    ],
    internships: [
        {
            company: 'Intern Co',
            position: 'Intern',
            location: 'Remote',
            companyUrl: '',
            startDate: '2019-06',
            endDate: '2019-09',
            isPresent: false,
            description: 'InternshipDescriptionMarker',
            achievements: [{ text: 'helped out' }],
        },
    ],
    education: [
        {
            institution: 'Test U',
            degree: 'BSc',
            fieldOfStudy: 'CS',
            location: 'Remote',
            startDate: '2015-09',
            endDate: '2019-06',
            isPresent: false,
            description: 'EducationDescriptionMarker',
            graduationScore: '',
            achievements: [{ text: 'EducationAchievementMarker' }],
        },
    ],
    volunteering: [
        {
            organization: 'Org',
            position: 'Volunteer',
            location: 'Remote',
            startDate: '2020-01',
            endDate: '',
            isPresent: true,
            description: 'VolunteeringDescriptionMarker',
            achievements: [{ text: 'volunteered' }],
        },
    ],
    projects: [
        {
            title: 'Test Project',
            description: 'ProjectDescriptionMarker',
            links: [],
            startDate: '2021-03',
            endDate: '2022-09',
            isPresent: false,
            achievements: [{ text: 'built it' }],
        },
    ],
    certificates: [
        {
            title: 'Test Cert',
            issuer: 'Issuer',
            date: '2022-01',
            url: '',
            description: 'CertificateDescriptionMarker',
        },
    ],
};

export const testResumes = {
    minimal: minimalResume,
    specialChars: specialCharsResume,
    typstMarkup: typstMarkupResume,
    unicode: unicodeResume,
    arabic: arabicResume,
    full: fullResume,
    edgeCase: edgeCaseResume,
    descriptions: descriptionsResume,
};
