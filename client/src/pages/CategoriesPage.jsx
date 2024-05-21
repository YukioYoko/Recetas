import React, { useState, useEffect } from 'react';
import { NavigationLogged } from '../components/NavigationLogged';
import { RecipeList } from '../components/RecipeList';
import { ButtonCategoryList } from '../components/ButtonCategoryList';
import { ButtonIngredientList } from '../components/ButtonIngredientList';
import { getAllCategories } from '../api/categories.api';
import { getAllIngredients } from '../api/ingredients.api';
import { getAllRecipes } from '../api/recipes.api';  // Supongamos que tienes una función para obtener todas las recetas

export function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);  // Almacena todas las recetas
  const [recipes, setRecipes] = useState([]);  // Almacena recetas filtradas
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesData, ingredientsData, recipesData] = await Promise.all([
          getAllCategories(),
          getAllIngredients(),
          getAllRecipes()
        ]);

        setCategories(Array.isArray(categoriesData) ? categoriesData : []);
        setIngredients(Array.isArray(ingredientsData) ? ingredientsData : []);
        setAllRecipes(Array.isArray(recipesData) ? recipesData : []);
        setRecipes(Array.isArray(recipesData) ? recipesData : []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    function filterRecipes() {
      let filteredRecipes = allRecipes;
  
      if (selectedCategories.length > 0) {
        // Filtrar por categorías (si se seleccionaron)
        filteredRecipes = filteredRecipes.filter(recipe =>
          selectedCategories.some(categoryId =>
            recipe.title.toLowerCase().includes(categories[categoryId].toLowerCase())
          )
        );
      }
  
      if (selectedIngredients.length > 0) {
        // Filtrar por ingredientes (si se seleccionaron)
        filteredRecipes = filteredRecipes.filter(recipe =>
          selectedIngredients.some(ingredientId =>
            recipe.description.toLowerCase().includes(ingredients[ingredientId].toLowerCase())
          )
        );
      }
  
      setRecipes(filteredRecipes);
    }
  
    filterRecipes();
  }, [selectedCategories, selectedIngredients, allRecipes, categories, ingredients]);
  

  const handleCategoryClick = (category) => {
    setSelectedCategories(prevSelected =>
      prevSelected.includes(category.id)
        ? prevSelected.filter(c => c !== category.id)
        : [...prevSelected, category.id]
    );
  };

  const handleIngredientClick = (ingredient) => {
    setSelectedIngredients(prevSelected =>
      prevSelected.includes(ingredient.id)
        ? prevSelected.filter(i => i !== ingredient.id)
        : [...prevSelected, ingredient.id]
    );
  };

  return (
    <div className="bg-custom-beige min-h-screen">
      <NavigationLogged />
      <div className="py-10 px-10">
        <div className="flex">
          <aside className="w-1/4">
            <ButtonCategoryList categories={categories} onCategoryClick={handleCategoryClick} selectedCategories={selectedCategories} />
            <ButtonIngredientList ingredients={ingredients} onIngredientClick={handleIngredientClick} selectedIngredients={selectedIngredients} />
          </aside>
          <div className="w-3/4">
            <RecipeList recipes={recipes} />
          </div>
        </div>
      </div>
    </div>
  );
}
