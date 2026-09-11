import { portfolioData } from './data/portfolioData';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">{portfolioData.personalInfo.name}</div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <header className="hero" id="home">
        <div className="hero-content">
          <h1>Hi, I'm {portfolioData.personalInfo.name}</h1>
          <h2 className="role">{portfolioData.personalInfo.role}</h2>
          <p className="hero-objective">{portfolioData.personalInfo.objective}</p>
          <div className="hero-cta">
            <a href="#contact" className="btn">Get In Touch</a>
            <a href="#projects" className="btn btn-outline" style={{ marginLeft: '1rem' }}>View Projects</a>
          </div>
        </div>
      </header>

      <section id="about" className="about-section">
        <h2 className="section-title">About Me</h2>
        <div className="about-content card">
          <p>{portfolioData.personalInfo.objective}</p>
          <div className="education-box" style={{ marginTop: '2rem' }}>
            <h3>Education</h3>
            {portfolioData.education.map((edu, index) => (
              <div key={index} className="edu-item" style={{ marginTop: '1rem' }}>
                <h4>{edu.degree}</h4>
                <p><strong>{edu.institution}</strong></p>
                <p className="text-secondary">{edu.period} | {edu.score}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="experience-section">
        <h2 className="section-title">Experience</h2>
        <div className="experience-timeline">
          {portfolioData.experience.map((exp, index) => (
            <div key={index} className="exp-card card" style={{ marginBottom: '2rem' }}>
              <div className="exp-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <h3>{exp.role}</h3>
                  <h4 className="text-secondary">{exp.company} - {exp.location}</h4>
                </div>
                <div className="exp-period" style={{ fontWeight: '500', color: 'var(--primary-color)' }}>
                  {exp.period}
                </div>
              </div>
              <div className="exp-projects">
                {exp.projects.map((proj, idx) => (
                  <div key={idx} className="exp-project" style={{ marginTop: '1rem' }}>
                    <h5>{proj.name}</h5>
                    {proj.description && <p style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}>{proj.description}</p>}
                    <ul style={{ paddingLeft: '1.5rem', fontSize: '0.9rem' }}>
                      {proj.points.map((point, pIdx) => (
                        <li key={pIdx} style={{ marginBottom: '0.3rem' }}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="projects" className="projects-section">
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {portfolioData.personalProjects.map((project, index) => (
            <div key={index} className="project-card card">
              <h3>{project.name}</h3>
              <p className="text-secondary" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{project.tech}</p>
              <p style={{ marginBottom: '1rem', fontWeight: '500' }}>{project.description}</p>
              <ul style={{ paddingLeft: '1.5rem', fontSize: '0.9rem' }}>
                {project.points.map((point, pIdx) => (
                  <li key={pIdx} style={{ marginBottom: '0.3rem' }}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="skills-section">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {Object.entries(portfolioData.skills).map(([category, skillsArray]) => (
            <div key={category} className="skill-category card">
              <h3 style={{ textTransform: 'capitalize', marginBottom: '1rem', color: 'var(--primary-color)' }}>
                {category.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <div className="skill-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {skillsArray.map((skill, index) => (
                  <span key={index} className="skill-tag" style={{ background: 'var(--bg-color)', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', border: '1px solid var(--border-color)' }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section">
        <h2 className="section-title">Contact</h2>
        <div className="contact-content card" style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '2rem' }}>I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
          <div className="contact-links" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <a href={`mailto:${portfolioData.personalInfo.email}`} className="btn">Email Me</a>
            <a href={portfolioData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-outline">LinkedIn</a>
            <a href={portfolioData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">GitHub</a>
          </div>
        </div>
      </section>

      <footer className="footer" style={{ padding: '2rem', textAlign: 'center', background: 'var(--surface-color)', borderTop: '1px solid var(--border-color)' }}>
        <p>© {new Date().getFullYear()} {portfolioData.personalInfo.name}. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;
