import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
    </div>
  );
};

export default RecipePage;