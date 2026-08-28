export interface Project {
  id: string
  name: string
  /** One-line summary shown on the card */
  summary: string
  /** Longer prose shown in the modal */
  description: string
  /** Concrete things that were built — verbs, not adjectives */
  features: string[]
  tech: string[]
  /** Keys used by the technology filter */
  filters: string[]
  company: string
  period: string
  /** Icon key for the generated cover art */
  icon: string
  accent: 'violet' | 'amber' | 'mixed'
  featured: boolean
  /** Client/company codebases are not public. Set links when you have them. */
  repo: string | null
  demo: string | null
}

/** Technology filters. `all` is handled by the component. */
export const projectFilters = [
  { key: 'all', label: 'All' },
  { key: 'ai', label: 'AI / RAG' },
  { key: 'fastapi', label: 'FastAPI' },
  { key: 'django', label: 'Django' },
  { key: 'node', label: 'Node.js' },
  { key: 'vue', label: 'Vue / Nuxt' },
  { key: 'react', label: 'React' },
  { key: 'cloud', label: 'AWS / GCP' },
  { key: 'go', label: 'Go' },
]

export const projects: Project[] = [
  {
    id: 'e-abhilekh',
    name: 'E-Abhilekh',
    summary:
      'Departmental document management with an AI smart-search layer that answers questions from uploaded PDFs.',
    description:
      'A document management platform for processing departmental PDFs at scale, extended with a generative AI search layer. Documents are embedded into Qdrant so officers can ask natural-language questions and get answers grounded in the actual file contents, then have the system draft the follow-up paperwork for them.',
    features: [
      'Bulk PDF ingestion and processing pipeline built on Django and deployed to GCP',
      'AI Smart Search over uploaded documents using local LLMs served through Ollama',
      'Qdrant vector storage for semantic retrieval across departmental archives',
      'Automated draft generation for notices, circulars and summaries from file context',
    ],
    tech: ['Django', 'Python', 'Generative AI', 'LLMs', 'Ollama', 'Qdrant', 'GCP'],
    filters: ['ai', 'django', 'cloud'],
    company: 'DEVtrust',
    period: '2025 — Present',
    icon: 'documentSearch',
    accent: 'mixed',
    featured: true,
    repo: null,
    demo: null,
  },
  {
    id: 'updesh-chatbot',
    name: 'Updesh Chatbot',
    summary:
      'A RAG chatbot engineered to stay inside its context — it says "no record" instead of inventing one.',
    description:
      'A retrieval-augmented generation system built to answer questions over a private document corpus. The interesting engineering is in the parsing pipeline and the guardrails: documents are extracted with Docling, chunked and embedded into Chroma DB, and the prompt contract forces the model to answer strictly from retrieved context rather than filling gaps with plausible fiction.',
    features: [
      'FastAPI retrieval service with a Nuxt.js chat interface',
      'Document parsing pipeline using Docling to extract, chunk and embed large text files',
      'Chroma DB vector store with secure, tenant-scoped ingestion',
      'Strict grounding so the model declines rather than hallucinating records',
    ],
    tech: ['FastAPI', 'Python', 'Nuxt.js', 'Chroma DB', 'Docling', 'RAG', 'LLMs'],
    filters: ['ai', 'fastapi', 'vue'],
    company: 'DEVtrust',
    period: '2025 — Present',
    icon: 'sparkles',
    accent: 'violet',
    featured: true,
    repo: null,
    demo: null,
  },
  {
    id: 'flux-pay',
    name: 'Flux Pay',
    summary:
      'Payment gateway backend covering admin, merchant and user modules with multi-way fund collection.',
    description:
      'The backend for a full payment gateway, split into admin, merchant and user modules. Beyond standard collection it supports split-way and recurring flows, with RabbitMQ decoupling settlement work from the request path so a slow downstream never blocks a payment.',
    features: [
      'Three-surface architecture: admin, merchant and end-user modules',
      'One-way, split-way and recurring payment collection methods',
      'RabbitMQ-backed asynchronous settlement and reconciliation jobs',
      'PostgreSQL schema designed around transactional integrity',
    ],
    tech: ['FastAPI', 'Python', 'PostgreSQL', 'RabbitMQ'],
    filters: ['fastapi'],
    company: 'Dreamztech Solutions',
    period: '2021 — 2024',
    icon: 'card',
    accent: 'amber',
    featured: true,
    repo: null,
    demo: null,
  },
  {
    id: 'rr-parkon',
    name: 'RR Parkon',
    summary:
      'Construction project management system with dependency-aware milestone tracking. Led the web team.',
    description:
      'A project management system for construction delivery, built while leading the web development team. The core problem was scheduling: milestones cannot float freely, so the module enforces start and end date constraints between dependent phases and ties resource allocation to each one.',
    features: [
      'Dynamic milestone tracking with automated start and end date constraints',
      'Per-milestone resource allocation and utilisation views',
      'Express.js API with a Nuxt.js front end over MongoDB',
      'Led and reviewed the work of the web development team',
    ],
    tech: ['Express.js', 'Node.js', 'Nuxt.js', 'MongoDB'],
    filters: ['node', 'vue'],
    company: 'UniteCloud',
    period: '2024 — 2025',
    icon: 'building',
    accent: 'violet',
    featured: true,
    repo: null,
    demo: null,
  },
  {
    id: 'hrms',
    name: 'HRMS Attrition Analytics',
    summary:
      'Full-stack HRMS that analyses employee attrition and predicts leave, reading live from Odoo.',
    description:
      'A human resources platform with a machine learning layer over it. It analyses attrition patterns and predicts leave, and rather than duplicating HR data it connects dynamically to existing Odoo databases so each tenant\'s analytics dashboards read from their own live source.',
    features: [
      'Attrition analysis and leave prediction models over historical HR data',
      'Dynamic Odoo database connections for secure per-tenant access',
      'React dashboards backed by a FastAPI analytics API',
      'Role-scoped access to analytical views',
    ],
    tech: ['FastAPI', 'Python', 'React.js', 'Odoo', 'Machine Learning'],
    filters: ['ai', 'fastapi', 'react'],
    company: 'UniteCloud',
    period: '2024 — 2025',
    icon: 'chart',
    accent: 'mixed',
    featured: true,
    repo: null,
    demo: null,
  },
  {
    id: 'file-parser',
    name: 'File-Parser',
    summary:
      'High-throughput Go tool that maps messy CSV and PDF data onto relational schemas without duplicating rows.',
    description:
      'A data extraction tool written in Go for throughput. It maps arbitrary CSV and PDF input onto relational schemas, using PostgreSQL window and aggregation functions to derive alias columns and to guarantee that re-running an import does not create duplicate records.',
    features: [
      'Concurrent CSV and PDF parsing in Go for high-volume ingestion',
      'Schema mapping from unstructured input to relational tables',
      'PostgreSQL window and aggregation functions to compute alias columns',
      'Duplicate-safe, idempotent import runs',
    ],
    tech: ['Go', 'PostgreSQL', 'Supabase'],
    filters: ['go'],
    company: 'DEVtrust',
    period: '2025 — Present',
    icon: 'file',
    accent: 'amber',
    featured: true,
    repo: null,
    demo: null,
  },
  {
    id: 'atr-service',
    name: 'ATR Service',
    summary:
      'Serverless order management on AWS Chalice, integrating third-party services over GraphQL webhooks.',
    description:
      'An order management service built entirely serverless. AWS Chalice fronts Lambda functions with DynamoDB and S3 behind them, and third-party coordination with Qualia happens through GraphQL mutations and queries triggered by webhooks.',
    features: [
      'AWS Chalice application running on Lambda with DynamoDB and S3',
      'GraphQL mutations and queries for third-party (Qualia) integration',
      'Webhook-driven state transitions across external services',
      'Pay-per-request scaling with no idle infrastructure',
    ],
    tech: ['AWS Chalice', 'Python', 'AWS Lambda', 'DynamoDB', 'S3', 'GraphQL'],
    filters: ['cloud'],
    company: 'DEVtrust',
    period: '2025 — Present',
    icon: 'box',
    accent: 'violet',
    featured: false,
    repo: null,
    demo: null,
  },
  {
    id: 'edu-tech',
    name: 'Edu-Tech Live Classroom',
    summary:
      'Real-time student management and chat platform with dedicated teacher-student channels.',
    description:
      'A student management platform with live messaging built in. Django 5 handles the domain, while Redis and WebSockets carry real-time traffic and Celery takes the slow work off the request path. Teachers can spin up dedicated, access-controlled channels per group.',
    features: [
      'WebSocket messaging for live teacher-student group chat',
      'Secure, dedicated channel creation with scoped membership',
      'Celery workers for notifications and scheduled tasks',
      'Redis as the channel layer and cache',
    ],
    tech: ['Django 5', 'Python', 'Redis', 'Celery', 'WebSockets'],
    filters: ['django'],
    company: 'DEVtrust',
    period: '2025 — Present',
    icon: 'chat',
    accent: 'mixed',
    featured: false,
    repo: null,
    demo: null,
  },
  {
    id: 'uni-approver',
    name: 'Uni-Approver',
    summary:
      'Service-oriented approval matrix that resolves the right approver from form category and hierarchy limits.',
    description:
      'Approval routing modelled as data instead of code. A service-oriented matrix resolves which approver a request needs based on the form category and the requester\'s position in the hierarchy, including monetary limits — so adding a new request type does not mean shipping new branching logic.',
    features: [
      'Dynamic SOA matrix for conditional, multi-step request approvals',
      'Automated approver resolution from form category and hierarchy',
      'Hierarchical user limits enforced per approval level',
      'Configurable without code changes for new request types',
    ],
    tech: ['FastAPI', 'Python', 'PostgreSQL'],
    filters: ['fastapi'],
    company: 'UniteCloud',
    period: '2024 — 2025',
    icon: 'workflow',
    accent: 'violet',
    featured: false,
    repo: null,
    demo: null,
  },
  {
    id: 'bidwise',
    name: 'Bidwise',
    summary:
      'Online auction platform for scrap material with direct vendor-to-company negotiation.',
    description:
      'A bidding platform for industrial scrap. Vendors bid against published slots, low bids surface automatically, and buyers can move a listing into direct negotiation with a vendor when an auction does not clear.',
    features: [
      'Live auction and bidding flow for scrap material lots',
      'Direct vendor-to-company negotiation channel',
      'Automated low-bid slot displays',
      'Vue.js front end over a FastAPI service',
    ],
    tech: ['FastAPI', 'Python', 'Vue.js', 'PostgreSQL'],
    filters: ['fastapi', 'vue'],
    company: 'UniteCloud',
    period: '2024 — 2025',
    icon: 'gavel',
    accent: 'amber',
    featured: false,
    repo: null,
    demo: null,
  },
  {
    id: 'power-proton',
    name: 'Power Proton',
    summary:
      'Generator installation tracking with dashboards over data captured on field visits.',
    description:
      'Field-service tracking for generator installations. Employees capture site visit data on the ground; the backend normalises it and admin dashboards turn it into a view of installation progress and coverage.',
    features: [
      'FastAPI backend over PostgreSQL for installation records',
      'Field data capture from employee site visits',
      'Admin dashboards visualising progress and coverage',
      'Directed backend development for the project',
    ],
    tech: ['FastAPI', 'Python', 'PostgreSQL'],
    filters: ['fastapi'],
    company: 'UniteCloud',
    period: '2024 — 2025',
    icon: 'bolt',
    accent: 'amber',
    featured: false,
    repo: null,
    demo: null,
  },
  {
    id: 'sage-goddess',
    name: 'Sage Goddess Inventory',
    summary:
      'Odoo inventory extensions including an SKU calculator and ZPL barcode printing.',
    description:
      'Custom backend work inside the Odoo framework\'s inventory module. Alongside an SKU calculator, shipment tracking and vendor ranking, it programs ZPL directly to generate and print barcodes on label hardware.',
    features: [
      'Custom SKU calculator inside the Odoo inventory module',
      'Shipment tracking and vendor ranking features',
      'ZPL command generation for automated barcode printing',
      'Extended Odoo models without forking the framework',
    ],
    tech: ['Odoo', 'Python', 'PostgreSQL', 'ZPL'],
    filters: [],
    company: 'Dreamztech Solutions',
    period: '2021 — 2024',
    icon: 'warehouse',
    accent: 'violet',
    featured: false,
    repo: null,
    demo: null,
  },
  {
    id: 'changed-management',
    name: 'Changed Management',
    summary:
      'URL shortening and user management service with graph-rich generated PDF reports.',
    description:
      'A link shortener paired with user management, built across Nest.js and Django REST Framework. The reporting side generates PDFs dynamically with embedded graphs so analytics can be shared outside the product.',
    features: [
      'URL shortening service with click analytics',
      'User management built on Django REST Framework',
      'Dynamic PDF generation with embedded graph content',
      'Nest.js service layer for the public API',
    ],
    tech: ['Nest.js', 'Node.js', 'Django REST Framework', 'Python'],
    filters: ['node', 'django'],
    company: 'Dreamztech Solutions',
    period: '2021 — 2024',
    icon: 'link',
    accent: 'mixed',
    featured: false,
    repo: null,
    demo: null,
  },
  {
    id: 'report-management',
    name: 'DNA Report Management',
    summary:
      'Genomics portal that extracts DNA data from archives and visualises reports in the browser.',
    description:
      'Built at a genomics institute. The application ingests uploaded ZIP and RAR archives, parses the DNA data inside them, and stores both the extracted text and image artefacts in a purpose-built schema that a React portal then renders as readable reports.',
    features: [
      'ZIP and RAR archive extraction and DNA data parsing',
      'Schema design for parsed text and image report data',
      'React front end visualising genomic reports',
      'Django full-stack implementation end to end',
    ],
    tech: ['Django', 'Python', 'React.js', 'PostgreSQL'],
    filters: ['django', 'react'],
    company: 'NIBMG',
    period: '2021',
    icon: 'dna',
    accent: 'violet',
    featured: false,
    repo: null,
    demo: null,
  },
  {
    id: 'kreedha-pharma',
    name: 'Kreedha-Pharma',
    summary:
      'Pharmaceutical order management with automated sales reporting and scraping pipelines.',
    description:
      'An order management system for a pharmaceutical company, with the reporting automated end to end — daily, monthly and yearly sales reports generate themselves — and web scraping pipelines feeding in external product and pricing data.',
    features: [
      'Order management for pharmaceutical distribution',
      'Automated daily, monthly and yearly sales report generation',
      'Web scraping pipelines for external product data',
      'React front end over a Django backend',
    ],
    tech: ['Django', 'Python', 'React.js', 'Web Scraping'],
    filters: ['django', 'react'],
    company: 'Smart Info Pvt Ltd',
    period: '2019 — 2021',
    icon: 'pill',
    accent: 'amber',
    featured: false,
    repo: null,
    demo: null,
  },
]
