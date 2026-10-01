// ===== default | hi | defaults | minimal =====
#set page(margin: 1.2cm)
#set text(font: ("Noto Sans Devanagari"), size: 12pt)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= John Doe
#block(above: 0em, below: 1.6em)[Software Engineer]

],
  [#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[व्यक्तिगत जानकारी]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 123 4567]]#block(above: 0em, below: 0.8em)[New York, USA]
]]
)
#pagebreak(weak: true)

// ===== default | hi | defaults | specialChars =====
#set page(margin: 1.2cm)
#set text(font: ("Noto Sans Devanagari"), size: 12pt)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= John\# Doe\$
#block(above: 0em, below: 1.6em)[C\# Developer]
#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[प्रोफ़ाइल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
Expert in C\#, F\#, and .NET development. Worked with \$100M+ projects.
]
#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[कार्य अनुभव]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Senior C\# Developer में #link("https://techcorp.com")[#underline[#text(fill: blue, "Tech Corp")]], San Francisco]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जनवरी 2020 - वर्तमान")]]

#set list(indent: 1em)

- Led team of 5+ developers on C\# projects
- Reduced costs by \$50,000/year through optimization
- Implemented feature \#42 using .NET 8]
]

#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[कौशल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*Languages:* C\#, F\#, TypeScript, JavaScript, C++]#block(above: 0em, below: 0.8em)[*Frameworks:* .NET, ASP.NET MVC, Entity Framework]#block(above: 0em, below: 0.8em)[*Tools:* Git, Docker, Azure DevOps]
]

#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[परियोजनाएं]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 1em)[#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Operators Logic App - C\#, Windows App]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Developed automated logical operations for Issue \#123]]]#block(above: 0em, below: 1em)[#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[E-Commerce Platform (Revenue: \$500K+) • #link("https://example.com")[#text(fill: blue, "Live Demo")]]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Built with C\# & React. Handles \~10,000 transactions/day.]]]
]],
  [#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[व्यक्तिगत जानकारी]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 123 4567]]#block(above: 0em, below: 0.8em)[New York, USA]
]]
)
#pagebreak(weak: true)

// ===== default | hi | defaults | typstMarkup =====
#set page(margin: 1.2cm)
#set text(font: ("Noto Sans Devanagari"), size: 12pt)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= Test\*User With\_Underscore
#block(above: 0em, below: 1.6em)[Developer \[Senior\]]
#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[प्रोफ़ाइल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
I work with \*bold\* text and \_italic\_ formatting. Also \{curly\} and \<angle\> brackets.
]
#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[कौशल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*Special\~Chars:* Testing \^caret and \~tilde characters]#block(above: 0em, below: 0.8em)[*Brackets:* Using \[square\] and \{curly\} brackets]
]

#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[परियोजनाएं]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 1em)[#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Project with \"quotes\" inside]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Description with backslash \\ and more \"quotes\"]]]
]],
  [#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[व्यक्तिगत जानकारी]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 123 4567]]#block(above: 0em, below: 0.8em)[New York, USA]
]]
)
#pagebreak(weak: true)

// ===== default | hi | defaults | unicode =====
#set page(margin: 1.2cm)
#set text(font: ("Noto Sans Devanagari"), size: 12pt)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= Jose Garcia
#block(above: 0em, below: 1.6em)[Desarrollador]
#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[प्रोफ़ाइल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
Desarrollador con experiencia en tecnologias web.
]
#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[कौशल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*Idiomas:* Espanol (nativo), English, Francais]
]],
  [#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[व्यक्तिगत जानकारी]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 123 4567]]#block(above: 0em, below: 0.8em)[Madrid, Espana]
]]
)
#pagebreak(weak: true)

// ===== default | hi | defaults | arabic =====
#set page(margin: 1.2cm)
#set text(font: ("Noto Sans Devanagari"), size: 12pt)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= Ahmed Hassan
#block(above: 0em, below: 1.6em)[Software Engineer]
#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[प्रोफ़ाइल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
Full-Stack Developer with experience in web technologies
]
#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[कौशल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*Languages:* JavaScript, TypeScript, Python]
]],
  [#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[व्यक्तिगत जानकारी]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 123 4567]]#block(above: 0em, below: 0.8em)[Cairo, Egypt]
]]
)
#pagebreak(weak: true)

// ===== default | hi | defaults | full =====
#set page(margin: 1.2cm)
#set text(font: ("Noto Sans Devanagari"), size: 12pt)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= Sarah Johnson
#block(above: 0em, below: 1.6em)[Full Stack Developer]
#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[प्रोफ़ाइल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.
]
#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[कार्य अनुभव]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Senior Developer में #link("https://techstart.com")[#underline[#text(fill: blue, "TechStart Inc.")]], Austin, TX]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "मार्च 2020 - वर्तमान")]]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Developer में WebDev Co., Houston, TX]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जून 2017 - फ़रवरी 2020")]]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
]

#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[शिक्षा]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text("Bachelor of Science में University of Texas, Austin, TX", size: 12pt, weight: "bold")]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "अगस्त 2013 - मई 2017")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[*ग्रेड:* 3.8 GPA

Focused on software engineering and distributed systems]]]
]

#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[इंटर्नशिप]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Software Intern में StartupXYZ, Remote]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "मई 2016 - अगस्त 2016")]]

#set list(indent: 1em)

- Assisted in mobile app development]
]

#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[कौशल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]
]

#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[परियोजनाएं]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 1em)[#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text(fill: blue, "GitHub")]]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जनवरी 2023 - वर्तमान")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly]#block(above: 0em, below: 1em)[#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text(fill: blue, "Live Demo")]]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जून 2021 - दिसंबर 2023")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Technical blog about web development best practices]]]
]

#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[स्वयंसेवा]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Volunteer Developer में Code for Good, Austin, TX]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जनवरी 2019 - वर्तमान")]]

#set list(indent: 1em)

- Built websites for local nonprofits]
]],
  [#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[व्यक्तिगत जानकारी]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#link("mailto:sarah.johnson@email.com")[#text(fill: blue, dir: ltr, "sarah.johnson@email.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 987 6543]]#block(above: 0em, below: 0.8em)[Austin, TX]
]

#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[सोशल लिंक्स]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#link("https://linkedin.com/in/sarahjohnson")[#text(fill: blue, "LinkedIn")]]#block(above: 0em, below: 0.8em)[#link("https://github.com/sarahjohnson")[#text(fill: blue, "GitHub")]]
]

#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[भाषाएं]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*English* - मातृभाषा]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]
]

#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[प्रमाणपत्र]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[AWS Solutions Architect से Amazon Web Services · #link("https://aws.amazon.com/certification")[#text(fill: blue, "लिंक")]]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जून 2022")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Professional level certification]]]
]]
)
#pagebreak(weak: true)

// ===== default | hi | defaults | edgeCase =====
#set page(margin: 1.2cm)
#set text(font: ("Noto Sans Devanagari"), size: 12pt)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= 


#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[कौशल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[Only description, no title]#block(above: 0em, below: 0.8em)[*Only title*]
]],
  []
)
#pagebreak(weak: true)

// ===== default | hi | defaults | descriptions =====
#set page(margin: 1.2cm)
#set text(font: ("Noto Sans Devanagari"), size: 12pt)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= Desc Tester
#block(above: 0em, below: 1.6em)[Software Engineer]
#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[प्रोफ़ाइल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
Summary text
]
#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[शिक्षा]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text("BSc में Test U, Remote", size: 12pt, weight: "bold")]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "सितंबर 2015 - जून 2019")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[EducationDescriptionMarker]]

#set list(indent: 1em)

- EducationAchievementMarker]
]

#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[कार्य अनुभव]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Engineer में Acme, Remote]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जनवरी 2020 - वर्तमान")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[ExperienceDescriptionMarker]]

#set list(indent: 1em)

- shipped things]
]

#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[इंटर्नशिप]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Intern में Intern Co, Remote]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जून 2019 - सितंबर 2019")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[InternshipDescriptionMarker]]

#set list(indent: 1em)

- helped out]
]

#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[स्वयंसेवा]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Volunteer में Org, Remote]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जनवरी 2020 - वर्तमान")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[VolunteeringDescriptionMarker]]

#set list(indent: 1em)

- volunteered]
]

#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[परियोजनाएं]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 1em)[#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Test Project]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "मार्च 2021 - सितंबर 2022")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[ProjectDescriptionMarker]]

#set list(indent: 1em)

- built it]
]],
  [#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[व्यक्तिगत जानकारी]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 123 4567]]#block(above: 0em, below: 0.8em)[New York, USA]
]

#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[प्रमाणपत्र]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text("Test Cert से Issuer", size: 12pt, weight: "bold")]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जनवरी 2022")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[CertificateDescriptionMarker]]]
]]
)
#pagebreak(weak: true)

// ===== default | hi | defaults | withPhoto =====
#set page(margin: 1.2cm)
#set text(font: ("Noto Sans Devanagari"), size: 12pt)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= Sarah Johnson
#block(above: 0em, below: 1.6em)[Full Stack Developer]
#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[प्रोफ़ाइल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.
]
#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[कार्य अनुभव]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Senior Developer में #link("https://techstart.com")[#underline[#text(fill: blue, "TechStart Inc.")]], Austin, TX]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "मार्च 2020 - वर्तमान")]]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Developer में WebDev Co., Houston, TX]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जून 2017 - फ़रवरी 2020")]]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
]

#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[शिक्षा]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text("Bachelor of Science में University of Texas, Austin, TX", size: 12pt, weight: "bold")]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "अगस्त 2013 - मई 2017")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[*ग्रेड:* 3.8 GPA

Focused on software engineering and distributed systems]]]
]

#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[इंटर्नशिप]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Software Intern में StartupXYZ, Remote]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "मई 2016 - अगस्त 2016")]]

#set list(indent: 1em)

- Assisted in mobile app development]
]

#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[कौशल]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]
]

#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[परियोजनाएं]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 1em)[#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text(fill: blue, "GitHub")]]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जनवरी 2023 - वर्तमान")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly]#block(above: 0em, below: 1em)[#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text(fill: blue, "Live Demo")]]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जून 2021 - दिसंबर 2023")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Technical blog about web development best practices]]]
]

#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[स्वयंसेवा]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Volunteer Developer में Code for Good, Austin, TX]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जनवरी 2019 - वर्तमान")]]

#set list(indent: 1em)

- Built websites for local nonprofits]
]],
  [#block(width: 100%, below: 1em)[#align(center)[#box(width: 25mm, height: 25mm, clip: true, radius: 1mm, image("/photo", width: 100%, height: 100%, fit: "cover"))]]

#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[व्यक्तिगत जानकारी]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#link("mailto:sarah.johnson@email.com")[#text(fill: blue, dir: ltr, "sarah.johnson@email.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 987 6543]]#block(above: 0em, below: 0.8em)[Austin, TX]
]

#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[सोशल लिंक्स]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#link("https://linkedin.com/in/sarahjohnson")[#text(fill: blue, "LinkedIn")]]#block(above: 0em, below: 0.8em)[#link("https://github.com/sarahjohnson")[#text(fill: blue, "GitHub")]]
]

#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[भाषाएं]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*English* - मातृभाषा]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]
]

#block(above: 0em, below: 1.6em)[
#text(size: 15pt, weight: "bold")[प्रमाणपत्र]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[AWS Solutions Architect से Amazon Web Services · #link("https://aws.amazon.com/certification")[#text(fill: blue, "लिंक")]]]

#block(above: 0em, below: 0.6em)[#text(size: 10pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जून 2022")]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Professional level certification]]]
]]
)
#pagebreak(weak: true)

// ===== default | hi | alternate | minimal =====
#set page(margin: 1.2cm)
#set text(font: ("Noto Sans Devanagari"), size: 10pt)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= John Doe
#block(above: 0em, below: 1.6em)[Software Engineer]

],
  [#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[व्यक्तिगत जानकारी]]
#block(above: 0em, below: 0.8em)[#link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 123 4567]]#block(above: 0em, below: 0.8em)[New York, USA]
]]
)
#pagebreak(weak: true)

// ===== default | hi | alternate | specialChars =====
#set page(margin: 1.2cm)
#set text(font: ("Noto Sans Devanagari"), size: 10pt)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= John\# Doe\$
#block(above: 0em, below: 1.6em)[C\# Developer]
#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[प्रोफ़ाइल]]
Expert in C\#, F\#, and .NET development. Worked with \$100M+ projects.
]
#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[कार्य अनुभव]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Senior C\# Developer में #link("https://techcorp.com")[#underline[#text(fill: blue, "Tech Corp")]], San Francisco]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जनवरी 2020 - वर्तमान")]]

#set list(indent: 1em)

- Led team of 5+ developers on C\# projects
- Reduced costs by \$50,000/year through optimization
- Implemented feature \#42 using .NET 8]
]

#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[कौशल]]
#block(above: 0em, below: 0.8em)[*Languages:* C\#, F\#, TypeScript, JavaScript, C++]#block(above: 0em, below: 0.8em)[*Frameworks:* .NET, ASP.NET MVC, Entity Framework]#block(above: 0em, below: 0.8em)[*Tools:* Git, Docker, Azure DevOps]
]

#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[परियोजनाएं]]
#block(above: 0em, below: 1em)[#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Operators Logic App - C\#, Windows App]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Developed automated logical operations for Issue \#123]]]#block(above: 0em, below: 1em)[#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[E-Commerce Platform (Revenue: \$500K+) • #link("https://example.com")[#text(fill: blue, "Live Demo")]]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Built with C\# & React. Handles \~10,000 transactions/day.]]]
]],
  [#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[व्यक्तिगत जानकारी]]
#block(above: 0em, below: 0.8em)[#link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 123 4567]]#block(above: 0em, below: 0.8em)[New York, USA]
]]
)
#pagebreak(weak: true)

// ===== default | hi | alternate | typstMarkup =====
#set page(margin: 1.2cm)
#set text(font: ("Noto Sans Devanagari"), size: 10pt)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= Test\*User With\_Underscore
#block(above: 0em, below: 1.6em)[Developer \[Senior\]]
#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[प्रोफ़ाइल]]
I work with \*bold\* text and \_italic\_ formatting. Also \{curly\} and \<angle\> brackets.
]
#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[कौशल]]
#block(above: 0em, below: 0.8em)[*Special\~Chars:* Testing \^caret and \~tilde characters]#block(above: 0em, below: 0.8em)[*Brackets:* Using \[square\] and \{curly\} brackets]
]

#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[परियोजनाएं]]
#block(above: 0em, below: 1em)[#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Project with \"quotes\" inside]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Description with backslash \\ and more \"quotes\"]]]
]],
  [#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[व्यक्तिगत जानकारी]]
#block(above: 0em, below: 0.8em)[#link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 123 4567]]#block(above: 0em, below: 0.8em)[New York, USA]
]]
)
#pagebreak(weak: true)

// ===== default | hi | alternate | unicode =====
#set page(margin: 1.2cm)
#set text(font: ("Noto Sans Devanagari"), size: 10pt)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= Jose Garcia
#block(above: 0em, below: 1.6em)[Desarrollador]
#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[प्रोफ़ाइल]]
Desarrollador con experiencia en tecnologias web.
]
#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[कौशल]]
#block(above: 0em, below: 0.8em)[*Idiomas:* Espanol (nativo), English, Francais]
]],
  [#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[व्यक्तिगत जानकारी]]
#block(above: 0em, below: 0.8em)[#link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 123 4567]]#block(above: 0em, below: 0.8em)[Madrid, Espana]
]]
)
#pagebreak(weak: true)

// ===== default | hi | alternate | arabic =====
#set page(margin: 1.2cm)
#set text(font: ("Noto Sans Devanagari"), size: 10pt)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= Ahmed Hassan
#block(above: 0em, below: 1.6em)[Software Engineer]
#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[प्रोफ़ाइल]]
Full-Stack Developer with experience in web technologies
]
#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[कौशल]]
#block(above: 0em, below: 0.8em)[*Languages:* JavaScript, TypeScript, Python]
]],
  [#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[व्यक्तिगत जानकारी]]
#block(above: 0em, below: 0.8em)[#link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 123 4567]]#block(above: 0em, below: 0.8em)[Cairo, Egypt]
]]
)
#pagebreak(weak: true)

// ===== default | hi | alternate | full =====
#set page(margin: 1.2cm)
#set text(font: ("Noto Sans Devanagari"), size: 10pt)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= Sarah Johnson
#block(above: 0em, below: 1.6em)[Full Stack Developer]
#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[प्रोफ़ाइल]]
Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.
]
#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[कार्य अनुभव]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Senior Developer में #link("https://techstart.com")[#underline[#text(fill: blue, "TechStart Inc.")]], Austin, TX]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "मार्च 2020 - वर्तमान")]]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Developer में WebDev Co., Houston, TX]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जून 2017 - फ़रवरी 2020")]]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
]

#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[शिक्षा]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text("Bachelor of Science में University of Texas, Austin, TX", size: 10pt, weight: "bold")]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "अगस्त 2013 - मई 2017")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[*ग्रेड:* 3.8 GPA

Focused on software engineering and distributed systems]]]
]

#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[इंटर्नशिप]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Software Intern में StartupXYZ, Remote]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "मई 2016 - अगस्त 2016")]]

#set list(indent: 1em)

- Assisted in mobile app development]
]

#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[कौशल]]
#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]
]

#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[परियोजनाएं]]
#block(above: 0em, below: 1em)[#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text(fill: blue, "GitHub")]]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जनवरी 2023 - वर्तमान")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly]#block(above: 0em, below: 1em)[#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text(fill: blue, "Live Demo")]]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जून 2021 - दिसंबर 2023")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Technical blog about web development best practices]]]
]

#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[स्वयंसेवा]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Volunteer Developer में Code for Good, Austin, TX]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जनवरी 2019 - वर्तमान")]]

#set list(indent: 1em)

- Built websites for local nonprofits]
]],
  [#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[व्यक्तिगत जानकारी]]
#block(above: 0em, below: 0.8em)[#link("mailto:sarah.johnson@email.com")[#text(fill: blue, dir: ltr, "sarah.johnson@email.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 987 6543]]#block(above: 0em, below: 0.8em)[Austin, TX]
]

#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[सोशल लिंक्स]]
#block(above: 0em, below: 0.8em)[#link("https://linkedin.com/in/sarahjohnson")[#text(fill: blue, "LinkedIn")]]#block(above: 0em, below: 0.8em)[#link("https://github.com/sarahjohnson")[#text(fill: blue, "GitHub")]]
]

#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[भाषाएं]]
#block(above: 0em, below: 0.8em)[*English* - मातृभाषा]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]
]

#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[प्रमाणपत्र]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[AWS Solutions Architect से Amazon Web Services · #link("https://aws.amazon.com/certification")[#text(fill: blue, "लिंक")]]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जून 2022")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Professional level certification]]]
]]
)
#pagebreak(weak: true)

// ===== default | hi | alternate | edgeCase =====
#set page(margin: 1.2cm)
#set text(font: ("Noto Sans Devanagari"), size: 10pt)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= 


#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[कौशल]]
#block(above: 0em, below: 0.8em)[Only description, no title]#block(above: 0em, below: 0.8em)[*Only title*]
]],
  []
)
#pagebreak(weak: true)

// ===== default | hi | alternate | descriptions =====
#set page(margin: 1.2cm)
#set text(font: ("Noto Sans Devanagari"), size: 10pt)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= Desc Tester
#block(above: 0em, below: 1.6em)[Software Engineer]
#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[प्रोफ़ाइल]]
Summary text
]
#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[शिक्षा]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text("BSc में Test U, Remote", size: 10pt, weight: "bold")]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "सितंबर 2015 - जून 2019")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[EducationDescriptionMarker]]

#set list(indent: 1em)

- EducationAchievementMarker]
]

#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[कार्य अनुभव]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Engineer में Acme, Remote]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जनवरी 2020 - वर्तमान")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[ExperienceDescriptionMarker]]

#set list(indent: 1em)

- shipped things]
]

#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[इंटर्नशिप]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Intern में Intern Co, Remote]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जून 2019 - सितंबर 2019")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[InternshipDescriptionMarker]]

#set list(indent: 1em)

- helped out]
]

#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[स्वयंसेवा]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Volunteer में Org, Remote]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जनवरी 2020 - वर्तमान")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[VolunteeringDescriptionMarker]]

#set list(indent: 1em)

- volunteered]
]

#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[परियोजनाएं]]
#block(above: 0em, below: 1em)[#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Test Project]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "मार्च 2021 - सितंबर 2022")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[ProjectDescriptionMarker]]

#set list(indent: 1em)

- built it]
]],
  [#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[व्यक्तिगत जानकारी]]
#block(above: 0em, below: 0.8em)[#link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 123 4567]]#block(above: 0em, below: 0.8em)[New York, USA]
]

#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[प्रमाणपत्र]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text("Test Cert से Issuer", size: 10pt, weight: "bold")]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जनवरी 2022")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[CertificateDescriptionMarker]]]
]]
)
#pagebreak(weak: true)

// ===== default | hi | alternate | withPhoto =====
#set page(margin: 1.2cm)
#set text(font: ("Noto Sans Devanagari"), size: 10pt)

#grid(
  columns: (7fr, 3fr),
  gutter: 20pt,
  [= Sarah Johnson
#block(above: 0em, below: 1.6em)[Full Stack Developer]
#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[प्रोफ़ाइल]]
Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.
]
#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[कार्य अनुभव]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Senior Developer में #link("https://techstart.com")[#underline[#text(fill: blue, "TechStart Inc.")]], Austin, TX]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "मार्च 2020 - वर्तमान")]]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Developer में WebDev Co., Houston, TX]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जून 2017 - फ़रवरी 2020")]]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
]

#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[शिक्षा]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text("Bachelor of Science में University of Texas, Austin, TX", size: 10pt, weight: "bold")]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "अगस्त 2013 - मई 2017")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[*ग्रेड:* 3.8 GPA

Focused on software engineering and distributed systems]]]
]

#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[इंटर्नशिप]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Software Intern में StartupXYZ, Remote]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "मई 2016 - अगस्त 2016")]]

#set list(indent: 1em)

- Assisted in mobile app development]
]

#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[कौशल]]
#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]
]

#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[परियोजनाएं]]
#block(above: 0em, below: 1em)[#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text(fill: blue, "GitHub")]]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जनवरी 2023 - वर्तमान")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly]#block(above: 0em, below: 1em)[#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text(fill: blue, "Live Demo")]]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जून 2021 - दिसंबर 2023")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Technical blog about web development best practices]]]
]

#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[स्वयंसेवा]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Volunteer Developer में Code for Good, Austin, TX]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जनवरी 2019 - वर्तमान")]]

#set list(indent: 1em)

- Built websites for local nonprofits]
]],
  [#block(width: 100%, below: 1em)[#align(center)[#box(width: 25mm, height: 25mm, clip: true, radius: 50%, image("/photo", width: 100%, height: 100%, fit: "cover"))]]

#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[व्यक्तिगत जानकारी]]
#block(above: 0em, below: 0.8em)[#link("mailto:sarah.johnson@email.com")[#text(fill: blue, dir: ltr, "sarah.johnson@email.com")]]#block(above: 0em, below: 0.8em)[#text(dir: ltr)[+1 555 987 6543]]#block(above: 0em, below: 0.8em)[Austin, TX]
]

#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[सोशल लिंक्स]]
#block(above: 0em, below: 0.8em)[#link("https://linkedin.com/in/sarahjohnson")[#text(fill: blue, "LinkedIn")]]#block(above: 0em, below: 0.8em)[#link("https://github.com/sarahjohnson")[#text(fill: blue, "GitHub")]]
]

#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[भाषाएं]]
#block(above: 0em, below: 0.8em)[*English* - मातृभाषा]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]
]

#block(above: 0em, below: 1.6em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[प्रमाणपत्र]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[AWS Solutions Architect से Amazon Web Services · #link("https://aws.amazon.com/certification")[#text(fill: blue, "लिंक")]]]

#block(above: 0em, below: 0.6em)[#text(size: 8pt, fill: rgb("#4B5563"))[#text(fill: rgb("#4B5563"), "जून 2022")]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Professional level certification]]]
]]
)
#pagebreak(weak: true)
