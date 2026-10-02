// ─────────────────────────────────────────────
//  Portfolio: centralized TypeScript types
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
  avatarUrl?: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  score: string;
}

// ─── Skills ───────────────────────────────────

export type ProficiencyLevel = 'core' | 'proficient' | 'familiar';

export interface SkillItem {
  name: string;
  logoUrl: string;
  level: ProficiencyLevel;
  /** Where this was actually used, e.g. "LegalAID, Argus". Omitted for baseline tooling. */
  usedIn?: string;
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

export interface ProjectMedia {
  type: 'image' | 'video';
  url: string;
  title: string;
  caption?: string;
  thumbnail?: string;
}

// ─── Rich narrative sub-types ─────────────────

export interface ProjectDataset {
  /** Short summary headline for the dataset */
  summary: string;
  /** Table rows: { label, value } */
  sources: { label: string; value: string }[];
  /** Any notable quality / limitation notes */
  notes?: string[];
}

export interface ProjectProcessStep {
  phase: string;
  points: string[];
}

export interface ProjectChallenge {
  title: string;
  problem: string;
  resolution: string;
  learning: string;
}

export interface ProjectRoleRow {
  area: string;
  contribution: string;
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

  // ── Rich narrative sections (optional) ──────
  /** 1-sentence problem headline + bullet-point problem layers */
  problemStatement?: { headline: string; points: string[] };
  /** Project objective table rows */
  objective?: { number: string; goal: string }[];
  /** Solo / team role breakdown */
  roleType?: 'solo' | 'team';
  roleHighlight?: string;
  roleRows?: ProjectRoleRow[];
  /** Dataset details */
  dataset?: ProjectDataset;
  /** Methodology / tooling narrative rows */
  methodologyRows?: { category: string; detail: string; rationale: string }[];
  /** Step-by-step process phases */
  process?: ProjectProcessStep[];
  /** Challenges & learnings */
  challenges?: ProjectChallenge[];
  /** Short conclusion paragraph shown at the very end */
  conclusion?: string;
  metrics?: ProjectMetric[];
  diagrams: Diagram[];
  githubUrl?: string;
  liveUrl?: string;
  /** Which experience entry this belongs to (optional) */
  experienceId?: string;
  featuredImage?: string;
  media?: ProjectMedia[];
}

// ─── Portfolio Root ────────────────────────────

export interface PortfolioData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skillCategories: SkillCategory[];
}
