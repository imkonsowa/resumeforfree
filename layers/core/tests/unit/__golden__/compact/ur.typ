// ===== compact | ur | defaults | minimal =====
#set page(margin: 1cm)
#set text(font: ("Noto Naskh Arabic", "Calibri", "Roboto"), size: 12pt, dir: rtl)
#show link: set text(fill: blue)
#set par(leading: 0.65em)
#text(size: 24pt, weight: "bold")[John Doe]
#block(above: 1.3em)[#text(size: 14pt)[Software Engineer]]
#block(above: 0.8em)[#text(size: 11pt)[#link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] • New York, USA]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#pagebreak(weak: true)

// ===== compact | ur | defaults | specialChars =====
#set page(margin: 1cm)
#set text(font: ("Noto Naskh Arabic", "Calibri", "Roboto"), size: 12pt, dir: rtl)
#show link: set text(fill: blue)
#set par(leading: 0.65em)
#text(size: 24pt, weight: "bold")[John\# Doe\$]
#block(above: 1.3em)[#text(size: 14pt)[C\# Developer]]
#block(above: 0.8em)[#text(size: 11pt)[#link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] • New York, USA]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[پروفائل]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
Expert in C\#, F\#, and .NET development. Worked with \$100M+ projects.
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[تجربہ]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Senior C\# Developer بمقام #link("https://techcorp.com")[#underline[#text("Tech Corp")]]، San Francisco]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[جنوری 2020 - موجودہ]])]

#set list(indent: 1em)

- Led team of 5+ developers on C\# projects
- Reduced costs by \$50,000/year through optimization
- Implemented feature \#42 using .NET 8]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[مہارتیں]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*Languages:* C\#, F\#, TypeScript, JavaScript, C++]#block(above: 0em, below: 0.8em)[*Frameworks:* .NET, ASP.NET MVC, Entity Framework]#block(above: 0em, below: 0.8em)[*Tools:* Git, Docker, Azure DevOps]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[پراجیکٹس]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Operators Logic App - C\#, Windows App]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Developed automated logical operations for Issue \#123]]]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[E-Commerce Platform (Revenue: \$500K+) • #link("https://example.com")[#text("Live Demo")]]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Built with C\# & React. Handles \~10,000 transactions/day.]]]
]
#pagebreak(weak: true)

// ===== compact | ur | defaults | typstMarkup =====
#set page(margin: 1cm)
#set text(font: ("Noto Naskh Arabic", "Calibri", "Roboto"), size: 12pt, dir: rtl)
#show link: set text(fill: blue)
#set par(leading: 0.65em)
#text(size: 24pt, weight: "bold")[Test\*User With\_Underscore]
#block(above: 1.3em)[#text(size: 14pt)[Developer \[Senior\]]]
#block(above: 0.8em)[#text(size: 11pt)[#link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] • New York, USA]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[پروفائل]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
I work with \*bold\* text and \_italic\_ formatting. Also \{curly\} and \<angle\> brackets.
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[مہارتیں]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*Special\~Chars:* Testing \^caret and \~tilde characters]#block(above: 0em, below: 0.8em)[*Brackets:* Using \[square\] and \{curly\} brackets]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[پراجیکٹس]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Project with \"quotes\" inside]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Description with backslash \\ and more \"quotes\"]]]
]
#pagebreak(weak: true)

// ===== compact | ur | defaults | unicode =====
#set page(margin: 1cm)
#set text(font: ("Noto Naskh Arabic", "Calibri", "Roboto"), size: 12pt, dir: rtl)
#show link: set text(fill: blue)
#set par(leading: 0.65em)
#text(size: 24pt, weight: "bold")[Jose Garcia]
#block(above: 1.3em)[#text(size: 14pt)[Desarrollador]]
#block(above: 0.8em)[#text(size: 11pt)[#link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] • Madrid, Espana]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[پروفائل]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
Desarrollador con experiencia en tecnologias web.
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[مہارتیں]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*Idiomas:* Espanol (nativo), English, Francais]
]
#pagebreak(weak: true)

// ===== compact | ur | defaults | arabic =====
#set page(margin: 1cm)
#set text(font: ("Noto Naskh Arabic", "Calibri", "Roboto"), size: 12pt, dir: rtl)
#show link: set text(fill: blue)
#set par(leading: 0.65em)
#text(size: 24pt, weight: "bold")[Ahmed Hassan]
#block(above: 1.3em)[#text(size: 14pt)[Software Engineer]]
#block(above: 0.8em)[#text(size: 11pt)[#link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] • Cairo, Egypt]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[پروفائل]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
Full-Stack Developer with experience in web technologies
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[مہارتیں]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*Languages:* JavaScript, TypeScript, Python]
]
#pagebreak(weak: true)

// ===== compact | ur | defaults | full =====
#set page(margin: 1cm)
#set text(font: ("Noto Naskh Arabic", "Calibri", "Roboto"), size: 12pt, dir: rtl)
#show link: set text(fill: blue)
#set par(leading: 0.65em)
#text(size: 24pt, weight: "bold")[Sarah Johnson]
#block(above: 1.3em)[#text(size: 14pt)[Full Stack Developer]]
#block(above: 0.8em)[#text(size: 11pt)[#link("mailto:sarah.johnson@email.com")[#text(dir: ltr, "sarah.johnson@email.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 987 6543] • Austin, TX]]
#block(above: 0.8em)[#text(size: 11pt)[#link("https://linkedin.com/in/sarahjohnson")[#text("LinkedIn")] • #link("https://github.com/sarahjohnson")[#text("GitHub")]]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[پروفائل]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[تجربہ]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Senior Developer بمقام #link("https://techstart.com")[#underline[#text("TechStart Inc.")]]، Austin, TX]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[مارچ 2020 - موجودہ]])]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Developer بمقام WebDev Co.، Houston, TX]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[جون 2017 - فروری 2020]])]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[تعلیم]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Bachelor of Science بمقام University of Texas، Austin, TX]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[اگست 2013 - مئی 2017]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[#block(above: 0em, below: 0.6em)[*گریڈ:* 3.8 GPA]Focused on software engineering and distributed systems]]]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[انٹرن شپس]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Software Intern بمقام StartupXYZ، Remote]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[مئی 2016 - اگست 2016]])]

#set list(indent: 1em)

- Assisted in mobile app development]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[مہارتیں]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[پراجیکٹس]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text("GitHub")]]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[جنوری 2023 - موجودہ]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text("Live Demo")]]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[جون 2021 - دسمبر 2023]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Technical blog about web development best practices]]]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[رضاکارانہ خدمات]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Volunteer Developer بمقام Code for Good، Austin, TX]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[جنوری 2019 - موجودہ]])]

#set list(indent: 1em)

- Built websites for local nonprofits]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[زبانیں]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*English* - مادری زبان]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[سرٹیفیکیٹس]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[AWS Solutions Architect از Amazon Web Services · #link("https://aws.amazon.com/certification")[#text("لنک")]]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[جون 2022]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Professional level certification]]]
]
#pagebreak(weak: true)

// ===== compact | ur | defaults | edgeCase =====
#set page(margin: 1cm)
#set text(font: ("Noto Naskh Arabic", "Calibri", "Roboto"), size: 12pt, dir: rtl)
#show link: set text(fill: blue)
#set par(leading: 0.65em)
#text(size: 24pt, weight: "bold")[]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[مہارتیں]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[Only description, no title]#block(above: 0em, below: 0.8em)[*Only title*]
]
#pagebreak(weak: true)

// ===== compact | ur | defaults | descriptions =====
#set page(margin: 1cm)
#set text(font: ("Noto Naskh Arabic", "Calibri", "Roboto"), size: 12pt, dir: rtl)
#show link: set text(fill: blue)
#set par(leading: 0.65em)
#text(size: 24pt, weight: "bold")[Desc Tester]
#block(above: 1.3em)[#text(size: 14pt)[Software Engineer]]
#block(above: 0.8em)[#text(size: 11pt)[#link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] • New York, USA]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[پروفائل]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
Summary text
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[تعلیم]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[BSc بمقام Test U، Remote]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[ستمبر 2015 - جون 2019]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[EducationDescriptionMarker]]

#set list(indent: 1em)

- EducationAchievementMarker]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[تجربہ]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Engineer بمقام Acme، Remote]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[جنوری 2020 - موجودہ]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[ExperienceDescriptionMarker]]

#set list(indent: 1em)

- shipped things]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[انٹرن شپس]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Intern بمقام Intern Co، Remote]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[جون 2019 - ستمبر 2019]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[InternshipDescriptionMarker]]

#set list(indent: 1em)

- helped out]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[رضاکارانہ خدمات]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Volunteer بمقام Org، Remote]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[جنوری 2020 - موجودہ]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[VolunteeringDescriptionMarker]]

#set list(indent: 1em)

- volunteered]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[پراجیکٹس]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Test Project]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[مارچ 2021 - ستمبر 2022]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[ProjectDescriptionMarker]]

#set list(indent: 1em)

- built it]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[سرٹیفیکیٹس]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Test Cert از Issuer]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[جنوری 2022]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[CertificateDescriptionMarker]]]
]
#pagebreak(weak: true)

// ===== compact | ur | defaults | withPhoto =====
#set page(margin: 1cm)
#set text(font: ("Noto Naskh Arabic", "Calibri", "Roboto"), size: 12pt, dir: rtl)
#show link: set text(fill: blue)
#set par(leading: 0.65em)
#grid(
    columns: (1fr, auto),
    column-gutter: 16pt,
    align: (right, left + horizon),
    [#text(size: 24pt, weight: "bold")[Sarah Johnson]
#block(above: 1.3em)[#text(size: 14pt)[Full Stack Developer]]
#block(above: 0.8em)[#text(size: 11pt)[#link("mailto:sarah.johnson@email.com")[#text(dir: ltr, "sarah.johnson@email.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 987 6543] • Austin, TX]]
#block(above: 0.8em)[#text(size: 11pt)[#link("https://linkedin.com/in/sarahjohnson")[#text("LinkedIn")] • #link("https://github.com/sarahjohnson")[#text("GitHub")]]]],
    [#box(width: 25mm, height: 25mm, clip: true, radius: 1mm, image("/photo", width: 100%, height: 100%, fit: "cover"))],
)
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[پروفائل]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[تجربہ]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Senior Developer بمقام #link("https://techstart.com")[#underline[#text("TechStart Inc.")]]، Austin, TX]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[مارچ 2020 - موجودہ]])]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Developer بمقام WebDev Co.، Houston, TX]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[جون 2017 - فروری 2020]])]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[تعلیم]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Bachelor of Science بمقام University of Texas، Austin, TX]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[اگست 2013 - مئی 2017]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[#block(above: 0em, below: 0.6em)[*گریڈ:* 3.8 GPA]Focused on software engineering and distributed systems]]]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[انٹرن شپس]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Software Intern بمقام StartupXYZ، Remote]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[مئی 2016 - اگست 2016]])]

#set list(indent: 1em)

- Assisted in mobile app development]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[مہارتیں]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[پراجیکٹس]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text("GitHub")]]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[جنوری 2023 - موجودہ]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text("Live Demo")]]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[جون 2021 - دسمبر 2023]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Technical blog about web development best practices]]]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[رضاکارانہ خدمات]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[Volunteer Developer بمقام Code for Good، Austin, TX]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[جنوری 2019 - موجودہ]])]

#set list(indent: 1em)

- Built websites for local nonprofits]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[زبانیں]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[*English* - مادری زبان]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]
]

#block(above: 0em, below: 1.2em)[
#text(size: 15pt, weight: "bold")[سرٹیفیکیٹس]
#block(above: 0.3em, below: 0.8em)[#line(length: 100%, stroke: 0.5pt)]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 13pt, weight: "bold")[AWS Solutions Architect از Amazon Web Services · #link("https://aws.amazon.com/certification")[#text("لنک")]]], [#text(size: 12pt, weight: "bold", fill: rgb("#4B5563"))[جون 2022]])]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Professional level certification]]]
]
#pagebreak(weak: true)

// ===== compact | ur | alternate | minimal =====
#set page(margin: 1cm)
#set text(font: ("Noto Naskh Arabic", "Calibri", "Roboto"), size: 10pt, dir: rtl)
#show link: set text(fill: blue)
#set par(leading: 0.65em)
#text(size: 22pt, weight: "bold")[John Doe]
#block(above: 1.3em)[#text(size: 12pt)[Software Engineer]]
#block(above: 0.8em)[#text(size: 9pt)[#link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] • New York, USA]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#pagebreak(weak: true)

// ===== compact | ur | alternate | specialChars =====
#set page(margin: 1cm)
#set text(font: ("Noto Naskh Arabic", "Calibri", "Roboto"), size: 10pt, dir: rtl)
#show link: set text(fill: blue)
#set par(leading: 0.65em)
#text(size: 22pt, weight: "bold")[John\# Doe\$]
#block(above: 1.3em)[#text(size: 12pt)[C\# Developer]]
#block(above: 0.8em)[#text(size: 9pt)[#link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] • New York, USA]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[پروفائل]]
Expert in C\#, F\#, and .NET development. Worked with \$100M+ projects.
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[تجربہ]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Senior C\# Developer بمقام #link("https://techcorp.com")[#underline[#text("Tech Corp")]]، San Francisco]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[جنوری 2020 - موجودہ]])]

#set list(indent: 1em)

- Led team of 5+ developers on C\# projects
- Reduced costs by \$50,000/year through optimization
- Implemented feature \#42 using .NET 8]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[مہارتیں]]
#block(above: 0em, below: 0.8em)[*Languages:* C\#, F\#, TypeScript, JavaScript, C++]#block(above: 0em, below: 0.8em)[*Frameworks:* .NET, ASP.NET MVC, Entity Framework]#block(above: 0em, below: 0.8em)[*Tools:* Git, Docker, Azure DevOps]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[پراجیکٹس]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Operators Logic App - C\#, Windows App]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Developed automated logical operations for Issue \#123]]]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[E-Commerce Platform (Revenue: \$500K+) • #link("https://example.com")[#text("Live Demo")]]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Built with C\# & React. Handles \~10,000 transactions/day.]]]
]
#pagebreak(weak: true)

// ===== compact | ur | alternate | typstMarkup =====
#set page(margin: 1cm)
#set text(font: ("Noto Naskh Arabic", "Calibri", "Roboto"), size: 10pt, dir: rtl)
#show link: set text(fill: blue)
#set par(leading: 0.65em)
#text(size: 22pt, weight: "bold")[Test\*User With\_Underscore]
#block(above: 1.3em)[#text(size: 12pt)[Developer \[Senior\]]]
#block(above: 0.8em)[#text(size: 9pt)[#link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] • New York, USA]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[پروفائل]]
I work with \*bold\* text and \_italic\_ formatting. Also \{curly\} and \<angle\> brackets.
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[مہارتیں]]
#block(above: 0em, below: 0.8em)[*Special\~Chars:* Testing \^caret and \~tilde characters]#block(above: 0em, below: 0.8em)[*Brackets:* Using \[square\] and \{curly\} brackets]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[پراجیکٹس]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Project with \"quotes\" inside]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Description with backslash \\ and more \"quotes\"]]]
]
#pagebreak(weak: true)

// ===== compact | ur | alternate | unicode =====
#set page(margin: 1cm)
#set text(font: ("Noto Naskh Arabic", "Calibri", "Roboto"), size: 10pt, dir: rtl)
#show link: set text(fill: blue)
#set par(leading: 0.65em)
#text(size: 22pt, weight: "bold")[Jose Garcia]
#block(above: 1.3em)[#text(size: 12pt)[Desarrollador]]
#block(above: 0.8em)[#text(size: 9pt)[#link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] • Madrid, Espana]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[پروفائل]]
Desarrollador con experiencia en tecnologias web.
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[مہارتیں]]
#block(above: 0em, below: 0.8em)[*Idiomas:* Espanol (nativo), English, Francais]
]
#pagebreak(weak: true)

// ===== compact | ur | alternate | arabic =====
#set page(margin: 1cm)
#set text(font: ("Noto Naskh Arabic", "Calibri", "Roboto"), size: 10pt, dir: rtl)
#show link: set text(fill: blue)
#set par(leading: 0.65em)
#text(size: 22pt, weight: "bold")[Ahmed Hassan]
#block(above: 1.3em)[#text(size: 12pt)[Software Engineer]]
#block(above: 0.8em)[#text(size: 9pt)[#link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] • Cairo, Egypt]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[پروفائل]]
Full-Stack Developer with experience in web technologies
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[مہارتیں]]
#block(above: 0em, below: 0.8em)[*Languages:* JavaScript, TypeScript, Python]
]
#pagebreak(weak: true)

// ===== compact | ur | alternate | full =====
#set page(margin: 1cm)
#set text(font: ("Noto Naskh Arabic", "Calibri", "Roboto"), size: 10pt, dir: rtl)
#show link: set text(fill: blue)
#set par(leading: 0.65em)
#text(size: 22pt, weight: "bold")[Sarah Johnson]
#block(above: 1.3em)[#text(size: 12pt)[Full Stack Developer]]
#block(above: 0.8em)[#text(size: 9pt)[#link("mailto:sarah.johnson@email.com")[#text(dir: ltr, "sarah.johnson@email.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 987 6543] • Austin, TX]]
#block(above: 0.8em)[#text(size: 9pt)[#link("https://linkedin.com/in/sarahjohnson")[#text("LinkedIn")] • #link("https://github.com/sarahjohnson")[#text("GitHub")]]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[پروفائل]]
Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[تجربہ]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Senior Developer بمقام #link("https://techstart.com")[#underline[#text("TechStart Inc.")]]، Austin, TX]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[مارچ 2020 - موجودہ]])]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Developer بمقام WebDev Co.، Houston, TX]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[جون 2017 - فروری 2020]])]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[تعلیم]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Bachelor of Science بمقام University of Texas، Austin, TX]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[اگست 2013 - مئی 2017]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[#block(above: 0em, below: 0.6em)[*گریڈ:* 3.8 GPA]Focused on software engineering and distributed systems]]]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[انٹرن شپس]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Software Intern بمقام StartupXYZ، Remote]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[مئی 2016 - اگست 2016]])]

#set list(indent: 1em)

- Assisted in mobile app development]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[مہارتیں]]
#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[پراجیکٹس]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text("GitHub")]]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[جنوری 2023 - موجودہ]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text("Live Demo")]]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[جون 2021 - دسمبر 2023]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Technical blog about web development best practices]]]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[رضاکارانہ خدمات]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Volunteer Developer بمقام Code for Good، Austin, TX]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[جنوری 2019 - موجودہ]])]

#set list(indent: 1em)

- Built websites for local nonprofits]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[زبانیں]]
#block(above: 0em, below: 0.8em)[*English* - مادری زبان]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[سرٹیفیکیٹس]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[AWS Solutions Architect از Amazon Web Services · #link("https://aws.amazon.com/certification")[#text("لنک")]]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[جون 2022]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Professional level certification]]]
]
#pagebreak(weak: true)

// ===== compact | ur | alternate | edgeCase =====
#set page(margin: 1cm)
#set text(font: ("Noto Naskh Arabic", "Calibri", "Roboto"), size: 10pt, dir: rtl)
#show link: set text(fill: blue)
#set par(leading: 0.65em)
#text(size: 22pt, weight: "bold")[]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[مہارتیں]]
#block(above: 0em, below: 0.8em)[Only description, no title]#block(above: 0em, below: 0.8em)[*Only title*]
]
#pagebreak(weak: true)

// ===== compact | ur | alternate | descriptions =====
#set page(margin: 1cm)
#set text(font: ("Noto Naskh Arabic", "Calibri", "Roboto"), size: 10pt, dir: rtl)
#show link: set text(fill: blue)
#set par(leading: 0.65em)
#text(size: 22pt, weight: "bold")[Desc Tester]
#block(above: 1.3em)[#text(size: 12pt)[Software Engineer]]
#block(above: 0.8em)[#text(size: 9pt)[#link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] • New York, USA]]
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[پروفائل]]
Summary text
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[تعلیم]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[BSc بمقام Test U، Remote]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[ستمبر 2015 - جون 2019]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[EducationDescriptionMarker]]

#set list(indent: 1em)

- EducationAchievementMarker]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[تجربہ]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Engineer بمقام Acme، Remote]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[جنوری 2020 - موجودہ]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[ExperienceDescriptionMarker]]

#set list(indent: 1em)

- shipped things]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[انٹرن شپس]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Intern بمقام Intern Co، Remote]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[جون 2019 - ستمبر 2019]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[InternshipDescriptionMarker]]

#set list(indent: 1em)

- helped out]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[رضاکارانہ خدمات]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Volunteer بمقام Org، Remote]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[جنوری 2020 - موجودہ]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[VolunteeringDescriptionMarker]]

#set list(indent: 1em)

- volunteered]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[پراجیکٹس]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Test Project]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[مارچ 2021 - ستمبر 2022]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[ProjectDescriptionMarker]]

#set list(indent: 1em)

- built it]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[سرٹیفیکیٹس]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Test Cert از Issuer]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[جنوری 2022]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[CertificateDescriptionMarker]]]
]
#pagebreak(weak: true)

// ===== compact | ur | alternate | withPhoto =====
#set page(margin: 1cm)
#set text(font: ("Noto Naskh Arabic", "Calibri", "Roboto"), size: 10pt, dir: rtl)
#show link: set text(fill: blue)
#set par(leading: 0.65em)
#grid(
    columns: (1fr, auto),
    column-gutter: 16pt,
    align: (right, left + horizon),
    [#text(size: 22pt, weight: "bold")[Sarah Johnson]
#block(above: 1.3em)[#text(size: 12pt)[Full Stack Developer]]
#block(above: 0.8em)[#text(size: 9pt)[#link("mailto:sarah.johnson@email.com")[#text(dir: ltr, "sarah.johnson@email.com")] • #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 987 6543] • Austin, TX]]
#block(above: 0.8em)[#text(size: 9pt)[#link("https://linkedin.com/in/sarahjohnson")[#text("LinkedIn")] • #link("https://github.com/sarahjohnson")[#text("GitHub")]]]],
    [#box(width: 25mm, height: 25mm, clip: true, radius: 50%, image("/photo", width: 100%, height: 100%, fit: "cover"))],
)
#block(above: 1em, below: 1em)[#line(length: 100%, stroke: 0.5pt + black)]
#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[پروفائل]]
Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[تجربہ]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Senior Developer بمقام #link("https://techstart.com")[#underline[#text("TechStart Inc.")]]، Austin, TX]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[مارچ 2020 - موجودہ]])]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Developer بمقام WebDev Co.، Houston, TX]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[جون 2017 - فروری 2020]])]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[تعلیم]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Bachelor of Science بمقام University of Texas، Austin, TX]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[اگست 2013 - مئی 2017]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[#block(above: 0em, below: 0.6em)[*گریڈ:* 3.8 GPA]Focused on software engineering and distributed systems]]]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[انٹرن شپس]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Software Intern بمقام StartupXYZ، Remote]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[مئی 2016 - اگست 2016]])]

#set list(indent: 1em)

- Assisted in mobile app development]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[مہارتیں]]
#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[پراجیکٹس]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text("GitHub")]]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[جنوری 2023 - موجودہ]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly]#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text("Live Demo")]]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[جون 2021 - دسمبر 2023]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Technical blog about web development best practices]]]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[رضاکارانہ خدمات]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[Volunteer Developer بمقام Code for Good، Austin, TX]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[جنوری 2019 - موجودہ]])]

#set list(indent: 1em)

- Built websites for local nonprofits]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[زبانیں]]
#block(above: 0em, below: 0.8em)[*English* - مادری زبان]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]
]

#block(above: 0em, below: 1.2em)[
#block(below: 1em, above: 0em)[#text(size: 13pt, weight: "bold")[سرٹیفیکیٹس]]
#block(above: 0em, below: 0.8em)[#block(below: 0.6em)[#grid(columns: (1fr, auto), column-gutter: 0.8em, [#text(size: 11pt, weight: "bold")[AWS Solutions Architect از Amazon Web Services · #link("https://aws.amazon.com/certification")[#text("لنک")]]], [#text(size: 10pt, weight: "bold", fill: rgb("#4B5563"))[جون 2022]])]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Professional level certification]]]
]
#pagebreak(weak: true)
