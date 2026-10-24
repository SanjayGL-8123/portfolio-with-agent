// Projects Dataset for Sanjay G. L. Portfolio
const projectsData = [
  {
    "id": "crq-optimize",
    "title": "CRQ Optimize — Cyber Risk Quantification & Investment Platform",
    "year": 2026,
    "category": "Tools & Security",
    "tagline": "Turn Cyber Risk into Business Decisions under budget constraints.",
    "description": "A cyber risk quantification and security investment optimization platform designed to help organizations understand potential financial losses, prioritize security controls, and allocate limited cybersecurity budgets using probabilistic risk modeling (10k Monte Carlo trials) and budget-constrained optimization.",
    "tech": [
      "Python",
      "FastAPI",
      "React",
      "Vite",
      "PostgreSQL",
      "SQLite",
      "Monte Carlo (10k Runs)",
      "NumPy",
      "SciPy",
      "FAIR Model"
    ],
    "live": "https://github.com/SanjayGL-8123/crq-optimize",
    "featured": true,
    "icon": "fa-shield-halved",
    "image": "assets/crq_optimize_cover.svg",
    "overview": "CRQ Optimize transforms raw security findings, scanner logs, and vulnerability telemetry into annualized financial loss distributions (EAL, P50, P90, P95). Its non-linear optimization solver evaluates candidate mitigations using 1 − (1 − p₁)(1 − p₂) to prevent double-counting overlapping controls, selecting the portfolio that yields maximum modeled risk reduction under hard financial budget caps.",
    "architecture": "React 18 frontend with dark cyber dashboard aesthetics communicates via REST with a FastAPI backend. Vectorized NumPy/SciPy engines run 10,000 Monte Carlo iterations for loss distributions. Relational PostgreSQL / SQLite schemas store organizations, business services, assets, findings, mitigation catalogs, and immutable operational audit events.",
    "features": [
      "Continuous data ingestion with CSV/JSON schema validation",
      "Finding-to-asset correlation with ambiguity tracking",
      "Monte Carlo simulation engine (10,000 iterations per scenario)",
      "Financial loss exceedance curves calculating EAL, P50, P90, and P95",
      "Non-linear control overlap modeling: 1 − (1 − p₁)(1 − p₂)",
      "Knapsack-based budget-constrained portfolio optimization solver",
      "Before-and-after risk comparison with net ROI tracking",
      "Data Quality & Telemetry Completeness scoring (0–100%)",
      "Four-role governance matrix (Admin, Analyst, Executive, Auditor)",
      "Defensible audit trails and exportable executive decision memos"
    ],
    "stats": {
      "Sim Runs": "10,000 trials",
      "Baseline EAL": "$242.5K",
      "Overlap Math": "1−(1−p₁)(1−p₂)",
      "Budget Solver": "Knapsack"
    }
  },
  {
    "id": 29,
    "title": "DataGauge — Dataset Quality Monitoring System",
    "year": 2026,
    "category": "AI & ML",
    "tagline": "Full-stack CSV/Excel quality scoring, issue flags, guided cleaning, and PDF/Excel reports.",
    "description": "A FastAPI + React dataset quality platform that uploads CSV/Excel files and computes a live 0–100 quality score, categorized issues, interactive dashboards, guided cleaning, and downloadable PDF/Excel reports.",
    "tech": [
      "Python",
      "FastAPI",
      "Pandas",
      "NumPy",
      "SciPy",
      "SQLAlchemy",
      "React",
      "Vite",
      "Tailwind CSS",
      "Recharts",
      "JWT",
      "ReportLab",
      "OpenPyXL"
    ],
    "live": null,
    "featured": true,
    "icon": "fa-gauge-high",
    "image": "assets/datagauge_cover.svg",
    "overview": "DataGauge lets users upload CSV or Excel datasets and receive an automatic quality assessment: completeness, validity, consistency, uniqueness, and anomaly scores plus issue management, history trends, and user-approved cleaning that never mutates the original file.",
    "architecture": "React 18 (Vite, Tailwind, Axios, Recharts) talks to a FastAPI backend. Pandas/NumPy/SciPy power a modular quality engine (one module per check). SQLAlchemy stores users, datasets, issues, and history with PostgreSQL, MySQL, or SQLite via DATABASE_URL. JWT + bcrypt protect routes; ReportLab and OpenPyXL generate reports.",
    "features": [
      "JWT authentication with Admin / Analyst / Viewer roles",
      "Drag-and-drop CSV, XLSX, and XLS upload with validation pipeline",
      "Modular quality engine: completeness, duplicates, types, validity, consistency, dates, booleans, outliers, logical rules",
      "Configurable 0–100 weighted quality score (defaults: 25/20/20/20/15)",
      "Interactive dashboard with 10 Recharts visualizations",
      "Searchable preview with problematic-cell highlighting",
      "Issue workflow: Open → Reviewed → Resolved / Ignored",
      "Guided cleaning that writes a new file and compares before/after scores",
      "PDF, Excel, and CSV issue reports",
      "Quality history trends across analysis runs"
    ],
    "stats": {
      "Quality Score": "0–100 live",
      "Check Modules": "10+",
      "Chart Types": "10",
      "Reports": "PDF + Excel"
    }
  },
  {
    "id": 27,
    "title": "DermAI — AI-Powered Skincare Diagnosis App",
    "year": 2026,
    "category": "AI & ML",
    "tagline": "Deep learning skin lesion analysis and dermatology diagnostic assistant.",
    "description": "An AI-powered dermatological diagnostic assistant that screens skin lesions using CNN models, providing risk classifications and clinical care recommendations.",
    "tech": [
      "Python",
      "Flask",
      "TensorFlow",
      "Keras",
      "OpenCV",
      "Scikit-image",
      "HTML5",
      "CSS3",
      "JavaScript"
    ],
    "live": null,
    "featured": true,
    "icon": "fa-stethoscope",
    "image": "assets/dermait_cover.png",
    "overview": "DermAI is a healthcare AI utility applying Deep Learning Convolutional Neural Networks (CNN) to screen and classify skin lesions from digital camera images. It serves as a triage assistant for clinical dermatology workflows.",
    "architecture": "Developed on a Python Flask framework serving predictions from a TensorFlow/Keras model. The frontend handles image uploads, local preprocessing via HTML5 Canvas, and displays prediction graphs and probabilities using Chart.js.",
    "features": [
      "TensorFlow / Keras CNN Model (94% accuracy)",
      "Image preprocessing pipeline using OpenCV & Scikit-image",
      "Real-time chart display of prediction probabilities",
      "Dermatology triage flow charts & clinical advice recommendations",
      "Secure user upload data sanitization",
      "Mobile-first responsive design for quick triage tests",
      "PDF diagnostic summary generation"
    ],
    "stats": {
      "Model Accuracy": "94%",
      "Training Epochs": "75 Epochs",
      "Inference Time": "< 120ms"
    }
  },
  {
    "id": 24,
    "title": "Accident Risk Prediction — Machine Learning based accident risk prediction system for safer roads.",
    "year": 2026,
    "category": "AI & ML",
    "tagline": "Machine Learning based accident risk prediction system for safer roads.",
    "description": "A Machine Learning web application that predicts traffic accident risks using road conditions, weather, traffic volume, and historical accident patterns.",
    "tech": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Python",
      "Flask",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Joblib",
      "SQLite"
    ],
    "live": null,
    "featured": true,
    "icon": "fa-triangle-exclamation",
    "image": "assets/accident_prediction_cover.png",
    "overview": "A Machine Learning web application that predicts traffic accident risks using road conditions, weather, traffic volume, and historical accident patterns to improve road safety.",
    "architecture": "Python Flask application utilizing a pre-trained Random Forest Classifier model saved via Joblib. The frontend collects road parameters and environmental factors, sending asynchronous REST requests to Flask endpoints for real-time risk probability calculation.",
    "features": [
      "Random Forest Machine Learning model achieving 98% prediction accuracy",
      "Multi-variable input parameters: Weather conditions, Road surface, Traffic volume, Lighting",
      "Real-time hazard level scoring and percentage risk index output",
      "SQLite integration storing historical accident trends and road safety data",
      "Interactive data visualizations for high-risk zones and recommended speed safety margins"
    ],
    "stats": {
      "Accuracy": "98%",
      "Dataset Size": "10k+ Records",
      "Model Type": "Random Forest"
    }
  },
  {
    "id": 1,
    "title": "AI Agent using Google API — Autonomous assistant powered by Google AI APIs for intelligent conversations & task automation.",
    "year": 2025,
    "category": "AI & ML",
    "tagline": "Autonomous assistant powered by Google AI APIs for intelligent conversations & task automation.",
    "description": "An AI-powered assistant integrated with Google AI APIs for intelligent conversations, reasoning, and context-aware task automation.",
    "tech": [
      "Python",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Google AI API",
      "Google Cloud Run"
    ],
    "live": null,
    "featured": true,
    "icon": "fa-robot",
    "image": null,
    "overview": "An AI-powered assistant integrated with Google AI APIs for intelligent conversations, reasoning, and context-aware task automation.",
    "architecture": "",
    "features": [],
    "stats": {
      "API": "Google AI Studio",
      "Mode": "Autonomous Agent",
      "Deployment": "Cloud Run"
    }
  },
  {
    "id": 26,
    "title": "Sindhanai Full Stack AI — Full stack AI-driven content generation and workflow platform.",
    "year": 2026,
    "category": "AI & ML",
    "tagline": "Full stack AI-driven content generation and workflow platform.",
    "description": "A premium full-stack AI workspace facilitating document summarization, customized coding templates, automated content creation, and secure chatbot dialogs.",
    "tech": [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Google Gemini API",
      "Tailwind CSS",
      "JWT"
    ],
    "live": null,
    "featured": true,
    "icon": "fa-brain",
    "image": "assets/sindhanai_cover.png",
    "overview": "A premium full-stack AI workspace facilitating document summarization, customized coding templates, automated content creation, and secure chatbot dialogs.",
    "architecture": "",
    "features": [],
    "stats": {
      "API Latency": "< 800ms",
      "Accuracy": "Gemini Pro",
      "Auth Model": "JWT Token"
    }
  },
  {
    "id": 25,
    "title": "Sai AI Assistant — Modern AI assistant powered by Gemini with productivity tools.",
    "year": 2026,
    "category": "AI & ML",
    "tagline": "Modern AI assistant powered by Gemini with productivity tools.",
    "description": "An AI-powered assistant capable of chatting, answering educational questions, generating code, showing live news, saving conversations, and helping users with productivity.",
    "tech": [
      "HTML",
      "CSS",
      "JavaScript",
      "Python",
      "Flask",
      "SQLite",
      "Google Gemini API"
    ],
    "live": null,
    "featured": true,
    "icon": "fa-robot",
    "image": "assets/sai_assistant_cover.png",
    "overview": "An AI-powered assistant capable of chatting, answering educational questions, generating code, showing live news, saving conversations, and helping users with productivity.",
    "architecture": "",
    "features": [],
    "stats": {
      "API Version": "Gemini Pro",
      "Response Time": "< 1.5s",
      "Storage": "SQLite DB"
    }
  },
  {
    "id": 30,
    "title": "Traffic & Vehicle Object Detection with YOLOv8 — Real-time computer vision system for traffic monitoring & vehicle detection using YOLOv8.",
    "year": 2026,
    "category": "AI & ML",
    "tagline": "Real-time computer vision system for traffic monitoring & vehicle detection using YOLOv8.",
    "description": "High-performance object detection model trained on traffic surveillance datasets to detect cars, buses, motorcycles, and pedestrians with bounding box confidence scores.",
    "tech": [
      "Python",
      "YOLOv8",
      "OpenCV",
      "PyTorch",
      "Flask",
      "Chart.js"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-car-side",
    "image": null,
    "overview": "Computer vision application that processes live camera feeds or video files, detecting vehicle classes, counting traffic density, and calculating road congestion stats.",
    "architecture": "",
    "features": [],
    "stats": {
      "Model": "YOLOv8 Nano/Small",
      "Detection Speed": "69+ FPS",
      "Precision": "92% mAP"
    }
  },
  {
    "id": 37,
    "title": "Indian Traffic Sign Detection App — Deep learning traffic sign classification for Indian road navigation & autonomous safety.",
    "year": 2026,
    "category": "AI & ML",
    "tagline": "Deep learning traffic sign classification for Indian road navigation & autonomous safety.",
    "description": "Computer vision app trained to recognize Indian regulatory, warning, and informatory traffic road signs in real-time from camera feeds.",
    "tech": [
      "Python",
      "TensorFlow",
      "Keras",
      "OpenCV",
      "Flask"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-diamond-turn-right",
    "image": null,
    "overview": "Computer vision app trained to recognize Indian regulatory, warning, and informatory traffic road signs in real-time from camera feeds.",
    "architecture": "",
    "features": [],
    "stats": {
      "Categories": "58 Sign Classes",
      "Accuracy": "95%",
      "Framework": "Keras CNN"
    }
  },
  {
    "id": 38,
    "title": "Smart Spam Email & SMS Detector — NLP Naive Bayes & Logistic Regression text classification for spam detection.",
    "year": 2026,
    "category": "AI & ML",
    "tagline": "NLP Naive Bayes & Logistic Regression text classification for spam detection.",
    "description": "Machine Learning model application that analyzes email text and SMS messages to accurately flag spam, phishing, and scam messages.",
    "tech": [
      "Python",
      "Scikit-learn",
      "NLTK",
      "Flask",
      "HTML5/CSS3"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-shield-cat",
    "image": null,
    "overview": "Machine Learning model application that analyzes email text and SMS messages to accurately flag spam, phishing, and scam messages.",
    "architecture": "",
    "features": [],
    "stats": {
      "Model": "Multinomial Naive Bayes",
      "Accuracy": "97.8%",
      "Dataset": "SMS Spam Collection"
    }
  },
  {
    "id": 18,
    "title": "Surya Chatbot — Interactive conversational AI bot with custom response logic and floating UI.",
    "year": 2025,
    "category": "AI & ML",
    "tagline": "Interactive conversational AI bot with custom response logic and floating UI.",
    "description": "Rule-based and generative AI chatbot designed to answer queries with an intuitive floating chat window interface and quick answer shortcuts.",
    "tech": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "NLP Rules"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-comments",
    "image": null,
    "overview": "Rule-based and generative AI chatbot designed to answer queries with an intuitive floating chat window interface and quick answer shortcuts.",
    "architecture": "",
    "features": [],
    "stats": {
      "Interface": "Floating Widget",
      "Response Time": "< 100ms",
      "Engine": "NLP Dictionary"
    }
  },
  {
    "id": 8,
    "title": "Kai Assistant — In-browser conversational AI assistant built for instant answers & quick text generation.",
    "year": 2025,
    "category": "AI & ML",
    "tagline": "In-browser conversational AI assistant built for instant answers & quick text generation.",
    "description": "Lightweight browser-based virtual assistant capable of quick question answering, task prompts, context formatting, and contextual text generation.",
    "tech": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "AI API"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-brain",
    "image": null,
    "overview": "Lightweight browser-based virtual assistant capable of quick question answering, task prompts, context formatting, and contextual text generation.",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Browser Agent",
      "Latency": "Instant",
      "Tech": "JS + AI API"
    }
  },
  {
    "id": 31,
    "title": "AI/ML Practice Labs — Machine Learning Practical Experiments",
    "year": 2025,
    "category": "AI & ML",
    "tagline": "Comprehensive repository of Artificial Intelligence & Machine Learning practical experiments.",
    "description": "A curated lab notebook containing practical implementations of supervised/unsupervised learning algorithms, neural network architectures, data preprocessing, and model evaluations.",
    "tech": [
      "Python",
      "Jupyter Notebook",
      "Scikit-learn",
      "TensorFlow",
      "Pandas",
      "Matplotlib"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-graduation-cap",
    "image": null,
    "overview": "A curated lab notebook containing practical implementations of supervised/unsupervised learning algorithms, neural network architectures, data preprocessing, and model evaluations.",
    "architecture": "",
    "features": [],
    "stats": {
      "Labs": "20+ Notebooks",
      "Algorithms": "Linear/Logistic, SVM, Decision Trees, CNN",
      "Language": "Python"
    }
  },
  {
    "id": 28,
    "title": "Paperless Office & Billing Management System — Enterprise paperless document workflow, billing & invoice generator.",
    "year": 2025,
    "category": "Web Apps",
    "tagline": "Enterprise paperless document workflow, billing & invoice generator.",
    "description": "A professional billing and document management system designed for digital offices and retail storefronts, supporting inventory tracking, tax calculations, and instant PDF invoice generation.",
    "tech": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "SQLite",
      "Node.js",
      "Electron.js",
      "PDFKit"
    ],
    "live": null,
    "featured": true,
    "icon": "fa-file-invoice-dollar",
    "image": "assets/billing_system_cover.png",
    "overview": "A professional billing and document management system designed for digital offices and retail storefronts, supporting inventory tracking, tax calculations, and instant PDF invoice generation.",
    "architecture": "",
    "features": [],
    "stats": {
      "DB Model": "SQLite",
      "Export": "PDF Document",
      "Engine": "Node / Electron"
    }
  },
  {
    "id": 12,
    "title": "Property Manager Dashboard — Admin dashboard for real-estate property listings & tenant management.",
    "year": 2025,
    "category": "Web Apps",
    "tagline": "Admin dashboard for real-estate property listings & tenant management.",
    "description": "Administrative web dashboard featuring analytics charts, tenant rent status, maintenance ticket tracking, and property unit occupancy management.",
    "tech": [
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Recharts"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-chart-line",
    "image": null,
    "overview": "Administrative web dashboard featuring analytics charts, tenant rent status, maintenance ticket tracking, and property unit occupancy management.",
    "architecture": "",
    "features": [],
    "stats": {
      "UI Stack": "React + TypeScript",
      "Styling": "Tailwind CSS",
      "Type": "Real Estate Dashboard"
    }
  },
  {
    "id": 39,
    "title": "Hospital Management System — Comprehensive healthcare portal for patient records, doctor appointments & billing.",
    "year": 2025,
    "category": "Web Apps",
    "tagline": "Comprehensive healthcare portal for patient records, doctor appointments & billing.",
    "description": "Full-stack hospital database system managing patient registrations, doctor schedules, pharmacy billing, and medical department inventory.",
    "tech": [
      "Python",
      "Flask",
      "SQLite",
      "HTML5",
      "Bootstrap"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-hospital",
    "image": null,
    "overview": "Full-stack hospital database system managing patient registrations, doctor schedules, pharmacy billing, and medical department inventory.",
    "architecture": "",
    "features": [],
    "stats": {
      "Modules": "Patient, Doctor, Pharmacy",
      "Database": "SQLite DB",
      "Role": "Enterprise Portal"
    }
  },
  {
    "id": 40,
    "title": "Student Attendance Management System — Automated student attendance tracking & percentage generator.",
    "year": 2025,
    "category": "Web Apps",
    "tagline": "Automated student attendance tracking & percentage generator.",
    "description": "Desktop/Web application providing class-wise attendance marking, shortage warnings, automated monthly percentage calculation, and CSV record exports.",
    "tech": [
      "Python",
      "Tkinter",
      "SQLite",
      "Pandas"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-clipboard-user",
    "image": null,
    "overview": "Desktop/Web application providing class-wise attendance marking, shortage warnings, automated monthly percentage calculation, and CSV record exports.",
    "architecture": "",
    "features": [],
    "stats": {
      "Features": "Shortage Alerts + Export",
      "Database": "SQLite",
      "Target": "Academic Institutions"
    }
  },
  {
    "id": 41,
    "title": "Placement Pro Portal — College placement cell management portal for student profiles & recruiter drives.",
    "year": 2025,
    "category": "Web Apps",
    "tagline": "College placement cell management portal for student profiles & recruiter drives.",
    "description": "Web portal streamlining campus placement drives, company registrations, student resume submissions, and interview schedule tracking.",
    "tech": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "PHP",
      "MySQL"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-user-tie",
    "image": null,
    "overview": "Web portal streamlining campus placement drives, company registrations, student resume submissions, and interview schedule tracking.",
    "architecture": "",
    "features": [],
    "stats": {
      "Stack": "PHP + MySQL",
      "Users": "Students & Recruiters",
      "Feature": "Drive Management"
    }
  },
  {
    "id": 13,
    "title": "Pure Weaves E-Commerce — Handcrafted saree store with live inventory and inquiry backend.",
    "year": 2025,
    "category": "Web Apps",
    "tagline": "Handcrafted saree store with live inventory and inquiry backend.",
    "description": "Elegant e-commerce storefront for artisanal sarees featuring high-definition galleries, dynamic product filters, shopping cart, and Google Sheets serverless database order processing.",
    "tech": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Google Apps Script",
      "Vercel"
    ],
    "live": null,
    "featured": true,
    "icon": "fa-bag-shopping",
    "image": null,
    "overview": "Elegant e-commerce storefront for artisanal sarees featuring high-definition galleries, dynamic product filters, shopping cart, and Google Sheets serverless database order processing.",
    "architecture": "",
    "features": [],
    "stats": {
      "Storefront": "Responsive E-Commerce",
      "Database": "Google Sheets API",
      "Deployment": "Vercel"
    }
  },
  {
    "id": 5,
    "title": "Daily Task Nexus (Grab Notes) — Smart task manager & note-taking application for productive workflows.",
    "year": 2025,
    "category": "Web Apps",
    "tagline": "Smart task manager & note-taking application for productive workflows.",
    "description": "Clean productivity suite with quick tag filtering, search indexing, auto-save drafts, task priority checklists, and rich Markdown text rendering.",
    "tech": [
      "TypeScript",
      "React",
      "Tailwind CSS",
      "LocalStorage"
    ],
    "live": null,
    "featured": true,
    "icon": "fa-note-sticky",
    "image": null,
    "overview": "Clean productivity suite with quick tag filtering, search indexing, auto-save drafts, task priority checklists, and rich Markdown text rendering.",
    "architecture": "",
    "features": [],
    "stats": {
      "Stack": "React + TypeScript",
      "Persistence": "Local Cache",
      "Live App": "Base44"
    }
  },
  {
    "id": 4,
    "title": "RupeeTrack — Expense Tracker",
    "year": 2025,
    "category": "Web Apps",
    "tagline": "Comprehensive personal finance & expense tracking web application.",
    "description": "Modern expense tracker enabling users to log transactions, classify income/expenses, monitor monthly budgets, and analyze spending habits with interactive charts.",
    "tech": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "LocalStorage",
      "Chart.js"
    ],
    "live": null,
    "featured": true,
    "icon": "fa-wallet",
    "image": null,
    "overview": "Modern expense tracker enabling users to log transactions, classify income/expenses, monitor monthly budgets, and analyze spending habits with interactive charts.",
    "architecture": "",
    "features": [],
    "stats": {
      "Category": "Personal Finance",
      "Analytics": "Chart.js",
      "Deployment": "Netlify"
    }
  },
  {
    "id": 11,
    "title": "Pizza Shop Website — Mouth-watering pizza restaurant website with online order preview.",
    "year": 2025,
    "category": "Web Apps",
    "tagline": "Mouth-watering pizza restaurant website with online order preview.",
    "description": "Dynamic web application for an artisanal pizzeria featuring interactive menu selection, custom pizza builder preview, cart state, and delivery zone checker.",
    "tech": [
      "HTML5",
      "CSS3",
      "JavaScript"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-pizza-slice",
    "image": null,
    "overview": "Dynamic web application for an artisanal pizzeria featuring interactive menu selection, custom pizza builder preview, cart state, and delivery zone checker.",
    "architecture": "",
    "features": [],
    "stats": {
      "UX Design": "Interactive Menu",
      "Cart": "Client JS",
      "Responsive": "Mobile-First"
    }
  },
  {
    "id": 22,
    "title": "VPN Service Landing Page — High-converting cybersecurity VPN subscription product landing page.",
    "year": 2025,
    "category": "Tools & Security",
    "tagline": "High-converting cybersecurity VPN subscription product landing page.",
    "description": "Commercial product landing page presenting VPN feature matrices, pricing tiers, server location maps, speed benchmarks, and security FAQs.",
    "tech": [
      "HTML5",
      "CSS3",
      "JavaScript"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-key",
    "image": null,
    "overview": "Commercial product landing page presenting VPN feature matrices, pricing tiers, server location maps, speed benchmarks, and security FAQs.",
    "architecture": "",
    "features": [],
    "stats": {
      "Design": "Modern Dark Glass UI",
      "Sections": "6 Interactive Blocks",
      "Responsiveness": "100%"
    }
  },
  {
    "id": 14,
    "title": "Registration Form — Clean modern user registration form with real-time CSS & JS validation.",
    "year": 2025,
    "category": "Web Apps",
    "tagline": "Clean modern user registration form with real-time CSS & JS validation.",
    "description": "Interactive registration form featuring real-time input validation, password strength meter, confirmation matching, and polished micro-animations.",
    "tech": [
      "HTML5",
      "CSS3",
      "JavaScript"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-id-card",
    "image": null,
    "overview": "Interactive registration form featuring real-time input validation, password strength meter, confirmation matching, and polished micro-animations.",
    "architecture": "",
    "features": [],
    "stats": {
      "Validation": "Real-time regex",
      "UI Polish": "Glassmorphism",
      "Lightweight": "Zero Dependencies"
    }
  },
  {
    "id": 42,
    "title": "Custom Business Website — Modern responsive commercial business website template.",
    "year": 2025,
    "category": "Web Apps",
    "tagline": "Modern responsive commercial business website template.",
    "description": "Clean business web template tailored for local agencies and services, featuring hero sliders, service showcases, customer testimonials, and contact forms.",
    "tech": [
      "HTML5",
      "CSS3",
      "JavaScript"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-briefcase",
    "image": null,
    "overview": "Clean business web template tailored for local agencies and services, featuring hero sliders, service showcases, customer testimonials, and contact forms.",
    "architecture": "",
    "features": [],
    "stats": {
      "Layout": "Responsive Business Template",
      "Speed": "Instant",
      "SEO": "Optimized Markup"
    }
  },
  {
    "id": 21,
    "title": "Vault Secure Auth — Secure authentication portal with password security audits & login UI validation.",
    "year": 2025,
    "category": "Tools & Security",
    "tagline": "Secure authentication portal with password security audits & login UI validation.",
    "description": "Modern security portal UI implementing client-side input validation, password visibility toggles, hash calculation previews, and multi-step authentication layouts.",
    "tech": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "CryptoJS"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-lock",
    "image": null,
    "overview": "Modern security portal UI implementing client-side input validation, password visibility toggles, hash calculation previews, and multi-step authentication layouts.",
    "architecture": "",
    "features": [],
    "stats": {
      "Security": "Client Hashing",
      "Validation": "Interactive UI",
      "Type": "Auth Portal"
    }
  },
  {
    "id": 23,
    "title": "Web Calculator JS — Feature-rich web calculator with percentage, square root, and keyboard shortcuts.",
    "year": 2025,
    "category": "Tools & Security",
    "tagline": "Feature-rich web calculator with percentage, square root, and keyboard shortcuts.",
    "description": "Scientific-lite web calculator offering memory recall, percentage formulas, square root functions, calculation history, and physical keypress bindings.",
    "tech": [
      "HTML5",
      "CSS3",
      "JavaScript"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-square-root-variable",
    "image": null,
    "overview": "Scientific-lite web calculator offering memory recall, percentage formulas, square root functions, calculation history, and physical keypress bindings.",
    "architecture": "",
    "features": [],
    "stats": {
      "Functions": "Standard + Scientific",
      "Input": "Touch + Keyboard",
      "History": "Saved per session"
    }
  },
  {
    "id": 19,
    "title": "Temperature Converter Web App — Instant Celsius, Fahrenheit, and Kelvin scale conversion utility.",
    "year": 2025,
    "category": "Tools & Security",
    "tagline": "Instant Celsius, Fahrenheit, and Kelvin scale conversion utility.",
    "description": "Sleek conversion calculator handling instant bi-directional transformations between Celsius, Fahrenheit, and Kelvin temperature scales with visual warmth indicators.",
    "tech": [
      "HTML5",
      "CSS3",
      "JavaScript"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-temperature-high",
    "image": null,
    "overview": "Sleek conversion calculator handling instant bi-directional transformations between Celsius, Fahrenheit, and Kelvin temperature scales with visual warmth indicators.",
    "architecture": "",
    "features": [],
    "stats": {
      "Scales": "Celsius / Fahrenheit / Kelvin",
      "Conversion": "Real-time input",
      "UI": "Dynamic Gradient"
    }
  },
  {
    "id": 2,
    "title": "BMI Calculator — Instant health index calculator for height and weight measurements.",
    "year": 2025,
    "category": "Tools & Security",
    "tagline": "Instant health index calculator for height and weight measurements.",
    "description": "Responsive Body Mass Index (BMI) calculator providing immediate health index feedback, target weight ranges, and interactive health gauge visualizations.",
    "tech": [
      "HTML5",
      "CSS3",
      "JavaScript"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-calculator",
    "image": null,
    "overview": "Responsive Body Mass Index (BMI) calculator providing immediate health index feedback, target weight ranges, and interactive health gauge visualizations.",
    "architecture": "",
    "features": [],
    "stats": {
      "Formula": "Standard BMI",
      "Feedback": "Categorized health status",
      "Speed": "Instant"
    }
  },
  {
    "id": 32,
    "title": "Bluetooth Chat Utility — Wireless peer-to-peer local messaging app over Bluetooth connections.",
    "year": 2025,
    "category": "Tools & Security",
    "tagline": "Wireless peer-to-peer local messaging app over Bluetooth connections.",
    "description": "Utility application designed to establish direct device-to-device Bluetooth socket connections for offline text messaging and file transfer without internet access.",
    "tech": [
      "Android",
      "Java",
      "Bluetooth RFCOMM",
      "XML"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-bluetooth-b",
    "image": null,
    "overview": "Utility application designed to establish direct device-to-device Bluetooth socket connections for offline text messaging and file transfer without internet access.",
    "architecture": "",
    "features": [],
    "stats": {
      "Connection": "RFCOMM Sockets",
      "Mode": "Offline Peer-to-Peer",
      "Platform": "Android / Java"
    }
  },
  {
    "id": 33,
    "title": "Pixel Perfect Design Tool — Precision screen measurement and grid overlay tool for UI developers.",
    "year": 2025,
    "category": "Tools & Security",
    "tagline": "Precision screen measurement and grid overlay tool for UI developers.",
    "description": "Developer utility allowing web designers to overlay alignment grids, inspect exact element dimensions in pixels, and verify responsive design fidelity.",
    "tech": [
      "JavaScript",
      "HTML5 Canvas",
      "CSS3"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-crop-simple",
    "image": null,
    "overview": "Developer utility allowing web designers to overlay alignment grids, inspect exact element dimensions in pixels, and verify responsive design fidelity.",
    "architecture": "",
    "features": [],
    "stats": {
      "Precision": "1px grid step",
      "Mode": "Developer Overlay",
      "Tech": "Vanilla JS"
    }
  },
  {
    "id": 43,
    "title": "Peacock OS — Web Desktop System",
    "year": 2025,
    "category": "Tools & Security",
    "tagline": "Browser-based desktop operating system interface with draggable windows.",
    "description": "Web OS environment mimicking desktop window managers, featuring draggable app windows, file system preview, taskbar, and embedded utilities.",
    "tech": [
      "HTML5",
      "CSS3",
      "JavaScript"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-desktop",
    "image": null,
    "overview": "Web OS environment mimicking desktop window managers, featuring draggable app windows, file system preview, taskbar, and embedded utilities.",
    "architecture": "",
    "features": [],
    "stats": {
      "UI": "Web OS Desktop",
      "Features": "Draggable Windows",
      "Engine": "Vanilla JS"
    }
  },
  {
    "id": 44,
    "title": "CodeForge — Online Code Editor",
    "year": 2025,
    "category": "Tools & Security",
    "tagline": "In-browser live HTML/CSS/JS code playground and instant previewer.",
    "description": "Lightweight front-end web playground allowing real-time code editing, live preview iframe execution, and syntax highlighting.",
    "tech": [
      "HTML5",
      "CSS3",
      "JavaScript"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": null,
    "overview": "Lightweight front-end web playground allowing real-time code editing, live preview iframe execution, and syntax highlighting.",
    "architecture": "",
    "features": [],
    "stats": {
      "Preview": "Instant iframe render",
      "Languages": "HTML, CSS, JS",
      "Mode": "Live Playground"
    }
  },
  {
    "id": 34,
    "title": "Chess Game Engine — Interactive 2-player chess game with legal move validation and visual board.",
    "year": 2025,
    "category": "Games",
    "tagline": "Interactive 2-player chess game with legal move validation and visual board.",
    "description": "A fully functional chess game featuring piece movement rules, castling, en passant checks, move history, and checkmate detection.",
    "tech": [
      "JavaScript",
      "HTML5",
      "CSS3",
      "Chess Logic"
    ],
    "live": null,
    "featured": true,
    "icon": "fa-chess",
    "image": null,
    "overview": "A fully functional chess game featuring piece movement rules, castling, en passant checks, move history, and checkmate detection.",
    "architecture": "",
    "features": [],
    "stats": {
      "Logic": "FIDE Move Rules",
      "Players": "2 Players / Local",
      "UI": "Custom Drag & Drop Board"
    }
  },
  {
    "id": 20,
    "title": "Tic-Tac-Toe Game in Python — Classic terminal and graphical Tic-Tac-Toe game in Python.",
    "year": 2025,
    "category": "Games",
    "tagline": "Classic terminal and graphical Tic-Tac-Toe game in Python.",
    "description": "Console and Tkinter application written in Python demonstrating game matrix evaluation, AI minimax opponent, and turn state management.",
    "tech": [
      "Python",
      "Tkinter"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-brands fa-python",
    "image": null,
    "overview": "Console and Tkinter application written in Python demonstrating game matrix evaluation, AI minimax opponent, and turn state management.",
    "architecture": "",
    "features": [],
    "stats": {
      "Language": "Python 3",
      "Opponent": "Local 2-Player & Minimax AI",
      "UI": "Terminal & GUI"
    }
  },
  {
    "id": 3,
    "title": "Digital Board Duel — Interactive two-player digital board game with real-time turns & smooth UI.",
    "year": 2025,
    "category": "Games",
    "tagline": "Interactive two-player digital board game with real-time turns & smooth UI.",
    "description": "Modern digital board game featuring glassmorphic graphics, sound synthesizers, turn animations, score tracking, and smooth interactive gameplay.",
    "tech": [
      "TypeScript",
      "React",
      "CSS3",
      "Tailwind CSS"
    ],
    "live": null,
    "featured": true,
    "icon": "fa-gamepad",
    "image": null,
    "overview": "Modern digital board game featuring glassmorphic graphics, sound synthesizers, turn animations, score tracking, and smooth interactive gameplay.",
    "architecture": "",
    "features": [],
    "stats": {
      "Framework": "React + TypeScript",
      "Styling": "Tailwind CSS",
      "Live App": "Lovable AI"
    }
  },
  {
    "id": 16,
    "title": "Sanju Portfolio Pro Hub — Advanced React-powered portfolio with glassmorphism & dynamic transitions.",
    "year": 2025,
    "category": "Portfolios & Profiles",
    "tagline": "Advanced React-powered portfolio with glassmorphism & dynamic transitions.",
    "description": "React portfolio hub engineered with ambient background particle effects, glassmorphic cards, search indexes, and project showcase filters.",
    "tech": [
      "TypeScript",
      "React",
      "Tailwind CSS"
    ],
    "live": null,
    "featured": true,
    "icon": "fa-laptop-code",
    "image": null,
    "overview": "React portfolio hub engineered with ambient background particle effects, glassmorphic cards, search indexes, and project showcase filters.",
    "architecture": "",
    "features": [],
    "stats": {
      "Tech": "React + TypeScript",
      "Design": "Glassmorphism",
      "Deployment": "Base44"
    }
  },
  {
    "id": 15,
    "title": "Sanjay GL Developer Portfolio & Profile — Personal portfolio & developer hub showcasing projects, skills, and credentials.",
    "year": 2025,
    "category": "Portfolios & Profiles",
    "tagline": "Personal portfolio & developer hub showcasing projects, skills, and credentials.",
    "description": "Responsive developer website featuring 3D ambient space background, terminal command palette, verified certificates archive, AI co-pilot, and contact form.",
    "tech": [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Python",
      "Flask"
    ],
    "live": null,
    "featured": true,
    "icon": "fa-globe",
    "image": null,
    "overview": "Responsive developer website featuring 3D ambient space background, terminal command palette, verified certificates archive, AI co-pilot, and contact form.",
    "architecture": "",
    "features": [],
    "stats": {
      "Projects": "69+ Cataloged",
      "Certificates": "87+ Verified",
      "AI OS": "Gemini Integration"
    }
  },
  {
    "id": 35,
    "title": "Sri Mariyamma Temple Portal — Community temple cultural website & event information portal.",
    "year": 2025,
    "category": "Web Apps",
    "tagline": "Community temple cultural website & event information portal.",
    "description": "Dedicated cultural web portal created to showcase temple history, annual festival schedules, photo galleries, and community announcements.",
    "tech": [
      "HTML5",
      "CSS3",
      "JavaScript"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-place-of-worship",
    "image": null,
    "overview": "Dedicated cultural web portal created to showcase temple history, annual festival schedules, photo galleries, and community announcements.",
    "architecture": "",
    "features": [],
    "stats": {
      "Purpose": "Community & Cultural Portal",
      "Gallery": "High-Res Photography",
      "Language": "Kannada & English"
    }
  },
  {
    "id": 36,
    "title": "Maya Angelou Tribute Showcase — Literary tribute page celebrating Maya Angelou's poetry, life, and legacy.",
    "year": 2025,
    "category": "Web Apps",
    "tagline": "Literary tribute page celebrating Maya Angelou's poetry, life, and legacy.",
    "description": "Polished biographical tribute webpage highlighting Maya Angelou's famous poems, civil rights contributions, audio recitations, and timeline milestones.",
    "tech": [
      "HTML5",
      "CSS3",
      "JavaScript"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-feather-pointed",
    "image": null,
    "overview": "Polished biographical tribute webpage highlighting Maya Angelou's famous poems, civil rights contributions, audio recitations, and timeline milestones.",
    "architecture": "",
    "features": [],
    "stats": {
      "Subject": "Maya Angelou Tribute",
      "Design": "Classic Editorial Layout",
      "Features": "Poetry Carousel & Quotes"
    }
  },
  {
    "id": 100,
    "title": "Spvm3 Chat — spvm3-chat",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "spvm3-chat",
    "description": "SPVM3 Chat: A high-performance real-time chat app featuring instant messaging, multiple chat rooms, typing indicators, and live user presence. Powered by native WebSockets with a FastAPI backend an…",
    "tech": [
      "Python",
      "FastAPI",
      "React"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-globe",
    "image": null,
    "overview": "SPVM3 Chat: A high-performance real-time chat app featuring instant messaging, multiple chat rooms, typing indicators, and live user presence. Powered by native WebSockets with a FastAPI backend an…",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 101,
    "title": "Social Analytics Ui — social-analytics-ui",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "social-analytics-ui",
    "description": "PulseBoard: A modern social media analytics dashboard built with React, FastAPI, and Recharts. Features follower growth tracking, engagement metrics, and a recent posts feed.",
    "tech": [
      "Python",
      "FastAPI",
      "React"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-chart-line",
    "image": null,
    "overview": "PulseBoard: A modern social media analytics dashboard built with React, FastAPI, and Recharts. Features follower growth tracking, engagement metrics, and a recent posts feed.",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 102,
    "title": "Spvm3 Reelfind React Fastapi — -SPVM3-reelfind-react-fastapi",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "-SPVM3-reelfind-react-fastapi",
    "description": "A full-stack movie and TV show discovery app built with React and FastAPI.",
    "tech": [
      "Python",
      "FastAPI",
      "React"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-globe",
    "image": null,
    "overview": "A full-stack movie and TV show discovery app built with React and FastAPI.",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 103,
    "title": "Spvm3 Spend Tracker — spvm3-spend-tracker",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "spvm3-spend-tracker",
    "description": "Fast, responsive finance and expense management dashboard built with React, Recharts, and FastAPI for SPVM³ Tech Solution.",
    "tech": [
      "Python",
      "FastAPI",
      "React"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-chart-line",
    "image": null,
    "overview": "Fast, responsive finance and expense management dashboard built with React, Recharts, and FastAPI for SPVM³ Tech Solution.",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 104,
    "title": "Fastapi React Todo — fastapi-react-todo",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "fastapi-react-todo",
    "description": "Full-stack interactive to-do app built with React (Vite) and FastAPI featuring priorities, inline editing, and status filtering.",
    "tech": [
      "Python",
      "FastAPI",
      "React"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-globe",
    "image": null,
    "overview": "Full-stack interactive to-do app built with React (Vite) and FastAPI featuring priorities, inline editing, and status filtering.",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 105,
    "title": "Spvm3 Task App — spvm3-task-app",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "spvm3-task-app",
    "description": "SPVM³ Task App — A sleek, intuitive Kanban task manager featuring interactive drag-and-drop columns, priority indicators, and REST API integration with FastAPI & React.",
    "tech": [
      "Python",
      "FastAPI",
      "React"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-globe",
    "image": null,
    "overview": "SPVM³ Task App — A sleek, intuitive Kanban task manager featuring interactive drag-and-drop columns, priority indicators, and REST API integration with FastAPI & React.",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 106,
    "title": "Spvm3 Player — spvm3-player",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "spvm3-player",
    "description": "Full-stack modern music player built with React 18, Vite, and FastAPI. Features automatic local library sync, ID3 metadata & album art extraction, sleek glassmorphic UI, audio visualizer, and HTTP …",
    "tech": [
      "Python",
      "FastAPI",
      "React"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-globe",
    "image": null,
    "overview": "Full-stack modern music player built with React 18, Vite, and FastAPI. Features automatic local library sync, ID3 metadata & album art extraction, sleek glassmorphic UI, audio visualizer, and HTTP …",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 107,
    "title": "Sentry Cyber Intel — sentry-cyber-intel",
    "year": 2026,
    "category": "AI & ML",
    "tagline": "sentry-cyber-intel",
    "description": "Multi-agent AI cybersecurity intelligence platform powered by CrewAI, Groq & Exa for automated threat intelligence research, CVE triage, and risk assessment.",
    "tech": [
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-brain",
    "image": null,
    "overview": "Multi-agent AI cybersecurity intelligence platform powered by CrewAI, Groq & Exa for automated threat intelligence research, CVE triage, and risk assessment.",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 108,
    "title": "Milano Infotech Internship — Milano-infotech-internship",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "Milano-infotech-internship",
    "description": "Python Updated 2 days ago",
    "tech": [
      "Python",
      "FastAPI",
      "React"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-globe",
    "image": null,
    "overview": "Python Updated 2 days ago",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 109,
    "title": "Spvm3 Code Notes — SPVM3-code-notes",
    "year": 2026,
    "category": "Portfolios & Profiles",
    "tagline": "SPVM3-code-notes",
    "description": "Comprehensive Computer Science & Programming Notes Hub featuring interactive guides for 20+ technologies, code references, and an integrated certificate verification system.",
    "tech": [
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-globe",
    "image": null,
    "overview": "Comprehensive Computer Science & Programming Notes Hub featuring interactive guides for 20+ technologies, code references, and an integrated certificate verification system.",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 110,
    "title": "Spvm3 Code Editor — spvm3-code-editor",
    "year": 2026,
    "category": "Tools & Security",
    "tagline": "spvm3-code-editor",
    "description": "Modular, local-first desktop IDE built on Electron, React & Monaco. Features multi-language runners (Python, Java, C/C++, C#), A-Z file support, Extensions Marketplace, multi-version Python selecto…",
    "tech": [
      "Python",
      "FastAPI",
      "React"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-tools",
    "image": null,
    "overview": "Modular, local-first desktop IDE built on Electron, React & Monaco. Features multi-language runners (Python, Java, C/C++, C#), A-Z file support, Extensions Marketplace, multi-version Python selecto…",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 111,
    "title": "Spvm3 Editor — spvm3-editor",
    "year": 2026,
    "category": "AI & ML",
    "tagline": "spvm3-editor",
    "description": "Next-generation lightweight desktop IDE powered by Monaco Editor, integrated terminal runner, and offline-capable AI code intelligence.",
    "tech": [
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-brain",
    "image": null,
    "overview": "Next-generation lightweight desktop IDE powered by Monaco Editor, integrated terminal runner, and offline-capable AI code intelligence.",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 112,
    "title": "Smart Attendance Yolo — smart-attendance-yolo",
    "year": 2026,
    "category": "AI & ML",
    "tagline": "smart-attendance-yolo",
    "description": "Real-time automated classroom attendance tracker powered by custom YOLOv8 computer vision, Flask REST API, MySQL, and an interactive React teacher dashboard.",
    "tech": [
      "Python",
      "FastAPI",
      "React"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-brain",
    "image": null,
    "overview": "Real-time automated classroom attendance tracker powered by custom YOLOv8 computer vision, Flask REST API, MySQL, and an interactive React teacher dashboard.",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 113,
    "title": "Spvm3 Campus Placement — spvm3-campus-placement",
    "year": 2026,
    "category": "AI & ML",
    "tagline": "spvm3-campus-placement",
    "description": "An AI-powered campus placement & career intelligence suite: automated ATS resume analysis, skills gap roadmaps, safe AI natural language queries, and department-isolated analytics dashboards. Built…",
    "tech": [
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-brain",
    "image": null,
    "overview": "An AI-powered campus placement & career intelligence suite: automated ATS resume analysis, skills gap roadmaps, safe AI natural language queries, and department-isolated analytics dashboards. Built…",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 114,
    "title": "Placement Pro Spvm3 — placement-pro-SPVM3",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "placement-pro-SPVM3",
    "description": "Smart College Placement & Campus Recruitment Management System built with Python Flask, PHP, Docker, Kubernetes & Vercel. Developed by SPVM3 Tech Solution by Sanjay G L.",
    "tech": [
      "Python",
      "FastAPI",
      "React"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-chart-line",
    "image": null,
    "overview": "Smart College Placement & Campus Recruitment Management System built with Python Flask, PHP, Docker, Kubernetes & Vercel. Developed by SPVM3 Tech Solution by Sanjay G L.",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 115,
    "title": "Spvm3 Car Game — spvm3-car-game",
    "year": 2026,
    "category": "Games",
    "tagline": "spvm3-car-game",
    "description": "Action-packed 2D physics racing game featuring 200-level stage progression, 60+ customizable vehicles, multi-layer parallax scenery, real-time audio synthesis, companion Python telemetry server, an…",
    "tech": [
      "Python",
      "FastAPI",
      "React"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-gamepad",
    "image": null,
    "overview": "Action-packed 2D physics racing game featuring 200-level stage progression, 60+ customizable vehicles, multi-layer parallax scenery, real-time audio synthesis, companion Python telemetry server, an…",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 116,
    "title": "Text2Img Studio — text2img-studio",
    "year": 2026,
    "category": "AI & ML",
    "tagline": "text2img-studio",
    "description": "A full-stack Flask web app for AI text-to-image generation powered by Stable Diffusion with built-in MySQL/SQLite generation history tracking.",
    "tech": [
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-brain",
    "image": null,
    "overview": "A full-stack Flask web app for AI text-to-image generation powered by Stable Diffusion with built-in MySQL/SQLite generation history tracking.",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 117,
    "title": "Small Project — small-project",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "small-project",
    "description": "A collection of small web projects, templates, and frontend experiments built with HTML, CSS, and JavaScript.",
    "tech": [
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-globe",
    "image": null,
    "overview": "A collection of small web projects, templates, and frontend experiments built with HTML, CSS, and JavaScript.",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 118,
    "title": "Spvm3 Tech Solution Websites — SPVM3-tech-solution-websites",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "SPVM3-tech-solution-websites",
    "description": "HTML Updated last week",
    "tech": [
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-globe",
    "image": null,
    "overview": "HTML Updated last week",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 119,
    "title": "Spvm3 Tech Solution — SPVM3-tech-solution",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "SPVM3-tech-solution",
    "description": "Python Updated last week",
    "tech": [
      "Python",
      "FastAPI",
      "React"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-globe",
    "image": null,
    "overview": "Python Updated last week",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 120,
    "title": "Sanjay Gl Website Carbon Intelligence — sanjay-gl-website-carbon-intelligence",
    "year": 2026,
    "category": "Tools & Security",
    "tagline": "sanjay-gl-website-carbon-intelligence",
    "description": "SANJAY GL Website Carbon Intelligence — A real-time web application and developer API to audit website carbon footprints, HTTP page payload telemetry, energy consumption (SWD v4), and green hosting…",
    "tech": [
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-tools",
    "image": null,
    "overview": "SANJAY GL Website Carbon Intelligence — A real-time web application and developer API to audit website carbon footprints, HTTP page payload telemetry, energy consumption (SWD v4), and green hosting…",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 121,
    "title": "Resume Analyzer — resume-analyzer",
    "year": 2026,
    "category": "AI & ML",
    "tagline": "resume-analyzer",
    "description": "AI-powered resume match & skill gap analyzer built with Flask and MySQL. Uses TF-IDF vectorization to score resumes against job descriptions, highlight missing skills, and persist analysis results.",
    "tech": [
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-brain",
    "image": null,
    "overview": "AI-powered resume match & skill gap analyzer built with Flask and MySQL. Uses TF-IDF vectorization to score resumes against job descriptions, highlight missing skills, and persist analysis results.",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 122,
    "title": "Image To Svg Converter — image-to-svg-converter",
    "year": 2026,
    "category": "Tools & Security",
    "tagline": "image-to-svg-converter",
    "description": "A blazingly fast, client-side web & desktop tool to convert JPG, PNG, and WEBP images into clean, scalable SVG vector graphics with K-means color quantization, Bezier smoothing, and zero server upl…",
    "tech": [
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-tools",
    "image": null,
    "overview": "A blazingly fast, client-side web & desktop tool to convert JPG, PNG, and WEBP images into clean, scalable SVG vector graphics with K-means color quantization, Bezier smoothing, and zero server upl…",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 123,
    "title": "Portfolio — portfolio",
    "year": 2026,
    "category": "Portfolios & Profiles",
    "tagline": "portfolio",
    "description": "HTML Updated on Jul 7",
    "tech": [
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-globe",
    "image": null,
    "overview": "HTML Updated on Jul 7",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 124,
    "title": "Handcrafted With Love Pure Weaves — -Handcrafted-with-Love-Pure-Weaves",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "-Handcrafted-with-Love-Pure-Weaves",
    "description": "HTML Updated on Jun 17",
    "tech": [
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-globe",
    "image": null,
    "overview": "HTML Updated on Jun 17",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 125,
    "title": "Srimariyammatemple Ad2Fd3A5 — srimariyammatemple-ad2fd3a5",
    "year": 2026,
    "category": "Portfolios & Profiles",
    "tagline": "srimariyammatemple-ad2fd3a5",
    "description": "TypeScript Updated on Apr 7",
    "tech": [
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-globe",
    "image": null,
    "overview": "TypeScript Updated on Apr 7",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 126,
    "title": "Temp Convert Web App — temp-convert-web-app",
    "year": 2026,
    "category": "Tools & Security",
    "tagline": "temp-convert-web-app",
    "description": "A clean, mobile-responsive temperature converter built with HTML, CSS, and Vanilla JavaScript, featuring high-precision Celsius and Fahrenheit conversions.",
    "tech": [
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-tools",
    "image": null,
    "overview": "A clean, mobile-responsive temperature converter built with HTML, CSS, and Vanilla JavaScript, featuring high-precision Celsius and Fahrenheit conversions.",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 127,
    "title": "Pure Weaves — Pure-Weaves",
    "year": 2026,
    "category": "AI & ML",
    "tagline": "Pure-Weaves",
    "description": "Gemini said Pure Weaves is a PHP/MySQL e-commerce platform for artisan sarees. It features a heritage-inspired UI, AJAX-powered cart, and a secure seller dashboard. Key highlights include real-time…",
    "tech": [
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-brain",
    "image": null,
    "overview": "Gemini said Pure Weaves is a PHP/MySQL e-commerce platform for artisan sarees. It features a heritage-inspired UI, AJAX-powered cart, and a secure seller dashboard. Key highlights include real-time…",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": 128,
    "title": "Sanjay G. L — Sanjay-G.-L-",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "Sanjay-G.-L-",
    "description": "porfolio",
    "tech": [
      "JavaScript",
      "HTML",
      "CSS"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-globe",
    "image": null,
    "overview": "porfolio",
    "architecture": "",
    "features": [],
    "stats": {
      "Type": "Software Project",
      "Source": "Auto-imported"
    }
  },
  {
    "id": "proj-auto-2d4c57c3",
    "title": "Sanjay-G.-L- — Private portfolio, TypeScript",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "Private portfolio, TypeScript",
    "description": "A software engineering project built by Sanjay G. L.",
    "tech": [
      "Python",
      "JavaScript",
      "React",
      "HTML5"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/logo.svg",
    "overview": "This project showcases my ability to develop full-stack solutions and software tools.",
    "architecture": "Built with modern frameworks, focusing on modularity and clean code.",
    "features": [
      "Responsive UI",
      "REST API Integration",
      "Clean Architecture"
    ],
    "stats": {}
  },
  {
    "id": 129,
    "title": "SPVM3-placement-hub",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "Enterprise AI Academic & College Placement Managem...",
    "description": "Enterprise AI Academic & College Placement Management System for modern universities, featuring student registration, placement drives, analytics, and RBAC governance.",
    "tech": [
      "TypeScript"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "Enterprise AI Academic & College Placement Management System for modern universities, featuring student registration, placement drives, analytics, and RBAC governance.",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 130,
    "title": "smart-library-assistant",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "OLMS AI is an intelligent Online Library Managemen...",
    "description": "OLMS AI is an intelligent Online Library Management System that uses RAG and Vector Embeddings (ChromaDB) to transform digital notes and PDFs into a fully searchable AI knowledge engine and persona…",
    "tech": [
      "Python"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "OLMS AI is an intelligent Online Library Management System that uses RAG and Vector Embeddings (ChromaDB) to transform digital notes and PDFs into a fully searchable AI knowledge engine and persona…",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 131,
    "title": "Sanjay-OS",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "Peacock OS: A unified Electron-based desktop runti...",
    "description": "Peacock OS: A unified Electron-based desktop runtime with a cyber-security simulation environment, embedded IDEs, multilingual command lexer, and local Python system services.",
    "tech": [
      "JavaScript"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "Peacock OS: A unified Electron-based desktop runtime with a cyber-security simulation environment, embedded IDEs, multilingual command lexer, and local Python system services.",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 132,
    "title": "phishguard-ai",
    "year": 2026,
    "category": "AI & ML",
    "tagline": "PhishGuard is a real-time website phishing detecti...",
    "description": "PhishGuard is a real-time website phishing detection system built with Django and scikit-learn. It extracts 19 lexical URL features and evaluates multi-model machine learning algorithms (Logistic R…",
    "tech": [
      "Python"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "PhishGuard is a real-time website phishing detection system built with Django and scikit-learn. It extracts 19 lexical URL features and evaluates multi-model machine learning algorithms (Logistic R…",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 133,
    "title": "SPVM3-Learning-Platform",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "A modern Learning Management System (LMS) featurin...",
    "description": "A modern Learning Management System (LMS) featuring role-based access control, PostgreSQL RLS, automated course stage progression, and FastAPI backend services.",
    "tech": [
      "Python"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "A modern Learning Management System (LMS) featuring role-based access control, PostgreSQL RLS, automated course stage progression, and FastAPI backend services.",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 134,
    "title": "photo-recovery-tool",
    "year": 2026,
    "category": "Tools & Security",
    "tagline": "Lightweight digital forensics file carver for raw ...",
    "description": "Lightweight digital forensics file carver for raw drives and disk images. Recovers photos across sector boundaries with built-in preview, metadata viewer, and raw hex inspector.",
    "tech": [
      "Python"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "Lightweight digital forensics file carver for raw drives and disk images. Recovers photos across sector boundaries with built-in preview, metadata viewer, and raw hex inspector.",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 135,
    "title": "cyber-intel-agent",
    "year": 2026,
    "category": "AI & ML",
    "tagline": "Autonomous AI multi-agent threat intelligence syst...",
    "description": "Autonomous AI multi-agent threat intelligence system powered by CrewAI, Groq, and FastAPI for real-time cybersecurity risk assessment and incident response playbooks.",
    "tech": [
      "Python"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "Autonomous AI multi-agent threat intelligence system powered by CrewAI, Groq, and FastAPI for real-time cybersecurity risk assessment and incident response playbooks.",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 136,
    "title": "python-internship-projects",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "Python Internship Projects Portfolio: A collection...",
    "description": "Python Internship Projects Portfolio: A collection of 5 practical applications including an AI Voice Assistant, GUI BMI Calculator with SQLite, Secure Password Generator, Live Weather Application, …",
    "tech": [
      "Python"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "Python Internship Projects Portfolio: A collection of 5 practical applications including an AI Voice Assistant, GUI BMI Calculator with SQLite, Secure Password Generator, Live Weather Application, …",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 137,
    "title": "photo-to-doc-desktop",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "Standalone desktop OCR application for extracting ...",
    "description": "Standalone desktop OCR application for extracting text from images and screenshots without cloud APIs or servers. Features interactive cropping, SQLite storage, and Word/PDF export.",
    "tech": [
      "Python"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "Standalone desktop OCR application for extracting text from images and screenshots without cloud APIs or servers. Features interactive cropping, SQLite storage, and Word/PDF export.",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 138,
    "title": "disk-recovery-forensics-tool",
    "year": 2026,
    "category": "Tools & Security",
    "tagline": "Advanced digital forensics & file recovery worksta...",
    "description": "Advanced digital forensics & file recovery workstation built with Electron and Python Flask. Features bit-for-bit disk imaging, magic-byte signature carving, SHA-256 integrity verification, and aut…",
    "tech": [
      "Python"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "Advanced digital forensics & file recovery workstation built with Electron and Python Flask. Features bit-for-bit disk imaging, magic-byte signature carving, SHA-256 integrity verification, and aut…",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 139,
    "title": "SPVM3-Blog",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "Full-stack React & FastAPI engine showcasing real-...",
    "description": "Full-stack React & FastAPI engine showcasing real-world engineering logs on real-time chat, anti-cheat mechanisms, and AI prompt engineering. Includes load-more pagination, clean CSS tokens, and in…",
    "tech": [
      "Python"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "Full-stack React & FastAPI engine showcasing real-world engineering logs on real-time chat, anti-cheat mechanisms, and AI prompt engineering. Includes load-more pagination, clean CSS tokens, and in…",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 140,
    "title": "Developer Profile & System Architecture",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "Full-Stack Web Developer, AI Enthusiast, and BCA Student.",
    "description": "Full-Stack Web Developer, AI Enthusiast, and BCA Student portfolio and projects.",
    "tech": [
      "Misc"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "Full-Stack Web Developer, AI Enthusiast, and BCA Student portfolio and architecture.",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 141,
    "title": "spvm3-api-platform",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "SPVM3 API Platform: A multi-user Flask & MySQL bac...",
    "description": "SPVM3 API Platform: A multi-user Flask & MySQL backend for managing API keys and serving programming knowledge via REST APIs. Includes a built-in user dashboard and admin panel.",
    "tech": [
      "Python"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "SPVM3 API Platform: A multi-user Flask & MySQL backend for managing API keys and serving programming knowledge via REST APIs. Includes a built-in user dashboard and admin panel.",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 142,
    "title": "cyber-response-platform",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "A full-stack web application for tracking, managin...",
    "description": "A full-stack web application for tracking, managing, and resolving cybersecurity incidents.",
    "tech": [
      "JavaScript"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "A full-stack web application for tracking, managing, and resolving cybersecurity incidents.",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 143,
    "title": "student-htr-studio",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "Classroom-scale Handwritten Text Recognition (HTR)...",
    "description": "Classroom-scale Handwritten Text Recognition (HTR) pipeline using TrOCR, OpenCV line segmentation, NLP grammar correction, and interactive React Flow node canvas with multi-format export.",
    "tech": [
      "Python"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "Classroom-scale Handwritten Text Recognition (HTR) pipeline using TrOCR, OpenCV line segmentation, NLP grammar correction, and interactive React Flow node canvas with multi-format export.",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 144,
    "title": "malicious-url-detector",
    "year": 2026,
    "category": "AI & ML",
    "tagline": "A lightweight Flask web application that extracts ...",
    "description": "A lightweight Flask web application that extracts lexical features from URLs and uses a Random Forest ML model to classify them as malicious or benign.",
    "tech": [
      "Python"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "A lightweight Flask web application that extracts lexical features from URLs and uses a Random Forest ML model to classify them as malicious or benign.",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 145,
    "title": "smart-voice-notes",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "A full-stack web app that transcribes voice notes ...",
    "description": "A full-stack web app that transcribes voice notes using Whisper and generates summaries, tags, and action items using Claude via FastAPI and React.",
    "tech": [
      "JavaScript"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "A full-stack web app that transcribes voice notes using Whisper and generates summaries, tags, and action items using Claude via FastAPI and React.",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 146,
    "title": "smart-parking-system",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "A full-stack computer vision application to detect...",
    "description": "A full-stack computer vision application to detect available parking slots using OpenCV, Python, and React.",
    "tech": [
      "Python"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "A full-stack computer vision application to detect available parking slots using OpenCV, Python, and React.",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 147,
    "title": "ai-paper-analyzer",
    "year": 2026,
    "category": "AI & ML",
    "tagline": "A full-stack web app that uses AI to analyze, summ...",
    "description": "A full-stack web app that uses AI to analyze, summarize, and chat with academic research papers. Built with React, FastAPI, and Claude.",
    "tech": [
      "Python"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "A full-stack web app that uses AI to analyze, summarize, and chat with academic research papers. Built with React, FastAPI, and Claude.",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 148,
    "title": "spvm3-quiz-app",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "A secure, timed quiz application that monitors win...",
    "description": "A secure, timed quiz application that monitors window focus to prevent cheating. Built with React, Flask, and SQLite.",
    "tech": [
      "JavaScript"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "A secure, timed quiz application that monitors window focus to prevent cheating. Built with React, Flask, and SQLite.",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 149,
    "title": "otp-signup",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "Flask app with user signup, email OTP verification...",
    "description": "Flask app with user signup, email OTP verification, and login — built with SQLite, Jinja2, and secure credential handling. Python rewrite of a classic PHP tutorial.",
    "tech": [
      "Python"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "Flask app with user signup, email OTP verification, and login — built with SQLite, Jinja2, and secure credential handling. Python rewrite of a classic PHP tutorial.",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 150,
    "title": "scanner-files-",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "A self-contained, browser-based file scanner. Comb...",
    "description": "A self-contained, browser-based file scanner. Combines hash-signature matching and static heuristics (double extensions, suspicious script patterns, entropy checks, macro detection) to flag potenti…",
    "tech": [
      "HTML"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "A self-contained, browser-based file scanner. Combines hash-signature matching and static heuristics (double extensions, suspicious script patterns, entropy checks, macro detection) to flag potenti…",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 151,
    "title": "Paperless-Office-System",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "Paperless Office System is a modern, privacy-first...",
    "description": "Paperless Office System is a modern, privacy-first digital document workspace. Eliminate paper waste, organize files with drag-and-drop local storage, search & filter records, and track real-time …",
    "tech": [
      "JavaScript"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "Paperless Office System is a modern, privacy-first digital document workspace. Eliminate paper waste, organize files with drag-and-drop local storage, search & filter records, and track real-time …",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 152,
    "title": "DataGauge-Dataset-Quality-Monitoring-System",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "Full-stack dataset quality monitoring system built...",
    "description": "Full-stack dataset quality monitoring system built with FastAPI, React, and Pandas. Automatically computes 0-100 quality scores, flags data issues, provides guided cleaning, interactive dashboards,…",
    "tech": [
      "Python"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "Full-stack dataset quality monitoring system built with FastAPI, React, and Pandas. Automatically computes 0-100 quality scores, flags data issues, provides guided cleaning, interactive dashboards,…",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 153,
    "title": "pizza-shop-website",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "Simple pizza shop landing page...",
    "description": "Simple pizza shop landing page",
    "tech": [
      "HTML"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "Simple pizza shop landing page",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 154,
    "title": "maya-angelou-tribute",
    "year": 2026,
    "category": "Web Apps",
    "tagline": "Tribute webpage project...",
    "description": "Tribute webpage project",
    "tech": [
      "HTML"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "Tribute webpage project",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 155,
    "title": "vault-secure-auth",
    "year": 2026,
    "category": "Tools & Security",
    "tagline": "Secure login/register dashboard UI...",
    "description": "Secure login/register dashboard UI",
    "tech": [
      "HTML"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "Secure login/register dashboard UI",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 156,
    "title": "daily-task-nexus",
    "year": 2026,
    "category": "AI & ML",
    "tagline": "A minimalist, locally-persistent Daily Task manage...",
    "description": "A minimalist, locally-persistent Daily Task manager built with HTML5, CSS3 (Custom Animations & Gradients), and Vanilla JavaScript. Features dynamic filtering, task lifecycle management, and a resp…",
    "tech": [
      "HTML"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "A minimalist, locally-persistent Daily Task manager built with HTML5, CSS3 (Custom Animations & Gradients), and Vanilla JavaScript. Features dynamic filtering, task lifecycle management, and a resp…",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 157,
    "title": "web-calculator-js",
    "year": 2026,
    "category": "Tools & Security",
    "tagline": "sleek, responsive web-based calculator built with ...",
    "description": "sleek, responsive web-based calculator built with HTML5, CSS3, and Vanilla JavaScript. Features include basic arithmetic, square root calculations, percentage support, and a history display.",
    "tech": [
      "HTML"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "sleek, responsive web-based calculator built with HTML5, CSS3, and Vanilla JavaScript. Features include basic arithmetic, square root calculations, percentage support, and a history display.",
    "architecture": "",
    "features": [],
    "stats": {}
  },
  {
    "id": 158,
    "title": "vpn-landing-page1",
    "year": 2026,
    "category": "Tools & Security",
    "tagline": "A clone of a professional VPN landing page...",
    "description": "A clone of a professional VPN landing page.",
    "tech": [
      "HTML"
    ],
    "live": null,
    "featured": false,
    "icon": "fa-code",
    "image": "assets/project_placeholder.svg",
    "overview": "A clone of a professional VPN landing page.",
    "architecture": "",
    "features": [],
    "stats": {}
  }
];
if (typeof module !== 'undefined' && module.exports) {
  module.exports = projectsData;
}
