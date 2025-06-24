import React from 'react';
import { Link } from 'react-router-dom';

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


    </Link>
  );
};

export default RecipeCard;