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
  headline: 'Building thoughtful products with care and attention to detail',
  subheadline: 'MCA Student · Developer · Researcher',
  location: 'Karnataka, India',
  available: true,          // set to false to hide "open to work" tag

  // ─── About / Profile ──────────────────────────────────────────
  bio: [
    "I approach engineering problems like a researcher: define the question, form a hypothesis, run the experiment, measure results.",
    "My work usually sits at the overlap of practical software, local context, and careful data work.",
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
