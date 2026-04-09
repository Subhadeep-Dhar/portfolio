/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  CONCEPT VAULT DATA FILE                                     ║
 * ║  Edit to add ideas, experiments, or half-baked thoughts.    ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * Fields:
 *   title    — concept name
 *   status   — 'idea' | 'prototyping' | 'shelved'
 *   desc     — brief description
 *   why      — why it's interesting
 */

export const concepts = [
  {
    title: 'Code Review Copilot',
    status: 'idea',
    desc: 'A GitHub bot that summarizes PRs, flags complexity hotspots, and links to relevant docs.',
    why: 'Code review is a high-value but time-consuming ritual. Automation should handle the boring checks so humans focus on architecture.',
  },
  {
    title: 'Live Interview Prep Engine',
    status: 'prototyping',
    desc: 'Adaptive DSA problem recommender based on your weak pattern history.',
    why: 'Spaced repetition is well-studied but rarely applied to coding interviews. Pairing forgetting curves with difficulty ramps should accelerate mastery.',
  },
  {
    title: 'API Contract Drift Detector',
    status: 'idea',
    desc: 'CI tool that diffs OpenAPI specs between releases and flags consumer-breaking changes.',
    why: 'API versioning failures are expensive and quiet. Most teams find out when prod breaks, not before.',
  },
  {
    title: 'Self-Hosted Reading Tracker',
    status: 'shelved',
    desc: 'Notion-free book notes with highlight extraction from Kindle and Kobo.',
    why: 'Kindle highlights rot in the cloud. The knowledge you capture should live where you can search it without a subscription.',
  },
];
