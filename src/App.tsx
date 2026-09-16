import { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { portfolioData } from './data/portfolioData';
import Navbar        from './components/Navbar';
import Hero          from './components/Hero';
import About         from './components/About';
import Profile       from './components/Profile';
import Experience    from './components/Experience';
import Projects      from './components/Projects';
import Skills        from './components/Skills';
import Footer        from './components/Footer';
import ResumeModal   from './components/ResumeModal';
import ProjectDetail from './components/ProjectDetail';
import './index.css';
import './App.css';

// ─── Main portfolio home page ─────────────────────

function HomePage({ onResumeOpen }: { onResumeOpen: () => void }) {
  const { personalInfo, experience, projects, skillCategories } = portfolioData;

  return (
    <main id="main-content">
      <Hero        personalInfo={personalInfo} onResumeOpen={onResumeOpen} />
      <About       personalInfo={personalInfo} />
      <Profile     personalInfo={personalInfo} />
      <Experience  experience={experience} />
      <Projects    projects={projects} />
      <Skills      skillCategories={skillCategories} />
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
          element={<ProjectDetail />}
        />
        {/* 404 fallback — redirect home */}
        <Route
          path="*"
          element={<HomePage onResumeOpen={openResume} />}
        />
      </Routes>

      <Footer personalInfo={personalInfo} onResumeOpen={openResume} />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={closeResume}
        resumePath="/resume.pdf"
        candidateName={personalInfo.name}
      />
    </BrowserRouter>
  );
}
