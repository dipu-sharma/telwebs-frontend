export interface Experience {
  id: string
  company: string
  role: string
  period: string
  /** Short duration label for the mono rail */
  duration: string
  current: boolean
  summary: string
  responsibilities: string[]
  /** The single thing most worth pointing at from this role */
  achievement: string
  tech: string[]
}

export const experience: Experience[] = [
  {
    id: 'devtrust',
    company: 'DEVtrust',
    role: 'Software Developer',
    period: 'Jun 2025 — Present',
    duration: 'current',
    current: true,
    summary:
      'Building AI-augmented document systems and serverless services across Python and Go.',
    responsibilities: [
      'Engineered E-Abhilekh, a departmental document management platform on Django and GCP, with an AI smart-search layer over uploaded PDFs.',
      'Architected the Updesh RAG chatbot using FastAPI, Nuxt.js and Chroma DB, including a Docling-based parse, chunk and embed pipeline.',
      'Built the ATR order management service on AWS Chalice, Lambda, DynamoDB and S3, integrating third-party systems over GraphQL webhooks.',
      'Developed a real-time student management and chat platform on Django 5 with Redis, Celery and WebSockets.',
      'Wrote a high-performance Go tool mapping CSV and PDF data onto relational schemas with duplicate-safe imports.',
    ],
    achievement:
      'Took generative AI from proof of concept into departmental production — semantic search over document archives plus automated drafting of notices, circulars and summaries from file context.',
    tech: [
      'Python', 'Django', 'FastAPI', 'Go', 'Nuxt.js', 'Qdrant', 'Chroma DB',
      'Ollama', 'GCP', 'AWS Lambda', 'DynamoDB', 'Redis', 'Celery',
    ],
  },
  {
    id: 'unitecloud',
    company: 'UniteCloud',
    role: 'Web Team Lead',
    period: 'May 2024 — May 2025',
    duration: '1 yr',
    current: false,
    summary:
      'Led the web team while owning backend architecture across five products.',
    responsibilities: [
      'Led a web development team building RR Parkon, a construction project management system on Express.js, Nuxt.js and MongoDB.',
      'Directed backend development for Power Proton, a generator installation tracker on FastAPI and PostgreSQL with admin dashboards over field data.',
      'Architected Uni-Approver, a service-oriented approval matrix resolving approvers from form category and hierarchical limits.',
      'Built Bidwise, an auction platform for scrap material on FastAPI and Vue.js with direct vendor negotiation.',
      'Developed a full-stack HRMS analysing attrition and predicting leave, connecting dynamically to client Odoo databases.',
    ],
    achievement:
      'Replaced hard-coded approval branching with a configurable SOA matrix, so new request types became a data change rather than a release.',
    tech: [
      'FastAPI', 'Python', 'Express.js', 'Node.js', 'Nuxt.js', 'Vue.js',
      'React.js', 'MongoDB', 'PostgreSQL', 'Odoo',
    ],
  },
  {
    id: 'dreamztech',
    company: 'Dreamztech Solutions',
    role: 'Asst. Software Engineer',
    period: 'Dec 2021 — Feb 2024',
    duration: '2 yr 3 mo',
    current: false,
    summary:
      'Payments infrastructure, ERP extension and reporting services.',
    responsibilities: [
      'Developed the backend for a payment gateway spanning admin, merchant and user modules on FastAPI, PostgreSQL and RabbitMQ.',
      'Engineered multi-way fund collection including one-way, split-way and recurring payment methods.',
      'Extended the Odoo inventory module with an SKU calculator, shipment tracking and vendor ranking.',
      'Programmed ZPL commands for automated barcode generation and label printing.',
      'Built a URL shortening and user management service on Nest.js and Django REST Framework with graph-rich PDF reporting.',
    ],
    achievement:
      'Shipped split-way and recurring collection on top of a single payment core, with RabbitMQ keeping settlement work off the request path.',
    tech: [
      'FastAPI', 'Python', 'PostgreSQL', 'RabbitMQ', 'Odoo', 'Nest.js',
      'Django REST Framework', 'ZPL',
    ],
  },
  {
    id: 'nibmg',
    company: 'NIBMG',
    role: 'Web Developer',
    period: 'Jun 2021 — Nov 2021',
    duration: '6 mo',
    current: false,
    summary:
      'Genomics data portal at the National Institute of Biomedical Genomics.',
    responsibilities: [
      'Built a Django full-stack application extracting and processing DNA data from uploaded ZIP and RAR archives.',
      'Designed the database schema storing parsed text and image report data.',
      'Visualised DNA reports through a React-based frontend portal.',
    ],
    achievement:
      'Turned raw archive uploads into readable, browsable genomic reports for researchers without manual preprocessing.',
    tech: ['Django', 'Python', 'React.js', 'PostgreSQL'],
  },
  {
    id: 'smartinfo',
    company: 'Smart Info Pvt Ltd',
    role: 'Web Developer',
    period: 'Nov 2019 — Mar 2021',
    duration: '1 yr 5 mo',
    current: false,
    summary:
      'First engineering role — order management and reporting automation.',
    responsibilities: [
      'Built an online order management system for a pharmaceutical company using Django and React.js.',
      'Automated daily, monthly and yearly sales report generation.',
      'Developed web scraping pipelines for external product and pricing data.',
    ],
    achievement:
      'Automated a reporting cycle that had been assembled by hand, across daily, monthly and yearly cadences.',
    tech: ['Django', 'Python', 'React.js', 'Web Scraping'],
  },
]
