from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    email = db.Column(db.String(120), unique=True)
    phone = db.Column(db.String(20))
    password_hash = db.Column(db.String(255))
    recipes = db.relationship("Recipe", backref="user", lazy=True)
    favorites = db.relationship("Favorite", backref="user", lazy=True)

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120))
    steps = db.Column(db.Text)
    cook_time = db.Column(db.Integer)
    difficulty = db.Column(db.String(50))
    budget_rating = db.Column(db.String(50))
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    ingredients = db.relationship("RecipeIngredient", backref="recipe", lazy=True)
    favorites = db.relationship("Favorite", backref="recipe", lazy=True)

class Ingredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    category = db.Column(db.String(100))
    unit = db.Column(db.String(20))
    avg_price = db.Column(db.Float)
    price_entries = db.relationship("PriceEntry", backref="ingredient", lazy=True)

class RecipeIngredient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey("recipe.id"), nullable=False)
    ingredient_id = db.Column(db.Integer, db.ForeignKey("ingredient.id"), nullable=False)
    quantity = db.Column(db.Float)