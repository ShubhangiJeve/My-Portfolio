import type { Education } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './Profile.css';

interface ProfileProps {
  education: Education[];
}

const PROFILE_HIGHLIGHTS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    title: 'Retrieval and RAG',
    description: 'Chunking strategy, embeddings (bge-m3, sentence-transformers, OpenAI), hybrid dense and lexical search, reranking with reciprocal rank fusion, and confidence-gated answers.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'LLM integration and agents',
    description: 'Groq, OpenAI, Gemini, and Hugging Face models behind a provider-agnostic service layer, function calling, LangChain, and LangGraph.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    title: 'Backend for AI',
    description: 'Async FastAPI services, SQLAlchemy 2.0, Pydantic v2 validation, Redis caching, Server-Sent Events streaming, and resumable ingestion jobs.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    title: 'Data and vector stores',
    description: 'PostgreSQL with pgvector and tsvector full-text search, FAISS, ChromaDB, and MySQL.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Frontend',
    description: 'Next.js 14, React, and TypeScript interfaces for search, drafting, comparison, and admin workflows.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: 'Deployment',
    description: 'Docker and Docker Compose for multi-service stacks, including per-session containers with TTL cleanup.',
  },
];

export default function Profile({ education }: ProfileProps) {
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>();

  return (
    <section
      id="profile"
      ref={sectionRef}
      className="section section--alt profile-section"
    >
      <div className="container">
        <div className={`section-header reveal ${isVisible ? 'is-visible' : ''}`}>
          <p className="section-label">Profile</p>
          <h2 className="section-title">Skills in practice</h2>
          <p className="section-subtitle">
            The areas I have shipped work in, and the tools I used for each.
          </p>
        </div>

        <div className={`profile__highlights reveal ${isVisible ? 'is-visible' : ''}`}>
          {PROFILE_HIGHLIGHTS.map((item) => (
            <div key={item.title} className="profile__highlight-card">
              <span className="profile__highlight-icon" aria-hidden="true">
                {item.icon}
              </span>
              <h3 className="profile__highlight-title">{item.title}</h3>
              <p className="profile__highlight-desc">{item.description}</p>
            </div>
          ))}
        </div>

        <div className={`profile__education reveal ${isVisible ? 'is-visible' : ''}`}>
          <h3 className="profile__education-heading">Education</h3>
          {education.map((edu) => (
            <div key={edu.degree} className="profile__education-row">
              <div>
                <p className="profile__education-degree">{edu.degree}</p>
                <p className="profile__education-school">{edu.institution}</p>
              </div>
              <div className="profile__education-meta">
                <span>{edu.period}</span>
                <span>{edu.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
