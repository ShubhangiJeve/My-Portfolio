import { useEffect, useRef } from 'react';
import type { PersonalInfo } from '../types';
import './Hero.css';

interface HeroProps {
  personalInfo: PersonalInfo;
  onResumeOpen: () => void;
}

const TYPEWRITER_ROLES = [
  'AI Engineer',
  'LLM Systems Builder',
  'RAG Pipeline Architect',
  'Full-Stack AI Developer',
];

export default function Hero({ personalInfo, onResumeOpen }: HeroProps) {
  const typewriterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const type = () => {
      const el = typewriterRef.current;
      if (!el) return;

      const currentRole = TYPEWRITER_ROLES[roleIndex];
      const speed = isDeleting ? 40 : 90;
      const pauseAfterWord = 2200;
      const pauseAfterDelete = 400;

      if (!isDeleting) {
        el.textContent = currentRole.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentRole.length) {
          isDeleting = true;
          timeoutId = setTimeout(type, pauseAfterWord);
          return;
        }
      } else {
        el.textContent = currentRole.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % TYPEWRITER_ROLES.length;
          timeoutId = setTimeout(type, pauseAfterDelete);
          return;
        }
      }

      timeoutId = setTimeout(type, speed);
    };

    timeoutId = setTimeout(type, 600);
    return () => clearTimeout(timeoutId);
  }, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero mesh-bg dot-grid" id="home" aria-label="Introduction">
      {/* Floating orbs — decorative only */}
      <div className="hero__orb hero__orb--1" aria-hidden="true" />
      <div className="hero__orb hero__orb--2" aria-hidden="true" />

      <div className="container hero__container">
        <div className="hero__content">
          {/* Greeting */}
          <p className="hero__greeting animate-fade-in-up">
            <span className="hero__greeting-spark" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" />
              </svg>
            </span>
            Hey there, I'm
          </p>

          {/* Name */}
          <h1 className="hero__name animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            {personalInfo.firstName}{' '}
            <span className="gradient-text">{personalInfo.lastName}</span>
          </h1>

          {/* Typewriter role */}
          <div className="hero__role animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            <span
              ref={typewriterRef}
              className="hero__role-text"
              aria-label={`Role: ${personalInfo.role}`}
            />
            <span className="hero__cursor" aria-hidden="true" />
          </div>

          {/* Tagline */}
          <p
            className="hero__tagline animate-fade-in-up"
            style={{ animationDelay: '300ms' }}
          >
            {personalInfo.tagline}
          </p>

          {/* Objective snippet */}
          <p
            className="hero__objective animate-fade-in-up"
            style={{ animationDelay: '400ms' }}
          >
            {personalInfo.objective}
          </p>

          {/* CTA buttons */}
          <div
            className="hero__cta animate-fade-in-up"
            style={{ animationDelay: '500ms' }}
          >
            <button className="btn btn--primary btn--lg" onClick={scrollToProjects}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              View Projects
            </button>
            <button className="btn btn--ghost btn--lg" onClick={onResumeOpen}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              View Resume
            </button>
          </div>

          {/* Social links */}
          <div
            className="hero__social animate-fade-in-up"
            style={{ animationDelay: '600ms' }}
          >
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

        {/* Scroll indicator */}
        <div className="hero__scroll-indicator" aria-hidden="true">
          <div className="hero__scroll-line" />
          <span>scroll</span>
        </div>
      </div>
    </section>
  );
}
