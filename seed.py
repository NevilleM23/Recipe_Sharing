from app import db, app
from app.models import User, Recipe, Ingredient, RecipeIngredient, Market, PriceEntry, Favorite
from datetime import datetime, timedelta
import hashlib
import os
import random 

# Add this at the start of your seed.py
print(f"Database will be created at: {os.path.abspath('instance/site.db')}")

def create_users():
    users = [
        User(
            name="Chef Marie",
            email="marie@example.com",
            phone="+1234567890",
            password_hash=hash_password("password123")
        ),
        User(
            name="John Doe",
            email="john@example.com",
            phone="+1987654321",
            password_hash=hash_password("cooking123")
        ),
        User(
            name="Alice Smith",
            email="alice@example.com",
            phone="+1122334455",
            password_hash=hash_password("freshfood")
        )
    ]
    return users

def hash_password(password):
    """Secure password hashing using PBKDF2-HMAC-SHA256 with salt"""
    salt = os.urandom(16)
    return hashlib.pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        salt,
        100000
    ).hex()

def create_ingredients():
    ingredients = [
        Ingredient(name="Tomato", category="Vegetable", unit="kg", avg_price=2.5),
        Ingredient(name="Onion", category="Vegetable", unit="kg", avg_price=1.2),
        Ingredient(name="Chicken Breast", category="Meat", unit="kg", avg_price=8.0),
        Ingredient(name="Rice", category="Grain", unit="kg", avg_price=1.8),
        Ingredient(name="Olive Oil", category="Condiment", unit="liter", avg_price=5.5),
        Ingredient(name="Garlic", category="Vegetable", unit="piece", avg_price=0.3),
        Ingredient(name="Basil", category="Herb", unit="bunch", avg_price=1.0),
        Ingredient(name="Pasta", category="Grain", unit="kg", avg_price=2.2),
        Ingredient(name="Mozzarella", category="Dairy", unit="kg", avg_price=7.0),
        Ingredient(name="Flour", category="Baking", unit="kg", avg_price=1.5),
        Ingredient(name="Bell Pepper", category="Vegetable", unit="piece", avg_price=0.8),
        Ingredient(name="Ground Beef", category="Meat", unit="kg", avg_price=9.5),
        Ingredient(name="Potato", category="Vegetable", unit="kg", avg_price=1.0),
        Ingredient(name="Carrot", category="Vegetable", unit="kg", avg_price=0.9),
        Ingredient(name="Soy Sauce", category="Condiment", unit="ml", avg_price=0.02),
    ]
    return ingredients

def create_markets():
    markets = [
        Market(
            name="Fresh Farmers Market",
            location="123 Main St, City Center",
            contact="(555) 123-4567",
            operating_hours="Mon-Sat 8am-6pm",
            latitude=34.0522,
            longitude=-118.2437
        ),
        Market(
            name="Organic Grocers",
            location="456 Elm St, West District",
            contact="(555) 987-6543",
            operating_hours="Daily 7am-10pm",
            latitude=34.0634,
            longitude=-118.2580
        ),
        Market(
            name="Local Produce Co-op",
            location="789 Oak St, East Side",
            contact="(555) 456-7890",
            operating_hours="Tue-Sun 9am-7pm",
            latitude=34.0411,
            longitude=-118.2468
        )
    ]
    return markets

def create_recipes(users):
    recipes = [
        Recipe(
            title="Classic Tomato Pasta",
            description="A simple and delicious pasta dish with fresh tomatoes and basil",
            steps="1. Boil water and cook pasta according to package instructions\n2. Heat olive oil in a pan, sauté garlic until fragrant\n3. Add chopped tomatoes and simmer for 10 minutes\n4. Combine sauce with drained pasta, season with salt and pepper",
            cook_time=20,
            difficulty="Easy",
            budget_rating="Low",
            image_url="https://example.com/images/tomato-pasta.jpg",
            user_id=users[0].id
        ),
        Recipe(
            title="Chicken Stir Fry",
            description="Quick and healthy stir fry with vegetables and rice",
            steps="1. Slice chicken into thin strips\n2. Heat oil in wok, stir-fry chicken until cooked\n3. Add chopped vegetables and stir-fry for 5 minutes\n4. Pour in soy sauce and serve over cooked rice",
            cook_time=30,
            difficulty="Medium",
            budget_rating="Medium",
            image_url="https://example.com/images/chicken-stirfry.jpg",
            user_id=users[1].id
        ),
        Recipe(
            title="Margherita Pizza",
            description="Classic Italian pizza with fresh mozzarella and basil",
            steps="1. Prepare pizza dough and let it rise\n2. Spread tomato sauce on dough, top with mozzarella\n3. Bake at 220°C for 12-15 minutes\n4. Garnish with fresh basil leaves before serving",
            cook_time=40,
            difficulty="Medium",
            budget_rating="Medium",
            image_url="https://example.com/images/margherita-pizza.jpg",
            user_id=users[0].id
        ),
        Recipe(
            title="Vegetable Soup",
            description="Hearty vegetable soup perfect for cold days",
            steps="1. Chop all vegetables into bite-sized pieces\n2. Sauté onions and garlic in a pot\n3. Add vegetables and broth, simmer for 20 minutes\n4. Season with herbs and serve hot",
            cook_time=35,
            difficulty="Easy",
            budget_rating="Low",
            image_url="https://example.com/images/vegetable-soup.jpg",
            user_id=users[2].id
        ),
        Recipe(
            title="Herb Roasted Chicken",
            description="Juicy roasted chicken with aromatic herbs",
            steps="1. Preheat oven to 200°C\n2. Rub chicken with herbs and olive oil\n3. Roast for 50-60 minutes until golden brown\n4. Let rest for 10 minutes before carving",
            cook_time=60,
            difficulty="Hard",
            budget_rating="High",
            image_url="https://example.com/images/roasted-chicken.jpg",
            user_id=users[1].id
        ),
        Recipe(
            title="Beef Tacos",
            description="Flavorful beef tacos with fresh toppings",
            steps="1. Brown ground beef with spices\n2. Warm taco shells in oven\n3. Assemble with lettuce, cheese, and salsa\n4. Serve with lime wedges",
            cook_time=25,
            difficulty="Easy",
            budget_rating="Medium",
            image_url="https://example.com/images/beef-tacos.jpg",
            user_id=users[0].id
        )
    ]
    return recipes

def create_recipe_ingredients(recipes, ingredients):
    recipe_ingredients = [
        # Tomato Pasta
        RecipeIngredient(recipe_id=recipes[0].id, ingredient_id=ingredients[7].id, quantity=0.3, notes="Spaghetti or linguine"),  # Pasta
        RecipeIngredient(recipe_id=recipes[0].id, ingredient_id=ingredients[0].id, quantity=0.5, notes="Fresh ripe tomatoes"),  # Tomato
        RecipeIngredient(recipe_id=recipes[0].id, ingredient_id=ingredients[4].id, quantity=0.05),  # Olive Oil
        RecipeIngredient(recipe_id=recipes[0].id, ingredient_id=ingredients[5].id, quantity=2, notes="Minced"),  # Garlic
        RecipeIngredient(recipe_id=recipes[0].id, ingredient_id=ingredients[6].id, quantity=0.5, notes="Fresh basil"),  # Basil
        
        # Chicken Stir Fry
        RecipeIngredient(recipe_id=recipes[1].id, ingredient_id=ingredients[2].id, quantity=0.4),  # Chicken Breast
        RecipeIngredient(recipe_id=recipes[1].id, ingredient_id=ingredients[1].id, quantity=0.2, notes="Sliced"),  # Onion
        RecipeIngredient(recipe_id=recipes[1].id, ingredient_id=ingredients[3].id, quantity=0.3),  # Rice
        RecipeIngredient(recipe_id=recipes[1].id, ingredient_id=ingredients[10].id, quantity=2, notes="Sliced"),  # Bell Pepper
        RecipeIngredient(recipe_id=recipes[1].id, ingredient_id=ingredients[14].id, quantity=30),  # Soy Sauce
        
        # Margherita Pizza
        RecipeIngredient(recipe_id=recipes[2].id, ingredient_id=ingredients[8].id, quantity=0.25),  # Mozzarella
        RecipeIngredient(recipe_id=recipes[2].id, ingredient_id=ingredients[0].id, quantity=0.4),  # Tomato
        RecipeIngredient(recipe_id=recipes[2].id, ingredient_id=ingredients[6].id, quantity=1),  # Basil
        RecipeIngredient(recipe_id=recipes[2].id, ingredient_id=ingredients[9].id, quantity=0.3),  # Flour
        
        # Vegetable Soup
        RecipeIngredient(recipe_id=recipes[3].id, ingredient_id=ingredients[0].id, quantity=0.4),  # Tomato
        RecipeIngredient(recipe_id=recipes[3].id, ingredient_id=ingredients[1].id, quantity=0.3),  # Onion
        RecipeIngredient(recipe_id=recipes[3].id, ingredient_id=ingredients[12].id, quantity=0.5, notes="Diced"),  # Potato
        RecipeIngredient(recipe_id=recipes[3].id, ingredient_id=ingredients[13].id, quantity=0.4, notes="Sliced"),  # Carrot
        
        # Herb Roasted Chicken
        RecipeIngredient(recipe_id=recipes[4].id, ingredient_id=ingredients[2].id, quantity=1.2),  # Chicken Breast
        RecipeIngredient(recipe_id=recipes[4].id, ingredient_id=ingredients[6].id, quantity=2),  # Basil
        RecipeIngredient(recipe_id=recipes[4].id, ingredient_id=ingredients[4].id, quantity=0.03),  # Olive Oil
        RecipeIngredient(recipe_id=recipes[4].id, ingredient_id=ingredients[5].id, quantity=4),  # Garlic
        
        # Beef Tacos
        RecipeIngredient(recipe_id=recipes[5].id, ingredient_id=ingredients[11].id, quantity=0.5),  # Ground Beef
        RecipeIngredient(recipe_id=recipes[5].id, ingredient_id=ingredients[1].id, quantity=0.2),  # Onion
        RecipeIngredient(recipe_id=recipes[5].id, ingredient_id=ingredients[0].id, quantity=0.3),  # Tomato
    ]
    return recipe_ingredients

def create_price_entries(ingredients, markets):
    price_entries = []
    # Create price history for the last 30 days
    for ingredient in ingredients:
        for market in markets:
            for days_ago in range(30):
                # Base price with market-specific variation
                base_variation = 0.8 + (market.id * 0.15)
                base_price = ingredient.avg_price * base_variation
                
                # Daily variation (±10%)
                daily_variation = 1 + (random.random() * 0.2 - 0.1)
                price = round(base_price * daily_variation, 2)
                
                # Date for this price entry
                date_recorded = datetime.utcnow() - timedelta(days=30 - days_ago)
                
                price_entries.append(PriceEntry(
                    ingredient_id=ingredient.id,
                    market_id=market.id,
                    price=price,
                    date_recorded=date_recorded
                ))
    return price_entries

def create_favorites(users, recipes):
    return [
        # Marie's favorites
        Favorite(user_id=users[0].id, recipe_id=recipes[1].id, created_at=datetime.utcnow() - timedelta(days=5)),
        Favorite(user_id=users[0].id, recipe_id=recipes[3].id, created_at=datetime.utcnow() - timedelta(days=2)),
        Favorite(user_id=users[0].id, recipe_id=recipes[5].id, created_at=datetime.utcnow()),
        
        # John's favorites
        Favorite(user_id=users[1].id, recipe_id=recipes[0].id, created_at=datetime.utcnow() - timedelta(days=7)),
        Favorite(user_id=users[1].id, recipe_id=recipes[2].id, created_at=datetime.utcnow() - timedelta(days=1)),
        Favorite(user_id=users[1].id, recipe_id=recipes[4].id, created_at=datetime.utcnow()),
        
        # Alice's favorites
        Favorite(user_id=users[2].id, recipe_id=recipes[4].id, created_at=datetime.utcnow() - timedelta(days=3)),
        Favorite(user_id=users[2].id, recipe_id=recipes[3].id, created_at=datetime.utcnow() - timedelta(days=1)),
    ]

def seed_database():
    print("Starting database seeding...")
    
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()
        
        print("Creating users...")
        users = create_users()
        for user in users:
            db.session.add(user)
        db.session.commit()
        print(f"Created {len(users)} users")
        
        print("Creating ingredients...")
        ingredients = create_ingredients()
        for ingredient in ingredients:
            db.session.add(ingredient)
        db.session.commit()
        print(f"Created {len(ingredients)} ingredients")
        
        print("Creating markets...")
        markets = create_markets()
        for market in markets:
            db.session.add(market)
        db.session.commit()
        print(f"Created {len(markets)} markets")
        
        print("Creating recipes...")
        recipes = create_recipes(users)
        for recipe in recipes:
            db.session.add(recipe)
        db.session.commit()
        print(f"Created {len(recipes)} recipes")
        
        print("Creating recipe ingredients...")
        recipe_ingredients = create_recipe_ingredients(recipes, ingredients)
        for ri in recipe_ingredients:
            db.session.add(ri)
        db.session.commit()
        print(f"Created {len(recipe_ingredients)} recipe ingredients")
        
        print("Creating price entries...")
        price_entries = create_price_entries(ingredients, markets)
        for pe in price_entries:
            db.session.add(pe)
        db.session.commit()
        print(f"Created {len(price_entries)} price entries")
        
        print("Creating favorites...")
        favorites = create_favorites(users, recipes)
        for fav in favorites:
            db.session.add(fav)
        db.session.commit()
        print(f"Created {len(favorites)} favorites")
        
        print("\nDatabase seeded successfully!")
        print("="*50)
        print("Sample Data Summary:")
        print(f"- Users: {len(users)}")
        print(f"- Ingredients: {len(ingredients)}")
        print(f"- Markets: {len(markets)}")
        print(f"- Recipes: {len(recipes)}")
        print(f"- Recipe Ingredients: {len(recipe_ingredients)}")
        print(f"- Price Entries: {len(price_entries)} (30 days history)")
        print(f"- Favorites: {len(favorites)}")
        print("="*50)

if __name__ == "__main__":
    seed_database()