import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { SliderRecipeCard } from "../components/SliderRecipeCard";
import { getSaves } from "../api/saved-recipes.api";
import { getCollection } from '../api/collections.api';
import { getAllCategories } from '../api/categories.api';
import { getAllPhotos } from '../api/recipePhotos.api';
import { getRecipe } from "../api/recipes.api";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function ColeccionesInternas() {
  const { collectionId } = useParams();
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recipePhotos, setRecipePhotos] = useState([]);
  const [collection, setCollection] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const savesRes = await getSaves(collectionId);
        const categoriesRes = await getAllCategories();
        const recipePhotosRes = await getAllPhotos();
        const collectionRes = await getCollection(collectionId);

        // Filtra las recetas que pertenecen a la colección especificada
        const filteredSavedRecipes = savesRes.data.filter((savedRecipe) => savedRecipe.collection === parseInt(collectionId));

        const savedRecipeIds = filteredSavedRecipes.map((savedRecipe) => savedRecipe.recipe);

        const recipePromises = savedRecipeIds.map((id) => getRecipe(id));
        const recipeDetails = await Promise.all(recipePromises);

        setSavedRecipes(filteredSavedRecipes);
        setRecipes(recipeDetails.map(res => res.data));
        setCategories(categoriesRes.data);
        setRecipePhotos(recipePhotosRes.data);
        setCollection(collectionRes.data);

      } catch (error) {
        console.error("Error loading data:", error);
      }
    }

    loadData();
  }, [collectionId]);

  const getRecipeCategories = (recipeId) => {
    return categories.filter((category) => category.recipe === recipeId);
  };

  const getRecipePhotos = (recipeId) => {
    return recipePhotos.filter((recipePhoto) => recipePhoto.recipe === recipeId);
  };

  if (!collection) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-custom-beige min-h-screen pt-10 px-24">
      <div className="font-title text-7xl py-4">{collection.name}</div>
      <div className="grid grid-cols-4 gap-x-4 gap-y-10">
        {savedRecipes.map((savedRecipe) => (
          <div key={savedRecipe.id} className="px-[7.5px]">
            <SliderRecipeCard 
              recipe={recipes.find(recipe => recipe.id === savedRecipe.recipe)} 
              categories={getRecipeCategories(savedRecipe.recipe)} 
              recipePhotos={getRecipePhotos(savedRecipe.recipe)} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}
