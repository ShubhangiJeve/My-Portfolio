import subprocess
import os
import fitz
from PIL import Image

html_path = os.path.abspath("resume_source.html")
pdf_path = os.path.abspath("public/resume.pdf")

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Shubhangi Jeve - Resume</title>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
<style>
@page {
  size: A4;
  margin: 0;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Cambria', 'Georgia', 'Times New Roman', serif;
  font-size: 9.2pt;
  line-height: 1.34;
  color: #111111;
  background-color: #ffffff;
  -webkit-font-smoothing: antialiased;
}

.page {
  width: 210mm;
  height: 297mm;
  padding: 10mm 12mm 10mm 12mm;
  position: relative;
  page-break-after: always;
  box-sizing: border-box;
  overflow: hidden;
  background: #ffffff;
}

.page:last-child {
  page-break-after: auto;
}

/* Header */
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 5px;
  padding-bottom: 2px;
}

.header-left {
  flex: 1;
}

.name {
  font-size: 21pt;
  font-weight: 700;
  letter-spacing: 0.2px;
  color: #000000;
  line-height: 1.1;
  margin-bottom: 3px;
}

.subtitle {
  font-size: 9.3pt;
  color: #1a1a1a;
  margin-bottom: 2px;
}

.institution {
  font-size: 9pt;
  color: #333333;
  margin-bottom: 2px;
}

.location {
  font-size: 8.9pt;
  font-style: italic;
  color: #444444;
}

.header-right {
  text-align: right;
  font-size: 8.9pt;
  line-height: 1.45;
}

.contact-item {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  color: #111111;
}

.contact-item a {
  color: #000000;
  text-decoration: none;
}

.contact-item i {
  font-size: 8.5pt;
  width: 13px;
  text-align: center;
  color: #111111;
}

/* Section styling */
.section {
  margin-top: 6px;
  margin-bottom: 3px;
}

.section-title {
  font-size: 10.5pt;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #000000;
  border-bottom: 0.75pt solid #000000;
  padding-bottom: 1.5px;
  margin-bottom: 4px;
}

/* Objective */
.objective-text {
  font-size: 9.2pt;
  line-height: 1.34;
  text-align: justify;
  color: #1a1a1a;
}

/* Experience & Projects entry */
.entry {
  margin-bottom: 4px;
}

.entry-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 9.4pt;
  margin-bottom: 1px;
}

.entry-title {
  font-weight: 700;
  color: #000000;
}

.entry-date {
  font-size: 9.1pt;
  font-weight: 700;
  color: #000000;
  white-space: nowrap;
}

.entry-subheader {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 9.2pt;
  margin-bottom: 3px;
}

.entry-company {
  font-weight: 700;
  color: #000000;
}

.entry-location {
  font-style: italic;
  color: #444444;
  font-size: 8.9pt;
}

.project-lead {
  font-size: 9.2pt;
  margin-top: 2px;
  margin-bottom: 2.5px;
  line-height: 1.30;
  color: #111111;
}

.project-title {
  font-weight: 700;
  color: #0e356b;
}

.project-tagline {
  font-size: 8.8pt;
  font-style: italic;
  color: #333333;
  margin-bottom: 2px;
  display: block;
}

/* Bullet list */
.bullet-list {
  list-style: none;
  padding-left: 12pt;
  margin-bottom: 4px;
}

.bullet-item {
  position: relative;
  font-size: 9.05pt;
  line-height: 1.32;
  margin-bottom: 1.8pt;
  color: #141414;
  text-align: justify;
}

.bullet-item::before {
  content: "--";
  position: absolute;
  left: -12pt;
  color: #333333;
}

.bullet-label {
  font-weight: 700;
  color: #000000;
}

/* Skills */
.skills-container {
  display: flex;
  flex-direction: column;
  gap: 3.5pt;
  font-size: 9.05pt;
  line-height: 1.34;
  margin-top: 3px;
}

.skill-row {
  display: block;
  text-align: justify;
}

.skill-label {
  font-weight: 700;
  color: #000000;
}

/* Education */
.edu-block {
  margin-top: 3px;
}

.edu-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 9.3pt;
  font-weight: 700;
  color: #000000;
}

.edu-subrow {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 9pt;
  color: #222222;
  margin-top: 1px;
}

.edu-cgpa {
  font-weight: 700;
  color: #000000;
}
</style>
</head>
<body>

<!-- PAGE 1 -->
<div class="page">
  <!-- Header -->
  <div class="header">
    <div class="header-left">
      <div class="name">Shubhangi Jeve</div>
      <div class="subtitle">B.Tech in Artificial Intelligence &amp; Data Science</div>
      <div class="institution">Terna College of Engineering, Dharashiv | CGPA: 8.5</div>
      <div class="location">Hyderabad, Telangana</div>
    </div>
    <div class="header-right">
      <div class="contact-item"><a href="tel:+919579122372">+91-9579122372</a> <i class="fa-solid fa-phone"></i></div>
      <div class="contact-item"><a href="mailto:shubhangijeve@gmail.com">shubhangijeve@gmail.com</a> <i class="fa-solid fa-envelope"></i></div>
      <div class="contact-item"><a href="https://shubhangijeve.github.io/My-Portfolio/" target="_blank">shubhangijeve.github.io/My-Portfolio</a> <i class="fa-solid fa-globe"></i></div>
      <div class="contact-item"><a href="https://github.com/ShubhangiJeve" target="_blank">github.com/ShubhangiJeve</a> <i class="fa-brands fa-github"></i></div>
      <div class="contact-item"><a href="https://linkedin.com/in/shubhangi-jeve-97445b235" target="_blank">linkedin.com/in/shubhangi-jeve-97445b235</a> <i class="fa-brands fa-linkedin"></i></div>
    </div>
  </div>

  <!-- Career Objective -->
  <div class="section">
    <div class="section-title">Career Objective</div>
    <p class="objective-text">
      AI Engineer with 1.5+ years of core experience architecting and deploying production-grade AI systems, hybrid RAG pipelines, and multi-agent platforms. Proficient in LLM orchestration, async backend architectures, vector databases, and enterprise AI engineering. Driven to build scalable, high-impact intelligent systems.
    </p>
  </div>

  <!-- Experience -->
  <div class="section">
    <div class="section-title">Experience</div>

    <!-- COGNITBOTZ -->
    <div class="entry">
      <div class="entry-header">
        <span class="entry-title">&#8226; AI Engineer Intern</span>
        <span class="entry-date">November 2025 -- Present</span>
      </div>
      <div class="entry-subheader">
        <span class="entry-company">COGNITBOTZ</span>
        <span class="entry-location">Hyderabad, Telangana</span>
      </div>

      <!-- Project 1: LegalAID -->
      <div class="project-lead">
        <span class="project-title">Project 1: LegalAID</span> --- Enterprise-grade AI Legal Research and Litigation Platform combining Hybrid RAG, semantic search, and automated drafting.
      </div>
      <ul class="bullet-list">
        <li class="bullet-item"><span class="bullet-label">Hybrid RAG Architecture: </span>Engineered dense-lexical retrieval (pgvector BGE-M3 + Postgres FTS) with parent-child chunking, achieving 94% citation precision.</li>
        <li class="bullet-item"><span class="bullet-label">LLM Gateway &amp; Guardrails: </span>Architected multi-model LLM Gateway connected with OpenRouter and NVIDIA NIM with source validation and strict abstention thresholds, driving hallucination rates below 1%.</li>
        <li class="bullet-item"><span class="bullet-label">High-Throughput Ingestion: </span>Automated ETL pipeline parsing 75,000+ court JSON cases over 25 years with schema normalization and deduplication in a single run.</li>
        <li class="bullet-item"><span class="bullet-label">Async Backend API (FastAPI): </span>Developed async REST endpoints with Pydantic v2 validation for sub-4s semantic case search, RAG Q&amp;A, and legal drafting.</li>
        <li class="bullet-item"><span class="bullet-label">Full-Stack UI: </span>Built TypeScript workspace with natural language query search, faceted case explorer, drafting studio, and ingestion dashboard.</li>
        <li class="bullet-item"><span class="bullet-label">Unified Vector DB (pgvector): </span>Leveraged PostgreSQL with pgvector for relational and ANN retrieval, eliminating external vector DB overhead and cutting latency by 45%.</li>
        <li class="bullet-item"><span class="bullet-label">Production Containerization: </span>Containerized full stack via Docker Compose with health-check dependency chains, ensuring 99.9% uptime and data persistence.</li>
      </ul>

      <!-- Project 2: MeetOps -->
      <div class="project-lead" style="margin-top: 4px;">
        <span class="project-title">Project 2: MeetOps</span> --- Enterprise AI Meeting Copilot and Project Intelligence Platform integrating Teams via ephemeral bots and agentic workflows.
      </div>
      <ul class="bullet-list">
        <li class="bullet-item"><span class="bullet-label">Transcript RAG Pipeline: </span>Architected semantic RAG with speaker-turn chunking and pgvector embeddings, lifting topical retrieval precision by 35%.</li>
        <li class="bullet-item"><span class="bullet-label">Confidence Abstention Gating: </span>Implemented 0.75 cosine similarity guardrail instructing LLMs to abstain on low context, eliminating fabricated technical details.</li>
        <li class="bullet-item"><span class="bullet-label">Agentic Tool-Calling: </span>Engineered OpenAI function-calling workflow automating Jira ticket creation, rolling summaries, and live SAP GRC metrics retrieval.</li>
        <li class="bullet-item"><span class="bullet-label">Disposable Bot Infrastructure: </span>Built ephemeral Dockerized Playwright bots with TTL watchdogs, guaranteeing zero state contamination across client meetings.</li>
        <li class="bullet-item"><span class="bullet-label">Low-Latency Streaming: </span>Deployed multi-tier Redis semantic cache with SSE streaming, reducing perceived generation latency by 60% during live sessions.</li>
      </ul>

      <!-- Project 3: Granite Buyer Intelligence -->
      <div class="project-lead" style="margin-top: 4px;">
        <span class="project-title">Project 3: Granite Buyer Intelligence</span> --- Local-first B2B intelligence and lead generation platform automating buyer discovery, evidence qualification, and M365 outreach.
      </div>
      <ul class="bullet-list">
        <li class="bullet-item"><span class="bullet-label">Modular Monolith Architecture: </span>Designed 9-domain lifecycle system (Discovery, Evidence, Intelligence, Email, Jobs) delivered solo from design to production.</li>
        <li class="bullet-item"><span class="bullet-label">Multi-Tier LLM Failover Gateway: </span>Implemented 3-tier failover (OpenRouter Nemotron-550B &rarr; NVIDIA Build &rarr; Groq) and TF lexical search, guaranteeing 100% uptime.</li>
        <li class="bullet-item"><span class="bullet-label">Durable Task Queue: </span>Built crash-resilient PgSQL job queue with 180s leases and heartbeat recovery, handling automated multi-engine web discovery.</li>
        <li class="bullet-item"><span class="bullet-label">Evidence-First Validation: </span>Enforced SQL check constraints separating verified facts from AI inference, with 0--100 quality scoring and audit tracking.</li>
      </ul>
    </div>

    <!-- Infosys Springboard -->
    <div class="entry" style="margin-top: 3px;">
      <div class="entry-header">
        <span class="entry-title">&#8226; Artificial Intelligence Intern</span>
        <span class="entry-date">February 2025 -- April 2025</span>
      </div>
      <div class="entry-subheader">
        <span class="entry-company">Infosys Springboard</span>
        <span class="entry-location">Remote</span>
      </div>
      <ul class="bullet-list">
        <li class="bullet-item">Built a Healthcare RAG Chatbot on a Wikipedia dataset using FAISS vector search, Flask backend, and React/Tailwind frontend for grounded clinical Q&amp;A.</li>
        <li class="bullet-item">Implemented a real-time query processing pipeline with source verification and an interactive UI supporting multi-turn question answering sessions.</li>
      </ul>
    </div>

    <!-- Adhyayan IT -->
    <div class="entry" style="margin-top: 3px;">
      <div class="entry-header">
        <span class="entry-title">&#8226; Data Science Intern</span>
        <span class="entry-date">January 2025 -- June 2025</span>
      </div>
      <div class="entry-subheader">
        <span class="entry-company">Adhyayan IT</span>
        <span class="entry-location">Remote</span>
      </div>
      <ul class="bullet-list">
        <li class="bullet-item">Built a Text-to-SQL system using LangChain and LLMs (Gemini, Groq) with RAGAS evaluation achieving 100% context precision and high helpfulness scores.</li>
        <li class="bullet-item">Developed an interactive Streamlit UI with secure MySQL connectivity, enabling non-technical users to query databases efficiently.</li>
      </ul>
    </div>

    <!-- Cyber Police Station -->
    <div class="entry" style="margin-top: 3px;">
      <div class="entry-header">
        <span class="entry-title">&#8226; Data Analyst Intern</span>
        <span class="entry-date">October 2023 -- January 2024</span>
      </div>
      <div class="entry-subheader">
        <span class="entry-company">Cyber Police Station</span>
        <span class="entry-location">Dharashiv, Maharashtra</span>
      </div>
      <ul class="bullet-list">
        <li class="bullet-item">Managed 500+ user credentials for the National Cyber Crime Portal and organized 1,000+ complaints, improving case resolution efficiency by 30%.</li>
        <li class="bullet-item">Communicated with victims to provide timely status updates, enhancing overall satisfaction by 15%.</li>
      </ul>
    </div>
  </div>
</div>

<!-- PAGE 2 -->
<div class="page">
  <!-- Projects -->
  <div class="section">
    <div class="section-title">Projects</div>

    <!-- Project 1: Argus -->
    <div class="entry" style="margin-bottom: 5px;">
      <div class="project-title" style="font-size: 9.4pt;">Project 1: Argus — Multi-Agent AI Platform</div>
      <span class="project-tagline">Autonomous hierarchical multi-agent platform with specialized tool routing, runtime guardrails, and full observability</span>
      <ul class="bullet-list">
        <li class="bullet-item"><span class="bullet-label">Hierarchical Agent Routing: </span>Architected planner-specialist framework decomposing goals across research, analysis, and writing agents with scoped tool permissions.</li>
        <li class="bullet-item"><span class="bullet-label">Decoupled Async Backend (FastAPI): </span>Built async service routing requests through OpenRouter for dynamic task-based model selection and provider failover.</li>
        <li class="bullet-item"><span class="bullet-label">Dual-Ended Guardrail Pipeline: </span>Enforced input prompt-injection detection, strict tool allowlists, and Pydantic output schema validation with PII scrubbing.</li>
        <li class="bullet-item"><span class="bullet-label">Full Observability with Langfuse: </span>Instrumented end-to-end agent traces tracking latency, tool invocations, and token expenses to evaluate prompt revisions.</li>
        <li class="bullet-item"><span class="bullet-label">Real-Time Streaming UI &amp; Azure Cloud: </span>Created React/TypeScript UI streaming agent step execution; deployed on Azure VM with Docker, Nginx, and TLS.</li>
      </ul>
    </div>

    <!-- Project 2: LedgerLens-AI -->
    <div class="entry" style="margin-bottom: 5px;">
      <div class="project-title" style="font-size: 9.4pt;">Project 2: LedgerLens-AI — Multi-LLM Document Intelligence &amp; Forensic Engine</div>
      <span class="project-tagline">Production-grade multi-model orchestration engine leveraging Databricks Unity Catalog, FastAPI, and OpenRouter for high-throughput financial extraction and contract reconciliation</span>
      <ul class="bullet-list">
        <li class="bullet-item"><span class="bullet-label">Multi-Model LLM Routing: </span>Engineered dynamic routing via OpenRouter directing forensic deduction to DeepSeek R1 and entity extraction to GPT-4o, cutting API inference costs by 42%.</li>
        <li class="bullet-item"><span class="bullet-label">Databricks Lakehouse &amp; Unity Catalog: </span>Architected data pipelines on Databricks Unity Catalog and Delta Lake, enforcing data lineage, audit logging, and RBAC governance across 100,000+ financial documents.</li>
        <li class="bullet-item"><span class="bullet-label">Structured Output Validation &amp; Caching: </span>Developed Pydantic schema-repair pipelines with PostgreSQL prompt-caching, achieving 99.4% adherence and reducing TTFT by 350ms.</li>
        <li class="bullet-item"><span class="bullet-label">Chain-of-Thought Forensics: </span>Implemented automated reasoning cross-examining balance sheets against vendor agreements, identifying $1.8M+ in unapplied volume rebates.</li>
      </ul>
    </div>

    <!-- Project 3: RAG Document QA -->
    <div class="entry" style="margin-bottom: 5px;">
      <div class="project-title" style="font-size: 9.4pt;">Project 3: RAG Document QA System</div>
      <span class="project-tagline">Production-grade AI-powered question answering on PDF and TXT documents using FastAPI and React</span>
      <ul class="bullet-list">
        <li class="bullet-item"><span class="bullet-label">Full-Stack Document QA: </span>Engineered FastAPI and React/TypeScript system with ChromaDB and sentence-transformers for verified Q&amp;A across PDF/TXT files.</li>
        <li class="bullet-item"><span class="bullet-label">Dockerized API Deployment: </span>Built async REST APIs and deployed complete stack via Docker with an interactive dashboard for monitoring ingestion KPIs.</li>
      </ul>
    </div>

    <!-- Project 4: Insurance Claim -->
    <div class="entry" style="margin-bottom: 5px;">
      <div class="project-title" style="font-size: 9.4pt;">Project 4: Insurance Claim Automation System</div>
      <span class="project-tagline">AI-powered insurance claim processing using Google Gemini AI, LangChain, and Flask</span>
      <ul class="bullet-list">
        <li class="bullet-item"><span class="bullet-label">Gemini-Powered Claim Extraction: </span>Developed automated medical claim validation pipeline using Google Gemini AI and NLP, reducing manual review time by 70%.</li>
        <li class="bullet-item"><span class="bullet-label">LangChain Decision Engine: </span>Built Flask web application with LangChain integration for intelligent claim assessment, error handling, and data validation.</li>
      </ul>
    </div>
  </div>

  <!-- Technical Skills -->
  <div class="section" style="margin-top: 6px;">
    <div class="section-title">Technical Skills</div>
    <div class="skills-container">
      <div class="skill-row">
        <span class="skill-label">AI / LLMs: </span>Large Language Models (OpenAI, DeepSeek R1, Claude, Azure OpenAI, Llama, Gemini), Fine-Tuning &amp; Integration, LangChain, LangGraph, AI Orchestration, Multi-Agent Architectures, Prompt Engineering, Prompt-Caching &amp; Registry
      </div>
      <div class="skill-row">
        <span class="skill-label">RAG &amp; Search: </span>Retrieval-Augmented Generation (RAG), Semantic Search, Azure AI Search, Weaviate, FAISS, pgvector (Azure PostgreSQL), ChromaDB
      </div>
      <div class="skill-row">
        <span class="skill-label">Backend &amp; APIs: </span>Python, FastAPI, Flask, REST APIs &amp; Microservices for AI Applications, Pydantic, Structured Outputs, PostgreSQL, PgSQL, Async Programming
      </div>
      <div class="skill-row">
        <span class="skill-label">MLOps &amp; Cloud: </span>Databricks (Unity Catalog, Delta Lake, PySpark, MLflow), MLOps (Model Deployment, Monitoring, Evaluation &amp; Quality Tuning), Containerization (Docker, Kubernetes), Azure Cloud Platform, CI/CD, Git, GitLab
      </div>
    </div>
  </div>

  <!-- Education -->
  <div class="section" style="margin-top: 7px;">
    <div class="section-title">Education</div>
    <div class="edu-block">
      <div class="edu-row">
        <span>&#8226; Bachelor of Technology in Artificial Intelligence and Data Science</span>
        <span>2021 -- 2025</span>
      </div>
      <div class="edu-subrow">
        <span>Terna Public Charitable Trust's College of Engineering, Dharashiv</span>
        <span class="edu-cgpa">CGPA: 8.5</span>
      </div>
    </div>
  </div>
</div>

</body>
</html>
"""

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"HTML written to {html_path}")

# Run Edge headless to print to PDF
edge_cmd = [
    r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe",
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_path}",
    f"file:///{html_path.replace(os.sep, '/')}"
]

print("Generating PDF with Edge...")
subprocess.run(edge_cmd, check=True)
print(f"PDF generated at {pdf_path}")

# Verify PDF page count with PyMuPDF
doc = fitz.open(pdf_path)
print(f"Total pages generated: {len(doc)}")

# Render each page to 250 DPI PNG and WebP
for idx, page in enumerate(doc):
    pix = page.get_pixmap(dpi=250)
    png_file = f"public/resume-page-{idx+1}.png"
    webp_file = f"public/resume-page-{idx+1}.webp"
    pix.save(png_file)
    print(f"Saved {png_file}")
    
    # Also save as WebP with PIL
    img = Image.open(png_file)
    img.save(webp_file, "WEBP", quality=95)
    print(f"Saved {webp_file}")

print("All resume assets updated successfully!")
