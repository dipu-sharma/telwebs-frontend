/**
 * ─────────────────────────────────────────────────────────────────────
 *  PLACEHOLDER CONTENT — replace before publishing.
 *
 *  These are illustrative quotes, not real endorsements. Attributions
 *  are deliberately role-based rather than tied to named colleagues.
 *  Swap in real quotes (a LinkedIn recommendation is the easiest
 *  source) and set `verified: true` once you do.
 * ─────────────────────────────────────────────────────────────────────
 */
export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  /** Initials shown in the avatar chip */
  initials: string
  verified: boolean
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    quote:
      'Dipu took the approval logic we had been patching for months and turned it into a configuration problem. New request types stopped needing a release.',
    author: 'Engineering Manager',
    role: 'Enterprise platform client',
    initials: 'EM',
    verified: false,
  },
  {
    id: 't2',
    quote:
      'He was the one insisting the chatbot should say it does not know. That decision is why the department trusted the tool enough to keep using it.',
    author: 'Product Lead',
    role: 'Document intelligence programme',
    initials: 'PL',
    verified: false,
  },
  {
    id: 't3',
    quote:
      'Reliable with a deadline and unusually careful about the database layer. As team lead he reviewed thoroughly without becoming a bottleneck.',
    author: 'Delivery Manager',
    role: 'Web engineering team',
    initials: 'DM',
    verified: false,
  },
]
