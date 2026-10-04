// ===== default | it | defaults | minimal =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 12pt)
#show link: set text(fill: blue)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= John Doe
#block(above: 0em, below: 1.2em)[Software Engineer]

],
  [#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Informazioni personali]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 123 4567]]#block(above: 0em, below: 0.8em)[New York, USA]
]]
)
#pagebreak(weak: true)

// ===== default | it | defaults | specialChars =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 12pt)
#show link: set text(fill: blue)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= John\# Doe\$
#block(above: 0em, below: 1.2em)[C\# Developer]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Profilo]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
Expert in C\#, F\#, and .NET development. Worked with \$100M+ projects.
]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Esperienza lavorativa]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Senior C\# Developer presso #link("https://techcorp.com")[#underline[#text("Tech Corp")]], San Francisco]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "gennaio 2020 - Presente")]]

#set list(indent: 1em)

- Led team of 5+ developers on C\# projects
- Reduced costs by \$50,000/year through optimization
- Implemented feature \#42 using .NET 8]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Competenze]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*Languages:* C\#, F\#, TypeScript, JavaScript, C++]#block(above: 0em, below: 0.8em)[*Frameworks:* .NET, ASP.NET MVC, Entity Framework]#block(above: 0em, below: 0.8em)[*Tools:* Git, Docker, Azure DevOps]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Progetti]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Operators Logic App - C\#, Windows App]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Developed automated logical operations for Issue \#123]]]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[E-Commerce Platform (Revenue: \$500K+) • #link("https://example.com")[#text("Live Demo")]]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Built with C\# & React. Handles \~10,000 transactions/day.]]]
]],
  [#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Informazioni personali]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 123 4567]]#block(above: 0em, below: 0.8em)[New York, USA]
]]
)
#pagebreak(weak: true)

// ===== default | it | defaults | typstMarkup =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 12pt)
#show link: set text(fill: blue)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= Test\*User With\_Underscore
#block(above: 0em, below: 1.2em)[Developer \[Senior\]]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Profilo]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
I work with \*bold\* text and \_italic\_ formatting. Also \{curly\} and \<angle\> brackets.
]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Competenze]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*Special\~Chars:* Testing \^caret and \~tilde characters]#block(above: 0em, below: 0.8em)[*Brackets:* Using \[square\] and \{curly\} brackets]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Progetti]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Project with \"quotes\" inside]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Description with backslash \\ and more \"quotes\"]]]
]],
  [#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Informazioni personali]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 123 4567]]#block(above: 0em, below: 0.8em)[New York, USA]
]]
)
#pagebreak(weak: true)

// ===== default | it | defaults | unicode =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 12pt)
#show link: set text(fill: blue)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= Jose Garcia
#block(above: 0em, below: 1.2em)[Desarrollador]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Profilo]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
Desarrollador con experiencia en tecnologias web.
]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Competenze]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*Idiomas:* Espanol (nativo), English, Francais]
]],
  [#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Informazioni personali]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 123 4567]]#block(above: 0em, below: 0.8em)[Madrid, Espana]
]]
)
#pagebreak(weak: true)

// ===== default | it | defaults | arabic =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 12pt)
#show link: set text(fill: blue)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= Ahmed Hassan
#block(above: 0em, below: 1.2em)[Software Engineer]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Profilo]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
Full-Stack Developer with experience in web technologies
]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Competenze]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*Languages:* JavaScript, TypeScript, Python]
]],
  [#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Informazioni personali]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 123 4567]]#block(above: 0em, below: 0.8em)[Cairo, Egypt]
]]
)
#pagebreak(weak: true)

// ===== default | it | defaults | full =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 12pt)
#show link: set text(fill: blue)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= Sarah Johnson
#block(above: 0em, below: 1.2em)[Full Stack Developer]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Profilo]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.
]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Esperienza lavorativa]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Senior Developer presso #link("https://techstart.com")[#underline[#text("TechStart Inc.")]], Austin, TX]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "marzo 2020 - Presente")]]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Developer presso WebDev Co., Houston, TX]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "giugno 2017 - febbraio 2020")]]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Istruzione e formazione]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text("Bachelor of Science presso University of Texas, Austin, TX", size: 13pt, weight: "bold")]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "agosto 2013 - maggio 2017")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[#block(above: 0em, below: 0.6em)[*Votazione:* 3.8 GPA]Focused on software engineering and distributed systems]]]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Tirocini]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Software Intern presso StartupXYZ, Remote]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "maggio 2016 - agosto 2016")]]

#set list(indent: 1em)

- Assisted in mobile app development]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Competenze]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Progetti]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text("GitHub")]]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "gennaio 2023 - Presente")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text("Live Demo")]]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "giugno 2021 - dicembre 2023")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Technical blog about web development best practices]]]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Volontariato]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Volunteer Developer presso Code for Good, Austin, TX]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "gennaio 2019 - Presente")]]

#set list(indent: 1em)

- Built websites for local nonprofits]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Pubblicazioni]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Scaling Event Pipelines on the Edge · #link("https://doi.org/10.1145/0000000")[#text("Link")]]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "aprile 2023")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[S. Johnson, M. Chen, #emph[ACM SIGOPS Workshop] \
Measured cold-start costs across three serverless runtimes]]]
]],
  [#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Informazioni personali]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#link("mailto:sarah.johnson@email.com")[#text(dir: ltr, "sarah.johnson@email.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 987 6543]]#block(above: 0em, below: 0.8em)[Austin, TX]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Social e collegamenti]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#link("https://linkedin.com/in/sarahjohnson")[#text("LinkedIn")]]#block(above: 0em, below: 0.8em)[#link("https://github.com/sarahjohnson")[#text("GitHub")]]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Lingue]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*English* - Madrelingua]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Certificazioni]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[AWS Solutions Architect da Amazon Web Services · #link("https://aws.amazon.com/certification")[#text("Link")]]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "giugno 2022")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Professional level certification]]]
]]
)
#pagebreak(weak: true)

// ===== default | it | defaults | edgeCase =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 12pt)
#show link: set text(fill: blue)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= 


#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Competenze]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[Only description, no title]#block(above: 0em, below: 0.8em)[*Only title*]
]],
  []
)
#pagebreak(weak: true)

// ===== default | it | defaults | descriptions =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 12pt)
#show link: set text(fill: blue)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= Desc Tester
#block(above: 0em, below: 1.2em)[Software Engineer]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Profilo]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
Summary text
]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Istruzione e formazione]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text("BSc presso Test U, Remote", size: 13pt, weight: "bold")]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "settembre 2015 - giugno 2019")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[EducationDescriptionMarker]]

#set list(indent: 1em)

- EducationAchievementMarker]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Esperienza lavorativa]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Engineer presso Acme, Remote]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "gennaio 2020 - Presente")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[ExperienceDescriptionMarker]]

#set list(indent: 1em)

- shipped things]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Tirocini]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Intern presso Intern Co, Remote]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "giugno 2019 - settembre 2019")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[InternshipDescriptionMarker]]

#set list(indent: 1em)

- helped out]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Volontariato]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Volunteer presso Org, Remote]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "gennaio 2020 - Presente")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[VolunteeringDescriptionMarker]]

#set list(indent: 1em)

- volunteered]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Progetti]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Test Project]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "marzo 2021 - settembre 2022")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[ProjectDescriptionMarker]]

#set list(indent: 1em)

- built it]
]],
  [#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Informazioni personali]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 123 4567]]#block(above: 0em, below: 0.8em)[New York, USA]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Certificazioni]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text("Test Cert da Issuer", size: 13pt, weight: "bold")]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "gennaio 2022")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[CertificateDescriptionMarker]]]
]]
)
#pagebreak(weak: true)

// ===== default | it | defaults | withPhoto =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 12pt)
#show link: set text(fill: blue)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= Sarah Johnson
#block(above: 0em, below: 1.2em)[Full Stack Developer]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Profilo]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.
]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Esperienza lavorativa]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Senior Developer presso #link("https://techstart.com")[#underline[#text("TechStart Inc.")]], Austin, TX]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "marzo 2020 - Presente")]]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Developer presso WebDev Co., Houston, TX]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "giugno 2017 - febbraio 2020")]]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Istruzione e formazione]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text("Bachelor of Science presso University of Texas, Austin, TX", size: 13pt, weight: "bold")]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "agosto 2013 - maggio 2017")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[#block(above: 0em, below: 0.6em)[*Votazione:* 3.8 GPA]Focused on software engineering and distributed systems]]]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Tirocini]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Software Intern presso StartupXYZ, Remote]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "maggio 2016 - agosto 2016")]]

#set list(indent: 1em)

- Assisted in mobile app development]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Competenze]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Progetti]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text("GitHub")]]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "gennaio 2023 - Presente")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text("Live Demo")]]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "giugno 2021 - dicembre 2023")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Technical blog about web development best practices]]]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Volontariato]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Volunteer Developer presso Code for Good, Austin, TX]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "gennaio 2019 - Presente")]]

#set list(indent: 1em)

- Built websites for local nonprofits]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Pubblicazioni]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Scaling Event Pipelines on the Edge · #link("https://doi.org/10.1145/0000000")[#text("Link")]]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "aprile 2023")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[S. Johnson, M. Chen, #emph[ACM SIGOPS Workshop] \
Measured cold-start costs across three serverless runtimes]]]
]],
  [#block(width: 100%, below: 1em)[#align(center)[#box(width: 25mm, height: 25mm, clip: true, radius: 1mm, image("/photo", width: 100%, height: 100%, fit: "cover"))]]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Informazioni personali]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#link("mailto:sarah.johnson@email.com")[#text(dir: ltr, "sarah.johnson@email.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 987 6543]]#block(above: 0em, below: 0.8em)[Austin, TX]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Social e collegamenti]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#link("https://linkedin.com/in/sarahjohnson")[#text("LinkedIn")]]#block(above: 0em, below: 0.8em)[#link("https://github.com/sarahjohnson")[#text("GitHub")]]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Lingue]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*English* - Madrelingua]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[Certificazioni]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[AWS Solutions Architect da Amazon Web Services · #link("https://aws.amazon.com/certification")[#text("Link")]]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "giugno 2022")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Professional level certification]]]
]]
)
#pagebreak(weak: true)

// ===== default | it | alternate | minimal =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 10pt)
#show link: set text(fill: blue)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= John Doe
#block(above: 0em, below: 1.2em)[Software Engineer]

],
  [#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Informazioni personali]]
#block(above: 0em, below: 0.8em)[#link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 123 4567]]#block(above: 0em, below: 0.8em)[New York, USA]
]]
)
#pagebreak(weak: true)

// ===== default | it | alternate | specialChars =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 10pt)
#show link: set text(fill: blue)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= John\# Doe\$
#block(above: 0em, below: 1.2em)[C\# Developer]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Profilo]]
Expert in C\#, F\#, and .NET development. Worked with \$100M+ projects.
]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Esperienza lavorativa]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Senior C\# Developer presso #link("https://techcorp.com")[#underline[#text("Tech Corp")]], San Francisco]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "gennaio 2020 - Presente")]]

#set list(indent: 1em)

- Led team of 5+ developers on C\# projects
- Reduced costs by \$50,000/year through optimization
- Implemented feature \#42 using .NET 8]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Competenze]]
#block(above: 0em, below: 0.8em)[*Languages:* C\#, F\#, TypeScript, JavaScript, C++]#block(above: 0em, below: 0.8em)[*Frameworks:* .NET, ASP.NET MVC, Entity Framework]#block(above: 0em, below: 0.8em)[*Tools:* Git, Docker, Azure DevOps]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Progetti]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Operators Logic App - C\#, Windows App]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Developed automated logical operations for Issue \#123]]]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[E-Commerce Platform (Revenue: \$500K+) • #link("https://example.com")[#text("Live Demo")]]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Built with C\# & React. Handles \~10,000 transactions/day.]]]
]],
  [#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Informazioni personali]]
#block(above: 0em, below: 0.8em)[#link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 123 4567]]#block(above: 0em, below: 0.8em)[New York, USA]
]]
)
#pagebreak(weak: true)

// ===== default | it | alternate | typstMarkup =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 10pt)
#show link: set text(fill: blue)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= Test\*User With\_Underscore
#block(above: 0em, below: 1.2em)[Developer \[Senior\]]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Profilo]]
I work with \*bold\* text and \_italic\_ formatting. Also \{curly\} and \<angle\> brackets.
]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Competenze]]
#block(above: 0em, below: 0.8em)[*Special\~Chars:* Testing \^caret and \~tilde characters]#block(above: 0em, below: 0.8em)[*Brackets:* Using \[square\] and \{curly\} brackets]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Progetti]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Project with \"quotes\" inside]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Description with backslash \\ and more \"quotes\"]]]
]],
  [#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Informazioni personali]]
#block(above: 0em, below: 0.8em)[#link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 123 4567]]#block(above: 0em, below: 0.8em)[New York, USA]
]]
)
#pagebreak(weak: true)

// ===== default | it | alternate | unicode =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 10pt)
#show link: set text(fill: blue)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= Jose Garcia
#block(above: 0em, below: 1.2em)[Desarrollador]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Profilo]]
Desarrollador con experiencia en tecnologias web.
]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Competenze]]
#block(above: 0em, below: 0.8em)[*Idiomas:* Espanol (nativo), English, Francais]
]],
  [#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Informazioni personali]]
#block(above: 0em, below: 0.8em)[#link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 123 4567]]#block(above: 0em, below: 0.8em)[Madrid, Espana]
]]
)
#pagebreak(weak: true)

// ===== default | it | alternate | arabic =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 10pt)
#show link: set text(fill: blue)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= Ahmed Hassan
#block(above: 0em, below: 1.2em)[Software Engineer]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Profilo]]
Full-Stack Developer with experience in web technologies
]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Competenze]]
#block(above: 0em, below: 0.8em)[*Languages:* JavaScript, TypeScript, Python]
]],
  [#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Informazioni personali]]
#block(above: 0em, below: 0.8em)[#link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 123 4567]]#block(above: 0em, below: 0.8em)[Cairo, Egypt]
]]
)
#pagebreak(weak: true)

// ===== default | it | alternate | full =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 10pt)
#show link: set text(fill: blue)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= Sarah Johnson
#block(above: 0em, below: 1.2em)[Full Stack Developer]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Profilo]]
Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.
]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Esperienza lavorativa]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Senior Developer presso #link("https://techstart.com")[#underline[#text("TechStart Inc.")]], Austin, TX]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "marzo 2020 - Presente")]]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Developer presso WebDev Co., Houston, TX]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "giugno 2017 - febbraio 2020")]]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Istruzione e formazione]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text("Bachelor of Science presso University of Texas, Austin, TX", size: 11pt, weight: "bold")]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "agosto 2013 - maggio 2017")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[#block(above: 0em, below: 0.6em)[*Votazione:* 3.8 GPA]Focused on software engineering and distributed systems]]]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Tirocini]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Software Intern presso StartupXYZ, Remote]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "maggio 2016 - agosto 2016")]]

#set list(indent: 1em)

- Assisted in mobile app development]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Competenze]]
#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Progetti]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text("GitHub")]]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "gennaio 2023 - Presente")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text("Live Demo")]]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "giugno 2021 - dicembre 2023")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Technical blog about web development best practices]]]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Volontariato]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Volunteer Developer presso Code for Good, Austin, TX]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "gennaio 2019 - Presente")]]

#set list(indent: 1em)

- Built websites for local nonprofits]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Pubblicazioni]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Scaling Event Pipelines on the Edge · #link("https://doi.org/10.1145/0000000")[#text("Link")]]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "aprile 2023")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[S. Johnson, M. Chen, #emph[ACM SIGOPS Workshop] \
Measured cold-start costs across three serverless runtimes]]]
]],
  [#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Informazioni personali]]
#block(above: 0em, below: 0.8em)[#link("mailto:sarah.johnson@email.com")[#text(dir: ltr, "sarah.johnson@email.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 987 6543]]#block(above: 0em, below: 0.8em)[Austin, TX]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Social e collegamenti]]
#block(above: 0em, below: 0.8em)[#link("https://linkedin.com/in/sarahjohnson")[#text("LinkedIn")]]#block(above: 0em, below: 0.8em)[#link("https://github.com/sarahjohnson")[#text("GitHub")]]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Lingue]]
#block(above: 0em, below: 0.8em)[*English* - Madrelingua]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Certificazioni]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[AWS Solutions Architect da Amazon Web Services · #link("https://aws.amazon.com/certification")[#text("Link")]]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "giugno 2022")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Professional level certification]]]
]]
)
#pagebreak(weak: true)

// ===== default | it | alternate | edgeCase =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 10pt)
#show link: set text(fill: blue)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= 


#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Competenze]]
#block(above: 0em, below: 0.8em)[Only description, no title]#block(above: 0em, below: 0.8em)[*Only title*]
]],
  []
)
#pagebreak(weak: true)

// ===== default | it | alternate | descriptions =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 10pt)
#show link: set text(fill: blue)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= Desc Tester
#block(above: 0em, below: 1.2em)[Software Engineer]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Profilo]]
Summary text
]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Istruzione e formazione]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text("BSc presso Test U, Remote", size: 11pt, weight: "bold")]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "settembre 2015 - giugno 2019")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[EducationDescriptionMarker]]

#set list(indent: 1em)

- EducationAchievementMarker]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Esperienza lavorativa]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Engineer presso Acme, Remote]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "gennaio 2020 - Presente")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[ExperienceDescriptionMarker]]

#set list(indent: 1em)

- shipped things]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Tirocini]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Intern presso Intern Co, Remote]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "giugno 2019 - settembre 2019")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[InternshipDescriptionMarker]]

#set list(indent: 1em)

- helped out]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Volontariato]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Volunteer presso Org, Remote]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "gennaio 2020 - Presente")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[VolunteeringDescriptionMarker]]

#set list(indent: 1em)

- volunteered]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Progetti]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Test Project]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "marzo 2021 - settembre 2022")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[ProjectDescriptionMarker]]

#set list(indent: 1em)

- built it]
]],
  [#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Informazioni personali]]
#block(above: 0em, below: 0.8em)[#link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 123 4567]]#block(above: 0em, below: 0.8em)[New York, USA]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Certificazioni]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text("Test Cert da Issuer", size: 11pt, weight: "bold")]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "gennaio 2022")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[CertificateDescriptionMarker]]]
]]
)
#pagebreak(weak: true)

// ===== default | it | alternate | withPhoto =====
#set page(margin: 1.2cm)
#set text(font: ("Calibri"), size: 10pt)
#show link: set text(fill: blue)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= Sarah Johnson
#block(above: 0em, below: 1.2em)[Full Stack Developer]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Profilo]]
Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.
]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Esperienza lavorativa]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Senior Developer presso #link("https://techstart.com")[#underline[#text("TechStart Inc.")]], Austin, TX]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "marzo 2020 - Presente")]]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Developer presso WebDev Co., Houston, TX]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "giugno 2017 - febbraio 2020")]]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Istruzione e formazione]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text("Bachelor of Science presso University of Texas, Austin, TX", size: 11pt, weight: "bold")]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "agosto 2013 - maggio 2017")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[#block(above: 0em, below: 0.6em)[*Votazione:* 3.8 GPA]Focused on software engineering and distributed systems]]]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Tirocini]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Software Intern presso StartupXYZ, Remote]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "maggio 2016 - agosto 2016")]]

#set list(indent: 1em)

- Assisted in mobile app development]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Competenze]]
#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Progetti]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text("GitHub")]]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "gennaio 2023 - Presente")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text("Live Demo")]]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "giugno 2021 - dicembre 2023")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Technical blog about web development best practices]]]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Volontariato]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Volunteer Developer presso Code for Good, Austin, TX]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "gennaio 2019 - Presente")]]

#set list(indent: 1em)

- Built websites for local nonprofits]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Pubblicazioni]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Scaling Event Pipelines on the Edge · #link("https://doi.org/10.1145/0000000")[#text("Link")]]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "aprile 2023")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[S. Johnson, M. Chen, #emph[ACM SIGOPS Workshop] \
Measured cold-start costs across three serverless runtimes]]]
]],
  [#block(width: 100%, below: 1em)[#align(center)[#box(width: 25mm, height: 25mm, clip: true, radius: 50%, image("/photo", width: 100%, height: 100%, fit: "cover"))]]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Informazioni personali]]
#block(above: 0em, below: 0.8em)[#link("mailto:sarah.johnson@email.com")[#text(dir: ltr, "sarah.johnson@email.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 987 6543]]#block(above: 0em, below: 0.8em)[Austin, TX]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Social e collegamenti]]
#block(above: 0em, below: 0.8em)[#link("https://linkedin.com/in/sarahjohnson")[#text("LinkedIn")]]#block(above: 0em, below: 0.8em)[#link("https://github.com/sarahjohnson")[#text("GitHub")]]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Lingue]]
#block(above: 0em, below: 0.8em)[*English* - Madrelingua]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[Certificazioni]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[AWS Solutions Architect da Amazon Web Services · #link("https://aws.amazon.com/certification")[#text("Link")]]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "giugno 2022")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Professional level certification]]]
]]
)
#pagebreak(weak: true)
