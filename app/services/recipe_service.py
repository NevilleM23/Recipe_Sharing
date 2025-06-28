from app.models import Recipe, Ingredient, RecipeIngredient, Favorite, db
from sqlalchemy import or_, and_

class RecipeService:
    @staticmethod
    def get_all_recipes(filters=None):
        query = Recipe.query
        
        if filters:
            if 'search' in filters:
                search = f"%{filters['search']}%"
                query = query.filter(
                    or_(
                        Recipe.title.ilike(search),
                        Recipe.description.ilike(search)
                    )
                )
            
            if 'difficulty' in filters:
                query = query.filter_by(difficulty=filters['difficulty'])
            
            if 'budget_rating' in filters:
                query = query.filter_by(budget_rating=filters['budget_rating'])
            
            if 'ingredient' in filters:
                query = query.join(Recipe.ingredients).join(RecipeIngredient.ingredient).filter(
                    Ingredient.name.ilike(f"%{filters['ingredient']}%")
                )
        
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
