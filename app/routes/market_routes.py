from flask import Blueprint, request, jsonify
from app.models import Market

markets_bp = Blueprint('markets', __name__, url_prefix='/api/markets')

@markets_bp.route('/', methods=['GET'])
def get_markets():
    location = request.args.get('near')
    markets = Market.query.all()
    
    return jsonify([{
        'id': market.id,
        'name': market.name,
        'location': market.location,
        'contact': market.contact,
        'operating_hours': market.operating_hours,
        'latitude': market.latitude,
        'longitude': market.longitude
    } for market in markets]), 200
