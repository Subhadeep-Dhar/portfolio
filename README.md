# Dev Lab Portfolio

A futuristic, modular personal portfolio built with Next.js, Tailwind CSS, and Framer Motion.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open browser
# http://localhost:3000
```

---

## Folder Structure

```
src/
├── app/
│   ├── layout.jsx        ← SEO metadata, root HTML wrapper
│   └── page.jsx          ← Compose/reorder sections here
│
├── components/           ← Reusable UI building blocks
│   ├── Navbar.jsx
│   ├── ProjectCard.jsx
│   ├── TimelineItem.jsx
│   ├── SkillBadge.jsx
│   └── SectionHeader.jsx
│
├── sections/             ← Full page sections
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── CaseStudy.jsx
│   ├── Timeline.jsx
│   ├── ConceptVault.jsx
│   └── Contact.jsx
│
├── data/                 ← ✦ EDIT THESE for all content changes
│   ├── projects.js       ← Add/remove projects here
│   ├── skills.js         ← Add/remove skills here
│   ├── timeline.js       ← Update career history here
│   ├── concepts.js       ← Add future ideas here
│   └── siteConfig.js     ← Your name, bio, links, SEO
│
└── styles/
    └── globals.css       ← Base styles, design tokens
```

---

## How to Update Content

### Add a new project
Open `src/data/projects.js` and add a new object to the `projects` array:

```js
{
  id: 'my-new-project',           // unique slug
  title: 'My New Project',
  tagline: 'One-line summary',
  problem: 'What problem did this solve?',
  hypothesis: 'What did you think would work?',
  approach: 'How did you build it?',
  result: 'What happened?',
  future: 'What would you improve?',
  tech: ['React', 'Python'],       // shown as badges
  tags: ['Fullstack', 'ML'],       // for filter tabs
  featured: false,                 // true = appears in Case Studies
  status: 'completed',            // 'completed' | 'in-progress' | 'archived'
  year: '2024',
  links: {
    demo: 'https://...',           // or null
    github: 'https://...',         // or null
  },
},
```

That's it. The card appears automatically.

---

### Add a skill
Open `src/data/skills.js` and add to an existing category:

```js
{ name: 'Redis', level: 'proficient' }
// level: 'core' | 'proficient' | 'learning'
```

Or add a whole new category:

```js
{
  label: 'Databases',
  icon: '◑',
  color: 'purple',              // 'cyan' or 'purple'
  skills: [
    { name: 'Redis', level: 'core' },
    { name: 'MongoDB', level: 'proficient' },
  ],
},
```

---

### Update your bio / personal info
Open `src/data/siteConfig.js` and edit:
- `name` — your name
- `bio` — array of paragraphs shown in the About section
- `links` — email, GitHub, LinkedIn, Twitter/X, resume path
- `seo` — page title, description, OG image URL

---

### Add a timeline entry
Open `src/data/timeline.js`:

```js
{
  year: '2025',
  title: 'Joined XYZ as Backend Engineer',
  desc: 'First full-time role. Building payment infrastructure at scale.',
  type: 'milestone',    // 'education' | 'project' | 'achievement' | 'milestone'
},
```

---

### Hide a section
Open `src/app/page.jsx` and comment out the section:

```jsx
{/* <ConceptVault /> */}
```

---

### Reorder sections
In `src/app/page.jsx`, move the component lines into whatever order you want.

---

## Customisation

### Change accent colors
Open `src/styles/globals.css` and edit the `:root` variables:

```css
:root {
  --lab-cyan:   #00e5ff;   /* primary neon */
  --lab-purple: #a855f7;   /* secondary accent */
}
```

Or edit `tailwind.config.js` under `theme.extend.colors.lab`.

### Change fonts
Edit the `@import` in `globals.css` and update `tailwind.config.js` under `fontFamily`.

---

## Deployment

### Vercel (recommended — zero config)
```bash
npx vercel
```

### Build locally
```bash
npm run build
npm run start
```

---

## Performance Notes

- Framer Motion is used **minimally**: only `whileInView` reveals + layout animations
- Background is pure CSS grid animation (no canvas)
- Glow effects are CSS box-shadow + opacity (no filters)
- All images should be placed in `public/images/` and used via Next.js `<Image />`
- Fonts are loaded via Google Fonts with `display=swap`
