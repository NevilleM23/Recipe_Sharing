import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RecipeService from '../context/RecipeService';
import './RecipePage.css';

const RecipePage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const recipeData = await RecipeService.getRecipeById(id);
        setRecipe(recipeData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load recipe: ' + err.message);
        setLoading(false);
      }
    };
    
    fetchRecipe();
  }, [id]);

  const handleLike = async () => {
    if (!currentUser) return;
    
    try {
      const updatedRecipe = await RecipeService.toggleFavorite(id);
      setRecipe(updatedRecipe);
    } catch (err) {
      console.error('Failed to toggle favorite:', err);
    }
  };

  if (loading) {
      return <div className="loading">Loading recipe...</div>;
    }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!recipe) {
    return <div className="error">Recipe not found</div>;
  }

  const isLiked = currentUser && recipe.favorites && 
    recipe.favorites.some(fav => fav.user_id === currentUser.id)

  return (
<div className="recipe-page">
      <div className="recipe-header">
        <div className="recipe-image-container">
          <img 
            src={recipe.image_url || 'https://via.placeholder.com/600x400?text=No+Image'} 
            alt={recipe.title} 
            className="recipe-main-image"
          />
        </div>
        <div className="recipe-info">
          <h1>{recipe.title}</h1>
          <div className="recipe-meta">
            <div className="meta-item">
              <span className="meta-label">Prep Time:</span>
              <span>{recipe.cook_time} minutes</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Difficulty:</span>
              <span className="capitalize">{recipe.difficulty}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Budget:</span>
              <span className="capitalize">{recipe.budget_rating}</span>
            </div>
          </div>
          <p className="recipe-description">{recipe.description}</p>
          <div className="like-container">
            <button 
              onClick={handleLike}
              className={`like-btn ${isLiked ? 'liked' : ''}`}
              disabled={!currentUser}
            >
              <span className="heart-icon">❤</span>
              <span>{recipe.favorites_count || 0}</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="recipe-content">
        <div className="ingredients-section">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.quantity} {ingredient.unit} {ingredient.name}
                {ingredient.notes && ` (${ingredient.notes})`}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="instructions-section">
          <h2>Instructions</h2>
          <ol>
            {recipe.steps && recipe.steps.split('\n').map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;