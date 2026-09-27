import { useState } from 'react';
import type { Experience } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './Experience.css';

interface ExperienceProps {
  experience: Experience[];
}

// ── Individual card, owns its own open/close state ───────────────────────────
function ExperienceCard({
  exp,
  index,
  isLast,
}: {
  exp: Experience;
  index: number;
  isLast: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(index === 0);
  const bodyId = `exp-body-${exp.id}`;

  const toggle = () => setIsExpanded((v) => !v);

  return (
    <li className="timeline__item">
      {/* Connector dot + line */}
      <div className="timeline__connector" aria-hidden="true">
        <div className={`timeline__dot ${isExpanded ? 'timeline__dot--active' : ''}`} />
        {!isLast && <div className="timeline__line" />}
      </div>

      <article className={`timeline__card ${isExpanded ? 'timeline__card--expanded' : ''}`}>
        {/* Header: clicking anywhere toggles for mouse users; the button is the accessible control */}
        <div className="timeline__card-header" onClick={toggle}>
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
              onClick={(e) => {
                e.stopPropagation();
                toggle();
              }}
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

        {/* Details body stays in the DOM so aria-controls always resolves */}
        <div id={bodyId} className="timeline__card-body" hidden={!isExpanded}>
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
            Most recently owning the AI architecture for two enterprise platforms at COGNITBOTZ.
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
