import Editar from "../images/editar.png";
import Tiempo from "../images/recetas.png";
import { Link } from "react-router-dom";

export function CardsColecciones() {
  return (
    <div class="bg-custom-beige font-title  h-64 rounded-3xl border-2 border-custom-naranja-oscuro ">
      <div class="h-8 flex items-center justify-end pr-3 pt-2">
        <img src={Editar} alt="Editar Receta" class="max-w-full max-h-full" />
      </div>
      <label class="text-slate-700 text-2xl pl-4 " htmlFor="nameReceta">
        RECETAS ITALIANAS
      </label>
      <div class="flex pl-4 w-9/12 h-6/12 gap-1 ">
        <Link
          className="font-title text-xs uppercase text-custom-beige bg-custom-naranja-oscuro px-4 py-2 rounded-full"
          to=""
        >
          Italiana
        </Link>
        <Link
          className="font-title text-xs uppercase text-custom-beige bg-custom-naranja-oscuro px-4 py-2 rounded-full"
          to=""
        >
          Italiana
        </Link>
        <Link
          className="font-title text-xs uppercase text-custom-beige bg-custom-naranja-oscuro px-4 py-2 rounded-full"
          to=""
        >
          Italiana
        </Link>
        <Link
          className="font-title text-xs uppercase text-custom-beige bg-custom-naranja-oscuro px-4 py-2 rounded-full"
          to=""
        >
          Italiana
        </Link>
      </div>
      <div class="h-8 flex items-end justify-end mt-20 pr-3 pb-2">
        10
        <img
          src={Tiempo}
          alt="Tiempo de comida "
          class="max-w-full max-h-full"
        />
      </div>
    </div>
  );
}
