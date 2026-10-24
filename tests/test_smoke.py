import pytest
import requests

LIVE_URL = "https://sanjaygl.vercel.app"

def test_live_home_returns_html():
    """Live site root must return 200 OK with text/html, never raw Python source."""
    try:
        response = requests.get(LIVE_URL, timeout=12)
        assert response.status_code == 200
        assert "text/html" in response.headers.get("Content-Type", "")
        # Critical verification: source code must never leak
        assert "from app import app" not in response.text
        assert "import os" not in response.text
        assert "<title>" in response.text
    except requests.exceptions.RequestException as e:
        pytest.skip(f"Live network test skipped: {e}")

def test_live_health_endpoint():
    """Live /health route must return JSON with healthy status."""
    try:
        response = requests.get(f"{LIVE_URL}/health", timeout=12)
        assert response.status_code == 200
        assert "application/json" in response.headers.get("Content-Type", "")
        data = response.json()
        assert data.get("status") == "healthy"
        assert "service" in data
    except requests.exceptions.RequestException as e:
        pytest.skip(f"Live network test skipped: {e}")

def test_live_security_headers():
    """Live site must return protective security headers."""
    try:
        response = requests.get(LIVE_URL, timeout=12)
        headers = response.headers
        assert headers.get("X-Content-Type-Options") == "nosniff"
        assert headers.get("X-Frame-Options") in ["SAMEORIGIN", "DENY"]
    except requests.exceptions.RequestException as e:
        pytest.skip(f"Live network test skipped: {e}")
