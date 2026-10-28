import pytest
import json
import os
import sys

# Ensure project root is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app import app, db

@pytest.fixture
def client():
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    with app.app_context():
        db.create_all()
        with app.test_client() as client:
            yield client
        db.drop_all()

def test_home_page(client):
    """GET / should render index.html with 200 OK and text/html Content-Type."""
    response = client.get('/')
    assert response.status_code == 200
    assert 'text/html' in response.content_type
    assert b'Sanjay' in response.data

def test_health_endpoint(client):
    """GET /health should return JSON status healthy with 200 OK."""
    response = client.get('/health')
    assert response.status_code == 200
    assert response.is_json
    data = response.get_json()
    assert data.get('status') == 'healthy'
    assert 'service' in data
    assert 'version' in data

def test_api_health_alias(client):
    """GET /api/health should alias to /health."""
    response = client.get('/api/health')
    assert response.status_code == 200
    assert response.is_json
    data = response.get_json()
    assert data.get('status') == 'healthy'

def test_api_stats(client):
    """GET /api/stats should return numerical metrics and counts."""
    response = client.get('/api/stats')
    assert response.status_code == 200
    assert response.is_json
    data = response.get_json()
    assert 'projects' in data
    assert 'certificates' in data
    assert 'visits' in data

def test_api_projects(client):
    """GET /api/projects should return project list array."""
    response = client.get('/api/projects')
    assert response.status_code == 200
    assert response.is_json
    data = response.get_json()
    assert isinstance(data, list)
    assert len(data) > 0

def test_api_certificates(client):
    """GET /api/certificates should return certificates payload."""
    response = client.get('/api/certificates')
    assert response.status_code == 200
    assert response.is_json
    data = response.get_json()
    assert 'total' in data
    assert 'featured' in data

def test_api_about(client):
    """GET /api/about should return personal biographical data."""
    response = client.get('/api/about')
    assert response.status_code == 200
    assert response.is_json
    data = response.get_json()
    assert 'Sanjay' in data.get('name', '')
    assert 'skills' in data

def test_sitemap_and_robots(client):
    """Static discovery files should be accessible."""
    sitemap = client.get('/sitemap.xml')
    assert sitemap.status_code == 200
    assert 'xml' in sitemap.content_type

    robots = client.get('/robots.txt')
    assert robots.status_code == 200
    assert 'text/plain' in robots.content_type

def test_project_detail_existing(client):
    """GET /projects/<slug> should render project detail page for valid ID."""
    response = client.get('/projects/crq-optimize')
    assert response.status_code == 200
    assert b'CRQ Optimize' in response.data

def test_project_detail_nonexistent(client):
    """GET /projects/<slug> should return 404 for unknown project."""
    response = client.get('/projects/non-existent-project-xyz-123')
    assert response.status_code == 404

def test_static_assets_serving(client):
    """Static assets like CSS, JS, and certificate images should return 200."""
    cert = client.get('/assets/openai-apply-ai-at-work.png')
    assert cert.status_code == 200
    assert 'image/png' in cert.content_type
    assert len(cert.data) > 1000

    badge = client.get('/assets/openai-academy-badge.png')
    assert badge.status_code == 200

    css = client.get('/css/clean-redesign.css')
    assert css.status_code == 200

