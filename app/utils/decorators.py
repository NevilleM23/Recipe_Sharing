from functools import wraps
from flask import request, jsonify
import jsonschema
from jsonschema import validate

def validate_json(schema):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            if not request.is_json:
                return jsonify({'error': 'Request must be JSON'}), 400
            
            try:
                validate(instance=request.get_json(), schema=schema)
            except jsonschema.exceptions.ValidationError as e:
                return jsonify({'error': str(e)}), 400
            
            return f(*args, **kwargs)
        return wrapper
    return decorator
