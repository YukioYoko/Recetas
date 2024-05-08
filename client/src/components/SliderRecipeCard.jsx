import { Link } from "react-router-dom";
import tiempo from "../images/tiempo.png";
import estrella from "../images/estrella.png";
import receta from "../images/receta.jpg";

export function SliderRecipeCard() {
  return (
    <div className="bg-custom-beige font-title p-6 rounded-3xl max-w-[400px]">
      <img src={receta} alt="Imagen Receta" className="rounded-xl" />
      <div className="flex flex-row text-custom-naranja-logo items-center my-4 justify-between">
        <label className="text-slate-700 text-3xl" htmlFor="nameReceta">
          RECETAS ITALIANAS
        </label>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-[32px] h-[32px]"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
          />
        </svg>
      </div>

      <div className="flex gap-2 mb-[100px]">
        <Link
          className="font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full"
          to=""
        >
          Quinoa
        </Link>
        <Link
          className="font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full"
          to=""
        >
          Cebolla
        </Link>
        <Link
          className="font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full"
          to=""
        >
          Calabacin
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex text-base text-black items-center">
          <img src={tiempo} alt="" className="w-[24px] h-[24px] mr-2" />
          50 MIN
        </div>
        <div className="flex gap-1">
          <img src={estrella} alt="" className="w-[22px] h-[22px]" />
          <img src={estrella} alt="" className="w-[22px] h-[22px]" />
          <img src={estrella} alt="" className="w-[22px] h-[22px]" />
          <img src={estrella} alt="" className="w-[22px] h-[22px]" />
          <img src={estrella} alt="" className="w-[22px] h-[22px]" />
        </div>
      </div>
    </div>
  );
}
