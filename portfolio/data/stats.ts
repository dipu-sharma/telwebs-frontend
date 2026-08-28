export interface Stat {
  id: string
  value: number
  suffix: string
  label: string
  /** Mono sub-caption giving the number context */
  note: string
  /**
   * true = an estimate rather than a figure taken from the resume.
   * Search for `placeholder: true` to find every number worth reviewing.
   */
  placeholder: boolean
}

export const stats: Stat[] = [
  {
    id: 'years',
    value: 6,
    suffix: '+',
    label: 'Years Experience',
    note: 'since Nov 2019',
    placeholder: false,
  },
  {
    id: 'projects',
    value: 15,
    suffix: '',
    label: 'Projects Delivered',
    note: 'across 5 companies',
    placeholder: false,
  },
  {
    id: 'tech',
    value: 40,
    suffix: '+',
    label: 'Technologies',
    note: 'languages to vector stores',
    placeholder: false,
  },
  {
    id: 'apis',
    value: 100,
    suffix: '+',
    label: 'APIs Built',
    note: 'REST, GraphQL, WebSocket',
    placeholder: true,
  },
  {
    id: 'ai',
    value: 3,
    suffix: '',
    label: 'AI & RAG Systems',
    note: 'shipped to production',
    placeholder: false,
  },
]
