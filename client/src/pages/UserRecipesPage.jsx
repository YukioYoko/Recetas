import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllRecipes } from "../api/recipes.api";
import { getAllCategories } from "../api/categories.api";
import { getAllPhotos } from "../api/recipePhotos.api";
import { UserRecipeList } from "../components/UserRecipeList";

export function UserRecipesPage() {
  const navigate = useNavigate();
  const [userRecipes, setUserRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recipePhotos, setRecipePhotos] = useState([]);
  const userId = localStorage.getItem("user_id"); // Obtiene el ID del usuario activo desde el almacenamiento local

  useEffect(() => {
    async function fetchUserRecipes() {
      try {
        // Obtener todas las recetas desde la API
        const response = await getAllRecipes();
        const allRecipes = response.data;

        // Filtrar las recetas para obtener solo las del usuario activo
        const userRecipes = allRecipes.filter(
          (recipe) => recipe.user === parseInt(userId)
        );
        setUserRecipes(userRecipes);
      } catch (error) {
        console.error("Error al obtener las recetas del usuario:", error);
        // Manejar el error según sea necesario
      }
    }

    async function loadData() {
      const categoriesRes = await getAllCategories();
      const photosRes = await getAllPhotos();

      const categories = categoriesRes.data;
      const photos = photosRes.data;

      setCategories(categories);
      setRecipePhotos(photos);
    }
    loadData();
    fetchUserRecipes();
  }, [userId]);

  return (
    <div className="bg-custom-beige min-h-screen p-10">
      <h2 className="font-title text-6xl text-center mb-10">Mis Recetas</h2>
      <UserRecipeList
        recipes={userRecipes}
        categories={categories}
        recipePhotos={recipePhotos}
      />
    </div>
  );
}
