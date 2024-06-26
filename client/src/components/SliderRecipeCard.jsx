import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import tiempo from "../images/tiempo.png";
import estrella from "../images/estrella.png";
import { Modal } from "./PopupGuardarReceta";
import { getSaves } from "../api/saved-recipes.api";

export function SliderRecipeCard({ recipe, categories, recipePhotos, page }) {
  const userId = localStorage.getItem('user_id');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await getSaves();
        const savedRecipes = response.data;
        const isRecipeSaved = savedRecipes.some(savedRecipe => savedRecipe.recipe === recipe.id && savedRecipe.user === parseInt(userId));
        setIsSaved(isRecipeSaved);
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      }
    };

    fetchSavedRecipes();
  }, [recipe.id, userId]);

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < recipe.valoration) {
        stars.push(
          <img key={i} src={estrella} alt="" className="w-[22px] h-[22px]" />
        );
      } else {
        stars.push(
          <img
            key={i}
            src={estrella}
            alt=""
            className="w-[22px] h-[22px]"
            style={{ opacity: 0.3 }}
          />
        );
      }
    }
    return stars;
  };

  const handleSave = () => {
    setIsSaved(true);
    setIsModalOpen(false);
  };

  return (
    <div className="relative group h-[570px]">
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="relative z-10 bg-custom-naranja-oscuro font-title rounded-3xl max-w-[400px] h-[550px] flex flex-col justify-between ">
          <div className="relative z-10 bg-custom-beige font-title p-6 rounded-3xl max-w-[400px] h-[550px] flex flex-col justify-between border-custom-naranja-logo border-2 transform transition-transform duration-300 group-hover:-translate-x-3 group-hover:-translate-y-3">
            <div className="w-full h-[250px]" onClick={() => navigate(`/recipe/${recipe.id}`)}>
              {recipePhotos.length > 0 && (
                <img
                  src={recipePhotos[0].photo}
                  alt="Imagen Receta"
                  className="rounded-xl w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex flex-col flex-grow">
              <div className="flex flex-row text-custom-naranja-logo items-center my-4 justify-between">
                <div onClick={() => navigate(`/recipe/${recipe.id}`)}>
                  <label className="text-slate-700 text-3xl min-h-[3rem] flex items-center" htmlFor="nameReceta">
                    {recipe.title}
                  </label>
                </div>
                <button onClick={() => setIsModalOpen(true)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill={isSaved ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-[32px] h-[32px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex gap-2 mb-[100px] flex-wrap">
                {categories.slice(0, 3).map((category, index) => (
                  <h4
                    key={index}
                    className="font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-2 rounded-full"
                  >
                    {category.name}
                  </h4>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center mt-auto">
              <div className="flex text-base text-black items-center">
                <img src={tiempo} alt="" className="w-[24px] h-[24px] mr-2" />
                <label className="px-1">{recipe.duration}</label>
                MIN
              </div>
              <div className="flex justify-end">{renderStars()}</div>
            </div>
            {isModalOpen && (
              <Modal onClose={() => setIsModalOpen(false)} recipe={recipe.id} onSave={handleSave} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
