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

export default function ExperienceSection({ experience }: ExperienceProps) {
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>();

  // Each card's open/closed state stored in a plain object keyed by experience id
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    experience.forEach((exp, idx) => {
      // First card open by default
      initial[exp.id] = idx === 0;
    });
    return initial;
  });

  const toggle = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

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
          {experience.map((exp, index) => {
            const isExpanded = !!expanded[exp.id];

            return (
              <div
                key={exp.id}
                className={`timeline__item reveal reveal-delay-${Math.min(index + 1, 5)} ${
                  isVisible ? 'is-visible' : ''
                }`}
                role="listitem"
              >
                {/* Connector */}
                <div className="timeline__connector" aria-hidden="true">
                  <div className={`timeline__dot ${isExpanded ? 'timeline__dot--active' : ''}`}>
                    <div className="timeline__dot-inner" />
                  </div>
                  {index < experience.length - 1 && (
                    <div className="timeline__line" />
                  )}
                </div>

                {/* Card */}
                <div
                  className={`timeline__card card ${
                    isExpanded ? 'timeline__card--expanded' : ''
                  }`}
                >
                  {/* Header — clicking anywhere toggles */}
                  <div
                    className="timeline__card-header"
                    onClick={() => toggle(exp.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggle(exp.id);
                      }
                    }}
                    aria-expanded={isExpanded}
                    aria-controls={`exp-body-${exp.id}`}
                  >
                    <div className="timeline__card-left">
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
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              aria-hidden="true"
                            >
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
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
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
                      {/* Dedicated toggle button — stopPropagation so only one handler fires */}
                      <button
                        type="button"
                        className="timeline__toggle-btn-pill"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggle(exp.id);
                        }}
                        aria-label={isExpanded ? `Hide details for ${exp.company}` : `View details for ${exp.company}`}
                      >
                        <span className="timeline__toggle-text">
                          {isExpanded ? 'Hide Details' : 'View Details'}
                        </span>
                        <svg
                          className={`timeline__chevron ${
                            isExpanded ? 'timeline__chevron--open' : ''
                          }`}
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

                  {/* Expandable body */}
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
                                <span className="timeline__project-icon" aria-hidden="true">
                                  ▸
                                </span>
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
          })}
        </div>
      </div>
    </section>
  );
}
