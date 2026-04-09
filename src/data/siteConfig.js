/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  SITE CONFIGURATION                                          ║
 * ║  Update your personal info, links, and meta here.           ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

export const siteConfig = {
  // ─── Identity ─────────────────────────────────────────────────
  name: 'Subhadeep Dhar',
  handle: '@subhadeep_dhar',
  headline: 'Building Solutions Through Code & Curiosity',
  subheadline: 'MCA Student · Developer · Analyst',
  location: 'Karnataka, India',
  available: true,          // set to false to hide "open to work" tag

  // ─── About / Profile ──────────────────────────────────────────
  bio: [
    "I approach engineering problems like a researcher: define the question, form a hypothesis, run the experiment, measure results.",
    "My current focus is on systems that sit at the intersection of data, language, and product — tools that make information useful, not just accessible.",
    "When I'm not building, I'm breaking things to understand how they work.",
  ],

  // ─── Contact / Social ─────────────────────────────────────────
  links: {
    email:    'subhadeepdhar563@email.com',
    github:   'https://github.com/Subhadeep-Dhar',
    linkedin: 'https://www.linkedin.com/in/subhadeep-dhar-030458296',
    twitter:  null,          // set to null to hide
    resume:   '/resume.pdf', // place file in public/ folder
  },

  // ─── SEO ──────────────────────────────────────────────────────
  seo: {
    title:       'Subhadeep Dhar — Developer Lab',
    description: 'MCA student, developer, and analyst. I build thoughtful software at the intersection of data, language, and product.',
    url:         'https://yourportfolio.dev', // need to change later
    ogImage:     '/og.png',
  },
};
