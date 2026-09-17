import { useState, useCallback, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { portfolioData } from './data/portfolioData';
import Navbar      from './components/Navbar';
import Hero        from './components/Hero';
import Footer      from './components/Footer';
import ResumeModal from './components/ResumeModal';

// ── Lazy-load everything below the fold ──────────────────────────────────────
const About        = lazy(() => import('./components/About'));
const Profile      = lazy(() => import('./components/Profile'));
const Experience   = lazy(() => import('./components/Experience'));
const Projects     = lazy(() => import('./components/Projects'));
const Skills       = lazy(() => import('./components/Skills'));
const Contact      = lazy(() => import('./components/Contact'));
const ProjectDetail = lazy(() => import('./components/ProjectDetail'));

import './index.css';
import './App.css';

// Minimal inline fallback — no layout shift, matches dark bg
function SectionFallback() {
  return (
    <div
      style={{
        minHeight: '320px',
        background: 'var(--color-bg-base)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-hidden="true"
    />
  );
}

// ─── Main portfolio home page ─────────────────────

function HomePage({ onResumeOpen }: { onResumeOpen: () => void }) {
  const { personalInfo, experience, projects, skillCategories } = portfolioData;

  return (
    <main id="main-content">
      {/* Hero is above the fold — always eager */}
      <Hero personalInfo={personalInfo} onResumeOpen={onResumeOpen} />

      {/* Everything below the fold is lazy */}
      <Suspense fallback={<SectionFallback />}>
        <About personalInfo={personalInfo} />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Profile personalInfo={personalInfo} />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Experience experience={experience} />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Projects projects={projects} />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Skills skillCategories={skillCategories} />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Contact personalInfo={personalInfo} />
      </Suspense>
    </main>
  );
}

// ─── Root App with Router ─────────────────────────

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const openResume  = useCallback(() => setIsResumeOpen(true),  []);
  const closeResume = useCallback(() => setIsResumeOpen(false), []);

  const { personalInfo } = portfolioData;

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      {/* Skip to content — accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar personalInfo={personalInfo} onResumeOpen={openResume} />

      <Routes>
        <Route
          path="/"
          element={<HomePage onResumeOpen={openResume} />}
        />
        <Route
          path="/projects/:projectId"
          element={
            <Suspense fallback={<SectionFallback />}>
              <ProjectDetail />
            </Suspense>
          }
        />
        {/* 404 fallback */}
        <Route
          path="*"
          element={<HomePage onResumeOpen={openResume} />}
        />
      </Routes>

      <Footer personalInfo={personalInfo} onResumeOpen={openResume} />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={closeResume}
        resumePath={`${import.meta.env.BASE_URL}resume.pdf`}
        candidateName={personalInfo.name}
      />
    </BrowserRouter>
  );
}
