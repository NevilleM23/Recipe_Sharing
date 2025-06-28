const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class RecipeService {
  static async getAllRecipes(filters = {}) {
    const token = localStorage.getItem('access_token');
    const params = new URLSearchParams(filters).toString();
    
    const response = await fetch(`${API_URL}/recipes?${params}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch recipes');
    }
    
    return response.json();
  }

  static async getRecipeById(id) {
    const token = localStorage.getItem('access_token');
    
    const response = await fetch(`${API_URL}/recipes/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch recipe');
    }
    
    return response.json();
  }

  static async createRecipe(recipeData) {
    const token = localStorage.getItem('access_token');
    
    const response = await fetch(`${API_URL}/recipes`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipeData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to create recipe');
    }
    
    return response.json();
  }

  static async toggleFavorite(recipeId) {
    const token = localStorage.getItem('access_token');
    
    const response = await fetch(`${API_URL}/recipes/${recipeId}/toggle_favorite`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to toggle favorite');
    }
    
    return response.json();
  }

  static async getUserRecipes(userId) {
    const token = localStorage.getItem('access_token');
    
    const response = await fetch(`${API_URL}/users/${userId}/recipes`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user recipes');
    }
    
    return response.json();
  }
}

export default RecipeService;