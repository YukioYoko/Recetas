import { useEffect, useState } from "react";
import { getAllRecipes } from "../api/recipes.api";
import { getAllCategories } from "../api/categories.api";
import { RecipeCard } from "./RecipeCard";

export function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadData() {
      const recipesRes = await getAllRecipes();
      const categoriesRes = await getAllCategories();
      setRecipes(recipesRes.data);
      setCategories(categoriesRes.data);
    }
    loadData();
  }, []);

  // Función para filtrar las categorías específicas para cada receta
  const getRecipeCategories = (recipe) => {
    return categories.filter(category => category.recipe === recipe);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} categories={getRecipeCategories(recipe.id)} />
      ))}
    </div>
  );
}
