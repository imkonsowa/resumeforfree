// ===== ats-friendly | en | defaults | minimal =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 12pt)
#set par(leading: 0.45em)
#block(above: 0em, below: 0.8em)[#text(size: 26pt, weight: "bold", fill: rgb("#1d4ed8"))[JOHN DOE]]
#block(above: 0em, below: 1em)[#text(size: 16pt, weight: "bold")[SOFTWARE ENGINEER]]
#block(above: 0em, below: 1.4em)[#text(size: 12pt)[New York, USA | #link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")] | #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567]]]
#block(above: 0.6em, below: 0em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]

#pagebreak(weak: true)

// ===== ats-friendly | en | defaults | specialChars =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 12pt)
#set par(leading: 0.45em)
#block(above: 0em, below: 0.8em)[#text(size: 26pt, weight: "bold", fill: rgb("#1d4ed8"))[JOHN\# DOE\$]]
#block(above: 0em, below: 1em)[#text(size: 16pt, weight: "bold")[C\# DEVELOPER]]
#block(above: 0em, below: 1.4em)[#text(size: 12pt)[New York, USA | #link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")] | #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567]]]
#block(above: 0.6em, below: 0em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[PROFILE]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
Expert in C\#, F\#, and .NET development. Worked with \$100M+ projects.
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[EXPERIENCE]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Senior C\# Developer at #link("https://techcorp.com")[#underline[#text(fill: blue, "Tech Corp")]], San Francisco]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[January 2020 - Present]])]

#set list(indent: 1em)

- Led team of 5+ developers on C\# projects
- Reduced costs by \$50,000/year through optimization
- Implemented feature \#42 using .NET 8]
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[SKILLS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[*Languages:* C\#, F\#, TypeScript, JavaScript, C++]#block(above: 0em, below: 0.8em)[*Frameworks:* .NET, ASP.NET MVC, Entity Framework]#block(above: 0em, below: 0.8em)[*Tools:* Git, Docker, Azure DevOps]
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[PROJECTS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.6em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Operators Logic App - C\#, Windows App]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Developed automated logical operations for Issue \#123]]]#block(above: 0em, below: 0.6em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[E-Commerce Platform (Revenue: \$500K+) • #link("https://example.com")[#text(fill: blue, "Live Demo")]]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Built with C\# & React. Handles \~10,000 transactions/day.]]]
]
#pagebreak(weak: true)

// ===== ats-friendly | en | defaults | typstMarkup =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 12pt)
#set par(leading: 0.45em)
#block(above: 0em, below: 0.8em)[#text(size: 26pt, weight: "bold", fill: rgb("#1d4ed8"))[TEST\*USER WITH\_UNDERSCORE]]
#block(above: 0em, below: 1em)[#text(size: 16pt, weight: "bold")[DEVELOPER \[SENIOR\]]]
#block(above: 0em, below: 1.4em)[#text(size: 12pt)[New York, USA | #link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")] | #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567]]]
#block(above: 0.6em, below: 0em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[PROFILE]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
I work with \*bold\* text and \_italic\_ formatting. Also \{curly\} and \<angle\> brackets.
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[SKILLS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[*Special\~Chars:* Testing \^caret and \~tilde characters]#block(above: 0em, below: 0.8em)[*Brackets:* Using \[square\] and \{curly\} brackets]
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[PROJECTS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.6em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Project with \"quotes\" inside]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Description with backslash \\ and more \"quotes\"]]]
]
#pagebreak(weak: true)

// ===== ats-friendly | en | defaults | unicode =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 12pt)
#set par(leading: 0.45em)
#block(above: 0em, below: 0.8em)[#text(size: 26pt, weight: "bold", fill: rgb("#1d4ed8"))[JOSE GARCIA]]
#block(above: 0em, below: 1em)[#text(size: 16pt, weight: "bold")[DESARROLLADOR]]
#block(above: 0em, below: 1.4em)[#text(size: 12pt)[Madrid, Espana | #link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")] | #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567]]]
#block(above: 0.6em, below: 0em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[PROFILE]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
Desarrollador con experiencia en tecnologias web.
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[SKILLS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[*Idiomas:* Espanol (nativo), English, Francais]
]
#pagebreak(weak: true)

// ===== ats-friendly | en | defaults | arabic =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 12pt)
#set par(leading: 0.45em)
#block(above: 0em, below: 0.8em)[#text(size: 26pt, weight: "bold", fill: rgb("#1d4ed8"))[AHMED HASSAN]]
#block(above: 0em, below: 1em)[#text(size: 16pt, weight: "bold")[SOFTWARE ENGINEER]]
#block(above: 0em, below: 1.4em)[#text(size: 12pt)[Cairo, Egypt | #link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")] | #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567]]]
#block(above: 0.6em, below: 0em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[PROFILE]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
Full-Stack Developer with experience in web technologies
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[SKILLS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[*Languages:* JavaScript, TypeScript, Python]
]
#pagebreak(weak: true)

// ===== ats-friendly | en | defaults | full =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 12pt)
#set par(leading: 0.45em)
#block(above: 0em, below: 0.8em)[#text(size: 26pt, weight: "bold", fill: rgb("#1d4ed8"))[SARAH JOHNSON]]
#block(above: 0em, below: 1em)[#text(size: 16pt, weight: "bold")[FULL STACK DEVELOPER]]
#block(above: 0em, below: 0.6em)[#text(size: 12pt)[Austin, TX | #link("mailto:sarah.johnson@email.com")[#text(fill: blue, dir: ltr, "sarah.johnson@email.com")] | #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 987 6543]]]
#block(above: 0em, below: 1.4em)[#text(size: 12pt)[#link("https://linkedin.com/in/sarahjohnson")[#text(fill: blue, "LinkedIn")] | #link("https://github.com/sarahjohnson")[#text(fill: blue, "GitHub")]]]
#block(above: 0.6em, below: 0em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[PROFILE]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[EXPERIENCE]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Senior Developer at #link("https://techstart.com")[#underline[#text(fill: blue, "TechStart Inc.")]], Austin, TX]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[March 2020 - Present]])]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Developer at WebDev Co., Houston, TX]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[June 2017 - February 2020]])]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[EDUCATION]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Bachelor of Science at University of Texas, Austin, TX]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[August 2013 - May 2017]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[*Grade:* 3.8 GPA

Focused on software engineering and distributed systems]]]
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[INTERNSHIPS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Software Intern at StartupXYZ, Remote]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[May 2016 - August 2016]])]

#set list(indent: 1em)

- Assisted in mobile app development]
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[SKILLS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[PROJECTS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.6em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text(fill: blue, "GitHub")]]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[January 2023 - Present]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly]#block(above: 0em, below: 0.6em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text(fill: blue, "Live Demo")]]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[June 2021 - December 2023]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Technical blog about web development best practices]]]
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[VOLUNTEERING]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Volunteer Developer at Code for Good, Austin, TX]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[January 2019 - Present]])]

#set list(indent: 1em)

- Built websites for local nonprofits]
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[LANGUAGES]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[*English* - Native]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[CERTIFICATES]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[AWS Solutions Architect from Amazon Web Services · #link("https://aws.amazon.com/certification")[#text(fill: blue, "Link")]]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[June 2022]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Professional level certification]]]
]
#pagebreak(weak: true)

// ===== ats-friendly | en | defaults | edgeCase =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 12pt)
#set par(leading: 0.45em)

#block(above: 0.6em, below: 0em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[SKILLS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[Only description, no title]#block(above: 0em, below: 0.8em)[*Only title*]
]
#pagebreak(weak: true)

// ===== ats-friendly | en | defaults | descriptions =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 12pt)
#set par(leading: 0.45em)
#block(above: 0em, below: 0.8em)[#text(size: 26pt, weight: "bold", fill: rgb("#1d4ed8"))[DESC TESTER]]
#block(above: 0em, below: 1em)[#text(size: 16pt, weight: "bold")[SOFTWARE ENGINEER]]
#block(above: 0em, below: 1.4em)[#text(size: 12pt)[New York, USA | #link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")] | #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567]]]
#block(above: 0.6em, below: 0em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[PROFILE]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
Summary text
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[EDUCATION]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[BSc at Test U, Remote]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[September 2015 - June 2019]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[EducationDescriptionMarker]]

#set list(indent: 1em)

- EducationAchievementMarker]
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[EXPERIENCE]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Engineer at Acme, Remote]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[January 2020 - Present]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[ExperienceDescriptionMarker]]

#set list(indent: 1em)

- shipped things]
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[INTERNSHIPS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Intern at Intern Co, Remote]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[June 2019 - September 2019]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[InternshipDescriptionMarker]]

#set list(indent: 1em)

- helped out]
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[VOLUNTEERING]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Volunteer at Org, Remote]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[January 2020 - Present]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[VolunteeringDescriptionMarker]]

#set list(indent: 1em)

- volunteered]
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[PROJECTS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.6em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Test Project]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[March 2021 - September 2022]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[ProjectDescriptionMarker]]

#set list(indent: 1em)

- built it]
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[CERTIFICATES]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Test Cert from Issuer]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[January 2022]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[CertificateDescriptionMarker]]]
]
#pagebreak(weak: true)

// ===== ats-friendly | en | defaults | withPhoto =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 12pt)
#set par(leading: 0.45em)
#grid(
    columns: (1fr, auto),
    column-gutter: 16pt,
    align: (start + top, end + top),
    [#block(above: 0em, below: 0.8em)[#text(size: 26pt, weight: "bold", fill: rgb("#1d4ed8"))[SARAH JOHNSON]]
#block(above: 0em, below: 1em)[#text(size: 16pt, weight: "bold")[FULL STACK DEVELOPER]]
#block(above: 0em, below: 0.6em)[#text(size: 12pt)[Austin, TX | #link("mailto:sarah.johnson@email.com")[#text(fill: blue, dir: ltr, "sarah.johnson@email.com")] | #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 987 6543]]]
#block(above: 0em, below: 1.4em)[#text(size: 12pt)[#link("https://linkedin.com/in/sarahjohnson")[#text(fill: blue, "LinkedIn")] | #link("https://github.com/sarahjohnson")[#text(fill: blue, "GitHub")]]]],
    [#box(width: 25mm, height: 25mm, clip: true, radius: 1mm, image("/photo", width: 100%, height: 100%, fit: "cover"))],
)
#block(above: 0.6em, below: 0em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[PROFILE]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[EXPERIENCE]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Senior Developer at #link("https://techstart.com")[#underline[#text(fill: blue, "TechStart Inc.")]], Austin, TX]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[March 2020 - Present]])]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Developer at WebDev Co., Houston, TX]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[June 2017 - February 2020]])]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[EDUCATION]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Bachelor of Science at University of Texas, Austin, TX]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[August 2013 - May 2017]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[*Grade:* 3.8 GPA

Focused on software engineering and distributed systems]]]
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[INTERNSHIPS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Software Intern at StartupXYZ, Remote]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[May 2016 - August 2016]])]

#set list(indent: 1em)

- Assisted in mobile app development]
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[SKILLS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[PROJECTS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.6em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text(fill: blue, "GitHub")]]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[January 2023 - Present]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly]#block(above: 0em, below: 0.6em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text(fill: blue, "Live Demo")]]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[June 2021 - December 2023]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Technical blog about web development best practices]]]
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[VOLUNTEERING]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Volunteer Developer at Code for Good, Austin, TX]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[January 2019 - Present]])]

#set list(indent: 1em)

- Built websites for local nonprofits]
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[LANGUAGES]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[*English* - Native]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]
]
#block(above: 1em, below: 1.2em)[
#text(size: 15pt, weight: "bold", fill: rgb("#1d4ed8"))[CERTIFICATES]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[AWS Solutions Architect from Amazon Web Services · #link("https://aws.amazon.com/certification")[#text(fill: blue, "Link")]]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[June 2022]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Professional level certification]]]
]
#pagebreak(weak: true)

// ===== ats-friendly | en | alternate | minimal =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 10pt)
#set par(leading: 0.45em)
#block(above: 0em, below: 0.8em)[#text(size: 24pt, weight: "bold", fill: rgb("#1d4ed8"))[JOHN DOE]]
#block(above: 0em, below: 1em)[#text(size: 14pt, weight: "bold")[SOFTWARE ENGINEER]]
#block(above: 0em, below: 1.4em)[#text(size: 10pt)[New York, USA | #link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")] | #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567]]]
#block(above: 0.6em, below: 0em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]

#pagebreak(weak: true)

// ===== ats-friendly | en | alternate | specialChars =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 10pt)
#set par(leading: 0.45em)
#block(above: 0em, below: 0.8em)[#text(size: 24pt, weight: "bold", fill: rgb("#1d4ed8"))[JOHN\# DOE\$]]
#block(above: 0em, below: 1em)[#text(size: 14pt, weight: "bold")[C\# DEVELOPER]]
#block(above: 0em, below: 1.4em)[#text(size: 10pt)[New York, USA | #link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")] | #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567]]]
#block(above: 0.6em, below: 0em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[PROFILE]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
Expert in C\#, F\#, and .NET development. Worked with \$100M+ projects.
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[EXPERIENCE]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Senior C\# Developer at #link("https://techcorp.com")[#underline[#text(fill: blue, "Tech Corp")]], San Francisco]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[January 2020 - Present]])]

#set list(indent: 1em)

- Led team of 5+ developers on C\# projects
- Reduced costs by \$50,000/year through optimization
- Implemented feature \#42 using .NET 8]
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[SKILLS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[*Languages:* C\#, F\#, TypeScript, JavaScript, C++]#block(above: 0em, below: 0.8em)[*Frameworks:* .NET, ASP.NET MVC, Entity Framework]#block(above: 0em, below: 0.8em)[*Tools:* Git, Docker, Azure DevOps]
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[PROJECTS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.6em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Operators Logic App - C\#, Windows App]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Developed automated logical operations for Issue \#123]]]#block(above: 0em, below: 0.6em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[E-Commerce Platform (Revenue: \$500K+) • #link("https://example.com")[#text(fill: blue, "Live Demo")]]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Built with C\# & React. Handles \~10,000 transactions/day.]]]
]
#pagebreak(weak: true)

// ===== ats-friendly | en | alternate | typstMarkup =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 10pt)
#set par(leading: 0.45em)
#block(above: 0em, below: 0.8em)[#text(size: 24pt, weight: "bold", fill: rgb("#1d4ed8"))[TEST\*USER WITH\_UNDERSCORE]]
#block(above: 0em, below: 1em)[#text(size: 14pt, weight: "bold")[DEVELOPER \[SENIOR\]]]
#block(above: 0em, below: 1.4em)[#text(size: 10pt)[New York, USA | #link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")] | #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567]]]
#block(above: 0.6em, below: 0em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[PROFILE]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
I work with \*bold\* text and \_italic\_ formatting. Also \{curly\} and \<angle\> brackets.
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[SKILLS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[*Special\~Chars:* Testing \^caret and \~tilde characters]#block(above: 0em, below: 0.8em)[*Brackets:* Using \[square\] and \{curly\} brackets]
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[PROJECTS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.6em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Project with \"quotes\" inside]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Description with backslash \\ and more \"quotes\"]]]
]
#pagebreak(weak: true)

// ===== ats-friendly | en | alternate | unicode =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 10pt)
#set par(leading: 0.45em)
#block(above: 0em, below: 0.8em)[#text(size: 24pt, weight: "bold", fill: rgb("#1d4ed8"))[JOSE GARCIA]]
#block(above: 0em, below: 1em)[#text(size: 14pt, weight: "bold")[DESARROLLADOR]]
#block(above: 0em, below: 1.4em)[#text(size: 10pt)[Madrid, Espana | #link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")] | #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567]]]
#block(above: 0.6em, below: 0em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[PROFILE]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
Desarrollador con experiencia en tecnologias web.
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[SKILLS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[*Idiomas:* Espanol (nativo), English, Francais]
]
#pagebreak(weak: true)

// ===== ats-friendly | en | alternate | arabic =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 10pt)
#set par(leading: 0.45em)
#block(above: 0em, below: 0.8em)[#text(size: 24pt, weight: "bold", fill: rgb("#1d4ed8"))[AHMED HASSAN]]
#block(above: 0em, below: 1em)[#text(size: 14pt, weight: "bold")[SOFTWARE ENGINEER]]
#block(above: 0em, below: 1.4em)[#text(size: 10pt)[Cairo, Egypt | #link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")] | #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567]]]
#block(above: 0.6em, below: 0em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[PROFILE]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
Full-Stack Developer with experience in web technologies
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[SKILLS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[*Languages:* JavaScript, TypeScript, Python]
]
#pagebreak(weak: true)

// ===== ats-friendly | en | alternate | full =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 10pt)
#set par(leading: 0.45em)
#block(above: 0em, below: 0.8em)[#text(size: 24pt, weight: "bold", fill: rgb("#1d4ed8"))[SARAH JOHNSON]]
#block(above: 0em, below: 1em)[#text(size: 14pt, weight: "bold")[FULL STACK DEVELOPER]]
#block(above: 0em, below: 0.6em)[#text(size: 10pt)[Austin, TX | #link("mailto:sarah.johnson@email.com")[#text(fill: blue, dir: ltr, "sarah.johnson@email.com")] | #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 987 6543]]]
#block(above: 0em, below: 1.4em)[#text(size: 10pt)[#link("https://linkedin.com/in/sarahjohnson")[#text(fill: blue, "LinkedIn")] | #link("https://github.com/sarahjohnson")[#text(fill: blue, "GitHub")]]]
#block(above: 0.6em, below: 0em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[PROFILE]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[EXPERIENCE]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Senior Developer at #link("https://techstart.com")[#underline[#text(fill: blue, "TechStart Inc.")]], Austin, TX]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[March 2020 - Present]])]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Developer at WebDev Co., Houston, TX]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[June 2017 - February 2020]])]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[EDUCATION]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Bachelor of Science at University of Texas, Austin, TX]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[August 2013 - May 2017]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[*Grade:* 3.8 GPA

Focused on software engineering and distributed systems]]]
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[INTERNSHIPS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Software Intern at StartupXYZ, Remote]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[May 2016 - August 2016]])]

#set list(indent: 1em)

- Assisted in mobile app development]
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[SKILLS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[PROJECTS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.6em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text(fill: blue, "GitHub")]]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[January 2023 - Present]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly]#block(above: 0em, below: 0.6em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text(fill: blue, "Live Demo")]]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[June 2021 - December 2023]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Technical blog about web development best practices]]]
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[VOLUNTEERING]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Volunteer Developer at Code for Good, Austin, TX]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[January 2019 - Present]])]

#set list(indent: 1em)

- Built websites for local nonprofits]
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[LANGUAGES]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[*English* - Native]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[CERTIFICATES]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[AWS Solutions Architect from Amazon Web Services · #link("https://aws.amazon.com/certification")[#text(fill: blue, "Link")]]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[June 2022]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Professional level certification]]]
]
#pagebreak(weak: true)

// ===== ats-friendly | en | alternate | edgeCase =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 10pt)
#set par(leading: 0.45em)

#block(above: 0.6em, below: 0em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[SKILLS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[Only description, no title]#block(above: 0em, below: 0.8em)[*Only title*]
]
#pagebreak(weak: true)

// ===== ats-friendly | en | alternate | descriptions =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 10pt)
#set par(leading: 0.45em)
#block(above: 0em, below: 0.8em)[#text(size: 24pt, weight: "bold", fill: rgb("#1d4ed8"))[DESC TESTER]]
#block(above: 0em, below: 1em)[#text(size: 14pt, weight: "bold")[SOFTWARE ENGINEER]]
#block(above: 0em, below: 1.4em)[#text(size: 10pt)[New York, USA | #link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")] | #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567]]]
#block(above: 0.6em, below: 0em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[PROFILE]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
Summary text
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[EDUCATION]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[BSc at Test U, Remote]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[September 2015 - June 2019]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[EducationDescriptionMarker]]

#set list(indent: 1em)

- EducationAchievementMarker]
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[EXPERIENCE]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Engineer at Acme, Remote]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[January 2020 - Present]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[ExperienceDescriptionMarker]]

#set list(indent: 1em)

- shipped things]
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[INTERNSHIPS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Intern at Intern Co, Remote]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[June 2019 - September 2019]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[InternshipDescriptionMarker]]

#set list(indent: 1em)

- helped out]
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[VOLUNTEERING]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Volunteer at Org, Remote]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[January 2020 - Present]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[VolunteeringDescriptionMarker]]

#set list(indent: 1em)

- volunteered]
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[PROJECTS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.6em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Test Project]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[March 2021 - September 2022]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[ProjectDescriptionMarker]]

#set list(indent: 1em)

- built it]
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[CERTIFICATES]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Test Cert from Issuer]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[January 2022]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[CertificateDescriptionMarker]]]
]
#pagebreak(weak: true)

// ===== ats-friendly | en | alternate | withPhoto =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 10pt)
#set par(leading: 0.45em)
#grid(
    columns: (1fr, auto),
    column-gutter: 16pt,
    align: (start + top, end + top),
    [#block(above: 0em, below: 0.8em)[#text(size: 24pt, weight: "bold", fill: rgb("#1d4ed8"))[SARAH JOHNSON]]
#block(above: 0em, below: 1em)[#text(size: 14pt, weight: "bold")[FULL STACK DEVELOPER]]
#block(above: 0em, below: 0.6em)[#text(size: 10pt)[Austin, TX | #link("mailto:sarah.johnson@email.com")[#text(fill: blue, dir: ltr, "sarah.johnson@email.com")] | #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 987 6543]]]
#block(above: 0em, below: 1.4em)[#text(size: 10pt)[#link("https://linkedin.com/in/sarahjohnson")[#text(fill: blue, "LinkedIn")] | #link("https://github.com/sarahjohnson")[#text(fill: blue, "GitHub")]]]],
    [#box(width: 25mm, height: 25mm, clip: true, radius: 50%, image("/photo", width: 100%, height: 100%, fit: "cover"))],
)
#block(above: 0.6em, below: 0em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[PROFILE]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[EXPERIENCE]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Senior Developer at #link("https://techstart.com")[#underline[#text(fill: blue, "TechStart Inc.")]], Austin, TX]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[March 2020 - Present]])]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Developer at WebDev Co., Houston, TX]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[June 2017 - February 2020]])]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[EDUCATION]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Bachelor of Science at University of Texas, Austin, TX]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[August 2013 - May 2017]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[*Grade:* 3.8 GPA

Focused on software engineering and distributed systems]]]
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[INTERNSHIPS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Software Intern at StartupXYZ, Remote]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[May 2016 - August 2016]])]

#set list(indent: 1em)

- Assisted in mobile app development]
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[SKILLS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[PROJECTS]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.6em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text(fill: blue, "GitHub")]]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[January 2023 - Present]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly]#block(above: 0em, below: 0.6em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text(fill: blue, "Live Demo")]]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[June 2021 - December 2023]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Technical blog about web development best practices]]]
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[VOLUNTEERING]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Volunteer Developer at Code for Good, Austin, TX]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[January 2019 - Present]])]

#set list(indent: 1em)

- Built websites for local nonprofits]
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[LANGUAGES]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[*English* - Native]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]
]
#block(above: 1em, below: 1.2em)[
#text(size: 13pt, weight: "bold", fill: rgb("#1d4ed8"))[CERTIFICATES]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt + rgb("#1d4ed8"))]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[AWS Solutions Architect from Amazon Web Services · #link("https://aws.amazon.com/certification")[#text(fill: blue, "Link")]]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[June 2022]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Professional level certification]]]
]
#pagebreak(weak: true)
