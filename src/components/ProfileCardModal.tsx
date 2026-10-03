import { useEffect } from 'react';
import type { PersonalInfo } from '../types';
import OpenToWorkAvatar from './OpenToWorkAvatar';
import './ProfileCardModal.css';

interface ProfileCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  personalInfo: PersonalInfo;
  onResumeOpen: () => void;
}

export default function ProfileCardModal({
  isOpen,
  onClose,
  personalInfo,
  onResumeOpen,
}: ProfileCardModalProps) {
  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const avatarSrc = personalInfo.avatarUrl || `${import.meta.env.BASE_URL}profile.jpg`;

  return (
    <div
      className="profile-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Profile summary"
    >
      {/* Backdrop */}
      <div className="profile-modal__backdrop" onClick={onClose} aria-hidden="true" />

      {/* Card */}
      <div className="profile-modal__card">
        <button
          type="button"
          className="profile-modal__close"
          onClick={onClose}
          aria-label="Close profile card"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Top Header / Avatar */}
        <div className="profile-modal__header">
          <div className="profile-modal__avatar-wrap">
            <OpenToWorkAvatar
              src={avatarSrc}
              alt={personalInfo.name}
              size={80}
              showFrame={true}
              priority={true}
            />
          </div>

          <div className="profile-modal__title-group">
            <h2 className="profile-modal__name">{personalInfo.name}</h2>
            <p className="profile-modal__role">{personalInfo.role}</p>
            <p className="profile-modal__location">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {personalInfo.location} · Open to Relocate & Remote
            </p>
          </div>
        </div>

        {/* Availability Badge */}
        <div className="profile-modal__badge">
          <span className="profile-modal__badge-dot" aria-hidden="true" />
          <span>Available for Full-Time AI & GenAI Roles</span>
        </div>

        {/* 2-3 lines of summary */}
        <div className="profile-modal__summary">
          <p>
            AI Engineer with 1.5+ years of core AI systems development experience specializing in enterprise RAG architectures, multi-agent LLM orchestration, and high-concurrency async backends.
          </p>
          <p>
            At COGNITBOTZ, I architected LegalAID's hybrid retrieval across 25+ years of court data, built MeetOps' real-time agentic Teams copilot, and developed Granite Buyer Intelligence with a resilient multi-tier LLM gateway.
          </p>
        </div>

        {/* Contact links with icons */}
        <div className="profile-modal__actions">
          <p className="profile-modal__actions-heading">Connect with me</p>
          <div className="profile-modal__links">
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-modal__link profile-modal__link--linkedin"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span>LinkedIn</span>
            </a>

            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="profile-modal__link profile-modal__link--github"
              aria-label="GitHub Profile"
              title="GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </a>

            <a
              href={`mailto:${personalInfo.email}`}
              className="profile-modal__link profile-modal__link--email"
              aria-label="Send Email"
              title="Email"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span>Email</span>
            </a>

            <a
              href={`tel:${personalInfo.phone}`}
              className="profile-modal__link profile-modal__link--phone"
              aria-label="Call Phone"
              title="Phone"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.9-1.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>Phone</span>
            </a>
          </div>

          <div className="profile-modal__buttons">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => {
                onClose();
                onResumeOpen();
              }}
              style={{ width: '100%' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              View Full Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
