import { useNavigate } from 'react-router-dom';
import type { Project } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './Projects.css';

interface ProjectsProps {
  projects: Project[];
}

const STATUS_CONFIG: Record<Project['status'], { label: string; className: string }> = {
  production:   { label: 'Production',   className: 'badge--green' },
  completed:    { label: 'Completed',    className: 'badge--cyan' },
  'in-progress':{ label: 'In Progress',  className: 'badge--amber' },
};

const CATEGORY_CONFIG: Record<
  Project['category'],
  { label: string; icon: React.ReactNode }
> = {
  enterprise: {
    label: 'Enterprise AI',
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 21h18M3 7v14M21 7v14M6 11h4M6 15h4M14 11h4M14 15h4M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4M8 3h8a1 1 0 0 1 1 1v3H7V4a1 1 0 0 1 1-1z" />
      </svg>
    ),
  },
  personal: {
    label: 'AI System',
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  internship: {
    label: 'Applied AI',
    icon: (
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 2 3 3 6 3s6-1 6-3v-5" />
      </svg>
    ),
  },
};

export default function Projects({ projects }: ProjectsProps) {
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>();
  const navigate = useNavigate();

  const handleCardClick = (projectId: string) => {
    navigate(`/projects/${projectId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleKeyDown = (e: React.KeyboardEvent, projectId: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(projectId);
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section projects-section mesh-bg"
    >
      <div className="container">
        {/* Header */}
        <div className={`section-header reveal ${isVisible ? 'is-visible' : ''}`}>
          <p className="section-label">What I've Built</p>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Enterprise-grade RAG systems, agentic workflows, and high-performance AI architectures with interactive system diagrams.
          </p>
        </div>

        {/* Grid */}
        <div className="projects__grid" role="list">
          {projects.map((project, index) => {
            const statusCfg   = STATUS_CONFIG[project.status];
            const categoryCfg = CATEGORY_CONFIG[project.category];

            return (
              <article
                key={project.id}
                role="listitem"
                className={`project-card reveal reveal-delay-${Math.min((index % 3) + 1, 5)} ${isVisible ? 'is-visible' : ''}`}
                onClick={() => handleCardClick(project.id)}
                onKeyDown={(e) => handleKeyDown(e, project.id)}
                tabIndex={0}
                aria-label={`${project.name} — click to view architecture and details`}
              >
                {/* Top glow border */}
                <div className="project-card__top-border" aria-hidden="true" />

                {/* Visual Thumbnail (if available) */}
                {project.featuredImage && (
                  <div className="project-card__thumbnail">
                    <img
                      src={project.featuredImage}
                      alt={`${project.name} preview`}
                      loading="lazy"
                    />
                    <div className="project-card__thumbnail-overlay" />
                  </div>
                )}

                {/* Card Header */}
                <div className="project-card__header">
                  <div className="project-card__badges">
                    <span className={`badge ${statusCfg.className}`}>
                      {project.status === 'production' && (
                        <span className="project-card__pulse" aria-hidden="true" />
                      )}
                      {statusCfg.label}
                    </span>
                    <span className="badge badge--primary project-card__category-badge">
                      <span className="project-card__badge-icon">{categoryCfg.icon}</span>
                      <span>{categoryCfg.label}</span>
                    </span>
                  </div>

                  <div className="project-card__arrow-btn" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7" />
                      <polyline points="7 7 17 7 17 17" />
                    </svg>
                  </div>
                </div>

                {/* Title and description */}
                <div className="project-card__body">
                  <h3 className="project-card__name">{project.name}</h3>
                  <p className="project-card__desc">{project.shortDescription}</p>
                </div>

                {/* Metrics */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="project-card__metrics">
                    {project.metrics.slice(0, 3).map((m) => (
                      <div key={m.label} className="project-card__metric">
                        <span className="project-card__metric-val">{m.value}</span>
                        <span className="project-card__metric-lbl">{m.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Tags & Bottom Action Footer */}
                <div className="project-card__footer">
                  <div className="project-card__tags">
                    {project.tech.slice(0, 4).map((techName) => (
                      <span key={techName} className="project-card__tag">
                        {techName}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="project-card__tag project-card__tag--more">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="project-card__cta">
                    <span>Architecture & Code</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
