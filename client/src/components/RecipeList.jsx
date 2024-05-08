import { useEffect, useState } from "react";
import { getAllRecipes } from "../api/recipes.api";
import { RecipeCard } from "./RecipeCard";

export function RecipeList() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function loadRecipes() {
      const res = await getAllRecipes();
      setRecipes(res.data);
    }
    loadRecipes();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}
