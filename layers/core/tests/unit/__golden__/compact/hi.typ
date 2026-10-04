// ===== compact | hi | defaults | minimal =====
#set page(margin: 1cm)
#set text(font: ("Noto Sans Devanagari"), size: 12pt)
#set par(leading: 0.4em)
#text(size: 24pt, weight: "bold")[John Doe]
#block(above: 0.8em)[#text(size: 14pt)[Software Engineer]]
#block(above: 0.8em)[#text(size: 11pt)[#link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] • New York, USA]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#pagebreak(weak: true)

// ===== compact | hi | defaults | specialChars =====
#set page(margin: 1cm)
#set text(font: ("Noto Sans Devanagari"), size: 12pt)
#set par(leading: 0.4em)
#text(size: 24pt, weight: "bold")[John\# Doe\$]
#block(above: 0.8em)[#text(size: 14pt)[C\# Developer]]
#block(above: 0.8em)[#text(size: 11pt)[#link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] • New York, USA]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[प्रोफ़ाइल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
Expert in C\#, F\#, and .NET development. Worked with \$100M+ projects.
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[कार्य अनुभव]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Senior C\# Developer में #link("https://techcorp.com")[#underline[#text(fill: blue, "Tech Corp")]], San Francisco]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[जनवरी 2020 - वर्तमान]])]

#set list(indent: 1em)

- Led team of 5+ developers on C\# projects
- Reduced costs by \$50,000/year through optimization
- Implemented feature \#42 using .NET 8]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[कौशल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*Languages:* C\#, F\#, TypeScript, JavaScript, C++]#block(above: 0em, below: 0.8em)[*Frameworks:* .NET, ASP.NET MVC, Entity Framework]#block(above: 0em, below: 0.8em)[*Tools:* Git, Docker, Azure DevOps]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[परियोजनाएं]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Operators Logic App - C\#, Windows App]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Developed automated logical operations for Issue \#123]]]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[E-Commerce Platform (Revenue: \$500K+) • #link("https://example.com")[#text(fill: blue, "Live Demo")]]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Built with C\# & React. Handles \~10,000 transactions/day.]]]
]
#pagebreak(weak: true)

// ===== compact | hi | defaults | typstMarkup =====
#set page(margin: 1cm)
#set text(font: ("Noto Sans Devanagari"), size: 12pt)
#set par(leading: 0.4em)
#text(size: 24pt, weight: "bold")[Test\*User With\_Underscore]
#block(above: 0.8em)[#text(size: 14pt)[Developer \[Senior\]]]
#block(above: 0.8em)[#text(size: 11pt)[#link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] • New York, USA]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[प्रोफ़ाइल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
I work with \*bold\* text and \_italic\_ formatting. Also \{curly\} and \<angle\> brackets.
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[कौशल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*Special\~Chars:* Testing \^caret and \~tilde characters]#block(above: 0em, below: 0.8em)[*Brackets:* Using \[square\] and \{curly\} brackets]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[परियोजनाएं]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Project with \"quotes\" inside]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Description with backslash \\ and more \"quotes\"]]]
]
#pagebreak(weak: true)

// ===== compact | hi | defaults | unicode =====
#set page(margin: 1cm)
#set text(font: ("Noto Sans Devanagari"), size: 12pt)
#set par(leading: 0.4em)
#text(size: 24pt, weight: "bold")[Jose Garcia]
#block(above: 0.8em)[#text(size: 14pt)[Desarrollador]]
#block(above: 0.8em)[#text(size: 11pt)[#link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] • Madrid, Espana]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[प्रोफ़ाइल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
Desarrollador con experiencia en tecnologias web.
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[कौशल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*Idiomas:* Espanol (nativo), English, Francais]
]
#pagebreak(weak: true)

// ===== compact | hi | defaults | arabic =====
#set page(margin: 1cm)
#set text(font: ("Noto Sans Devanagari"), size: 12pt)
#set par(leading: 0.4em)
#text(size: 24pt, weight: "bold")[Ahmed Hassan]
#block(above: 0.8em)[#text(size: 14pt)[Software Engineer]]
#block(above: 0.8em)[#text(size: 11pt)[#link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] • Cairo, Egypt]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[प्रोफ़ाइल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
Full-Stack Developer with experience in web technologies
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[कौशल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*Languages:* JavaScript, TypeScript, Python]
]
#pagebreak(weak: true)

// ===== compact | hi | defaults | full =====
#set page(margin: 1cm)
#set text(font: ("Noto Sans Devanagari"), size: 12pt)
#set par(leading: 0.4em)
#text(size: 24pt, weight: "bold")[Sarah Johnson]
#block(above: 0.8em)[#text(size: 14pt)[Full Stack Developer]]
#block(above: 0.8em)[#text(size: 11pt)[#link("mailto:sarah.johnson@email.com")[#text(fill: blue, dir: ltr, "sarah.johnson@email.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 987 6543] • Austin, TX]]
#block(above: 0.8em)[#text(size: 11pt)[#link("https://linkedin.com/in/sarahjohnson")[#text(fill: blue, "LinkedIn")] • #link("https://github.com/sarahjohnson")[#text(fill: blue, "GitHub")]]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[प्रोफ़ाइल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[कार्य अनुभव]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Senior Developer में #link("https://techstart.com")[#underline[#text(fill: blue, "TechStart Inc.")]], Austin, TX]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[मार्च 2020 - वर्तमान]])]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Developer में WebDev Co., Houston, TX]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[जून 2017 - फ़रवरी 2020]])]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[शिक्षा]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Bachelor of Science में University of Texas, Austin, TX]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[अगस्त 2013 - मई 2017]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[*ग्रेड:* 3.8 GPA

Focused on software engineering and distributed systems]]]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[इंटर्नशिप]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Software Intern में StartupXYZ, Remote]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[मई 2016 - अगस्त 2016]])]

#set list(indent: 1em)

- Assisted in mobile app development]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[कौशल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[परियोजनाएं]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text(fill: blue, "GitHub")]]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[जनवरी 2023 - वर्तमान]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text(fill: blue, "Live Demo")]]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[जून 2021 - दिसंबर 2023]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Technical blog about web development best practices]]]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[स्वयंसेवा]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Volunteer Developer में Code for Good, Austin, TX]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[जनवरी 2019 - वर्तमान]])]

#set list(indent: 1em)

- Built websites for local nonprofits]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[भाषाएं]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*English* - मातृभाषा]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[प्रमाणपत्र]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[AWS Solutions Architect से Amazon Web Services · #link("https://aws.amazon.com/certification")[#text(fill: blue, "लिंक")]]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[जून 2022]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Professional level certification]]]
]
#pagebreak(weak: true)

// ===== compact | hi | defaults | edgeCase =====
#set page(margin: 1cm)
#set text(font: ("Noto Sans Devanagari"), size: 12pt)
#set par(leading: 0.4em)
#text(size: 24pt, weight: "bold")[]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[कौशल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[Only description, no title]#block(above: 0em, below: 0.8em)[*Only title*]
]
#pagebreak(weak: true)

// ===== compact | hi | defaults | descriptions =====
#set page(margin: 1cm)
#set text(font: ("Noto Sans Devanagari"), size: 12pt)
#set par(leading: 0.4em)
#text(size: 24pt, weight: "bold")[Desc Tester]
#block(above: 0.8em)[#text(size: 14pt)[Software Engineer]]
#block(above: 0.8em)[#text(size: 11pt)[#link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] • New York, USA]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[प्रोफ़ाइल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
Summary text
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[शिक्षा]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[BSc में Test U, Remote]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[सितंबर 2015 - जून 2019]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[EducationDescriptionMarker]]

#set list(indent: 1em)

- EducationAchievementMarker]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[कार्य अनुभव]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Engineer में Acme, Remote]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[जनवरी 2020 - वर्तमान]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[ExperienceDescriptionMarker]]

#set list(indent: 1em)

- shipped things]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[इंटर्नशिप]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Intern में Intern Co, Remote]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[जून 2019 - सितंबर 2019]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[InternshipDescriptionMarker]]

#set list(indent: 1em)

- helped out]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[स्वयंसेवा]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Volunteer में Org, Remote]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[जनवरी 2020 - वर्तमान]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[VolunteeringDescriptionMarker]]

#set list(indent: 1em)

- volunteered]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[परियोजनाएं]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Test Project]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[मार्च 2021 - सितंबर 2022]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[ProjectDescriptionMarker]]

#set list(indent: 1em)

- built it]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[प्रमाणपत्र]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Test Cert से Issuer]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[जनवरी 2022]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[CertificateDescriptionMarker]]]
]
#pagebreak(weak: true)

// ===== compact | hi | defaults | withPhoto =====
#set page(margin: 1cm)
#set text(font: ("Noto Sans Devanagari"), size: 12pt)
#set par(leading: 0.4em)
#grid(
    columns: (1fr, auto),
    column-gutter: 16pt,
    align: (left, right + horizon),
    [#text(size: 24pt, weight: "bold")[Sarah Johnson]
#block(above: 0.8em)[#text(size: 14pt)[Full Stack Developer]]
#block(above: 0.8em)[#text(size: 11pt)[#link("mailto:sarah.johnson@email.com")[#text(fill: blue, dir: ltr, "sarah.johnson@email.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 987 6543] • Austin, TX]]
#block(above: 0.8em)[#text(size: 11pt)[#link("https://linkedin.com/in/sarahjohnson")[#text(fill: blue, "LinkedIn")] • #link("https://github.com/sarahjohnson")[#text(fill: blue, "GitHub")]]]],
    [#box(width: 25mm, height: 25mm, clip: true, radius: 1mm, image("/photo", width: 100%, height: 100%, fit: "cover"))],
)
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[प्रोफ़ाइल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[कार्य अनुभव]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Senior Developer में #link("https://techstart.com")[#underline[#text(fill: blue, "TechStart Inc.")]], Austin, TX]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[मार्च 2020 - वर्तमान]])]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Developer में WebDev Co., Houston, TX]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[जून 2017 - फ़रवरी 2020]])]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[शिक्षा]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Bachelor of Science में University of Texas, Austin, TX]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[अगस्त 2013 - मई 2017]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[*ग्रेड:* 3.8 GPA

Focused on software engineering and distributed systems]]]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[इंटर्नशिप]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Software Intern में StartupXYZ, Remote]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[मई 2016 - अगस्त 2016]])]

#set list(indent: 1em)

- Assisted in mobile app development]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[कौशल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[परियोजनाएं]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text(fill: blue, "GitHub")]]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[जनवरी 2023 - वर्तमान]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text(fill: blue, "Live Demo")]]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[जून 2021 - दिसंबर 2023]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Technical blog about web development best practices]]]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[स्वयंसेवा]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Volunteer Developer में Code for Good, Austin, TX]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[जनवरी 2019 - वर्तमान]])]

#set list(indent: 1em)

- Built websites for local nonprofits]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[भाषाएं]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*English* - मातृभाषा]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[प्रमाणपत्र]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[AWS Solutions Architect से Amazon Web Services · #link("https://aws.amazon.com/certification")[#text(fill: blue, "लिंक")]]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[जून 2022]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Professional level certification]]]
]
#pagebreak(weak: true)

// ===== compact | hi | alternate | minimal =====
#set page(margin: 1cm)
#set text(font: ("Noto Sans Devanagari"), size: 10pt)
#set par(leading: 0.4em)
#text(size: 22pt, weight: "bold")[John Doe]
#block(above: 0.8em)[#text(size: 12pt)[Software Engineer]]
#block(above: 0.8em)[#text(size: 9pt)[#link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] • New York, USA]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#pagebreak(weak: true)

// ===== compact | hi | alternate | specialChars =====
#set page(margin: 1cm)
#set text(font: ("Noto Sans Devanagari"), size: 10pt)
#set par(leading: 0.4em)
#text(size: 22pt, weight: "bold")[John\# Doe\$]
#block(above: 0.8em)[#text(size: 12pt)[C\# Developer]]
#block(above: 0.8em)[#text(size: 9pt)[#link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] • New York, USA]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[प्रोफ़ाइल]]
Expert in C\#, F\#, and .NET development. Worked with \$100M+ projects.
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[कार्य अनुभव]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Senior C\# Developer में #link("https://techcorp.com")[#underline[#text(fill: blue, "Tech Corp")]], San Francisco]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[जनवरी 2020 - वर्तमान]])]

#set list(indent: 1em)

- Led team of 5+ developers on C\# projects
- Reduced costs by \$50,000/year through optimization
- Implemented feature \#42 using .NET 8]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[कौशल]]
#block(above: 0em, below: 0.8em)[*Languages:* C\#, F\#, TypeScript, JavaScript, C++]#block(above: 0em, below: 0.8em)[*Frameworks:* .NET, ASP.NET MVC, Entity Framework]#block(above: 0em, below: 0.8em)[*Tools:* Git, Docker, Azure DevOps]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[परियोजनाएं]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Operators Logic App - C\#, Windows App]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Developed automated logical operations for Issue \#123]]]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[E-Commerce Platform (Revenue: \$500K+) • #link("https://example.com")[#text(fill: blue, "Live Demo")]]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Built with C\# & React. Handles \~10,000 transactions/day.]]]
]
#pagebreak(weak: true)

// ===== compact | hi | alternate | typstMarkup =====
#set page(margin: 1cm)
#set text(font: ("Noto Sans Devanagari"), size: 10pt)
#set par(leading: 0.4em)
#text(size: 22pt, weight: "bold")[Test\*User With\_Underscore]
#block(above: 0.8em)[#text(size: 12pt)[Developer \[Senior\]]]
#block(above: 0.8em)[#text(size: 9pt)[#link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] • New York, USA]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[प्रोफ़ाइल]]
I work with \*bold\* text and \_italic\_ formatting. Also \{curly\} and \<angle\> brackets.
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[कौशल]]
#block(above: 0em, below: 0.8em)[*Special\~Chars:* Testing \^caret and \~tilde characters]#block(above: 0em, below: 0.8em)[*Brackets:* Using \[square\] and \{curly\} brackets]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[परियोजनाएं]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Project with \"quotes\" inside]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Description with backslash \\ and more \"quotes\"]]]
]
#pagebreak(weak: true)

// ===== compact | hi | alternate | unicode =====
#set page(margin: 1cm)
#set text(font: ("Noto Sans Devanagari"), size: 10pt)
#set par(leading: 0.4em)
#text(size: 22pt, weight: "bold")[Jose Garcia]
#block(above: 0.8em)[#text(size: 12pt)[Desarrollador]]
#block(above: 0.8em)[#text(size: 9pt)[#link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] • Madrid, Espana]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[प्रोफ़ाइल]]
Desarrollador con experiencia en tecnologias web.
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[कौशल]]
#block(above: 0em, below: 0.8em)[*Idiomas:* Espanol (nativo), English, Francais]
]
#pagebreak(weak: true)

// ===== compact | hi | alternate | arabic =====
#set page(margin: 1cm)
#set text(font: ("Noto Sans Devanagari"), size: 10pt)
#set par(leading: 0.4em)
#text(size: 22pt, weight: "bold")[Ahmed Hassan]
#block(above: 0.8em)[#text(size: 12pt)[Software Engineer]]
#block(above: 0.8em)[#text(size: 9pt)[#link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] • Cairo, Egypt]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[प्रोफ़ाइल]]
Full-Stack Developer with experience in web technologies
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[कौशल]]
#block(above: 0em, below: 0.8em)[*Languages:* JavaScript, TypeScript, Python]
]
#pagebreak(weak: true)

// ===== compact | hi | alternate | full =====
#set page(margin: 1cm)
#set text(font: ("Noto Sans Devanagari"), size: 10pt)
#set par(leading: 0.4em)
#text(size: 22pt, weight: "bold")[Sarah Johnson]
#block(above: 0.8em)[#text(size: 12pt)[Full Stack Developer]]
#block(above: 0.8em)[#text(size: 9pt)[#link("mailto:sarah.johnson@email.com")[#text(fill: blue, dir: ltr, "sarah.johnson@email.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 987 6543] • Austin, TX]]
#block(above: 0.8em)[#text(size: 9pt)[#link("https://linkedin.com/in/sarahjohnson")[#text(fill: blue, "LinkedIn")] • #link("https://github.com/sarahjohnson")[#text(fill: blue, "GitHub")]]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[प्रोफ़ाइल]]
Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[कार्य अनुभव]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Senior Developer में #link("https://techstart.com")[#underline[#text(fill: blue, "TechStart Inc.")]], Austin, TX]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[मार्च 2020 - वर्तमान]])]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Developer में WebDev Co., Houston, TX]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[जून 2017 - फ़रवरी 2020]])]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[शिक्षा]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Bachelor of Science में University of Texas, Austin, TX]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[अगस्त 2013 - मई 2017]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[*ग्रेड:* 3.8 GPA

Focused on software engineering and distributed systems]]]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[इंटर्नशिप]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Software Intern में StartupXYZ, Remote]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[मई 2016 - अगस्त 2016]])]

#set list(indent: 1em)

- Assisted in mobile app development]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[कौशल]]
#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[परियोजनाएं]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text(fill: blue, "GitHub")]]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[जनवरी 2023 - वर्तमान]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text(fill: blue, "Live Demo")]]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[जून 2021 - दिसंबर 2023]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Technical blog about web development best practices]]]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[स्वयंसेवा]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Volunteer Developer में Code for Good, Austin, TX]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[जनवरी 2019 - वर्तमान]])]

#set list(indent: 1em)

- Built websites for local nonprofits]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[भाषाएं]]
#block(above: 0em, below: 0.8em)[*English* - मातृभाषा]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[प्रमाणपत्र]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[AWS Solutions Architect से Amazon Web Services · #link("https://aws.amazon.com/certification")[#text(fill: blue, "लिंक")]]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[जून 2022]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Professional level certification]]]
]
#pagebreak(weak: true)

// ===== compact | hi | alternate | edgeCase =====
#set page(margin: 1cm)
#set text(font: ("Noto Sans Devanagari"), size: 10pt)
#set par(leading: 0.4em)
#text(size: 22pt, weight: "bold")[]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[कौशल]]
#block(above: 0em, below: 0.8em)[Only description, no title]#block(above: 0em, below: 0.8em)[*Only title*]
]
#pagebreak(weak: true)

// ===== compact | hi | alternate | descriptions =====
#set page(margin: 1cm)
#set text(font: ("Noto Sans Devanagari"), size: 10pt)
#set par(leading: 0.4em)
#text(size: 22pt, weight: "bold")[Desc Tester]
#block(above: 0.8em)[#text(size: 12pt)[Software Engineer]]
#block(above: 0.8em)[#text(size: 9pt)[#link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] • New York, USA]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[प्रोफ़ाइल]]
Summary text
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[शिक्षा]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[BSc में Test U, Remote]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[सितंबर 2015 - जून 2019]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[EducationDescriptionMarker]]

#set list(indent: 1em)

- EducationAchievementMarker]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[कार्य अनुभव]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Engineer में Acme, Remote]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[जनवरी 2020 - वर्तमान]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[ExperienceDescriptionMarker]]

#set list(indent: 1em)

- shipped things]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[इंटर्नशिप]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Intern में Intern Co, Remote]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[जून 2019 - सितंबर 2019]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[InternshipDescriptionMarker]]

#set list(indent: 1em)

- helped out]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[स्वयंसेवा]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Volunteer में Org, Remote]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[जनवरी 2020 - वर्तमान]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[VolunteeringDescriptionMarker]]

#set list(indent: 1em)

- volunteered]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[परियोजनाएं]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Test Project]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[मार्च 2021 - सितंबर 2022]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[ProjectDescriptionMarker]]

#set list(indent: 1em)

- built it]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[प्रमाणपत्र]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Test Cert से Issuer]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[जनवरी 2022]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[CertificateDescriptionMarker]]]
]
#pagebreak(weak: true)

// ===== compact | hi | alternate | withPhoto =====
#set page(margin: 1cm)
#set text(font: ("Noto Sans Devanagari"), size: 10pt)
#set par(leading: 0.4em)
#grid(
    columns: (1fr, auto),
    column-gutter: 16pt,
    align: (left, right + horizon),
    [#text(size: 22pt, weight: "bold")[Sarah Johnson]
#block(above: 0.8em)[#text(size: 12pt)[Full Stack Developer]]
#block(above: 0.8em)[#text(size: 9pt)[#link("mailto:sarah.johnson@email.com")[#text(fill: blue, dir: ltr, "sarah.johnson@email.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 987 6543] • Austin, TX]]
#block(above: 0.8em)[#text(size: 9pt)[#link("https://linkedin.com/in/sarahjohnson")[#text(fill: blue, "LinkedIn")] • #link("https://github.com/sarahjohnson")[#text(fill: blue, "GitHub")]]]],
    [#box(width: 25mm, height: 25mm, clip: true, radius: 50%, image("/photo", width: 100%, height: 100%, fit: "cover"))],
)
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[प्रोफ़ाइल]]
Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[कार्य अनुभव]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Senior Developer में #link("https://techstart.com")[#underline[#text(fill: blue, "TechStart Inc.")]], Austin, TX]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[मार्च 2020 - वर्तमान]])]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Developer में WebDev Co., Houston, TX]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[जून 2017 - फ़रवरी 2020]])]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[शिक्षा]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Bachelor of Science में University of Texas, Austin, TX]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[अगस्त 2013 - मई 2017]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[*ग्रेड:* 3.8 GPA

Focused on software engineering and distributed systems]]]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[इंटर्नशिप]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Software Intern में StartupXYZ, Remote]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[मई 2016 - अगस्त 2016]])]

#set list(indent: 1em)

- Assisted in mobile app development]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[कौशल]]
#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[परियोजनाएं]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text(fill: blue, "GitHub")]]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[जनवरी 2023 - वर्तमान]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text(fill: blue, "Live Demo")]]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[जून 2021 - दिसंबर 2023]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Technical blog about web development best practices]]]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[स्वयंसेवा]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Volunteer Developer में Code for Good, Austin, TX]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[जनवरी 2019 - वर्तमान]])]

#set list(indent: 1em)

- Built websites for local nonprofits]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[भाषाएं]]
#block(above: 0em, below: 0.8em)[*English* - मातृभाषा]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[प्रमाणपत्र]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[AWS Solutions Architect से Amazon Web Services · #link("https://aws.amazon.com/certification")[#text(fill: blue, "लिंक")]]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[जून 2022]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Professional level certification]]]
]
#pagebreak(weak: true)
