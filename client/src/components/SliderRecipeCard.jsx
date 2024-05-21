import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import tiempo from "../images/tiempo.png";
import estrella from "../images/estrella.png";
import receta from "../images/receta.jpg";

export function SliderRecipeCard({ recipe, categories, recipePhotos }) {
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
    <div className="bg-custom-beige font-title p-6 rounded-3xl max-w-[400px] h-full flex flex-col justify-between"
      onClick={() => {
        navigate(`/recipe/${recipe.id}`);
      }}
    >
      <div className="w-auto h-[250px]">
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
          <label className="text-slate-700 text-3xl min-h-[3rem] flex items-center" htmlFor="nameReceta">
            {recipe.title}
          </label>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
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
        </div>

        <div className="flex gap-2 mb-[100px]">
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
    </div>
  );
}
