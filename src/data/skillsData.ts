// ─────────────────────────────────────────────
//  Skills Data: single source of truth
//  Every skill carries a proficiency level and,
//  where it applies, the project it was used in.
//  Logo sources: devicons, simpleicons, and lobehub CDNs
// ─────────────────────────────────────────────

import type { SkillCategory } from '../types';

const DEVICONS = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';
const SIMPLEICONS = 'https://cdn.simpleicons.org';
const LOBEHUB = 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.95.1/icons';

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages',
    icon: '',
    skills: [
      { name: 'Python',     logoUrl: `${DEVICONS}/python/python-original.svg`,         level: 'core', usedIn: 'LegalAID, MeetOps, Argus, Text-to-SQL, Healthcare RAG' },
      { name: 'TypeScript', logoUrl: `${DEVICONS}/typescript/typescript-original.svg`, level: 'proficient', usedIn: 'LegalAID, MeetOps, Argus frontends' },
      { name: 'SQL',        logoUrl: `${DEVICONS}/postgresql/postgresql-original.svg`, level: 'core', usedIn: 'LegalAID, Text-to-SQL, MeetOps' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend & APIs',
    icon: '',
    skills: [
      { name: 'FastAPI',      logoUrl: `${SIMPLEICONS}/fastapi/009688`,     level: 'core', usedIn: 'LegalAID, MeetOps, Argus' },
      { name: 'Pydantic v2',  logoUrl: `${SIMPLEICONS}/pydantic/E92063`,    level: 'core', usedIn: 'LegalAID, Argus' },
      { name: 'SQLAlchemy',   logoUrl: `${SIMPLEICONS}/sqlalchemy/D71F00`,  level: 'proficient', usedIn: 'LegalAID' },
      { name: 'Flask',        logoUrl: `${SIMPLEICONS}/flask/000000`,       level: 'proficient', usedIn: 'Healthcare RAG, Insurance Claim Automation' },
      { name: 'Streamlit',    logoUrl: `${SIMPLEICONS}/streamlit/ff4b4b`,   level: 'familiar', usedIn: 'Text-to-SQL' },
    ],
  },
  {
    id: 'ai-ml',
    label: 'AI & Machine Learning',
    icon: '',
    skills: [
      { name: 'TensorFlow',   logoUrl: `${DEVICONS}/tensorflow/tensorflow-original.svg`, level: 'familiar' },
      { name: 'PyTorch',      logoUrl: `${DEVICONS}/pytorch/pytorch-original.svg`,       level: 'familiar' },
      { name: 'Scikit-learn', logoUrl: `${DEVICONS}/scikitlearn/scikitlearn-original.svg`, level: 'familiar' },
      { name: 'NumPy',        logoUrl: `${DEVICONS}/numpy/numpy-original.svg`,           level: 'proficient' },
      { name: 'Pandas',       logoUrl: `${DEVICONS}/pandas/pandas-original.svg`,         level: 'proficient' },
      { name: 'Keras',        logoUrl: `${DEVICONS}/keras/keras-original.svg`,           level: 'familiar' },
      { name: 'Hugging Face', logoUrl: `${SIMPLEICONS}/huggingface/ff9d00`,              level: 'familiar', usedIn: 'Healthcare RAG' },
    ],
  },
  {
    id: 'genai',
    label: 'Generative AI & Agents',
    icon: '',
    skills: [
      { name: 'LangChain',     logoUrl: `${SIMPLEICONS}/langchain/1c3c3c`,     level: 'core', usedIn: 'Text-to-SQL, Insurance Claim Automation' },
      { name: 'LangGraph',     logoUrl: `${SIMPLEICONS}/langgraph/1c3c3c`,     level: 'proficient', usedIn: 'MeetOps' },
      { name: 'OpenAI',        logoUrl: `${LOBEHUB}/openai.svg`,               level: 'proficient', usedIn: 'MeetOps' },
      { name: 'Google Gemini', logoUrl: `${SIMPLEICONS}/googlegemini/8e75b3`,  level: 'proficient', usedIn: 'Text-to-SQL, Insurance Claim Automation' },
      { name: 'Groq',          logoUrl: `${LOBEHUB}/groq.svg`,                 level: 'proficient', usedIn: 'LegalAID, Text-to-SQL' },
      { name: 'OpenRouter',    logoUrl: `${SIMPLEICONS}/openrouter/000000`,    level: 'proficient', usedIn: 'Argus (LLM gateway, provider fallback)' },
      { name: 'NVIDIA NIM',    logoUrl: `${SIMPLEICONS}/nvidia/76B900`,        level: 'familiar', usedIn: 'Argus (hosted embedding endpoints)' },
      { name: 'Ollama',        logoUrl: `${SIMPLEICONS}/ollama/000000`,        level: 'familiar' },
      { name: 'Langfuse',      logoUrl: `${SIMPLEICONS}/langfuse/000000`,      level: 'proficient', usedIn: 'Argus (agent, tool call, and token-level tracing)' },
      { name: 'RAGAS',         logoUrl: `${SIMPLEICONS}/ragas/000000`,         level: 'proficient', usedIn: 'Text-to-SQL (context precision, helpfulness scoring)' },
    ],
  },
  {
    id: 'vector-db',
    label: 'Retrieval & Databases',
    icon: '',
    skills: [
      { name: 'pgvector',            logoUrl: `${SIMPLEICONS}/postgresql/336791`,     level: 'core', usedIn: 'LegalAID, MeetOps' },
      { name: 'PostgreSQL',          logoUrl: `${DEVICONS}/postgresql/postgresql-original.svg`, level: 'core', usedIn: 'LegalAID, MeetOps' },
      { name: 'MySQL',               logoUrl: `${DEVICONS}/mysql/mysql-original.svg`, level: 'proficient', usedIn: 'Text-to-SQL' },
      { name: 'Redis',               logoUrl: `${DEVICONS}/redis/redis-original.svg`, level: 'proficient', usedIn: 'MeetOps (response caching)' },
      { name: 'FAISS',               logoUrl: `${SIMPLEICONS}/meta/0081fb`,           level: 'proficient', usedIn: 'Healthcare RAG' },
      { name: 'ChromaDB',            logoUrl: `${SIMPLEICONS}/chroma/000000`,         level: 'familiar', usedIn: 'RAG Document QA System' },
      { name: 'sentence-transformers', logoUrl: `${SIMPLEICONS}/huggingface/ff9d00`,  level: 'familiar', usedIn: 'RAG Document QA System' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: '',
    skills: [
      { name: 'React',        logoUrl: `${DEVICONS}/react/react-original.svg`,     level: 'core', usedIn: 'MeetOps, Argus, Healthcare RAG, RAG Document QA' },
      { name: 'Next.js',      logoUrl: `${DEVICONS}/nextjs/nextjs-original.svg`,   level: 'proficient', usedIn: 'LegalAID' },
      { name: 'Tailwind CSS', logoUrl: `${SIMPLEICONS}/tailwindcss/06B6D4`,        level: 'proficient', usedIn: 'Healthcare RAG' },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Deployment',
    icon: '',
    skills: [
      { name: 'Docker',   logoUrl: `${DEVICONS}/docker/docker-original.svg`, level: 'core', usedIn: 'LegalAID, MeetOps, Argus, RAG Document QA' },
      { name: 'Nginx',    logoUrl: `${SIMPLEICONS}/nginx/009639`,            level: 'proficient', usedIn: 'Argus (reverse proxy, TLS)' },
      { name: 'Azure VM', logoUrl: `${SIMPLEICONS}/microsoftazure/0078D4`,   level: 'proficient', usedIn: 'Argus (production deployment)' },
      { name: 'Git',      logoUrl: `${DEVICONS}/git/git-original.svg`,       level: 'core', usedIn: 'All projects' },
      { name: 'GitHub',   logoUrl: `${DEVICONS}/github/github-original.svg`, level: 'core', usedIn: 'All projects' },
      { name: 'VS Code',  logoUrl: `${DEVICONS}/vscode/vscode-original.svg`, level: 'core' },
      { name: 'Jupyter',  logoUrl: `${DEVICONS}/jupyter/jupyter-original.svg`, level: 'proficient' },
      { name: 'N8N',      logoUrl: `${SIMPLEICONS}/n8n/ea4b71`,              level: 'familiar' },
    ],
  },
];
