from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from app.config import Config

db = SQLAlchemy()
migrate = Migrate()
jwt = JWTManager()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object('app.config.Config')
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    CORS(app)
    
    from app.models import User, Recipe, Ingredient, RecipeIngredient, Market, PriceEntry, Favorite
    
    # Register blueprints
    from app.routes.auth_routes import auth_bp
    from app.routes.recipe_routes import recipes_bp
    from app.routes.ingredient_routes import ingredients_bp
    from app.routes.market_routes import markets_bp
    
    app.register_blueprint(auth_bp)
    app.register_blueprint(recipes_bp)
    app.register_blueprint(ingredients_bp)
    app.register_blueprint(markets_bp)
    
    return app
