import type { PersonalInfo } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './About.css';

interface AboutProps {
  personalInfo: PersonalInfo;
}

export default function About({ personalInfo }: AboutProps) {
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>();

  return (
    <section id="about" ref={sectionRef} className="section about-section">
      <div className="container">
        <div className="about__layout">
          <div className={`about__content reveal ${isVisible ? 'is-visible' : ''}`}>
            <p className="section-label">About</p>
            <h2 className="section-title">What I work on</h2>

            <div className="about__prose prose">
              <p>
                As an AI Engineer specializing in Generative AI and LLM systems, I bridge the gap between model capabilities and enterprise production architectures. I work across the complete path of an AI feature: building high-throughput ingestion pipelines, designing hybrid retrieval architectures, enforcing strict safety guardrails and evals, and serving low-latency async APIs to end users. My work centers on high-stakes domains where reliability, groundedness, and zero hallucination are essential.
              </p>
              <p>
                In production applications like <strong>LegalAID</strong>, I architected hybrid retrieval fusing pgvector dense embeddings with PostgreSQL full-text lexical search via Reciprocal Rank Fusion (RRF) and Cross-Encoder rerankers, reducing search latency across 25+ years of court data to under 4 seconds. In <strong>MeetOps</strong>, I engineered stateful agentic workflows (LangGraph, function calling) that orchestrate live tool execution—such as automatically generating Jira tickets and pulling SAP GRC compliance metrics mid-meeting through headless Playwright bots and strict Pydantic v2 schemas.
              </p>
              <p>
                Shipping enterprise AI requires rigorous validation and monitoring. I build automated evaluation frameworks using <strong>RAGAS</strong> and LLM-as-a-judge pipelines to systematically benchmark faithfulness, context recall, and answer relevancy before every release. In production, I integrate distributed tracing (monitoring P95/P99 latency, token costs, and prompt drift) with multi-layered guardrails that detect prompt injections, enforce grounded source citations, and execute confidence-based abstention when context support is insufficient.
              </p>
            </div>

            <div className="about__career">
              <p className="about__looking">
                I am actively interviewing for <strong>AI Engineer, Generative AI / LLM Engineer, RAG Engineer, or Backend-for-AI roles</strong> where I can architect, evaluate, and scale production AI systems end to end.
              </p>
              <div className="about__locations">
                <div className="about__locations-status">
                  <span className="about__locations-dot" aria-hidden="true" />
                  <span className="about__locations-based">
                    Based in <strong>Hyderabad</strong>
                  </span>
                  <span className="about__locations-sep" aria-hidden="true">·</span>
                  <span className="about__locations-open">Open to relocation &amp; remote:</span>
                </div>
                <div className="about__location-tags" role="list">
                  <span className="loc-tag loc-tag--mumbai" role="listitem">Mumbai</span>
                  <span className="loc-tag loc-tag--bengaluru" role="listitem">Bengaluru</span>
                  <span className="loc-tag loc-tag--pune" role="listitem">Pune</span>
                  <span className="loc-tag loc-tag--ahmedabad" role="listitem">Ahmedabad</span>
                  <span className="loc-tag loc-tag--gandhinagar" role="listitem">Gandhinagar</span>
                  <span className="loc-tag loc-tag--remote" role="listitem">Remote</span>
                </div>
              </div>
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
        </div>
      </div>
    </section>
  );
}
