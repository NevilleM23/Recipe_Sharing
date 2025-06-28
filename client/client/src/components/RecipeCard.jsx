import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './RecipeCard.css'

const RecipeCard = ({ recipe, onLike }) => {
  const handleLike = (e) => {
    e.preventDefault();
    if (onLike) onLike(recipe.id);
  };

  return (
    <Link to={`/recipe/${recipe.id}`} className="recipe-card">
      <div className="card-image">
        {recipe.photo ? (
          <img 
            src={recipe.photo} 
            alt={recipe.title} 
            className="recipe-image"
          />
        ) : (
          <div className="image-placeholder"></div>
        )}
      </div>

       <div className="card-content">
        <h3 className="recipe-title">{recipe.title}</h3>
        
        <div className="recipe-meta">
          <div className="meta-item">
            <span className="meta-label">Time:</span>
            <span>{recipe.cook_time} min</span>
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
        
        <div className="card-footer">
          <button 
            onClick={handleLike}
            className={`like-btn ${recipe.isLiked ? 'liked' : ''}`}
          >
            <span className="heart-icon">❤</span>
            <span>{recipe.likes}</span>
          </button>
          
          <div className="view-recipe">
            View Recipe →
          </div>
          </div>
        </div>
    </Link>
  );
};

export default RecipeCard;