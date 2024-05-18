import { redirectDocument, useNavigate } from "react-router-dom";
import estrella from "../images/estrella.png";
import tiempo from "../images/tiempo.png";

export function RecipeCard({ recipe, categories, recipePhotos }) {
  const navigate = useNavigate();

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

  return (
    <div
      className="w-full flex items-center justify-between rounded-2xl border-2 border-custom-naranja-oscuro p-3 hover:cursor-pointer min-h-[200px]"
      onClick={() => {
        navigate(`/recipe/${recipe.id}`);
      }}
    >
      <div className="w-1/4 h-[250px]">
        {recipePhotos.length > 0 && (
          <img
            src={recipePhotos[0].photo}
            alt="Imagen Receta"
            className="rounded-xl w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex flex-col w-2/4 items-start my-4 gap-3">
        <div className="flex items-center gap-3">
          <label className="font-title uppercase text-2xl">{recipe.title}</label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-[24px] h-[24px] text-custom-naranja-logo"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>
        </div>
        <div className="flex gap-2 col-span-2">
          {categories.map((category, index) => (
            <h4
              key={index}
              className="font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-2 rounded-full"
            >
              {category.name}
            </h4>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex justify-end">{renderStars()}</div>

        <div className="flex text-base text-black items-center font-title text-sm justify-end">
          <img src={tiempo} alt="" className="w-[24px] h-[24px] mr-1" />
          <label className="px-1">{recipe.duration}</label>
          MIN
        </div>
      </div>
    </div>
  );
}
