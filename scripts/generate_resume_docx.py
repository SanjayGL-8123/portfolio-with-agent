import os
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import qn, nsdecls

def create_element(name):
    return OxmlElement(name)

def set_cell_margins(cell, top=50, bottom=50, left=50, right=50):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def add_horizontal_rule(doc, color_hex="0F766E", size="12"):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(4)
    pPr = p._p.get_or_add_pPr()
    pBdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="{size}" w:space="1" w:color="{color_hex}"/></w:pBdr>')
    pPr.append(pBdr)
    return p

def add_section_heading(doc, title):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(8)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.keep_with_next = True
    run = p.add_run(title)
    run.bold = True
    run.font.name = 'Arial'
    run.font.size = Pt(11)
    run.font.color.rgb = RGBColor(15, 23, 42)  # Slate 900
    
    # Add bottom border to heading
    pPr = p._p.get_or_add_pPr()
    pBdr = parse_xml(f'<w:pBdr {nsdecls("w")}><w:bottom w:val="single" w:sz="8" w:space="2" w:color="0F766E"/></w:pBdr>')
    pPr.append(pBdr)

def add_item_row(doc, title_text, right_meta_text):
    tbl = doc.add_table(rows=1, cols=2)
    tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
    tbl.autofit = False
    
    # Total width is 7.5 inches
    col_widths = (Inches(5.3), Inches(2.2))
    row = tbl.rows[0]
    
    # Left cell: Title
    cell_0 = row.cells[0]
    cell_0.width = col_widths[0]
    p0 = cell_0.paragraphs[0]
    p0.paragraph_format.space_before = Pt(3)
    p0.paragraph_format.space_after = Pt(1)
    p0.paragraph_format.keep_with_next = True
    run0 = p0.add_run(title_text)
    run0.bold = True
    run0.font.name = 'Arial'
    run0.font.size = Pt(10)
    run0.font.color.rgb = RGBColor(15, 23, 42)
    
    # Right cell: Meta / Date
    cell_1 = row.cells[1]
    cell_1.width = col_widths[1]
    p1 = cell_1.paragraphs[0]
    p1.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p1.paragraph_format.space_before = Pt(3)
    p1.paragraph_format.space_after = Pt(1)
    p1.paragraph_format.keep_with_next = True
    run1 = p1.add_run(right_meta_text)
    run1.bold = True
    run1.font.name = 'Arial'
    run1.font.size = Pt(9)
    run1.font.color.rgb = RGBColor(15, 118, 110)  # Teal
    
    # Remove borders
    for cell in (cell_0, cell_1):
        tcPr = cell._tc.get_or_add_tcPr()
        borders = parse_xml(
            f'<w:tcBorders {nsdecls("w")}>'
            f'<w:top w:val="none"/><w:left w:val="none"/>'
            f'<w:bottom w:val="none"/><w:right w:val="none"/>'
            f'</w:tcBorders>'
        )
        tcPr.append(borders)
        set_cell_margins(cell, top=20, bottom=20, left=0, right=0)

def add_bullet(doc, text, bold_prefix=None):
    p = doc.add_paragraph(style='List Bullet')
    p.paragraph_format.space_before = Pt(1)
    p.paragraph_format.space_after = Pt(2.5)
    p.paragraph_format.left_indent = Inches(0.25)
    
    if bold_prefix:
        r_pre = p.add_run(bold_prefix)
        r_pre.bold = True
        r_pre.font.name = 'Arial'
        r_pre.font.size = Pt(9.5)
        r_pre.font.color.rgb = RGBColor(30, 41, 59)
    
    r_body = p.add_run(text)
    r_body.font.name = 'Arial'
    r_body.font.size = Pt(9.5)
    r_body.font.color.rgb = RGBColor(30, 41, 59)
    return p

def generate_resume_docx(output_path):
    doc = Document()
    
    # 0.5 inch margins all around
    sections = doc.sections
    for s in sections:
        s.top_margin = Inches(0.5)
        s.bottom_margin = Inches(0.5)
        s.left_margin = Inches(0.5)
        s.right_margin = Inches(0.5)
    
    # Header: Name
    p_name = doc.add_paragraph()
    p_name.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_name.paragraph_format.space_before = Pt(0)
    p_name.paragraph_format.space_after = Pt(1)
    r_name = p_name.add_run("SANJAY G. L.")
    r_name.bold = True
    r_name.font.name = 'Arial'
    r_name.font.size = Pt(22)
    r_name.font.color.rgb = RGBColor(15, 23, 42)
    
    # Title
    p_title = doc.add_paragraph()
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_before = Pt(0)
    p_title.paragraph_format.space_after = Pt(3)
    r_title = p_title.add_run("AI, ML & Python Developer | Full-Stack Developer | BCA Student")
    r_title.bold = True
    r_title.font.name = 'Arial'
    r_title.font.size = Pt(11)
    r_title.font.color.rgb = RGBColor(15, 118, 110)
    
    # Contact Row 1
    p_c1 = doc.add_paragraph()
    p_c1.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_c1.paragraph_format.space_before = Pt(0)
    p_c1.paragraph_format.space_after = Pt(1)
    r_c1 = p_c1.add_run("Shivamogga, Karnataka, India  •  +91 81239 81877  •  ")
    r_c1.font.name = 'Arial'
    r_c1.font.size = Pt(9)
    r_c1.font.color.rgb = RGBColor(71, 85, 105)
    r_email = p_c1.add_run("sanjaygl2006@gmail.com")
    r_email.bold = True
    r_email.font.name = 'Arial'
    r_email.font.size = Pt(9)
    r_email.font.color.rgb = RGBColor(15, 23, 42)
    
    # Contact Row 2
    p_c2 = doc.add_paragraph()
    p_c2.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_c2.paragraph_format.space_before = Pt(0)
    p_c2.paragraph_format.space_after = Pt(5)
    
    items = [
        ("LinkedIn: ", "linkedin.com/in/sanjay-gl-b86631336"),
        ("GitHub: ", "github.com/SanjayGL-8123"),
        ("Portfolio: ", "sanjaygl30ai.vercel.app")
    ]
    for i, (lbl, val) in enumerate(items):
        r_l = p_c2.add_run(lbl)
        r_l.bold = True
        r_l.font.name = 'Arial'
        r_l.font.size = Pt(9)
        r_l.font.color.rgb = RGBColor(71, 85, 105)
        
        r_v = p_c2.add_run(val)
        r_v.font.name = 'Arial'
        r_v.font.size = Pt(9)
        r_v.font.color.rgb = RGBColor(15, 118, 110)
        
        if i < len(items) - 1:
            r_sep = p_c2.add_run("  •  ")
            r_sep.font.name = 'Arial'
            r_sep.font.size = Pt(9)
            r_sep.font.color.rgb = RGBColor(148, 163, 184)
            
    # PROFESSIONAL SUMMARY
    add_section_heading(doc, "PROFESSIONAL SUMMARY")
    p_sum = doc.add_paragraph()
    p_sum.paragraph_format.space_before = Pt(3)
    p_sum.paragraph_format.space_after = Pt(5)
    r_sum = p_sum.add_run(
        "BCA student (3rd year, 5th semester) at PES Institute of Advanced Management Studies with hands-on "
        "experience building machine learning, computer vision and full-stack web applications using Python (Flask, FastAPI), "
        "React and JavaScript. Currently interning as an AI, ML & Python Developer at Milano Infotech; previously "
        "recognised as a Star Performer in an AICTE-recognised web development internship. Seeking internship, "
        "part-time and freelance roles to build practical, AI-driven software."
    )
    r_sum.font.name = 'Arial'
    r_sum.font.size = Pt(9.5)
    r_sum.font.color.rgb = RGBColor(30, 41, 59)
    
    # EXPERIENCE
    add_section_heading(doc, "EXPERIENCE")
    
    add_item_row(doc, "AI, ML & Python Developer Intern — Milano Infotech", "Aug 2026 – Present")
    p_sub1 = doc.add_paragraph()
    p_sub1.paragraph_format.space_before = Pt(0)
    p_sub1.paragraph_format.space_after = Pt(2)
    r_sub1 = p_sub1.add_run("Shivamogga, Karnataka (Offline)")
    r_sub1.italic = True
    r_sub1.font.name = 'Arial'
    r_sub1.font.size = Pt(9)
    r_sub1.font.color.rgb = RGBColor(100, 116, 139)
    add_bullet(doc, "Develop machine learning models, computer vision pipelines and deep learning workflows in Python.")
    add_bullet(doc, "Build Python automations and integrate AI systems with secure backend APIs.")
    
    add_item_row(doc, "Web Development & Designing Intern — Oasis Infobyte (AICTE OIB-SIP)", "Feb 2026 – Mar 2026")
    p_sub2 = doc.add_paragraph()
    p_sub2.paragraph_format.space_before = Pt(0)
    p_sub2.paragraph_format.space_after = Pt(2)
    r_sub2 = p_sub2.add_run("Remote  |  Certificate ID: OIB/F1/IP353  |  Star Performer")
    r_sub2.italic = True
    r_sub2.font.name = 'Arial'
    r_sub2.font.size = Pt(9)
    r_sub2.font.color.rgb = RGBColor(100, 116, 139)
    add_bullet(doc, "Completed an AICTE-recognised internship (Certificate ID: OIB/F1/IP353) building and deploying real-world web projects.")
    add_bullet(doc, "Awarded Star Performer for dedication, code quality and timely delivery.")
    
    # PROJECTS
    add_section_heading(doc, "PROJECTS")
    
    projects_data = [
        ("DataGauge — Dataset Quality Monitoring System", "Python, FastAPI, React, Pandas, JWT, Recharts", [
            "Built a full-stack platform that scores uploaded CSV/Excel datasets from 0–100 and flags completeness, validity and outlier issues.",
            "Added guided data cleaning, 10+ check modules, 10 chart types and PDF/Excel report export."
        ]),
        ("DermAI — AI-Powered Skincare Diagnosis App", "Python, Flask, TensorFlow, Keras, OpenCV", [
            "Trained a deep learning model for skin lesion analysis (94% accuracy, 75 epochs) with inference under 120 ms."
        ]),
        ("Accident Risk Prediction — Road Safety Classifier", "Python, Flask, Scikit-learn, Pandas, SQLite", [
            "Built a Random Forest classifier on 10k+ records (98% accuracy) using traffic, weather and road-density features to forecast hazard levels."
        ]),
        ("Traffic & Vehicle Detection & Smart Attendance (YOLOv8)", "Python, YOLOv8, OpenCV, PyTorch, Flask, React", [
            "Developed real-time object detection for traffic monitoring and an automated classroom attendance tracker with a React teacher dashboard."
        ]),
        ("Sai AI Assistant / Vinayaka AI Chatbot", "Flask, Gemini API, OpenAI, SQLite", [
            "Built AI assistants with Gemini/OpenAI cascade fallback, multilingual and voice support, and session storage."
        ]),
        ("Resume Analyzer — ATS Compatibility & Skill Gap Analysis", "Flask, MySQL, TF-IDF", [
            "Scores resumes against job descriptions, highlights missing skills and stores analysis results."
        ]),
        ("PureWeaves — Saree & Textile E-Commerce Platform", "Flask, JavaScript, SQLite", [
            "Built the product catalog, cart, wishlist and WhatsApp ordering; deployed on Vercel and Render with a PWA service worker."
        ])
    ]
    
    for title, meta, bullets in projects_data:
        add_item_row(doc, title, meta)
        for b in bullets:
            add_bullet(doc, b)
            
    # TECHNICAL SKILLS
    add_section_heading(doc, "TECHNICAL SKILLS")
    skills = [
        ("Languages: ", "Python, Java, JavaScript (ES6+), C/C++, SQL, HTML5, CSS3"),
        ("AI & ML: ", "Scikit-learn, TensorFlow/Keras, OpenCV, YOLOv8, CNNs, Gemini API, Prompt Engineering, Agentic AI workflows"),
        ("Frameworks: ", "FastAPI, Flask, React, Electron.js, Socket.IO"),
        ("Databases: ", "MySQL, SQLite, MongoDB, PostgreSQL (basics)"),
        ("Tools & Cloud: ", "Git, GitHub, Docker, VS Code, Vercel, Google Cloud Run, Kali Linux")
    ]
    for lbl, val in skills:
        p_sk = doc.add_paragraph()
        p_sk.paragraph_format.space_before = Pt(1)
        p_sk.paragraph_format.space_after = Pt(1)
        p_sk.paragraph_format.left_indent = Inches(0.15)
        r_l = p_sk.add_run(lbl)
        r_l.bold = True
        r_l.font.name = 'Arial'
        r_l.font.size = Pt(9.5)
        r_l.font.color.rgb = RGBColor(15, 23, 42)
        r_v = p_sk.add_run(val)
        r_v.font.name = 'Arial'
        r_v.font.size = Pt(9.5)
        r_v.font.color.rgb = RGBColor(30, 41, 59)
        
    # EDUCATION
    add_section_heading(doc, "EDUCATION")
    add_item_row(doc, "Bachelor of Computer Applications (BCA) | 3rd year, 5th semester", "2024 – 2026")
    p_e1 = doc.add_paragraph()
    p_e1.paragraph_format.space_before = Pt(0)
    p_e1.paragraph_format.space_after = Pt(3)
    p_e1.paragraph_format.left_indent = Inches(0.15)
    r_e1 = p_e1.add_run("PES Institute of Advanced Management Studies (PESIAMS) — Shivamogga, Karnataka")
    r_e1.italic = True
    r_e1.font.name = 'Arial'
    r_e1.font.size = Pt(9)
    r_e1.font.color.rgb = RGBColor(100, 116, 139)
    
    add_item_row(doc, "Pre-University Course (Science)", "Completed 2024")
    p_e2 = doc.add_paragraph()
    p_e2.paragraph_format.space_before = Pt(0)
    p_e2.paragraph_format.space_after = Pt(3)
    p_e2.paragraph_format.left_indent = Inches(0.15)
    r_e2 = p_e2.add_run("PES PU College — Shivamogga, Karnataka")
    r_e2.italic = True
    r_e2.font.name = 'Arial'
    r_e2.font.size = Pt(9)
    r_e2.font.color.rgb = RGBColor(100, 116, 139)
    
    # CERTIFICATIONS
    add_section_heading(doc, "CERTIFICATIONS")
    certs = [
        "AI and Machine Learning Essentials — DeepLearning.AI",
        "Cybersecurity Fundamentals — Cisco Networking Academy",
        "HackerRank — JavaScript, SQL, Java, CSS and Python (Basic)",
        "Data Structures and Algorithms in Java — Coding Ninjas",
        "Safe & Responsible Use of AI Quiz — MeitY / ISEA / Digital India",
        "87+ certificates in total across technology, internships and government programmes"
    ]
    for c in certs:
        add_bullet(doc, c)
        
    # ACHIEVEMENTS & VOLUNTEERING
    add_section_heading(doc, "ACHIEVEMENTS & VOLUNTEERING")
    achievements = [
        "Star Performer, AICTE Oasis Infobyte Web Development Internship (2026)",
        "PRAVIDHI State Level BCA Tech Fest (coding event), JSS College for Women (2026)",
        "Cyber Security Cadet, C-DAC / ISEA / MeitY",
        "NSS Volunteer (2023 – Present) and YFS / Mera Yuva Bharat Volunteer (2024 – Present); Certificate of Recognition from the Ministry of Youth Affairs & Sports"
    ]
    for a in achievements:
        add_bullet(doc, a)
        
    # LANGUAGES
    add_section_heading(doc, "LANGUAGES")
    p_lang = doc.add_paragraph()
    p_lang.paragraph_format.space_before = Pt(2)
    p_lang.paragraph_format.space_after = Pt(4)
    p_lang.paragraph_format.left_indent = Inches(0.15)
    r_lg = p_lang.add_run("Kannada (Native)  •  Tamil (Native)  •  English (Professional)")
    r_lg.font.name = 'Arial'
    r_lg.font.size = Pt(9.5)
    r_lg.font.color.rgb = RGBColor(30, 41, 59)
    
    doc.save(output_path)
    print(f"Successfully generated Word Resume at: {output_path}")

if __name__ == '__main__':
    out_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "assets")
    os.makedirs(out_dir, exist_ok=True)
    out_file = os.path.join(out_dir, "Sanjay_GL_Resume.docx")
    generate_resume_docx(out_file)
