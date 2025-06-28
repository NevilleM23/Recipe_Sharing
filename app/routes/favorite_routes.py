from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Favorite, Recipe, db
from sqlalchemy.exc import SQLAlchemyError

favorites_bp = Blueprint('favorites', __name__, url_prefix='/api/favorites')

@favorites_bp.route('/', methods=['GET'])
@jwt_required()
def get_favorites():
    user_id = get_jwt_identity()
    try:
        favorites = Favorite.query.filter_by(user_id=user_id).all()
        recipes = [Recipe.query.get(fav.recipe_id) for fav in favorites]
        
        return jsonify([{
            'id': recipe.id,
            'title': recipe.title,
            'image_url': recipe.image_url,
            'cook_time': recipe.cook_time,
            'difficulty': recipe.difficulty
        } for recipe in recipes]), 200
    except SQLAlchemyError as e:
        return jsonify({'error': 'Database error'}), 500

@favorites_bp.route('/<int:recipe_id>', methods=['POST'])
@jwt_required()
def add_favorite(recipe_id):
    user_id = get_jwt_identity()
    try:
        # Check if favorite already exists
        if Favorite.query.filter_by(user_id=user_id, recipe_id=recipe_id).first():
            return jsonify({'message': 'Recipe already in favorites'}), 200
        
        new_favorite = Favorite(user_id=user_id, recipe_id=recipe_id)
        db.session.add(new_favorite)
        db.session.commit()
        
        return jsonify({'message': 'Recipe added to favorites'}), 201
    except SQLAlchemyError as e:
        return jsonify({'error': 'Database error'}), 500

@favorites_bp.route('/<int:recipe_id>', methods=['DELETE'])
@jwt_required()
def remove_favorite(recipe_id):
    user_id = get_jwt_identity()
    try:
        favorite = Favorite.query.filter_by(user_id=user_id, recipe_id=recipe_id).first()
        if not favorite:
            return jsonify({'error': 'Favorite not found'}), 404
        
        db.session.delete(favorite)
        db.session.commit()
        
        return jsonify({'message': 'Recipe removed from favorites'}), 200
    except SQLAlchemyError as e:
        return jsonify({'error': 'Database error'}), 500