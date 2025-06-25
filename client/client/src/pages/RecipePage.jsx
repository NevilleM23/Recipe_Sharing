import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const RecipePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

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