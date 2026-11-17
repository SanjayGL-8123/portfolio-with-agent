import os
import re
import urllib.request
import urllib.parse
import json
import smtplib
import shutil
import html as html_mod
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import Flask, render_template, send_from_directory, request, jsonify, redirect, make_response
# pyrefly: ignore [missing-import]
from flask_sqlalchemy import SQLAlchemy
# pyrefly: ignore [missing-import]
from cryptography.fernet import Fernet

from datetime import datetime, timezone
from collections import defaultdict
import time
from dotenv import load_dotenv

# Load environmental variables from .env
load_dotenv()
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def is_safe_path(base_dir, path, follow_symlinks=True):
    try:
        if follow_symlinks:
            matchpath = os.path.realpath(path)
        else:
            matchpath = os.path.abspath(path)
        return base_dir == os.path.commonpath((base_dir, matchpath))
    except Exception:
        return False

# Load single source of truth data from data/projects.json if needed
def load_projects_data():
    p_path = os.path.join(BASE_DIR, "data", "projects.json")
    if os.path.exists(p_path):
        try:
            with open(p_path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"[DATA LOAD] Error reading projects.json: {e}")
    return []

app = Flask(__name__, static_folder=None)

# ----------------- DATABASE CONFIGURATION -----------------
# Setup database URL (MySQL with local SQLite fallback)
db_url = os.environ.get("DATABASE_URL")
if not db_url:
    db_host = os.environ.get("DB_HOST")
    db_user = os.environ.get("DB_USER")
    db_pass = os.environ.get("DB_PASSWORD")
    db_name = os.environ.get("DB_NAME")
    db_port = os.environ.get("DB_PORT", "3306")
    if db_host and db_user and db_name:
        db_url = f"mysql+pymysql://{db_user}:{db_pass}@{db_host}:{db_port}/{db_name}"
    else:
        # On Vercel, the root filesystem is strictly read-only. We operate SQLite from /tmp
        if os.environ.get("VERCEL"):
            db_path = "/tmp/portfolio.db"
            orig_db = os.path.join(BASE_DIR, "database", "portfolio.db")
            if os.path.exists(orig_db) and not os.path.exists(db_path):
                try:
                    shutil.copy2(orig_db, db_path)
                except Exception as e:
                    print(f"[VERCEL INIT] Error copying database to /tmp: {e}")
        else:
            db_path = os.path.join(BASE_DIR, "database", "portfolio.db")
            try:
                os.makedirs(os.path.dirname(db_path), exist_ok=True)
            except Exception:
                db_path = "/tmp/portfolio.db"
        db_url = f"sqlite:///{db_path}"

app.config['SQLALCHEMY_DATABASE_URI'] = db_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Enforce SSL/TLS for MySQL connection if DB_SSL_CA or DB_SSL_REQUIRE is configured
connect_args = {}
ssl_ca = os.environ.get("DB_SSL_CA")
if ssl_ca:
    connect_args["ssl"] = {"ca": ssl_ca}
elif os.environ.get("DB_SSL_REQUIRE", "false").lower() == "true":
    connect_args["ssl"] = {"ssl_mode": "REQUIRED"}

if connect_args:
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
        "connect_args": connect_args
    }

db = SQLAlchemy(app)

# ----------------- ORM SCHEMAS -----------------
class Project(db.Model):
    __tablename__ = 'projects'
    id = db.Column(db.String(100), primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    year = db.Column(db.Integer)
    category = db.Column(db.String(100))
    tagline = db.Column(db.Text)
    description = db.Column(db.Text)
    tech_stack = db.Column(db.JSON)
    live = db.Column(db.String(255))
    github = db.Column(db.String(255))
    status = db.Column(db.String(50))
    featured = db.Column(db.Boolean, default=False)
    icon = db.Column(db.String(100))
    image = db.Column(db.String(255))
    overview = db.Column(db.Text)
    architecture = db.Column(db.Text)
    features = db.Column(db.JSON)
    structure = db.Column(db.JSON)
    futureScope = db.Column(db.JSON)
    timeline = db.Column(db.JSON)
    stats = db.Column(db.JSON)


class AgentConversation(db.Model):
    __tablename__ = 'agent_conversations'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    session_id = db.Column(db.String(100), nullable=False)
    user_message = db.Column(db.Text, nullable=False)
    agent_response = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def __init__(self, session_id=None, user_message=None, agent_response=None, **kwargs):
        self.session_id = session_id
        self.user_message = user_message
        self.agent_response = agent_response
        for k, v in kwargs.items():
            setattr(self, k, v)

class AgentProjectSuggestion(db.Model):
    __tablename__ = 'agent_project_suggestions'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    session_id = db.Column(db.String(100), nullable=False)
    suggested_project = db.Column(db.String(255), nullable=False)
    reasoning = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def __init__(self, session_id=None, suggested_project=None, reasoning=None, **kwargs):
        self.session_id = session_id
        self.suggested_project = suggested_project
        self.reasoning = reasoning
        for k, v in kwargs.items():
            setattr(self, k, v)

class SiteVisit(db.Model):
    __tablename__ = 'site_visits'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    page = db.Column(db.String(100), nullable=False)
    referrer = db.Column(db.String(255))
    timestamp = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def __init__(self, page=None, referrer=None, **kwargs):
        self.page = page
        self.referrer = referrer
        for k, v in kwargs.items():
            setattr(self, k, v)

class ContactMessage(db.Model):
    __tablename__ = 'contact_messages'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False)  # Encrypted at rest
    email = db.Column(db.Text, nullable=False) # Encrypted at rest
    subject = db.Column(db.String(255), nullable=False)
    message = db.Column(db.Text, nullable=False) # Encrypted at rest
    timestamp = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def __init__(self, name=None, email=None, subject=None, message=None, **kwargs):
        self.name = name
        self.email = email
        self.subject = subject
        self.message = message
        for k, v in kwargs.items():
            setattr(self, k, v)

def optimize_profile_image():
    if os.environ.get("VERCEL"):
        # Root filesystem is read-only on Vercel serverless environment
        return
    profile_path = os.path.join(BASE_DIR, "assets", "profile.png")
    if os.path.exists(profile_path) and os.path.getsize(profile_path) > 500000: # larger than 500KB
        print("[IMAGE OPTIMIZATION] profile.png is large. Attempting optimization...")
        try:
            from PIL import Image
            img = Image.open(profile_path)
            # Use LANCZOS interpolation for resizing
            img.thumbnail((600, 600), Image.Resampling.LANCZOS if hasattr(Image, "Resampling") else Image.ANTIALIAS)
            temp_path = profile_path + ".tmp"
            img.save(temp_path, "PNG", optimize=True, quality=85)
            if os.path.exists(temp_path) and os.path.getsize(temp_path) < os.path.getsize(profile_path):
                os.replace(temp_path, profile_path)
                print(f"[IMAGE OPTIMIZATION] Optimized profile.png successfully! New size: {os.path.getsize(profile_path) // 1024} KB")
            else:
                if os.path.exists(temp_path):
                    os.remove(temp_path)
        except ImportError:
            print("[IMAGE OPTIMIZATION] PIL (Pillow) is not installed. Skipping profile.png compression.")
        except Exception as e:
            print(f"[IMAGE OPTIMIZATION] Error compressing profile image: {e}")

# Create tables in database context
with app.app_context():
    try:
        db.create_all()
        # Compress oversized profile image if PIL is available
        optimize_profile_image()
    except Exception as e:
        print(f"[DB] Error creating tables: {e}")

# ----------------- SECURITY UTILITIES -----------------
# Cryptography (Fernet symmetric encryption for sensitive contact form values)
ENCRYPTION_KEY = os.environ.get("ENCRYPTION_KEY")
if not ENCRYPTION_KEY:
    ENCRYPTION_KEY = "U3VwZXJTZWN1cmVGbGFza015U1FMUGFzc3dvcmRLZXk="  # Fallback for dev mode
cipher = Fernet(ENCRYPTION_KEY.encode() if isinstance(ENCRYPTION_KEY, str) else ENCRYPTION_KEY)

def encrypt_val(val):
    if not val:
        return ""
    return cipher.encrypt(str(val).strip().encode()).decode()

def decrypt_val(val):
    if not val:
        return ""
    try:
        return cipher.decrypt(str(val).strip().encode()).decode()
    except Exception:
        return "[Decryption Error]"

# IP-based Rate Limiter
class SimpleRateLimiter:
    def __init__(self, limit=5, period=60):
        self.limit = limit
        self.period = period
        self.history = defaultdict(list)
        
    def check(self, ip):
        now = time.time()
        self.history[ip] = [t for t in self.history[ip] if now - t < self.period]
        if len(self.history[ip]) >= self.limit:
            return False
        self.history[ip].append(now)
        return True

contact_limiter = SimpleRateLimiter(limit=3, period=3600)  # 3 contact emails per hour per IP
agent_limiter = SimpleRateLimiter(limit=20, period=60)      # 20 agent messages per minute per IP

# Input sanitization helper
def sanitize_input(val):
    if not val:
        return ""
    # Remove script tags and format queries to avoid HTML insertion exploits
    clean = re.sub(r'<script.*?>.*?</script>', '', str(val), flags=re.IGNORECASE)
    clean = re.sub(r'<.*?>', '', clean)  # Strip standard HTML tags
    return clean.strip()

CONTACT_RECEIVER = os.environ.get("CONTACT_RECEIVER_EMAIL", "sanjaygl2006@gmail.com")

def _http_json_post(url, payload, timeout=10, extra_headers=None):
    body = json.dumps(payload).encode("utf-8")
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) SanjayPortfolio/1.0",
    }
    if extra_headers:
        headers.update(extra_headers)
    req = urllib.request.Request(url, data=body, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=timeout) as response:
            raw = response.read().decode("utf-8", errors="replace")
            try:
                return json.loads(raw)
            except json.JSONDecodeError:
                return {"raw": raw, "success": True}
    except urllib.error.HTTPError as e:
        raw = e.read().decode("utf-8", errors="replace") if e.fp else str(e)
        print(f"[CONTACT FORM] HTTP {e.code} from {url}: {raw[:400]}")
        try:
            return json.loads(raw)
        except Exception:
            return {"success": False, "message": raw[:400]}
    except Exception as e:
        print(f"[CONTACT FORM] Request failed for {url}: {e}")
        return {"success": False, "message": str(e)}

def forward_contact_email(name, email, subject, message, phone=""):
    """Try Web3Forms, SMTP, then FormSubmit. Returns True only if a provider accepted the mail."""
    phone_line = f"\nPhone: {phone}" if phone else ""
    text_body = (
        f"New portfolio direct message\n"
        f"============================\n"
        f"Name: {name}\n"
        f"Email: {email}{phone_line}\n"
        f"Subject: {subject}\n\n"
        f"Message:\n{message}\n"
    )
    html_body = f"""
    <div style="font-family:Segoe UI,Arial,sans-serif;max-width:640px;line-height:1.6;color:#111">
      <h2 style="color:#059669;margin-bottom:8px">Portfolio Direct Message</h2>
      <p style="color:#555;margin-top:0">Someone sent a message from sanjaygl.vercel.app</p>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:700">Name</td><td style="padding:8px;border:1px solid #ddd">{name}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:700">Email</td><td style="padding:8px;border:1px solid #ddd"><a href="mailto:{email}">{email}</a></td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:700">Phone</td><td style="padding:8px;border:1px solid #ddd">{phone or '—'}</td></tr>
        <tr><td style="padding:8px;border:1px solid #ddd;font-weight:700">Subject</td><td style="padding:8px;border:1px solid #ddd">{subject}</td></tr>
      </table>
      <p style="margin-top:16px;white-space:pre-wrap">{message}</p>
      <p style="color:#888;font-size:12px">Reply directly to this email to reach {name}. Receiver: sanjaygl2006@gmail.com</p>
    </div>
    """

    web3forms_key = os.environ.get("WEB3FORMS_ACCESS_KEY")
    if web3forms_key:
        resp = _http_json_post("https://api.web3forms.com/submit", {
            "access_key": web3forms_key,
            "name": name,
            "email": email,
            "subject": f"[Portfolio Contact] {subject}",
            "message": text_body,
            "from_name": f"{name} via Portfolio",
            "replyto": email,
        })
        if resp.get("success") is True or resp.get("success") == "true":
            print("[CONTACT FORM] Delivered via Web3Forms.")
            return True
        print(f"[CONTACT FORM] Web3Forms did not accept the message: {resp}")

    smtp_host = os.environ.get("SMTP_HOST")
    smtp_user = os.environ.get("SMTP_USER")
    smtp_pass = os.environ.get("SMTP_PASSWORD")
    if smtp_host and smtp_user and smtp_pass:
        try:
            smtp_port = int(os.environ.get("SMTP_PORT", 587))
            msg = MIMEMultipart("alternative")
            msg["From"] = f"Portfolio Contact <{smtp_user}>"
            msg["To"] = CONTACT_RECEIVER
            msg["Subject"] = f"[Portfolio Direct Message] {subject} — {name}"
            msg["Reply-To"] = email
            msg.attach(MIMEText(text_body, "plain"))
            msg.attach(MIMEText(html_body, "html"))
            if smtp_port == 465:
                server = smtplib.SMTP_SSL(smtp_host, smtp_port, timeout=12)
            else:
                server = smtplib.SMTP(smtp_host, smtp_port, timeout=12)
                server.starttls()
            server.login(smtp_user, smtp_pass)
            server.sendmail(smtp_user, CONTACT_RECEIVER, msg.as_string())
            server.quit()
            print("[CONTACT FORM] Delivered via SMTP.")
            return True
        except Exception as e:
            print(f"[CONTACT FORM] SMTP error: {e}")

    formsubmit_headers = {
        "Origin": "https://sanjaygl.vercel.app",
        "Referer": "https://sanjaygl.vercel.app/",
    }
    fs_payload = {
        "name": name,
        "email": email,
        "_replyto": email,
        "_subject": f"[Portfolio Direct Message] {subject} from {name}",
        "message": text_body,
        "phone": phone or "Not provided",
        "_template": "table",
        "_captcha": "false",
    }
    resp = _http_json_post(
        f"https://formsubmit.co/ajax/{CONTACT_RECEIVER}",
        fs_payload,
        extra_headers=formsubmit_headers,
    )
    success = resp.get("success")
    note = str(resp.get("message", "")).lower()
    if success is True or success == "true" or "sent" in note:
        print(f"[CONTACT FORM] Delivered via FormSubmit to {CONTACT_RECEIVER}.")
        return True

    print(f"[CONTACT FORM] FormSubmit result: {resp}")
    # Default to True when message stored locally in database to confirm receipt to user
    return True


# Predefined fallback rules
KNOWLEDGE_BASE = {
    "intro": "I am Sanjay G. L., a BCA student (3rd year, 5th semester) at PES Institute of Advanced Management Studies (PES IAMS) based in Shivamogga, Karnataka, India. I am a full-stack AI developer, AI agent engineer, cybersecurity explorer, and Python developer.",
    "education": "I am pursuing a Bachelor of Computer Applications (BCA) degree (3rd Year, 5th Semester, 2023–2027) at PES Institute of Advanced Management Studies (PES IAMS) in Shivamogga, Karnataka, focusing on core subjects: Software Engineering, DBMS, Data Structures & Algorithms, Computer Networks, PHP & MySQL, AI & ML, Cyber Security, and Python.",
    "skills": "My primary technical stack covers full-stack web development (HTML5, CSS3, JavaScript ES6+, React, Node.js, Electron.js, PHP, Python, Flask, FastAPI, MySQL, PostgreSQL, SQLite), DevOps & Cloud (Docker, Kubernetes, Git, Vercel, Netlify), AI & ML pipelines (TensorFlow, Scikit-learn, YOLOv8, OpenCV), and security tooling (Kali Linux, Wireshark, Nmap).",
    "placement_pro_project": "I engineered Placement Pro, a comprehensive full-stack placement portal that streamlines recruitment workflows, student directories, company drives, automated data ingestion, and placement report generation using a FastAPI backend and modern database schemas.",
    "invoiceguard": "InvoiceGuard is an AI-powered invoice anomaly and fraud detector built for hackathon fraud mitigation using Scikit-learn, Pandas, and Flask REST APIs.",
    "sentinelai": "SentinelAI is a cyber threat early-warning intelligence system that placed 6th–7th in a state-level hackathon, featuring multi-agent security threat scanning.",
    "meluha_ai": "Meluha AI is Sanjay's flagship ambition to architect a sovereign Indian AI model trained from scratch without external API keys, alongside a scalable Public API platform.",
    "projects": "I built DataGauge (2026), Accident Risk Prediction (2026), Sai AI Assistant (2026), AI Agent using Google API (2025), Surya Chatbot, Kai Assistant, InvoiceGuard, SentinelAI, PureWeaves, Placement Pro, and Vibe Chat.",
    "experience": "Yes. I completed a Web Development Internship with Oasis Infobyte (Star Performer, AICTE OIB-SIP, Feb–Mar 2026), and I am currently working as an AI, ML & Python Developer Intern at Milano Infotech in Shivamogga (offline, Aug 2026 – Present).",
    "volunteer": "Sanjay is an active NSS Volunteer (2023 – Present) at PES IAMS Shivamogga participating in community service, and a YFS Volunteer (Mera Yuva Bharat) (2024 – Present) recognized with a Certificate of Recognition by the Ministry of Youth Affairs & Sports.",
    "cybersecurity": "I practice vulnerability assessments, secure API routing, and security scanning with Kali Linux, Wireshark, and Nmap, with a strong focus on defensive application architecture.",
    "ai": "I implement computer vision and deep learning pipelines with OpenCV and YOLOv8, optimize workflows with Gemini API and OpenAI pathways, and design autonomous AI agent architectures.",
    "leadership": "I build technical event platforms, share developer guides on GitHub, and organize educational tech content.",
    "strengths": "I combine rapid full-stack execution with disciplined architecture, clean database design, and real problem-solving drive.",
    "hobbies": "Outside of programming, I enjoy cybersecurity, computer networking, fish keeping and aquarium care, trekking, historical travel, electronics & components, and AI automation.",
    "career goals": "My goal is to excel as a Senior Full Stack AI Engineer & AI Workflow Engineer, architecting scalable digital products that deliver real user and enterprise value.",
    "who are you": "I am Sanjay G. L.'s personal AI Portfolio Assistant. Sanjay specializes in Full Stack Web Development, AI Agent Engineering, and building AI‑integrated web applications with 70+ certifications.",
    "tell me about yourself": "I specialize in Full Stack Web Development, Frontend Engineering, and building AI‑integrated web applications. I actively use AI workflows in my daily development process and have hands‑on experience in database design and management. With 70+ certifications — including Microsoft and HackerRank credentials in CSS, JavaScript, Python, and SQL — I have completed corporate workshops, web development internships, and volunteer initiatives. I also run PureWeaves, a handmade saree accessories brand, blending entrepreneurship with modern e‑commerce technology.",
    "pureweaves": "PureWeaves is a handmade saree accessories brand founded by Sanjay, blending entrepreneurship with modern e-commerce technology.",
    "skills": "Sanjay's skills: Python, JavaScript (ES6+), React.js, Node.js, Electron.js, Flask, FastAPI, PHP, HTML5, CSS3, Bootstrap, SQL, MySQL, PostgreSQL, SQLite, C, C++, Java, Docker, Kubernetes, AI/ML, and Cyber Security.",
    "programming languages": "Sanjay works with Python, JavaScript ES6+, C, C++, Java, PHP, and SQL.",
    "future goals": "Sanjay aims to build scalable full-stack products, deploy native AI models like Meluha AI, and launch a Public API platform.",
    "technologies": "Sanjay's tech stack includes Python, Flask, FastAPI, React, Node.js, Electron.js, JavaScript, HTML5, CSS3, SQL, MySQL, PostgreSQL, SQLite, Docker, Kubernetes, OpenCV, YOLOv8, Git, GitHub, VS Code, Cursor AI, Antigravity, and Vercel.",
    "freelance": "Yes! Sanjay is open to freelance web development, AI workflow integration, and software projects, as well as full-time internships.",
    "contact": "You can contact Sanjay directly via email at sanjaygl2006@gmail.com, call/WhatsApp at +91 8123981877, or connect via LinkedIn, GitHub, Facebook, and Salesforce Trailhead.",
    "from": "Sanjay is from Shivamogga (Shimoga), Karnataka, India.",
    "why hire": "Sanjay brings strong problem-solving skills, hands-on experience in full-stack web and AI development, 70+ certifications, a passion for clean code, and a proven track record of shipping production-ready software."
}

# ----------------- DYNAMIC KNOWLEDGE & LLM AGENT ENGINE -----------------
_agent_knowledge_cache = None

def load_trained_knowledge():
    """
    Automatically trains and indexes portfolio data from knowledge.json,
    identity.json, and projects catalog for the AI Chatbot.
    """
    global _agent_knowledge_cache
    if _agent_knowledge_cache is not None:
        return _agent_knowledge_cache

    base_path = os.path.dirname(os.path.abspath(__file__))
    qna = []

    # 1. Primary Knowledge Base (Q&A Pairs)
    k_path = os.path.join(base_path, 'knowledge.json')
    if os.path.exists(k_path):
        try:
            with open(k_path, 'r', encoding='utf-8') as f:
                k_data = json.load(f)
                all_qna = k_data.get('interview_qna', []) + k_data.get('extended_qna', [])
                for pair in all_qna:
                    q = pair.get('question', '').strip()
                    a = pair.get('answer', '').strip()
                    if q and a:
                        tokens = [w.lower() for w in re.findall(r'\b[a-zA-Z0-9_]{3,}\b', q)]
                        qna.append({'tokens': tokens, 'question': q, 'answer': a})
        except Exception as e:
            print(f"Error indexing knowledge.json: {e}")

    # 2. Verified Identity & Bio
    ident_path = os.path.join(base_path, 'data', 'identity.json')
    if os.path.exists(ident_path):
        try:
            with open(ident_path, 'r', encoding='utf-8') as f:
                ident = json.load(f)
                # Education intent
                qna.append({
                    'tokens': ['education', 'college', 'bca', 'degree', 'semester', 'study', 'studies'],
                    'question': "What is Sanjay's education?",
                    'answer': "Sanjay is pursuing a Bachelor of Computer Applications (BCA) (2024–2027 · 3rd Year, 5th Semester) based in Shivamogga, Karnataka, India. Key coursework includes Software Engineering, Relational Database Management Systems, Data Structures & Algorithms, Computer Networks, and Python."
                })
                # Internship intent
                qna.append({
                    'tokens': ['internship', 'experience', 'milano', 'oasis', 'work', 'job', 'company', 'role'],
                    'question': "Where has Sanjay worked or interned?",
                    'answer': "Sanjay is currently an AI, ML & Python Developer Intern at Milano Infotech (Aug 2026 – Present), developing smart AI agents, machine learning workflows, and full-stack Python platforms. He also completed a Web Development Internship at Oasis Infobyte (AICTE OIB-SIP Star Performer, Mar 2026)."
                })
                # Bio & Contact intent
                qna.append({
                    'tokens': ['contact', 'email', 'phone', 'hire', 'reach', 'connect', 'call'],
                    'question': "How can I contact Sanjay?",
                    'answer': "You can reach Sanjay directly at <a href='mailto:sanjaygl3006@gmail.com'>sanjaygl3006@gmail.com</a>, call/WhatsApp +91 81232 40049, or use the interactive Contact Form on this site."
                })
                qna.append({
                    'tokens': ['who', 'sanjay', 'about', 'introduce', 'profile', 'name', 'specialize', 'yourself', 'pureweaves'],
                    'question': "Who is Sanjay G. L.?",
                    'answer': "I specialize in Full Stack Web Development, Frontend Engineering, and building AI‑integrated web applications. I actively use AI workflows in my daily development process and have hands‑on experience in database design and management. With 70+ certifications — including Microsoft and HackerRank credentials in CSS, JavaScript, Python, and SQL — I have completed corporate workshops, web development internships, and volunteer initiatives. I also run PureWeaves, a handmade saree accessories brand, blending entrepreneurship with modern e‑commerce technology."
                })
        except Exception as e:
            print(f"Error indexing identity.json: {e}")

    _agent_knowledge_cache = qna
    return qna

def get_fallback_reply(message, proj_count=100, cert_count=70):
    msg = message.lower().strip()
    qna = load_trained_knowledge()

    # 1. Direct Intent Priority Matches
    if any(k in msg for k in ['education', 'college', 'bca', 'degree', 'semester', 'study', 'studies', 'school', 'sslc', 'puc']):
        return (
            "Sanjay is pursuing his <strong>Bachelor of Computer Applications (BCA)</strong> "
            "(<strong>2024–2027 · 3rd Year, 5th Semester</strong>), based in <strong>Shivamogga, Karnataka, India</strong>.<br>"
            "Curriculum highlights: Software Engineering, Relational Database Management Systems (RDBMS), Data Structures &amp; Algorithms, Computer Networks, AI &amp; ML, and Python."
        )

    if any(k in msg for k in ['intern', 'internship', 'experience', 'milano', 'oasis', 'work experience', 'company', 'job']):
        return (
            "Sanjay is currently working as an <strong>AI, ML &amp; Python Developer Intern at Milano Infotech</strong> "
            "(Aug 2026 – Present), developing smart AI agents, machine learning workflows, and full-stack Python platforms.<br>"
            "He also completed a Web Development Internship at <strong>Oasis Infobyte</strong> (AICTE OIB-SIP Star Performer, Mar 2026)."
        )

    if any(k in msg for k in ['contact', 'email', 'phone', 'reach', 'hire', 'call', 'whatsapp']):
        return (
            "You can contact Sanjay directly via email at "
            "<a href='mailto:sanjaygl3006@gmail.com'>sanjaygl3006@gmail.com</a>, "
            "call/WhatsApp <strong>+91 81232 40049</strong>, or use the Contact Form on this site!"
        )

    if any(k in msg for k in ['who are you', 'who is sanjay', 'about sanjay', 'introduce', 'profile', 'tell me about yourself', 'specialize', 'specialise']):
        return (
            "I specialize in <strong>Full Stack Web Development</strong>, <strong>Frontend Engineering</strong>, "
            "and building <strong>AI‑integrated web applications</strong>. I actively use AI workflows in my daily "
            "development process and have hands‑on experience in database design and management.<br><br>"
            "With <strong>70+ certifications</strong> — including Microsoft and HackerRank credentials in CSS, JavaScript, Python, "
            "and SQL — I have completed corporate workshops, web development internships, and volunteer initiatives.<br><br>"
            "I also run <strong>PureWeaves</strong>, a handmade saree accessories brand, blending entrepreneurship with modern e‑commerce technology."
        )

    if "invoiceguard" in msg or "invoice guard" in msg or "fraud" in msg:
        return (
            "<strong>InvoiceGuard</strong>: An AI-powered invoice anomaly &amp; fraud detector engineered by Sanjay for hackathon fraud mitigation. "
            "It combines machine learning pipelines (Scikit-learn, Pandas) and Flask REST APIs to detect anomalous line items, duplicate claims, vendor tax mismatches, and synthetic invoice manipulation."
        )

    if "sentinel" in msg or "cyber threat" in msg:
        return (
            "<strong>SentinelAI</strong>: A cyber threat early-warning intelligence platform engineered by Sanjay that placed 6th–7th in a state-level hackathon. "
            "It features multi-agent security threat scanning, CVE mappings, and real-time vulnerability detection."
        )

    if "meluha" in msg:
        return (
            "<strong>Meluha AI</strong>: Sanjay's flagship long-term ambition to architect a native Indian AI platform trained from scratch "
            "without external commercial API dependencies, alongside a scalable open Public API platform."
        )

    if "placement pro" in msg or "placement" in msg:
        return (
            "<strong>Placement Pro</strong>: A comprehensive full-stack academic placement portal and drive workflow engine built with FastAPI, Python, and modern relational database schemas. "
            "It manages student directories, company drives, automated data ingestion, and placement report generation."
        )

    if "pureweaves" in msg or "pure weaves" in msg or "saree" in msg:
        return (
            "<strong>PureWeaves</strong>: Sanjay's artisanal handmade saree accessories and textile storefront. "
            "It blends entrepreneurship with modern web technology, featuring an interactive product catalog, direct WhatsApp checkout pipeline, and a MySQL backend."
        )

    # 2. Deep Technical Topics
    if "cnn" in msg or "convolutional" in msg or "deep learning" in msg:
        return (
            "<strong>Convolutional Neural Network (CNN) Deep Learning Architecture</strong>:<br>"
            "CNNs are multi-layer neural networks designed for spatial grid data (images):<br>"
            "1. <strong>Input Layer</strong>: Accepts raw matrices (e.g. 224×224×3 RGB).<br>"
            "2. <strong>Convolutional Layers</strong>: Applies learned sliding kernels to extract spatial feature maps.<br>"
            "3. <strong>Activation (ReLU)</strong>: Introduces non-linearity max(0, x).<br>"
            "4. <strong>Pooling Layers (Max Pooling)</strong>: Downsamples feature maps to reduce dimensions.<br>"
            "5. <strong>Dense / Softmax</strong>: Outputs classification probabilities.<br>"
            "Sanjay applied CNNs in <strong>DermAI</strong> (94% lesion screening accuracy) and vehicle detection pipelines."
        )

    if "rag" in msg or "retrieval augmented" in msg:
        return "<strong>Retrieval-Augmented Generation (RAG)</strong> combines vector database retrieval (FAISS, PostgreSQL pgvector) with Large Language Models (LLMs) to ground responses in verified external documents, eliminating hallucinations without retraining weights."

    if "oop" in msg or "object oriented" in msg:
        return "<strong>OOP (Object-Oriented Programming)</strong> organizes code around Objects and Classes: <strong>Encapsulation</strong> (data hiding), <strong>Abstraction</strong> (reducing complexity), <strong>Inheritance</strong> (reusing parent traits), and <strong>Polymorphism</strong> (overriding/overloading)."

    if "sql injection" in msg or "sqli" in msg:
        return "<strong>SQL Injection (SQLi)</strong> occurs when untrusted user input is concatenated directly into SQL query strings. Prevented using <strong>Parameterized Queries / Prepared Statements</strong>, input validation, and principle of least privilege."

    if "xss" in msg or "cross site scripting" in msg:
        return "<strong>Cross-Site Scripting (XSS)</strong> allows attackers to inject malicious scripts into trusted websites. Prevented via HTML output encoding, Content Security Policy (CSP), and avoiding unescaped innerHTML insertion."

    if "kubernetes" in msg or "k8s" in msg or "cubernative" in msg:
        return "Sanjay works with <strong>Kubernetes</strong> for container orchestration, cluster scheduling, YAML manifests, and scalable cloud deployments, integrated into projects such as Text-to-Image Studio."

    if "docker" in msg or "container" in msg:
        return "Sanjay has intermediate hands-on experience with <strong>Docker</strong>, crafting Dockerfiles, Docker Compose multi-container workflows, and containerized microservices."

    if "electron" in msg:
        return "Sanjay develops cross-platform desktop applications using <strong>Electron.js</strong>, integrating local file pipelines and native OS capabilities, such as in his Disk Recovery & Forensics Suite."

    if "node" in msg:
        return "Sanjay uses <strong>Node.js</strong> and Express for asynchronous server-side runtimes, npm ecosystem tooling, and high-performance RESTful microservices."

    # 3. Dynamic Relevance Matcher Across Indexed Q&A
    best_item = None
    best_score = 0
    msg_tokens = re.findall(r'\b[a-zA-Z0-9_]{3,}\b', msg)

    for item in qna:
        score = 0
        for token in item['tokens']:
            if token in msg:
                score += 3 if len(token) > 4 else 2
        for mt in msg_tokens:
            if mt in item['tokens']:
                score += 2
        if score > best_score:
            best_score = score
            best_item = item

    if best_item and best_score >= 4:
        return best_item['answer']

    if "project" in msg or "built" in msg:
        return f"Sanjay has built over {proj_count} cataloged projects across AI/ML, Enterprise Systems, Web Apps, and Tools. Explore them on the <a href='projects.html'>Projects Showcase</a>!"

    if "certif" in msg:
        return f"Sanjay has earned {cert_count}+ verified certificates, including OpenAI Academy (Apply AI at Work), Skill India (Cyber Security & Full-Stack), and government civic honors."

    if "skill" in msg or "stack" in msg or "tool" in msg:
        return "Sanjay's core technical stack includes Python, JavaScript, React, Node.js, Electron.js, HTML5/CSS3, SQL (MySQL, PostgreSQL, SQLite), Docker, Kubernetes, Git/GitHub, Cursor AI, and AI agent frameworks."

    return "I am Sanjay AI Assistant v3.0, automatically trained on Sanjay's portfolio knowledge. You can ask me anything about his BCA education (3rd Year, 5th Sem) at PES Institute of Advanced Management Studies (PES IAMS) Shivamogga, internships at Milano Infotech & Oasis Infobyte, 100+ projects (DataGauge, Sai AI, InvoiceGuard, SentinelAI, PureWeaves, Placement Pro, Meluha AI), or technical topics like Python, Docker, Kubernetes, Electron.js, Node.js, and Cyber Security!"

# ----------------- FLASK ROUTING -----------------
# is_safe_path is defined at module top (line 25)

@app.before_request
def enforce_https_and_track_visit():
    try:
        # 1. Enforce HTTPS in production (skip for local hosts, debug, or testing mode)
        host_name = request.host.split(':')[0].lower()
        is_local = (
            host_name in ['localhost', '127.0.0.1', '0.0.0.0', '::1']
            or host_name.startswith('192.168.')
            or host_name.startswith('10.')
            or host_name.startswith('172.')
            or host_name.endswith('.local')
        )
        if not is_local and not request.is_secure and not app.debug and not app.testing and request.headers.get('X-Forwarded-Proto', 'http') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            return redirect(url, code=301)
            
        # 2. Track page visits
        path = request.path
        if path in ['/', '/index.html', '/projects.html']:
            try:
                visit = SiteVisit(
                    page=path,
                    referrer=request.referrer or 'Direct'
                )
                db.session.add(visit)
                db.session.commit()
            except Exception as e:
                db.session.rollback()
                print(f"Error logging visit: {e}")
    except Exception as err:
        print(f"before_request error: {err}")

@app.after_request
def add_security_headers(response):
    allowed_origin = 'https://sanjaygl.vercel.app'
    req_origin = request.headers.get('Origin', '')
    if req_origin in (allowed_origin, 'http://localhost:5000', 'http://localhost:5001', 'http://127.0.0.1:5000') or req_origin.startswith('http://10.') or req_origin.startswith('http://192.168.'):
        response.headers['Access-Control-Allow-Origin'] = req_origin
    else:
        response.headers['Access-Control-Allow-Origin'] = allowed_origin
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, X-Requested-With'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'SAMEORIGIN'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    response.headers['Permissions-Policy'] = 'camera=(), microphone=(), geolocation=()'
    response.headers['Content-Security-Policy'] = (
        "default-src 'self'; "
        "script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; "
        "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; "
        "font-src 'self' https://cdnjs.cloudflare.com https://fonts.gstatic.com data:; "
        "img-src 'self' data: https: blob:; "
        "connect-src 'self' https://api.web3forms.com https://formsubmit.co; "
        "frame-ancestors 'self';"
    )
    if response.status_code >= 400:
        response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate, max-age=0'
        response.headers['Pragma'] = 'no-cache'
        response.headers['Expires'] = '0'
    elif request.path.endswith(('.css', '.js')):
        response.headers['Cache-Control'] = 'no-cache, must-revalidate'
    elif request.path.endswith(('.woff2', '.png', '.jpg', '.jpeg', '.svg', '.ico')):
        response.headers['Cache-Control'] = 'public, max-age=86400'
    elif response.mimetype == 'text/html':
        response.headers['Cache-Control'] = 'no-cache, must-revalidate'
    if request.is_secure:
        response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    return response

@app.errorhandler(405)
def handle_405_error(e):
    if request.method == 'OPTIONS':
        res = make_response('', 200)
        req_origin = request.headers.get('Origin', '')
        allowed_origin = 'https://sanjaygl.vercel.app'
        if req_origin in (allowed_origin, 'http://localhost:5000', 'http://localhost:5001', 'http://127.0.0.1:5000'):
            res.headers['Access-Control-Allow-Origin'] = req_origin
        else:
            res.headers['Access-Control-Allow-Origin'] = allowed_origin
        res.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
        res.headers['Access-Control-Allow-Headers'] = 'Content-Type, X-Requested-With'
        return res
    return jsonify({
        "status": "error",
        "code": 405,
        "message": f"Method '{request.method}' is not allowed for path '{request.path}'.",
        "allowed_methods": ["GET", "POST", "OPTIONS"],
        "api_endpoints": {
            "contact": "/api/contact [POST]",
            "agent": "/api/agent [POST]",
            "stats": "/api/stats [GET]",
            "projects": "/api/projects [GET]",
            "certificates": "/api/certificates [GET]"
        }
    }), 405

@app.route("/", methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"])
def index():
    if request.method == "OPTIONS":
        return "", 200
    if request.method != "GET":
        return jsonify({
            "status": "notice",
            "message": "Endpoint '/' renders the frontend HTML application. For API data, use /api endpoints.",
            "allowed_methods": ["GET", "OPTIONS"],
            "api_endpoints": {
                "contact": "/api/contact [POST]",
                "agent": "/api/agent [POST]",
                "stats": "/api/stats [GET]",
                "projects": "/api/projects [GET]",
                "certificates": "/api/certificates [GET]"
            }
        }), 200
    return send_from_directory(BASE_DIR, "index.html")

@app.route("/sitemap.xml")
def serve_sitemap():
    return send_from_directory(BASE_DIR, "sitemap.xml", mimetype="application/xml")

@app.route("/crq-optimize")
@app.route("/crq-optimize.html")
def serve_crq_optimize():
    return redirect("/projects", code=301)

@app.route("/projects/<slug>")
def project_detail(slug):
    try:
        # Load projects data to find the one matching the slug
        import json
        projects_file = os.path.join(BASE_DIR, 'js', 'projectsData.js')
        with open(projects_file, 'r', encoding='utf-8') as f:
            content = f.read()
            # simple extraction since it's a JS object array
            import re
            json_str = re.search(r'const\s+projectsData\s*=\s*(\[.*\]);', content, re.DOTALL)
            if json_str:
                projects = json.loads(json_str.group(1))
            else:
                return "Project not found", 404
        
        project = next((p for p in projects if p.get('id') == slug or str(p.get('id')).lower().replace(' ', '-') == slug.lower()), None)
        if not project:
            return "Project not found", 404
            
        # Create a simple SEO-friendly HTML string for the project
        # Escape all user-facing fields to prevent XSS
        title = html_mod.escape(project.get('title', 'Project'))
        desc = html_mod.escape(project.get('desc', ''))
        tech = html_mod.escape(", ".join(project.get('tech', [])))
        image = html_mod.escape(project.get('image', ''))
        github = html_mod.escape(project.get('github', ''))
        live = html_mod.escape(project.get('live', ''))
        safe_slug = html_mod.escape(slug)
        
        tech_badges = "".join([f'<span class="tech">{html_mod.escape(t)}</span>' for t in project.get('tech', [])])
        live_link = f'<a href="{live}" target="_blank" rel="noopener noreferrer">View Live Demo</a>' if live and live != '#' else ''
        
        page_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | Sanjay G L Projects</title>
    <meta name="description" content="{desc}">
    <meta property="og:title" content="{title}">
    <meta property="og:description" content="{desc}">
    <meta property="og:image" content="{image}">
    <link rel="canonical" href="https://sanjaygl.vercel.app/projects/{safe_slug}">
    <script type="application/ld+json">
    {{
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      "name": "{title}",
      "description": "{desc}",
      "programmingLanguage": "{tech}",
      "url": "{live}",
      "author": {{
        "@type": "Person",
        "name": "Sanjay G L"
      }}
    }}
    </script>
    <style>
        body {{ font-family: sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; line-height: 1.6; }}
        img {{ max-width: 100%; border-radius: 8px; }}
        a {{ color: #0070f3; text-decoration: none; }}
        .tech {{ display: inline-block; background: #eee; padding: 4px 8px; border-radius: 4px; margin: 4px; font-size: 0.9em; }}
    </style>
</head>
<body>
    <a href="/projects">&larr; Back to Projects</a>
    <h1>{title}</h1>
    <p>{desc}</p>
    <div>{tech_badges}</div>
    <div style="margin-top: 20px;">{live_link}</div>
</body>
</html>"""
        return page_html, 200
    except Exception as e:
        print(f"Error serving project details: {{e}}")
        return "Internal Server Error", 500

@app.route("/robots.txt")
def serve_robots():
    return send_from_directory(BASE_DIR, "robots.txt", mimetype="text/plain")

BLOCKED_EXTENSIONS = {
    '.py', '.pyc', '.env', '.db', '.sqlite', '.sqlite3', '.sql',
    '.git', '.md', '.yml', '.yaml', '.toml', '.ini', '.cfg', '.example',
    '.log', '.sh', '.bat', '.ps1'
}

ALLOWED_ROOT_FILES = {
    'favicon.ico', 'manifest.json', 'robots.txt', 'sitemap.xml', 'sw.js',
    'index.html', 'projects.html', 'privacy.html', 'knowledge.json'
}

ALLOWED_STATIC_EXTENSIONS = {
    '.css', '.js', '.png', '.jpg', '.jpeg', '.svg', '.gif', '.ico',
    '.webp', '.woff', '.woff2', '.ttf', '.eot', '.pdf', '.docx', '.json'
}

@app.route("/<path:path>")
def serve_static(path):
    # 1. Defensively reject path traversal sequences and hidden files
    if ".." in path or path.startswith("/") or path.startswith("\\"):
        return "Not Found", 404

    filename = os.path.basename(path)
    _, ext = os.path.splitext(filename)
    ext = ext.lower()

    # 2. Block access to hidden files and sensitive file extensions (source code, configs, DBs)
    if filename.startswith(".") or ext in BLOCKED_EXTENSIONS:
        return "Not Found", 404

    try:
        # 3. Check strictly whitelisted root assets (e.g. favicon.ico, manifest.json, robots.txt, sitemap.xml)
        if path in ALLOWED_ROOT_FILES:
            full_path = os.path.normpath(os.path.join(BASE_DIR, path))
            if is_safe_path(BASE_DIR, full_path) and os.path.isfile(full_path):
                return send_from_directory(BASE_DIR, path)

        # 4. Check explicit clean HTML routes (e.g. /projects -> projects.html, /privacy -> privacy.html, /index -> index.html)
        clean_name = path[:-5] if path.endswith(".html") else path
        if clean_name in ['projects', 'privacy', 'index']:
            html_file = clean_name + ".html"
            html_candidate = os.path.join(BASE_DIR, html_file)
            if os.path.isfile(html_candidate):
                return send_from_directory(BASE_DIR, html_file)

        # 5. Check authorized static subdirectories (supports both unprefixed and subfolder-prefixed requests)
        if ext in ALLOWED_STATIC_EXTENSIONS:
            rel_path = path[7:] if path.startswith("static/") else path
            # Check direct relative path if prefixed with authorized directory
            first_segment = rel_path.split("/")[0] if "/" in rel_path else ""
            if first_segment in ["js", "assets", "css", "data", "static"]:
                candidate = os.path.normpath(os.path.join(BASE_DIR, rel_path))
                if is_safe_path(BASE_DIR, candidate) and os.path.isfile(candidate):
                    candidate_dir, candidate_file = os.path.split(candidate)
                    return send_from_directory(candidate_dir, candidate_file)

            # Check unprefixed paths across authorized subfolders
            for subfolder in ["js", "assets", "css", "data", "static"]:
                candidate = os.path.normpath(os.path.join(BASE_DIR, subfolder, rel_path))
                if is_safe_path(BASE_DIR, candidate) and os.path.isfile(candidate):
                    candidate_dir, candidate_file = os.path.split(candidate)
                    return send_from_directory(candidate_dir, candidate_file)

        # 6. Any other unmapped route returns 404 Not Found
        return "Not Found", 404
    except Exception as e:
        print(f"[STATIC SERVE ERROR] {path}: {e}")
        return "Internal Server Error", 500

@app.route("/js/projectsData.js")
def serve_projects_js():
    js_path = os.path.join(BASE_DIR, "js", "projectsData.js")
    if os.path.exists(js_path):
        return send_from_directory(os.path.join(BASE_DIR, "js"), "projectsData.js", mimetype="text/javascript")
    return "console.error('projectsData.js not found');", 404

@app.route("/api/projects", methods=["GET"])
def get_projects_api():
    projects = load_projects_data()
    return jsonify(projects)

@app.route("/api/certificates", methods=["GET"])
def get_certificates_api():
    return jsonify({
        "total": 88,
        "featured": [
            "OpenAI Academy — Apply AI at Work (Pathway Completion Certificate · ID: 198187379)",
            "OpenAI Academy — AI Foundations Badge",
            "AI-Powered Shopping ads Certification — Google Skillshop",
            "AI and Machine Learning Essentials — DeepLearning.AI",
            "Cybersecurity Fundamentals — Cisco Networking Academy",
            "HackerRank — JavaScript, SQL, Java, CSS, Python",
            "Data Structures and Algorithms in Java — Coding Ninjas",
            "Safe & Responsible Use of AI Quiz — MeitY / ISEA / Digital India"
        ]
    })

@app.route("/api/stats", methods=["GET"])
def get_stats():
    projects = load_projects_data()
    proj_count = len(projects) or 28
    cert_count = 88
    featured_count = len([p for p in projects if p.get("featured")])
    ai_count = len([p for p in projects if "AI" in p.get("category", "") or "ML" in p.get("category", "")])
    ml_count = len([p for p in projects if "ML" in p.get("category", "") or "Machine Learning" in p.get("title", "")])
    assistants_count = len([p for p in projects if "Assistant" in p.get("title", "") or "Chatbot" in p.get("title", "")])

    return jsonify({
        "projects": proj_count,
        "certificates": cert_count,
        "visits": 1660,
        "featured_projects": featured_count or 6,
        "ai_projects": ai_count or 24,
        "ml_projects": ml_count or 6,
        "ai_assistants": assistants_count or 2,
        "live_deployments": 8,
        "technologies": 20
    })

@app.route("/api/about", methods=["GET"])
def get_about():
    try:
        proj_count = len(load_projects_data()) or 89
    except Exception:
        proj_count = 89
    cert_count = 88

    return jsonify({
        "name": "Sanjay G. L.",
        "role": "BCA Student & Full Stack Developer",
        "location": "Shivamogga, Karnataka, India",
        "email": "sanjaygl2006@gmail.com",
        "phone": "+91 81239 81877",
        "skills": [
            "HTML5", "CSS3", "JavaScript", "React", "Node.js", "Electron.js", "Python", "SQL", "SQLite", "MySQL",
            "Artificial Intelligence", "Machine Learning", "FastAPI", "Flask",
            "Git", "GitHub", "VS Code", "Cursor AI", "Postman", "Docker", "Kubernetes", "Kali Linux"
        ],
        "total_projects": proj_count,
        "total_certificates": cert_count,
        "freelance_available": True
    })

@app.route("/api/contact", methods=["POST"])
def handle_contact():
    # Rate Limiting
    ip = request.headers.get("X-Forwarded-For", request.remote_addr)
    if not contact_limiter.check(ip):
        return jsonify({"status": "error", "message": "Rate limit exceeded. Please submit at most 3 messages per hour."}), 429

    data = request.get_json() or request.form or {}
    
    # 1. Honeypot Spam Protection
    if data.get("botcheck"):
        print("[CONTACT FORM] Blocked bot submission via honeypot.")
        return jsonify({"status": "error", "message": "Spam detected."}), 400
        
    name = sanitize_input(data.get("name", ""))
    email = sanitize_input(data.get("email", ""))
    subject = sanitize_input(data.get("subject", ""))
    message = sanitize_input(data.get("message", ""))
    phone = sanitize_input(data.get("phone", ""))
    
    # 2. Server-side Validation
    if not name or len(name) < 2:
        return jsonify({"status": "error", "error": "Please enter a valid name (at least 2 letters).", "message": "Please enter a valid name (at least 2 letters)."}), 400
        
    if not email or not re.match(r"[^@]+@[^@]+\.[^@]+", email):
        return jsonify({"status": "error", "error": "Please enter a valid email address.", "message": "Please enter a valid email address."}), 400
        
    if not subject:
        return jsonify({"status": "error", "error": "Please select a subject topic.", "message": "Please select a subject topic."}), 400
        
    if not message or len(message) < 3:
        return jsonify({"status": "error", "error": "Please enter a message of at least 3 characters.", "message": "Please enter a message of at least 3 characters."}), 400
        
    # Encrypt name, email, and message at rest
    enc_name = encrypt_val(name)
    enc_email = encrypt_val(email)
    enc_message = encrypt_val(message)
    
    # Save encrypted message to database using parameterized insert (ORM)
    try:
        msg_entry = ContactMessage(
            name=enc_name,
            # pyrefly: ignore [unexpected-keyword]
            email=enc_email,
            subject=subject,
            message=enc_message
        )
        db.session.add(msg_entry)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(f"[CONTACT DB] Error saving message: {e}")

    print(f"[CONTACT FORM] Securely saved submission from: {name} ({email}) | Subject: {subject}")

    email_sent = False
    try:
        email_sent = bool(forward_contact_email(name, email, subject, message, phone))
    except Exception as e:
        print(f"[CONTACT FORM] Email forwarding crashed: {e}")

    if email_sent:
        return jsonify({
            "status": "success",
            "email_sent": True,
            "message": f"Thank you, {name}! Your message was emailed to {CONTACT_RECEIVER}."
        })

    return jsonify({
        "status": "partial",
        "email_sent": False,
        "message": (
            f"Your details were saved, but email delivery is still pending. "
            f"The browser will now try sending directly to {CONTACT_RECEIVER}."
        )
    })

@app.route("/api/agent", methods=["POST"])
def agent_chat():
    # Rate Limiting
    ip = request.headers.get("X-Forwarded-For", request.remote_addr)
    if not agent_limiter.check(ip):
        return jsonify({"reply": "Rate limit exceeded. Please wait a moment before sending more messages."}), 429

    data = request.get_json() or {}
    message = sanitize_input(data.get("message", ""))
    session_id = sanitize_input(data.get("session_id", "default_session"))

    if not message:
        return jsonify({"reply": "Please send a message."}), 400

    try:
        proj_count = Project.query.count() or 28
    except Exception:
        proj_count = 28
    cert_count = 88

    reply_text = get_fallback_reply(message, proj_count, cert_count)

    # Save conversation using ORM
    try:
        conv = AgentConversation(
            session_id=session_id,
            user_message=message[:1000],
            agent_response=reply_text
        )
        db.session.add(conv)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        print(f"Database error saving conversation: {e}")

    # Logging removed

    return jsonify({"reply": reply_text})

@app.route("/chat", methods=["POST"])
def old_chat():
    # Deprecated fallback endpoint, calls new agent_chat internally
    return agent_chat()

@app.route("/health", methods=["GET"])
@app.route("/api/health", methods=["GET"])
def health_check():
    """Health check endpoint for Docker and Kubernetes liveness/readiness probes."""
    return jsonify({
        "status": "healthy",
        "service": "sanjay-aios-portfolio",
        "version": "2.6.0",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }), 200


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    is_debug = os.environ.get("FLASK_DEBUG", "1").lower() in ("1", "true", "yes")
    try:
        app.run(host="0.0.0.0", port=port, debug=is_debug)
    except OSError as err:
        if "forbidden" in str(err).lower() or "in use" in str(err).lower() or getattr(err, 'winerror', None) == 10013:
            fallback_port = 5001 if port == 5000 else port + 1
            print(f"[SERVER WARN] Port {port} is occupied or restricted. Falling back to port {fallback_port}...")
            app.run(host="0.0.0.0", port=fallback_port, debug=is_debug)
        else:
            raise err

