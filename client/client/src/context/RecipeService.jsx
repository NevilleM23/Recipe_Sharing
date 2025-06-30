import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'https://recipe-sharing-x9px.onrender.com';
const API_URL = `${API_BASE}/recipes`; // Removed trailing slash

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
    // Always get token from localStorage if not provided
    const authToken = token || localStorage.getItem('access_token');
    // Debug: log the payload and token
    console.log('Payload sent to backend:', recipeData);
    console.log('Token sent to backend:', authToken);
    if (!authToken) {
      throw new Error('No authentication token provided to RecipeService.createRecipe');
    }
    const response = await axios.post(API_URL, recipeData, {
      headers: {
        Authorization: `Bearer ${authToken}`
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
    const url = `${API_URL}/user/${userId}`;
    console.log('Fetching user recipes from:', url, 'with token:', token);
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });
    return response.data;
  },

  getFavorites: async (token) => {
    const url = `${API_URL}/favorites`;
    console.log('Fetching favorites from:', url, 'with token:', token);
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });
    return response.data;
  }
};

export default RecipeService;