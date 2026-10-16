/* ==========================================================================
   data.js — EDIT THIS FILE TO PERSONALIZE THE TEMPLATE
   Everything the page displays comes from this one object.
   You should not need to touch index.html to change content.
   ========================================================================== */

const PORTFOLIO = {

  /* ---------------------------------------------------------------
     SITE / BRANDING  — Replace with your personal information
     --------------------------------------------------------------- */
  site: {
    brand: "John Rhenwel Jerez",        // shown in the navbar
    fullName: "John Rhenwel Jerez",
    role: "IT Student | Aspiring Data & Technology Professional",
    // Put your photo in images/ and set the path, e.g. "images/profile.png".
    // Leave empty ("") to show the built-in placeholder avatar.
    photo: "images/profile.png",
    copyright: "© John Rhenwel Jerez"
  },

  /* ---------------------------------------------------------------
     HERO
     --------------------------------------------------------------- */
  hero: {
    greeting: "Hi, I'm",
    tagline:
      "4th-year IT student building practical projects with Python, SQL, Excel, and modern web technologies. Currently seeking an internship where I can apply my technical skills, learn from real-world projects, and contribute to a professional team.",
    primaryCta: { label: "View my work", href: "#projects" },
    secondaryCta: { label: "Get in touch", href: "#contact" },
    // Tool chips under the hero. icon = emoji or short text.
    tools: [
      { icon: "📊", label: "Excel" },
      { icon: "🗄️", label: "SQL" },
      { icon: "⚡", label: "Power BI" },
      { icon: "🐍", label: "Python" }
    ]
  },

  /* ---------------------------------------------------------------
     SOCIAL LINKS — used in the hero and the footer
     --------------------------------------------------------------- */
  social: [
    { label: "GitHub", icon: "GH", href: "https://github.com/rhenjerez" },
    { label: "LinkedIn", icon: "in", href: "https://linkedin.com/in/yourname" },
    { label: "Email", icon: "@", href: "mailto:johnrhenwelj@gmail.com" }
  ],

  /* ---------------------------------------------------------------
     ABOUT  — Replace the placeholder paragraphs with your own
     --------------------------------------------------------------- */
  about: {
    eyebrow: "About me",
    heading: "A short introduction.",
    paragraphs: [
      "4th-year IT student building practical software and data tools—including a POS system project—using Power BI, JavaScript, Excel, and SQL. Currently seeking an internship where I can apply my development and data skills, learn from real-world projects, and contribute to a professional team.",
      "My focus combines web system development with data processing—from building functional applications like POS systems to cleaning, modeling, and visualizing datasets for business reporting. Backed by certifications from Cisco Networking Academy, I aim to bridge practical software solutions with actionable data insights"
    ],
    // Short capability list shown beside the paragraphs
    capabilities: [
      "Point-of-Sale (POS) systems",
      "Data cleaning & transformation",
      "Exploratory data analysis (EDA)",
      "Data modeling",
      "Dashboard development & visualization",
      "Business insights & recommendations",
      "Reporting & KPI analysis"
    ]
  },

  /* ---------------------------------------------------------------
     SKILLS  — Add, remove, or rename cards freely
     --------------------------------------------------------------- */
  skills: {
    eyebrow: "Skills",
    heading: "My core toolkit.",
    cards: [
      {
        icon: "📊",
        title: "Data analytics",
        items: ["Python", "SQL", "Excel", "Power BI"]
      },
      {
        icon: "💻",
        title: "Programming",
        items: ["Python", "JavaScript", "PHP", "HTML & CSS"]
      },
      {
        icon: "🗄️",
        title: "Database",
        items: ["MySQL"]
      },
      {
        icon: "🛠️",
        title: "Tools",
        items: ["Git", "GitHub", "VS Code"]
      }
    ]
  },

  /* ---------------------------------------------------------------
     PROJECTS
     Projects are organized into groups, like the reference layout.
     Each group gets its own heading and its own category filter bar.

     To add a project: copy one { ... } block inside "items".
     To add a group:   copy one { ... } block inside "groups".
     image: path to a screenshot in images/ — leave "" for a placeholder.
     --------------------------------------------------------------- */
  projects: {
    eyebrow: "Projects",
    heading: "Selected work.",
    groups: [
      {
        number: "01",
        title: "Featured Project",
        // No filter bar for a single project — see script.js (filters: false skips it).
        filters: false,
        items: [
          {
            title: "Snow / Mr. Softy Point-of-Sale System",
            category: "POS System",
            // Drop a screenshot in images/projects/ and point this at it, e.g. "images/projects/mr-softy-pos.png"
            image: "/images/mrsofty.png",
            description:
              "A point-of-sale and management system developed with separate Admin and Cashier panels, supporting sales operations, inventory management, and related store management functions.",
            tags: ["PHP", "MySQL", "JavaScript", "HTML", "CSS"],
            links: {}
          }
        ]
      }
    ]
  },

  /* ---------------------------------------------------------------
     CERTIFICATES — placeholders only, replace with your own
     --------------------------------------------------------------- */
  certificates: {
    eyebrow: "Certificates",
    heading: "Credentials & learning.",
    items: [
      {
        name: "Data Analytics Essentials",
        issuer: "Cisco Networking Academy",
        date: "2026",
        image: "images/cert.webp"
      }
    ]
  },

  /* ---------------------------------------------------------------
     CONTACT
     --------------------------------------------------------------- */
  contact: {
    eyebrow: "Contact",
    heading: "Let's work together.",
    blurb:
      "PLACEHOLDER — say what you are open to: internships, freelance work, or full-time roles. Keep it to one or two sentences.",
    channels: [
      { icon: "✉️", label: "Email", value: "johnrhenwelj@gmail.com", href: "mailto:johnrhenwelj@gmail.com" },
      { icon: "🐙", label: "GitHub", value: "github.com/rhenjerez", href: "https://github.com/rhenjerez" },
      { icon: "📍", label: "Location", value: "Leganes/Iloilo, Philippines", href: "" }
    ]
  }
};
