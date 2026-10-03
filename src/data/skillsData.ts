// ─────────────────────────────────────────────
//  Skills Data: single source of truth
//  Synchronized with resume Core Stack:
//  1. AI / LLMs
//  2. RAG & Search
//  3. Backend & APIs
//  4. MLOps & Cloud
//  Every skill carries proficiency level and project usage.
// ─────────────────────────────────────────────

import type { SkillCategory } from '../types';

const DEVICONS = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';
const SIMPLEICONS = 'https://cdn.simpleicons.org';
const LOBEHUB = 'https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@1.95.1/icons';

export const skillCategories: SkillCategory[] = [
  {
    id: 'ai-llms',
    label: 'AI / LLMs',
    icon: '',
    skills: [
      { name: 'OpenAI (GPT-4o)',            logoUrl: `${LOBEHUB}/openai.svg`,                 level: 'core', usedIn: 'MeetOps, LedgerLens-AI' },
      { name: 'DeepSeek R1',                logoUrl: `${LOBEHUB}/deepseek.svg`,               level: 'core', usedIn: 'LedgerLens-AI (forensic deduction & multi-model routing)' },
      { name: 'Claude 3.5',                 logoUrl: `${LOBEHUB}/claude.svg`,                 level: 'core', usedIn: 'LedgerLens-AI, Granite Buyer Intelligence' },
      { name: 'Azure OpenAI',               logoUrl: `${DEVICONS}/azure/azure-original.svg`,   level: 'proficient', usedIn: 'Enterprise AI & secure tenant deployments' },
      { name: 'Llama 3.3',                  logoUrl: `${SIMPLEICONS}/meta/0081fb`,             level: 'proficient', usedIn: 'LegalAID, MeetOps' },
      { name: 'Google Gemini',              logoUrl: `${SIMPLEICONS}/googlegemini/8e75b3`,    level: 'proficient', usedIn: 'Text-to-SQL, Insurance Claim Automation' },
      { name: 'Fine-Tuning & Integration',  logoUrl: `${SIMPLEICONS}/huggingface/ff9d00`,        level: 'proficient', usedIn: 'Domain adaptation & custom embedding fine-tuning' },
      { name: 'LangChain',                  logoUrl: `${SIMPLEICONS}/langchain/1c3c3c`,       level: 'core', usedIn: 'Text-to-SQL, Insurance Claim Automation' },
      { name: 'LangGraph',                  logoUrl: `${SIMPLEICONS}/langgraph/1c3c3c`,       level: 'core', usedIn: 'MeetOps (stateful multi-agent workflows)' },
      { name: 'AI Orchestration',           logoUrl: `${SIMPLEICONS}/openrouter/000000`,      level: 'core', usedIn: 'Argus, LedgerLens-AI (dynamic routing & failover)' },
      { name: 'Multi-Agent Architectures',  logoUrl: `${LOBEHUB}/anthropic.svg`,              level: 'core', usedIn: 'Argus (hierarchical planner-specialist framework)' },
      { name: 'Prompt Engineering',         logoUrl: `${LOBEHUB}/openai.svg`,                 level: 'core', usedIn: 'Structured outputs, system prompts & hallucination guardrails' },
      { name: 'Prompt-Caching & Registry',  logoUrl: `${DEVICONS}/redis/redis-original.svg`,   level: 'core', usedIn: 'LedgerLens-AI, LegalAID (reduced TTFT by 350ms)' },
    ],
  },
  {
    id: 'rag-search',
    label: 'RAG & Search',
    icon: '',
    skills: [
      { name: 'Retrieval-Augmented Gen (RAG)', logoUrl: `${SIMPLEICONS}/huggingface/ff9d00`,     level: 'core', usedIn: 'LegalAID, MeetOps, Healthcare RAG, RAG QA' },
      { name: 'Semantic Search',            logoUrl: `${SIMPLEICONS}/huggingface/ff9d00`,     level: 'core', usedIn: 'LegalAID (dense-lexical fusion & parent-child chunking)' },
      { name: 'Azure AI Search',            logoUrl: `${DEVICONS}/azure/azure-original.svg`,   level: 'proficient', usedIn: 'Enterprise hybrid RAG & index orchestration' },
      { name: 'Weaviate',                   logoUrl: `${import.meta.env.BASE_URL}weaviate.svg`, level: 'proficient', usedIn: 'Hybrid vector retrieval & multi-tenant indexing' },
      { name: 'FAISS',                      logoUrl: `${SIMPLEICONS}/meta/0081fb`,             level: 'proficient', usedIn: 'Healthcare RAG' },
      { name: 'pgvector (Azure PostgreSQL)', logoUrl: `${SIMPLEICONS}/postgresql/336791`,       level: 'core', usedIn: 'LegalAID, MeetOps, Granite Buyer Intelligence' },
      { name: 'ChromaDB',                   logoUrl: `${SIMPLEICONS}/chroma/000000`,           level: 'proficient', usedIn: 'RAG Document QA System' },
    ],
  },
  {
    id: 'backend-apis',
    label: 'Backend & APIs',
    icon: '',
    skills: [
      { name: 'Python',                     logoUrl: `${DEVICONS}/python/python-original.svg`, level: 'core', usedIn: 'All core AI pipelines & services' },
      { name: 'FastAPI',                    logoUrl: `${SIMPLEICONS}/fastapi/009688`,         level: 'core', usedIn: 'LegalAID, MeetOps, Argus, LedgerLens-AI, Granite' },
      { name: 'Flask',                      logoUrl: `${SIMPLEICONS}/flask/000000`,           level: 'proficient', usedIn: 'Healthcare RAG, Insurance Claim Automation' },
      { name: 'REST APIs & Microservices',  logoUrl: `${SIMPLEICONS}/fastapi/009688`,         level: 'core', usedIn: 'Async AI microservices across production systems' },
      { name: 'Pydantic',                   logoUrl: `${SIMPLEICONS}/pydantic/E92063`,        level: 'core', usedIn: 'Data contracts, schema validation, LedgerLens-AI' },
      { name: 'Structured Outputs',         logoUrl: `${LOBEHUB}/openai.svg`,                 level: 'core', usedIn: 'JSON schema repair loops (99.4% adherence)' },
      { name: 'PostgreSQL, PgSQL',          logoUrl: `${DEVICONS}/postgresql/postgresql-original.svg`, level: 'core', usedIn: 'LegalAID, MeetOps, Granite, LedgerLens-AI' },
      { name: 'Async Programming',          logoUrl: `${SIMPLEICONS}/aiohttp/2C5BB4`,         level: 'core', usedIn: 'FastAPI async handlers, aiohttp, concurrent execution' },
    ],
  },
  {
    id: 'mlops-cloud',
    label: 'MLOps & Cloud',
    icon: '',
    skills: [
      { name: 'Databricks (Unity Catalog)', logoUrl: `${SIMPLEICONS}/databricks/FF3621`,      level: 'core', usedIn: 'LedgerLens-AI (Delta Lake, RBAC governance, audit logging)' },
      { name: 'Delta Lake & PySpark',       logoUrl: `${SIMPLEICONS}/apachespark/E25A1C`,     level: 'proficient', usedIn: 'High-throughput financial ETL & distributed batching' },
      { name: 'MLflow',                     logoUrl: `${SIMPLEICONS}/mlflow/0194E2`,          level: 'proficient', usedIn: 'Model tracking, evaluation metrics & prompt versioning' },
      { name: 'MLOps & Model Monitoring',   logoUrl: `${SIMPLEICONS}/langfuse/000000`,        level: 'core', usedIn: 'Model deployment, latency tracking & quality tuning' },
      { name: 'Containerization (Docker)',  logoUrl: `${DEVICONS}/docker/docker-original.svg`, level: 'core', usedIn: 'LegalAID, MeetOps, Argus, LedgerLens-AI, RAG QA' },
      { name: 'Kubernetes',                 logoUrl: `${DEVICONS}/kubernetes/kubernetes-plain.svg`, level: 'proficient', usedIn: 'Container orchestration & scalable cluster deployment' },
      { name: 'Azure Cloud Platform',       logoUrl: `${DEVICONS}/azure/azure-original.svg`,   level: 'core', usedIn: 'Argus production VM, Azure AI Search, Azure PostgreSQL' },
      { name: 'CI/CD',                      logoUrl: `${DEVICONS}/github/github-original.svg`, level: 'core', usedIn: 'Automated test suites & deployment pipelines' },
      { name: 'Git & GitLab',               logoUrl: `${DEVICONS}/gitlab/gitlab-original.svg`, level: 'core', usedIn: 'Enterprise version control & collaborative workflows' },
    ],
  },
  {
    id: 'languages',
    label: 'Languages',
    icon: '',
    skills: [
      { name: 'Python',            logoUrl: `${DEVICONS}/python/python-original.svg`,         level: 'core', usedIn: 'LegalAID, MeetOps, Argus, LedgerLens-AI' },
      { name: 'TypeScript',        logoUrl: `${DEVICONS}/typescript/typescript-original.svg`, level: 'proficient', usedIn: 'LegalAID, MeetOps, Argus, Portfolio' },
      { name: 'SQL',               logoUrl: `${DEVICONS}/postgresql/postgresql-original.svg`, level: 'core', usedIn: 'LegalAID, Text-to-SQL, MeetOps, PgSQL' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    icon: '',
    skills: [
      { name: 'React',             logoUrl: `${DEVICONS}/react/react-original.svg`,     level: 'core', usedIn: 'MeetOps, Argus, Healthcare RAG, Portfolio' },
      { name: 'Next.js',           logoUrl: `${DEVICONS}/nextjs/nextjs-original.svg`,   level: 'proficient', usedIn: 'LegalAID' },
      { name: 'Tailwind CSS',      logoUrl: `${SIMPLEICONS}/tailwindcss/06B6D4`,        level: 'proficient', usedIn: 'Healthcare RAG, Portfolio' },
    ],
  },
  {
    id: 'ai-ml',
    label: 'AI & Machine Learning',
    icon: '',
    skills: [
      { name: 'TensorFlow',        logoUrl: `${DEVICONS}/tensorflow/tensorflow-original.svg`, level: 'familiar' },
      { name: 'PyTorch',           logoUrl: `${DEVICONS}/pytorch/pytorch-original.svg`,       level: 'familiar' },
      { name: 'Scikit-learn',      logoUrl: `${DEVICONS}/scikitlearn/scikitlearn-original.svg`, level: 'familiar' },
      { name: 'NumPy',             logoUrl: `${DEVICONS}/numpy/numpy-original.svg`,           level: 'proficient' },
      { name: 'Pandas',            logoUrl: `${DEVICONS}/pandas/pandas-original.svg`,         level: 'proficient' },
      { name: 'Hugging Face',      logoUrl: `${SIMPLEICONS}/huggingface/ff9d00`,              level: 'familiar', usedIn: 'Healthcare RAG, sentence-transformers' },
    ],
  },
];
