import type { PersonalInfo } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './Profile.css';

interface ProfileProps {
  personalInfo: PersonalInfo;
}

const PROFILE_STATS = [
  { value: '2+',  label: 'Years Building AI' },
  { value: '5+',  label: 'Production Projects' },
  { value: '75K+',label: 'Cases Indexed' },
  { value: '4',   label: 'Internships' },
];

const PROFILE_HIGHLIGHTS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
        <line x1="8" y1="16" x2="8" y2="16" />
        <line x1="16" y1="16" x2="16" y2="16" />
      </svg>
    ),
    title: 'Generative AI & LLMs',
    description: 'RAG pipelines, LangChain, LangGraph, Groq, Gemini, OpenAI — from prototype to production with hallucination control.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="6" x2="6.01" y2="6" />
        <line x1="6" y1="18" x2="6.01" y2="18" />
      </svg>
    ),
    title: 'Backend & API Engineering',
    description: 'FastAPI, async SQLAlchemy 2.0, Pydantic v2, fully validated REST APIs with proper error handling and observability.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
    title: 'Vector Search & Embeddings',
    description: 'pgvector, ChromaDB, FAISS — hybrid dense + lexical retrieval with sub-4-second latency at 75,000+ document scale.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    title: 'Full-Stack Development',
    description: 'Next.js 14, React, TypeScript — building interfaces that translate complex AI capabilities into clean user experiences.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: 'DevOps & Deployment',
    description: 'Docker, Docker Compose — containerizing complete AI stacks from multi-service orchestration to health-checked startup.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: 'Agentic AI Systems',
    description: 'Function-calling agents, tool orchestration, streaming SSE responses, and ephemeral bot lifecycle management.',
  },
];

export default function Profile({ personalInfo }: ProfileProps) {
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>();

  return (
    <section
      id="profile"
      ref={sectionRef}
      className={`section section--alt profile-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="container">
        {/* Header */}
        <div className={`section-header reveal ${isVisible ? 'is-visible' : ''}`}>
          <p className="section-label">Who I Am</p>
          <h2 className="section-title">
            Professional <span className="gradient-text">Profile</span>
          </h2>
        </div>

        {/* Stats row */}
        <div className="profile__stats">
          {PROFILE_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`profile__stat reveal reveal-delay-${Math.min(i + 1, 5)} ${isVisible ? 'is-visible' : ''}`}
            >
              <span className="profile__stat-value gradient-text">{stat.value}</span>
              <span className="profile__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Summary paragraphs */}
        <div className={`profile__summary reveal reveal-delay-2 ${isVisible ? 'is-visible' : ''}`}>
          {personalInfo.profileSummary.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <hr className="divider" />

        {/* Expertise grid */}
        <div className="profile__highlights">
          {PROFILE_HIGHLIGHTS.map((item, i) => (
            <div
              key={item.title}
              className={`profile__highlight-card reveal reveal-delay-${Math.min((i % 3) + 1, 5)} ${isVisible ? 'is-visible' : ''}`}
            >
              <span className="profile__highlight-icon" aria-hidden="true">
                {item.icon}
              </span>
              <h3 className="profile__highlight-title">{item.title}</h3>
              <p className="profile__highlight-desc">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Location badge */}
        <div className={`profile__location reveal reveal-delay-3 ${isVisible ? 'is-visible' : ''}`}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {personalInfo.location} &mdash; Open to Pune, Ahmedabad, Bengaluru & Remote
        </div>
      </div>
    </section>
  );
}
