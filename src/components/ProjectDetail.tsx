import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProjectById } from '../data/projectsData';
import type { Diagram } from '../types';
import './ProjectDetail.css';

// ─── Lazy Mermaid loader — fetches the script once, caches the promise ────────

let mermaidLoadPromise: Promise<void> | null = null;

function loadMermaid(): Promise<void> {
  if (mermaidLoadPromise) return mermaidLoadPromise;

  // Already loaded by a prior navigation
  const win = window as Window & { mermaid?: unknown };
  if (win.mermaid) {
    mermaidLoadPromise = Promise.resolve();
    return mermaidLoadPromise;
  }

  mermaidLoadPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js';
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Mermaid'));
    document.head.appendChild(script);
  });

  return mermaidLoadPromise;
}

// ─── Mermaid Diagram Renderer ─────────────────────

interface MermaidDiagramProps {
  diagram: Diagram;
  index: number;
}

function MermaidDiagram({ diagram, index }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [rendered, setRendered] = useState(false);

  const renderDiagram = useCallback(async () => {
    const container = containerRef.current;
    if (!container || diagram.type !== 'mermaid') return;

    container.innerHTML = '';
    setRendered(false);
    setError(null);

    try {
      await loadMermaid();

      const win = window as Window & { mermaid?: unknown };
      const m = win.mermaid as {
        initialize: (cfg: object) => void;
        render: (id: string, code: string) => Promise<{ svg: string }>;
      };

      if (!m?.render) {
        setError('Diagram library not available. Please refresh.');
        return;
      }

      m.initialize({
        startOnLoad: false,
        theme: 'dark',
        themeVariables: {
          primaryColor: '#6366f1',
          primaryTextColor: '#f1f5f9',
          primaryBorderColor: '#6366f1',
          lineColor: '#475569',
          secondaryColor: '#1e293b',
          tertiaryColor: '#0f172a',
          background: '#0a0f1e',
          mainBkg: '#111827',
          nodeBorder: '#6366f1',
          clusterBkg: '#0f172a',
          titleColor: '#f1f5f9',
          edgeLabelBackground: '#1e293b',
          attributeBackgroundColorEven: '#111827',
          attributeBackgroundColorOdd: '#0f172a',
        },
        securityLevel: 'loose',
        fontFamily: "'Inter', system-ui, sans-serif",
      });

      const id = `mermaid-${index}-${Date.now()}`;
      const { svg } = await m.render(id, diagram.code);
      if (containerRef.current) {
        containerRef.current.innerHTML = svg;
        setRendered(true);
      }
    } catch (err) {
      console.error('Mermaid render error:', err);
      setError('Diagram could not be rendered.');
    }
  }, [diagram.code, diagram.type, index]);

  useEffect(() => {
    renderDiagram();
  }, [renderDiagram]);

  if (error) {
    return (
      <div className="diagram-error">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
          <line x1="12" y1="9" x2="12" y2="13" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className={`diagram-container ${rendered ? 'diagram-container--ready' : ''}`}>
      {!rendered && (
        <div className="diagram-loading" aria-label="Loading diagram">
          <div className="spinner" />
          <span>Rendering diagram…</span>
        </div>
      )}
      <div ref={containerRef} className="diagram-mermaid" aria-label={diagram.title} />
    </div>
  );
}

// ─── Status & Category configs ─────────────────────

const STATUS_CONFIG = {
  production:    { label: 'Production',  className: 'badge--green' },
  completed:     { label: 'Completed',   className: 'badge--cyan' },
  'in-progress': { label: 'In Progress', className: 'badge--amber' },
};

const CATEGORY_LABELS = {
  enterprise: 'Enterprise AI',
  personal:   'AI System',
  internship: 'Applied AI',
};

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const project = projectId ? getProjectById(projectId) : undefined;

  // 404 redirect
  useEffect(() => {
    if (!project) {
      navigate('/', { replace: true });
    }
  }, [project, navigate]);

  if (!project) return null;

  const statusCfg = STATUS_CONFIG[project.status];

  return (
    <main className="project-detail">
      {/* Unified Hero Header with Breadcrumbs */}
      <header className="project-detail__header mesh-bg">
        <div className="container project-detail__header-content">
          {/* Breadcrumb Navigation */}
          <nav className="project-detail__breadcrumb" aria-label="Breadcrumb">
            <Link to="/#projects" className="project-detail__breadcrumb-back">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span>Back to Projects</span>
            </Link>
            <span className="project-detail__breadcrumb-sep" aria-hidden="true">/</span>
            <span className="project-detail__breadcrumb-current">{project.name}</span>
          </nav>

          {/* Badges */}
          <div className="project-detail__badges">
            <span className={`badge ${statusCfg.className}`}>
              {project.status === 'production' && (
                <span className="project-card__pulse" aria-hidden="true" />
              )}
              {statusCfg.label}
            </span>
            <span className="badge badge--primary">
              {CATEGORY_LABELS[project.category]}
            </span>
          </div>

          {/* Title & Full Description */}
          <h1 className="project-detail__title">
            {project.name}
          </h1>
          <p className="project-detail__subtitle">
            {project.fullDescription}
          </p>

          {/* Metrics row */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="project-detail__metrics">
              {project.metrics.map((m) => (
                <div key={m.label} className="project-detail__metric">
                  <span className="project-detail__metric-value gradient-text">
                    {m.value}
                  </span>
                  <span className="project-detail__metric-label">{m.label}</span>
                </div>
              ))}
            </div>
          )}

          {/* Action Links */}
          {(project.githubUrl || project.liveUrl) && (
            <div className="project-detail__links">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn--outline btn--sm">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15" aria-hidden="true">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  View on GitHub
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn--primary btn--sm">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  Live Deployment
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Main content grid */}
      <div className="container project-detail__body">
        <div className="project-detail__layout">
          {/* Main column */}
          <div className="project-detail__main">
            {/* Key Capabilities */}
            <section className="project-detail__section" aria-labelledby="capabilities-heading">
              <h2 id="capabilities-heading" className="project-detail__section-title">
                Key Capabilities
              </h2>
              <ul className="project-detail__capabilities">
                {project.capabilities.map((cap) => (
                  <li key={cap}>
                    <span className="project-detail__cap-check" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    {cap}
                  </li>
                ))}
              </ul>
            </section>

            {/* Project Media & Live Walkthrough */}
            {project.media && project.media.length > 0 && (
              <section className="project-detail__section" aria-labelledby="media-heading">
                <h2 id="media-heading" className="project-detail__section-title">
                  Live Walkthrough & Interface
                </h2>
                <div className="project-detail__media-grid">
                  {project.media.map((item, idx) => (
                    <div key={item.title} className="project-detail__media-card card">
                      <div className="project-detail__media-header">
                        <h3 className="project-detail__media-title">
                          <span className="project-detail__media-num">0{idx + 1}</span>
                          {item.title}
                        </h3>
                        <span className="badge badge--cyan">{item.type.toUpperCase()}</span>
                      </div>
                      {item.type === 'video' ? (() => {
                        const driveMatch = item.url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
                        const ytMatch = item.url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([a-zA-Z0-9_-]+)/);
                        const isDrive = Boolean(driveMatch) || (item.url.includes('drive.google.com') && item.url.includes('/preview'));
                        const isYt = Boolean(ytMatch);
                        const embedUrl = driveMatch
                          ? `https://drive.google.com/file/d/${driveMatch[1]}/preview`
                          : ytMatch
                          ? `https://www.youtube.com/embed/${ytMatch[1]}`
                          : item.url;

                        return (
                          <div className="project-detail__video-wrapper">
                            {isDrive || isYt ? (
                              <iframe
                                src={embedUrl}
                                title={item.title}
                                className="project-detail__video-iframe"
                                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                                allowFullScreen
                              />
                            ) : (
                              <video
                                src={item.url}
                                controls
                                autoPlay
                                muted
                                playsInline
                                preload="auto"
                                className="project-detail__video"
                                poster={project.featuredImage}
                              >
                                <source src={item.url} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            )}
                            <div className="project-detail__video-actions">
                              <a
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-detail__video-action-link"
                              >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                  <polyline points="15 3 21 3 21 9" />
                                  <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                                <span>Open Video Link</span>
                              </a>
                            </div>
                          </div>
                        );
                      })() : (
                        <div className="project-detail__image-wrapper">
                          <img
                            src={item.url}
                            alt={item.title}
                            className="project-detail__image"
                            loading="lazy"
                          />
                        </div>
                      )}
                      {item.caption && (
                        <p className="project-detail__media-caption">{item.caption}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Architecture diagrams */}
            {project.diagrams.length > 0 && (
              <section className="project-detail__section" aria-labelledby="diagrams-heading">
                <h2 id="diagrams-heading" className="project-detail__section-title">
                  Architecture & Diagrams
                </h2>
                <div className="project-detail__diagrams">
                  {project.diagrams.map((d, idx) => (
                    <div key={d.title} className="project-detail__diagram-item">
                      <h3 className="project-detail__diagram-title">
                        <span className="project-detail__diagram-num">0{idx + 1}</span>
                        {d.title}
                      </h3>
                      <MermaidDiagram diagram={d} index={idx} />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="project-detail__sidebar" aria-label="Project details">
            {/* Tech stack */}
            <div className="project-detail__sidebar-card card">
              <h3 className="project-detail__sidebar-title">Tech Stack</h3>
              <div className="project-detail__tech-list">
                {project.tech.map((t) => (
                  <span key={t} className="tag tag--primary">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Project info card */}
            <div className="project-detail__sidebar-card card">
              <h3 className="project-detail__sidebar-title">Project Info</h3>
              <dl className="project-detail__info-list">
                <div>
                  <dt>Category</dt>
                  <dd>{CATEGORY_LABELS[project.category]}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>
                    <span className={`badge ${statusCfg.className}`}>
                      {project.status === 'production' && (
                        <span className="project-card__pulse" aria-hidden="true" />
                      )}
                      {statusCfg.label}
                    </span>
                  </dd>
                </div>
                {project.diagrams.length > 0 && (
                  <div>
                    <dt>Architecture Diagrams</dt>
                    <dd>{project.diagrams.length} interactive diagrams</dd>
                  </div>
                )}
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
