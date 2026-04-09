# 🧪 Subhadeep Dhar - Portfolio

> A futuristic, modular personal portfolio — built for developers who think like researchers.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0080?style=flat-square&logo=framer&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

---

Dark futuristic UI · Neon accents · Glassmorphism · Fully responsive

---

## Features

- **Fully data-driven** — add a project by editing one file. Zero UI changes needed.
- **Modular sections** — reorder or hide any section by editing a single line in `page.jsx`
- **Lightweight animations** — CSS-only background effects, Framer Motion only where it adds value
- **Mobile-first** — responsive across all screen sizes
- **Clean codebase** — well-commented, beginner-friendly to modify
- **SEO ready** — Open Graph, Twitter cards, and metadata via Next.js

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| UI Library | React 18 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion 11 |
| Fonts | Syne · Space Grotesk · JetBrains Mono |
| Deployment | Vercel (recommended) |

---

## Project Structure

```
my-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.jsx          # Root layout, metadata, SEO
│   │   └── page.jsx            # ← Compose / reorder sections here
│   │
│   ├── components/             # Reusable UI building blocks
│   │   ├── Navbar.jsx
│   │   ├── ProjectCard.jsx     # Expandable experiment card
│   │   ├── TimelineItem.jsx    # Single timeline entry
│   │   ├── SkillBadge.jsx      # Skill pill with level indicator
│   │   └── SectionHeader.jsx   # Consistent section titles
│   │
│   ├── sections/               # Full-page sections
│   │   ├── Hero.jsx            # Landing + CTA
│   │   ├── About.jsx           # Researcher profile
│   │   ├── Skills.jsx          # Tech Arsenal
│   │   ├── Projects.jsx        # Experiments (filtered grid)
│   │   ├── CaseStudy.jsx       # Featured project deep-dives
│   │   ├── Timeline.jsx        # Evolution Log
│   │   ├── ConceptVault.jsx    # Ideas & future plans
│   │   └── Contact.jsx         # Links + footer
│   │
│   ├── data/                   # ✦ Edit these for all content
│   │   ├── projects.js         # All projects live here
│   │   ├── skills.js           # Grouped skill categories
│   │   ├── timeline.js         # Career milestones
│   │   ├── concepts.js         # Idea vault entries
│   │   └── siteConfig.js       # Name, bio, links, SEO
│   │
│   └── styles/
│       └── globals.css         # Base styles + design tokens
│
├── public/                     # Static assets (resume, OG image)
├── tailwind.config.js          # Design tokens + theme
├── next.config.js
└── jsconfig.json               # Path aliases (@/...)
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/dev-lab-portfolio.git
cd dev-lab-portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Personalising the Portfolio

### 1. Update your identity

Edit `src/data/siteConfig.js`:

```js
export const siteConfig = {
  name: 'Your Name',
  handle: '@yourhandle',
  headline: 'Building Solutions Through Code & Curiosity',
  bio: [
    'First paragraph about you.',
    'Second paragraph about your approach.',
  ],
  links: {
    email:    'you@email.com',
    github:   'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourprofile',
    resume:   '/resume.pdf',   // place file in public/
  },
};
```

### 2. Add a project

Open `src/data/projects.js` and add a new entry to the `projects` array:

```js
{
  id: 'my-new-project',
  title: 'My New Project',
  tagline: 'One-line hook',
  problem: 'What problem did this solve?',
  hypothesis: 'What did you think would work?',
  approach: 'How did you build it?',
  result: 'What happened — metrics, outcomes.',
  future: 'What would you improve next?',
  tech: ['React', 'Python', 'PostgreSQL'],
  tags: ['Fullstack', 'ML'],
  featured: false,              // true = appears in Case Studies
  status: 'completed',          // 'completed' | 'in-progress' | 'archived'
  year: '2024',
  links: {
    demo: 'https://...',        // or null
    github: 'https://...',      // or null
  },
},
```

The card renders automatically. No other file needs to change.

### 3. Add a skill

Open `src/data/skills.js` and add to an existing category:

```js
{ name: 'Redis', level: 'proficient' }
// level options: 'core' | 'proficient' | 'learning'
```

### 4. Hide a section

In `src/app/page.jsx`, comment out any section:

```jsx
{/* <ConceptVault /> */}
```

### 5. Reorder sections

In `src/app/page.jsx`, move the component lines into any order.

---

## Customisation

### Change accent colors

Edit the CSS variables in `src/styles/globals.css`:

```css
:root {
  --lab-cyan:   #00e5ff;   /* primary neon */
  --lab-purple: #a855f7;   /* secondary accent */
  --lab-bg:     #050810;   /* background */
}
```

### Change fonts

1. Update the `@import` in `globals.css` with your Google Fonts URL
2. Update `tailwind.config.js` under `theme.extend.fontFamily`

---

## Deployment

### Vercel (recommended)

```bash
npx vercel
```

Or connect the GitHub repo directly in the [Vercel dashboard](https://vercel.com) — it auto-detects Next.js and deploys with zero configuration.

### Manual build

```bash
npm run build    # creates optimised production build
npm run start    # serves production build locally
```

---

## Performance

- Background effect is pure CSS (`@keyframes`) — no canvas, no JS
- Glow effects use CSS `box-shadow` — no SVG filters
- Framer Motion only runs `whileInView` scroll reveals and layout transitions
- Fonts loaded with `display=swap` to prevent layout shift
- Images served via Next.js `<Image />` with AVIF/WebP optimisation

---

## License

Subhadeep Dhat — use it, modify it, ship it. Attribution appreciated but not required.

---

## Acknowledgements

Built with [Next.js](https://nextjs.org), [Tailwind CSS](https://tailwindcss.com), and [Framer Motion](https://www.framer.com/motion).

---

<p align="center">Made with ☕ and too many terminal windows open hehehh :))</p>