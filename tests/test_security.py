import pytest
import json
import os
import sys

# Ensure project root is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import app, db, contact_limiter, agent_limiter

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    with app.app_context():
        db.create_all()
        # Reset in-memory rate limiters for isolated testing
        contact_limiter.history.clear()
        agent_limiter.history.clear()
        with app.test_client() as client:
            yield client
        db.drop_all()

def test_security_headers_present(client):
    """Verify essential defensive security headers are returned on responses."""
    response = client.get('/')
    assert response.headers.get('X-Content-Type-Options') == 'nosniff'
    assert response.headers.get('X-Frame-Options') == 'SAMEORIGIN'
    assert response.headers.get('X-XSS-Protection') == '1; mode=block'
    assert response.headers.get('Referrer-Policy') == 'strict-origin-when-cross-origin'
    assert 'Permissions-Policy' in response.headers

def test_path_traversal_blocked(client):
    """Path traversal sequences (e.g., ../) must be blocked and not return sensitive files."""
    for payload in ['/../../etc/passwd', '/..%2F..%2Fetc%2Fpasswd', '/../app.py']:
        response = client.get(payload)
        # Should return 404 Not Found, never 200 with file content
        assert response.status_code == 404

def test_source_code_and_secrets_disclosure_prevented(client):
    """Source code, secrets, databases and dotfiles must never be served statically."""
    blocked_targets = [
        '/app.py',
        '/api/index.py',
        '/.env',
        '/.env.example',
        '/requirements.txt',
        '/database/portfolio.db',
        '/.git/config',
        '/vercel.json'
    ]
    for target in blocked_targets:
        response = client.get(target)
        assert response.status_code == 404, f"Target {target} should return 404 but got {response.status_code}"


def test_contact_honeypot_blocks_bots(client):
    """Submissions with the hidden botcheck honeypot field filled must be rejected as spam."""
    payload = {
        'name': 'SpamBot 3000',
        'email': 'bot@spammer.com',
        'subject': 'General Enquiry',
        'message': 'Buy cheap backlinks now guaranteed!',
        'botcheck': 'filled_by_bot'
    }
    response = client.post('/api/contact', json=payload)
    assert response.status_code == 400
    data = response.get_json()
    assert 'Spam detected' in data.get('message', '')

def test_contact_validation_invalid_email(client):
    """Contact form must reject malformed email addresses."""
    payload = {
        'name': 'Test User',
        'email': 'not-an-email-at-all',
        'subject': 'Project Collaboration',
        'message': 'Hello this is a valid message length exceeding 10 chars.'
    }
    response = client.post('/api/contact', json=payload)
    assert response.status_code == 400
    data = response.get_json()
    assert 'email' in data.get('message', '').lower()

def test_contact_validation_short_message(client):
    """Contact form must reject messages shorter than 10 characters."""
    payload = {
        'name': 'Test User',
        'email': 'valid@example.com',
        'subject': 'General Enquiry',
        'message': 'Short'
    }
    response = client.post('/api/contact', json=payload)
    assert response.status_code == 400
    data = response.get_json()
    assert '10 characters' in data.get('message', '')

def test_contact_successful_submission(client):
    """Valid contact form submission should be accepted and encrypted."""
    payload = {
        'name': 'Verified Tester',
        'email': 'tester@example.com',
        'subject': 'Internship / Job Opportunity',
        'message': 'We have an exciting software engineering internship role.'
    }
    response = client.post('/api/contact', json=payload)
    assert response.status_code == 200
    data = response.get_json()
    assert data.get('status') in ['success', 'partial']

def test_agent_endpoint_normal_query(client):
    """POST /api/agent with a valid query should return an intelligent response."""
    payload = {
        'message': 'Tell me about Sanjay skills and background',
        'session_id': 'test_session_1'
    }
    response = client.post('/api/agent', json=payload)
    assert response.status_code == 200
    data = response.get_json()
    assert 'reply' in data
    assert len(data['reply']) > 10

def test_agent_endpoint_empty_message(client):
    """POST /api/agent with empty message should return 400."""
    response = client.post('/api/agent', json={'message': ''})
    assert response.status_code == 400

def test_agent_rate_limiting(client):
    """Excessive rapid requests to agent should trigger rate limiting (429)."""
    payload = {'message': 'Hello AI', 'session_id': 'rate_test'}
    exceeded = False
    for _ in range(25):
        res = client.post('/api/agent', json=payload, environ_overrides={'REMOTE_ADDR': '198.51.100.5'})
        if res.status_code == 429:
            exceeded = True
            break
    assert exceeded is True

def test_method_not_allowed_handling(client):
    """Unallowed HTTP methods on API endpoints should return standardized 405 JSON."""
    response = client.delete('/api/stats')
    assert response.status_code == 405
    data = response.get_json()
    assert data.get('status') == 'error'
    assert 'allowed_methods' in data
