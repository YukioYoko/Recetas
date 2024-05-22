import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { NavigationLogged } from "../components/NavigationLogged";
import { SliderRecipeCard } from "../components/SliderRecipeCard";
import { getSaves } from "../api/saved-recipes.api";

export function ColeccionesInternas() {
  const { collectionId } = useParams();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await getSaves(collectionId);
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [collectionId]);

  return (

    <div className="bg-custom-beige min-h-screen pt-10 px-24">
      <NavigationLogged />
      <div className="font-title text-7xl py-4">RECETAS ITALIANAS</div>
      <div className="grid grid-cols-3 gap-x-4 gap-y-10">
        {recipes.map((savedRecipe) => (
          <SliderRecipeCard 
            key={savedRecipe.recipe.id} 
            recipe={savedRecipe.recipe} 
            categories={savedRecipe.recipe.categories} 
            recipePhotos={savedRecipe.recipe.photos} 
          />
        ))}
      </div>
    </div>
  );
}
