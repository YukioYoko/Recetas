import { redirectDocument, useNavigate } from "react-router-dom";
import estrella from "../images/estrella.png";
import tiempo from "../images/tiempo.png";

export function RecipeSearchCard({ recipe, categories, recipePhotos }) {
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
      className="w-full flex items-center justify-between border-b-2 border-custom-naranja-oscuro p-3 hover:cursor-pointer min-h-[100px]"
      onClick={() => {
        navigate(`/recipe/${recipe.id}`);
      }}
    >
      <div className="w-1/4 h-[150px]">
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
