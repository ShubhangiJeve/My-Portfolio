import type { PersonalInfo } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './About.css';

interface AboutProps {
  personalInfo: PersonalInfo;
}

export default function About({ personalInfo }: AboutProps) {
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>();

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section about-section mesh-bg"
    >
      <div className="container">
        <div className="about__grid">
          {/* Left column */}
          <div className={`about__content reveal ${isVisible ? 'is-visible' : ''}`}>
            <p className="section-label">About Me</p>
            <h2 className="section-title">
              The Work <span className="gradient-text">I Do</span>
            </h2>

            <div className="about__prose prose">
              <p>
                I'm an AI Engineer who builds production systems that organizations actually use — not demos.
                My work spans the full stack of AI engineering: designing multi-stage retrieval pipelines,
                writing the backend APIs that serve them, integrating LLMs with the guardrails that make
                them reliable in production, and building the frontend interfaces that make those capabilities
                accessible to real users.
              </p>
              <p>
                On the RAG and search side, I've designed hybrid retrieval systems combining dense vector
                search with lexical recall, implemented parent-child chunking strategies, and tuned
                confidence-gated abstention policies to control hallucination in high-stakes domains like
                legal and healthcare. I've worked with pgvector, FAISS, and ChromaDB at scale — optimizing
                for sub-4-second latency on corpora of 75,000+ documents.
              </p>
              <p>
                On the agentic side, I've built systems that don't just answer questions — they take action.
                Think: meeting copilots that join live calls via ephemeral bots, extract structured project
                intelligence from transcripts, and trigger real workflow actions like Jira ticket creation
                or SAP GRC metric retrieval, all streamed back in real time via SSE.
              </p>
              <p>
                On the backend, I write async FastAPI services with full Pydantic v2 validation, deploy them
                in Docker, and pair them with Next.js or React frontends. I care about clean API contracts,
                proper error handling, and systems that are observable and maintainable after handoff.
              </p>
              <p>
                I'm looking for <strong style={{ color: 'var(--color-text-primary)' }}>AI Engineer roles</strong> where
                I can own systems end to end — from architecture through deployment. Open to Hyderabad,
                Pune, Ahmedabad, Bengaluru, and remote opportunities.
              </p>
            </div>

            {/* Contact row */}
            <div className="about__contact">
              <a
                href={`mailto:${personalInfo.email}`}
                className="about__contact-item"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {personalInfo.email}
              </a>
              <a
                href={`tel:${personalInfo.phone}`}
                className="about__contact-item"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.9-1.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {personalInfo.phone}
              </a>
            </div>
          </div>

          {/* Right column — interest tags */}
          <div className={`about__interests reveal reveal-delay-2 ${isVisible ? 'is-visible' : ''}`}>
            <h3 className="about__interests-title">Currently Focused On</h3>
            {[
              { text: 'Agentic AI and autonomous systems' },
              { text: 'Enterprise RAG at scale' },
              { text: 'Low-latency LLM serving' },
              { text: 'LangGraph and multi-agent workflows' },
              { text: 'Hallucination control and grounding' },
              { text: 'Vector search optimization' },
              { text: 'Production AI system design' },
              { text: 'Clean API contract design' },
            ].map((item) => (
              <div key={item.text} className="about__interest-item">
                <span className="about__interest-dot" aria-hidden="true" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
