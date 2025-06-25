import React, { useState } from 'react';
import './RecipePage.css';

const RecipePage = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(124);

  const recipe = {
    id: 1,
    title: "Classic Spaghetti Carbonara",
    photo: "https://images.unsplash.com/photo-1612870635447-de7a255d4256",
    cook_time: 30,
    difficulty: "Medium",
    budget_rating: "Medium",
    ingredients: [
      "400g spaghetti",
      "200g pancetta or guanciale, diced",
      "4 large eggs",
      "50g pecorino cheese, grated",
      "50g parmesan, grated",
      "Freshly ground black pepper",
      "Salt"
    ],
    instructions: [
      "Bring a large pot of salted water to boil and cook spaghetti according to package instructions.",
      "While pasta cooks, fry pancetta in a large pan until crispy.",
      "In a bowl, whisk eggs and mix in grated cheeses and plenty of black pepper.",
      "Drain pasta, reserving some cooking water, and immediately add to the pancetta.",
      "Remove pan from heat and quickly stir in egg mixture, creating a creamy sauce.",
      "Serve immediately with extra grated cheese and black pepper."
    ],
    author: "Maria Rossi",
    date_posted: "2023-05-15"
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  return (
    <div className="recipe-page">
      <div className="recipe-header">
        <h1>{recipe.title}</h1>
        <div className="recipe-meta">
          <div className="meta-item">
            <span className="meta-label">Prep Time:</span>
            <span>{recipe.cook_time} minutes</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Difficulty:</span>
            <span>{recipe.difficulty}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Budget:</span>
            <span>{recipe.budget_rating}</span>
          </div>
        </div>
        
        <button 
          onClick={handleLike}
          className={`like-btn ${isLiked ? 'liked' : ''}`}
        >
          <span className="heart-icon">❤</span>
          <span>{likes}</span>
        </button>
      </div>
      
      <div className="recipe-image-container">
        <img 
          src={recipe.photo} 
          alt={recipe.title} 
          className="recipe-main-image"
        />
      </div>
      
      <div className="recipe-details">
        <div className="recipe-author">
          Posted by {recipe.author} on {new Date(recipe.date_posted).toLocaleDateString()}
        </div>
        
        <div className="recipe-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
        
        <div className="recipe-section">
          <h2>Instructions</h2>
          <ol className="instructions-list">
            {recipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div> 

        
      </div>
    </div>
  );
};

export default RecipePage;