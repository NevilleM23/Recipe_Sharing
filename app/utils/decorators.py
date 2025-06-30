from functools import wraps
from flask import request, jsonify
import jsonschema
from jsonschema import validate

def convert_to_jsonschema(custom_schema):
    """
    Convert a custom schema with 'required' in each field to a valid JSON Schema.
    """
    json_schema = {
        "type": "object",
        "properties": {},
        "required": []
    }
    for key, value in custom_schema.items():
        if isinstance(value, dict) and 'type' in value:
            prop = value.copy()
            if 'required' in prop:
                if prop['required']:
                    json_schema['required'].append(key)
                del prop['required']
            # Handle nested list/dict schemas recursively
            if prop.get('type') == 'list' and 'schema' in prop:
                prop['type'] = 'array'
                prop['items'] = convert_to_jsonschema(prop['schema'])
                del prop['schema']
            elif prop.get('type') == 'dict' and 'schema' in prop:
                nested = convert_to_jsonschema(prop['schema'])
                prop['type'] = 'object'
                prop['properties'] = nested['properties']
                if nested.get('required'):
                    prop['required'] = nested['required']
                del prop['schema']
            # Map Python types to JSON Schema types
            if prop.get('type') == 'integer':
                prop['type'] = 'integer'
            elif prop.get('type') == 'float' or prop.get('type') == 'number':
                prop['type'] = 'number'
            elif prop.get('type') == 'string':
                prop['type'] = 'string'
            json_schema['properties'][key] = prop
    if not json_schema['required']:
        del json_schema['required']
    return json_schema

def validate_json(schema):
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            if not request.is_json:
                return jsonify({'error': 'Request must be JSON'}), 400
            try:
                # Convert custom schema to valid JSON Schema
                json_schema = convert_to_jsonschema(schema)
                validate(instance=request.get_json(), schema=json_schema)
            except jsonschema.exceptions.ValidationError as e:
                return jsonify({'error': str(e)}), 400
            except jsonschema.exceptions.SchemaError as e:
                return jsonify({'error': f'Schema error: {str(e)}'}), 500
            return f(*args, **kwargs)
        return wrapper
    return decorator
