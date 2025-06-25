from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTExtended
from flask_cors import CORS
from app.config import Config

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTExtended()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    CORS(app)
    
    # Register blueprints
    from app.routes.auth import auth_bp
    from app.routes.recipes import recipes_bp
    from app.routes.ingredients import ingredients_bp
    from app.routes.markets import markets_bp
    
    app.register_blueprint(auth_bp)
    app.register_blueprint(recipes_bp)
    app.register_blueprint(ingredients_bp)
    app.register_blueprint(markets_bp)
    
    return app
