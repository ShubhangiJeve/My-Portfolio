import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { PersonalInfo } from '../types';
import './Navbar.css';

interface NavLink {
  label: string;
  href: string;
  isPage?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { label: 'About',      href: '/#about' },
  { label: 'Profile',    href: '/#profile' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Projects',   href: '/#projects' },
  { label: 'Skills',     href: '/#skills' },
  { label: 'Contact',    href: '/#contact' },
];

interface NavbarProps {
  personalInfo: PersonalInfo;
  onResumeOpen: () => void;
}

export default function Navbar({ personalInfo, onResumeOpen }: NavbarProps) {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll-aware glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    if (location.pathname !== '/') return;

    const sections = NAV_LINKS.map((l) => l.href.replace('/#', '')).filter(Boolean);
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [location.pathname]);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (href: string) => {
      setMobileOpen(false);
      const [path, hash] = href.split('#');
      if (path === '/' || path === '') {
        if (location.pathname !== '/') {
          navigate('/');
          // Wait for route render then scroll
          setTimeout(() => {
            document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    },
    [location.pathname, navigate]
  );

  const isActive = (href: string) => {
    const section = href.replace('/#', '');
    return activeSection === section;
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      <div className="navbar__container container">
        {/* Logo */}
        <Link
          to="/"
          className="navbar__logo"
          aria-label={`${personalInfo.name} — Home`}
        >
          <span className="navbar__logo-icon" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
            </svg>
          </span>
          <span className="navbar__logo-name">{personalInfo.name}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar__nav" aria-label="Main navigation">
          <ul className="navbar__links" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  className={`navbar__link ${isActive(link.href) ? 'navbar__link--active' : ''}`}
                  onClick={() => handleNavClick(link.href)}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="navbar__actions">
          <button
            className="btn btn--primary btn--sm"
            onClick={onResumeOpen}
            aria-label="View resume"
          >
            Resume
          </button>

          {/* Mobile Hamburger */}
          <button
            className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <nav aria-label="Mobile navigation">
          <ul className="navbar__mobile-links" role="list">
            {NAV_LINKS.map((link, i) => (
              <li
                key={link.href}
                style={{ '--i': i } as React.CSSProperties}
              >
                <button
                  className={`navbar__mobile-link ${isActive(link.href) ? 'navbar__mobile-link--active' : ''}`}
                  onClick={() => handleNavClick(link.href)}
                  tabIndex={mobileOpen ? 0 : -1}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <button
            className="btn btn--primary"
            onClick={() => { setMobileOpen(false); onResumeOpen(); }}
            style={{ marginTop: 'var(--space-6)', width: '100%' }}
            tabIndex={mobileOpen ? 0 : -1}
          >
            View Resume
          </button>
        </nav>
      </div>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="navbar__backdrop"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}
