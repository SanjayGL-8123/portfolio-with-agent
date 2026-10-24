import json

with open('knowledge.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

print("--- INTERVIEW QNA ---")
interview = data.get('interview_qna', [])
print(f"Count: {len(interview)}")
for i, item in enumerate(interview[:10]):
    print(f"  {i+1}. Q: {item.get('question')}")

print("\n--- EXTENDED QNA ---")
extended = data.get('extended_qna', [])
print(f"Count: {len(extended)}")
for i, item in enumerate(extended[:10]):
    print(f"  {i+1}. [{item.get('category')}] Q: {item.get('question')}")

# Check unique categories in extended
cats = set(item.get('category') for item in extended)
print(f"\nExtended QNA Categories: {cats}")
