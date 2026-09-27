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
