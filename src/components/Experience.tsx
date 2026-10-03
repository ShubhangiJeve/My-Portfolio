import { useState, useEffect } from 'react';
import type { Experience } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './Experience.css';

interface ExperienceProps {
  experience: Experience[];
}

// ── Individual card: Hover-to-preview on desktop, Tap-to-toggle on mobile ────
function ExperienceCard({
  exp,
  index,
  isLast,
}: {
  exp: Experience;
  index: number;
  isLast: boolean;
}) {
  const [isHoverDevice, setIsHoverDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const bodyId = `exp-body-${exp.id}`;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
      setIsHoverDevice(mediaQuery.matches);

      // On mobile (touchscreens), start first card expanded for instant context
      if (!mediaQuery.matches && index === 0) {
        setIsPinned(true);
      }

      const handler = (e: MediaQueryListEvent) => {
        setIsHoverDevice(e.matches);
      };
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [index]);

  // On desktop: opens when hovered OR pinned by click.
  // On mobile: opens when tapped/pinned.
  const isExpanded = isHoverDevice ? (isHovered || isPinned) : isPinned;

  const handleMouseEnter = () => {
    if (isHoverDevice) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (isHoverDevice) {
      setIsHovered(false);
    }
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPinned((prev) => !prev);
  };

  const handleHeaderClick = () => {
    setIsPinned((prev) => !prev);
  };

  return (
    <li className="timeline__item">
      {/* Connector dot + line */}
      <div className="timeline__connector" aria-hidden="true">
        <div className={`timeline__dot ${isExpanded ? 'timeline__dot--active' : ''}`} />
        {!isLast && <div className="timeline__line" />}
      </div>

      <article
        className={`timeline__card ${isExpanded ? 'timeline__card--expanded' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Header: clicking anywhere toggles for touch/mouse users */}
        <div className="timeline__card-header" onClick={handleHeaderClick}>
          <div className="timeline__card-left">
            {exp.endDate === 'Present' && (
              <div className="timeline__badges">
                <span className="badge badge--green">
                  <span className="status-dot" aria-hidden="true" />
                  Current
                </span>
              </div>
            )}

            <h3 className="timeline__role">{exp.role}</h3>

            <div className="timeline__meta">
              {exp.companyUrl ? (
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="timeline__company"
                  onClick={(e) => e.stopPropagation()}
                >
                  {exp.company}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              ) : (
                <span className="timeline__company">{exp.company}</span>
              )}
              <span className="timeline__separator" aria-hidden="true">·</span>
              <span className="timeline__location">{exp.location}</span>
            </div>

            {exp.highlight && (
              <p className="timeline__highlight">{exp.highlight}</p>
            )}
          </div>

          <div className="timeline__card-right">
            <span className="timeline__period">{exp.period}</span>

            <button
              type="button"
              className="timeline__toggle"
              onClick={handleToggleClick}
              aria-expanded={isExpanded}
              aria-controls={bodyId}
            >
              {isExpanded ? 'Hide details' : 'View details'}
              <span className="visually-hidden"> for {exp.role} at {exp.company}</span>
              <svg
                className={`timeline__chevron ${isExpanded ? 'timeline__chevron--open' : ''}`}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        </div>

        {/* Details body with smooth CSS grid height interpolation */}
        <div
          id={bodyId}
          className={`timeline__card-body-wrapper ${isExpanded ? 'timeline__card-body-wrapper--expanded' : ''}`}
          aria-hidden={!isExpanded}
        >
          <div className="timeline__card-body-inner">
            {exp.projects.map((project) => (
              <div key={project.name} className="timeline__project">
                {project.name && (
                  <h4 className="timeline__project-name">{project.name}</h4>
                )}
                {project.description && (
                  <p className="timeline__project-desc">{project.description}</p>
                )}
                <ul className="timeline__points">
                  {project.points.map((point) => (
                    <li key={point} className="timeline__point">{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </article>
    </li>
  );
}

// ── Section wrapper ───────────────────────────────────────────────────────────
export default function ExperienceSection({ experience }: ExperienceProps) {
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>();

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="section section--alt experience-section"
    >
      <div className="container">
        <div className={`section-header reveal ${isVisible ? 'is-visible' : ''}`}>
          <p className="section-label section-label--warm">Experience</p>
          <h2 className="section-title">Work Experience</h2>
          <p className="section-subtitle">
            Most recently owning the AI architecture for enterprise platforms at COGNITBOTZ.
          </p>
        </div>

        <ol className={`timeline reveal ${isVisible ? 'is-visible' : ''}`}>
          {experience.map((exp, index) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              index={index}
              isLast={index === experience.length - 1}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
