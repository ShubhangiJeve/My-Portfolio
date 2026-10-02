// ─────────────────────────────────────────────
//  Projects Data: all projects with full detail
//  and Mermaid.js architecture diagrams
// ─────────────────────────────────────────────

import type { Project } from '../types';

export const projects: Project[] = [
  // ─── ENTERPRISE: LegalAID ───────────────────
  {
    id: 'legalaid',
    name: 'LegalAID',
    shortDescription:
      'Legal research and litigation assistant over 25 years of Indian court judgments, with hybrid retrieval and grounded answers.',
    fullDescription:
      'LegalAID is a legal research platform for Indian court judgments. It ingests yearly datasets of 20,000 to 75,000 cases, indexes them for both vector and full-text search, and answers questions with citations back to the source judgments. When retrieval confidence is low, the system declines to answer instead of guessing. It also drafts notices, memos, and case briefs, and compares cases side by side. Search returns in under 4 seconds across the full 25-year corpus.',
    category: 'enterprise',
    status: 'production',
    experienceId: 'cognitbotz',
    tech: [
      'Python', 'FastAPI', 'SQLAlchemy 2.0', 'Pydantic v2',
      'Next.js 14', 'TypeScript', 'PostgreSQL', 'pgvector',
      'LangChain', 'Groq API', 'Docker', 'BAAI/bge-m3',
    ],
    capabilities: [
      'Hybrid retrieval: pgvector similarity plus PostgreSQL full-text, fused with reciprocal rank fusion',
      'Parent-child chunk retrieval with entity-aware strategies',
      'Abstention policy: declines to answer below a retrieval confidence threshold',
      'AI legal document drafting (notices, memos, case briefs)',
      'Side-by-side litigation case comparison',
      'Admin ingestion pipeline console',
      'Sub-4-second search on full 25-year corpus',
    ],
    metrics: [
      { label: 'Cases per yearly dataset', value: '20K to 75K' },
      { label: 'Search latency',    value: '<4s' },
      { label: 'Years of judgments', value: '25' },
      { label: 'Fields normalized', value: '30+' },
    ],
    diagrams: [
      {
        type: 'mermaid',
        title: 'RAG Pipeline Architecture',
        code: `
flowchart TD
    A([User Query]) --> B["Query Parser and Entity Extractor"]
    B --> C{Routing Layer}
    C --> D["Dense Vector Search pgvector"]
    C --> E["Lexical Full-Text Search PostgreSQL"]
    D --> F["Hybrid Reciprocal Rank Fusion"]
    E --> F
    F --> G["Parent-Child Chunk Retriever"]
    G --> H{Confidence Threshold}
    H -- "Below 0.75" --> I(["Abstain: insufficient evidence"])
    H -- "Above threshold" --> J[Context Builder]
    J --> K["Groq LLM llama-3.3-70b"]
    K --> L["Response Validator and Citation Verifier"]
    L --> M(["Grounded Legal Answer with Source Citations"])

    style A fill:#1d4ed8,color:#fff,stroke:none
    style M fill:#dcfce7,color:#14532d,stroke:#15803d
    style I fill:#fee2e2,color:#7f1d1d,stroke:#b91c1c
    style K fill:#eff6ff,color:#1e3a8a,stroke:#1d4ed8
`,
      },
      {
        type: 'mermaid',
        title: 'System Architecture',
        code: `
graph TB
    subgraph Client["Frontend: Next.js 14 and TypeScript"]
        UI1[Natural Language Search]
        UI2[Faceted Case Explorer]
        UI3[Legal Drafting Workspace]
        UI4[Case Comparison View]
        UI5[Admin Console]
    end

    subgraph API["Backend: FastAPI and SQLAlchemy 2.0"]
        EP1["POST search/rag"]
        EP2["GET cases by ID"]
        EP3["POST draft document"]
        EP4["POST compare cases"]
        EP5["GET dashboard analytics"]
        Validator["Pydantic v2 Validation"]
        LLMService["Provider-Abstracted LLM Service"]
    end

    subgraph Data["Data layer: PostgreSQL 16 with pgvector"]
        DB[("PostgreSQL Structured and Vector")]
        VEC[("pgvector ANN Index bge-m3 embeddings")]
        FTS[("Full-Text Search tsvector")]
    end

    subgraph Infra["Infrastructure: Docker Compose"]
        BE["FastAPI Container Python 3.11"]
        DBContainer["PostgreSQL 16 Container"]
        Ingestion["Ingestion Pipeline Resumable"]
    end

    Client --> API
    API --> Validator
    Validator --> LLMService
    LLMService --> Data
    API --> Data
    Ingestion --> Data
    BE --- DBContainer

    style Client fill:#f8fafc,stroke:#1d4ed8,color:#0f172a
    style API fill:#f8fafc,stroke:#0f766e,color:#0f172a
    style Data fill:#f8fafc,stroke:#b45309,color:#0f172a
    style Infra fill:#f8fafc,stroke:#15803d,color:#0f172a
`,
      },
      {
        type: 'mermaid',
        title: 'Data Ingestion Pipeline',
        code: `
sequenceDiagram
    participant S as JSON Source
    participant P as Parser and Normalizer
    participant D as Deduplication Engine
    participant E as Embedding Service
    participant DB as PostgreSQL with pgvector

    S->>P: Yearly court case JSON dumps 20K to 75K cases
    P->>P: Extract 30 plus canonical fields parties acts bench coram
    P->>D: Normalized records
    D->>D: Hash-based deduplication
    D->>E: Clean case documents
    E->>E: Chunk by document type summaries orders timelines
    E->>E: Generate BAAI bge-m3 embeddings
    E->>DB: Write structured data with vector indexes
    DB-->>E: Resumable checkpoint state
    Note over E,DB: Resumable run, safe to restart after interruption
`,
      },
    ],
  },

  // ─── ENTERPRISE: MeetOps ────────────────────
  {
    id: 'meetops',
    name: 'MeetOps',
    shortDescription:
      'Meeting copilot for Microsoft Teams that indexes transcripts live and can create Jira tickets or pull SAP GRC metrics mid-meeting.',
    fullDescription:
      'MeetOps joins Microsoft Teams meetings through short-lived Playwright bots, one Docker container per meeting. The transcript is chunked by speaker turn and topic, embedded into pgvector, and made available to a copilot that answers questions about the meeting and related project documents. The copilot uses function calling to create Jira tickets, fetch SAP GRC metrics, and write rolling summaries. Answers stream to a React client over Server-Sent Events, and repeated questions are served from a Redis cache.',
    category: 'enterprise',
    status: 'in-progress',
    experienceId: 'cognitbotz',
    tech: [
      'Python', 'FastAPI', 'OpenAI', 'pgvector',
      'React', 'TypeScript', 'Docker', 'Playwright',
      'Redis', 'SSE', 'LangGraph', 'PostgreSQL',
    ],
    capabilities: [
      'Ephemeral per-meeting Playwright bot orchestration',
      'Speaker-turn aware RAG chunking over transcripts',
      'Agentic tool-calling (Jira, SAP GRC, summaries)',
      'Declines to answer when retrieved meeting context scores below 0.75',
      'Redis cache that skips embedding and LLM calls for repeated questions',
      'Server-Sent Events streaming to the React client during live meetings',
      'One container per meeting, reaped by a TTL watchdog so no state carries over',
    ],
    featuredImage: `${import.meta.env.BASE_URL}meetops/meetops-hero.png`,
    media: [
      {
        type: 'video',
        url: `${import.meta.env.BASE_URL}meetops/meetops-demo.mp4`,
        title: 'Product walkthrough',
        caption: 'End-to-end demo: the bot joins a Teams meeting, the transcript is indexed, and the copilot answers questions and triggers actions.',
      },
      {
        type: 'image',
        url: `${import.meta.env.BASE_URL}meetops/meetops-hero.png`,
        title: 'Landing page',
        caption: 'MeetOps landing page.',
      },
      {
        type: 'image',
        url: `${import.meta.env.BASE_URL}meetops/meetops-repositories.png`,
        title: 'Project repositories',
        caption: 'Each project is an isolated knowledge store with its own meetings, documents, and vector chunks. Retrieval is scoped to the selected project.',
      },
    ],
    diagrams: [
      {
        type: 'mermaid',
        title: 'Bot Lifecycle and Orchestration',
        code: `
stateDiagram-v2
    [*] --> Provisioning : Meeting Scheduled
    Provisioning --> Active : Docker container started
    Active --> Transcribing : Bot joins Teams meeting
    Transcribing --> RAGIndexing : Transcript chunks buffered
    RAGIndexing --> CopilotReady : Embeddings stored in pgvector
    CopilotReady --> Responding : User query received
    Responding --> CopilotReady : Response streamed via SSE
    CopilotReady --> Cleanup : Meeting ended or TTL expired
    Cleanup --> [*] : Container reaped and state isolated
`,
      },
      {
        type: 'mermaid',
        title: 'Agentic Copilot Architecture',
        code: `
flowchart LR
    A([User Query]) --> B[Query Router]
    B --> C{Cache Check Redis}
    C -- Hit --> R([Cached Response via SSE])
    C -- Miss --> D["Semantic Search pgvector ANN"]
    D --> E{"Confidence Score above 0.75?"}
    E -- No --> F(["Abstain: insufficient meeting context"])
    E -- Yes --> G["Agentic LLM OpenAI Function Calling"]
    G --> H{Tool Needed?}
    H -- Yes --> I1[Create Jira Ticket]
    H -- Yes --> I2[Fetch SAP GRC Metrics]
    H -- Yes --> I3[Generate Meeting Summary]
    H -- No --> J[Compose Response]
    I1 --> J
    I2 --> J
    I3 --> J
    J --> K[Stream via SSE]
    K --> L[React Frontend]
    K --> C

    style A fill:#1d4ed8,color:#fff,stroke:none
    style R fill:#dcfce7,color:#14532d,stroke:#15803d
    style F fill:#fee2e2,color:#7f1d1d,stroke:#b91c1c
    style G fill:#eff6ff,color:#1e3a8a,stroke:#1d4ed8
`,
      },
    ],
  },

  // ─── ENTERPRISE: Granite Buyer Intelligence ─
  {
    id: 'granite-buyer-intelligence',
    name: 'Granite Buyer Intelligence',
    shortDescription:
      'Local-first B2B lead generation platform for granite exporters — automated buyer discovery, evidence-backed qualification, multi-provider LLM gateway, and Office 365 email outreach.',
    fullDescription:
      'Granite Buyer Intelligence is a full-stack, solo-built B2B intelligence platform for Goldline, a granite exporter targeting India and the UK. It automates the entire buyer research lifecycle: discovery via DuckDuckGo/Bing, bounded async web acquisition with SSRF controls, HTML extraction into sourced Evidence records, buyer scoring, and one-click Office 365 SMTP outreach — all running locally on SQLite WAL with no cloud infrastructure.\n\nThe AI layer is a production-grade multi-provider LLM gateway with two independent failover chains: for chat generation, OpenRouter (Nemotron-550B) → NVIDIA Build (Nemotron-120B) → Groq; for embeddings, NVIDIA Build → OpenRouter → a zero-dependency local TF lexical fallback that guarantees semantic ranking stays online with no internet. Every AI call is quota-gated at the DB level with an atomic BEGIN IMMEDIATE transaction. PII is redacted before any text leaves the machine, and a reasoning-token cleaner strips <think> scratchpads from model outputs. The frontend is a custom React + Vite + TypeScript SPA; the backend is a modular FastAPI monolith with a durable SQLite-backed job queue and full RBAC, CSRF, and SSRF hardening.',
    category: 'enterprise',
    status: 'completed',
    experienceId: 'cognitbotz',
    tech: [
      'Python 3.12', 'FastAPI', 'SQLAlchemy 2', 'Alembic', 'Pydantic v2',
      'SQLite (WAL)', 'aiohttp', 'BeautifulSoup4', 'Scrapling',
      'OpenRouter', 'NVIDIA Build', 'Groq', 'React 18', 'Vite',
      'TypeScript', 'TanStack Query', 'openpyxl', 'Argon2-cffi',
      'pytest', 'uv',
    ],
    capabilities: [
      'Automated buyer discovery via DuckDuckGo → Bing fallback with SSRF-validated async acquisition',
      'Evidence-first data model: every buyer claim has a sourced, timestamped Evidence record with FACT / AI_INTERPRETATION DB constraint',
      'Three-tier LLM failover gateway: OpenRouter → NVIDIA Build → Groq with automatic provider escalation',
      'Two-tier embedding failover: NVIDIA nemotron-3-embed-1b → OpenRouter → local lexical TF fallback (zero API, always-on)',
      'PII redaction (emails + phone numbers) before any text leaves the machine',
      'Reasoning-token cleaner strips <think> scratchpad blocks from model outputs',
      'Daily quota-gated AI calls via atomic BEGIN IMMEDIATE SQLite transaction',
      'Durable SQLite job queue with lease system, heartbeat, and automatic crash recovery',
      'Office 365 SMTP email outreach with RFC-compliant Message-ID, dual MIME, and audit trail',
      '13-worksheet openpyxl Excel export with formula-safe text escaping',
      'Priority grading A/B/C/D + quality score 0–100 per buyer record',
      'Full RBAC, CSRF, SSRF, Argon2 password hashing, CSP headers, and parameterized ORM',
    ],
    metrics: [
      { label: 'LLM providers (failover chain)', value: '3' },
      { label: 'Embedding providers + local fallback', value: '3' },
      { label: 'Excel export worksheets', value: '13' },
      { label: 'DB domain modules', value: '9' },
    ],

    // ── Problem Statement ─────────────────────
    problemStatement: {
      headline:
        'A granite supplier — Goldline — exports premium Indian stone to global markets, but their entire buyer research process was manual, untracked, and unscalable.',
      points: [
        'Discovery — No automated way to find potential granite buyer companies from public sources. Teams Googled company names one by one and copied data into unstructured spreadsheets.',
        'Qualification — No evidence-backed system to assess whether a found company actually buys granite. Outreach emails went out with no signal on relevance or intent.',
        'Operationalization — No audit trail, no standardised export, no email workflow, and no qualification logic for the sales team to act on.',
      ],
    },

    // ── Objective ────────────────────────────
    objective: [
      { number: '1', goal: 'Automate discovery of granite buyer candidates in India and the UK from public web sources — no paid APIs.' },
      { number: '2', goal: 'Qualify every buyer claim with a sourced, timestamped evidence record — no invented data.' },
      { number: '3', goal: 'Support the full research lifecycle: web collection → extraction → staging → buyer profile → assessment → export.' },
      { number: '4', goal: 'Run entirely on a single local machine — no cloud infrastructure, no external database server required.' },
      { number: '5', goal: 'Integrate an optional LLM layer for buyer interpretation — clearly separated from verified facts at the database level.' },
      { number: '6', goal: 'Provide a logged, auditable Microsoft 365 email outreach capability per contact.' },
    ],

    // ── Role ─────────────────────────────────
    roleType: 'solo',
    roleHighlight: 'Designed and implemented every layer end-to-end, from architecture review to delivery.',
    roleRows: [
      { area: 'Architecture', contribution: 'Designed full modular monolith covering 9 lifecycle domains: identity, catalogue, discovery, evidence, buyers, intelligence, jobs, email, and reporting.' },
      { area: 'Backend', contribution: 'Built the complete Python FastAPI backend — API routes, service layer, data models, database migrations, background worker, and CLI tooling.' },
      { area: 'Frontend', contribution: 'Built the complete React + Vite + TypeScript SPA — authentication, buyers, discovery, dashboard, email, and settings screens.' },
      { area: 'Data Pipeline', contribution: 'Designed and implemented: web acquisition → HTML extraction → evidence staging → buyer creation → scoring and prioritisation.' },
      { area: 'Security', contribution: 'Argon2 password hashing, opaque sessions, CSRF middleware, SSRF controls, RBAC decorators, parameterised ORM, and an audit log.' },
      { area: 'Email Integration', contribution: 'Microsoft 365 SMTP integration with RFC-compliant Message-ID generation, dual MIME, evidence trail, and full audit log.' },
      { area: 'AI Layer', contribution: 'Production-grade multi-provider LLM gateway (OpenRouter → NVIDIA Build → Groq) with PII redaction, reasoning-token cleaner, and quota enforcement.' },
      { area: 'Testing', contribution: 'Auth, RBAC, CSRF, SSRF / DNS-rebinding, evidence-backed intake, Excel output, and AI isolation tests.' },
      { area: 'Documentation', contribution: 'Architecture review, deployment guide, implementation status, decision log, and progress log — written before any application code.' },
    ],

    // ── Dataset ──────────────────────────────
    dataset: {
      summary:
        'All data is sourced from publicly available web pages — no licensed datasets, no paid data providers. The platform is designed for ~5,000 companies with 5–10 pages per company.',
      sources: [
        { label: 'Public company websites', value: 'Homepage, About, Product, and Contact pages — extracted with BeautifulSoup and Scrapling' },
        { label: 'Web search', value: 'DuckDuckGo as the primary search provider, Bing as an automatic fallback' },
        { label: 'User-imported URLs / CSVs', value: 'Manual operator-curated input as a supplement to automated discovery' },
        { label: 'User-entered contacts', value: 'Published emails, social links, and phone numbers entered by the operator' },
        { label: 'Target geography', value: 'India (IN) — importers, distributors, wholesalers, fabricators; United Kingdom (GB) — stone importers, contractors, retailers' },
        { label: 'Data scale (design target)', value: '~5,000 companies; 5–10 pages per company; all evidence stored in SQLite on local disk' },
        { label: 'Quality policy', value: 'Missing values → explicit null + UNKNOWN / NOT_VERIFIED states; priority grades A / B / C / D; quality score 0–100 per buyer' },
      ],
      notes: [
        'Every data point is tagged: source URL, extraction timestamp, parser version, and evidence kind (FACT vs AI_INTERPRETATION).',
        'Live search returned HTTP 202 (async acceptance, no results body) during development — the pipeline mechanics were validated using synthetic test fixtures.',
        'The FACT vs AI_INTERPRETATION distinction is enforced at the database level via a CHECK CONSTRAINT so the two can never be conflated.',
      ],
    },

    // ── Methodology ──────────────────────────
    methodologyRows: [
      { category: 'API Framework', detail: 'FastAPI + Uvicorn', rationale: 'Auto OpenAPI generation, Pydantic v2 validation, and native async support.' },
      { category: 'ORM & Migrations', detail: 'SQLAlchemy 2 + Alembic', rationale: 'Typed mapped columns, session management, and versioned frozen schema history.' },
      { category: 'Database', detail: 'SQLite in WAL mode', rationale: 'Local embedded database — no external server, supports concurrent web process + worker.' },
      { category: 'HTML Extraction', detail: 'BeautifulSoup4 + Scrapling', rationale: 'Static HTML parsing as primary; Scrapling as a JavaScript-rendered page fallback.' },
      { category: 'Async HTTP', detail: 'aiohttp', rationale: 'Bounded async web acquisition with 90-second timeouts, 1 MB limits, and 3-retry backoff.' },
      { category: 'LLM Gateway', detail: 'OpenRouter → NVIDIA Build → Groq', rationale: 'Three-tier failover over an OpenAI-compatible API surface; provider is swappable without changing business logic.' },
      { category: 'Vector Embeddings', detail: 'NVIDIA nemotron-3-embed-1b → OpenRouter → Local TF fallback', rationale: 'Two-tier dense embedding chain with a zero-dependency lexical fallback guaranteeing 100% uptime.' },
      { category: 'Excel Export', detail: 'openpyxl', rationale: '13-worksheet workbook with formula-safe text escaping to prevent injection in downstream tools.' },
      { category: 'Password Hashing', detail: 'Argon2-cffi', rationale: 'Best-practice modern password storage — memory-hard and resistant to GPU cracking.' },
      { category: 'Package Manager', detail: 'uv', rationale: 'Lock-file reproducibility and fast dependency resolution.' },
      { category: 'Testing', detail: 'pytest + pytest-asyncio + HTTPX', rationale: 'Unit, API, pipeline, and security tests including dedicated SSRF / DNS-rebinding coverage.' },
      { category: 'Frontend', detail: 'React 18 + Vite + TypeScript + TanStack Query', rationale: 'Fast dev server, typed API contracts, and server-state cache management without a framework lock-in.' },
      { category: 'Evidence principle', detail: 'FACT vs AI_INTERPRETATION at DB level', rationale: 'CHECK CONSTRAINT enforces the separation so verified facts and LLM output can never be confused.' },
      { category: 'Job safety', detail: 'Durable queue with 180-second leases + heartbeats', rationale: 'Jobs persist through restarts; leases handle crash recovery and prevent two workers from claiming the same job.' },
    ],

    // ── Process ──────────────────────────────
    process: [
      {
        phase: 'Architecture & Design (before any code)',
        points: [
          'Read and synthesised the full business requirements document covering Goldline\'s operational needs and constraints.',
          'Identified core constraints: local-only execution, no paid APIs, SQLite as the only database, open-source stack throughout.',
          'Wrote a complete architecture review spanning 21 sections — system diagram, database entity relationship model, data pipeline, security model, compliance considerations, MVP definition, risk register, and a 7-phase roadmap — before any application code was written.',
        ],
      },
      {
        phase: 'Foundation',
        points: [
          'Python project setup with pyproject.toml and a uv lock file for reproducible environments.',
          'Core layer: SQLAlchemy 2 + SQLite WAL engine, pydantic-settings configuration with SecretStr for all credentials.',
          'Session management, CSRF middleware, and body limit middleware.',
          'Alembic migrations for all database tables.',
          'CLI tooling: granite init, create-user, seed-products, and backup commands.',
        ],
      },
      {
        phase: 'Backend Services',
        points: [
          'Identity: user model, Argon2 hashing, session table, login throttling, and RBAC decorators.',
          'Product catalogue: CRUD with status lifecycle (draft → active → archived) and configurable search keywords.',
          'Discovery pipeline: background worker, SQLite-backed job queue, DuckDuckGo + Bing adapters, robots.txt compliance, SSRF controls, HTML extraction, evidence staging, buyer promotion, and automatic child collection jobs.',
          'Intelligence: assessment service (A/B/C/D scoring with traceable reasons), quality scoring, and multi-provider LLM gateway.',
          'Email: Office 365 SMTP integration with RFC Message-ID generation, dual MIME encoding, evidence trail, and audit log.',
          'Export: 13-worksheet openpyxl workbook with formula-safe text escaping.',
        ],
      },
      {
        phase: 'Frontend',
        points: [
          'React + Vite + TypeScript built from scratch with a custom CSS design system using CSS custom properties for all design tokens.',
          'Login and auth flow, dashboard, buyer list and detail view with evidence timeline, product CRUD, discovery UI, contact email composer, email tester, job monitor, and settings.',
          'TanStack Query for server-state management and cache invalidation.',
        ],
      },
      {
        phase: 'Security Hardening',
        points: [
          'SSRF: blocked all private, loopback, link-local, multicast, and reserved IP ranges; validated DNS resolution inside the TCP connector (not as a preflight check) to prevent DNS-rebinding attacks; blocked integer and octal IP bypasses; revalidated on every redirect.',
          'CSRF: state-changing endpoints protected with sec-fetch-site header validation.',
          'Excel injection: formula-safe text escaping on all exported cell values.',
          'Parameterised ORM throughout; SecretStr values are never included in API responses or logs.',
        ],
      },
      {
        phase: 'Testing',
        points: [
          'Unit and API tests covering auth, RBAC, and CSRF flows.',
          'Security tests for SSRF and DNS-rebinding attack vectors.',
          'Pipeline tests for evidence-backed intake and Excel output correctness.',
          'AI isolation tests ensuring the LLM layer can be disabled without affecting core data operations.',
        ],
      },
      {
        phase: 'Documentation',
        points: [
          'Architecture review, deployment guide, implementation status tracker, next-steps document, decision log, and progress log.',
          'All major technical decisions are recorded in the decision log with rationale and alternatives considered.',
        ],
      },
    ],

    // ── Challenges & Learnings ────────────────
    challenges: [
      {
        title: 'Live Search Provider Unavailability',
        problem:
          'The free DuckDuckGo search adapter returned HTTP 202 (asynchronous acceptance with no results body) for both India and UK discovery probes during development, making live end-to-end validation impossible.',
        resolution:
          'Designed the system to surface the failure explicitly — every run reports searches attempted, searches succeeded, and searches failed. Added Bing as an automatic fallback. Built replaceable adapter interfaces so new search providers can be plugged in without touching evidence or buyer models. Validated pipeline mechanics using synthetic test fixtures.',
        learning:
          'Transparent failure reporting beats false positives. An operator seeing "search unavailable" can import URLs manually — that honest fallback is built into the system. Resilience must be a first-class design requirement, not an afterthought.',
      },
      {
        title: 'Evidence-First Discipline vs. Speed Pressure',
        problem:
          'There is a constant temptation to infer buyer intent from a website that mentions "granite" — which creates fabricated confidence and pollutes the dataset with unverifiable claims.',
        resolution:
          'Enforced the FACT vs AI_INTERPRETATION distinction at the database schema level with a CHECK CONSTRAINT. Every assessment reason traces to a specific Evidence row with a source URL and excerpt. UNKNOWN values stay UNKNOWN — they are never coerced into a score.',
        learning:
          'Data quality discipline is an architecture decision. Enforcing it in the schema from day one is far cheaper than retrofitting it later. A system that honestly says "I don\'t know" is more trustworthy than one that guesses.',
      },
      {
        title: 'SQLite Concurrency with Two Processes',
        problem:
          'The web process and the background worker both write to the same SQLite file, creating lock contention that could cause jobs to be lost or double-claimed on concurrent requests.',
        resolution:
          'Enabled WAL mode, used BEGIN IMMEDIATE transactions for job claiming, implemented 180-second leases with token validation on every write, made all handlers idempotent, and added automatic expired-lease recovery. The lease system also survived laptop sleep and wake cycles without losing job progress.',
        learning:
          'SQLite handles a web + worker architecture well — but it requires deliberate transaction discipline. The lease pattern is a simple, proven solution to the distributed work-claim problem that scales to this deployment model.',
      },
      {
        title: 'SSRF in Web Scraping',
        problem:
          'A scraper that fetches any operator-supplied URL can be weaponised to probe internal network addresses. The standard "preflight DNS then connect" approach is vulnerable to DNS rebinding, where the DNS record changes between the preflight check and the actual connection.',
        resolution:
          'Built a custom TCP connector that validates the resolved IP address inside the connection handler, not before it. Blocked all private, loopback, link-local, multicast, and reserved ranges. Revalidated on every redirect. Covered by dedicated security tests.',
        learning:
          'Preflight DNS validation is a time-of-check / time-of-use vulnerability. Validation must happen at connection time, inside the connector, to be trustworthy. This is a non-obvious security requirement that affects any system that makes outbound HTTP requests based on user-supplied URLs.',
      },
      {
        title: 'Email Architecture Scope vs. Safety',
        problem:
          'A full campaign system — templates, suppression lists, sequences, reply handling — would take months to build and would carry significant risk if partially implemented and shipped.',
        resolution:
          'Split the email feature into two explicit tiers: Tier 1 (single operator-initiated email per contact with a full audit trail, delivered now) and Tier 2 (full campaign pipeline documented as a future phase with explicit safety gates). Tier 1 is safe, complete, and useful. Tier 2 is documented for whenever the scope expands.',
        learning:
          'A smaller, safe, working feature is always better than a larger, risky, half-built one. Explicitly naming the boundary between "done now" and "future phase" prevents scope creep and sets honest expectations.',
      },
    ],

    conclusion: `Granite Buyer Intelligence is a production-grade, solo-built platform that proves local-first architecture can be robust, secure, and AI-capable without cloud infrastructure. It delivers a complete B2B research lifecycle — from automated web discovery to evidence-backed buyer profiles, multi-provider AI briefings, and audited email outreach — all on a single machine. The project demonstrates that evidence-first data discipline, multi-tier failover design, and zero-trust security can be applied together in a compact, maintainable codebase.`,

    diagrams: [


      {
        type: 'mermaid',
        title: 'System Architecture',
        code: `
flowchart TD
    subgraph Client["🖥️ Local Browser"]
        UI["React + Vite + TypeScript SPA"]
    end

    subgraph WebProcess["⚙️ FastAPI + Uvicorn"]
        MW["Security Middleware: CSRF · CORS · CSP · Body Limit"]
        Routes["API Routes /api/v1: auth · buyers · discovery · emails · jobs · exports"]
        Services["Domain Services: discovery · assessment · email · export · audit"]
    end

    subgraph WorkerProcess["🔄 Background Worker"]
        Loop["Polling Loop: claim → execute → heartbeat every 10s"]
        JobExec["Job Executor: search_product · collect_page · refresh_website"]
        Providers["Provider Layer: web · extraction · discovery · AI gateway"]
    end

    subgraph Storage["💾 SQLite WAL"]
        DB[("granite.sqlite3: WAL Mode")]
        RawFiles["Raw Evidence Files: SHA-256 per page"]
        Backups["Encrypted Backups"]
    end

    subgraph External["🌐 External"]
        DDG["DuckDuckGo Search (primary)"]
        Bing["Bing Search (fallback)"]
        CompanySites["Public Company Websites: robots.txt · SSRF validated"]
        O365["Office 365 SMTP: smtp.office365.com:587 STARTTLS"]
        AIGateway["AI Gateway: OpenRouter → NVIDIA → Groq"]
    end

    UI -->|"same-origin XHR"| MW
    MW --> Routes --> Services --> DB
    Loop --> DB
    Loop --> JobExec --> Providers
    Providers -->|"SSRF-checked HTTPS"| DDG
    Providers -->|"SSRF-checked HTTPS"| Bing
    Providers -->|"SSRF-checked HTTPS"| CompanySites
    Providers --> RawFiles
    Providers -.optional.-> AIGateway
    Services -->|"STARTTLS"| O365
    Services --> Backups

    style Client fill:#1e293b,color:#e2e8f0,stroke:#3b82f6
    style WebProcess fill:#1e293b,color:#e2e8f0,stroke:#10b981
    style WorkerProcess fill:#1e293b,color:#e2e8f0,stroke:#f59e0b
    style Storage fill:#1e293b,color:#e2e8f0,stroke:#8b5cf6
    style External fill:#1e293b,color:#e2e8f0,stroke:#64748b
`,
      },
      {
        type: 'mermaid',
        title: 'LLM Gateway — Full AI Stack',
        code: `
flowchart TD
    subgraph App["🧠 AI Service Layer"]
        SVC["service.py: generate_buyer_ai_note()"]
        QUOTA["Daily Quota Check: SQLite COUNT per UTC day — BEGIN IMMEDIATE atomic"]
        REDACT["PII Redactor: prompts.redact_pii() — strips emails + phone numbers"]
        CONTEXT["Context Assembler: buyer profile + ranked excerpts + catalogue products"]
        PROMPT["System Prompt: Senior B2B Stone Intelligence Analyst — 100-140 word factual briefing"]
    end

    subgraph VEC["🔢 Vector & Semantic Layer"]
        EMBED["get_embeddings(): fetches dense vectors"]
        RANK["rank_evidence(): cosine similarity ranking of up to 30 Evidence records — top-k=6"]
        MATCH["match_products(): semantic affinity scoring — top-k=3 matched products"]
        LEX["Local Lexical Fallback: TF-based cosine similarity — no API needed"]
    end

    subgraph GW["⚡ LLM Gateway"]
        G1["1️⃣ Primary: OpenRouter — nvidia/nemotron-3-ultra-550b-a55b:free — timeout=25s"]
        G2["2️⃣ Fallback: NVIDIA Build — nvidia/nemotron-3-super-120b-a12b — timeout=25s"]
        G3["3️⃣ Tertiary: Groq — configured model — timeout=30s"]
        CLEAN["clean_reasoning_tokens(): strips think tags + meta-preamble + markdown fences"]
    end

    subgraph EMBED_PROVIDERS["🔢 Embedding Providers"]
        NV_EMBED["1️⃣ NVIDIA Build: nvidia/nemotron-3-embed-1b — timeout=20s"]
        OR_EMBED["2️⃣ OpenRouter: nvidia/llama-nemotron-embed-vl-1b-v2:free — timeout=20s"]
        LOC_EMBED["3️⃣ Local Lexical: TF vectors — zero latency — always succeeds"]
    end

    SVC --> QUOTA --> REDACT
    RANK --> CONTEXT
    MATCH --> CONTEXT
    CONTEXT --> REDACT --> PROMPT

    EMBED --> NV_EMBED
    NV_EMBED -->|"fail"| OR_EMBED
    OR_EMBED -->|"fail"| LOC_EMBED
    RANK --> EMBED
    MATCH --> EMBED

    PROMPT --> G1
    G1 -->|"timeout / 429 / error"| G2
    G2 -->|"timeout / 429 / error"| G3
    G1 --> CLEAN
    G2 --> CLEAN
    G3 --> CLEAN

    style G1 fill:#1d4ed8,color:#fff,stroke:none
    style G2 fill:#0f766e,color:#fff,stroke:none
    style G3 fill:#7c3aed,color:#fff,stroke:none
    style NV_EMBED fill:#1d4ed8,color:#fff,stroke:none
    style OR_EMBED fill:#0f766e,color:#fff,stroke:none
    style LOC_EMBED fill:#15803d,color:#fff,stroke:none
`,
      },
      {
        type: 'mermaid',
        title: 'Request Execution Flow',
        code: `
sequenceDiagram
    participant UI as React Frontend
    participant API as FastAPI /buyers/:id/ai-note
    participant SVC as ai/service.py
    participant VEC as ai/vector.py
    participant GW as ai/gateway.py
    participant DB as SQLite
    participant OR as OpenRouter API
    participant NV as NVIDIA Build API
    participant GQ as Groq API

    UI->>API: POST /buyers/{id}/ai-note
    API->>SVC: generate_buyer_ai_note(buyer, settings)
    SVC->>DB: BEGIN IMMEDIATE — count ai_interpretations today
    DB-->>SVC: used count vs. daily limit
    SVC->>DB: INSERT ai_interpretations (status=pending)

    SVC->>DB: SELECT evidence WHERE buyer_id = ? LIMIT 30
    DB-->>SVC: up to 30 evidence rows
    SVC->>VEC: rank_evidence(buyer_query, evidence_items, top_k=6)

    VEC->>NV: POST /embeddings — nvidia/nemotron-3-embed-1b
    alt NVIDIA succeeds
        NV-->>VEC: dense vectors
    else NVIDIA fails
        VEC->>OR: POST /embeddings — openrouter embed
        alt OpenRouter succeeds
            OR-->>VEC: dense vectors
        else OpenRouter fails
            VEC->>VEC: local_lexical_vector() — TF fallback
        end
    end
    VEC-->>SVC: top-6 ranked evidence excerpts

    SVC->>VEC: match_products(buyer_text, active_products, top_k=3)
    VEC-->>SVC: top-3 semantically matched product names
    SVC->>SVC: assemble_buyer_context() + redact_pii()
    SVC->>GW: gateway.generate(messages)

    GW->>OR: POST /chat/completions — Nemotron-550B
    alt OpenRouter succeeds
        OR-->>GW: LLMResponse
    else OpenRouter timeout / 429
        GW->>NV: POST /chat/completions — Nemotron-120B
        alt NVIDIA succeeds
            NV-->>GW: LLMResponse
        else NVIDIA fails
            GW->>GQ: POST /chat/completions — Groq model
            GQ-->>GW: LLMResponse
        end
    end

    GW->>GW: clean_reasoning_tokens() — strip think tags
    GW-->>SVC: cleaned LLMResponse
    SVC->>DB: UPDATE ai_interpretations SET status=succeeded
    API-->>UI: JSON response with text, model, provider, latency_ms
`,
      },
      {
        type: 'mermaid',
        title: 'Data Pipeline — Execution Flow',
        code: `
flowchart LR
    subgraph OP["👤 Operator"]
        A["Select Product + Countries + Candidate Limit + Policy ACK"]
    end
    subgraph DISC["🔍 Discovery Phase"]
        B["Build Search Queries: product × keyword × buyer-role × country"]
        C["Queue search_product Jobs in SQLite"]
        D["Worker Claims Job: BEGIN IMMEDIATE — lease_token assigned"]
        E["Execute Search: DuckDuckGo → Bing fallback"]
        F["Parse Results: extract candidate domains"]
        G{{"Domain in DB?"}}
        H["Mark: duplicate"]
        I{{"Excluded domain?"}}
        J["Mark: rejected"]
        K["Create Candidate + Queue collect_page Job"]
    end
    subgraph ACQ["🌐 Acquisition Phase"]
        L["Worker Claims collect_page Job"]
        M["SSRF Check: block private / loopback / reserved IPs"]
        N["robots.txt Check"]
        O["Async HTTP GET: 90s timeout · 1 MB limit · 3 retries + backoff"]
        P["Store RawRecord: body + SHA-256 + timestamp"]
    end
    subgraph EXT["🧪 Extraction Phase"]
        Q["HTML Extraction: BeautifulSoup / Scrapling"]
        R["Extract Fields: name · description · email · phone · address · keywords"]
        S["Create Evidence Records: kind=FACT · source_url · excerpt · timestamp"]
        T["Promote to Buyer if sufficient evidence"]
    end
    subgraph ASSESS["📊 Assessment"]
        U["Run Assessment: keyword relevance × completeness"]
        V["Assign Priority: A / B / C / D + reasons"]
        W["Update quality_score: 0 to 100"]
    end
    subgraph OUT["📤 Output"]
        X["Buyer in UI with Evidence Timeline"]
        Y["Contact Management: email · phone · social"]
        Z["Excel Export: 13 worksheets via openpyxl"]
        AA["Email via Office 365 SMTP"]
    end

    A --> B --> C --> D --> E --> F --> G
    G -->|yes| H
    G -->|no| I
    I -->|yes| J
    I -->|no| K
    K --> L --> M --> N --> O --> P --> Q --> R --> S --> T --> U --> V --> W --> X
    X --> Y --> AA
    X --> Z

    style A fill:#1d4ed8,color:#fff,stroke:none
    style X fill:#dcfce7,color:#14532d,stroke:#15803d
`,
      },
      {
        type: 'mermaid',
        title: 'Database Entity Relationship',
        code: `
erDiagram
    USERS {
        string id PK
        string email
        string hashed_password
        string role
        bool is_active
    }
    BUYERS {
        string id PK
        string source_record_id FK
        string name
        string country
        string website
        string buyer_category
        string priority
        int quality_score
        string verification_state
    }
    EVIDENCE {
        string id PK
        string buyer_id FK
        string raw_record_id FK
        string kind
        string field
        string value
        string source_url
        string excerpt
        string collected_at
    }
    CONTACTS {
        string id PK
        string buyer_id FK
        string name
        string email
        string phone
        string role
        string email_status
    }
    JOBS {
        string id PK
        string kind
        string status
        string url
        int attempts
        string lease_until
        string lease_token
        string discovery_run_id FK
    }
    RAW_RECORDS {
        string id PK
        string source_url
        string body
        string content_hash
        string collected_at
    }
    EMAIL_LOGS {
        string id PK
        string buyer_id FK
        string contact_id FK
        string recipient_email
        string subject
        string status
    }
    AUDIT_LOGS {
        string id PK
        string actor_id FK
        string action
        string entity_type
        string entity_id
    }

    USERS ||--o{ AUDIT_LOGS : "creates"
    BUYERS ||--o{ EVIDENCE : "has"
    BUYERS ||--o{ CONTACTS : "has"
    BUYERS ||--o{ EMAIL_LOGS : "receives"
    CONTACTS ||--o{ EMAIL_LOGS : "linked to"
    RAW_RECORDS ||--o{ EVIDENCE : "supports"
    RAW_RECORDS ||--o| BUYERS : "promoted to"
    JOBS ||--o| RAW_RECORDS : "stores"
`,
      },
      {
        type: 'mermaid',
        title: 'Job Execution State Machine',
        code: `
stateDiagram-v2
    [*] --> queued : Job created: search_product or collect_page

    queued --> running : Worker claims — BEGIN IMMEDIATE — lease_token assigned — attempts++

    running --> succeeded : Job completed — buyer or evidence created

    running --> failed : Max attempts 3 exhausted

    running --> queued : Lease expired — worker crashed or restarted — attempts less than 3

    running --> running : Heartbeat every 10s

    failed --> [*] : Dead-letter — inspectable in UI

    succeeded --> [*] : Buyer record promoted
`,
      },
      {
        type: 'mermaid',
        title: 'Embedding Provider Failover Chain',
        code: `
flowchart LR
    Q["Query Text + Evidence Texts + Product Texts"]

    subgraph Primary["1️⃣ NVIDIA Build: nvidia/nemotron-3-embed-1b — timeout=20s"]
        NV_OK["✅ Dense Vectors — High-dim semantic embeddings — Cosine similarity ranking"]
    end

    subgraph Secondary["2️⃣ OpenRouter: nvidia/llama-nemotron-embed-vl-1b-v2:free — timeout=20s"]
        OR_OK["✅ Dense Vectors — High-dim semantic embeddings — Cosine similarity ranking"]
    end

    subgraph Fallback["3️⃣ Local Lexical Engine — Pure Python — No API — Always available"]
        LOC["✅ Sparse TF Vectors — Term-frequency cosine similarity — Zero latency · Zero cost"]
    end

    RANK["top-k Evidence Records sorted by cosine similarity — returned to AI Service"]

    Q --> Primary
    Primary -->|"HTTP error / timeout / API key missing"| Secondary
    Secondary -->|"HTTP error / timeout / API key missing"| Fallback
    Primary --> NV_OK --> RANK
    Secondary --> OR_OK --> RANK
    Fallback --> LOC --> RANK

    style Primary fill:#1e293b,color:#e2e8f0,stroke:#3b82f6
    style Secondary fill:#1e293b,color:#e2e8f0,stroke:#10b981
    style Fallback fill:#1e293b,color:#e2e8f0,stroke:#15803d
`,
      },
    ],
  },

  // ─── PERSONAL: RAG Document QA ──────────────
  {
    id: 'rag-doc-qa',
    name: 'RAG Document QA System',
    shortDescription:
      'Question answering over uploaded PDF and TXT files, with source citations and an ingestion dashboard.',
    fullDescription:
      'A retrieval-augmented question answering system for your own documents. It ingests multiple PDF and TXT files, chunks them with overlap, embeds them with sentence-transformers, and stores them in ChromaDB. A FastAPI backend serves answers with source citations, and a React dashboard shows ingestion progress and retrieval results.',
    category: 'personal',
    status: 'completed',
    tech: [
      'Python', 'FastAPI', 'React', 'TypeScript',
      'ChromaDB', 'sentence-transformers', 'Docker',
    ],
    capabilities: [
      'PDF and TXT multi-document ingestion',
      'Semantic chunking with overlap control',
      'Source-grounded answer generation',
      'Async RESTful API with full error handling',
      'Real-time ingestion KPI monitoring dashboard',
      'Dockerized full-stack deployment',
    ],
    diagrams: [
      {
        type: 'mermaid',
        title: 'Document Q and A Flow',
        code: `
flowchart TD
    subgraph Ingestion[" Ingestion Pipeline "]
        A["Upload PDF or TXT"] --> B[Document Parser]
        B --> C["Semantic Chunker with overlap"]
        C --> D["sentence-transformers Embedding Model"]
        D --> E[("ChromaDB Vector Store")]
    end
    subgraph Query[" Query Pipeline "]
        F([User Question]) --> G[Query Embedder]
        G --> H["ANN Similarity Search Top-K Chunks"]
        H --> E
        H --> I["LLM with Source Context"]
        I --> J{Source Verified?}
        J -- Yes --> K(["Answer with Citations"])
        J -- No --> L([Request Clarification])
    end

    style A fill:#1d4ed8,color:#fff,stroke:none
    style K fill:#dcfce7,color:#14532d,stroke:#15803d
    style E fill:#fef3c7,color:#78350f,stroke:#b45309
`,
      },
    ],
  },

  // ─── PERSONAL: Insurance Claim ──────────────
  {
    id: 'insurance-claim',
    name: 'Insurance Claim Automation',
    shortDescription:
      'Extracts fields from medical claim PDFs with Gemini, validates them, and routes each claim to approve, reject, or manual review.',
    fullDescription:
      'A claim processing pipeline for medical insurance. Gemini extracts diagnosis, billing, and procedure fields from uploaded PDFs, a LangChain chain applies coverage rules, and a validator checks the extracted fields before the claim is marked approve, reject, or manual review. Results are shown in a Flask web app.',
    category: 'personal',
    status: 'completed',
    tech: ['Python', 'Flask', 'LangChain', 'Google Gemini', 'PyPDF2'],
    capabilities: [
      'PDF medical document parsing with Gemini AI',
      'Automated key field extraction (billing, diagnosis, procedures)',
      'LangChain-driven claim assessment decision pipeline',
      'Robust validation with error handling',
      'Flask web interface for claim submission and review',
    ],
    diagrams: [
      {
        type: 'mermaid',
        title: 'Claim Processing Pipeline',
        code: `
sequenceDiagram
    participant U as User
    participant F as Flask App
    participant G as Gemini AI
    participant L as LangChain Pipeline
    participant V as Validator

    U->>F: Upload claim PDF
    F->>G: Send PDF for extraction
    G->>G: Extract medical fields diagnosis billing procedures
    G-->>F: Structured extraction result
    F->>L: Route to assessment chain
    L->>L: Apply business rules and coverage logic
    L->>V: Validate extracted fields
    V-->>L: Validation result
    L-->>F: Claim decision and confidence score
    F-->>U: Approval or Rejection or Manual Review
`,
      },
    ],
  },

  // ─── INTERNSHIP: Argus Multi-Agent Platform ─
  {
    id: 'argus',
    name: 'Argus',
    shortDescription:
      'Multi-agent AI platform where a planner agent delegates to specialist agents, with an LLM gateway, guardrails, and full tracing, deployed to production on Azure.',
    fullDescription:
      'Argus is a multi-agent AI platform built around a planner-and-specialist pattern. A planner agent decomposes an incoming request and routes sub-tasks to research, analysis, and writing agents, each restricted to its own tool allowlist. LLM calls go through OpenRouter for provider fallback and per-task model selection, and retrieval runs on NVIDIA NIM-hosted embeddings. Every agent step and tool call is traced in Langfuse, and both the input and output of the pipeline pass through guardrails before anything is logged or returned. The stack is deployed on an Azure VM behind Nginx, with Docker Compose running the API and worker processes.',
    category: 'internship',
    status: 'production',
    experienceId: 'infosys',
    tech: [
      'Python', 'FastAPI', 'Pydantic v2', 'OpenRouter',
      'NVIDIA NIM', 'Langfuse', 'React', 'TypeScript',
      'Docker Compose', 'Nginx', 'Azure VM',
    ],
    capabilities: [
      'Planner agent that decomposes requests and delegates to research, analysis, and writing agents',
      'Per-agent tool allowlists so each agent can only call what its role needs',
      'OpenRouter as an LLM gateway: provider fallback and per-task model selection instead of a single hardcoded vendor',
      'NVIDIA NIM-hosted embedding endpoints for retrieval, decoupled from the generation layer',
      'Input guardrails: prompt-injection pattern checks before a request reaches an agent',
      'Output guardrails: Pydantic schema validation and PII redaction before responses are logged',
      'Full Langfuse tracing on every agent step, tool call, and token cost, down to session-level replay',
      'Streaming React frontend that shows the active agent and its intermediate tool calls',
      'Deployed on an Azure VM: Docker Compose services behind Nginx, custom domain, and TLS',
    ],
    metrics: [
      { label: 'Specialist agents', value: '4' },
      { label: 'LLM providers via gateway', value: '3+' },
      { label: 'Guardrail layers', value: 'Input + Output' },
      { label: 'Deployment', value: 'Azure VM' },
    ],
    diagrams: [
      {
        type: 'mermaid',
        title: 'Multi-Agent Orchestration',
        code: `
flowchart TD
    A([User Request]) --> B["Planner Agent: task decomposition"]
    B --> C{Route Sub-Tasks}
    C --> D["Research Agent web and doc tools"]
    C --> E["Analysis Agent data and reasoning tools"]
    C --> F["Writing Agent drafting and formatting"]
    D --> G["Tool Allowlist Guard"]
    E --> G
    F --> G
    G --> H["Aggregator: merge agent outputs"]
    H --> I{Output Guardrail}
    I -- "Schema invalid or PII" --> J(["Reject or redact response"])
    I -- "Passes validation" --> K(["Final response to user"])
    B -.trace.-> L[(Langfuse)]
    D -.trace.-> L
    E -.trace.-> L
    F -.trace.-> L

    style A fill:#1d4ed8,color:#fff,stroke:none
    style K fill:#dcfce7,color:#14532d,stroke:#15803d
    style J fill:#fee2e2,color:#7f1d1d,stroke:#b91c1c
    style L fill:#fef3c7,color:#78350f,stroke:#b45309
`,
      },
      {
        type: 'mermaid',
        title: 'System Architecture',
        code: `
graph TB
    subgraph Client["Frontend: React and TypeScript"]
        UI1[Streaming Chat Interface]
        UI2[Active Agent and Tool-Call View]
    end

    subgraph API["Backend: FastAPI and Pydantic v2"]
        EP1["POST agent/run"]
        EP2["GET session trace"]
        Guardrails["Input and Output Guardrails"]
        Orchestrator["Agent Orchestrator planner plus specialists"]
    end

    subgraph LLM["Model Layer"]
        GW["OpenRouter Gateway"]
        NIM["NVIDIA NIM Embeddings"]
        Obs[("Langfuse Tracing")]
    end

    subgraph Infra["Infrastructure: Azure VM"]
        Nginx["Nginx Reverse Proxy and TLS"]
        API_C["FastAPI Container"]
        Worker_C["Agent Worker Container"]
    end

    Client --> Nginx --> API
    API --> Guardrails --> Orchestrator
    Orchestrator --> GW
    Orchestrator --> NIM
    Orchestrator --> Obs
    API_C --- Worker_C

    style Client fill:#f8fafc,stroke:#1d4ed8,color:#0f172a
    style API fill:#f8fafc,stroke:#0f766e,color:#0f172a
    style LLM fill:#f8fafc,stroke:#b45309,color:#0f172a
    style Infra fill:#f8fafc,stroke:#15803d,color:#0f172a
`,
      },
      {
        type: 'mermaid',
        title: 'Production Deployment',
        code: `
sequenceDiagram
    participant U as Client Browser
    participant DNS as DNS
    participant N as Nginx Azure VM
    participant API as FastAPI Container
    participant GW as OpenRouter Gateway
    participant OBS as Langfuse

    U->>DNS: Resolve domain
    DNS-->>U: Azure VM public IP
    U->>N: HTTPS request
    N->>API: Reverse-proxied request
    API->>GW: Route LLM call by task and provider fallback
    GW-->>API: Model response
    API->>OBS: Emit trace agent steps tool calls tokens
    API-->>N: Streamed response
    N-->>U: HTTPS response over TLS
`,
      },
    ],
  },

  // ─── INTERNSHIP: Healthcare RAG ─────────────
  {
    id: 'healthcare-rag',
    name: 'Healthcare RAG Chatbot',
    shortDescription:
      'Health Q&A chatbot over a Wikipedia medical dataset, with FAISS retrieval and source verification on every answer.',
    fullDescription:
      'Built during the Infosys Springboard internship. The chatbot retrieves relevant chunks from a Wikipedia health dataset with FAISS, passes them to an LLM as context, and checks that each answer is supported by a source before returning it. If it is not, the user gets a safe fallback message. The React frontend supports multi-turn conversation, and the Flask API endpoints are secured.',
    category: 'internship',
    status: 'completed',
    experienceId: 'infosys',
    tech: ['Python', 'Flask', 'FAISS', 'React', 'Tailwind CSS', 'Hugging Face'],
    capabilities: [
      'Wikipedia health dataset as knowledge base',
      'FAISS dense vector retrieval',
      'Multi-turn conversation support',
      'Source verification per response',
      'Secured API endpoints',
    ],
    diagrams: [
      {
        type: 'mermaid',
        title: 'RAG Chatbot Flow',
        code: `
flowchart LR
    A([User Health Query]) --> B[Flask API]
    B --> C["Query Embedder Hugging Face"]
    C --> D[("FAISS Vector Index Wikipedia Health")]
    D --> E[Top-K Medical Chunks]
    E --> F["LLM with Grounded Context"]
    F --> G{Source Verified?}
    G -- Yes --> H(["Medical Answer with Sources"])
    G -- No --> I([Safe Disclaimer Response])
    H --> J[React Chat UI]
    I --> J

    style A fill:#1d4ed8,color:#fff,stroke:none
    style H fill:#dcfce7,color:#14532d,stroke:#15803d
    style D fill:#fef3c7,color:#78350f,stroke:#b45309
`,
      },
    ],
  },
];

/** Helper: get a project by its slug ID */
export const getProjectById = (id: string): Project | undefined =>
  projects.find((p) => p.id === id);

/** Helper: filter projects by category */
export const getProjectsByCategory = (
  category: Project['category']
): Project[] => projects.filter((p) => p.category === category);
