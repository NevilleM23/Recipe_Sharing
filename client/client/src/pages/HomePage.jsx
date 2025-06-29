import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/Searchbar'
import RecipeService from '../context/RecipeService';
import './HomePage.css';

const HomePage = () => {  
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await RecipeService.getAllRecipes();
        setRecipes(data);
        setFilteredRecipes(data);
      } catch (err) {
        console.error('Failed to load recipes', err);
        setError('Could not load recipes. Please try again later.');
      }
    };

    fetchRecipes();
  }, []);

  
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