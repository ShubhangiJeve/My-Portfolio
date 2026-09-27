import type { PersonalInfo } from '../types';
import './Hero.css';

interface HeroProps {
  personalInfo: PersonalInfo;
  onResumeOpen: () => void;
}

const CORE_STACK = ['Python', 'FastAPI', 'PostgreSQL + pgvector', 'LangChain', 'Redis', 'Docker', 'Next.js'];

export default function Hero({ personalInfo, onResumeOpen }: HeroProps) {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="home" aria-label="Introduction">
      <div className="container hero__container">
        <div className="hero__content">
          <p className="hero__eyebrow">
            {personalInfo.role} · {personalInfo.location}
          </p>

          <h1 className="hero__name">{personalInfo.name}</h1>

          <p className="hero__tagline">{personalInfo.tagline}</p>

          <p className="hero__objective">{personalInfo.objective}</p>

          <ul className="hero__stack" aria-label="Core stack">
            {CORE_STACK.map((item) => (
              <li key={item} className="tag">{item}</li>
            ))}
          </ul>

          <div className="hero__cta">
            <button type="button" className="btn btn--primary btn--lg" onClick={scrollToProjects}>
              View projects
            </button>
            <button type="button" className="btn btn--ghost btn--lg" onClick={onResumeOpen}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              Resume
            </button>
          </div>

          <div className="hero__social">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
              aria-label="GitHub profile"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-link"
              aria-label="LinkedIn profile"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              className="hero__social-link"
              aria-label="Send email"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
          </div>
        </div>

        {personalInfo.avatarUrl && (
          <figure className="hero__avatar">
            <img
              src={personalInfo.avatarUrl}
              alt={`Portrait of ${personalInfo.name}`}
              className="hero__avatar-img"
              width="320"
              height="380"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
            <figcaption className="hero__avatar-caption">
              <span className="hero__avatar-dot" aria-hidden="true" />
              Open to AI Engineer roles
            </figcaption>
          </figure>
        )}
      </div>
    </section>
  );
}
