// ─────────────────────────────────────────────
//  Portfolio Data: single source of truth
//  All personal info, education, experience
// ─────────────────────────────────────────────

import type { PortfolioData } from '../types';
import profileImg from '../assets/profile.jpg';
import { skillCategories } from './skillsData';
import { projects } from './projectsData';

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: 'Shubhangi Jeve',
    firstName: 'Shubhangi',
    lastName: 'Jeve',
    role: 'AI & Generative AI Engineer',
    tagline: 'Architecting enterprise RAG systems, agentic LLM workflows, and resilient backends for production AI applications.',
    phone: '+91-9579122372',
    email: 'shubhangijeve@gmail.com',
    github: 'https://github.com/ShubhangiJeve',
    linkedin: 'https://linkedin.com/in/shubhangi-jeve-97445b235',
    location: 'Hyderabad, India',
    avatarUrl: profileImg,
    objective:
      'At COGNITBOTZ, I drive the core AI architecture for high-stakes production applications — including LegalAID (a high-precision legal intelligence engine fusing dense + lexical search across 25+ years of court judgments with strict hallucination guardrails) and MeetOps (an autonomous Teams copilot executing real-time speech indexing and live tool orchestration). I own the entire AI engineering lifecycle: document ingestion, vector retrieval, model evals, and high-concurrency async APIs.',
  },

  education: [
    {
      degree: 'Bachelor of Technology in Artificial Intelligence and Data Science',
      institution: "Terna Public Charitable Trust's College of Engineering, Dharashiv",
      period: '2021 – 2025',
      score: 'CGPA: 8.5',
    },
  ],

  experience: [
    {
      id: 'cognitbotz',
      role: 'AI Engineer Intern',
      company: 'COGNITBOTZ',
      companyUrl: undefined,
      location: 'Hyderabad, Telangana',
      period: 'January 2026 – Present',
      startDate: '2026-01',
      endDate: 'Present',
      type: 'internship',
      highlight: 'Owned the AI architecture for two enterprise platforms, from design through deployment.',
      projects: [
        {
          name: 'LegalAID',
          description:
            'Legal research and litigation assistance platform for Indian court judgments, combining hybrid retrieval, grounded Q&A, and LLM-assisted drafting.',
          points: [
            'Designed a multi-stage hybrid retrieval pipeline combining dense vector search (pgvector + BAAI/bge-m3) and PostgreSQL full-text search with reciprocal rank fusion.',
            'Integrated Groq-hosted LLMs through a provider-abstracted service layer; enforced a strict abstention policy for hallucination control in legal contexts.',
            'Built a resumable ingestion pipeline for yearly Indian court JSON dumps (20,000 to 75,000 cases per year), normalizing 30+ canonical fields, deduplicating records, and generating vector indexes.',
            'Developed a fully async FastAPI REST API with Pydantic v2 validation, exposing endpoints for case search, RAG Q&A, AI legal drafting, litigation comparison, and analytics.',
            'Built the frontend in Next.js 14 and TypeScript: natural-language search, faceted explorer, drafting workspace, side-by-side case comparison, and an admin console.',
            'Containerized the entire system with Docker Compose, achieving sub-4-second search latency on the full 25-year corpus.',
          ],
        },
        {
          name: 'MeetOps',
          description:
            'Meeting copilot for Microsoft Teams built on ephemeral Playwright bots, retrieval over meeting and project documents, and an LLM layer with tool calling.',
          points: [
            'Designed a semantic RAG pipeline over meeting transcripts, BRDs, and project artifacts using OpenAI embeddings in pgvector with speaker-turn and topical-boundary chunking.',
            'Implemented agentic function-calling to trigger mid-conversation actions: Jira ticket creation, rolling meeting summaries, and live SAP GRC metrics retrieval.',
            'Ran each meeting bot in its own Docker container with a TTL watchdog, so containers are reaped after the meeting and no state leaks between meetings.',
            'Added a Redis cache that skips the embedding and LLM calls for repeated queries, and streamed responses to the React client over Server-Sent Events (SSE).',
          ],
        },
      ],
    },
    {
      id: 'infosys',
      role: 'Artificial Intelligence Intern',
      company: 'Infosys Springboard',
      companyUrl: 'https://springboard.infosys.com',
      location: 'Remote',
      period: 'February 2025 – April 2025',
      startDate: '2025-02',
      endDate: '2025-04',
      type: 'internship',
      highlight: 'Built Argus, a production multi-agent AI platform, and a source-verified healthcare RAG chatbot.',
      projects: [
        {
          name: 'Argus — Multi-Agent AI Platform',
          description:
            'A production multi-agent system where a planner agent decomposes a request and delegates to specialist research, analysis, and writing agents, each scoped to its own tools, with guardrails and full observability on every step.',
          points: [
            'Designed a planner-and-specialist multi-agent architecture: a planner agent decomposes the incoming task and routes sub-tasks to research, analysis, and writing agents, each with its own system prompt and a restricted tool allowlist.',
            'Built the backend as an async FastAPI service with Pydantic v2 schemas, and routed all LLM calls through OpenRouter as a model gateway for provider fallback and per-task model selection instead of hardcoding a single vendor.',
            'Used NVIDIA NIM-hosted embedding endpoints for retrieval, keeping the embedding layer swappable from the generation layer.',
            'Added guardrails at both ends of the pipeline: prompt-injection pattern checks and tool allowlists on input, and Pydantic schema validation with PII redaction before logging on output.',
            'Instrumented every agent step, tool call, and token cost with Langfuse, using session-level traces to debug multi-step runs and compare prompt versions by latency and cost.',
            'Built the frontend in React and TypeScript with a streaming interface that surfaces which agent is active and its intermediate tool calls, not just the final answer.',
            'Deployed the stack on an Azure VM: Docker Compose for the API and worker processes, Nginx as a reverse proxy with a custom domain and TLS, and log rotation for the running services.',
          ],
        },
        {
          name: 'Healthcare RAG Chatbot',
          description: '',
          points: [
            'Built a Healthcare RAG Chatbot on a Wikipedia dataset using FAISS vector search, a Flask backend, and a React + Tailwind CSS frontend with secured API endpoints.',
            'Implemented a real-time query processing pipeline with source verification and an interactive multi-turn conversation UI.',
          ],
        },
      ],
    },
    {
      id: 'adhyayan',
      role: 'Data Science Intern',
      company: 'Adhyayan IT',
      companyUrl: undefined,
      location: 'Remote',
      period: 'January 2025 – June 2025',
      startDate: '2025-01',
      endDate: '2025-06',
      type: 'internship',
      highlight: 'Built a production-hardened LangChain Text-to-SQL app evaluated with RAGAS.',
      projects: [
        {
          name: 'Text-to-SQL Application',
          description:
            'A natural-language-to-SQL app with schema-aware prompting and query guardrails, built to be run against a live database rather than a notebook demo.',
          points: [
            'Built a Text-to-SQL application using LangChain and LLMs (Google Gemini, Groq) converting natural language queries to executable SQL, achieving 100% context precision and high helpfulness scores via RAGAS evaluation.',
            'Fed the LLM a schema-aware prompt built from live table and column metadata instead of a static schema string, so the generated SQL stayed correct as the underlying tables changed.',
            'Added query guardrails: a read-only MySQL role for the app connection, a statement allowlist that blocks DROP, DELETE, and UPDATE, and a query validator that runs before any generated SQL touches the database.',
            'Wrapped LLM and database calls with retries, timeouts, and structured error handling, and used environment-based config so the same build could point at local, staging, and client database connections without code changes.',
            'Developed an interactive Streamlit UI with secure MySQL connectivity enabling non-technical users to query databases reliably.',
          ],
        },
      ],
    },
    {
      id: 'cyberpolice',
      role: 'Data Analyst Intern',
      company: 'Cyber Police Station',
      companyUrl: undefined,
      location: 'Dharashiv, Maharashtra',
      period: 'October 2023 – January 2024',
      startDate: '2023-10',
      endDate: '2024-01',
      type: 'internship',
      highlight: 'Organized complaint and credential records for the National Cyber Crime Reporting Portal.',
      projects: [
        {
          name: 'Data Management & Analytics',
          description: '',
          points: [
            'Managed 500+ user credentials for the National Cyber Crime Reporting Portal and organized 1,000+ complaint records, improving case resolution efficiency by 30%.',
            'Accelerated case progression by 20% and improved victim satisfaction by 15% through structured data workflows and communication.',
          ],
        },
      ],
    },
  ],

  projects,
  skillCategories,
};
