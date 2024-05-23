import { useEffect, useState } from "react";
import { getAllRecipes } from "../api/recipes.api";
import { getAllCategories } from "../api/categories.api";
import { getAllPhotos } from "../api/recipePhotos.api";
import { SliderRecipeCard } from "./SliderRecipeCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function SliderRecipe({ filter }) {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [recipePhotos, setRecipePhotos] = useState([]);

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

  const getRecipeCategories = (recipeId) => {
    return categories.filter((category) => category.recipe === recipeId);
  };

  const getRecipePhotos = (recipeId) => {
    return recipePhotos.filter((recipePhoto) => recipePhoto.recipe === recipeId);
  };

  const filterRecipes = (recipes, filter) => {
    switch (filter) {
      case "newest":
        return recipes.sort((a, b) => b.id - a.id).slice(0, 12);
      case "best":
        return recipes
          .sort((a, b) => b.valoration - a.valoration)
          .slice(0, 12);
      case "all":
      default:
        return recipes.slice(0, 12); // Ensure only the first 12 are shown
    }
  };

  const filteredRecipes = filterRecipes(recipes, filter);

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    centerPadding: "0px",
  };

  return (
    <div className="max-w-[1400px] mx-auto "> {/* Añadido overflow-visible */}
      <Slider {...settings} >
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="px-[7.5px]">
            <SliderRecipeCard
              recipe={recipe}
              categories={getRecipeCategories(recipe.id)}
              recipePhotos={getRecipePhotos(recipe.id)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
