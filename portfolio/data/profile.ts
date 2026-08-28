/**
 * Single source of truth for personal details.
 * Kept dependency-free so `nuxt.config.ts` can import it for SEO meta.
 */
export const profile = {
  name: 'Dipu Kumar Sharma',
  firstName: 'Dipu',
  initials: 'DS',
  shortTitle: 'Software Engineer & AI Engineer',
  titles: ['Software Engineer', 'Python Developer', 'AI Engineer'],
  tagline: 'Building scalable backend systems and intelligent AI-powered applications.',

  metaDescription:
    'Dipu Kumar Sharma — Software Engineer with 6+ years building scalable Python and Node.js backends, FastAPI services, and production Generative AI, Agentic AI and RAG systems.',

  // Contact
  email: 'sdipu231@gmail.com',
  phone: '+91 95552 82779',
  phoneHref: '+919555282779',
  location: 'India',
  availability: 'Open to remote roles',

  // Social
  githubUser: 'dipu-sharma',
  github: 'https://github.com/dipu-sharma',
  linkedin: 'https://www.linkedin.com/in/dipusharma/',

  // Static asset in /public
  resumePath: '/Dipu-Kumar-Sharma-Resume.pdf',
  photoPath: '/dipu.jpg',

  /** Prose for the About section. */
  about: {
    lead: 'I build the systems that sit behind the product — the APIs, the data pipelines, and increasingly the AI that reasons over them.',
    body: [
      'Over the past six years I have shipped production software across payments, document intelligence, construction, HR analytics and pharma logistics. My core is Python — FastAPI and Django — paired with Node.js, and lately a lot of applied AI: retrieval-augmented generation, LLM integration and agentic workflows that actually hold up outside a demo.',
      'I care most about the unglamorous parts of engineering. Schema design that will not need a migration in six months. Idempotent webhooks. Retrieval that returns the right chunk instead of a plausible one. Guardrails so a chatbot answers "I do not have that record" rather than inventing it.',
      'I have also led a web team, which taught me that architecture decisions are mostly communication decisions. I am comfortable owning a feature end to end, from the Postgres index up through the Nuxt component that renders it.',
    ],
    /** Short, concrete strengths — each maps to real shipped work. */
    strengths: [
      {
        title: 'Scalable backend architecture',
        body: 'Service-oriented FastAPI and Django systems with async task queues, message brokers and clean separation between transport and domain logic.',
        icon: 'layers',
      },
      {
        title: 'Production AI, not demos',
        body: 'RAG pipelines with document parsing, chunking and vector retrieval — built so the model stays inside the provided context and refuses to guess.',
        icon: 'sparkles',
      },
      {
        title: 'Data modelling under pressure',
        body: 'Postgres window and aggregation functions, duplicate-safe ingestion, and Mongo schemas shaped around real query patterns rather than convenience.',
        icon: 'database',
      },
      {
        title: 'Cloud and delivery',
        body: 'AWS Lambda, S3, DynamoDB and GCP deployments, containerised with Docker and shipped through repeatable CI/CD.',
        icon: 'cloud',
      },
    ],
  },

  education: [
    {
      degree: 'B.E. — Computer Science & Engineering',
      institution: 'Rajiv Gandhi Prodyogiki Vishwavidyalaya',
      location: 'Bhopal, MP',
      year: '2019',
    },
    {
      degree: 'Higher Secondary — PCM',
      institution: 'Uttar Pradesh Board',
      location: 'Ballia, UP',
      year: '2013',
    },
  ],

  certifications: [
    { name: 'Data Visualization and Machine Learning', issuer: 'Tutorials Point' },
    { name: 'FastAPI', issuer: 'Udemy' },
    { name: 'Nest.js', issuer: 'Tutorials Point' },
  ],
} as const

export type Profile = typeof profile
