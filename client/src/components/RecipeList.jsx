import React from "react";
import { RecipeCard } from "./RecipeCard";

export function RecipeList({ recipes, categories, recipePhotos }) {
  // Función para filtrar las categorías específicas para cada receta
  const getRecipeCategories = (recipeId) => {
    return categories.filter(category => category.recipe === recipeId);
  };

  const getRecipePhotos = (recipeId) => {
    return recipePhotos.filter(photo => photo.recipe === recipeId);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {recipes.map((recipe) => (
        <RecipeCard 
          key={recipe.id} 
          recipe={recipe} 
          categories={getRecipeCategories(recipe.id)} 
          recipePhotos={getRecipePhotos(recipe.id)} 
        />
      ))}
    </div>
  );
}
