import { useState, useCallback } from 'react';
import type { SkillCategory, SkillItem } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import './Skills.css';

interface SkillsProps {
  skillCategories: SkillCategory[];
}

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

export default function Skills({ skillCategories }: SkillsProps) {
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>();
  const [activeCategory, setActiveCategory] = useState<string>(
    skillCategories[0]?.id ?? ''
  );

  const activeGroup = skillCategories.find((c) => c.id === activeCategory);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section section--alt skills-section"
    >
      <div className="container">
        {/* Header */}
        <div className={`section-header reveal ${isVisible ? 'is-visible' : ''}`}>
          <p className="section-label">Toolbox</p>
          <h2 className="section-title">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="section-subtitle">
            Technologies I use to design, build, and deploy production AI systems.
          </p>
        </div>

        {/* Category tabs */}
        <div
          className={`skills__tabs reveal reveal-delay-1 ${isVisible ? 'is-visible' : ''}`}
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
              onClick={() => setActiveCategory(category.id)}
            >
              <span aria-hidden="true" className="skills__tab-icon">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Skills panel */}
        {activeGroup && (
          <div
            id={`panel-${activeGroup.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeGroup.id}`}
            className={`skills__panel reveal reveal-delay-2 ${isVisible ? 'is-visible' : ''}`}
          >
            <div className="skills__grid">
              {activeGroup.skills.map((skill, i) => (
                <div
                  key={skill.name}
                  className="skill-item"
                  style={{ '--delay': `${i * 40}ms` } as React.CSSProperties}
                >
                  <div className="skill-item__logo">
                    <SkillLogo skill={skill} />
                  </div>
                  <span className="skill-item__name">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
