import React, { useState, useEffect } from "react";
import { getAllRecipes } from "../api/recipes.api";
import { getAllCategories } from "../api/categories.api";
import { getAllIngredients } from "../api/ingredients.api";
import { getAllPhotos } from "../api/recipePhotos.api";
import { RecipeList } from "../components/RecipeList";
import { NavigationLogged } from "../components/NavigationLogged";

export function CategoriesPage() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [recipePhotos, setRecipePhotos] = useState([]);
  const [recipeCategoryMap, setRecipeCategoryMap] = useState({});
  const [recipeIngredientMap, setRecipeIngredientMap] = useState({});
  const [selectedCategories, setSelectedCategories] = useState({});
  const [selectedIngredients, setSelectedIngredients] = useState({});

  // Fetch data from API
  useEffect(() => {
    async function loadData() {
      const recipesRes = await getAllRecipes();
      const categoriesRes = await getAllCategories();
      const ingredientsRes = await getAllIngredients();
      const photosRes = await getAllPhotos();
      
      const categories = categoriesRes.data;
      const ingredients = ingredientsRes.data;
      const recipes = recipesRes.data;
      const photos = photosRes.data;

      // Use Set to remove duplicates
      const uniqueCategories = Array.from(
        new Set(categories.map((c) => c.name.toLowerCase()))
      ).map((lowercaseName) =>
        categories.find((c) => c.name.toLowerCase() === lowercaseName)
      );

      const uniqueIngredients = Array.from(
        new Set(ingredients.map((i) => i.name.toLowerCase()))
      ).map((lowercaseName) =>
        ingredients.find((i) => i.name.toLowerCase() === lowercaseName)
      );

      setRecipes(recipes);
      setCategories(uniqueCategories);
      setIngredients(uniqueIngredients);
      setRecipePhotos(photos);

      // Create maps for recipe-category and recipe-ingredient relationships
      const categoryMap = categories.reduce((acc, category) => {
        if (!acc[category.recipe]) acc[category.recipe] = [];
        acc[category.recipe].push(category.id);
        return acc;
      }, {});

      const ingredientMap = ingredients.reduce((acc, ingredient) => {
        if (!acc[ingredient.recipe]) acc[ingredient.recipe] = [];
        acc[ingredient.recipe].push(ingredient.id);
        return acc;
      }, {});

      setRecipeCategoryMap(categoryMap);
      setRecipeIngredientMap(ingredientMap);

      // Initialize selected categories and ingredients states
      setSelectedCategories(
        uniqueCategories.reduce((acc, category) => ({ ...acc, [category.id]: false }), {})
      );
      setSelectedIngredients(
        uniqueIngredients.reduce((acc, ingredient) => ({ ...acc, [ingredient.id]: false }), {})
      );
    }
    loadData();
  }, []);

  // Handle checkbox changes for categories and ingredients
  const handleOnCheckbox = (type, e) => {
    const { value, checked } = e.target;
    if (type === "category") {
      setSelectedCategories({ ...selectedCategories, [value]: checked });
    } else if (type === "ingredient") {
      setSelectedIngredients({ ...selectedIngredients, [value]: checked });
    }
  };

  // Filter recipes based on selected categories and ingredients
  const isAnyCategorySelected = Object.values(selectedCategories).some(Boolean);
  const isAnyIngredientSelected = Object.values(selectedIngredients).some(Boolean);

  const filteredRecipes = recipes.filter(recipe => {
    if (!isAnyCategorySelected && !isAnyIngredientSelected) {
      return true; // Show all recipes if no category or ingredient is selected
    }

    const recipeCategories = recipeCategoryMap[recipe.id] || [];
    const recipeIngredients = recipeIngredientMap[recipe.id] || [];

    const matchCategory = recipeCategories.some(
      categoryId => selectedCategories[categoryId]
    );
    const matchIngredient = recipeIngredients.some(
      ingredientId => selectedIngredients[ingredientId]
    );

    return matchCategory || matchIngredient;
  });

  return (
    <div className="bg-custom-beige min-h-screen">
      <div className="py-10 px-10">
        <div className="flex gap-10">
          <aside className="w-2/12">
            <h3 className="font-title text-bold text-2xl border-b-2 border-black py-2 mb-3">Categorías</h3>
            {categories.map(category => (
              <div key={category.id} className="px-5">
                <input
                  onChange={e => handleOnCheckbox("category", e)}
                  className="accent-custom-naranja-oscuro"
                  type="checkbox"
                  name="categories"
                  value={category.id}
                  id={category.name}
                />
                <label className="font-body capitalize pl-2 font-light text-lg" htmlFor={category.name}>{category.name}</label>
              </div>
            ))}
            <h3 className="font-title text-bold text-2xl border-b-2 border-black py-2 mb-3">Ingredientes</h3>
            {ingredients.map(ingredient => (
              <div key={ingredient.id} className="px-5">
                <input
                  onChange={e => handleOnCheckbox("ingredient", e)}
                  className="accent-custom-naranja-oscuro"
                  type="checkbox"
                  name="ingredients"
                  value={ingredient.id}
                  id={ingredient.name}
                />
                <label className="font-body capitalize pl-2 font-light text-lg" htmlFor={ingredient.name}>{ingredient.name}</label>
              </div>
            ))}
          </aside>
          <div className="w-10/12">
            <RecipeList 
              recipes={filteredRecipes} 
              categories={categories} 
              recipePhotos={recipePhotos} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
