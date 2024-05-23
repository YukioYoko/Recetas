import React, { useState, useEffect } from 'react';
import { getRecipe, updateRecipe } from '../api/recipes.api';
import estrella from '../images/estrella.png';

export function Rating({ recipeId, currentRating, currentCount, onRatingChange }) {
  const [rating, setRating] = useState(currentRating);
  const [userRating, setUserRating] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await getRecipe(recipeId);
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };
    
    fetchRecipe();
  }, [recipeId]);

  useEffect(() => {
    setRating(currentRating);
  }, [currentRating]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleRatingSubmit = async () => {
    if (!recipe || !userId) return;

    try {
      const newValorationCount = currentCount + 1;
      const newRating = ((rating * currentCount) + userRating) / newValorationCount;

      const updatedRecipeData = {
        ...recipe,
        valoration: newRating,
        valorationCount: newValorationCount,
        user: userId - 1
      };

      // Actualizar la lista de usuarios que han valorado la receta
      updatedRecipeData.valorationByUser = [...(recipe.valorationByUser || []), userId];

      await updateRecipe(recipeId, updatedRecipeData);

      onRatingChange(newRating, newValorationCount);
      closeModal();
    } catch (error) {
      console.error("Error rating recipe:", error);
    }
  };

  const renderStars = (currentRating, isClickable = false) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      let starClass = 'opacity-50'; // Estrella vacía
      if (i <= currentRating) {
        starClass = 'opacity-100'; // Estrella llena
      } else if (i - currentRating < 1) {
        starClass = 'half'; // Media estrella
      }
      stars.push(
        <div 
          key={i} 
          className={`relative w-[32px] h-[32px] cursor-pointer`} 
          onClick={() => isClickable && setUserRating(i)}
        >
          <img
            src={estrella}
            alt="star"
            className={`${starClass} absolute top-0 left-0 w-full h-full`}
          />
          {starClass === 'half' && (
            <img
              src={estrella}
              alt="star"
              className="absolute top-0 left-0 w-full h-full opacity-100"
            />
          )}
        </div>
      );
    }
    return stars;
  };

  return (
    <div>
      <div className="flex items-center space-x-2 ">
        {renderStars(rating)}
        <button onClick={openModal} className="text-custom-beige bg-custom-naranja-oscuro px-4 py-2 rounded text-sm">Valorar</button>
      </div>
      <div>
        <p className='text-sm mt-2'>{currentCount} Valoraciones</p>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full relative">
            <button onClick={closeModal} className="absolute top-2 right-2 text-red-500">X</button>
            <h2 className="text-2xl mb-4">Valorar Receta</h2>
            <div className="flex space-x-2">
              {renderStars(userRating, true)}
            </div>
            <button onClick={handleRatingSubmit} className="mt-5 text-custom-beige bg-custom-naranja-oscuro px-4 py-2 rounded text-sm">Enviar Valoración</button>
          </div>
        </div>
      )}
    </div>
  );
}
