import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${API_BASE}/recipes`; // Fixed: now includes /api/recipes

const RecipeService = {
  getAllRecipes: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getRecipeById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`, {
      withCredentials: true
    });
    return response.data;
  },

  createRecipe: async (recipeData, token) => {
    const response = await axios.post(API_URL, recipeData, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });
    return response.data;
  },

  toggleFavorite: async (id, token) => {
    const response = await axios.post(`${API_URL}/${id}/favorite`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });
    return response.data;
  },

  getUserRecipes: async (userId, token) => {
    const response = await axios.get(`${API_BASE}/api/users/${userId}/recipes`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });
    return response.data;
  },

  getFavorites: async (token) => {
    const response = await axios.get(`${API_BASE}/api/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });
    return response.data;
  }
};

export default RecipeService;