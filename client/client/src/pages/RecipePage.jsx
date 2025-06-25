import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./RecipePage.css"

const RecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const recipe = {
    id: id,
    title: "Classic Spaghetti Carbonara",
    photo: "carbonara.jpg",
    author: "Maria Rossi",
    cook_time: 30,
    difficulty: "Medium",
    budget_rating: "Medium",
    steps: "1. Bring a large pot of salted water to boil\n2. Cook spaghetti according to package directions\n3. In a bowl, whisk together eggs, cheese, and pepper\n4. Cook pancetta in a skillet until crispy\n5. Drain spaghetti, reserving 1 cup pasta water\n6. Quickly toss hot spaghetti with egg mixture and pancetta\n7. Add pasta water as needed to create creamy sauce\n8. Serve immediately with extra cheese",
    total_cost: 12.75,
    ingredients: [
      { id: 1, name: "Spaghetti", quantity: 250, unit: "g", price: 1.50 },
      { id: 2, name: "Eggs", quantity: 3, unit: "", price: 0.75 },
      { id: 3, name: "Pecorino Romano cheese", quantity: 100, unit: "g", price: 2.50 },
      { id: 4, name: "Pancetta", quantity: 150, unit: "g", price: 4.50 },
      { id: 5, name: "Black pepper", quantity: 1, unit: "tsp", price: 0.10 },
      { id: 6, name: "Salt", quantity: 1, unit: "tsp", price: 0.05 },
      { id: 7, name: "Garlic", quantity: 2, unit: "cloves", price: 0.35 },
    ]
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleFindIngredients = () => {
    navigate('/map');
  };

  return (
    <div className="recipe-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back to recipes
      </button>

      <div className="recipe-header">
        <h1 className="recipe-title">{recipe.title}</h1>
        <p className="recipe-author">By {recipe.author}</p>
      </div>

      <div className="recipe-image-container">
        <div className="recipe-image-placeholder"></div>
      </div>

      <div className="recipe-info-grid">
        <div className="info-card">
          <div className="info-text">
            <span className="info-label">Prep Time</span>
            <span className="info-value">{recipe.cook_time} mins</span>
          </div>
        </div>
        
        <div className="info-card">
          <div className="info-text">
            <span className="info-label">Difficulty</span>
            <span className="info-value">{recipe.difficulty}</span>
          </div>
        </div>
        
        <div className="info-card">
          <div className="info-text">
            <span className="info-label">Budget</span>
            <span className="info-value">{recipe.budget_rating}</span>
          </div>
        </div>
        
        <button 
          className={`like-button ${isLiked ? 'liked' : ''}`}
          onClick={handleLike}
        >
          <span className="heart-icon">❤</span>
          {isLiked ? 'Liked' : 'Like'}
        </button>
      </div>

      <div className="section ingredients-section">
        <h2 className="section-title">Ingredients</h2>
        <ul className="ingredients-list">
          {recipe.ingredients.map((ingredient) => (
            <li key={ingredient.id} className="ingredient-item">
              <span className="ingredient-quantity">{ingredient.quantity} {ingredient.unit}</span>
              <span className="ingredient-name">{ingredient.name}</span>
              {ingredient.price && (
                <span className="ingredient-price">${ingredient.price.toFixed(2)}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="section instructions-section">
        <h2 className="section-title">Cooking Instructions</h2>
        <div className="instructions-container">
          {recipe.steps.split('\n').map((step, index) => (
            <div key={index} className="instruction-step">
              <div className="step-number">{index + 1}</div>
              <p className="step-text">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="cost-banner">
        <div className="cost-info">
          <h3 className="cost-title">Estimated Total Cost</h3>
          <p className="cost-description">Based on current local market prices</p>
        </div>
        <div className="cost-value">${recipe.total_cost.toFixed(2)}</div>
      </div>

      <button 
        className="find-ingredients-button"
        onClick={handleFindIngredients}
      >
        Find Ingredients Near Me
      </button>
    </div>
  );
};

export default RecipePage;