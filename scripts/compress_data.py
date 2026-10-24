import os
import json
import re
from PIL import Image

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def compress_logo():
    svg_content = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" fill="none">
  <defs>
    <linearGradient id="tealGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#2dd4bf"/>
      <stop offset="50%" stop-color="#0f766e"/>
      <stop offset="100%" stop-color="#14b8a6"/>
    </linearGradient>
    <linearGradient id="glowGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#34d399"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="2.5" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <!-- Background Badge -->
  <polygon points="60,6 108,33 108,87 60,114 12,87 12,33" fill="#0b1120" stroke="url(#tealGrad)" stroke-width="2.5" filter="url(#glow)"/>
  <polygon points="60,18 96,38 96,82 60,102 24,82 24,38" fill="rgba(15, 118, 110, 0.15)" stroke="url(#glowGrad)" stroke-width="1" opacity="0.75"/>
  <!-- Neural Vertices -->
  <circle cx="60" cy="6" r="3.2" fill="#2dd4bf"/>
  <circle cx="108" cy="33" r="3.2" fill="#2dd4bf"/>
  <circle cx="108" cy="87" r="3.2" fill="#2dd4bf"/>
  <circle cx="60" cy="114" r="3.2" fill="#2dd4bf"/>
  <circle cx="12" cy="87" r="3.2" fill="#2dd4bf"/>
  <circle cx="12" cy="33" r="3.2" fill="#2dd4bf"/>
  <!-- Connectors -->
  <line x1="60" y1="18" x2="60" y2="6" stroke="#2dd4bf" stroke-width="1.2" opacity="0.8"/>
  <line x1="24" y1="38" x2="12" y2="33" stroke="#2dd4bf" stroke-width="1.2" opacity="0.8"/>
  <line x1="96" y1="38" x2="108" y2="33" stroke="#2dd4bf" stroke-width="1.2" opacity="0.8"/>
  <line x1="24" y1="82" x2="12" y2="87" stroke="#2dd4bf" stroke-width="1.2" opacity="0.8"/>
  <line x1="96" y1="82" x2="108" y2="87" stroke="#2dd4bf" stroke-width="1.2" opacity="0.8"/>
  <line x1="60" y1="102" x2="60" y2="114" stroke="#2dd4bf" stroke-width="1.2" opacity="0.8"/>
  <!-- Monogram Logo Text -->
  <text x="60" y="70" text-anchor="middle" font-family="'Poppins', system-ui, sans-serif" font-weight="800" font-size="34" fill="url(#tealGrad)" filter="url(#glow)" letter-spacing="1">GL</text>
</svg>"""

    target = os.path.join(BASE_DIR, "logo.svg")
    os.makedirs(os.path.dirname(target), exist_ok=True)
    with open(target, "w", encoding="utf-8") as f:
        f.write(svg_content)
    print(f"[LOGO] Written {target}: {os.path.getsize(target)} bytes (down from 2.88 MB)")

def compress_images():
    # 1. profile.png
    profile_path = os.path.join(BASE_DIR, "assets", "profile.png")
    if os.path.exists(profile_path):
        orig_size = os.path.getsize(profile_path)
        img = Image.open(profile_path)
        # Resize to max 600x600 which is plenty sharp for retina display 300px
        img.thumbnail((600, 600), Image.Resampling.LANCZOS)
        temp_path = profile_path + ".opt.png"
        img.save(temp_path, "PNG", optimize=True)
        new_size = os.path.getsize(temp_path)
        if new_size < orig_size:
            os.replace(temp_path, profile_path)
            print(f"[IMAGE] profile.png compressed: {orig_size} -> {new_size} bytes ({100 - new_size*100//orig_size}% reduction)")
        else:
            if os.path.exists(temp_path):
                os.remove(temp_path)

    # 2. spvm3-logo.png
    spvm3_path = os.path.join(BASE_DIR, "assets", "spvm3-logo.png")
    if os.path.exists(spvm3_path):
        orig_size = os.path.getsize(spvm3_path)
        img = Image.open(spvm3_path)
        img.thumbnail((600, 600), Image.Resampling.LANCZOS)
        temp_path = spvm3_path + ".opt.png"
        img.save(temp_path, "PNG", optimize=True)
        new_size = os.path.getsize(temp_path)
        if new_size < orig_size:
            os.replace(temp_path, spvm3_path)
            print(f"[IMAGE] spvm3-logo.png compressed: {orig_size} -> {new_size} bytes ({100 - new_size*100//orig_size}% reduction)")
        else:
            if os.path.exists(temp_path):
                os.remove(temp_path)

def compress_knowledge():
    kj_path = os.path.join(BASE_DIR, "knowledge.json")
    if os.path.exists(kj_path):
        with open(kj_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        
        # 1. Save minified knowledge.min.json
        min_path = os.path.join(BASE_DIR, "knowledge.min.json")
        with open(min_path, "w", encoding="utf-8") as f:
            json.dump(data, f, separators=(',', ':'), ensure_ascii=False)
        print(f"[KNOWLEDGE] Minified knowledge.min.json: {os.path.getsize(min_path)} bytes")

        # 2. Extract compact agent dataset for rapid client-side responses
        projects_list = []
        raw_projects = data.get("projects", {})
        if isinstance(raw_projects, list):
            projects_list = raw_projects
        elif isinstance(raw_projects, dict):
            for cat, projs in raw_projects.items():
                if isinstance(projs, list):
                    projects_list.extend(projs)

        agent_data = {
            "personal": data.get("personal", {}),
            "education": data.get("education", []),
            "skills": data.get("skills", {}),
            "interview_qna": data.get("interview_qna", []),
            "extended_qna": data.get("extended_qna", []),
            "top_projects": [
                {
                    "id": p.get("id"),
                    "title": p.get("title"),
                    "tagline": p.get("tagline"),
                    "tech": p.get("tech") or p.get("tech_stack"),
                    "live": p.get("live"),
                    "github": p.get("github")
                }
                for p in projects_list[:25]
            ],
            "certs_count": len(data.get("certificates", {}).get("list", [])) if isinstance(data.get("certificates"), dict) else 87
        }
        
        agent_js_path = os.path.join(BASE_DIR, "js", "agentKnowledge.js")
        with open(agent_js_path, "w", encoding="utf-8") as f:
            f.write("window.SANJAY_AGENT_KNOWLEDGE = " + json.dumps(agent_data, separators=(',', ':'), ensure_ascii=False) + ";")
        print(f"[KNOWLEDGE] Built js/agentKnowledge.js: {os.path.getsize(agent_js_path)} bytes")

if __name__ == "__main__":
    print("=== Starting Data Compression ===")
    compress_logo()
    compress_images()
    compress_knowledge()
    print("=== Data Compression Complete ===")
