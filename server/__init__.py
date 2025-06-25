from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTExtended
from flask_cors import CORS
from server.config import Config

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
    from server.routes.auth_routes import auth_bp
    from server.routes.recipe_routes import recipes_bp
    from server.routes.ingredient_routes import ingredients_bp
    from server.routes.market_routes import markets_bp
    
    app.register_blueprint(auth_bp)
    app.register_blueprint(recipes_bp)
    app.register_blueprint(ingredients_bp)
    app.register_blueprint(markets_bp)
    
    return app
