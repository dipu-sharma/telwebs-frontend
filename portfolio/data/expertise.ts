export interface ExpertiseItem {
  id: string
  title: string
  /** Mono kicker — the concrete artefact this produces */
  kicker: string
  body: string
  icon: string
  stack: string[]
  /** Larger cards anchor the bento grid */
  span: 'wide' | 'normal'
}

export interface ExpertiseGroup {
  id: string
  title: string
  caption: string
  items: ExpertiseItem[]
}

export const expertiseGroups: ExpertiseGroup[] = [
  {
    id: 'ai',
    title: 'AI Engineering',
    caption: 'systems that reason over your data',
    items: [
      {
        id: 'rag',
        title: 'Retrieval-Augmented Generation',
        kicker: 'parse → chunk → embed → retrieve',
        body:
          'The whole pipeline, not just the vector search. Documents are extracted with Docling, chunked so context survives the split, embedded into Qdrant or Chroma, and retrieved with the filters that keep one tenant out of another\'s data. Retrieval quality is a data problem long before it is a model problem.',
        icon: 'layers',
        stack: ['Qdrant', 'Chroma DB', 'Docling', 'LangChain'],
        span: 'wide',
      },
      {
        id: 'genai',
        title: 'Generative AI',
        kicker: 'drafting from context',
        body:
          'Using models to produce real work product — notices, circulars and summaries generated from the contents of a specific file, in the format the department actually files.',
        icon: 'sparkles',
        stack: ['LLMs', 'Ollama', 'Prompt design'],
        span: 'normal',
      },
      {
        id: 'agents',
        title: 'AI Agents',
        kicker: 'tools, not just text',
        body:
          'Giving a model typed tools and letting it choose: query the database, call the API, fetch the document. The engineering is in the tool boundary and the failure handling.',
        icon: 'bot',
        stack: ['LangChain', 'Function calling'],
        span: 'normal',
      },
      {
        id: 'agentic',
        title: 'Agentic AI',
        kicker: 'multi-step, stateful',
        body:
          'Workflows that plan, act, observe and retry across several steps while holding state — graph-based orchestration rather than one prompt hoping to do everything at once.',
        icon: 'workflow',
        stack: ['LangGraph', 'State machines'],
        span: 'normal',
      },
      {
        id: 'llm',
        title: 'LLM Integration',
        kicker: 'local or hosted',
        body:
          'Serving models locally through Ollama when data cannot leave the estate, or calling hosted APIs when it can — behind one interface so the choice stays reversible.',
        icon: 'plug',
        stack: ['Ollama', 'Streaming', 'Token budgets'],
        span: 'normal',
      },
      {
        id: 'guardrails',
        title: 'AI Guardrails',
        kicker: 'refuse over invent',
        body:
          'A chatbot that answers "I do not have that record" is more valuable than one that guesses. Strict grounding to retrieved context, input and output validation, and scoping so answers cannot cross tenant boundaries.',
        icon: 'shield',
        stack: ['Grounding', 'Schema validation'],
        span: 'wide',
      },
      {
        id: 'langsmith',
        title: 'Evaluation with LangSmith',
        kicker: 'trace, score, regress',
        body:
          'Tracing chains to see which retrieval step actually degraded, scoring answers against a fixed question set, and catching regressions before a prompt change ships.',
        icon: 'gauge',
        stack: ['LangSmith', 'Eval sets'],
        span: 'normal',
      },
    ],
  },
  {
    id: 'engineering',
    title: 'Backend Architecture',
    caption: 'the part that has to stay up',
    items: [
      {
        id: 'api',
        title: 'API Architecture',
        kicker: 'contracts first',
        body:
          'Typed, versioned, documented interfaces — FastAPI with Pydantic models, GraphQL where the client shape justifies it, and idempotent webhook handlers because third parties retry.',
        icon: 'server',
        stack: ['FastAPI', 'Pydantic', 'GraphQL', 'OpenAPI'],
        span: 'normal',
      },
      {
        id: 'microservices',
        title: 'Microservices & SOA',
        kicker: 'split on seams',
        body:
          'Service boundaries drawn where the domain actually divides, with message brokers between them so one slow consumer degrades a feature instead of the product.',
        icon: 'grid',
        stack: ['RabbitMQ', 'Celery', 'Docker'],
        span: 'normal',
      },
      {
        id: 'scale',
        title: 'Scalable Backend Systems',
        kicker: 'async by default',
        body:
          'Long work moves to Celery, real-time traffic moves to WebSockets over Redis, and the database is asked the right question — window and aggregation functions instead of a loop in Python.',
        icon: 'trending',
        stack: ['PostgreSQL', 'Redis', 'Celery', 'WebSockets'],
        span: 'wide',
      },
    ],
  },
]
