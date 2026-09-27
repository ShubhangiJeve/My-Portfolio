import { useState, useCallback, useRef, useEffect } from 'react';
import type { ProficiencyLevel, SkillCategory, SkillItem } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './Skills.css';

interface SkillsProps {
  skillCategories: SkillCategory[];
}

const LEVEL_CONFIG: Record<ProficiencyLevel, { label: string; fill: number }> = {
  core:       { label: 'Core',       fill: 4 },
  proficient: { label: 'Proficient', fill: 3 },
  familiar:   { label: 'Familiar',   fill: 2 },
};

function SkillLogo({ skill }: { skill: SkillItem }) {
  const [imgError, setImgError] = useState(false);

  const handleError = useCallback(() => setImgError(true), []);

  if (imgError) {
    // Fallback: first 2 letters of skill name
    return (
      <span className="skill-logo__fallback" aria-hidden="true">
        {skill.name.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <img
      src={skill.logoUrl}
      alt=""
      className="skill-logo__img"
      aria-hidden="true"
      loading="lazy"
      width={32}
      height={32}
      onError={handleError}
    />
  );
}

function LevelDots({ level }: { level: ProficiencyLevel }) {
  const cfg = LEVEL_CONFIG[level];
  return (
    <span className={`skill-item__dots skill-item__dots--${level}`} aria-hidden="true">
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} className={`skill-item__dot ${i < cfg.fill ? 'skill-item__dot--filled' : ''}`} />
      ))}
    </span>
  );
}

export default function Skills({ skillCategories }: SkillsProps) {
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>();
  const [activeCategory, setActiveCategory] = useState<string>(
    skillCategories[0]?.id ?? ''
  );
  const [isPaused, setIsPaused] = useState(false);
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  const activeGroup = skillCategories.find((c) => c.id === activeCategory);

  const scrollToTab = useCallback((categoryId: string) => {
    const container = tabsContainerRef.current;
    const tabEl = document.getElementById(`tab-${categoryId}`);
    if (container && tabEl) {
      const containerRect = container.getBoundingClientRect();
      const tabRect = tabEl.getBoundingClientRect();
      const currentScrollLeft = container.scrollLeft;
      const targetScrollLeft =
        currentScrollLeft +
        (tabRect.left - containerRect.left) -
        (containerRect.width / 2) +
        (tabRect.width / 2);

      container.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'smooth',
      });
    }
  }, []);

  // Automatically center the active tab in view whenever it changes
  useEffect(() => {
    scrollToTab(activeCategory);
  }, [activeCategory, scrollToTab]);

  // Automatic cycle through skill categories every 4.5 seconds (pauses on hover/interaction)
  useEffect(() => {
    if (!isVisible || isPaused || skillCategories.length <= 1) return;

    const timer = setInterval(() => {
      setActiveCategory((curr) => {
        const currentIndex = skillCategories.findIndex((c) => c.id === curr);
        const nextIndex = (currentIndex + 1) % skillCategories.length;
        return skillCategories[nextIndex].id;
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [isVisible, isPaused, skillCategories]);

  const handlePrevCategory = () => {
    const currentIndex = skillCategories.findIndex((c) => c.id === activeCategory);
    const prevIndex = (currentIndex - 1 + skillCategories.length) % skillCategories.length;
    setActiveCategory(skillCategories[prevIndex].id);
    setIsPaused(true);
  };

  const handleNextCategory = () => {
    const currentIndex = skillCategories.findIndex((c) => c.id === activeCategory);
    const nextIndex = (currentIndex + 1) % skillCategories.length;
    setActiveCategory(skillCategories[nextIndex].id);
    setIsPaused(true);
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section section--alt skills-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
    >
      <div className="container">
        {/* Header */}
        <div className={`section-header reveal ${isVisible ? 'is-visible' : ''}`}>
          <p className="section-label section-label--warm">Skills</p>
          <h2 className="section-title">Technical skills</h2>
          <p className="section-subtitle">
            Languages, frameworks, and tools I have used in shipped work, with proficiency and
            where each one was actually used.
          </p>

          <div className="skills__legend" aria-hidden="true">
            {(Object.keys(LEVEL_CONFIG) as ProficiencyLevel[]).map((level) => (
              <span key={level} className="skills__legend-item">
                <LevelDots level={level} />
                {LEVEL_CONFIG[level].label}
              </span>
            ))}
          </div>
        </div>

        {/* Category tabs with smooth auto-scroll & arrow navigation */}
        <div className={`skills__tabs-wrapper reveal ${isVisible ? 'is-visible' : ''}`}>
          <button
            type="button"
            className="skills__arrow-btn skills__arrow-btn--prev"
            onClick={handlePrevCategory}
            aria-label="Previous skill category"
            title="Previous category"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div
            ref={tabsContainerRef}
            className="skills__tabs"
            role="tablist"
            aria-label="Skill categories"
          >
            {skillCategories.map((category) => (
              <button
                key={category.id}
                role="tab"
                id={`tab-${category.id}`}
                aria-selected={activeCategory === category.id}
                aria-controls={`panel-${category.id}`}
                className={`skills__tab ${activeCategory === category.id ? 'skills__tab--active' : ''}`}
                onClick={() => {
                  setActiveCategory(category.id);
                  setIsPaused(true);
                }}
              >
                {category.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            className="skills__arrow-btn skills__arrow-btn--next"
            onClick={handleNextCategory}
            aria-label="Next skill category"
            title="Next category"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Skills panel */}
        {activeGroup && (
          <div
            id={`panel-${activeGroup.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeGroup.id}`}
            className={`skills__panel reveal ${isVisible ? 'is-visible' : ''}`}
          >
            <div className="skills__grid">
              {activeGroup.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-item"
                  title={skill.usedIn ? `${LEVEL_CONFIG[skill.level].label} — used in ${skill.usedIn}` : LEVEL_CONFIG[skill.level].label}
                >
                  <div className="skill-item__logo">
                    <SkillLogo skill={skill} />
                  </div>
                  <span className="skill-item__name">{skill.name}</span>
                  <LevelDots level={skill.level} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
