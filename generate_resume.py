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
@import url('https://fonts.cdnfonts.com/css/computer-modern');

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
  font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 9.1pt;
  line-height: 1.32;
  color: #111111;
  background-color: #ffffff;
  -webkit-font-smoothing: antialiased;
}

.page {
  width: 210mm;
  height: 297mm;
  padding: 10mm 13mm 10mm 13mm;
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
  margin-bottom: 6px;
  padding-bottom: 1px;
}

.header-left {
  flex: 1;
}

.name {
  font-size: 19pt;
  font-weight: 700;
  letter-spacing: 0.3px;
  color: #000000;
  margin-bottom: 2px;
}

.subtitle {
  font-size: 9.2pt;
  color: #222222;
  margin-bottom: 1.5px;
}

.institution {
  font-size: 8.8pt;
  color: #333333;
  margin-bottom: 1.5px;
}

.location {
  font-size: 8.8pt;
  color: #444444;
}

.header-right {
  text-align: right;
  font-size: 8.8pt;
  line-height: 1.45;
}

.contact-item {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  color: #222222;
}

.contact-item a {
  color: #111111;
  text-decoration: none;
}

.contact-item i {
  font-size: 8.5pt;
  width: 12px;
  text-align: center;
  color: #222222;
}

/* Section styling */
.section {
  margin-top: 5px;
  margin-bottom: 3px;
}

.section-title {
  font-size: 10.3pt;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #000000;
  border-bottom: 0.75pt solid #222222;
  padding-bottom: 1.5px;
  margin-bottom: 3.5px;
}

/* Objective */
.objective-text {
  font-size: 9.05pt;
  line-height: 1.30;
  text-align: justify;
  color: #1a1a1a;
}

/* Experience & Projects entry */
.entry {
  margin-bottom: 4.5px;
}

.entry-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 9.25pt;
  margin-bottom: 1px;
}

.entry-title {
  font-weight: 700;
  color: #000000;
}

.entry-title::before {
  content: "• ";
  font-weight: 700;
}

.entry-date {
  font-size: 9pt;
  font-weight: 600;
  color: #222222;
  white-space: nowrap;
}

.entry-subheader {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 9.1pt;
  margin-bottom: 2px;
}

.entry-company {
  font-weight: 600;
  color: #111111;
}

.entry-location {
  font-style: italic;
  color: #444444;
  font-size: 8.8pt;
}

.project-lead {
  font-size: 9.05pt;
  margin-bottom: 2.5px;
  line-height: 1.28;
  color: #111111;
  padding-left: 10px;
}

.project-lead strong {
  font-weight: 700;
}

/* Bullets */
.bullet-list {
  list-style: none;
  padding-left: 10px;
}

.bullet-item {
  position: relative;
  padding-left: 11px;
  margin-bottom: 2.2px;
  font-size: 8.85pt;
  line-height: 1.26;
  text-align: justify;
  color: #1c1c1c;
}

.bullet-item::before {
  content: "–";
  position: absolute;
  left: 0;
  top: 0;
  color: #222222;
}

.bullet-item strong {
  font-weight: 700;
  color: #000000;
}

/* Skills list */
.skills-group {
  margin-bottom: 2px;
  font-size: 8.85pt;
  line-height: 1.27;
}

.skills-group strong {
  font-weight: 700;
  color: #000000;
}

/* Education entry */
.edu-entry {
  margin-top: 2.5px;
}
.edu-row-1 {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 9.25pt;
  margin-bottom: 1.5px;
}
.edu-title {
  font-weight: 700;
  color: #000000;
}
.edu-title::before {
  content: "• ";
  font-weight: 700;
}
.edu-date {
  font-size: 9pt;
  font-weight: 600;
  color: #222222;
  white-space: nowrap;
}
.edu-row-2 {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 8.9pt;
  color: #333333;
  padding-left: 10px;
}
.edu-school {
  color: #333333;
}
.edu-cgpa {
  font-weight: 600;
  color: #222222;
}
</style>
</head>
<body>

<!-- ================= PAGE 1 ================= -->
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
      <div class="contact-item">
        <a href="tel:+919579122372">+91-9579122372</a>
        <i class="fa-solid fa-phone"></i>
      </div>
      <div class="contact-item">
        <a href="mailto:shubhangijeve@gmail.com">shubhangijeve@gmail.com</a>
        <i class="fa-solid fa-envelope"></i>
      </div>
      <div class="contact-item">
        <a href="https://github.com/ShubhangiJeve" target="_blank">github.com/ShubhangiJeve</a>
        <i class="fa-brands fa-github"></i>
      </div>
      <div class="contact-item">
        <a href="https://linkedin.com/in/shubhangi-jeve-97445b235" target="_blank">linkedin.com/in/shubhangi-jeve-97445b235</a>
        <i class="fa-brands fa-linkedin"></i>
      </div>
    </div>
  </div>

  <!-- Career Objective -->
  <div class="section">
    <div class="section-title">Career Objective</div>
    <div class="objective-text">
      AI Engineer with hands-on production experience building end-to-end LLM-powered systems, RAG pipelines, and full-stack AI applications. Proficient in Python, FastAPI, vector databases, and LLM integration using Groq, Gemini, and Hugging Face. Seeking an AI Engineer role to architect and deploy scalable, enterprise-grade intelligent systems.
    </div>
  </div>

  <!-- Experience -->
  <div class="section">
    <div class="section-title">Experience</div>
    
    <div class="entry">
      <div class="entry-header">
        <span class="entry-title">AI Engineer Intern</span>
        <span class="entry-date">November 2025 – Present</span>
      </div>
      <div class="entry-subheader">
        <span class="entry-company">COGNITBOTZ</span>
        <span class="entry-location">Hyderabad, Telangana</span>
      </div>

      <div class="project-lead">
        <strong>– Project: LegalAID</strong> — Enterprise-grade, AI-powered Legal Research and Litigation Assistance Platform for Indian court case data, combining Retrieval-Augmented Generation (RAG), semantic search, and LLM-driven drafting into a production-ready system.
      </div>

      <ul class="bullet-list">
        <li class="bullet-item">
          <strong>RAG Pipeline Architecture:</strong> Designed and implemented a multi-stage hybrid retrieval pipeline combining dense vector search (pgvector with BAAI/bge-m3 embeddings) and PostgreSQL full-text search for lexical recall. Applied parent-child chunk retrieval with entity-aware chunking strategies tailored per legal document type including case summaries, hearing history, orders, and procedural timelines to maximize citation-grounded answer quality.
        </li>
        <li class="bullet-item">
          <strong>LLM Integration and Hallucination Control:</strong> Integrated Groq-hosted LLMs through a provider-abstracted service layer supporting model swapping at configuration time. Enforced a strict abstention policy where the system returns “Insufficient evidence” when retrieval confidence falls below a defined threshold. Validated every generated answer against cited source chunks to minimize hallucination in legal responses.
        </li>
        <li class="bullet-item">
          <strong>Data Ingestion and Normalization Engine:</strong> Built a robust ingestion pipeline that parses yearly Indian court JSON dumps containing 20,000 to 75,000 cases spanning 25 years. The pipeline normalizes 30+ canonical fields including parties, acts, bench type, coram, and hearing history, deduplicates records, generates semantic embeddings, and writes structured data with vector indexes in a single resumable run.
        </li>
        <li class="bullet-item">
          <strong>Backend API Development (FastAPI and SQLAlchemy 2.0):</strong> Developed a fully asynchronous REST API with complete Pydantic v2 schema validation, exposing endpoints for case search, RAG-based question answering, AI-assisted legal document drafting (notices, replies, case briefs, legal memos), litigation comparison, and a dashboard analytics module.
        </li>
        <li class="bullet-item">
          <strong>Frontend Development (Next.js 14 and TypeScript):</strong> Built the complete frontend in Next.js 14 with TypeScript, covering a natural-language search workspace, faceted case explorer, structured case detail pages with hearing timelines, a legal drafting workspace, side-by-side case comparison view, and an admin console for ingestion pipeline management.
        </li>
        <li class="bullet-item">
          <strong>Vector Database and Hybrid Search:</strong> Configured PostgreSQL with pgvector as the unified store for both structured metadata queries and approximate nearest-neighbor (ANN) vector retrieval, achieving sub-4-second search latency on the full case corpus while eliminating the overhead of a separate vector database.
        </li>
        <li class="bullet-item">
          <strong>Containerized Deployment with Docker:</strong> Packaged the entire system using Docker and Docker Compose, with the FastAPI backend running in a lightweight Python 3.11 image and the vector-enabled database on PostgreSQL 16 with pgvector. Implemented health-check dependency chains ensuring correct startup order and persistent named volumes for data durability.
        </li>
      </ul>
    </div>
  </div>
</div>

<!-- ================= PAGE 2 ================= -->
<div class="page">
  <!-- Continuation of Experience -->
  <div class="entry" style="margin-top: 1px;">
    <div class="project-lead" style="padding-left: 0; margin-bottom: 2.5px;">
      <strong>– Project: MeetOps (May 2026 – Present)</strong> — Enterprise-grade AI-powered Meeting Copilot and Project Intelligence Platform integrating Microsoft Teams via ephemeral Dockerized Playwright bots, a RAG-driven knowledge engine, and an agentic LLM layer that transforms live meeting context into structured, actionable project intelligence.
    </div>

    <ul class="bullet-list" style="padding-left: 0;">
      <li class="bullet-item">
        <strong>RAG Pipeline and Vector Intelligence:</strong> Designed a semantic RAG pipeline over meeting transcripts, BRDs, and project artifacts using OpenAI embeddings stored in pgvector. Applied speaker-turn and topical-boundary chunking (over fixed character splits) to preserve semantic coherence, significantly improving top-K retrieval precision for time-sensitive project queries.
      </li>
      <li class="bullet-item">
        <strong>Hallucination Control and Confidence Gating:</strong> Enforced a strict abstention guardrail where the LLM is instructed to respond “Insufficient meeting context” when cosine similarity of retrieved chunks falls below 0.75, preventing fabricated technical details in high-stakes project conversations.
      </li>
      <li class="bullet-item">
        <strong>Agentic Tool-Calling and LLM Orchestration:</strong> Implemented an agentic workflow using OpenAI function-calling to trigger structured actions mid-conversation, including Jira ticket creation, rolling meeting summaries, and live SAP GRC metrics retrieval, transforming the copilot from reactive Q&A into an autonomous project action layer.
      </li>
      <li class="bullet-item">
        <strong>Ephemeral Bot Orchestration (Docker + Playwright):</strong> Engineered a Disposable Workspace bot pattern where per-meeting Playwright instances are dynamically provisioned and reaped via Docker with TTL watchdogs and health checks, ensuring zero state contamination across client sessions and efficient compute utilization.
      </li>
      <li class="bullet-item">
        <strong>Low-Latency Streaming and Caching:</strong> Implemented a multi-tier Redis caching layer that short-circuits the full embedding and LLM generation cycle on repeated or semantically identical queries, and streamed LLM output directly to the React frontend via Server-Sent Events (SSE) to minimize perceived latency during live meetings.
      </li>
    </ul>
  </div>

  <div class="entry" style="margin-top: 3.5px;">
    <div class="entry-header">
      <span class="entry-title">Artificial Intelligence Intern</span>
      <span class="entry-date">February 2025 – April 2025</span>
    </div>
    <div class="entry-subheader">
      <span class="entry-company">Infosys Springboard</span>
      <span class="entry-location">Remote</span>
    </div>
    <ul class="bullet-list" style="padding-left: 0;">
      <li class="bullet-item">
        Built a Healthcare RAG Chatbot on a Wikipedia dataset using FAISS vector search, a Flask backend, and a React with Tailwind CSS frontend, with secure API endpoints designed for medically grounded responses.
      </li>
      <li class="bullet-item">
        Implemented a real-time query processing pipeline with source verification and an interactive UI supporting multi-turn question answering sessions.
      </li>
    </ul>
  </div>

  <div class="entry" style="margin-top: 3.5px;">
    <div class="entry-header">
      <span class="entry-title">Data Science Intern</span>
      <span class="entry-date">January 2025 – June 2025</span>
    </div>
    <div class="entry-subheader">
      <span class="entry-company">Adhyayan IT</span>
      <span class="entry-location">Remote</span>
    </div>
    <ul class="bullet-list" style="padding-left: 0;">
      <li class="bullet-item">
        Built a Text-to-SQL application using LangChain and LLMs (Google Gemini, Groq) that converts natural language queries to executable SQL, with RAGAS evaluation achieving 100% context precision and high helpfulness scores.
      </li>
      <li class="bullet-item">
        Developed an interactive Streamlit UI with secure MySQL connectivity, enabling non-technical users to query databases efficiently with reliable, context-aware responses.
      </li>
    </ul>
  </div>

  <div class="entry" style="margin-top: 3.5px;">
    <div class="entry-header">
      <span class="entry-title">Data Analyst Intern</span>
      <span class="entry-date">October 2023 – January 2024</span>
    </div>
    <div class="entry-subheader">
      <span class="entry-company">Cyber Police Station</span>
      <span class="entry-location">Dharashiv, Maharashtra</span>
    </div>
    <ul class="bullet-list" style="padding-left: 0;">
      <li class="bullet-item">
        Managed 500+ user credentials for the National Cyber Crime Reporting Portal and organized 1,000+ complaint records, improving case resolution efficiency by 30% and accelerating case progression by 20%.
      </li>
      <li class="bullet-item">
        Communicated with victims to provide timely status updates, enhancing overall satisfaction by 15%.
      </li>
    </ul>
  </div>

  <!-- Personal Projects -->
  <div class="section" style="margin-top: 4.5px;">
    <div class="section-title">Personal Projects</div>

    <div class="entry" style="margin-bottom: 3.5px;">
      <div class="entry-header">
        <span class="entry-title">RAG Document QA System</span>
      </div>
      <div style="font-style: italic; font-size: 8.8pt; color: #333333; margin-bottom: 1.5px; padding-left: 10px;">
        Production-grade AI-powered question answering on PDF and TXT documents using FastAPI and React
      </div>
      <ul class="bullet-list" style="padding-left: 0;">
        <li class="bullet-item">
          Engineered a full-stack RAG system with a FastAPI backend and a React (TypeScript, Tailwind CSS) frontend, integrating document chunking, sentence-transformers embeddings, and ChromaDB vector search with source verification for accurate and traceable answers.
        </li>
        <li class="bullet-item">
          Built asynchronous RESTful APIs and deployed the complete stack using Docker, with an interactive dashboard for monitoring ingestion KPIs and retrieval quality metrics in real time.
        </li>
      </ul>
    </div>

    <div class="entry" style="margin-bottom: 3.5px;">
      <div class="entry-header">
        <span class="entry-title">Insurance Claim Automation System</span>
      </div>
      <div style="font-style: italic; font-size: 8.8pt; color: #333333; margin-bottom: 1.5px; padding-left: 10px;">
        AI-powered insurance claim processing using Google Gemini AI, LangChain, and Flask
      </div>
      <ul class="bullet-list" style="padding-left: 0;">
        <li class="bullet-item">
          Developed an AI-powered insurance claim automation system using Google Gemini AI to process and validate medical claims from PDF documents, extracting key medical and billing information using natural language processing.
        </li>
        <li class="bullet-item">
          Built a Flask web application with LangChain integration for intelligent claim assessment and decision-making, with robust error handling and data validation pipelines to ensure accurate processing and reduce manual review time.
        </li>
      </ul>
    </div>
  </div>

  <!-- Technical Skills (Moved after Personal Projects) -->
  <div class="section" style="margin-top: 4.5px;">
    <div class="section-title">Technical Skills</div>
    <div class="skills-group">
      <strong>Languages &amp; Frameworks:</strong> Python, SQL, FastAPI, Flask, Next.js 14 (TypeScript), Streamlit
    </div>
    <div class="skills-group">
      <strong>AI and Machine Learning:</strong> Regression, Classification, Clustering, Feature Engineering, ANN, CNN, Fine-tuning, Prompt Engineering
    </div>
    <div class="skills-group">
      <strong>Generative AI and LLMs:</strong> Retrieval-Augmented Generation (RAG), LangChain, LangGraph, Groq API, Google Gemini, Ollama, Open-source LLMs
    </div>
    <div class="skills-group">
      <strong>Embeddings and Vector Search:</strong> sentence-transformers (BGE-M3, multilingual-e5), FAISS, ChromaDB, pgvector, Hybrid Semantic and Lexical Search
    </div>
    <div class="skills-group">
      <strong>Libraries:</strong> NumPy, Pandas, Scikit-learn, TensorFlow/Keras, PyTorch, NLTK, spaCy, Hugging Face Transformers, Pydantic v2, SQLAlchemy 2.0
    </div>
    <div class="skills-group">
      <strong>Databases:</strong> PostgreSQL with pgvector, MySQL, ChromaDB, FAISS Vector Store, SQLite
    </div>
    <div class="skills-group">
      <strong>DevOps and Tools:</strong> Docker, Docker Compose, Git, GitHub, VS Code, Jupyter Notebook, N8N, Observability Tools
    </div>
  </div>

  <!-- Education (Moved to the very end) -->
  <div class="section" style="margin-top: 4.5px;">
    <div class="section-title">Education</div>
    <div class="edu-entry">
      <div class="edu-row-1">
        <span class="edu-title">Bachelor of Technology in Artificial Intelligence and Data Science</span>
        <span class="edu-date">2021 – 2025</span>
      </div>
      <div class="edu-row-2">
        <span class="edu-school">Terna Public Charitable Trust’s College of Engineering, Dharashiv</span>
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
