"""
app.py

This module sets up the Flask application, initializes Flask extensions,
and defines global error handlers. It serves as the entry point to run the web application.
"""


from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from backend.config import Config
from backend.models.models import db, bcrypt
from dotenv import load_dotenv
from backend import routes
from flask_jwt_extended import JWTManager
from flask_restful import Api
from flask_cors import CORS
# from flask_limiter import Limiter
# from flask_limiter.util import get_remote_address

load_dotenv()

app = Flask(__name__)
app.config.from_object(Config)
api = Api(app)
jwt = JWTManager(app)
db.init_app(app)
bcrypt.init_app(app)
migrate = Migrate(app, db)
# limiter = Limiter(
#     app,
#     key_func=get_remote_address,
#     default_limits=["200 per day", "50 per hour"]
# )
CORS(app, supports_credentials=True, origins=["http://localhost:5173", "http://localhost:5000"])
routes.initialize_routes(api)


# Error Handlers


@app.errorhandler(404)
def not_found(error):
    return {'message': 'Resource not found'}, 404


@app.errorhandler(500)
def internal_error(error):
    return {'message': 'An internal error occurred'}, 500


# Home-Page Route

@app.route('/')
def hello():
    return 'Hey!'


if __name__ == '__main__':
    app.run(debug=True)
