import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeService from '../services/RecipeService';
import './CreateRecipePage.css';

const CreateRecipePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    steps: '',
    cook_time: '',
    difficulty: 'Easy',
    budget_rating: 'Low',
    image_url: '',
    ingredients: [{ name: '', quantity: '', unit: '', notes: '' }]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const ingredients = [...formData.ingredients];
    ingredients[index] = { ...ingredients[index], [name]: value };
    setFormData({ ...formData, ingredients });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: '', quantity: '', unit: '', notes: '' }]
    });
  };

  const removeIngredient = (index) => {
    const ingredients = [...formData.ingredients];
    ingredients.splice(index, 1);
    setFormData({ ...formData, ingredients });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await RecipeService.createRecipe(formData);
      navigate('/my-recipes');
    } catch (err) {
      setError('Failed to create recipe: ' + err.message);
      setLoading(false);
    }
  };

  return (
    <div className="create-recipe-page">
      <h1>Create New Recipe</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Recipe Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>
        
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Cooking Time (minutes)</label>
            <input
              type="number"
              name="cook_time"
              value={formData.cook_time}
              onChange={handleChange}
              min="1"
            />
          </div>
          
          <div className="form-group">
            <label>Difficulty</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Budget Rating</label>
            <select
              name="budget_rating"
              value={formData.budget_rating}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        
        <div className="ingredients-section">
          <h2>Ingredients</h2>
          
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-row">
              <div className="form-group">
                <label>Ingredient *</label>
                <input
                  type="text"
                  name="name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, e)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Quantity *</label>
                <input
                  type="text"
                  name="quantity"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, e)}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Unit</label>
                <input
                  type="text"
                  name="unit"
                  value={ingredient.unit}
                  onChange={(e) => handleIngredientChange(index, e)}
                />
              </div>
              
              <div className="form-group">
                <label>Notes</label>
                <input
                  type="text"
                  name="notes"
                  value={ingredient.notes}
                  onChange={(e) => handleIngredientChange(index, e)}
                />
              </div>
              
              <button
                type="button"
                className="remove-ingredient"
                onClick={() => removeIngredient(index)}
              >
                ×
              </button>
            </div>
          ))}
          
          <button
            type="button"
            className="add-ingredient"
            onClick={addIngredient}
          >
            + Add Ingredient
          </button>
        </div>
        
        <div className="form-group">
          <label>Steps *</label>
          <textarea
            name="steps"
            value={formData.steps}
            onChange={handleChange}
            rows="8"
            required
          />
          <small>Enter each step on a new line</small>
        </div>
        
        <button
          type="submit"
          className="submit-btn"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Recipe'}
        </button>
      </form>
    </div>
  );
};

export default CreateRecipePage;