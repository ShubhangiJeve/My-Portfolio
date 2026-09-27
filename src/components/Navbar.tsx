import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { PersonalInfo } from '../types';
import OpenToWorkAvatar from './OpenToWorkAvatar';
import ProfileCardModal from './ProfileCardModal';
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
  const [scrolled, setScrolled]                     = useState(false);
  const [mobileOpen, setMobileOpen]                 = useState(false);
  const [activeSection, setActiveSection]           = useState('');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const avatarSrc = personalInfo.avatarUrl || `${import.meta.env.BASE_URL}profile.jpg`;

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
    const onResize = () => { if (window.innerWidth > 860) setMobileOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close mobile menu on ESC key
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
    <>
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      <div className="navbar__container container">
        {/* Logo & OpenToWork Profile */}
        <div className="navbar__logo">
          <button
            type="button"
            className="navbar__avatar-btn"
            onClick={() => setIsProfileModalOpen(true)}
            aria-label="View profile summary"
            title="Click to view profile summary"
          >
            {avatarSrc ? (
              <OpenToWorkAvatar
                src={avatarSrc}
                alt={personalInfo.name}
                size={38}
                showFrame={true}
                priority={true}
              />
            ) : (
              <span className="navbar__logo-icon" aria-hidden="true">SJ</span>
            )}
          </button>
          <Link
            to="/"
            className="navbar__logo-name"
            aria-label={`${personalInfo.name}, home`}
          >
            {personalInfo.name}
          </Link>
        </div>

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
    </header>

    {/* Mobile Menu — rendered as a sibling of <header>, not a descendant of it.
        <header> has backdrop-filter, which establishes a containing block for
        fixed-position descendants; nesting this fixed panel inside it would
        collapse its height against the 64px header instead of the viewport. */}
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
          className="btn btn--primary navbar__mobile-resume"
          onClick={() => { setMobileOpen(false); onResumeOpen(); }}
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

    {/* Profile Card Summary Modal */}
    <ProfileCardModal
      isOpen={isProfileModalOpen}
      onClose={() => setIsProfileModalOpen(false)}
      personalInfo={personalInfo}
      onResumeOpen={onResumeOpen}
    />
    </>
  );
}
