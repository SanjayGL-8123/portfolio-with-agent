import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KNOWLEDGE_PATH = os.path.join(BASE_DIR, "knowledge.json")

def update_knowledge():
    with open(KNOWLEDGE_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    # 1. Raw W3C Verifiable Credential from user
    raw_credential = {
        "@context": [
            "https://www.w3.org/ns/credentials/v2"
        ],
        "type": [
            "VerifiableCredential"
        ],
        "id": "https://www.credential.net/0c84bba4-926a-45d0-9507-e6e85fd1339e",
        "name": "AI-Powered Shopping ads Certification",
        "description": "Validate your proficiency with using and optimizing AI-Powered Shopping ads. Certified users will also demonstrate knowledge of how to create and optimize Performance Max and Shopping campaigns that maximize reach and conversions.",
        "image": "https://api.accredible.com/v1/credentials/1hnmwguv/artifact/badge",
        "issuer": {
            "id": "did:web:api.accredible.com:v1:verifiable_credential:organizations:89126",
            "name": "Skillshop"
        },
        "validFrom": "2026-06-05T00:00:00Z",
        "validUntil": "2027-06-05T00:00:00Z",
        "credentialSubject": {
            "name": "Sanjay G. L",
            "identifier": {
                "type": "IdentityObject",
                "hashed": True,
                "identityHash": "sha256$5554a400a9ceb113086cb7ff7bf462a3b81b87a63d5ebd9bdbdc19c8c03743ab",
                "identityType": "email",
                "salt": "a0212ece976821493b5a0995ae609723"
            }
        },
        "completionDate": "2026-06-05",
        "credential_creation_flow_from_LMS": "certification_awarded"
    }

    # Store in verifiable_credentials
    if "verifiable_credentials" not in data:
        data["verifiable_credentials"] = []
    
    # Avoid duplicate
    existing_ids = [c.get("id") for c in data["verifiable_credentials"]]
    if raw_credential["id"] not in existing_ids:
        data["verifiable_credentials"].insert(0, raw_credential)

    # 2. Add to certificates section
    certs = data.get("certificates", {})
    if isinstance(certs, dict):
        highlights = certs.get("highlights", [])
        highlight_title = "AI-Powered Shopping ads Certification — Google Skillshop (Credential ID: 0c84bba4-926a-45d0-9507-e6e85fd1339e)"
        if highlight_title not in highlights:
            highlights.insert(0, highlight_title)
        certs["highlights"] = highlights

        cert_list = certs.get("list", [])
        new_cert_entry = {
            "title": "AI-Powered Shopping ads Certification",
            "org": "Google Skillshop",
            "issuer": "Skillshop / Google",
            "year": 2026,
            "completionDate": "2026-06-05",
            "validUntil": "2027-06-05",
            "badge": "https://api.accredible.com/v1/credentials/1hnmwguv/artifact/badge",
            "verifyLink": "https://www.credential.net/0c84bba4-926a-45d0-9507-e6e85fd1339e",
            "description": "Validates proficiency with using and optimizing AI-Powered Shopping ads, Performance Max campaigns, and Merchant Center product feed strategy."
        }
        # Check if already in list
        has_entry = any(c.get("verifyLink") == new_cert_entry["verifyLink"] for c in cert_list if isinstance(c, dict))
        if not has_entry:
            cert_list.insert(0, new_cert_entry)
        certs["list"] = cert_list
        certs["total_count"] = len(cert_list)
        certs["named_count"] = certs.get("named_count", 0) + 1
        data["certificates"] = certs

    # 3. Add to interview_qna
    iqna = data.get("interview_qna", [])
    q_exists = any("shopping ads" in (item.get("question", "").lower()) for item in iqna)
    if not q_exists:
        iqna.insert(0, {
            "category": "certificates",
            "question": "What is your AI-Powered Shopping ads Certification?",
            "answer": "I hold the verified AI-Powered Shopping ads Certification from Google Skillshop (Credential ID: 0c84bba4-926a-45d0-9507-e6e85fd1339e). This official certification recognizes proficiency in building and optimizing AI-driven Google Shopping ads, Performance Max campaigns for retail, and Google Merchant Center product feed architectures.",
            "keywords": "google,skillshop,ai,shopping,ads,certification,credential,perfmax"
        })
        data["interview_qna"] = iqna

    # Save formatted knowledge.json
    with open(KNOWLEDGE_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

    print(f"Successfully updated knowledge.json. Total certs: {len(data['certificates']['list'])}, Highlights: {len(data['certificates']['highlights'])}")

if __name__ == "__main__":
    update_knowledge()
