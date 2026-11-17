# Sanjay G. L. — Developer Portfolio & AI Neural Co-Pilot

A production-ready developer portfolio for **Sanjay G. L.** — Full-Stack Developer, Python Developer, and AI Workflow Engineer, currently pursuing a Bachelor of Computer Applications (BCA · 3rd Year, 5th Semester, 2024–2027) based in **Shivamogga (Shimoga), Karnataka, India**.

Powered by a high-performance Python Flask backend, dynamic JSON knowledge architecture, and an embedded autonomous AI Portfolio Assistant (`Sanjay AI`).

Live Production URL: **[https://sanjaygl.vercel.app/](https://sanjaygl.vercel.app/)**  
GitHub Profiles: **[@SanjayGL-8123](https://github.com/SanjayGL-8123)** · **[@sanjayGL2006](https://github.com/sanjayGL2006)**

---

## ⚡ Overview & Architecture

```
┌────────────────────────────────────────────────────────┐
│                   Frontend Client                      │
│   (HTML5 · CSS3 Glassmorphism · Vanilla JS ES6+ · PWA) │
└──────────────┬───────────────────────────┬─────────────┘
               │ (Direct HTTP)             │ (REST API)
               ▼                           ▼
┌─────────────────────────────┐  ┌───────────────────────┐
│     Static File Server      │  │     Flask Backend     │
│ (WebP Assets, CSS, JS, PDF) │  │ (Security Middleware) │
└─────────────────────────────┘  └───────────┬───────────┘
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       ▼                                           ▼
         ┌───────────────────────────┐               ┌───────────────────────────┐
         │     Database Layer        │               │    Sanjay AI Co-Pilot     │
         │  SQLite (Local Dev) /     │               │  Dynamic JSON RAG Engine  │
         │  MySQL (Production Cloud) │               │  sanjay-ai-agent/ Dataset │
         └───────────────────────────┘               └───────────────────────────┘
```

---

## 🚀 Key Architectural Features

### 1. 🤖 Sanjay AI — Personal Portfolio Assistant
* **Autonomous Knowledge Engine**: Dynamic RAG engine indexing Q&A pairs directly from `data/sanjay_ai_dataset.json`, `data/identity.json`, and `sanjay-ai-agent/` modular JSON specifications.
* **Strict Privacy Guardrails**: Adheres to strict privacy rules — no institutional affiliations or external volunteer programs are referenced; exclusively identifies as a BCA student in Shivamogga, Karnataka.
* **Direct Intent Matching**: Instant responses for education, internships (Milano Infotech & Oasis Infobyte), featured projects (InvoiceGuard, SentinelAI, PureWeaves, Placement Pro, Meluha AI), and deep technical concepts (CNNs, RAG, Web Security).

### 2. ⚡ High-Speed WebP Image Registry (Single Copy, Ultra-Lightweight)
* All graphical assets are consolidated into **4 lightweight `.webp` images** plus a structured JSON registry (`assets/images.json`) for fast page loading:
  1. `assets/profile.webp` — Developer profile portrait (1024×1024, ~95 KB)
  2. `assets/sanjay-logo.webp` — Official brand emblem (1024×1024, ~170 KB)
  3. `assets/openai-academy-badge.webp` — OpenAI Academy credential badge (400×400, ~20 KB)
  4. `assets/openai-apply-ai-at-work.webp` — OpenAI pathway certificate (798×618, ~39 KB)

### 3. 🛡️ Defensive Security & Data Protection
* **Data Encryption**: Contact inquiries are encrypted at rest using Fernet symmetric encryption (`cryptography`).
* **Honeypot & Rate Limiting**: Silent bot rejection via hidden honeypot inputs and sliding-window IP rate limiting on contact and agent APIs.
* **Strict Security Headers**: HSTS, Content Security Policy (CSP), X-Frame-Options, X-Content-Type-Options, and Permissions-Policy.

---

## 🛠️ Tech Stack

* **Core Stack**: Python 3.9+, Flask, Flask-SQLAlchemy, Gunicorn
* **Frontend**: Vanilla HTML5, CSS3 (Glassmorphism design system), JavaScript (ES6+), FontAwesome
* **Databases**: SQLite (Development), MySQL, PostgreSQL (Production)
* **AI & Machine Learning**: Python, TensorFlow, Keras, Scikit-learn, YOLOv8, OpenCV, Google Gemini API
* **Deployment**: Vercel Serverless WSGI (`api/index.py`), GitHub Actions

---

## 📂 Repository Structure

```
portfolio-with-agent/
├── app.py                      # Core Flask backend & dynamic AI agent engine
├── index.html                  # Main portfolio single-page application
├── projects.html               # 100-project catalog directory with filters & search
├── privacy.html                # DPDP-friendly privacy policy & data usage page
├── manifest.json               # Progressive Web App (PWA) manifest
├── sw.js                       # Service worker for offline caching
├── assets/                     # Consolidated WebP assets & documents
│   ├── images.json             # Image metadata registry
│   ├── profile.webp            # Developer profile photo
│   ├── sanjay-logo.webp        # Official brand emblem logo
│   ├── openai-academy-badge.webp # OpenAI Academy verified badge
│   ├── openai-apply-ai-at-work.webp # OpenAI pathway credential
│   ├── Sanjay_GL_Resume.pdf    # Downloadable resume (PDF)
│   └── Sanjay_GL_Resume.docx   # Downloadable resume (Word DOCX)
├── css/
│   ├── clean-redesign.css      # v3.0.1 glassmorphic UI design system
│   └── styles.css              # Supporting project & privacy styles
├── js/
│   ├── clean-redesign.js       # Interactive particles, orbit, & chat controller
│   ├── projectsPage.js         # Full project directory renderer (100 projects)
│   └── projectsData.js         # Catalog data for 100 showcase projects
├── data/
│   ├── identity.json           # Verified profile, education, and career facts
│   └── sanjay_ai_dataset.json  # Comprehensive unified AI agent dataset
├── sanjay-ai-agent/            # Modular AI Agent Architecture
│   ├── personal_profile.json   # Identity, about me, and career goals
│   ├── projects.json           # Featured project specifications
│   ├── skills.json             # Categorized technical capabilities
│   ├── education.json          # Academic background & course interests
│   └── system_prompt.txt       # Official Sanjay AI system instructions
└── requirements.txt            # Python dependencies
```

---

## 💻 Running Locally

### Step 1: Clone Repository
```bash
git clone https://github.com/SanjayGL-8123/portfolio-with-agent.git
cd portfolio-with-agent
```

### Step 2: Set Up Virtual Environment & Dependencies
```bash
# Create virtual environment
python -m venv venv

# Activate on Windows PowerShell:
.\venv\Scripts\Activate.ps1

# Activate on macOS / Linux:
source venv/bin/activate

# Install dependencies:
pip install -r requirements.txt
```

### Step 3: Start Local Server
```bash
python app.py
```
Open **`http://127.0.0.1:5000/`** in your browser.

---

## 🌟 Featured Projects

* **InvoiceGuard** — AI-powered invoice anomaly & fraud detector engineered for hackathon fraud mitigation using Scikit-learn, Pandas, and Flask REST APIs.
* **SentinelAI** — Cyber threat early-warning intelligence platform (ranked 6th–7th in state hackathon) featuring multi-agent security threat scanning.
* **Meluha AI** — Flagship ambition to architect a sovereign Indian AI model trained from scratch without external commercial API dependencies.
* **PureWeaves** — Handcrafted saree e-commerce storefront with dynamic catalog browsing and direct WhatsApp API checkout.
* **Placement Pro** — Full-stack academic placement portal managing student directories, company drives, and report generation via FastAPI and PostgreSQL.
* **Disk Recovery & Forensics Suite** — Low-level digital forensics and data salvage suite combining high-performance C disk parsing with Python analytics.
* **Smart Attendance System** — YOLOv8 real-time video stream detection for automated classroom attendance and teacher dashboards.

---

## 🚀 Deployment to Vercel

The application is pre-configured for instant serverless deployment on Vercel:
1. Push your changes to GitHub `main` branch (`git push origin main`).
2. Vercel automatically deploys via serverless WSGI integration.
3. Production domain: **[https://sanjaygl.vercel.app](https://sanjaygl.vercel.app)**

---

<p align="center">
  <sub>Designed &amp; Engineered by Sanjay G. L. · Built with Flask, Modern Web Standards &amp; Autonomous AI.</sub>
</p>
