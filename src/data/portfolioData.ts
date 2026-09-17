// ─────────────────────────────────────────────
//  Portfolio Data — Single source of truth
//  All personal info, education, experience
// ─────────────────────────────────────────────

import type { PortfolioData } from '../types';
import profileImg from '../assets/profile.png';
import { skillCategories } from './skillsData';
import { projects } from './projectsData';

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: 'Shubhangi Jeve',
    firstName: 'Shubhangi',
    lastName: 'Jeve',
    role: 'AI Engineer',
    tagline: 'Building production-grade AI systems that actually ship.',
    phone: '+91-9579122372',
    email: 'shubhangijeve@gmail.com',
    github: 'https://github.com/ShubhangiJeve',
    linkedin: 'https://linkedin.com/in/shubhangi-jeve-97445b235',
    location: 'Hyderabad, Telangana',
    avatarUrl: profileImg,
    objective:
      'AI Engineer with hands-on production experience building end-to-end LLM-powered systems, RAG pipelines, and full-stack AI applications. Proficient in Python, FastAPI, vector databases, and LLM integration using Groq, Gemini, and Hugging Face. Seeking an AI Engineer role to architect and deploy scalable, enterprise-grade intelligent systems.',
    profileSummary: [
      'I architect and ship production-grade AI systems — not prototypes. From multi-stage hybrid RAG pipelines on 75,000+ legal cases to ephemeral bot orchestration for live Microsoft Teams meetings, I work at the intersection of LLM engineering, backend systems, and full-stack product development.',
      'My focus is on building AI that is reliable in production: hallucination-controlled, low-latency, observable, and deployed with Docker. I care deeply about the gap between "it works in a notebook" and "it works at scale under real user load."',
      'I am looking for AI Engineer roles where I can architect and own intelligent systems end to end — from data ingestion and RAG pipeline design to production API development and frontend integration.',
    ],
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
      highlight: 'Led AI architecture for two enterprise platforms from design to production deployment.',
      projects: [
        {
          name: 'LegalAID',
          description:
            'Enterprise-grade AI-powered Legal Research and Litigation Assistance Platform for Indian court case data — combining RAG, semantic search, and LLM-driven drafting.',
          points: [
            'Designed a multi-stage hybrid retrieval pipeline combining dense vector search (pgvector + BAAI/bge-m3) and PostgreSQL full-text search with reciprocal rank fusion.',
            'Integrated Groq-hosted LLMs through a provider-abstracted service layer; enforced a strict abstention policy for hallucination control in legal contexts.',
            'Built a resumable ingestion pipeline processing 20,000–75,000 yearly Indian court JSON dumps, normalizing 30+ canonical fields, deduplicating records, and generating vector indexes.',
            'Developed a fully async FastAPI REST API with Pydantic v2 validation, exposing endpoints for case search, RAG Q&A, AI legal drafting, litigation comparison, and analytics.',
            'Built the complete frontend in Next.js 14 with TypeScript — natural-language search, faceted explorer, legal drafting workspace, side-by-side comparison, and admin console.',
            'Containerized the entire system with Docker Compose, achieving sub-4-second search latency on the full 25-year corpus.',
          ],
        },
        {
          name: 'MeetOps',
          description:
            'Enterprise-grade AI Meeting Copilot integrating Microsoft Teams via ephemeral Playwright bots, a RAG knowledge engine, and an agentic LLM layer.',
          points: [
            'Designed a semantic RAG pipeline over meeting transcripts, BRDs, and project artifacts using OpenAI embeddings in pgvector with speaker-turn and topical-boundary chunking.',
            'Implemented agentic function-calling to trigger mid-conversation actions: Jira ticket creation, rolling meeting summaries, and live SAP GRC metrics retrieval.',
            'Engineered a Disposable Workspace pattern — per-meeting Playwright instances provisioned and reaped via Docker with TTL watchdogs, ensuring zero state contamination.',
            'Built a multi-tier Redis caching layer that short-circuits the full embedding and LLM cycle on repeated queries; streamed output to React via Server-Sent Events (SSE).',
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
      highlight: 'Built a healthcare RAG chatbot with source-verified medical responses.',
      projects: [
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
      highlight: 'Achieved 100% context precision (RAGAS) on a Text-to-SQL pipeline.',
      projects: [
        {
          name: 'Text-to-SQL Application',
          description: '',
          points: [
            'Built a Text-to-SQL application using LangChain and LLMs (Google Gemini, Groq) converting natural language queries to executable SQL, achieving 100% context precision and high helpfulness scores via RAGAS evaluation.',
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
      highlight: 'Improved case resolution efficiency by 30% through data management.',
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
