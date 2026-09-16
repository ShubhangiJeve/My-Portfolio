// ─────────────────────────────────────────────
//  Skills Data — Grouped with official SVG logos
//  Logo sources: devicons CDN + simpleicons CDN
// ─────────────────────────────────────────────

import type { SkillCategory } from '../types';

const DEVICONS = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';
const SIMPLEICONS = 'https://cdn.simpleicons.org';

export const skillCategories: SkillCategory[] = [
  {
    id: 'languages',
    label: 'Languages & Frameworks',
    icon: '',
    skills: [
      { name: 'Python',      logoUrl: `${DEVICONS}/python/python-original.svg` },
      { name: 'TypeScript',  logoUrl: `${DEVICONS}/typescript/typescript-original.svg` },
      { name: 'SQL',         logoUrl: `${DEVICONS}/postgresql/postgresql-original.svg` },
      { name: 'FastAPI',     logoUrl: `${SIMPLEICONS}/fastapi/4ade80` },
      { name: 'Flask',       logoUrl: `${SIMPLEICONS}/flask/ffffff` },
      { name: 'Next.js',     logoUrl: `${DEVICONS}/nextjs/nextjs-original.svg` },
      { name: 'React',       logoUrl: `${DEVICONS}/react/react-original.svg` },
      { name: 'Streamlit',   logoUrl: `${SIMPLEICONS}/streamlit/ff4b4b` },
    ],
  },
  {
    id: 'ai-ml',
    label: 'AI & Machine Learning',
    icon: '',
    skills: [
      { name: 'TensorFlow',          logoUrl: `${DEVICONS}/tensorflow/tensorflow-original.svg` },
      { name: 'PyTorch',             logoUrl: `${DEVICONS}/pytorch/pytorch-original.svg` },
      { name: 'Scikit-learn',        logoUrl: `${DEVICONS}/scikitlearn/scikitlearn-original.svg` },
      { name: 'Hugging Face',        logoUrl: `${SIMPLEICONS}/huggingface/ffd21e` },
      { name: 'NumPy',               logoUrl: `${DEVICONS}/numpy/numpy-original.svg` },
      { name: 'Pandas',              logoUrl: `${DEVICONS}/pandas/pandas-original.svg` },
      { name: 'Keras',               logoUrl: `${DEVICONS}/keras/keras-original.svg` },
    ],
  },
  {
    id: 'genai',
    label: 'Generative AI & LLMs',
    icon: '',
    skills: [
      { name: 'LangChain',     logoUrl: `${SIMPLEICONS}/langchain/ffffff` },
      { name: 'OpenAI',        logoUrl: `${SIMPLEICONS}/openai/ffffff` },
      { name: 'Google Gemini', logoUrl: `${SIMPLEICONS}/googlegemini/8e75b3` },
      { name: 'Groq',          logoUrl: `${SIMPLEICONS}/groq/f55036` },
      { name: 'Ollama',        logoUrl: `${SIMPLEICONS}/ollama/ffffff` },
      { name: 'RAG',           logoUrl: `${SIMPLEICONS}/pinecone/00c8cf` },
    ],
  },
  {
    id: 'vector-db',
    label: 'Vector & Databases',
    icon: '',
    skills: [
      { name: 'PostgreSQL',  logoUrl: `${DEVICONS}/postgresql/postgresql-original.svg` },
      { name: 'MySQL',       logoUrl: `${DEVICONS}/mysql/mysql-original.svg` },
      { name: 'ChromaDB',    logoUrl: `${SIMPLEICONS}/chroma/ffffff` },
      { name: 'FAISS',       logoUrl: `${SIMPLEICONS}/meta/0081fb` },
      { name: 'Redis',       logoUrl: `${DEVICONS}/redis/redis-original.svg` },
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Tools',
    icon: '',
    skills: [
      { name: 'Docker',      logoUrl: `${DEVICONS}/docker/docker-original.svg` },
      { name: 'Git',         logoUrl: `${DEVICONS}/git/git-original.svg` },
      { name: 'GitHub',      logoUrl: `${DEVICONS}/github/github-original.svg` },
      { name: 'VS Code',     logoUrl: `${DEVICONS}/vscode/vscode-original.svg` },
      { name: 'Jupyter',     logoUrl: `${DEVICONS}/jupyter/jupyter-original.svg` },
      { name: 'N8N',         logoUrl: `${SIMPLEICONS}/n8n/ea4b71` },
    ],
  },
];
