from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from .models import db
from .routes.auth_routes import auth_bp
from .routes.recipe_routes import recipe_bp
from .routes.ingredient_routes import ingredient_bp
from .routes.market_routes import market_bp
from .routes.favorite_routes import favorite_bp

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///recipes.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'super-secret-key'

    CORS(app)
    db.init_app(app)
    Migrate(app, db)
    JWTManager(app)

    app.register_blueprint(auth_bp)
    app.register_blueprint(recipe_bp)
    app.register_blueprint(ingredient_bp)
    app.register_blueprint(market_bp)
    app.register_blueprint(favorite_bp)

    return app