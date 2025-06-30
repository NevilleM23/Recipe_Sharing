from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, create_access_token, get_jwt_identity
from app.services.auth_service import AuthService
from app.utils.decorators import validate_json
from app.utils.validators import validate_email, validate_password

import jwt
from flask import current_app

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/register', methods=['POST'])
@validate_json({
    'name': {'type': 'string', 'required': True},
    'email': {'type': 'string', 'required': True},
    'password': {'type': 'string', 'required': True},
    'phone': {'type': 'string', 'required': False}
})
def register():
    data = request.get_json()
    
    if not validate_email(data['email']):
        return jsonify({'error': 'Invalid email format'}), 400
    
    if not validate_password(data['password']):
        return jsonify({'error': 'Password must be at least 8 characters'}), 400
    
    user, error = AuthService.register_user(
        name=data['name'],
        email=data['email'],
        phone=data.get('phone'),
        password=data['password']
    )
    
    if error:
        return jsonify({'error': error}), 400
    
    access_token = create_access_token(identity=user.id)
    
    # Debug: decode and print the token's payload
    try:
        payload = jwt.decode(access_token, current_app.config['JWT_SECRET_KEY'], algorithms=["HS256"])
        print('JWT payload for new user:', payload)
    except Exception as e:
        print('JWT decode error:', e)
    
    return jsonify({
        'message': 'User registered successfully',
        'access_token': access_token,
        'user': {
            'id': user.id,
            'name': user.name,
            'email': user.email
        }
    }), 201

@auth_bp.route('/login', methods=['POST'])
@validate_json({
    'email': {'type': 'string', 'required': True},
    'password': {'type': 'string', 'required': True}
})
def login():
    data = request.get_json()
    result, error = AuthService.login_user(data['email'], data['password'])
    
    if error:
        return jsonify({'error': error}), 401
    
    # Debug: decode and print the token's payload
    try:
        payload = jwt.decode(result['access_token'], current_app.config['JWT_SECRET_KEY'], algorithms=["HS256"])
        print('JWT payload for login:', payload)
    except Exception as e:
        print('JWT decode error:', e)
    
    return jsonify(result), 200

@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    user_id = get_jwt_identity()
    user = AuthService.get_user_by_id(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({
        'id': user.id,
        'name': user.name,
        'email': user.email,
        'phone': user.phone
    }), 200

