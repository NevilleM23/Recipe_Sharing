import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import RecipeCard from '../components/RecipeCard';
import RecipeService from '../services/RecipeService';
import './UserProfile.css';

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('info');
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;
      
      setLoading(true);
      setError('');
      
      try {
        if (activeTab === 'recipes') {
          // Fetch user's recipes
          const userRecipes = await RecipeService.getUserRecipes(currentUser.id);
          setRecipes(userRecipes);
        } else if (activeTab === 'favorites') {
          // Fetch user's favorites
          const favRecipes = await RecipeService.getFavorites();
          setFavorites(favRecipes);
        }
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load data: ' + err.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [currentUser, activeTab]);

  const handleUnlike = async (recipeId) => {
    try {
      await RecipeService.toggleFavorite(recipeId);
      setFavorites(favorites.filter(recipe => recipe.id !== recipeId));
    } catch (err) {
      console.error('Failed to remove favorite:', err);
    }
  };
  
  if (!currentUser) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-avatar">
          <div className="avatar-placeholder">
            {currentUser.name.charAt(0)}
          </div>
        </div>
        <div className="profile-info">
          <h1>{currentUser.name}</h1>
          <p className="profile-email">{currentUser.email}</p>
          <div className="profile-meta">
        <div className="meta-item">
              <span className="meta-value">Recipes created</span>
              <span>{recipes.length}</span>
            </div>
            <div className="meta-item">
              <span className="meta-value">Favorites saved</span>
              <span>{favorites.length}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'recipes' ? 'active' : ''}`}
          onClick={() => setActiveTab('recipes')}
        >
          My Recipes
        </button>
        <button 
          className={`tab-btn ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          My Favorites
        </button>
        <button 
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Account Settings
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'recipes' && (
          <div className="recipes-section">
            {loading ? (
              <div className="loading">Loading your recipes...</div>
            ) : error ? (
              <div className="error">{error}</div>
            ) : recipes.length === 0 ? (
              <div className="empty-state">
                <p>You haven't created any recipes yet.</p>
                <a href="/create-recipe" className="create-link">
                  Create your first recipe
                </a>
              </div>
            ) : (
              <div className="recipes-grid">
                {recipes.map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'favorites' && (
          <div className="favorites-section">
            {loading ? (
              <div className="loading">Loading your favorites...</div>
            ) : error ? (
              <div className="error">{error}</div>
            ) : favorites.length === 0 ? (
              <div className="empty-state">
                <p>You haven't added any recipes to your favorites yet.</p>
                <p>Browse recipes and click the ❤️ icon to save them here.</p>
              </div>
            ) : (
              <div className="favorites-grid">
                {favorites.map(recipe => (
                  <RecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    onLike={() => handleUnlike(recipe.id)} 
                  />
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="settings-section">
            <form className="settings-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  defaultValue={currentUser.name}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  defaultValue={currentUser.email}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  defaultValue={currentUser.phone || ''}
                />
              </div>
              
              <div className="form-row">
                <button type="submit" className="save-btn">
                  Save Changes
                </button>
                <button className="logout-btn" onClick={logout}>
                  Logout
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;