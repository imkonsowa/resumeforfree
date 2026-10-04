// ===== simple | ar | defaults | minimal =====
#set page(margin: 1.5cm)
#set text(font: ("Noto Sans Arabic", "Calibri", "Roboto"), size: 12pt, dir: rtl)
#set par(leading: 0.75em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 20pt, weight: "bold")[John Doe]]
#block(above: 0em, below: 1em)[#text(size: 14pt)[Software Engineer]]
#block(above: 0em, below: 1.4em)[#text(size: 12pt)[New York, USA · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] · #link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.6em)

#pagebreak(weak: true)

// ===== simple | ar | defaults | specialChars =====
#set page(margin: 1.5cm)
#set text(font: ("Noto Sans Arabic", "Calibri", "Roboto"), size: 12pt, dir: rtl)
#set par(leading: 0.75em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 20pt, weight: "bold")[John\# Doe\$]]
#block(above: 0em, below: 1em)[#text(size: 14pt)[C\# Developer]]
#block(above: 0em, below: 1.4em)[#text(size: 12pt)[New York, USA · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] · #link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.6em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[النبذة الشخصية]],
    [Expert in C\#, F\#, and .NET development. Worked with \$100M+ projects.]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[الخبرة العملية]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "يناير 2020 - حتى الآن")]],
    [#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Senior C\# Developer في #link("https://techcorp.com")[#underline[#text(fill: blue, "Tech Corp")]]، San Francisco]]

#set list(indent: 1em)

- Led team of 5+ developers on C\# projects
- Reduced costs by \$50,000/year through optimization
- Implemented feature \#42 using .NET 8]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[المهارات]],
    [#block(above: 0em, below: 0.8em)[*Languages:* C\#, F\#, TypeScript, JavaScript, C++]#block(above: 0em, below: 0.8em)[*Frameworks:* .NET, ASP.NET MVC, Entity Framework]#block(above: 0em, below: 0.8em)[*Tools:* Git, Docker, Azure DevOps]]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[المشاريع]],
    [#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Operators Logic App - C\#, Windows App]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Developed automated logical operations for Issue \#123]]],
    [],
    [#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[E-Commerce Platform (Revenue: \$500K+) • #link("https://example.com")[#text(fill: blue, "Live Demo")]]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Built with C\# & React. Handles \~10,000 transactions/day.]]]
)
#pagebreak(weak: true)

// ===== simple | ar | defaults | typstMarkup =====
#set page(margin: 1.5cm)
#set text(font: ("Noto Sans Arabic", "Calibri", "Roboto"), size: 12pt, dir: rtl)
#set par(leading: 0.75em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 20pt, weight: "bold")[Test\*User With\_Underscore]]
#block(above: 0em, below: 1em)[#text(size: 14pt)[Developer \[Senior\]]]
#block(above: 0em, below: 1.4em)[#text(size: 12pt)[New York, USA · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] · #link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.6em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[النبذة الشخصية]],
    [I work with \*bold\* text and \_italic\_ formatting. Also \{curly\} and \<angle\> brackets.]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[المهارات]],
    [#block(above: 0em, below: 0.8em)[*Special\~Chars:* Testing \^caret and \~tilde characters]#block(above: 0em, below: 0.8em)[*Brackets:* Using \[square\] and \{curly\} brackets]]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[المشاريع]],
    [#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Project with \"quotes\" inside]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Description with backslash \\ and more \"quotes\"]]]
)
#pagebreak(weak: true)

// ===== simple | ar | defaults | unicode =====
#set page(margin: 1.5cm)
#set text(font: ("Noto Sans Arabic", "Calibri", "Roboto"), size: 12pt, dir: rtl)
#set par(leading: 0.75em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 20pt, weight: "bold")[Jose Garcia]]
#block(above: 0em, below: 1em)[#text(size: 14pt)[Desarrollador]]
#block(above: 0em, below: 1.4em)[#text(size: 12pt)[Madrid, Espana · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] · #link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.6em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[النبذة الشخصية]],
    [Desarrollador con experiencia en tecnologias web.]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[المهارات]],
    [#block(above: 0em, below: 0.8em)[*Idiomas:* Espanol (nativo), English, Francais]]
)
#pagebreak(weak: true)

// ===== simple | ar | defaults | arabic =====
#set page(margin: 1.5cm)
#set text(font: ("Noto Sans Arabic", "Calibri", "Roboto"), size: 12pt, dir: rtl)
#set par(leading: 0.75em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 20pt, weight: "bold")[Ahmed Hassan]]
#block(above: 0em, below: 1em)[#text(size: 14pt)[Software Engineer]]
#block(above: 0em, below: 1.4em)[#text(size: 12pt)[Cairo, Egypt · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] · #link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.6em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[النبذة الشخصية]],
    [Full-Stack Developer with experience in web technologies]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[المهارات]],
    [#block(above: 0em, below: 0.8em)[*Languages:* JavaScript, TypeScript, Python]]
)
#pagebreak(weak: true)

// ===== simple | ar | defaults | full =====
#set page(margin: 1.5cm)
#set text(font: ("Noto Sans Arabic", "Calibri", "Roboto"), size: 12pt, dir: rtl)
#set par(leading: 0.75em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 20pt, weight: "bold")[Sarah Johnson]]
#block(above: 0em, below: 1em)[#text(size: 14pt)[Full Stack Developer]]
#block(above: 0em, below: 1.4em)[#text(size: 12pt)[Austin, TX · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 987 6543] · #link("mailto:sarah.johnson@email.com")[#text(fill: blue, dir: ltr, "sarah.johnson@email.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.6em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[الروابط الشخصية والاجتماعية]],
    [#link("https://linkedin.com/in/sarahjohnson")[#text(fill: blue, "LinkedIn")], #link("https://github.com/sarahjohnson")[#text(fill: blue, "GitHub")]]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[النبذة الشخصية]],
    [Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[الخبرة العملية]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "مارس 2020 - حتى الآن")]],
    [#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Senior Developer في #link("https://techstart.com")[#underline[#text(fill: blue, "TechStart Inc.")]]، Austin, TX]]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%],
    [#text(size: 11pt)[#text(fill: rgb("#4B5563"), "يونيو 2017 - فبراير 2020")]],
    [#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Developer في WebDev Co.، Houston, TX]]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[التعليم]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "أغسطس 2013 - مايو 2017")]],
    [#block(below: 0.6em)[#text("Bachelor of Science في University of Texas، Austin, TX", size: 12pt, weight: "bold")]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[*المعدل:* 3.8 GPA

Focused on software engineering and distributed systems]]]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[التدريب المهني]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "مايو 2016 - أغسطس 2016")]],
    [#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Software Intern في StartupXYZ، Remote]]

#set list(indent: 1em)

- Assisted in mobile app development]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[المهارات]],
    [#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[المشاريع]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "يناير 2023 - حتى الآن")]],
    [#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text(fill: blue, "GitHub")]]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly],
    [#text(size: 11pt)[#text(fill: rgb("#4B5563"), "يونيو 2021 - ديسمبر 2023")]],
    [#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text(fill: blue, "Live Demo")]]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Technical blog about web development best practices]]]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[الأعمال التطوعية]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "يناير 2019 - حتى الآن")]],
    [#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Volunteer Developer في Code for Good، Austin, TX]]

#set list(indent: 1em)

- Built websites for local nonprofits]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[اللغات]],
    [#block(above: 0em, below: 0.8em)[*English* - اللغة الأم]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[الشهادات]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "يونيو 2022")]],
    [#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[AWS Solutions Architect من Amazon Web Services · #link("https://aws.amazon.com/certification")[#text(fill: blue, "رابط")]]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Professional level certification]]]
)
#pagebreak(weak: true)

// ===== simple | ar | defaults | edgeCase =====
#set page(margin: 1.5cm)
#set text(font: ("Noto Sans Arabic", "Calibri", "Roboto"), size: 12pt, dir: rtl)
#set par(leading: 0.75em, justify: false)

#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.6em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[المهارات]],
    [#block(above: 0em, below: 0.8em)[Only description, no title]#block(above: 0em, below: 0.8em)[*Only title*]]
)
#pagebreak(weak: true)

// ===== simple | ar | defaults | descriptions =====
#set page(margin: 1.5cm)
#set text(font: ("Noto Sans Arabic", "Calibri", "Roboto"), size: 12pt, dir: rtl)
#set par(leading: 0.75em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 20pt, weight: "bold")[Desc Tester]]
#block(above: 0em, below: 1em)[#text(size: 14pt)[Software Engineer]]
#block(above: 0em, below: 1.4em)[#text(size: 12pt)[New York, USA · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] · #link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.6em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[النبذة الشخصية]],
    [Summary text]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[التعليم]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "سبتمبر 2015 - يونيو 2019")]],
    [#block(below: 0.6em)[#text("BSc في Test U، Remote", size: 12pt, weight: "bold")]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[EducationDescriptionMarker]]

#set list(indent: 1em)

- EducationAchievementMarker]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[الخبرة العملية]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "يناير 2020 - حتى الآن")]],
    [#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Engineer في Acme، Remote]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[ExperienceDescriptionMarker]]

#set list(indent: 1em)

- shipped things]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[التدريب المهني]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "يونيو 2019 - سبتمبر 2019")]],
    [#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Intern في Intern Co، Remote]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[InternshipDescriptionMarker]]

#set list(indent: 1em)

- helped out]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[الأعمال التطوعية]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "يناير 2020 - حتى الآن")]],
    [#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Volunteer في Org، Remote]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[VolunteeringDescriptionMarker]]

#set list(indent: 1em)

- volunteered]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[المشاريع]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "مارس 2021 - سبتمبر 2022")]],
    [#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Test Project]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[ProjectDescriptionMarker]]

#set list(indent: 1em)

- built it]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[الشهادات]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "يناير 2022")]],
    [#block(below: 0.6em)[#text("Test Cert من Issuer", size: 12pt, weight: "bold")]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[CertificateDescriptionMarker]]]
)
#pagebreak(weak: true)

// ===== simple | ar | defaults | withPhoto =====
#set page(margin: 1.5cm)
#set text(font: ("Noto Sans Arabic", "Calibri", "Roboto"), size: 12pt, dir: rtl)
#set par(leading: 0.75em, justify: false)
#grid(
    columns: (1fr, auto),
    column-gutter: 16pt,
    align: (start + top, end + top),
    [#block(above: 0em, below: 0.6em)[#text(size: 20pt, weight: "bold")[Sarah Johnson]]
#block(above: 0em, below: 1em)[#text(size: 14pt)[Full Stack Developer]]
#block(above: 0em, below: 1.4em)[#text(size: 12pt)[Austin, TX · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 987 6543] · #link("mailto:sarah.johnson@email.com")[#text(fill: blue, dir: ltr, "sarah.johnson@email.com")]]]],
    [#box(width: 25mm, height: 25mm, clip: true, radius: 1mm, image("/photo", width: 100%, height: 100%, fit: "cover"))],
)
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.6em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[الروابط الشخصية والاجتماعية]],
    [#link("https://linkedin.com/in/sarahjohnson")[#text(fill: blue, "LinkedIn")], #link("https://github.com/sarahjohnson")[#text(fill: blue, "GitHub")]]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[النبذة الشخصية]],
    [Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[الخبرة العملية]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "مارس 2020 - حتى الآن")]],
    [#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Senior Developer في #link("https://techstart.com")[#underline[#text(fill: blue, "TechStart Inc.")]]، Austin, TX]]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%],
    [#text(size: 11pt)[#text(fill: rgb("#4B5563"), "يونيو 2017 - فبراير 2020")]],
    [#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Developer في WebDev Co.، Houston, TX]]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[التعليم]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "أغسطس 2013 - مايو 2017")]],
    [#block(below: 0.6em)[#text("Bachelor of Science في University of Texas، Austin, TX", size: 12pt, weight: "bold")]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[*المعدل:* 3.8 GPA

Focused on software engineering and distributed systems]]]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[التدريب المهني]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "مايو 2016 - أغسطس 2016")]],
    [#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Software Intern في StartupXYZ، Remote]]

#set list(indent: 1em)

- Assisted in mobile app development]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[المهارات]],
    [#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[المشاريع]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "يناير 2023 - حتى الآن")]],
    [#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text(fill: blue, "GitHub")]]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly],
    [#text(size: 11pt)[#text(fill: rgb("#4B5563"), "يونيو 2021 - ديسمبر 2023")]],
    [#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text(fill: blue, "Live Demo")]]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Technical blog about web development best practices]]]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[الأعمال التطوعية]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "يناير 2019 - حتى الآن")]],
    [#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[Volunteer Developer في Code for Good، Austin, TX]]

#set list(indent: 1em)

- Built websites for local nonprofits]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[اللغات]],
    [#block(above: 0em, below: 0.8em)[*English* - اللغة الأم]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 15pt, weight: "bold")[الشهادات]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "يونيو 2022")]],
    [#block(below: 0.6em)[#text(size: 12pt, weight: "bold")[AWS Solutions Architect من Amazon Web Services · #link("https://aws.amazon.com/certification")[#text(fill: blue, "رابط")]]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Professional level certification]]]
)
#pagebreak(weak: true)

// ===== simple | ar | alternate | minimal =====
#set page(margin: 1.5cm)
#set text(font: ("Noto Sans Arabic", "Calibri", "Roboto"), size: 10pt, dir: rtl)
#set par(leading: 0.75em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 18pt, weight: "bold")[John Doe]]
#block(above: 0em, below: 1em)[#text(size: 12pt)[Software Engineer]]
#block(above: 0em, below: 1.4em)[#text(size: 10pt)[New York, USA · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] · #link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.6em)

#pagebreak(weak: true)

// ===== simple | ar | alternate | specialChars =====
#set page(margin: 1.5cm)
#set text(font: ("Noto Sans Arabic", "Calibri", "Roboto"), size: 10pt, dir: rtl)
#set par(leading: 0.75em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 18pt, weight: "bold")[John\# Doe\$]]
#block(above: 0em, below: 1em)[#text(size: 12pt)[C\# Developer]]
#block(above: 0em, below: 1.4em)[#text(size: 10pt)[New York, USA · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] · #link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.6em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[النبذة الشخصية]],
    [Expert in C\#, F\#, and .NET development. Worked with \$100M+ projects.]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[الخبرة العملية]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "يناير 2020 - حتى الآن")]],
    [#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Senior C\# Developer في #link("https://techcorp.com")[#underline[#text(fill: blue, "Tech Corp")]]، San Francisco]]

#set list(indent: 1em)

- Led team of 5+ developers on C\# projects
- Reduced costs by \$50,000/year through optimization
- Implemented feature \#42 using .NET 8]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[المهارات]],
    [#block(above: 0em, below: 0.8em)[*Languages:* C\#, F\#, TypeScript, JavaScript, C++]#block(above: 0em, below: 0.8em)[*Frameworks:* .NET, ASP.NET MVC, Entity Framework]#block(above: 0em, below: 0.8em)[*Tools:* Git, Docker, Azure DevOps]]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[المشاريع]],
    [#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Operators Logic App - C\#, Windows App]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Developed automated logical operations for Issue \#123]]],
    [],
    [#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[E-Commerce Platform (Revenue: \$500K+) • #link("https://example.com")[#text(fill: blue, "Live Demo")]]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Built with C\# & React. Handles \~10,000 transactions/day.]]]
)
#pagebreak(weak: true)

// ===== simple | ar | alternate | typstMarkup =====
#set page(margin: 1.5cm)
#set text(font: ("Noto Sans Arabic", "Calibri", "Roboto"), size: 10pt, dir: rtl)
#set par(leading: 0.75em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 18pt, weight: "bold")[Test\*User With\_Underscore]]
#block(above: 0em, below: 1em)[#text(size: 12pt)[Developer \[Senior\]]]
#block(above: 0em, below: 1.4em)[#text(size: 10pt)[New York, USA · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] · #link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.6em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[النبذة الشخصية]],
    [I work with \*bold\* text and \_italic\_ formatting. Also \{curly\} and \<angle\> brackets.]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[المهارات]],
    [#block(above: 0em, below: 0.8em)[*Special\~Chars:* Testing \^caret and \~tilde characters]#block(above: 0em, below: 0.8em)[*Brackets:* Using \[square\] and \{curly\} brackets]]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[المشاريع]],
    [#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Project with \"quotes\" inside]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Description with backslash \\ and more \"quotes\"]]]
)
#pagebreak(weak: true)

// ===== simple | ar | alternate | unicode =====
#set page(margin: 1.5cm)
#set text(font: ("Noto Sans Arabic", "Calibri", "Roboto"), size: 10pt, dir: rtl)
#set par(leading: 0.75em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 18pt, weight: "bold")[Jose Garcia]]
#block(above: 0em, below: 1em)[#text(size: 12pt)[Desarrollador]]
#block(above: 0em, below: 1.4em)[#text(size: 10pt)[Madrid, Espana · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] · #link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.6em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[النبذة الشخصية]],
    [Desarrollador con experiencia en tecnologias web.]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[المهارات]],
    [#block(above: 0em, below: 0.8em)[*Idiomas:* Espanol (nativo), English, Francais]]
)
#pagebreak(weak: true)

// ===== simple | ar | alternate | arabic =====
#set page(margin: 1.5cm)
#set text(font: ("Noto Sans Arabic", "Calibri", "Roboto"), size: 10pt, dir: rtl)
#set par(leading: 0.75em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 18pt, weight: "bold")[Ahmed Hassan]]
#block(above: 0em, below: 1em)[#text(size: 12pt)[Software Engineer]]
#block(above: 0em, below: 1.4em)[#text(size: 10pt)[Cairo, Egypt · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] · #link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.6em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[النبذة الشخصية]],
    [Full-Stack Developer with experience in web technologies]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[المهارات]],
    [#block(above: 0em, below: 0.8em)[*Languages:* JavaScript, TypeScript, Python]]
)
#pagebreak(weak: true)

// ===== simple | ar | alternate | full =====
#set page(margin: 1.5cm)
#set text(font: ("Noto Sans Arabic", "Calibri", "Roboto"), size: 10pt, dir: rtl)
#set par(leading: 0.75em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 18pt, weight: "bold")[Sarah Johnson]]
#block(above: 0em, below: 1em)[#text(size: 12pt)[Full Stack Developer]]
#block(above: 0em, below: 1.4em)[#text(size: 10pt)[Austin, TX · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 987 6543] · #link("mailto:sarah.johnson@email.com")[#text(fill: blue, dir: ltr, "sarah.johnson@email.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.6em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[الروابط الشخصية والاجتماعية]],
    [#link("https://linkedin.com/in/sarahjohnson")[#text(fill: blue, "LinkedIn")], #link("https://github.com/sarahjohnson")[#text(fill: blue, "GitHub")]]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[النبذة الشخصية]],
    [Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[الخبرة العملية]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "مارس 2020 - حتى الآن")]],
    [#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Senior Developer في #link("https://techstart.com")[#underline[#text(fill: blue, "TechStart Inc.")]]، Austin, TX]]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%],
    [#text(size: 9pt)[#text(fill: rgb("#4B5563"), "يونيو 2017 - فبراير 2020")]],
    [#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Developer في WebDev Co.، Houston, TX]]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[التعليم]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "أغسطس 2013 - مايو 2017")]],
    [#block(below: 0.6em)[#text("Bachelor of Science في University of Texas، Austin, TX", size: 10pt, weight: "bold")]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[*المعدل:* 3.8 GPA

Focused on software engineering and distributed systems]]]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[التدريب المهني]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "مايو 2016 - أغسطس 2016")]],
    [#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Software Intern في StartupXYZ، Remote]]

#set list(indent: 1em)

- Assisted in mobile app development]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[المهارات]],
    [#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[المشاريع]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "يناير 2023 - حتى الآن")]],
    [#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text(fill: blue, "GitHub")]]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly],
    [#text(size: 9pt)[#text(fill: rgb("#4B5563"), "يونيو 2021 - ديسمبر 2023")]],
    [#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text(fill: blue, "Live Demo")]]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Technical blog about web development best practices]]]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[الأعمال التطوعية]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "يناير 2019 - حتى الآن")]],
    [#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Volunteer Developer في Code for Good، Austin, TX]]

#set list(indent: 1em)

- Built websites for local nonprofits]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[اللغات]],
    [#block(above: 0em, below: 0.8em)[*English* - اللغة الأم]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[الشهادات]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "يونيو 2022")]],
    [#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[AWS Solutions Architect من Amazon Web Services · #link("https://aws.amazon.com/certification")[#text(fill: blue, "رابط")]]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Professional level certification]]]
)
#pagebreak(weak: true)

// ===== simple | ar | alternate | edgeCase =====
#set page(margin: 1.5cm)
#set text(font: ("Noto Sans Arabic", "Calibri", "Roboto"), size: 10pt, dir: rtl)
#set par(leading: 0.75em, justify: false)

#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.6em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[المهارات]],
    [#block(above: 0em, below: 0.8em)[Only description, no title]#block(above: 0em, below: 0.8em)[*Only title*]]
)
#pagebreak(weak: true)

// ===== simple | ar | alternate | descriptions =====
#set page(margin: 1.5cm)
#set text(font: ("Noto Sans Arabic", "Calibri", "Roboto"), size: 10pt, dir: rtl)
#set par(leading: 0.75em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 18pt, weight: "bold")[Desc Tester]]
#block(above: 0em, below: 1em)[#text(size: 12pt)[Software Engineer]]
#block(above: 0em, below: 1.4em)[#text(size: 10pt)[New York, USA · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] · #link("mailto:john@example.com")[#text(fill: blue, dir: ltr, "john@example.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.6em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[النبذة الشخصية]],
    [Summary text]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[التعليم]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "سبتمبر 2015 - يونيو 2019")]],
    [#block(below: 0.6em)[#text("BSc في Test U، Remote", size: 10pt, weight: "bold")]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[EducationDescriptionMarker]]

#set list(indent: 1em)

- EducationAchievementMarker]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[الخبرة العملية]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "يناير 2020 - حتى الآن")]],
    [#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Engineer في Acme، Remote]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[ExperienceDescriptionMarker]]

#set list(indent: 1em)

- shipped things]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[التدريب المهني]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "يونيو 2019 - سبتمبر 2019")]],
    [#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Intern في Intern Co، Remote]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[InternshipDescriptionMarker]]

#set list(indent: 1em)

- helped out]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[الأعمال التطوعية]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "يناير 2020 - حتى الآن")]],
    [#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Volunteer في Org، Remote]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[VolunteeringDescriptionMarker]]

#set list(indent: 1em)

- volunteered]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[المشاريع]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "مارس 2021 - سبتمبر 2022")]],
    [#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Test Project]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[ProjectDescriptionMarker]]

#set list(indent: 1em)

- built it]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[الشهادات]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "يناير 2022")]],
    [#block(below: 0.6em)[#text("Test Cert من Issuer", size: 10pt, weight: "bold")]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[CertificateDescriptionMarker]]]
)
#pagebreak(weak: true)

// ===== simple | ar | alternate | withPhoto =====
#set page(margin: 1.5cm)
#set text(font: ("Noto Sans Arabic", "Calibri", "Roboto"), size: 10pt, dir: rtl)
#set par(leading: 0.75em, justify: false)
#grid(
    columns: (1fr, auto),
    column-gutter: 16pt,
    align: (start + top, end + top),
    [#block(above: 0em, below: 0.6em)[#text(size: 18pt, weight: "bold")[Sarah Johnson]]
#block(above: 0em, below: 1em)[#text(size: 12pt)[Full Stack Developer]]
#block(above: 0em, below: 1.4em)[#text(size: 10pt)[Austin, TX · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 987 6543] · #link("mailto:sarah.johnson@email.com")[#text(fill: blue, dir: ltr, "sarah.johnson@email.com")]]]],
    [#box(width: 25mm, height: 25mm, clip: true, radius: 50%, image("/photo", width: 100%, height: 100%, fit: "cover"))],
)
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.6em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[الروابط الشخصية والاجتماعية]],
    [#link("https://linkedin.com/in/sarahjohnson")[#text(fill: blue, "LinkedIn")], #link("https://github.com/sarahjohnson")[#text(fill: blue, "GitHub")]]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[النبذة الشخصية]],
    [Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[الخبرة العملية]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "مارس 2020 - حتى الآن")]],
    [#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Senior Developer في #link("https://techstart.com")[#underline[#text(fill: blue, "TechStart Inc.")]]، Austin, TX]]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%],
    [#text(size: 9pt)[#text(fill: rgb("#4B5563"), "يونيو 2017 - فبراير 2020")]],
    [#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Developer في WebDev Co.، Houston, TX]]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[التعليم]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "أغسطس 2013 - مايو 2017")]],
    [#block(below: 0.6em)[#text("Bachelor of Science في University of Texas، Austin, TX", size: 10pt, weight: "bold")]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[*المعدل:* 3.8 GPA

Focused on software engineering and distributed systems]]]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[التدريب المهني]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "مايو 2016 - أغسطس 2016")]],
    [#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Software Intern في StartupXYZ، Remote]]

#set list(indent: 1em)

- Assisted in mobile app development]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[المهارات]],
    [#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[المشاريع]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "يناير 2023 - حتى الآن")]],
    [#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text(fill: blue, "GitHub")]]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly],
    [#text(size: 9pt)[#text(fill: rgb("#4B5563"), "يونيو 2021 - ديسمبر 2023")]],
    [#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text(fill: blue, "Live Demo")]]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Technical blog about web development best practices]]]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[الأعمال التطوعية]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "يناير 2019 - حتى الآن")]],
    [#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[Volunteer Developer في Code for Good، Austin, TX]]

#set list(indent: 1em)

- Built websites for local nonprofits]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[اللغات]],
    [#block(above: 0em, below: 0.8em)[*English* - اللغة الأم]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]]
)
#block(above: 0.8em, below: 0.8em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.9em,
    align: (left + top, left + top),
    [#text(size: 13pt, weight: "bold")[الشهادات]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "يونيو 2022")]],
    [#block(below: 0.6em)[#text(size: 10pt, weight: "bold")[AWS Solutions Architect من Amazon Web Services · #link("https://aws.amazon.com/certification")[#text(fill: blue, "رابط")]]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Professional level certification]]]
)
#pagebreak(weak: true)
