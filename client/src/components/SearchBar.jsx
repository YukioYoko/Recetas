import React, { useState, useEffect } from "react";
import { getAllRecipes } from "../api/recipes.api";
import { getAllCategories } from "../api/categories.api";
import { getAllPhotos } from "../api/recipePhotos.api";
import { RecipeSearchCard } from "./RecipeSearchCard";

const SearchBar = () => {
  // Setear los hooks useState
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recipePhotos, setRecipePhotos] = useState([]);
  const [search, setSearch] = useState("");

  // Función para traer los datos de tu API de recetas
  useEffect(() => {
    async function loadData() {
      const recipesRes = await getAllRecipes();
      const categoriesRes = await getAllCategories();
      const recipePhotosRes = await getAllPhotos();
      setRecipes(recipesRes.data);
      setCategories(categoriesRes.data);
      setRecipePhotos(recipePhotosRes.data);
    }
    loadData();
  }, []);

  // Función para filtrar las categorías específicas para cada receta
  const getRecipeCategories = (recipe) => {
    return categories.filter((category) => category.recipe === recipe);
  };

  const getRecipePhotos = (recipe) => {
    return recipePhotos.filter((recipePhoto) => recipePhoto.recipe === recipe);
  };

  // Función de búsqueda
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  // Filtrar recetas según el término de búsqueda
  const filteredRecipes = !search
    ? [] // Si no hay término de búsqueda, mostrar una lista vacía
    : recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(search.toLowerCase())
      );

  // Renderizar la vista
  return (
    <div className="w-full relative">
      <input
        value={search}
        onChange={handleSearch}
        type="text"
        placeholder="Que vamos a comer hoy?"
        className="font-body text-xl bg-inherit w-full focus:outline-none"
      />
      {search && ( // Mostrar resultados solo si hay texto en el campo de búsqueda
        <div className="absolute bg-custom-beige w-full px-5 py-2 block rounded-md">
          <div>
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map((recipe) => (
                <RecipeSearchCard
                  key={recipe.id}
                  recipe={recipe}
                  categories={getRecipeCategories(recipe.id)}
                  recipePhotos={getRecipePhotos(recipe.id)}
                />
              ))
            ) : (
              <div>
                <p>No hay recetas disponibles.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
