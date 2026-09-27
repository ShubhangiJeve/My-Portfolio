import type { PersonalInfo } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './About.css';

interface AboutProps {
  personalInfo: PersonalInfo;
}

const FOCUS_AREAS = [
  'Hybrid retrieval: dense vectors plus lexical search',
  'Grounding, citations, and abstention for high-stakes domains',
  'Agentic tool calling and multi-step workflows (LangGraph)',
  'Async Python APIs with FastAPI and Pydantic v2',
  'Latency and cost: caching, streaming, smaller prompts',
  'RAG evaluation with RAGAS',
];

export default function About({ personalInfo }: AboutProps) {
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>();

  return (
    <section id="about" ref={sectionRef} className="section about-section">
      <div className="container">
        <div className="about__grid">
          <div className={`about__content reveal ${isVisible ? 'is-visible' : ''}`}>
            <p className="section-label">About</p>
            <h2 className="section-title">What I work on</h2>

            <div className="about__prose prose">
              <p>
                I'm an AI engineer who works across the whole path of an LLM feature: getting data in,
                retrieving the right context, calling the model with guardrails, and serving the result
                through an API and a UI. Most of my work is retrieval-augmented generation in domains
                where a wrong answer is costly, like law and healthcare.
              </p>
              <p>
                On LegalAID I designed hybrid retrieval that fuses pgvector similarity search with
                PostgreSQL full-text search using reciprocal rank fusion, then gates the LLM behind a
                confidence threshold so it declines to answer when the evidence is weak. Search runs in
                under 4 seconds across 25 years of court data.
              </p>
              <p>
                On MeetOps I built a copilot that joins Microsoft Teams calls through short-lived
                Playwright bots, indexes the transcript as it arrives, and uses function calling to
                create Jira tickets or pull SAP GRC metrics while the meeting is still running.
              </p>
              <p>
                I'm looking for AI Engineer, LLM Engineer, or backend-for-AI roles where I can own a
                system end to end. Based in Hyderabad and open to Bengaluru, Pune, and remote.
              </p>
            </div>

            <div className="about__contact">
              <a href={`mailto:${personalInfo.email}`} className="about__contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {personalInfo.email}
              </a>
              <a href={`tel:${personalInfo.phone}`} className="about__contact-item">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.9-1.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {personalInfo.phone}
              </a>
            </div>
          </div>

          <aside className={`about__interests reveal ${isVisible ? 'is-visible' : ''}`}>
            <h3 className="about__interests-title">Current focus</h3>
            <ul>
              {FOCUS_AREAS.map((text) => (
                <li key={text} className="about__interest-item">{text}</li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
