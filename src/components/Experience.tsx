import { useState } from 'react';
import type { Experience } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './Experience.css';

interface ExperienceProps {
  experience: Experience[];
}

const TYPE_LABELS: Record<Experience['type'], string> = {
  'full-time':  'Full-time',
  'internship': 'Internship',
  'contract':   'Contract',
};

// ── Individual card — owns its own open/close state ──────────────────────────
function ExperienceCard({
  exp,
  index,
  isLast,
  isVisible,
}: {
  exp: Experience;
  index: number;
  isLast: boolean;
  isVisible: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(index === 0);

  const toggle = () => setIsExpanded((v) => !v);

  return (
    <div
      className={`timeline__item reveal reveal-delay-${Math.min(index + 1, 5)} ${
        isVisible ? 'is-visible' : ''
      }`}
      role="listitem"
    >
      {/* Connector dot + line */}
      <div className="timeline__connector" aria-hidden="true">
        <div className={`timeline__dot ${isExpanded ? 'timeline__dot--active' : ''}`}>
          <div className="timeline__dot-inner" />
        </div>
        {!isLast && <div className="timeline__line" />}
      </div>

      {/* Card */}
      <div className={`timeline__card card ${isExpanded ? 'timeline__card--expanded' : ''}`}>

        {/* Clickable header */}
        <div
          className="timeline__card-header"
          onClick={toggle}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggle();
            }
          }}
          aria-expanded={isExpanded}
          aria-controls={`exp-body-${exp.id}`}
        >
          <div className="timeline__card-left">
            {/* Badge — single, no duplication */}
            <div className="timeline__badges">
              {exp.endDate === 'Present' ? (
                <>
                  <span className="badge badge--green">● Current</span>
                  <span className="badge badge--cyan">{TYPE_LABELS[exp.type]}</span>
                </>
              ) : (
                <span className="badge badge--primary">{TYPE_LABELS[exp.type]}</span>
              )}
            </div>

            <h3 className="timeline__role">{exp.role}</h3>

            <div className="timeline__meta">
              {exp.companyUrl ? (
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="timeline__company"
                  onClick={(e) => e.stopPropagation()}
                  title={`Visit ${exp.company}`}
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
              <span className="timeline__location">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {exp.location}
              </span>
            </div>

            {exp.highlight && (
              <p className="timeline__highlight">{exp.highlight}</p>
            )}
          </div>

          <div className="timeline__card-right">
            <span className="timeline__period">{exp.period}</span>

            {/* Toggle pill button */}
            <button
              type="button"
              className="timeline__toggle-btn-pill"
              onClick={(e) => {
                e.stopPropagation();
                toggle();
              }}
              aria-label={isExpanded ? `Hide details for ${exp.company}` : `View details for ${exp.company}`}
            >
              <span className="timeline__toggle-text">
                {isExpanded ? 'Hide Details' : 'View Details'}
              </span>
              <svg
                className={`timeline__chevron ${isExpanded ? 'timeline__chevron--open' : ''}`}
                width="16"
                height="16"
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

        {/* Expandable details body */}
        {isExpanded && (
          <div
            id={`exp-body-${exp.id}`}
            className="timeline__card-body timeline__card-body--open"
          >
            <div className="timeline__body-inner">
              {exp.projects.map((project, pIdx) => (
                <div key={pIdx} className="timeline__project">
                  {project.name && (
                    <h4 className="timeline__project-name">
                      <span className="timeline__project-icon" aria-hidden="true">▸</span>
                      {project.name}
                    </h4>
                  )}
                  {project.description && (
                    <p className="timeline__project-desc">{project.description}</p>
                  )}
                  <ul className="timeline__points">
                    {project.points.map((point, ptIdx) => (
                      <li key={ptIdx} className="timeline__point">
                        <span className="timeline__point-bullet" aria-hidden="true" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
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
        {/* Header */}
        <div className={`section-header reveal ${isVisible ? 'is-visible' : ''}`}>
          <p className="section-label">Career Path</p>
          <h2 className="section-title">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="section-subtitle">
            Hands-on engineering roles building production AI systems and scalable architectures.
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline" role="list">
          {experience.map((exp, index) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              index={index}
              isLast={index === experience.length - 1}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
