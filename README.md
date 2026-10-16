# Portfolio Template

A reusable personal portfolio template for a data analyst / IT student, built as a plain static site (no build step, no framework). All content is placeholder text — nothing here claims to be real work, certificates, or experience.

## Structure

```
portfolio-template/
├── index.html          # page shell: nav, section containers, footer, lightbox
├── css/styles.css      # all styling; design tokens live at the top in :root
├── js/data.js          # ← ALL CONTENT LIVES HERE (edit this to personalize)
├── js/script.js        # rendering + interactions (theme, nav, filters, lightbox)
└── images/             # drop your photo, project screenshots, certificate scans here
```

## Sections

Navigation (sticky, with mobile menu + theme toggle) → Hero → About → Skills → Projects → Certificates → Contact → Footer.

## How to run

Open `index.html` in a browser. For a local server:

```bash
python3 -m http.server 5500      # then visit http://localhost:5500
```

To deploy: push to GitHub and enable GitHub Pages, or drag the folder into Netlify.

## Where to replace placeholders

Everything is in `js/data.js`:

| Object key | What it controls |
|---|---|
| `site` | Brand text, full name, role, profile photo path, copyright |
| `hero` | Greeting, tagline, both buttons, tool chips |
| `social` | Icons/links used in the hero and footer |
| `about` | Section eyebrow, heading, paragraphs, capability list |
| `skills` | Skill cards (icon, title, bullet list) |
| `projects` | Project groups → each group has its own filter bar and cards |
| `certificates` | Certificate cards (name, issuer, date, credential ID, verify link) |
| `contact` | Email, LinkedIn, GitHub, location |

Adding a project: copy one `{ ... }` block inside a group's `items` array. Adding a group: copy a whole `{ number, title, blurb, items }` block. Category filters are generated automatically from the `category` values in each group.

Images: put files in `images/`, then set `image: "images/your-file.png"`. Leave `image: ""` and the card shows a labelled placeholder instead of a broken image.

## Changing the look

Edit the token block at the top of `css/styles.css`. `--accent` sets the single accent colour used across buttons, tags, and active states; `--bg`, `--surface`, `--text`, `--muted` set the rest. A light-theme override block follows immediately after — the toggle in the navbar switches between them and remembers the choice.

## Notes

- Responsive from 320px up; nothing scrolls horizontally.
- Keyboard accessible: skip link, visible focus rings, Esc/arrow keys in the image preview.
- `prefers-reduced-motion` is respected.
- The contact section is link-based (no form), so there is no backend to configure. If you later want a form, Formspree or EmailJS drops in without changing the layout.
