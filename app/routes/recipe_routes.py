from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.recipe_service import RecipeService
from app.utils.decorators import validate_json
from app.models import Recipe, Favorite

recipes_bp = Blueprint('recipes', __name__, url_prefix='/api/recipes')

@recipes_bp.route('/', methods=['GET'])
def get_recipes():
    filters = {
        'search': request.args.get('search'),
        'difficulty': request.args.get('difficulty'),
        'budget_rating': request.args.get('budget'),
        'ingredient': request.args.get('ingredient')
    }
    
    recipes = RecipeService.get_all_recipes(filters)
    return jsonify([{
        'id': recipe.id,
        'title': recipe.title,
        'description': recipe.description,
        'cook_time': recipe.cook_time,
        'difficulty': recipe.difficulty,
        'budget_rating': recipe.budget_rating,
        'image_url': recipe.image_url,
        'author': {
            'id': recipe.author.id,
            'name': recipe.author.name
        }
    } for recipe in recipes]), 200

@recipes_bp.route('/', methods=['POST'])
@jwt_required()
@validate_json({
    'title': {'type': 'string', 'required': True},
    'steps': {'type': 'string', 'required': True},
    'description': {'type': 'string', 'required': False},
    'cook_time': {'type': 'integer', 'required': False},
    'difficulty': {'type': 'string', 'required': False},
    'budget_rating': {'type': 'string', 'required': False},
    'image_url': {'type': 'string', 'required': False},
    'ingredients': {
        'type': 'list',
        'required': False,
        'schema': {
            'type': 'dict',
            'schema': {
                'name': {'type': 'string', 'required': True},
                'quantity': {'type': 'float', 'required': True},
                'category': {'type': 'string', 'required': False},
                'unit': {'type': 'string', 'required': False},
                'notes': {'type': 'string', 'required': False}
            }
        }
    }
})
def create_recipe():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    recipe = RecipeService.create_recipe(user_id, data)
    
    return jsonify({
        'id': recipe.id,
        'title': recipe.title,
        'message': 'Recipe created successfully'
    }), 201

@recipes_bp.route('/<int:recipe_id>', methods=['GET'])
def get_recipe(recipe_id):
    recipe = Recipe.query.get_or_404(recipe_id)
    
    ingredients = [{
        'id': ri.ingredient.id,
        'name': ri.ingredient.name,
        'quantity': ri.quantity,
        'unit': ri.ingredient.unit,
        'notes': ri.notes,
        'avg_price': ri.ingredient.avg_price
    } for ri in recipe.ingredients]
    
    return jsonify({
        'id': recipe.id,
        'title': recipe.title,
        'description': recipe.description,
        'steps': recipe.steps,
        'cook_time': recipe.cook_time,
        'difficulty': recipe.difficulty,
        'budget_rating': recipe.budget_rating,
        'image_url': recipe.image_url,
        'created_at': recipe.created_at.isoformat(),
        'author': {
            'id': recipe.author.id,
            'name': recipe.author.name
        },
        'ingredients': ingredients
    }), 200

@recipes_bp.route('/<int:recipe_id>/favorite', methods=['POST'])
@jwt_required()
def toggle_favorite(recipe_id):
    user_id = get_jwt_identity()
    is_favorited = RecipeService.toggle_favorite(user_id, recipe_id)
    
    return jsonify({
        'is_favorited': is_favorited,
        'message': 'Recipe favorited' if is_favorited else 'Recipe unfavorited'
    }), 200

@recipes_bp.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorites():
    user_id = get_jwt_identity()
    favorites = Favorite.query.filter_by(user_id=user_id).all()
    
    return jsonify([{
        'id': fav.recipe.id,
        'title': fav.recipe.title,
        'description': fav.recipe.description,
        'image_url': fav.recipe.image_url,
        'author': {
            'id': fav.recipe.author.id,
            'name': fav.recipe.author.name
        }
    } for fav in favorites]), 200
