# Full-Stack Portfolio with AIOS Neural Co-Pilot

An interactive, production-ready web portfolio and technical operating system powered by a Python Flask backend, SQLAlchemy ORM, and an integrated conversational AI agent co-pilot.

---

## ⚡ Overview & Architecture

This application delivers a high-performance, responsive portfolio with an embedded intelligent assistant that answers visitor questions, highlights showcase projects, and facilitates secure contact inquiries.

```
┌────────────────────────────────────────────────────────┐
│                   Frontend Client                      │
│   (HTML5 · CSS3 Glassmorphism · Vanilla JS · PWA)      │
└──────────────┬───────────────────────────┬─────────────┘
               │ (Direct HTTP)             │ (REST API)
               ▼                           ▼
┌─────────────────────────────┐  ┌───────────────────────┐
│     Static File Server      │  │     Flask Backend     │
│ (Assets, CSS, JS, Docs, PDF)│  │ (Security Middleware) │
└─────────────────────────────┘  └───────────┬───────────┘
                                             │
                       ┌─────────────────────┴─────────────────────┐
                       ▼                                           ▼
         ┌───────────────────────────┐               ┌───────────────────────────┐
         │     Database Layer        │               │   AIOS Co-Pilot Engine    │
         │  SQLite (Local Dev) /     │               │  Client RAG Cache +       │
         │  MySQL (Production Cloud) │               │  Backend Fallback API     │
         └───────────────────────────┘               └───────────────────────────┘
```

---

## 🚀 Key Architectural Features

### 1. 🤖 AIOS Neural Co-Pilot
* **Dual-Tier Intelligence**: High-speed client-side RAG knowledge retrieval for instant answers, backed by serverless `/api/agent` endpoints.
* **Session Persistence**: Maintains session context and conversation history.
* **Rate Limiting**: Sliding-window IP rate limiting prevents spam and resource exhaustion.

### 2. 🛡️ Defensive Security & Encryption
* **Data Protection**: Sensitive contact submissions are encrypted at rest using Fernet symmetric encryption (`cryptography`).
* **Honeypot Protection**: Hidden honeypot fields silently discard automated bot submissions.
* **Security Headers**: Enforces Content Security Policy (CSP), HTTP Strict Transport Security (HSTS), X-Frame-Options, and X-Content-Type-Options.

### 3. 🗄️ Resilient Data Layer
* **Flexible ORM**: SQLAlchemy models seamlessly support local SQLite (`database/portfolio.db`) and cloud MySQL databases.
* **Automated Table Creation**: Database schemas and tables are initialized automatically upon first launch.
* **Asset Optimization**: Built-in Pillow image compression automatically resizes and optimizes high-resolution profile imagery on boot.

### 4. 🎨 UI & Performance
* Modern responsive glassmorphic dark theme.
* Full progressive web app (PWA) offline capabilities via Service Worker (`sw.js`).
* SEO-optimized with JSON-LD schema markup, OpenGraph metadata, XML sitemap, and robots directives.

---

## 🛠️ Tech Stack

* **Backend**: Python 3.9+, Flask, Flask-SQLAlchemy, Gunicorn
* **Frontend**: HTML5, Modern CSS3, JavaScript (ES6+), FontAwesome
* **Data & Storage**: SQLite, MySQL, PyMySQL, Cryptography (Fernet)
* **Imaging & Documents**: Pillow (PIL), PyPDF, docx
* **Deployment**: Local development server, Docker, Vercel Serverless WSGI (`api/index.py`)

---

## 📋 Prerequisites

Before running the application, ensure you have:
* **Python**: Version 3.9 or higher
* **pip**: Python package manager
* **Git**: Installed and available in your terminal

---

## 💻 How to Run the Project Locally

### Step 1: Clone or Navigate to the Repository
```bash
git clone https://github.com/SanjayGL-8123/portfolio-with-agent.git
cd portfolio-with-agent
```

### Step 2: Create and Activate a Virtual Environment

**Windows (PowerShell):**
```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

**Windows (Command Prompt):**
```cmd
python -m venv .venv
.\.venv\Scripts\activate.bat
```

**macOS / Linux:**
```bash
python3 -m venv .venv
source .venv/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

> [!NOTE]
> If you are on Windows and encounter a build error compiling `greenlet`, run:
> ```powershell
> pip install "greenlet<3.2.5"
> pip install -r requirements.txt
> ```

### Step 4: Configure Environment Variables
Copy the template configuration file:

**Windows (PowerShell):**
```powershell
Copy-Item .env.example .env
```

**macOS / Linux / Bash:**
```bash
cp .env.example .env
```

*(Optional)* You can customize environment variables inside `.env`:
* `PORT`: Port to run the server on (default: `5000`)
* `FLASK_DEBUG`: Enable debug mode (`1` for development, `0` for production)
* `DATABASE_URL`: Cloud MySQL connection string (leave blank to use local SQLite)
* `ENCRYPTION_KEY`: Symmetric key for contact message encryption

### Step 5: Start the Application
```bash
python app.py
```

### Step 6: View in Your Browser
Open your browser and navigate to:
👉 **[http://localhost:5000](http://localhost:5000)** *(or http://localhost:5001 if port 5000 is occupied)*

---

## 🔗 Key API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `GET /` | `GET` | Main portfolio web interface |
| `GET /health` | `GET` | Service health status and version metadata |
| `GET /api/stats` | `GET` | Real-time project counts, site visits, and metrics |
| `GET /api/projects` | `GET` | Showcase projects JSON catalog |
| `GET /api/certificates` | `GET` | Verified credentials and certifications archive |
| `GET /api/about` | `GET` | Developer profile and skills summary |
| `POST /api/agent` | `POST` | Interacts with the AIOS Co-Pilot (`{"message": "...", "session_id": "..."}`) |
| `POST /api/contact` | `POST` | Validates, encrypts at rest, and saves contact submissions |
| `GET /projects/<slug>` | `GET` | Dynamic SEO-friendly individual project landing page |

---

## 📁 Project Structure

```text
portfolio-with-agent/
├── api/
│   └── index.py             # Serverless WSGI entrypoint for Vercel deployment
├── assets/                  # Static assets: images, icons, credentials & resume PDF
│   ├── profile.png
│   └── Sanjay_GL_Resume.pdf
├── css/
│   ├── clean-redesign.css   # Glassmorphic design system and responsive layout
│   └── styles.css           # Core theme tokens and typography
├── data/
│   ├── identity.json        # Canonical profile records, education & timeline data
│   └── projects.json        # Unified project catalog dataset
├── database/
│   └── portfolio.db         # Local SQLite database (auto-generated on boot)
├── js/
│   ├── aiAssistant.js       # Floating AIOS co-pilot widget controller
│   ├── agentKnowledge.js    # Client-side RAG knowledge graph
│   ├── clean-redesign.js    # UI interactions, navigation, and modal logic
│   ├── projectsData.js      # Structured project showcase definitions
│   └── projectsPage.js      # Filter, search, and detail modal renderer
├── app.py                   # Production Flask application & security middleware
├── index.html               # Main portfolio interface
├── projects.html            # Projects showcase page
├── privacy.html             # Privacy policy & data handling notice
├── requirements.txt         # Python dependencies
├── vercel.json              # Vercel serverless build and routing configuration
├── robots.txt               # Web crawler instructions
├── sitemap.xml              # Search engine XML sitemap
└── .env.example             # Environment variable template
```

---

## 🚀 Deployment to Vercel

The application is pre-configured for instant zero-config deployment on Vercel:
1. Push your repository to GitHub.
2. Import the repository into your Vercel Dashboard.
3. The build process automatically detects `vercel.json` and routes requests through `api/index.py`.
4. Production live domain: **[sanjaygl.vercel.app](https://sanjaygl.vercel.app)**

---

<p align="center">
  <sub>Built with Flask, SQLAlchemy & Modern Web Standards.</sub>
</p>
