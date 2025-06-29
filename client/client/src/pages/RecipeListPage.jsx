import React, { useEffect, useState } from 'react';
import RecipeService from '../services/RecipeService';
import { Link } from 'react-router-dom';
import './RecipeListPage.css'; 

const RecipesListPage = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await RecipeService.getAllRecipes();
        setRecipes(data);
      } catch (err) {
        setError('Failed to load recipes');
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="recipes-list-page">
      <h1>All Recipes</h1>
      {error && <p>{error}</p>}
      <div className="recipe-list">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <Link to={`/recipe/${recipe.id}`}>
              <img src={recipe.image_url || 'https://via.placeholder.com/200x150?text=No+Image'} alt={recipe.title} />
              <h2>{recipe.title}</h2>
              <p>{recipe.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesListPage;
