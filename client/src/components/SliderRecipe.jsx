import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllRecipes } from "../api/recipes.api";
import { getAllCategories } from "../api/categories.api";
import { getAllPhotos } from "../api/recipePhotos.api";
import { SliderRecipeCard } from "./SliderRecipeCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function SliderRecipe() {
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

  const getRecipeCategories = (recipe) => {
    return categories.filter((category) => category.recipe === recipe);
  };

  const getRecipePhotos = (recipe) => {
    return recipePhotos.filter((recipePhoto) => recipePhoto.recipe === recipe);
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    centerMode: true,
    centerPadding: "0px",
  };

  return (
    <div className="max-w-[1400px] mx-auto">
      <Slider {...settings}>
        {recipes.map((recipe) => (
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
