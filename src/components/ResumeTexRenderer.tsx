import './ResumeTexRenderer.css';

interface ResumeTexRendererProps {
  zoomLevel: number;
}

export default function ResumeTexRenderer({
  zoomLevel,
}: ResumeTexRendererProps) {
  // Rendered LaTeX Document View (Pure DOM Typeset - Zero Images)
  const zoomScale = zoomLevel / 100;
  const containerStyle = zoomLevel !== 100 ? {
    width: `${zoomLevel}%`,
    maxWidth: `${Math.round(840 * zoomScale)}px`,
    transition: 'all 0.2s ease',
  } : {
    width: '100%',
    maxWidth: '840px',
  };

  return (
    <div className="tex-document-container" style={containerStyle}>
      {/* ── PAGE 1 ────────────────────────────────────────────── */}
      <div className="tex-page-wrapper">
        <span className="tex-page-badge">Page 1 of 2</span>
        <article className="tex-sheet" aria-label="Resume Page 1">
          {/* Header */}
          <header className="tex-header">
            <div className="tex-header__left">
              <h1 className="tex-header__name">Shubhangi Jeve</h1>
              <div className="tex-header__subtitle">B.Tech in Artificial Intelligence &amp; Data Science</div>
              <div className="tex-header__institution">Terna College of Engineering, Dharashiv | CGPA: 8.5</div>
              <div className="tex-header__location">Hyderabad, Telangana</div>
            </div>

            <div className="tex-header__right">
              <a href="tel:+919579122372" className="tex-contact-link">
                <span>+91-9579122372</span>
                <span className="tex-contact-icon" title="Phone">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
              </a>

              <a href="mailto:shubhangijeve@gmail.com" className="tex-contact-link">
                <span>shubhangijeve@gmail.com</span>
                <span className="tex-contact-icon" title="Email">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
              </a>

              <a href="https://shubhangijeve.github.io/My-Portfolio/" target="_blank" rel="noopener noreferrer" className="tex-contact-link">
                <span>shubhangijeve.github.io/My-Portfolio</span>
                <span className="tex-contact-icon" title="Portfolio">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </span>
              </a>

              <a href="https://github.com/ShubhangiJeve" target="_blank" rel="noopener noreferrer" className="tex-contact-link">
                <span>github.com/ShubhangiJeve</span>
                <span className="tex-contact-icon" title="GitHub">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </span>
              </a>

              <a href="https://linkedin.com/in/shubhangi-jeve-97445b235" target="_blank" rel="noopener noreferrer" className="tex-contact-link">
                <span>linkedin.com/in/shubhangi-jeve-97445b235</span>
                <span className="tex-contact-icon" title="LinkedIn">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.55a1.63 1.63 0 0 0-1.63 1.62 1.62 1.62 0 1 0 1.63-1.62z" />
                  </svg>
                </span>
              </a>
            </div>
          </header>

          {/* Section: Career Objective */}
          <section>
            <h2 className="tex-section-title">Career Objective</h2>
            <p className="tex-objective-text">
              AI Systems Engineer specializing in Agentic AI, Advanced RAG, and production LLM orchestration. Proven track record building end-to-end multi-agent architectures, implementing observability and automated evals (RAGAS, DeepEval, Langfuse), debugging failure modes, and optimizing inference cost and latency in enterprise environments.
            </p>
          </section>

          {/* Section: Experience (Part 1 - COGNITBOTZ) */}
          <section>
            <h2 className="tex-section-title">Experience</h2>

            {/* COGNITBOTZ */}
            <div className="tex-exp-block">
              <div className="tex-exp-header-row">
                <span className="tex-exp-role">• AI Engineer Intern</span>
                <span className="tex-exp-date">November 2025 – Present</span>
              </div>
              <div className="tex-exp-sub-row">
                <span className="tex-exp-company">COGNITBOTZ</span>
                <span className="tex-exp-location">Hyderabad, Telangana</span>
              </div>

              {/* Project 1: LegalAID */}
              <div className="tex-project-header" style={{ marginTop: '5px' }}>
                <strong style={{ color: '#0e356b' }}>Project 1: LegalAID</strong> — Enterprise-grade AI Legal Research and Litigation Platform combining Hybrid RAG, semantic search, and automated drafting.
              </div>
              <ul className="tex-bullet-list">
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">Advanced Hybrid RAG &amp; Reranking: </span>
                  Engineered dense-lexical retrieval (pgvector BGE-M3 + Postgres FTS) with FlashRank cross-encoder reranking; eliminated keyword retrieval misses and lifted Recall@5 from 72% to 94%.
                </li>
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">Evals &amp; Guardrail Hardening: </span>
                  Benchmarked generation across 500+ legal queries using RAGAS (faithfulness, context relevance); tuned abstention thresholds to catch retrieval hallucinations, slashing hallucination rates to &lt;1%.
                </li>
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">High-Throughput Ingestion: </span>
                  Automated ETL pipeline parsing 75,000+ court JSON cases over 25 years with parent-child hierarchical chunking, schema normalization, and deduplication.
                </li>
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">Async LLM Gateway (FastAPI): </span>
                  Architected multi-model gateway (OpenRouter + NVIDIA NIM) with semantic prompt-caching and Pydantic v2 validation, cutting median latency by 45% and API costs by 38%.
                </li>
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">Production Containerization: </span>
                  Containerized full stack via Docker Compose with health-check dependency chains, ensuring 99.9% uptime and data persistence.
                </li>
              </ul>

              {/* Project 2: MeetOps */}
              <div className="tex-project-header" style={{ marginTop: '8px' }}>
                <strong style={{ color: '#0e356b' }}>Project 2: MeetOps</strong> — Enterprise AI Meeting Copilot and Project Intelligence Platform integrating Teams via ephemeral bots and agentic workflows.
              </div>
              <ul className="tex-bullet-list">
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">Transcript RAG &amp; Speaker Chunking: </span>
                  Architected semantic RAG with speaker-turn chunking and pgvector embeddings, lifting topical retrieval precision by 35%.
                </li>
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">Agentic Workflows &amp; Tool Reliability: </span>
                  Engineered multi-step tool-calling agents (LangGraph/OpenAI) for Jira and SAP GRC; implemented deterministic fallback schemas and loop guards, boosting task success from 68% to 92%.
                </li>
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">AI Observability &amp; Tracing: </span>
                  Integrated distributed tracing to monitor tool latency, token burn, and step failures, diagnosing context fragmentation during 60+ min meetings.
                </li>
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">Confidence Abstention Gating: </span>
                  Enforced 0.75 cosine similarity guardrail instructing LLMs to abstain on low context, eliminating fabricated technical details.
                </li>
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">Low-Latency Streaming: </span>
                  Deployed multi-tier Redis semantic cache with SSE streaming, reducing perceived generation latency by 60% during live sessions.
                </li>
              </ul>

              {/* Project 3: Granite Buyer Intelligence */}
              <div className="tex-project-header" style={{ marginTop: '8px' }}>
                <strong style={{ color: '#0e356b' }}>Project 3: Granite Buyer Intelligence</strong> — Local-first B2B intelligence and lead generation platform automating buyer discovery, evidence qualification, and M365 outreach.
              </div>
              <ul className="tex-bullet-list">
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">Modular Monolith Architecture: </span>
                  Designed 9-domain lifecycle system (Discovery, Evidence, Intelligence, Email, Jobs) delivered solo from design to production.
                </li>
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">Multi-Tier LLM Failover Gateway: </span>
                  Implemented 3-tier failover (OpenRouter Nemotron-550B → NVIDIA Build → Groq) and TF lexical search, guaranteeing 100% uptime.
                </li>
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">Durable Task Queue: </span>
                  Built crash-resilient PgSQL job queue with 180s leases and heartbeat recovery, handling automated multi-engine web discovery.
                </li>
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">Evidence-First Validation: </span>
                  Enforced SQL check constraints separating verified facts from AI inference, with 0–100 quality scoring and audit tracking.
                </li>
              </ul>
            </div>
          </section>
        </article>
      </div>

      {/* ── PAGE 2 ────────────────────────────────────────────── */}
      <div className="tex-page-wrapper">
        <span className="tex-page-badge">Page 2 of 2</span>
        <article className="tex-sheet" aria-label="Resume Page 2">
          {/* Experience Continued */}
          <section>
            {/* Infosys Springboard */}
            <div className="tex-exp-block">
              <div className="tex-exp-header-row">
                <span className="tex-exp-role">• Artificial Intelligence Intern</span>
                <span className="tex-exp-date">February 2025 – April 2025</span>
              </div>
              <div className="tex-exp-sub-row">
                <span className="tex-exp-company">Infosys Springboard</span>
                <span className="tex-exp-location">Remote</span>
              </div>
              <ul className="tex-bullet-list">
                <li className="tex-bullet-item">
                  Built a Healthcare RAG Chatbot on a Wikipedia dataset using FAISS vector search, Flask backend, and React/Tailwind frontend for grounded clinical Q&amp;A.
                </li>
                <li className="tex-bullet-item">
                  Implemented a real-time query processing pipeline with source verification and an interactive UI supporting multi-turn question answering sessions.
                </li>
              </ul>
            </div>

            {/* Adhyayan IT */}
            <div className="tex-exp-block">
              <div className="tex-exp-header-row">
                <span className="tex-exp-role">• Data Science Intern</span>
                <span className="tex-exp-date">January 2025 – June 2025</span>
              </div>
              <div className="tex-exp-sub-row">
                <span className="tex-exp-company">Adhyayan IT</span>
                <span className="tex-exp-location">Remote</span>
              </div>
              <ul className="tex-bullet-list">
                <li className="tex-bullet-item">
                  Built a Text-to-SQL system using LangChain and LLMs (Gemini, Groq) with RAGAS evaluation achieving 100% context precision and high helpfulness scores.
                </li>
                <li className="tex-bullet-item">
                  Developed an interactive Streamlit UI with secure MySQL connectivity, enabling non-technical users to query databases efficiently.
                </li>
              </ul>
            </div>

            {/* Cyber Police Station */}
            <div className="tex-exp-block">
              <div className="tex-exp-header-row">
                <span className="tex-exp-role">• Data Analyst Intern</span>
                <span className="tex-exp-date">October 2023 – January 2024</span>
              </div>
              <div className="tex-exp-sub-row">
                <span className="tex-exp-company">Cyber Police Station</span>
                <span className="tex-exp-location">Dharashiv, Maharashtra</span>
              </div>
              <ul className="tex-bullet-list">
                <li className="tex-bullet-item">
                  Managed 500+ user credentials for the National Cyber Crime Portal and organized 1,000+ complaints, improving case resolution efficiency by 30%.
                </li>
                <li className="tex-bullet-item">
                  Communicated with victims to provide timely status updates, enhancing overall satisfaction by 15%.
                </li>
              </ul>
            </div>
          </section>

          {/* Section: Projects */}
          <section>
            <h2 className="tex-section-title">Projects</h2>

            {/* Project 1: Argus */}
            <div className="tex-personal-proj-block" style={{ marginBottom: '10px' }}>
              <div className="tex-personal-proj-title" style={{ color: '#0e356b' }}>Project 1: Argus — Multi-Agent AI Platform</div>
              <div className="tex-personal-proj-desc">Autonomous hierarchical multi-agent platform with specialized tool routing, runtime guardrails, and full observability</div>
              <ul className="tex-bullet-list">
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">Hierarchical Agent Routing (LangGraph): </span>
                  Architected supervisor-specialist framework decomposing goals across research, analysis, and writing agents with scoped tool permissions.
                </li>
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">Observability, Tracing &amp; Failure Debugging: </span>
                  Instrumented full-lifecycle Langfuse tracing across every agent hop; diagnosed tool loops and context overflow, reducing step failure rate by 34%.
                </li>
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">Agent Evaluation Test Suite: </span>
                  Benchmarked multi-step planning accuracy and tool-selection precision against golden trajectories, improving task completion from 71% to 89%.
                </li>
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">Dual-Ended Guardrail Pipeline: </span>
                  Enforced input prompt-injection detection, strict tool allowlists, and Pydantic output schema validation with PII scrubbing.
                </li>
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">Decoupled Async Backend &amp; Deployment: </span>
                  Built async FastAPI service with dynamic provider failover; deployed on Azure VM with Docker, Nginx, and TLS.
                </li>
              </ul>
            </div>

            {/* Project 2: LedgerLens-AI */}
            <div className="tex-personal-proj-block" style={{ marginBottom: '10px' }}>
              <div className="tex-personal-proj-title" style={{ color: '#0e356b' }}>Project 2: LedgerLens-AI — Multi-LLM Document Intelligence &amp; Forensic Engine</div>
              <div className="tex-personal-proj-desc">Production-grade multi-model orchestration engine leveraging Databricks Unity Catalog, FastAPI, and OpenRouter for high-throughput financial extraction and contract reconciliation</div>
              <ul className="tex-bullet-list">
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">Multi-Model LLM Routing: </span>
                  Engineered dynamic routing via OpenRouter directing forensic deduction to DeepSeek R1 and entity extraction to GPT-4o, cutting API inference costs by 42%.
                </li>
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">Databricks Lakehouse &amp; Unity Catalog: </span>
                  Architected data pipelines on Databricks Unity Catalog and Delta Lake, enforcing data lineage, audit logging, and RBAC governance across 100,000+ financial documents.
                </li>
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">Structured Output Validation &amp; Caching: </span>
                  Developed Pydantic schema-repair pipelines with PostgreSQL prompt-caching, achieving 99.4% adherence and reducing TTFT by 350ms.
                </li>
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">Chain-of-Thought Forensics: </span>
                  Implemented automated reasoning cross-examining balance sheets against vendor agreements, identifying $1.8M+ in unapplied volume rebates.
                </li>
              </ul>
            </div>

            {/* Project 3: Domain-Adapted LLM Fine-Tuning & Evaluation Engine */}
            <div className="tex-personal-proj-block" style={{ marginBottom: '10px' }}>
              <div className="tex-personal-proj-title" style={{ color: '#0e356b' }}>Project 3: Domain-Adapted LLM Fine-Tuning &amp; Evaluation Engine</div>
              <div className="tex-personal-proj-desc">Parameter-efficient post-training pipeline with QLoRA, automated G-Eval benchmarking, and optimized vLLM serving</div>
              <ul className="tex-bullet-list">
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">QLoRA Fine-Tuning: </span>
                  Fine-tuned open-weights LLMs (Llama-3-8B / Mistral) using Unsloth and Hugging Face TRL on domain instruction datasets, reducing structured output formatting errors by 82%.
                </li>
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">Automated Evals &amp; Benchmarking: </span>
                  Evaluated checkpoints against baseline models using DeepEval/G-Eval (reasoning, syntax adherence), validating comparable accuracy to GPT-4o-mini at 75% lower inference cost.
                </li>
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">Production Inference Optimization: </span>
                  Quantized weights to 4-bit AWQ and served via vLLM with continuous batching and PagedAttention, achieving 3.8x higher throughput.
                </li>
              </ul>
            </div>

            {/* Project 4: Insurance Claim */}
            <div className="tex-personal-proj-block" style={{ marginBottom: '10px' }}>
              <div className="tex-personal-proj-title" style={{ color: '#0e356b' }}>Project 4: Insurance Claim Automation System</div>
              <div className="tex-personal-proj-desc">AI-powered insurance claim processing using Google Gemini AI, LangChain, and Flask</div>
              <ul className="tex-bullet-list">
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">Multimodal Claim Extraction: </span>
                  Developed automated medical claim validation pipeline using Google Gemini Vision and NLP, reducing manual review time by 70%.
                </li>
                <li className="tex-bullet-item">
                  <span className="tex-bullet-label">Decision Engine &amp; Validation: </span>
                  Built Flask web application with LangChain integration for intelligent claim assessment, Pydantic error handling, and confidence-based routing.
                </li>
              </ul>
            </div>
          </section>

          {/* Section: Technical Skills */}
          <section style={{ paddingTop: '2px', paddingBottom: '5px' }}>
            <h2 className="tex-section-title">Technical Skills</h2>
            <div className="tex-skills-container" style={{ gap: '5px' }}>
              <div className="tex-skill-row">
                <span className="tex-skill-label">Agentic AI &amp; LLMs: </span>
                <span>Multi-Agent Systems, LangGraph, LangChain, Tool/Function-Calling, State Graphs, Supervisor-Worker Patterns, Prompt Engineering, Prompt Caching, OpenAI, Claude, DeepSeek R1, Gemini</span>
              </div>
              <div className="tex-skill-row">
                <span className="tex-skill-label">Advanced RAG &amp; Search: </span>
                <span>Hybrid Search (Dense + BM25/FTS), Cross-Encoder Reranking (FlashRank, BGE-Reranker), Parent-Child Chunking, pgvector (PostgreSQL), Weaviate, FAISS, ChromaDB</span>
              </div>
              <div className="tex-skill-row">
                <span className="tex-skill-label">AI Evals &amp; Observability: </span>
                <span>LLM Evals (RAGAS, DeepEval, G-Eval), Observability &amp; Tracing (Langfuse, OpenTelemetry), Failure Mode Analysis, Guardrails (NeMo Guardrails, Pydantic, Abstention Gating)</span>
              </div>
              <div className="tex-skill-row">
                <span className="tex-skill-label">Fine-Tuning &amp; Inference: </span>
                <span>PEFT, LoRA/QLoRA, Unsloth, Hugging Face (Transformers, TRL), Quantization (AWQ/GGUF), vLLM, NVIDIA NIM, Model Routing &amp; Failover</span>
              </div>
              <div className="tex-skill-row">
                <span className="tex-skill-label">Backend, Cloud &amp; MLOps: </span>
                <span>Python, FastAPI, AsyncIO, REST APIs, PostgreSQL, Docker, Azure, Databricks (Unity Catalog, Delta Lake, MLflow), CI/CD, Git</span>
              </div>
            </div>
          </section>

          {/* Section: Education */}
          <section>
            <h2 className="tex-section-title">Education</h2>
            <div className="tex-edu-block">
              <div className="tex-edu-row">
                <span className="tex-edu-title">• Bachelor of Technology in Artificial Intelligence and Data Science</span>
                <span className="tex-edu-dates">2021 – 2025</span>
              </div>
              <div className="tex-edu-subrow">
                <span className="tex-edu-college">Terna Public Charitable Trust's College of Engineering, Dharashiv</span>
                <span className="tex-edu-cgpa">CGPA: 8.5</span>
              </div>
            </div>
          </section>
        </article>
      </div>
    </div>
  );
}
