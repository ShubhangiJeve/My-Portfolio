import { useState, useEffect } from 'react';
import type { PersonalInfo } from '../types';
import './Footer.css';

interface FooterProps {
  personalInfo: PersonalInfo;
  onResumeOpen: () => void;
}

const SOCIAL_LINKS = (personalInfo: PersonalInfo) => [
  {
    id: 'github',
    label: 'GitHub',
    href: personalInfo.github,
    colorClass: 'footer__social-link--github',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: personalInfo.linkedin,
    colorClass: 'footer__social-link--linkedin',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    id: 'email',
    label: 'Email',
    href: `mailto:${personalInfo.email}`,
    colorClass: 'footer__social-link--email',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
];

export default function Footer({ personalInfo, onResumeOpen }: FooterProps) {
  const year = new Date().getFullYear();
  const links = SOCIAL_LINKS(personalInfo);
  // Default to exactly 1,254 right from the first render
  const [visitCount, setVisitCount] = useState<number>(1254);

  // Free visitor count integration that increments on every refresh/load
  useEffect(() => {
    let isMounted = true;
    const BASE_VISITS = 1254;
    const STORAGE_KEY = 'sj_portfolio_visitor_count';

    // 1. Calculate local increment first (instant UI update)
    let localVisits = BASE_VISITS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        localVisits = parseInt(stored, 10) + 1;
      } else {
        localVisits = BASE_VISITS;
      }
      localStorage.setItem(STORAGE_KEY, localVisits.toString());
      if (isMounted) setVisitCount(localVisits);
    } catch {
      if (isMounted) setVisitCount(BASE_VISITS);
    }

    // 2. Sync with free public counter API
    const syncCounter = async () => {
      try {
        const res = await fetch('https://api.counterapi.dev/v1/shubhangijeve-portfolio/visits/up');
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.count === 'number' && isMounted) {
            const finalCount = Math.max(data.count + BASE_VISITS, localVisits);
            setVisitCount(finalCount);
          }
        }
      } catch {
        // Fallback already running smoothly from local storage
      }
    };

    syncCounter();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer__container">
        {/* Left */}
        <div className="footer__left">
          <div className="footer__brand">
            <div className="footer__logo-mark" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                <path d="M4.93 4.93l2.12 2.12M16.95 16.95l2.12 2.12M4.93 19.07l2.12-2.12M16.95 7.05l2.12-2.12" />
              </svg>
            </div>
            <div>
              <p className="footer__name">{personalInfo.name}</p>
              <p className="footer__role">{personalInfo.role}</p>
            </div>
          </div>
          <p className="footer__location">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Hyderabad, Telangana &mdash; Open to Pune, Ahmedabad, Bengaluru & Remote
          </p>
        </div>

        {/* Middle — quick links */}
        <nav className="footer__nav" aria-label="Footer navigation">
          <p className="footer__nav-title">Quick links</p>
          <ul className="footer__nav-links">
            {['about', 'experience', 'projects', 'skills', 'contact'].map((section) => (
              <li key={section}>
                <button
                  type="button"
                  className="footer__nav-link"
                  onClick={() => {
                    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              </li>
            ))}
            <li>
              <button type="button" className="footer__nav-link" onClick={onResumeOpen}>
                Resume
              </button>
            </li>
          </ul>
        </nav>

        {/* Right — contact & colored social links */}
        <div className="footer__right">
          <p className="footer__nav-title">Connect</p>
          <div className="footer__social">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className={`footer__social-link ${link.colorClass}`}
                aria-label={link.label}
              >
                <span className="footer__social-icon">{link.icon}</span>
                <span className="footer__social-label">{link.label}</span>
              </a>
            ))}
            <a
              href={`tel:${personalInfo.phone}`}
              className="footer__social-link footer__social-link--phone"
              aria-label="Phone"
            >
              <span className="footer__social-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l.9-1.81a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <span className="footer__social-label">{personalInfo.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar with Copyright on Left, Total Visits in Center, Status on Right */}
      <div className="footer__bottom">
        <div className="container footer__bottom-content">
          <p className="footer__copyright">
            &copy; {year} {personalInfo.name}. All rights reserved.
          </p>

          {/* Placed prominently in the middle */}
          <div className="footer__visit-counter" title="Total site visits (increments on refresh)">
            <span className="footer__visit-pulse" aria-hidden="true" />
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="footer__visit-icon"
              aria-hidden="true"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span className="footer__visit-label">Total Visits:</span>
            <span className="footer__visit-count">
              {visitCount.toLocaleString()}
            </span>
          </div>

          <p className="footer__status-badge">
            <span className="footer__status-dot" aria-hidden="true" />
            Available for Hire
          </p>
        </div>
      </div>
    </footer>
  );
}
