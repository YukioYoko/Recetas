import Editar from "../images/editar.png";
import Tiempo from "../images/recetas.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export function CardsColecciones(collection) {
  return (
    <div
      class="bg-custom-beige font-title  h-64 rounded-3xl border-2 border-custom-naranja-oscuro "
      onClick={() => {
        navigate(`/collections/${collection.id}`);
      }}
    >
      <div class="h-8 flex items-center justify-end pr-3 pt-2">
        <img src={Editar} alt="Editar Receta" class="max-w-full max-h-full" />
      </div>
      <label class="text-slate-700 text-2xl pl-4 " htmlFor="nameReceta">
        {collection.name}
      </label>
      
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
