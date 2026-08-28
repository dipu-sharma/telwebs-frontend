export interface Skill {
  name: string
  /** 1–5. Drives the segmented terminal-style meter. */
  level: number
}

export interface SkillCategory {
  id: string
  title: string
  /** Key into the Icon component's path map */
  icon: string
  /** Mono caption describing what this group is used for */
  caption: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    title: 'Languages',
    icon: 'terminal',
    caption: 'day-to-day',
    skills: [
      { name: 'Python', level: 5 },
      { name: 'JavaScript', level: 5 },
      { name: 'TypeScript', level: 4 },
      { name: 'SQL', level: 4 },
      { name: 'Go', level: 3 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: 'server',
    caption: 'services & apis',
    skills: [
      { name: 'FastAPI', level: 5 },
      { name: 'Django', level: 5 },
      { name: 'Express.js', level: 4 },
      { name: 'Nest.js', level: 3 },
      { name: 'AWS Chalice', level: 3 },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Agents',
    icon: 'sparkles',
    caption: 'applied genai',
    skills: [
      { name: 'RAG', level: 5 },
      { name: 'Generative AI', level: 4 },
      { name: 'Agentic AI', level: 4 },
      { name: 'LLM Integration', level: 4 },
      { name: 'LangChain', level: 4 },
      { name: 'Ollama', level: 4 },
      { name: 'LangGraph', level: 3 },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    icon: 'window',
    caption: 'interfaces',
    skills: [
      { name: 'Nuxt 3', level: 4 },
      { name: 'Vue.js', level: 4 },
      { name: 'React.js', level: 4 },
      { name: 'Tailwind CSS', level: 4 },
    ],
  },
  {
    id: 'databases',
    title: 'Databases & Vector Stores',
    icon: 'database',
    caption: 'persistence',
    skills: [
      { name: 'PostgreSQL', level: 5 },
      { name: 'MongoDB', level: 4 },
      { name: 'Redis', level: 4 },
      { name: 'Qdrant', level: 4 },
      { name: 'Chroma DB', level: 4 },
      { name: 'MySQL', level: 4 },
      { name: 'DynamoDB', level: 3 },
      { name: 'Supabase', level: 3 },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud',
    icon: 'cloud',
    caption: 'ship it',
    skills: [
      { name: 'Docker', level: 4 },
      { name: 'AWS', level: 4 },
      { name: 'GCP', level: 4 },
      { name: 'Git', level: 5 },
      { name: 'CI/CD', level: 4 },
      { name: 'Azure', level: 3 },
      { name: 'Jenkins', level: 3 },
    ],
  },
  {
    id: 'messaging',
    title: 'Messaging & Async',
    icon: 'bolt',
    caption: 'background work',
    skills: [
      { name: 'Celery', level: 4 },
      { name: 'RabbitMQ', level: 4 },
      { name: 'WebSockets', level: 4 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Platforms',
    icon: 'wrench',
    caption: 'the rest',
    skills: [
      { name: 'GitHub', level: 5 },
      { name: 'Odoo', level: 4 },
      { name: 'Web Scraping', level: 4 },
      { name: 'LangSmith', level: 3 },
    ],
  },
]

/** Marquee strip under the hero. */
export const skillTicker: string[] = [
  'Python', 'FastAPI', 'Django', 'RAG', 'LangChain', 'Qdrant', 'PostgreSQL',
  'Nuxt 3', 'Vue.js', 'React', 'Node.js', 'Go', 'Docker', 'AWS Lambda',
  'Celery', 'RabbitMQ', 'Redis', 'MongoDB', 'Ollama', 'Agentic AI', 'GCP',
  'WebSockets', 'Chroma DB', 'TypeScript',
]
