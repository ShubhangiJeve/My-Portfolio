import { useEffect, useRef, useState, useCallback } from 'react';
import './ResumeModal.css';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  /** Path relative to public dir — e.g. '/resume.pdf' */
  resumePath: string;
  candidateName: string;
}

export default function ResumeModal({
  isOpen,
  onClose,
  resumePath,
  candidateName,
}: ResumeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const viewerScrollRef = useRef<HTMLDivElement>(null);

  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Focus trap + close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const prevFocus = document.activeElement as HTMLElement;
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap
      if (e.key !== 'Tab') return;
      const modal = modalRef.current;
      if (!modal) return;

      const focusable = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      prevFocus?.focus();
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  const downloadFileName = 'Shubhangi_Jeve_Resume.pdf';

  // Ensure path correctly handles GitHub Pages subpath (/My-Portfolio/)
  const resolvedResumePath = resumePath.startsWith('http')
    ? resumePath
    : resumePath.startsWith(import.meta.env.BASE_URL)
    ? resumePath
    : `${import.meta.env.BASE_URL}${resumePath.replace(/^\//, '')}`;

  const page1Webp = `${import.meta.env.BASE_URL}resume-page-1.webp`;
  const page1Png = `${import.meta.env.BASE_URL}resume-page-1.png`;
  const page2Webp = `${import.meta.env.BASE_URL}resume-page-2.webp`;
  const page2Png = `${import.meta.env.BASE_URL}resume-page-2.png`;

  const handleDownload = async () => {
    try {
      const response = await fetch(resolvedResumePath);
      if (!response.ok) throw new Error('Download failed');
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = downloadFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1500);
    } catch {
      // Fallback: open in new tab
      window.open(resolvedResumePath, '_blank');
    }
  };

  const handleZoomIn = () => setZoomLevel((z) => Math.min(150, z + 15));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(70, z - 15));
  const handleZoomReset = () => setZoomLevel(100);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onClick={handleBackdropClick}
      aria-hidden={!isOpen}
    >
      <div
        ref={modalRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={`${candidateName}'s Resume`}
      >
        {/* Modal header */}
        <div className="modal__header">
          <div className="modal__header-left">
            <div className="modal__icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div>
              <h2 className="modal__title">{candidateName}</h2>
              <p className="modal__subtitle">PDF Document</p>
            </div>
          </div>

          {/* Center Zoom Controls */}
          <div className="modal__zoom-bar" aria-label="Zoom controls">
            <button
              type="button"
              className="modal__zoom-btn"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 70}
              title="Zoom Out (-)"
              aria-label="Zoom out"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
            <button
              type="button"
              className="modal__zoom-reset"
              onClick={handleZoomReset}
              title="Reset Zoom to 100%"
            >
              {zoomLevel}%
            </button>
            <button
              type="button"
              className="modal__zoom-btn"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 150}
              title="Zoom In (+)"
              aria-label="Zoom in"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>

          {/* Action buttons */}
          <div className="modal__actions">
            <button
              onClick={handleDownload}
              className="btn btn--primary btn--sm"
              aria-label="Download resume as PDF"
              type="button"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>Download PDF</span>
            </button>

            <a
              href={resolvedResumePath}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost btn--sm"
              aria-label="Open resume in new tab"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span>Open Tab</span>
            </a>

            <button
              ref={closeButtonRef}
              className="modal__close"
              onClick={onClose}
              aria-label="Close resume modal"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Body / Pure PDF Viewer */}
        <div className="modal__viewer" ref={viewerScrollRef}>
          <div
            className="modal__pdf-pages"
            style={{
              width: zoomLevel !== 100 ? `${zoomLevel}%` : '100%',
              maxWidth: zoomLevel !== 100 ? `${Math.round(840 * (zoomLevel / 100))}px` : '840px',
            }}
          >
            {/* Page 1 */}
            <div className="modal__pdf-page">
              <picture>
                <source srcSet={page1Webp} type="image/webp" />
                <img
                  src={page1Png}
                  alt={`${candidateName} Resume - Page 1`}
                  className="modal__pdf-sheet"
                  loading="eager"
                />
              </picture>
            </div>

            {/* Page 2 */}
            <div className="modal__pdf-page">
              <picture>
                <source srcSet={page2Webp} type="image/webp" />
                <img
                  src={page2Png}
                  alt={`${candidateName} Resume - Page 2`}
                  className="modal__pdf-sheet"
                  loading="lazy"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
