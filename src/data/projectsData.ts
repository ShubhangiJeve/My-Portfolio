// ─────────────────────────────────────────────
//  Projects Data — All projects with full detail
//  and Mermaid.js architecture diagrams
// ─────────────────────────────────────────────

import type { Project } from '../types';

export const projects: Project[] = [
  // ─── ENTERPRISE: LegalAID ───────────────────
  {
    id: 'legalaid',
    name: 'LegalAID',
    shortDescription:
      'Enterprise AI-powered Legal Research & Litigation Assistance Platform for Indian court case data.',
    fullDescription:
      'LegalAID is a production-grade intelligent legal research platform designed to handle massive Indian court case corpora. It combines Retrieval-Augmented Generation (RAG), hybrid semantic search, LLM-driven legal document drafting, and a modern full-stack interface into a single deployable system capable of processing 20,000–75,000 cases per yearly dataset with sub-4-second retrieval latency.',
    category: 'enterprise',
    status: 'production',
    experienceId: 'cognitbotz',
    tech: [
      'Python', 'FastAPI', 'SQLAlchemy 2.0', 'Pydantic v2',
      'Next.js 14', 'TypeScript', 'PostgreSQL', 'pgvector',
      'LangChain', 'Groq API', 'Docker', 'BAAI/bge-m3',
    ],
    capabilities: [
      'Multi-stage hybrid RAG pipeline (dense + lexical)',
      'Parent-child chunk retrieval with entity-aware strategies',
      'Strict hallucination guardrails with abstention policy',
      'AI legal document drafting (notices, memos, case briefs)',
      'Side-by-side litigation case comparison',
      'Admin ingestion pipeline console',
      'Sub-4-second search on full 25-year corpus',
    ],
    metrics: [
      { label: 'Cases Processed',   value: '75K+' },
      { label: 'Search Latency',    value: '<4s' },
      { label: 'Years of Data',     value: '25+' },
      { label: 'Fields Normalized', value: '30+' },
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
    H -- "Below 0.75" --> I(["Abstention — Insufficient Evidence"])
    H -- "Above threshold" --> J[Context Builder]
    J --> K["Groq LLM llama-3.3-70b"]
    K --> L["Response Validator and Citation Verifier"]
    L --> M(["Grounded Legal Answer with Source Citations"])

    style A fill:#6366f1,color:#fff,stroke:none
    style M fill:#22d3ee,color:#0a0f1e,stroke:none
    style I fill:#ef4444,color:#fff,stroke:none
    style K fill:#1e1b4b,color:#a5b4fc,stroke:#6366f1
`,
      },
      {
        type: 'mermaid',
        title: 'System Architecture',
        code: `
graph TB
    subgraph Client["Frontend — Next.js 14 and TypeScript"]
        UI1[Natural Language Search]
        UI2[Faceted Case Explorer]
        UI3[Legal Drafting Workspace]
        UI4[Case Comparison View]
        UI5[Admin Console]
    end

    subgraph API["Backend — FastAPI and SQLAlchemy 2.0"]
        EP1["POST search/rag"]
        EP2["GET cases by ID"]
        EP3["POST draft document"]
        EP4["POST compare cases"]
        EP5["GET dashboard analytics"]
        Validator["Pydantic v2 Validation"]
        LLMService["Provider-Abstracted LLM Service"]
    end

    subgraph Data["Data Layer — PostgreSQL 16 with pgvector"]
        DB[("PostgreSQL Structured and Vector")]
        VEC[("pgvector ANN Index bge-m3 embeddings")]
        FTS[("Full-Text Search tsvector")]
    end

    subgraph Infra["Infrastructure — Docker Compose"]
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

    style Client fill:#0f172a,stroke:#6366f1,color:#e2e8f0
    style API fill:#0f172a,stroke:#22d3ee,color:#e2e8f0
    style Data fill:#0f172a,stroke:#f59e0b,color:#e2e8f0
    style Infra fill:#0f172a,stroke:#10b981,color:#e2e8f0
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
    Note over E,DB: Single resumable run — no data loss on interruption
`,
      },
    ],
  },

  // ─── ENTERPRISE: MeetOps ────────────────────
  {
    id: 'meetops',
    name: 'MeetOps',
    shortDescription:
      'AI-powered Meeting Copilot & Project Intelligence Platform with agentic LLM integration for Microsoft Teams.',
    fullDescription:
      'MeetOps is an enterprise-grade AI meeting intelligence platform that joins Microsoft Teams meetings via ephemeral Dockerized Playwright bots, transcribes and understands meeting context in real time, and exposes an agentic copilot capable of creating Jira tickets, retrieving SAP GRC metrics, and synthesizing meeting transcripts into structured project intelligence — all with sub-second streaming responses.',
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
      'Confidence-gated abstention guardrails',
      'Multi-tier Redis caching for low-latency responses',
      'SSE streaming to React frontend during live meetings',
      'Disposable Workspace pattern — zero state contamination',
    ],
    metrics: [
      { label: 'Cache Hit Reduction',  value: '~60%' },
      { label: 'Confidence Threshold', value: '0.75' },
      { label: 'Bot Spin-up Time',     value: '<3s' },
      { label: 'Streaming Latency',    value: '<500ms TTFT' },
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
    E -- No --> F(["Abstain — Insufficient meeting context"])
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

    style A fill:#6366f1,color:#fff,stroke:none
    style R fill:#22d3ee,color:#0a0f1e,stroke:none
    style F fill:#ef4444,color:#fff,stroke:none
    style G fill:#1e1b4b,color:#a5b4fc,stroke:#6366f1
`,
      },
    ],
  },

  // ─── PERSONAL: RAG Document QA ──────────────
  {
    id: 'rag-doc-qa',
    name: 'RAG Document QA System',
    shortDescription:
      'Production-grade AI question answering over PDF and TXT documents with full-stack deployment.',
    fullDescription:
      'A complete end-to-end Retrieval-Augmented Generation system built for document-level Q&A. The system supports multi-document ingestion, semantic chunking, dense embedding with sentence-transformers, ChromaDB vector storage, and a FastAPI backend with an interactive React dashboard for monitoring ingestion KPIs and retrieval quality.',
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

    style A fill:#6366f1,color:#fff,stroke:none
    style K fill:#22d3ee,color:#0a0f1e,stroke:none
    style E fill:#f59e0b,color:#0a0f1e,stroke:none
`,
      },
    ],
  },

  // ─── PERSONAL: Insurance Claim ──────────────
  {
    id: 'insurance-claim',
    name: 'Insurance Claim Automation',
    shortDescription:
      'AI-powered insurance claim processing with Google Gemini AI, LangChain, and automated validation pipelines.',
    fullDescription:
      'An intelligent insurance claim automation system that processes PDF medical documents using Google Gemini AI for vision and text extraction, routes claims through LangChain-based decision pipelines, and surfaces results via a Flask web application. The system significantly reduces manual review time by automating document extraction, field validation, and claim assessment logic.',
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

  // ─── INTERNSHIP: Healthcare RAG ─────────────
  {
    id: 'healthcare-rag',
    name: 'Healthcare RAG Chatbot',
    shortDescription:
      'Medically grounded RAG chatbot built on Wikipedia health dataset with FAISS vector search.',
    fullDescription:
      'A healthcare-focused RAG chatbot developed during the Infosys Springboard internship. The system retrieves medically relevant chunks from a curated Wikipedia dataset via FAISS vector search, passes them as grounded context to an LLM, and exposes multi-turn conversation via a React frontend. All API endpoints are secured and responses are source-verified to prevent hallucinated medical information.',
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

    style A fill:#6366f1,color:#fff,stroke:none
    style H fill:#22d3ee,color:#0a0f1e,stroke:none
    style D fill:#f59e0b,color:#0a0f1e,stroke:none
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
