export const portfolioData = {
  personalInfo: {
    name: "Shubhangi Jeve",
    role: "AI Developer / GenAI Developer",
    phone: "+91-9579122372",
    email: "shubhangijeve@gmail.com",
    github: "https://github.com/ShubhangiJeve",
    linkedin: "https://linkedin.com/in/shubhangi-jeve-97445b235",
    location: "Hyderabad, Telangana",
    objective:
      "AI Engineer with hands-on production experience building end-to-end LLM-powered systems, RAG pipelines, and full-stack AI applications. Proficient in Python, FastAPI, vector databases, and LLM integration using Groq, Gemini, and Hugging Face. Seeking an AI Engineer role to architect and deploy scalable, enterprise-grade intelligent systems.",
  },
  education: [
    {
      degree: "Bachelor of Technology in Artificial Intelligence and Data Science",
      institution: "Terna Public Charitable Trust's College of Engineering, Dharashiv",
      period: "2021 - 2025",
      score: "CGPA: 8.5",
    },
  ],
  skills: {
    languagesAndFrameworks: ["Python", "SQL", "FastAPI", "Flask", "Next.js 14 (TypeScript)", "Streamlit", "React", "React Native"],
    aiAndMachineLearning: [
      "Regression",
      "Classification",
      "Clustering",
      "Feature Engineering",
      "ANN",
      "CNN",
      "Fine-tuning",
      "Prompt Engineering",
    ],
    generativeAI: [
      "Retrieval-Augmented Generation (RAG)",
      "LangChain",
      "LangGraph",
      "Groq API",
      "Google Gemini",
      "Ollama",
      "Open-source LLMs",
    ],
    embeddingsAndVectorSearch: ["sentence-transformers (BGE-M3, multilingual-e5)", "FAISS", "ChromaDB", "pgvector", "Hybrid Semantic and Lexical Search"],
    libraries: [
      "NumPy",
      "Pandas",
      "Scikit-learn",
      "TensorFlow/Keras",
      "PyTorch",
      "NLTK",
      "spaCy",
      "Hugging Face Transformers",
      "Pydantic v2",
      "SQLAlchemy 2.0",
    ],
    databases: ["PostgreSQL with pgvector", "MySQL", "ChromaDB", "FAISS Vector Store"],
    devopsAndTools: ["Docker", "Docker Compose", "Git", "GitHub", "VS Code", "Jupyter Notebook", "N8N", "Observability Tools"],
  },
  experience: [
    {
      role: "AI Engineer Intern",
      company: "COGNITBOTZ",
      location: "Hyderabad, Telangana",
      period: "January 2026 - Present",
      projects: [
        {
          name: "LegalAID",
          description:
            "Enterprise-grade, AI-powered Legal Research and Litigation Assistance Platform for Indian court case data, combining Retrieval-Augmented Generation (RAG), semantic search, and LLM-driven drafting into a production-ready system.",
          points: [
            "Designed a multi-stage hybrid retrieval pipeline combining dense vector search (pgvector with BAAI/bge-m3) and PostgreSQL full-text search.",
            "Integrated Groq-hosted LLMs with a provider-abstracted service layer and enforced strict abstention policies to control hallucination.",
            "Built a robust ingestion pipeline parsing yearly Indian court JSON dumps (20,000 to 75,000 cases spanning 25 years), generating embeddings and vector indexes.",
            "Developed an asynchronous REST API using FastAPI and SQLAlchemy 2.0 with complete Pydantic v2 schema validation.",
            "Built the complete frontend in Next.js 14 with TypeScript, covering a natural-language search workspace and faceted case explorer.",
            "Packaged the entire system using Docker and Docker Compose, achieving sub-4-second search latency.",
          ],
        },
        {
          name: "MeetOps",
          description:
            "Enterprise-grade AI-powered Meeting Copilot and Project Intelligence Platform integrating Microsoft Teams via ephemeral Dockerized Playwright bots.",
          points: [
            "Designed a semantic RAG pipeline over meeting transcripts, BRDs, and project artifacts using OpenAI embeddings stored in pgvector.",
            "Enforced a strict abstention guardrail where the LLM responds 'Insufficient meeting context' when confidence is low.",
            "Implemented an agentic workflow using OpenAI function-calling to trigger structured actions mid-conversation.",
            "Engineered a Disposable Workspace bot pattern dynamically provisioned via Docker.",
            "Implemented a multi-tier Redis caching layer and streamed LLM output directly to the React frontend via SSE.",
          ],
        },
      ],
    },
    {
      role: "Artificial Intelligence Intern",
      company: "Infosys Springboard",
      location: "Remote",
      period: "February 2025 - April 2025",
      projects: [
        {
          name: "Healthcare RAG Chatbot",
          description: "",
          points: [
            "Built a Healthcare RAG Chatbot on a Wikipedia dataset using FAISS vector search, a Flask backend, and a React frontend.",
            "Implemented a real-time query processing pipeline with source verification and an interactive UI.",
          ],
        },
      ],
    },
    {
      role: "Data Science Intern",
      company: "Adhyayan IT",
      location: "Remote",
      period: "January 2025 - June 2025",
      projects: [
        {
          name: "Text-to-SQL application",
          description: "",
          points: [
            "Built a Text-to-SQL application using LangChain and LLMs (Google Gemini, Groq) that converts natural language queries to executable SQL, achieving 100% context precision (RAGAS).",
            "Developed an interactive Streamlit UI with secure MySQL connectivity.",
          ],
        },
      ],
    },
    {
      role: "Data Analyst Intern",
      company: "Cyber Police Station",
      location: "Dharashiv, Maharashtra",
      period: "October 2023 - January 2024",
      projects: [
        {
          name: "Data Management & Analytics",
          description: "",
          points: [
            "Managed 500+ user credentials for the National Cyber Crime Reporting Portal and organized 1,000+ complaint records.",
            "Improved case resolution efficiency by 30% and accelerated case progression by 20%.",
            "Communicated with victims to provide timely status updates, enhancing overall satisfaction by 15%.",
          ],
        },
      ],
    },
  ],
  personalProjects: [
    {
      name: "RAG Document QA System",
      tech: "FastAPI, React, TypeScript, Tailwind CSS, ChromaDB",
      description: "Production-grade AI-powered question answering on PDF and TXT documents.",
      points: [
        "Engineered a full-stack RAG system integrating document chunking, sentence-transformers embeddings, and ChromaDB vector search with source verification.",
        "Built asynchronous RESTful APIs and deployed the complete stack using Docker.",
      ],
    },
    {
      name: "Insurance Claim Automation System",
      tech: "Google Gemini AI, LangChain, Flask",
      description: "AI-powered insurance claim processing.",
      points: [
        "Developed a system using Google Gemini AI to process and validate medical claims from PDF documents, extracting key medical and billing information.",
        "Built a Flask web application with LangChain integration for intelligent claim assessment and decision-making.",
      ],
    },
  ],
};
