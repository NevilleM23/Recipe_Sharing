from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from server.models import Ingredient, PriceEntry

ingredients_bp = Blueprint('ingredients', __name__, url_prefix='/api/ingredients')

@ingredients_bp.route('/', methods=['GET'])
def get_ingredients():
    ingredients = Ingredient.query.all()
    return jsonify([{
        'id': ing.id,
        'name': ing.name,
        'category': ing.category,
        'unit': ing.unit,
        'avg_price': ing.avg_price
    } for ing in ingredients]), 200

@ingredients_bp.route('/<int:ingredient_id>/prices', methods=['GET'])
def get_ingredient_prices(ingredient_id):
    prices = PriceEntry.query.filter_by(ingredient_id=ingredient_id).all()
    
    return jsonify([{
        'id': price.id,
        'market_id': price.market_id,
        'market_name': price.market.name,
        'price': price.price,
        'date_recorded': price.date_recorded.isoformat()
    } for price in prices]), 200
