// ===== simple | tr | defaults | minimal =====
#set page(margin: 1.5cm)
#set text(font: ("Calibri"), size: 12pt)
#show link: set text(fill: blue)
#set par(leading: 0.5em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 20pt, weight: "bold")[John Doe]]
#block(above: 0em, below: 1em)[#text(size: 14pt)[Software Engineer]]
#block(above: 0em, below: 1.4em)[#text(size: 12pt)[New York, USA · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] · #link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.2em)

#pagebreak(weak: true)

// ===== simple | tr | defaults | specialChars =====
#set page(margin: 1.5cm)
#set text(font: ("Calibri"), size: 12pt)
#show link: set text(fill: blue)
#set par(leading: 0.5em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 20pt, weight: "bold")[John\# Doe\$]]
#block(above: 0em, below: 1em)[#text(size: 14pt)[C\# Developer]]
#block(above: 0em, below: 1.4em)[#text(size: 12pt)[New York, USA · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] · #link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.2em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[Profil]],
    [Expert in C\#, F\#, and .NET development. Worked with \$100M+ projects.]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[DENEYIM]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "Ocak 2020 - Devam Ediyor")]],
    [#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Senior C\# Developer - #link("https://techcorp.com")[#underline[#text("Tech Corp")]], San Francisco]]

#set list(indent: 1em)

- Led team of 5+ developers on C\# projects
- Reduced costs by \$50,000/year through optimization
- Implemented feature \#42 using .NET 8]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[BECERILER]],
    [#block(above: 0em, below: 0.8em)[*Languages:* C\#, F\#, TypeScript, JavaScript, C++]#block(above: 0em, below: 0.8em)[*Frameworks:* .NET, ASP.NET MVC, Entity Framework]#block(above: 0em, below: 0.8em)[*Tools:* Git, Docker, Azure DevOps]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[PROJELER]],
    [#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Operators Logic App - C\#, Windows App]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Developed automated logical operations for Issue \#123]]],
    [],
    [#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[E-Commerce Platform (Revenue: \$500K+) • #link("https://example.com")[#text("Live Demo")]]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Built with C\# & React. Handles \~10,000 transactions/day.]]]
)
#pagebreak(weak: true)

// ===== simple | tr | defaults | typstMarkup =====
#set page(margin: 1.5cm)
#set text(font: ("Calibri"), size: 12pt)
#show link: set text(fill: blue)
#set par(leading: 0.5em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 20pt, weight: "bold")[Test\*User With\_Underscore]]
#block(above: 0em, below: 1em)[#text(size: 14pt)[Developer \[Senior\]]]
#block(above: 0em, below: 1.4em)[#text(size: 12pt)[New York, USA · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] · #link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.2em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[Profil]],
    [I work with \*bold\* text and \_italic\_ formatting. Also \{curly\} and \<angle\> brackets.]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[BECERILER]],
    [#block(above: 0em, below: 0.8em)[*Special\~Chars:* Testing \^caret and \~tilde characters]#block(above: 0em, below: 0.8em)[*Brackets:* Using \[square\] and \{curly\} brackets]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[PROJELER]],
    [#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Project with \"quotes\" inside]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Description with backslash \\ and more \"quotes\"]]]
)
#pagebreak(weak: true)

// ===== simple | tr | defaults | unicode =====
#set page(margin: 1.5cm)
#set text(font: ("Calibri"), size: 12pt)
#show link: set text(fill: blue)
#set par(leading: 0.5em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 20pt, weight: "bold")[Jose Garcia]]
#block(above: 0em, below: 1em)[#text(size: 14pt)[Desarrollador]]
#block(above: 0em, below: 1.4em)[#text(size: 12pt)[Madrid, Espana · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] · #link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.2em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[Profil]],
    [Desarrollador con experiencia en tecnologias web.]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[BECERILER]],
    [#block(above: 0em, below: 0.8em)[*Idiomas:* Espanol (nativo), English, Francais]]
)
#pagebreak(weak: true)

// ===== simple | tr | defaults | arabic =====
#set page(margin: 1.5cm)
#set text(font: ("Calibri"), size: 12pt)
#show link: set text(fill: blue)
#set par(leading: 0.5em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 20pt, weight: "bold")[Ahmed Hassan]]
#block(above: 0em, below: 1em)[#text(size: 14pt)[Software Engineer]]
#block(above: 0em, below: 1.4em)[#text(size: 12pt)[Cairo, Egypt · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] · #link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.2em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[Profil]],
    [Full-Stack Developer with experience in web technologies]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[BECERILER]],
    [#block(above: 0em, below: 0.8em)[*Languages:* JavaScript, TypeScript, Python]]
)
#pagebreak(weak: true)

// ===== simple | tr | defaults | full =====
#set page(margin: 1.5cm)
#set text(font: ("Calibri"), size: 12pt)
#show link: set text(fill: blue)
#set par(leading: 0.5em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 20pt, weight: "bold")[Sarah Johnson]]
#block(above: 0em, below: 1em)[#text(size: 14pt)[Full Stack Developer]]
#block(above: 0em, below: 1.4em)[#text(size: 12pt)[Austin, TX · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 987 6543] · #link("mailto:sarah.johnson@email.com")[#text(dir: ltr, "sarah.johnson@email.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.2em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[Sosyal Bağlantılar]],
    [#link("https://linkedin.com/in/sarahjohnson")[#text("LinkedIn")], #link("https://github.com/sarahjohnson")[#text("GitHub")]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[Profil]],
    [Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[DENEYIM]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "Mart 2020 - Devam Ediyor")]],
    [#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Senior Developer - #link("https://techstart.com")[#underline[#text("TechStart Inc.")]], Austin, TX]]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%],
    [#text(size: 11pt)[#text(fill: rgb("#4B5563"), "Haziran 2017 - Şubat 2020")]],
    [#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Developer - WebDev Co., Houston, TX]]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[EĞITIM]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "Ağustos 2013 - Mayıs 2017")]],
    [#block(below: 0.6em)[#text("Bachelor of Science - University of Texas, Austin, TX", size: 13pt, weight: "bold")]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[#block(above: 0em, below: 0.6em)[*Not:* 3.8 GPA]Focused on software engineering and distributed systems]]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[STAJLAR]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "Mayıs 2016 - Ağustos 2016")]],
    [#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Software Intern - StartupXYZ, Remote]]

#set list(indent: 1em)

- Assisted in mobile app development]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[BECERILER]],
    [#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[PROJELER]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "Ocak 2023 - Devam Ediyor")]],
    [#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text("GitHub")]]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly],
    [#text(size: 11pt)[#text(fill: rgb("#4B5563"), "Haziran 2021 - Aralık 2023")]],
    [#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text("Live Demo")]]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Technical blog about web development best practices]]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[GÖNÜLLÜLÜK]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "Ocak 2019 - Devam Ediyor")]],
    [#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Volunteer Developer - Code for Good, Austin, TX]]

#set list(indent: 1em)

- Built websites for local nonprofits]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[DILLER]],
    [#block(above: 0em, below: 0.8em)[*English* - Ana dil]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[SERTIFIKALAR]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "Haziran 2022")]],
    [#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[AWS Solutions Architect - Amazon Web Services · #link("https://aws.amazon.com/certification")[#text("Bağlantı")]]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Professional level certification]]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[YAYINLAR]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "Nisan 2023")]],
    [#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Scaling Event Pipelines on the Edge · #link("https://doi.org/10.1145/0000000")[#text("Bağlantı")]]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[S. Johnson, M. Chen, #emph[ACM SIGOPS Workshop] \
Measured cold-start costs across three serverless runtimes]]]
)
#pagebreak(weak: true)

// ===== simple | tr | defaults | edgeCase =====
#set page(margin: 1.5cm)
#set text(font: ("Calibri"), size: 12pt)
#show link: set text(fill: blue)
#set par(leading: 0.5em, justify: false)

#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.2em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[BECERILER]],
    [#block(above: 0em, below: 0.8em)[Only description, no title]#block(above: 0em, below: 0.8em)[*Only title*]]
)
#pagebreak(weak: true)

// ===== simple | tr | defaults | descriptions =====
#set page(margin: 1.5cm)
#set text(font: ("Calibri"), size: 12pt)
#show link: set text(fill: blue)
#set par(leading: 0.5em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 20pt, weight: "bold")[Desc Tester]]
#block(above: 0em, below: 1em)[#text(size: 14pt)[Software Engineer]]
#block(above: 0em, below: 1.4em)[#text(size: 12pt)[New York, USA · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] · #link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.2em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[Profil]],
    [Summary text]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[EĞITIM]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "Eylül 2015 - Haziran 2019")]],
    [#block(below: 0.6em)[#text("BSc - Test U, Remote", size: 13pt, weight: "bold")]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[EducationDescriptionMarker]]

#set list(indent: 1em)

- EducationAchievementMarker]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[DENEYIM]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "Ocak 2020 - Devam Ediyor")]],
    [#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Engineer - Acme, Remote]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[ExperienceDescriptionMarker]]

#set list(indent: 1em)

- shipped things]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[STAJLAR]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "Haziran 2019 - Eylül 2019")]],
    [#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Intern - Intern Co, Remote]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[InternshipDescriptionMarker]]

#set list(indent: 1em)

- helped out]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[GÖNÜLLÜLÜK]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "Ocak 2020 - Devam Ediyor")]],
    [#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Volunteer - Org, Remote]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[VolunteeringDescriptionMarker]]

#set list(indent: 1em)

- volunteered]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[PROJELER]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "Mart 2021 - Eylül 2022")]],
    [#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Test Project]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[ProjectDescriptionMarker]]

#set list(indent: 1em)

- built it]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[SERTIFIKALAR]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "Ocak 2022")]],
    [#block(below: 0.6em)[#text("Test Cert - Issuer", size: 13pt, weight: "bold")]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[CertificateDescriptionMarker]]]
)
#pagebreak(weak: true)

// ===== simple | tr | defaults | withPhoto =====
#set page(margin: 1.5cm)
#set text(font: ("Calibri"), size: 12pt)
#show link: set text(fill: blue)
#set par(leading: 0.5em, justify: false)
#grid(
    columns: (1fr, auto),
    column-gutter: 16pt,
    align: (start + top, end + top),
    [#block(above: 0em, below: 0.6em)[#text(size: 20pt, weight: "bold")[Sarah Johnson]]
#block(above: 0em, below: 1em)[#text(size: 14pt)[Full Stack Developer]]
#block(above: 0em, below: 1.4em)[#text(size: 12pt)[Austin, TX · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 987 6543] · #link("mailto:sarah.johnson@email.com")[#text(dir: ltr, "sarah.johnson@email.com")]]]],
    [#box(width: 25mm, height: 25mm, clip: true, radius: 1mm, image("/photo", width: 100%, height: 100%, fit: "cover"))],
)
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.2em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[Sosyal Bağlantılar]],
    [#link("https://linkedin.com/in/sarahjohnson")[#text("LinkedIn")], #link("https://github.com/sarahjohnson")[#text("GitHub")]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[Profil]],
    [Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[DENEYIM]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "Mart 2020 - Devam Ediyor")]],
    [#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Senior Developer - #link("https://techstart.com")[#underline[#text("TechStart Inc.")]], Austin, TX]]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%],
    [#text(size: 11pt)[#text(fill: rgb("#4B5563"), "Haziran 2017 - Şubat 2020")]],
    [#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Developer - WebDev Co., Houston, TX]]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[EĞITIM]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "Ağustos 2013 - Mayıs 2017")]],
    [#block(below: 0.6em)[#text("Bachelor of Science - University of Texas, Austin, TX", size: 13pt, weight: "bold")]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[#block(above: 0em, below: 0.6em)[*Not:* 3.8 GPA]Focused on software engineering and distributed systems]]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[STAJLAR]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "Mayıs 2016 - Ağustos 2016")]],
    [#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Software Intern - StartupXYZ, Remote]]

#set list(indent: 1em)

- Assisted in mobile app development]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[BECERILER]],
    [#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[PROJELER]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "Ocak 2023 - Devam Ediyor")]],
    [#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text("GitHub")]]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly],
    [#text(size: 11pt)[#text(fill: rgb("#4B5563"), "Haziran 2021 - Aralık 2023")]],
    [#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text("Live Demo")]]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Technical blog about web development best practices]]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[GÖNÜLLÜLÜK]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "Ocak 2019 - Devam Ediyor")]],
    [#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Volunteer Developer - Code for Good, Austin, TX]]

#set list(indent: 1em)

- Built websites for local nonprofits]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[DILLER]],
    [#block(above: 0em, below: 0.8em)[*English* - Ana dil]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[SERTIFIKALAR]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "Haziran 2022")]],
    [#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[AWS Solutions Architect - Amazon Web Services · #link("https://aws.amazon.com/certification")[#text("Bağlantı")]]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[Professional level certification]]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 15pt, weight: "bold", tracking: 0.08em)[YAYINLAR]

#text(size: 11pt)[#text(fill: rgb("#4B5563"), "Nisan 2023")]],
    [#block(below: 0.6em)[#text(size: 13pt, weight: "bold")[Scaling Event Pipelines on the Edge · #link("https://doi.org/10.1145/0000000")[#text("Bağlantı")]]]

#block(above: 0em, below: 0.8em)[#text(size: 12pt)[S. Johnson, M. Chen, #emph[ACM SIGOPS Workshop] \
Measured cold-start costs across three serverless runtimes]]]
)
#pagebreak(weak: true)

// ===== simple | tr | alternate | minimal =====
#set page(margin: 1.5cm)
#set text(font: ("Calibri"), size: 10pt)
#show link: set text(fill: blue)
#set par(leading: 0.5em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 18pt, weight: "bold")[John Doe]]
#block(above: 0em, below: 1em)[#text(size: 12pt)[Software Engineer]]
#block(above: 0em, below: 1.4em)[#text(size: 10pt)[New York, USA · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] · #link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.2em)

#pagebreak(weak: true)

// ===== simple | tr | alternate | specialChars =====
#set page(margin: 1.5cm)
#set text(font: ("Calibri"), size: 10pt)
#show link: set text(fill: blue)
#set par(leading: 0.5em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 18pt, weight: "bold")[John\# Doe\$]]
#block(above: 0em, below: 1em)[#text(size: 12pt)[C\# Developer]]
#block(above: 0em, below: 1.4em)[#text(size: 10pt)[New York, USA · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] · #link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.2em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[Profil]],
    [Expert in C\#, F\#, and .NET development. Worked with \$100M+ projects.]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[DENEYIM]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "Ocak 2020 - Devam Ediyor")]],
    [#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Senior C\# Developer - #link("https://techcorp.com")[#underline[#text("Tech Corp")]], San Francisco]]

#set list(indent: 1em)

- Led team of 5+ developers on C\# projects
- Reduced costs by \$50,000/year through optimization
- Implemented feature \#42 using .NET 8]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[BECERILER]],
    [#block(above: 0em, below: 0.8em)[*Languages:* C\#, F\#, TypeScript, JavaScript, C++]#block(above: 0em, below: 0.8em)[*Frameworks:* .NET, ASP.NET MVC, Entity Framework]#block(above: 0em, below: 0.8em)[*Tools:* Git, Docker, Azure DevOps]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[PROJELER]],
    [#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Operators Logic App - C\#, Windows App]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Developed automated logical operations for Issue \#123]]],
    [],
    [#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[E-Commerce Platform (Revenue: \$500K+) • #link("https://example.com")[#text("Live Demo")]]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Built with C\# & React. Handles \~10,000 transactions/day.]]]
)
#pagebreak(weak: true)

// ===== simple | tr | alternate | typstMarkup =====
#set page(margin: 1.5cm)
#set text(font: ("Calibri"), size: 10pt)
#show link: set text(fill: blue)
#set par(leading: 0.5em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 18pt, weight: "bold")[Test\*User With\_Underscore]]
#block(above: 0em, below: 1em)[#text(size: 12pt)[Developer \[Senior\]]]
#block(above: 0em, below: 1.4em)[#text(size: 10pt)[New York, USA · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] · #link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.2em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[Profil]],
    [I work with \*bold\* text and \_italic\_ formatting. Also \{curly\} and \<angle\> brackets.]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[BECERILER]],
    [#block(above: 0em, below: 0.8em)[*Special\~Chars:* Testing \^caret and \~tilde characters]#block(above: 0em, below: 0.8em)[*Brackets:* Using \[square\] and \{curly\} brackets]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[PROJELER]],
    [#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Project with \"quotes\" inside]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Description with backslash \\ and more \"quotes\"]]]
)
#pagebreak(weak: true)

// ===== simple | tr | alternate | unicode =====
#set page(margin: 1.5cm)
#set text(font: ("Calibri"), size: 10pt)
#show link: set text(fill: blue)
#set par(leading: 0.5em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 18pt, weight: "bold")[Jose Garcia]]
#block(above: 0em, below: 1em)[#text(size: 12pt)[Desarrollador]]
#block(above: 0em, below: 1.4em)[#text(size: 10pt)[Madrid, Espana · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] · #link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.2em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[Profil]],
    [Desarrollador con experiencia en tecnologias web.]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[BECERILER]],
    [#block(above: 0em, below: 0.8em)[*Idiomas:* Espanol (nativo), English, Francais]]
)
#pagebreak(weak: true)

// ===== simple | tr | alternate | arabic =====
#set page(margin: 1.5cm)
#set text(font: ("Calibri"), size: 10pt)
#show link: set text(fill: blue)
#set par(leading: 0.5em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 18pt, weight: "bold")[Ahmed Hassan]]
#block(above: 0em, below: 1em)[#text(size: 12pt)[Software Engineer]]
#block(above: 0em, below: 1.4em)[#text(size: 10pt)[Cairo, Egypt · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] · #link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.2em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[Profil]],
    [Full-Stack Developer with experience in web technologies]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[BECERILER]],
    [#block(above: 0em, below: 0.8em)[*Languages:* JavaScript, TypeScript, Python]]
)
#pagebreak(weak: true)

// ===== simple | tr | alternate | full =====
#set page(margin: 1.5cm)
#set text(font: ("Calibri"), size: 10pt)
#show link: set text(fill: blue)
#set par(leading: 0.5em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 18pt, weight: "bold")[Sarah Johnson]]
#block(above: 0em, below: 1em)[#text(size: 12pt)[Full Stack Developer]]
#block(above: 0em, below: 1.4em)[#text(size: 10pt)[Austin, TX · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 987 6543] · #link("mailto:sarah.johnson@email.com")[#text(dir: ltr, "sarah.johnson@email.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.2em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[Sosyal Bağlantılar]],
    [#link("https://linkedin.com/in/sarahjohnson")[#text("LinkedIn")], #link("https://github.com/sarahjohnson")[#text("GitHub")]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[Profil]],
    [Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[DENEYIM]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "Mart 2020 - Devam Ediyor")]],
    [#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Senior Developer - #link("https://techstart.com")[#underline[#text("TechStart Inc.")]], Austin, TX]]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%],
    [#text(size: 9pt)[#text(fill: rgb("#4B5563"), "Haziran 2017 - Şubat 2020")]],
    [#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Developer - WebDev Co., Houston, TX]]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[EĞITIM]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "Ağustos 2013 - Mayıs 2017")]],
    [#block(below: 0.6em)[#text("Bachelor of Science - University of Texas, Austin, TX", size: 11pt, weight: "bold")]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[#block(above: 0em, below: 0.6em)[*Not:* 3.8 GPA]Focused on software engineering and distributed systems]]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[STAJLAR]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "Mayıs 2016 - Ağustos 2016")]],
    [#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Software Intern - StartupXYZ, Remote]]

#set list(indent: 1em)

- Assisted in mobile app development]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[BECERILER]],
    [#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[PROJELER]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "Ocak 2023 - Devam Ediyor")]],
    [#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text("GitHub")]]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly],
    [#text(size: 9pt)[#text(fill: rgb("#4B5563"), "Haziran 2021 - Aralık 2023")]],
    [#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text("Live Demo")]]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Technical blog about web development best practices]]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[GÖNÜLLÜLÜK]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "Ocak 2019 - Devam Ediyor")]],
    [#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Volunteer Developer - Code for Good, Austin, TX]]

#set list(indent: 1em)

- Built websites for local nonprofits]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[DILLER]],
    [#block(above: 0em, below: 0.8em)[*English* - Ana dil]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[SERTIFIKALAR]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "Haziran 2022")]],
    [#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[AWS Solutions Architect - Amazon Web Services · #link("https://aws.amazon.com/certification")[#text("Bağlantı")]]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Professional level certification]]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[YAYINLAR]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "Nisan 2023")]],
    [#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Scaling Event Pipelines on the Edge · #link("https://doi.org/10.1145/0000000")[#text("Bağlantı")]]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[S. Johnson, M. Chen, #emph[ACM SIGOPS Workshop] \
Measured cold-start costs across three serverless runtimes]]]
)
#pagebreak(weak: true)

// ===== simple | tr | alternate | edgeCase =====
#set page(margin: 1.5cm)
#set text(font: ("Calibri"), size: 10pt)
#show link: set text(fill: blue)
#set par(leading: 0.5em, justify: false)

#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.2em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[BECERILER]],
    [#block(above: 0em, below: 0.8em)[Only description, no title]#block(above: 0em, below: 0.8em)[*Only title*]]
)
#pagebreak(weak: true)

// ===== simple | tr | alternate | descriptions =====
#set page(margin: 1.5cm)
#set text(font: ("Calibri"), size: 10pt)
#show link: set text(fill: blue)
#set par(leading: 0.5em, justify: false)
#block(above: 0em, below: 0.6em)[#text(size: 18pt, weight: "bold")[Desc Tester]]
#block(above: 0em, below: 1em)[#text(size: 12pt)[Software Engineer]]
#block(above: 0em, below: 1.4em)[#text(size: 10pt)[New York, USA · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 123 4567] · #link("mailto:john@example.com")[#text(dir: ltr, "john@example.com")]]]
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.2em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[Profil]],
    [Summary text]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[EĞITIM]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "Eylül 2015 - Haziran 2019")]],
    [#block(below: 0.6em)[#text("BSc - Test U, Remote", size: 11pt, weight: "bold")]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[EducationDescriptionMarker]]

#set list(indent: 1em)

- EducationAchievementMarker]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[DENEYIM]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "Ocak 2020 - Devam Ediyor")]],
    [#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Engineer - Acme, Remote]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[ExperienceDescriptionMarker]]

#set list(indent: 1em)

- shipped things]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[STAJLAR]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "Haziran 2019 - Eylül 2019")]],
    [#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Intern - Intern Co, Remote]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[InternshipDescriptionMarker]]

#set list(indent: 1em)

- helped out]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[GÖNÜLLÜLÜK]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "Ocak 2020 - Devam Ediyor")]],
    [#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Volunteer - Org, Remote]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[VolunteeringDescriptionMarker]]

#set list(indent: 1em)

- volunteered]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[PROJELER]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "Mart 2021 - Eylül 2022")]],
    [#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Test Project]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[ProjectDescriptionMarker]]

#set list(indent: 1em)

- built it]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[SERTIFIKALAR]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "Ocak 2022")]],
    [#block(below: 0.6em)[#text("Test Cert - Issuer", size: 11pt, weight: "bold")]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[CertificateDescriptionMarker]]]
)
#pagebreak(weak: true)

// ===== simple | tr | alternate | withPhoto =====
#set page(margin: 1.5cm)
#set text(font: ("Calibri"), size: 10pt)
#show link: set text(fill: blue)
#set par(leading: 0.5em, justify: false)
#grid(
    columns: (1fr, auto),
    column-gutter: 16pt,
    align: (start + top, end + top),
    [#block(above: 0em, below: 0.6em)[#text(size: 18pt, weight: "bold")[Sarah Johnson]]
#block(above: 0em, below: 1em)[#text(size: 12pt)[Full Stack Developer]]
#block(above: 0em, below: 1.4em)[#text(size: 10pt)[Austin, TX · #text(dir: ltr, font: ("Calibri", "Roboto"))[+1 555 987 6543] · #link("mailto:sarah.johnson@email.com")[#text(dir: ltr, "sarah.johnson@email.com")]]]],
    [#box(width: 25mm, height: 25mm, clip: true, radius: 50%, image("/photo", width: 100%, height: 100%, fit: "cover"))],
)
#block(above: 0.4em, below: 0em)[#line(length: 100%, stroke: 0.4pt)]
#v(1.2em)

#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[Sosyal Bağlantılar]],
    [#link("https://linkedin.com/in/sarahjohnson")[#text("LinkedIn")], #link("https://github.com/sarahjohnson")[#text("GitHub")]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[Profil]],
    [Experienced Full Stack Developer with 8+ years in web development. Specialized in React, Node.js, and cloud technologies.]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[DENEYIM]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "Mart 2020 - Devam Ediyor")]],
    [#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Senior Developer - #link("https://techstart.com")[#underline[#text("TechStart Inc.")]], Austin, TX]]

#set list(indent: 1em)

- Led development of microservices architecture
- Mentored team of 4 junior developers
- Improved system performance by 40%],
    [#text(size: 9pt)[#text(fill: rgb("#4B5563"), "Haziran 2017 - Şubat 2020")]],
    [#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Developer - WebDev Co., Houston, TX]]

#set list(indent: 1em)

- Built RESTful APIs using Node.js
- Developed React frontend applications]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[EĞITIM]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "Ağustos 2013 - Mayıs 2017")]],
    [#block(below: 0.6em)[#text("Bachelor of Science - University of Texas, Austin, TX", size: 11pt, weight: "bold")]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[#block(above: 0em, below: 0.6em)[*Not:* 3.8 GPA]Focused on software engineering and distributed systems]]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[STAJLAR]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "Mayıs 2016 - Ağustos 2016")]],
    [#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Software Intern - StartupXYZ, Remote]]

#set list(indent: 1em)

- Assisted in mobile app development]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[BECERILER]],
    [#block(above: 0em, below: 0.8em)[*Frontend:* React, Vue.js, TypeScript, HTML, CSS]#block(above: 0em, below: 0.8em)[*Backend:* Node.js, Python, Go, PostgreSQL]#block(above: 0em, below: 0.8em)[*DevOps:* Docker, Kubernetes, AWS, CI/CD]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[PROJELER]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "Ocak 2023 - Devam Ediyor")]],
    [#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Open Source CLI Tool • #link("https://github.com/sarahjohnson/cli-tool")[#text("GitHub")]]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[A command-line tool for automating development workflows]]

#set list(indent: 1em)

- Reached 500+ stars on GitHub
- Used by 2,000+ developers monthly],
    [#text(size: 9pt)[#text(fill: rgb("#4B5563"), "Haziran 2021 - Aralık 2023")]],
    [#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Personal Blog • #link("https://sarahjohnson.dev")[#text("Live Demo")]]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Technical blog about web development best practices]]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[GÖNÜLLÜLÜK]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "Ocak 2019 - Devam Ediyor")]],
    [#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Volunteer Developer - Code for Good, Austin, TX]]

#set list(indent: 1em)

- Built websites for local nonprofits]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[DILLER]],
    [#block(above: 0em, below: 0.8em)[*English* - Ana dil]#block(above: 0em, below: 0.8em)[*Spanish* - Intermediate]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[SERTIFIKALAR]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "Haziran 2022")]],
    [#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[AWS Solutions Architect - Amazon Web Services · #link("https://aws.amazon.com/certification")[#text("Bağlantı")]]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[Professional level certification]]]
)
#block(above: 0.6em, below: 0.6em)[#line(length: 100%, stroke: 0.4pt)]
#grid(
    columns: (22%, 1fr),
    column-gutter: 1.2em,
    row-gutter: 0.8em,
    align: (start + top, start + top),
    [#text(size: 13pt, weight: "bold", tracking: 0.08em)[YAYINLAR]

#text(size: 9pt)[#text(fill: rgb("#4B5563"), "Nisan 2023")]],
    [#block(below: 0.6em)[#text(size: 11pt, weight: "bold")[Scaling Event Pipelines on the Edge · #link("https://doi.org/10.1145/0000000")[#text("Bağlantı")]]]

#block(above: 0em, below: 0.8em)[#text(size: 10pt)[S. Johnson, M. Chen, #emph[ACM SIGOPS Workshop] \
Measured cold-start costs across three serverless runtimes]]]
)
#pagebreak(weak: true)
