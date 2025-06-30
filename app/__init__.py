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

    # Dynamic CORS setup: allow all origins in development, restrict to Vercel/localhost in production
    import os
    if os.environ.get("FLASK_ENV") == "development" or os.environ.get("DEBUG") == "1":
        CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True, allow_headers=["Content-Type", "Authorization"], methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])
    else:
        CORS(
            app,
            resources={r"/api/*": {"origins": [
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "https://recipe-sharing-hazel.vercel.app"
            ]}},
            supports_credentials=True,
            allow_headers=["Content-Type", "Authorization"],
            methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
        )
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

app = create_app()