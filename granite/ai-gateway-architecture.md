# Granite Buyer Intelligence — AI / LLM Gateway Architecture
## (Addendum to Interview Script — AI Engineer Role)

> This document corrects and expands the AI section of the interview script.
> The architecture documentation previously referenced only "Groq" — that is **inaccurate**.
> The actual implementation is a **production-grade multi-provider LLM Gateway** with
> automatic failover, vector embeddings, semantic ranking, and a local lexical fallback.

---

## What Is Actually Built — The Real AI Stack

### 3 AI Providers, Configured and Active

| Priority | Provider | Role | Model in `.env` |
|---|---|---|---|
| **1 — Primary** | **OpenRouter** (gateway) | Chat / generation | `nvidia/nemotron-3-ultra-550b-a55b:free` |
| **2 — Fallback** | **NVIDIA Build** (direct) | Chat / generation | `nvidia/nemotron-3-super-120b-a12b` |
| **3 — Tertiary** | **Groq** (legacy / direct) | Chat / generation | configured via `GROQ_API_KEY` |

### 2 Embedding Providers, with Local Fallback

| Priority | Provider | Role | Model |
|---|---|---|---|
| **1 — Primary** | **NVIDIA Build** | Dense vector embeddings | `nvidia/nemotron-3-embed-1b` |
| **2 — Secondary** | **OpenRouter** | Dense vector embeddings | `nvidia/llama-nemotron-embed-vl-1b-v2:free` |
| **3 — Always-on fallback** | **Local Lexical Engine** | Sparse TF-based vectors | No API — runs in-process |

### 1 Reranking Model (OpenRouter)

| Provider | Role | Model |
|---|---|---|
| **OpenRouter** | Reranking (future use, configured) | `nvidia/llama-nemotron-rerank-vl-1b-v2:free` |

---

## Architecture Diagrams

### Diagram 1 — LLM Gateway Architecture (Full System View)

```mermaid
flowchart TD
    subgraph App["🧠 AI Service Layer — app/ai/"]
        SVC["service.py\ngenerate_buyer_ai_note()"]
        QUOTA["Daily Quota Check\nSQLite COUNT per UTC day\nBEGIN IMMEDIATE — atomic"]
        REDACT["PII Redactor\nprompts.redact_pii()\nStrips emails + phone numbers"]
        CONTEXT["Context Assembler\nassemble_buyer_context()\nBuyer profile + ranked excerpts\n+ catalogue product names"]
        PROMPT["System Prompt\nSenior B2B Stone Intelligence Analyst\n100-140 word factual briefing only\nNo hallucination / no meta-commentary"]
    end

    subgraph VEC["🔢 Vector & Semantic Layer — vector.py"]
        EMBED["get_embeddings()\nFetches dense vectors from remote API"]
        RANK["rank_evidence()\nCosine similarity ranking\nof up to 30 Evidence records\nSelects top-k=6 most relevant"]
        MATCH["match_products()\nSemantic affinity scoring\nBuyer profile vs. Product catalogue\nSelects top-k=3 matched products"]
        LEX["Local Lexical Fallback\nlocal_lexical_vector()\nTF-based cosine similarity\nNo API needed — always available"]
    end

    subgraph GW["⚡ LLM Gateway — gateway.py"]
        G1["1️⃣ Primary: OpenRouter\nhttps://openrouter.ai/api/v1\nnvidia/nemotron-3-ultra-550b-a55b:free\ntemp=0.1 · max_tokens=1024 · timeout=25s"]
        G2["2️⃣ Fallback: NVIDIA Build Direct\nhttps://integrate.api.nvidia.com/v1\nnvidia/nemotron-3-super-120b-a12b\ntemp=0.1 · max_tokens=1024 · timeout=25s"]
        G3["3️⃣ Tertiary: Groq\nhttps://api.groq.com/openai/v1\nconfigured model\ntemp=0 · max_tokens=350 · timeout=30s"]
        ERR["Error Taxonomy\nAIRateLimitError → HTTP 429\nAITimeoutError → HTTP 504\nAIConfigError → HTTP 503\nAIGatewayError → HTTP 502"]
        CLEAN["clean_reasoning_tokens()\nStrips think tags\nStrips meta-preamble\nStrips markdown fences"]
    end

    subgraph EMBED_PROVIDERS["🔢 Embedding Providers — vector.py"]
        NV_EMBED["1️⃣ NVIDIA Build\nnvidia/nemotron-3-embed-1b\nhttps://integrate.api.nvidia.com/v1/embeddings\ntimeout=20s"]
        OR_EMBED["2️⃣ OpenRouter\nnvidia/llama-nemotron-embed-vl-1b-v2:free\nhttps://openrouter.ai/api/v1/embeddings\ntimeout=20s"]
        LOC_EMBED["3️⃣ Local Lexical\nTF vectors — zero latency\nNo API call — pure Python\nAlways succeeds"]
    end

    subgraph DB["💾 SQLite"]
        EV["Evidence Table\nup to 30 rows per buyer\nfield · value · excerpt · source_url"]
        AI_REC["ai_interpretations Table\nstatus: pending → succeeded/failed\nmodel: name + provider + latency\ncreated_at for quota counting"]
        PROD["products Table\nactive products for affinity scoring"]
    end

    SVC --> QUOTA
    QUOTA --> REDACT
    DB --> EV
    EV --> RANK
    MATCH --> PROD
    PROD --> DB
    RANK --> CONTEXT
    MATCH --> CONTEXT
    CONTEXT --> REDACT
    REDACT --> PROMPT

    EMBED --> NV_EMBED
    NV_EMBED -->|"fail"| OR_EMBED
    OR_EMBED -->|"fail"| LOC_EMBED
    RANK --> EMBED
    MATCH --> EMBED

    PROMPT --> G1
    G1 -->|"timeout / 429 / error"| G2
    G2 -->|"timeout / 429 / error"| G3
    G3 -->|"all fail"| ERR

    G1 --> CLEAN
    G2 --> CLEAN
    G3 --> CLEAN
    CLEAN --> AI_REC
    AI_REC --> DB
```

---

### Diagram 2 — Request Execution Flow (Sequence)

```mermaid
sequenceDiagram
    participant UI as React Frontend
    participant API as FastAPI /api/v1/buyers/:id/ai-note
    participant SVC as ai/service.py
    participant VEC as ai/vector.py
    participant GW as ai/gateway.py
    participant DB as SQLite
    participant OR as OpenRouter API
    participant NV as NVIDIA Build API
    participant GQ as Groq API

    UI->>API: POST /buyers/{id}/ai-note (CSRF token, session cookie)
    API->>SVC: generate_buyer_ai_note(buyer, settings)

    SVC->>DB: BEGIN IMMEDIATE — count ai_interpretations today
    DB-->>SVC: used count vs. daily limit (default 50)
    SVC->>DB: INSERT ai_interpretations (status=pending)
    DB-->>SVC: record created

    SVC->>DB: SELECT evidence WHERE buyer_id = ? LIMIT 30
    DB-->>SVC: up to 30 evidence rows

    SVC->>VEC: rank_evidence(buyer_query, evidence_items, top_k=6)
    VEC->>NV: POST /embeddings — nvidia/nemotron-3-embed-1b
    alt NVIDIA succeeds
        NV-->>VEC: dense vectors (cosine similarity ranking)
    else NVIDIA fails
        VEC->>OR: POST /embeddings — nvidia/llama-nemotron-embed-vl-1b-v2:free
        alt OpenRouter succeeds
            OR-->>VEC: dense vectors
        else OpenRouter fails
            VEC->>VEC: local_lexical_vector() — TF fallback (no API)
        end
    end
    VEC-->>SVC: top-6 ranked evidence excerpts

    SVC->>VEC: match_products(buyer_text, active_products, top_k=3)
    VEC-->>SVC: top-3 semantically matched product names

    SVC->>SVC: assemble_buyer_context() + redact_pii()
    SVC->>GW: gateway.generate(messages)

    GW->>OR: POST /chat/completions — nvidia/nemotron-3-ultra-550b-a55b:free
    alt OpenRouter succeeds
        OR-->>GW: LLMResponse (content, model, latency_ms)
    else OpenRouter timeout / 429 / error
        GW->>NV: POST /chat/completions — nvidia/nemotron-3-super-120b-a12b
        alt NVIDIA succeeds
            NV-->>GW: LLMResponse
        else NVIDIA fails
            GW->>GQ: POST /chat/completions — groq model
            alt Groq succeeds
                GQ-->>GW: LLMResponse
            else All fail
                GW-->>SVC: raise AIGatewayError
            end
        end
    end

    GW->>GW: clean_reasoning_tokens() — strip think tags + meta-preamble
    GW-->>SVC: cleaned LLMResponse

    SVC->>DB: UPDATE ai_interpretations SET status=succeeded, text=..., model=...
    SVC-->>API: AIInterpretation record
    API-->>UI: JSON response { text, model, provider, latency_ms }
```

---

### Diagram 3 — Embedding Provider Failover Chain

```mermaid
flowchart LR
    subgraph Input["Input"]
        Q["Query Text\n+ Evidence Texts\n+ Product Texts"]
    end

    subgraph Primary["1️⃣ NVIDIA Build\nnvidia/nemotron-3-embed-1b\nhttps://integrate.api.nvidia.com/v1/embeddings\ntimeout=20s"]
        NV_OK["✅ Dense Vectors\nHigh-dim semantic embeddings\nCosine similarity ranking"]
    end

    subgraph Secondary["2️⃣ OpenRouter\nnvidia/llama-nemotron-embed-vl-1b-v2:free\nhttps://openrouter.ai/api/v1/embeddings\ntimeout=20s"]
        OR_OK["✅ Dense Vectors\nHigh-dim semantic embeddings\nCosine similarity ranking"]
    end

    subgraph Fallback["3️⃣ Local Lexical Engine\nPure Python — No API call\nAlways available"]
        LOC["✅ Sparse TF Vectors\nTerm-frequency over shared vocabulary\nCosine similarity ranking\nZero latency · Zero cost"]
    end

    subgraph Ranking["Semantic Ranking Output"]
        RANK["top-k Evidence Records\nsorted by cosine similarity score\nReturned to AI Service"]
    end

    Q --> Primary
    Primary -->|"HTTP error / timeout / API key missing"| Secondary
    Secondary -->|"HTTP error / timeout / API key missing"| Fallback
    Primary --> NV_OK
    Secondary --> OR_OK
    Fallback --> LOC
    NV_OK --> RANK
    OR_OK --> RANK
    LOC --> RANK
```

---

### Diagram 4 — LLM Chat Failover Chain

```mermaid
flowchart TD
    subgraph Input["Input — Assembled Prompt"]
        MSG["system: Senior Stone Analyst prompt\nuser: JSON source_claims payload\n(PII redacted · max 4000 chars output cap)"]
    end

    subgraph P1["1️⃣ OpenRouter Gateway\nopenrouter.ai/api/v1/chat/completions\nModel: nvidia/nemotron-3-ultra-550b-a55b:free\ntemp=0.1 · max_tokens=1024 · timeout=25s\nHeaders: Authorization · HTTP-Referer · X-Title"]
        OR_S["✅ Success\nLLMResponse(content, model, provider=openrouter, latency_ms)"]
        OR_F["❌ Fail\nHTTP 429 → had_rate_limit=True\nHTTP timeout → had_timeout=True\nOther error → log + continue"]
    end

    subgraph P2["2️⃣ NVIDIA Build Direct\nintegrate.api.nvidia.com/v1/chat/completions\nModel: nvidia/nemotron-3-super-120b-a12b\ntemp=0.1 · max_tokens=1024 · timeout=25s"]
        NV_S["✅ Success\nLLMResponse(content, model, provider=nvidia, latency_ms)"]
        NV_F["❌ Fail → log + continue"]
    end

    subgraph P3["3️⃣ Groq Tertiary\napi.groq.com/openai/v1/chat/completions\nModel: from GROQ_MODEL env var\ntemp=0 · max_tokens=350 · timeout=30s"]
        GQ_S["✅ Success\nLLMResponse(content, model, provider=groq, latency_ms)"]
        GQ_F["❌ Fail → log + continue"]
    end

    subgraph POST["Post-Processing"]
        CLEAN["clean_reasoning_tokens()\n• Strip think / /think blocks\n• Strip meta-preamble patterns\n• Strip markdown fences\n• Validate: not empty · length ≤ 4000"]
    end

    subgraph ERRORS["Error Taxonomy"]
        E1["AIRateLimitError → HTTP 429"]
        E2["AITimeoutError → HTTP 504"]
        E3["AIConfigError → HTTP 503"]
        E4["AIGatewayError → HTTP 502"]
    end

    MSG --> P1
    P1 --> OR_S
    P1 --> OR_F
    OR_F --> P2
    P2 --> NV_S
    P2 --> NV_F
    NV_F --> P3
    P3 --> GQ_S
    P3 --> GQ_F
    GQ_F --> ERRORS

    OR_S --> POST
    NV_S --> POST
    GQ_S --> POST
```

---

## How to Explain This in an AI Engineer Interview

### The 60-Second Verbal Summary

> "The AI layer is a **production-grade multi-provider LLM gateway** with two independent failover chains.
>
> For **chat generation**, I built a three-tier failover: **OpenRouter** is the primary gateway routing to NVIDIA's Nemotron-550B model. If that fails — timeout, rate limit, or API error — it automatically falls through to **NVIDIA Build direct** with Nemotron-120B. If that also fails, it falls through to **Groq** as a tertiary. All three providers use the same OpenAI-compatible `/chat/completions` API surface.
>
> For **vector embeddings**, I built a separate failover chain: **NVIDIA Build** for dense `nemotron-3-embed-1b` embeddings first, **OpenRouter** second, and a **local lexical TF-based engine** as a zero-dependency, always-on fallback. This guarantees the semantic ranking never goes down — even with no internet.
>
> Before any text touches an LLM, it goes through **PII redaction** — email addresses and phone numbers are stripped with regex. After generation, a **reasoning token cleaner** strips internal model scratchpads like `<think>...</think>` blocks from reasoning models.
>
> The whole pipeline is **quota-gated at the database level** — a daily limit counter uses an atomic `BEGIN IMMEDIATE` transaction so concurrent requests can't race past the quota. Every AI call result, model name, provider, and latency is stored in SQLite and linked back to the buyer record."

---

### Key Technical Talking Points for an AI Engineer Interview

| Topic | What to Say |
|---|---|
| **Why OpenRouter as primary?** | It's a unified API gateway that routes to multiple hosted models through one endpoint. Using `nvidia/nemotron-3-ultra-550b-a55b:free` gives access to a massive 550B-parameter model at zero direct cost, with OpenRouter handling the routing. |
| **Why NVIDIA Build as fallback?** | It gives direct access to NVIDIA-hosted Nemotron models with lower latency and no gateway intermediary. The `nemotron-3-super-120b-a12b` is strong for factual B2B text summarization. |
| **Why Groq as tertiary?** | Groq uses custom silicon (LPUs) giving extremely low token generation latency — good as a last-resort fast fallback. |
| **Why local lexical fallback for embeddings?** | A buyer intelligence system cannot go down just because an embedding API is temporarily unavailable. The local TF-based cosine similarity is deterministic, zero-latency, and requires no API call — ensuring 100% uptime for evidence ranking. |
| **How does the reasoning token cleaner work?** | Some NVIDIA reasoning models output their internal chain-of-thought inside `<think>...</think>` XML tags before the actual answer. The cleaner strips these with regex before saving the response. This prevents model scratchpads from appearing in the buyer briefing. |
| **What is the quota mechanism?** | `BEGIN IMMEDIATE` on SQLite serializes the quota check + insert. Since SQLite only allows one writer at a time under WAL mode, this prevents two simultaneous requests from both reading "49 used" and both proceeding past a limit of 50. |
| **What does PII redaction cover?** | Email addresses (regex on `@` pattern) and international phone numbers (regex on digit sequences ≥ 8 digits). This prevents buyer contact data from being transmitted to hosted AI providers during the interpretation call. |
| **What is the output constraint?** | Max 4000 characters checked after generation. The system prompt instructs 100–140 words. If the model returns empty or exceeds 4000 chars, it's treated as a failed generation and falls through to the next provider. |

---

## Corrected Summary Table

| Component | File | What It Does |
|---|---|---|
| `LLMGateway` | `app/ai/gateway.py` | Three-tier LLM failover: OpenRouter → NVIDIA Build → Groq |
| `VectorService` | `app/ai/vector.py` | Two-tier embedding failover: NVIDIA → OpenRouter → Local lexical |
| `generate_buyer_ai_note` | `app/ai/service.py` | Orchestrates quota check → vector ranking → context assembly → gateway call → DB write |
| `SYSTEM_SUMMARY_PROMPT` | `app/ai/prompts.py` | Role-grounded system prompt — stone industry analyst, factual only, 100–140 words |
| `redact_pii` | `app/ai/prompts.py` | Strips emails + phone numbers before transmission |
| `clean_reasoning_tokens` | `app/ai/prompts.py` | Strips think tags + model scratchpads from output |
| `assemble_buyer_context` | `app/ai/prompts.py` | Builds structured context from buyer profile + ranked evidence + matched products |
| `Settings` | `app/core/config.py` | Holds all API keys as `SecretStr`, computes `active_llm_provider`, `active_embedding_provider` |

