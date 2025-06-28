import React, { useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/Searchbar'
import './HomePage.css';

const HomePage = () => {
 const [recipes, setRecipes] = useState([
    {
      id: 1,
      title: "Classic Spaghetti Carbonara",
      photo: "carbonara.jpg",
      cook_time: 30,
      difficulty: "Medium",
      budget_rating: "Medium",
      likes: 124,
      isLiked: false
    },
    {
      id: 2,
      title: "Vegetable Stir Fry",
      photo: "stirfry.jpg",
      cook_time: 20,
      difficulty: "Easy",
      budget_rating: "Low",
      likes: 89,
      isLiked: true
    },
    {
      id: 3,
      title: "Chocolate Chip Cookies",
      photo: "cookies.jpg",
      cook_time: 25,
      difficulty: "Easy",
      budget_rating: "Low",
      likes: 215,
      isLiked: false
    },
    {
      id: 4,
      title: "Beef Bourguignon",
      photo: "beef.jpg",
      cook_time: 180,
      difficulty: "Hard",
      budget_rating: "High",
      likes: 67,
      isLiked: false
    },
    {
      id: 5,
      title: "Greek Salad",
      photo: "salad.jpg",
      cook_time: 15,
      difficulty: "Easy",
      budget_rating: "Low",
      likes: 142,
      isLiked: false
    },
    {
      id: 6,
      title: "Chicken Curry",
      photo: "curry.jpg",
      cook_time: 45,
      difficulty: "Medium",
      budget_rating: "Medium",
      likes: 98,
      isLiked: false
    }
  ]);
  
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