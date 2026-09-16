// ─────────────────────────────────────────────
//  Portfolio — Centralized TypeScript Types
// ─────────────────────────────────────────────

export interface PersonalInfo {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  tagline: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
  objective: string;
  profileSummary: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  score: string;
}

// ─── Skills ───────────────────────────────────

export interface SkillItem {
  name: string;
  logoUrl: string;
  /** Optional: override logo color when displayed on dark bg */
  logoColor?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  skills: SkillItem[];
}

// ─── Experience ───────────────────────────────

export interface ExperienceProject {
  name: string;
  description: string;
  points: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  period: string;
  startDate: string;
  endDate: string | 'Present';
  type: 'full-time' | 'internship' | 'contract';
  projects: ExperienceProject[];
  highlight?: string;
}

// ─── Projects ─────────────────────────────────

export type DiagramType = 'mermaid' | 'text';

export interface Diagram {
  type: DiagramType;
  title: string;
  code: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: 'enterprise' | 'personal' | 'internship';
  status: 'production' | 'completed' | 'in-progress';
  tech: string[];
  techLogos?: string[];
  capabilities: string[];
  metrics?: ProjectMetric[];
  diagrams: Diagram[];
  githubUrl?: string;
  liveUrl?: string;
  /** Which experience entry this belongs to (optional) */
  experienceId?: string;
}

// ─── Portfolio Root ────────────────────────────

export interface PortfolioData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skillCategories: SkillCategory[];
}
