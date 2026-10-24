import sys
import os

# Add the project root directory to sys.path to allow importing from the root
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Import the Flask app instance from app.py at the root
from app import app

# WSGI Middleware to ensure proper routing on Vercel
class VercelPathHandler:
    def __init__(self, wsgi_app):
        self.wsgi_app = wsgi_app

    def __call__(self, environ, start_response):
        path = environ.get('PATH_INFO', '')
        if path in ('/api/index.py', '/api/index', '/api'):
            orig_uri = (
                environ.get('HTTP_X_FORWARDED_URI') or 
                environ.get('HTTP_X_VERCEL_PATH') or 
                environ.get('RAW_URI') or 
                ''
            )
            if orig_uri:
                environ['PATH_INFO'] = orig_uri.split('?')[0]
        return self.wsgi_app(environ, start_response)

app.wsgi_app = VercelPathHandler(app.wsgi_app)
