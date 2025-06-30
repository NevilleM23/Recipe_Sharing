from app.models import Recipe, Ingredient, RecipeIngredient, Favorite, db
from sqlalchemy import or_, and_
import sys

class RecipeService:
    @staticmethod
    def get_all_recipes(filters=None):
        query = Recipe.query
        # Debug: print number of recipes before filters
        print(f"[DEBUG] Total recipes in DB before filters: {query.count()}", file=sys.stderr)
        if filters:
            if filters.get('search'):
                search = f"%{filters['search']}%"
                query = query.filter(
                    or_(
                        Recipe.title.ilike(search),
                        Recipe.description.ilike(search)
                    )
                )
            
            if filters.get('difficulty'):
                query = query.filter_by(difficulty=filters['difficulty'])
            
            if filters.get('budget_rating'):
                query = query.filter_by(budget_rating=filters['budget_rating'])
            
            if filters.get('ingredient'):
                query = query.join(Recipe.ingredients).join(RecipeIngredient.ingredient).filter(
                    Ingredient.name.ilike(f"%{filters['ingredient']}%")
                )
        # Debug: print number of recipes after filters
        print(f"[DEBUG] Total recipes in DB after filters: {query.count()}", file=sys.stderr)
        return query.all()

    @staticmethod
    def create_recipe(user_id, data):
        recipe = Recipe(
            title=data['title'],
            description=data.get('description'),
            steps=data['steps'],
            cook_time=data.get('cook_time'),
            difficulty=data.get('difficulty'),
            budget_rating=data.get('budget_rating'),
            image_url=data.get('image_url'),
            user_id=user_id
        )
        db.session.add(recipe)
        db.session.commit()
        # Debug: print recipe created
        print(f"[DEBUG] Created recipe with ID: {recipe.id}", file=sys.stderr)
        if 'ingredients' in data:
            for ingredient_data in data['ingredients']:
                ingredient = Ingredient.query.filter_by(name=ingredient_data['name']).first()
                if not ingredient:
                    ingredient = Ingredient(
                        name=ingredient_data['name'],
                        category=ingredient_data.get('category'),
                        unit=ingredient_data.get('unit')
                    )
                    db.session.add(ingredient)
                    db.session.commit()
                recipe_ingredient = RecipeIngredient(
                    recipe_id=recipe.id,
                    ingredient_id=ingredient.id,
                    quantity=ingredient_data['quantity'],
                    notes=ingredient_data.get('notes')
                )
                db.session.add(recipe_ingredient)
        db.session.commit()
        # Debug: print total recipes after creation
        print(f"[DEBUG] Total recipes in DB after creation: {Recipe.query.count()}", file=sys.stderr)
        return recipe

    @staticmethod
    def toggle_favorite(user_id, recipe_id):
        favorite = Favorite.query.filter_by(
            user_id=user_id,
            recipe_id=recipe_id
        ).first()
        
        if favorite:
            db.session.delete(favorite)
            db.session.commit()
            return False
        else:
            new_favorite = Favorite(
                user_id=user_id,
                recipe_id=recipe_id
            )
            db.session.add(new_favorite)
            db.session.commit()
            return True
