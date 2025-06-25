from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, create_refresh_token
from server.models import User
from run import db

class AuthService:
    @staticmethod
    def register_user(name, email, phone, password):
        if User.query.filter_by(email=email).first():
            return None, 'Email already registered'
        
        hashed_password = generate_password_hash(password)
        new_user = User(
            name=name,
            email=email,
            phone=phone,
            password_hash=hashed_password
        )
        
        db.session.add(new_user)
        db.session.commit()
        
        return new_user, None

    @staticmethod
    def login_user(email, password):
        user = User.query.filter_by(email=email).first()
        
        if not user or not check_password_hash(user.password_hash, password):
            return None, 'Invalid credentials'
        
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
        
        return {
            'access_token': access_token,
            'refresh_token': refresh_token,
            'user': {
                'id': user.id,
                'name': user.name,
                'email': user.email
            }
        }, None

    @staticmethod
    def get_user_by_id(user_id):
        return User.query.get(user_id)