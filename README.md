<p align="center">
  <img src="docs/assets/nwisx_banner.png" alt="NWIS-X Banner" width="800"/>
</p>

<h1 align="center">NWIS-X</h1>
<h3 align="center">Neighbourhood Well Intelligence System</h3>
<h4 align="center">AI-Powered Real-Time Drilling Hazard Prediction Using Offset Well Data Analysis</h4>

<p align="center">
  <a href="#-problem-statement"><img src="https://img.shields.io/badge/SIH-2025-orange?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PC9zdmc+" alt="SIH 2025"/></a>
  <a href="#"><img src="https://img.shields.io/badge/PS_ID-SIH26121-blue?style=for-the-badge" alt="Problem Statement"/></a>
  <a href="#"><img src="https://img.shields.io/badge/Team-Next--Gen_Coders-teal?style=for-the-badge" alt="Team"/></a>
  <a href="#"><img src="https://img.shields.io/badge/Organisation-Oil_India_Limited-green?style=for-the-badge" alt="Oil India"/></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License"/></a>
</p>

<p align="center">
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-key-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-team">Team</a>
</p>

---

## 📋 Problem Statement

> **SIH26121 — Oil India Limited**
>
> *"Development of an AI-powered Neighbourhood Well Intelligence System for real-time drilling hazard prediction using offset well data analysis."*

Oil India drills hundreds of wells annually across geologically complex terrains in Assam, Rajasthan, and frontier basins. Each well faces critical subsurface hazards — **stuck pipe**, **lost circulation**, and **gas kicks** — that can cost crores in non-productive time (NPT) and endanger lives.

### The Core Problem

| Pain Point | Description |
|:---|:---|
| **Buried Knowledge** | Decades of Well Completion Reports (WCR) and Daily Drilling Reports (DDR) sit trapped in scanned PDFs and filing cabinets. |
| **Survivorship Bias** | Current tools count raw incidents without normalising by exposure (metres drilled), distorting true geological risk. |
| **Proximity ≠ Similarity** | Nearby wells on a map may have vastly different geology, mud systems, and structural positions. |
| **Alert Fatigue** | Fixed-threshold alarms flood engineers with low-quality warnings until all alerts are ignored. |
| **Knowledge Drain** | When veteran drilling engineers retire, decades of tacit troubleshooting expertise is permanently lost. |

---

## 💡 Our Solution

**NWIS-X** is an end-to-end AI platform that transforms decades of unstructured drilling archives into real-time, evidence-backed hazard predictions — running **100% on-premise** within Oil India's secure network.

### The 5-Step Intelligence Pipeline

```
┌──────────┐    ┌──────────────┐    ┌─────────┐    ┌───────────┐    ┌─────────┐
│  INGEST  │───▶│  UNDERSTAND  │───▶│  MATCH  │───▶│  PREDICT  │───▶│  ALERT  │
│ OCR+LLM  │    │ Knowledge    │    │ Geology │    │ Bayesian  │    │ Evidence│
│ Dual     │    │ Graph with   │    │  Aware  │    │   Risk    │    │ Dossier │
│ Extract  │    │ Provenance   │    │  Twins  │    │  Fusion   │    │         │
└──────────┘    └──────────────┘    └─────────┘    └───────────┘    └─────────┘
       ▲                                                                  │
       └──────────────── Active Learning Feedback Loop ◀──────────────────┘
```

1. **INGEST** — Dual-path extraction engine (regex + local LLM) processes scanned WCR/DDR PDFs, LAS logs, and WITSML live feeds with automated plausibility validation.

2. **UNDERSTAND** — Builds a verified subsurface Knowledge Graph with cryptographic provenance — every fact traces back to its exact source page.

3. **MATCH** — Geology-Aware Digital Twin selector scores well similarity by formation tops, structural position, mud system, well design, and era — not just map distance.

4. **PREDICT** — Bayesian Risk Fusion combines exposure-normalised hazard priors with live drilling telemetry and mud-window margins to compute calibrated risk probabilities in metres-ahead and hours-ahead.

5. **ALERT** — Generates comprehensive Alert Dossiers with offset evidence, counter-evidence, proven mitigations, and confidence scores. **The engineer always decides.**

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    NWIS-X SYSTEM ARCHITECTURE                          │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─── SECURITY ─────────────────────────────────────────── LEARNING ──┐ │
│  │    (On-Premise,                                        LOOP       │ │
│  │     RBAC,                                              (Engineer  │ │
│  │     Audit Log)                                          Feedback) │ │
│  │                                                                    │ │
│  │  ┌─────────────────────────────────────────────────────────────┐   │ │
│  │  │ Layer 6: EXPERIENCE                                        │   │ │
│  │  │   Command Centre │ Hazard Corridor │ Alert Dossiers │ Map  │   │ │
│  │  ├─────────────────────────────────────────────────────────────┤   │ │
│  │  │ Layer 5: REASONING COUNCIL                                 │   │ │
│  │  │   Retriever │ Geologist │ Engineer │ Skeptic │ Auditor     │   │ │
│  │  ├─────────────────────────────────────────────────────────────┤   │ │
│  │  │ Layer 4: INTELLIGENCE ENGINE                               │   │ │
│  │  │   Twin Selector │ Hazard Prior │ Bayesian Risk Fusion      │   │ │
│  │  ├─────────────────────────────────────────────────────────────┤   │ │
│  │  │ Layer 3: STORAGE                                           │   │ │
│  │  │   PostgreSQL+PostGIS │ TimescaleDB │ pgvector │ KG         │   │ │
│  │  ├─────────────────────────────────────────────────────────────┤   │ │
│  │  │ Layer 2: TRUSTED KNOWLEDGE FOUNDRY                         │   │ │
│  │  │   OCR │ Dual Extraction │ Plausibility Validators          │   │ │
│  │  ├─────────────────────────────────────────────────────────────┤   │ │
│  │  │ Layer 1: SOURCES                                           │   │ │
│  │  │   Scanned PDFs │ LAS Logs │ WITSML Live Feed               │   │ │
│  │  └─────────────────────────────────────────────────────────────┘   │ │
│  └────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────┘
```

### Module Structure

```
NWIS-X/
├── src/nwisx/
│   ├── ingestion/        # Layer 1-2: OCR, LLM extraction, WITSML, LAS, validators
│   ├── storage/          # Layer 3:   Database models, knowledge graph, vector store
│   ├── intelligence/     # Layer 4:   Twin selector, hazard priors, risk fusion
│   ├── reasoning/        # Layer 5:   Multi-agent council (5 agents)
│   ├── experience/       # Layer 6:   FastAPI routes, alert dossiers, schemas
│   └── security/         # Cross-cut: RBAC, audit logging
├── frontend/             # React dashboard (Command Centre UI)
├── tests/                # Pytest test suite
├── scripts/              # Data seeding, backtesting utilities
├── migrations/           # Database migrations (Alembic)
├── data/                 # Raw/processed data & model artifacts
└── docs/                 # Architecture docs, API reference, deployment guide
```

---

## ✨ Key Features

### 🔍 Intelligent Data Ingestion
- Dual-path extraction: deterministic regex **+** schema-constrained local LLM
- Automated plausibility validators (monotonic depth checks, unit consistency, casing shoe logic)
- Support for scanned PDFs (OCR), digital documents, LAS 2.0/3.0, WITSML streaming

### 🧬 Geology-Aware Digital Twins
- Multi-dimensional similarity scoring across **formation tops, structural dip, mud system, well trajectory, and drilling era**
- Transparent, explainable similarity breakdown (not a black-box score)
- Learned weights that improve with engineer feedback

### 📊 Calibrated Risk Prediction
- **Exposure-normalised hazard rates** — events per metre drilled, not raw counts
- Bayesian fusion of offset well priors with live drilling signals
- Conformal prediction intervals for honest uncertainty quantification
- Risk expressed in **metres-ahead** and **hours-ahead** for operational usefulness

### 🤖 Multi-Agent Reasoning Council
| Agent | Role |
|:---|:---|
| **Retriever** | Fetches relevant offset well evidence from the knowledge graph |
| **Geologist** | Analyses formation and structural context |
| **Drilling Engineer** | Assesses operational risk and mitigation options |
| **Skeptic** | Actively searches for counter-evidence to challenge alerts |
| **Auditor** | Verifies every claim has a traceable source citation — deletes unverified claims |

### 📋 Evidence-Backed Alert Dossiers
- Full evidence package: which offset wells, what happened, at what depth, what mitigation worked
- Counter-evidence from incident-free wells included
- Confidence scores with calibrated uncertainty intervals
- **Engineer always makes the final decision** — system provides evidence, not commands

### 🔒 Enterprise Security & Data Sovereignty
- **100% on-premise** deployment — zero cloud dependency
- Open-weight local LLMs (Llama-3 / Mistral) — no external API calls
- Role-based access control (RBAC) with SHA-256 hash-chained audit logs
- Oil India's confidential subsurface data never leaves their air-gapped network

---

## 🛠 Tech Stack

| Layer | Technology |
|:---|:---|
| **Language** | Python 3.11+, TypeScript (React) |
| **Backend API** | FastAPI + Uvicorn |
| **Database** | PostgreSQL 16 + PostGIS + TimescaleDB |
| **Vector Search** | pgvector |
| **Knowledge Graph** | NetworkX + Neo4j (optional) |
| **AI/ML** | scikit-learn, SciPy, Sentence Transformers, LangChain |
| **Local LLMs** | Llama-3 / Mistral (via Ollama or vLLM) |
| **OCR** | PyMuPDF (fitz) + Tesseract OCR |
| **Well Data** | LAS parser, WITSML client |
| **Frontend** | React 18, Recharts, Leaflet Maps |
| **Containerisation** | Docker + Docker Compose |
| **Task Queue** | Redis + Celery (planned) |

---

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- Docker & Docker Compose
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/mdyusuf0/NWIS-X.git
cd NWIS-X
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.example .env
# Edit .env with your database credentials and model paths
```

### 3. Start with Docker (Recommended)
```bash
# Start all services (PostgreSQL, Redis, Backend API, Frontend)
docker-compose up -d

# Run database migrations
make migrate

# Seed sample data (Volve dataset)
make seed
```

### 4. Local Development (Without Docker)
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows

# Install dependencies
pip install -r requirements.txt

# Start the backend
make dev

# In a separate terminal, start the frontend
cd frontend
npm install
npm start
```

### 5. Run Tests
```bash
make test
```

The API will be available at `http://localhost:8000` and the dashboard at `http://localhost:3000`.

---

## 📊 Datasets Used for Validation

| Dataset | Source | Purpose |
|:---|:---|:---|
| **Equinor Volve** | [data.equinor.com/dataset/Volve](https://data.equinor.com/dataset/Volve) | Real drilling reports and well logs for extraction and twin matching validation |
| **Petrobras 3W** | [github.com/petrobras/3W](https://github.com/petrobras/3W) | Labelled undesirable drilling events (kicks, losses, stuck pipe) for anomaly detection benchmarking |

---

## 🗺 Deployment Roadmap

| Phase | Status | Description |
|:---|:---|:---|
| **Phase 1: Prototype** | ✅ Current | Validated on public Volve & Petrobras 3W data with leave-one-well-out backtesting |
| **Phase 2: Historical Replay** | 🔜 Planned | Retrospective pilot on Oil India's Assam/Rajasthan well archives |
| **Phase 3: Shadow Mode** | 🔜 Planned | Real-time passive companion alongside Oil India's eRTMAC monitoring centre |
| **Phase 4: Field Rollout** | 🔜 Planned | Rig-floor edge deployment with active learning from driller feedback |

---

## 📚 Research Foundations

### Datasets & Standards
- Equinor Volve Open Dataset — real drilling reports and well logs
- Petrobras 3W Dataset — labelled undesirable events (Vargas et al., 2019)
- Energistics WITSML / ETP — drilling data exchange standard
- LAS Log Format — well log data standard
- OSDU Data Platform — open subsurface data universe

### Methods & Algorithms
- Lewis et al., 2020 — Retrieval-Augmented Generation (RAG)
- Edge et al., 2024 — Graph RAG
- Angelopoulos & Bates — Conformal Prediction Tutorial
- Sakoe & Chiba, 1978 — Dynamic Time Warping (DTW)
- Gamma-Poisson Bayesian Rate Estimation
- SPE technical papers on drilling hazards in Assam shelf operations

---

## 👥 Team

### Next-Gen Coders

| Name | Role |
|:---|:---|
| **Yusuf** | Team Lead & Full-Stack Developer |
| **Ajay** | Backend & AI/ML Engineer |
| **Nitish** | Data Engineering & Database |
| **Samir** | DevOps & System Architecture |
| **Mahi** | Frontend & UI/UX Developer |
| **Priti** | Research & Domain Analysis |

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgements

- **Oil India Limited** for the problem statement and domain guidance
- **Smart India Hackathon 2025** for the platform and opportunity
- **Equinor** for the Volve open dataset
- **Petrobras** for the 3W labelled drilling event dataset
- The open-source community behind PostgreSQL, FastAPI, LangChain, and Hugging Face

---

<p align="center">
  <b>NWIS-X</b> — Making Drilling Safer, Smarter, and Self-Reliant 🇮🇳
</p>
<p align="center">
  Built with ❤️ by <b>Team Next-Gen Coders</b> for <b>Smart India Hackathon 2025</b>
</p>
