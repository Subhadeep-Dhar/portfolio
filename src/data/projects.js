/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  PROJECT DATA FILE                                           ║
 * ║  Edit ONLY this file to add, remove, or update projects.    ║
 * ║  UI components render from this automatically.              ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * Fields per project:
 *   id             — unique slug (used in URLs, keys)
 *   title          — experiment name
 *   tagline        — one-line hook
 *   problem        — what problem were you solving?
 *   hypothesis     — your initial hypothesis / approach idea
 *   approach       — how you actually built it
 *   result         — what happened, metrics, outcome
 *   future         — what you'd improve next
 *   tech           — array of tech strings (shown as badges)
 *   tags           — filter categories
 *   featured       — boolean: show in Case Studies section?
 *   status         — 'completed' | 'in-progress' | 'archived'
 *   year           — string
 *   links          — { demo, github } (null if not available)
 */

export const projects = [
  {
    id: 'sentiment-engine',
    title: 'Sentiment Analysis Engine',
    tagline: 'Real-time NLP pipeline for customer feedback classification',
    problem:
      'A retail client received 10,000+ monthly reviews across platforms. Manual tagging took 3 days per month and missed nuanced emotion categories.',
    hypothesis:
      'A fine-tuned transformer model with a streaming ingestion layer could classify sentiment and extract themes in under 200ms per document.',
    approach:
      'Built a Python FastAPI service wrapping a fine-tuned DistilBERT model. Kafka handles streaming ingestion; results are stored in PostgreSQL with a React dashboard for live visualization.',
    result:
      'Reduced tagging time from 3 days to under 4 hours. Accuracy: 91.3% on 5-class classification. Dashboard adopted by 3 internal teams.',
    future:
      'Add aspect-based sentiment (ABSA) to drill into specific product features. Explore few-shot classification for niche verticals.',
    tech: ['Python', 'FastAPI', 'HuggingFace', 'Kafka', 'PostgreSQL', 'React', 'Docker'],
    tags: ['ML', 'NLP', 'Backend', 'Data'],
    featured: true,
    status: 'completed',
    year: '2024',
    links: {
      demo: null,
      github: 'https://github.com/yourusername/sentiment-engine',
    },
  },
  {
    id: 'query-optimizer',
    title: 'SQL Query Optimizer',
    tagline: 'Static analysis tool that rewrites slow queries automatically',
    problem:
      'A reporting database ran 600+ daily queries. 30% took over 10s each, blocking the BI team during peak hours.',
    hypothesis:
      'Most slowdowns follow recognizable anti-patterns (missing indexes, N+1 fetches, SELECT *). A rule-based AST analyzer could catch and suggest fixes automatically.',
    approach:
      'Built a Python tool using sqlglot to parse SQL into ASTs. A rule engine checks 14 anti-pattern categories and emits annotated suggestions. Integrated as a pre-commit hook and a VSCode extension.',
    result:
      'Caught 78% of slow queries in CI before they hit production. Average query time on flagged queries dropped by 64% after applying suggestions.',
    future:
      'Add LLM-powered explain-plan analysis for queries that pass static rules but still run slow.',
    tech: ['Python', 'sqlglot', 'AST', 'VSCode Extension API', 'TypeScript'],
    tags: ['Tools', 'Backend', 'Data'],
    featured: true,
    status: 'completed',
    year: '2024',
    links: {
      demo: null,
      github: 'https://github.com/yourusername/sql-optimizer',
    },
  },
  {
    id: 'devlog-cli',
    title: 'DevLog CLI',
    tagline: 'Local-first developer journal that syncs to Notion',
    problem:
      'My daily engineering notes lived in scattered files, Slack messages, and forgotten tabs. Retrospectives were painful reconstructions.',
    hypothesis:
      'A fast CLI that feels like a terminal habit — not a heavy app — would actually get used daily. Notion as a backend gives search and sharing for free.',
    approach:
      'Node.js CLI using Ink (React for terminals) for a clean TUI. Entries are markdown files locally; a sync daemon pushes diffs to Notion API on save.',
    result:
      '90+ consecutive days of personal use. Used as the basis for weekly standups and monthly retros. Zero missed days after habit formation.',
    future:
      'Natural language search across past logs. AI-powered weekly digest generation.',
    tech: ['Node.js', 'Ink', 'Notion API', 'SQLite', 'Markdown'],
    tags: ['Tools', 'CLI', 'Productivity'],
    featured: false,
    status: 'completed',
    year: '2023',
    links: {
      demo: null,
      github: 'https://github.com/yourusername/devlog-cli',
    },
  },
  {
    id: 'campus-nav',
    title: 'Campus Navigation System',
    tagline: 'Indoor routing and event discovery for university students',
    problem:
      'New students at our 80-building campus spent significant time finding classrooms, offices, and events — especially in the first weeks of term.',
    hypothesis:
      'A graph-based indoor routing model combined with real-time event data could reduce navigation time by at least 40%.',
    approach:
      'Built with React Native + Expo. Floor plans encoded as weighted graphs; Dijkstra\'s algorithm handles routing. Backend: Supabase with PostGIS for spatial queries and real-time event subscriptions.',
    result:
      '500+ installs in first month. Avg. time-to-destination reduced by 47% vs. asking at the info desk (user survey, n=120).',
    future:
      'BLE beacon integration for precise indoor positioning. AR overlay mode for corridor navigation.',
    tech: ['React Native', 'Expo', 'Supabase', 'PostGIS', 'Dijkstra', 'TypeScript'],
    tags: ['Mobile', 'Algorithms', 'Fullstack'],
    featured: true,
    status: 'completed',
    year: '2023',
    links: {
      demo: 'https://campus-nav-demo.vercel.app',
      github: 'https://github.com/yourusername/campus-nav',
    },
  },
  {
    id: 'budget-tracker',
    title: 'Expense Insight Engine',
    tagline: 'Personal finance tracker with ML-powered anomaly detection',
    problem:
      'Generic budgeting apps show totals but miss the "why did I overspend this month" insight. Manual categorization is tedious.',
    hypothesis:
      'Auto-categorization + anomaly detection on transaction patterns can surface actionable insights without requiring manual input.',
    approach:
      'Next.js app + Plaid API for bank data ingestion. K-means clustering for category detection; isolation forest for anomaly scoring. Charts via Recharts.',
    result:
      'Personal use: identified 3 recurring forgotten subscriptions totalling ₹2,400/month within the first week.',
    future:
      'Predict upcoming large expenses based on seasonal patterns. Add goal-based savings nudges.',
    tech: ['Next.js', 'Plaid API', 'Python', 'Scikit-learn', 'Recharts', 'Prisma'],
    tags: ['ML', 'Fullstack', 'Data'],
    featured: false,
    status: 'in-progress',
    year: '2024',
    links: {
      demo: null,
      github: null,
    },
  },
];

// ─── Helper: get only featured projects for Case Studies ──────────
export const featuredProjects = projects.filter((p) => p.featured);

// ─── Helper: get unique filter tags ───────────────────────────────
export const allTags = [...new Set(projects.flatMap((p) => p.tags))].sort();
