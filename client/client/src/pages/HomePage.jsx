// src/pages/HomePage.js
import React, { useState } from 'react';
import RecipeCard from '../components/RecipeCard/RecipeCard';
import SearchBar from '../components/SearchBar/SearchBar';
import './HomePage.css';

const HomePage = () => {
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  
  const handleSearch = (searchTerm, filters) => {
    let result = [...recipes];
    
    if (searchTerm) {
      result = result.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filters.difficulty && filters.difficulty !== 'all') {
      result = result.filter(recipe => 
        recipe.difficulty.toLowerCase() === filters.difficulty.toLowerCase()
      );
    }
    
    if (filters.budget && filters.budget !== 'all') {
      result = result.filter(recipe => 
        recipe.budget_rating.toLowerCase() === filters.budget.toLowerCase()
      );
    }
    
    setFilteredRecipes(result);
  };
  
  const handleLike = (id) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === id ? { ...recipe, isLiked: !recipe.isLiked, likes: recipe.isLiked ? recipe.likes - 1 : recipe.likes + 1 } : recipe
    ));
    
    setFilteredRecipes(filteredRecipes.map(recipe => 
      recipe.id === id ? { ...recipe, isLiked: !recipe.isLiked, likes: recipe.isLiked ? recipe.likes - 1 : recipe.likes + 1 } : recipe
    ));
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Discover Amazing Recipes</h1>
          <p>Find, create, and share delicious recipes with our community. Plan your meals and shop smarter.</p>
        </div>
      </div>
      
      <SearchBar onSearch={handleSearch} />
      
      <div className="featured-recipes">
        <h2>Popular Recipes</h2>
        <div className="recipe-grid">
          {filteredRecipes.map(recipe => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              onLike={handleLike} 
            />
          ))}
        </div>
      </div>
      
      <div className="app-features">
        <h2>Why Use RecipeShare?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Digital Cookbook</h3>
            <p>Access all your recipes from any device, anytime.</p>
          </div>
          <div className="feature-card">
            <h3>Budget Tracker</h3>
            <p>Estimate costs and save money on ingredients.</p>
          </div>
          <div className="feature-card">
            <h3>Market Finder</h3>
            <p>Discover the best places to buy ingredients near you.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;