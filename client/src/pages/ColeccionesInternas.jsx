import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { NavigationLogged } from "../components/NavigationLogged";
import { SliderRecipeCard } from "../components/SliderRecipeCard";
import { getSaves } from "../api/saved-recipes.api";
import { getCollection } from '../api/collections.api';

export function ColeccionesInternas() {
  const { collectionId } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [collectionName, setCollectionName] = useState('');
  const [loading, setLoading] = useState(true); // Estado para manejar el loading
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!collectionId) {
        setError(new Error("Collection ID is undefined"));
        setLoading(false);
        return;
      }

      console.log("Fetching recipes for collectionId:", collectionId); // Log de depuración

      try {
        setLoading(true); // Comienza la carga
        const response = await getSaves(collectionId);
        const savedRecipes = response.data;

        console.log("Fetched saved recipes:", savedRecipes); // Log de depuración

        // Mapear las recetas desde las tuplas de SavedRecipe
        const recipes = savedRecipes.map(savedRecipe => savedRecipe.recipe);

        setRecipes(recipes);

        const responseName = await getCollection(collectionId);
        setCollectionName(responseName.data.name);

        console.log("Fetched collection name:", responseName.data.name); // Log de depuración
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setError(error);
      } finally {
        setLoading(false); // Termina la carga
      }
    };

    fetchRecipes();
  }, [collectionId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching recipes: {error.message}</p>;

  return (
    <div className="bg-custom-beige min-h-screen pt-10 px-24">
      <div className="font-title text-7xl py-4">{collectionName}</div>
      <div className="grid grid-cols-3 gap-x-4 gap-y-10">
        {recipes.map((recipe) => (
          <SliderRecipeCard 
            key={recipe.id} 
            recipe={recipe} 
            categories={recipe.categories || []} 
            recipePhotos={recipe.photos || []} 
          />
        ))}
      </div>
    </div>
  );
}
