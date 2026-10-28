import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KNOWLEDGE_PATH = os.path.join(BASE_DIR, "knowledge.json")

def update_knowledge():
    with open(KNOWLEDGE_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    # 1. Verifiable Credential
    openai_vc = {
        "@context": [
            "https://www.w3.org/ns/credentials/v2"
        ],
        "type": [
            "VerifiableCredential",
            "PathwayCompletionCertificate"
        ],
        "id": "https://academy.openai.com/certificate/198187379",
        "name": "Pathway Completion Certificate — Apply AI at Work",
        "description": "Completed all three Apply AI at Work Pathway courses and passed each assessment with a score of 80% or higher.",
        "image": "assets/openai-apply-ai-at-work.png",
        "badge": "assets/openai-academy-badge.png",
        "issuer": {
            "id": "https://academy.openai.com",
            "name": "OpenAI Academy"
        },
        "validFrom": "2026-10-24T00:00:00Z",
        "validUntil": "2027-04-24T00:00:00Z",
        "credentialSubject": {
            "name": "Sanjay G. L",
            "credentialId": "198187379",
            "achievement": "Completed all three Apply AI at Work Pathway courses and passed each assessment with a score of 80% or higher."
        },
        "completionDate": "2026-10-24"
    }

    if "verifiable_credentials" not in data:
        data["verifiable_credentials"] = []
    
    existing_ids = [c.get("id") for c in data["verifiable_credentials"]]
    if openai_vc["id"] not in existing_ids:
        data["verifiable_credentials"].insert(0, openai_vc)

    # 2. Certificates highlights & list
    certs = data.get("certificates", {})
    if isinstance(certs, dict):
        highlights = certs.get("highlights", [])
        highlight_title = "OpenAI Academy — Pathway Completion Certificate: Apply AI at Work (Credential ID: 198187379 · Oct 24, 2026)"
        if highlight_title not in highlights:
            highlights.insert(0, highlight_title)
        certs["highlights"] = highlights

        cert_list = certs.get("list", [])
        new_cert_entry = {
            "title": "Pathway Completion Certificate — Apply AI at Work",
            "org": "OpenAI Academy",
            "issuer": "OpenAI Academy",
            "year": 2026,
            "completionDate": "2026-10-24",
            "validUntil": "2027-04-24",
            "credentialId": "198187379",
            "badge": "assets/openai-academy-badge.png",
            "image": "assets/openai-apply-ai-at-work.png",
            "verifyLink": "https://academy.openai.com",
            "description": "Completed all three Apply AI at Work Pathway courses and passed each assessment with a score of 80% or higher."
        }
        has_entry = any(c.get("credentialId") == "198187379" for c in cert_list if isinstance(c, dict))
        if not has_entry:
            cert_list.insert(0, new_cert_entry)
        certs["list"] = cert_list
        certs["total_count"] = len(cert_list)
        certs["named_count"] = certs.get("named_count", 0) + 1
        data["certificates"] = certs

    # 3. Add to interview_qna
    iqna = data.get("interview_qna", [])
    q_exists = any("apply ai at work" in (item.get("question", "").lower()) for item in iqna)
    if not q_exists:
        iqna.insert(0, {
            "category": "certificates",
            "question": "Tell me about your OpenAI Academy certification or Apply AI at Work certificate.",
            "answer": "I hold the official Pathway Completion Certificate in 'Apply AI at Work' from OpenAI Academy (Credential ID: 198187379, issued October 24, 2026). To earn this credential, I completed all three pathway courses covering practical workplace AI implementation, prompting engineering, workflow automation, and evaluation, passing each assessment with a score of 80% or higher.",
            "keywords": "openai,academy,apply ai at work,pathway,certificate,credential,198187379,prompting,assessment",
            "answer_type": "long"
        })
        data["interview_qna"] = iqna

    with open(KNOWLEDGE_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"Successfully added OpenAI Academy Certificate to knowledge.json. Total certs: {len(data['certificates']['list'])}")

if __name__ == "__main__":
    update_knowledge()
