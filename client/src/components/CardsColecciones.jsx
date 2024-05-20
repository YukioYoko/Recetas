import Editar from "../images/editar.png";
import Recetas from "../images/recetas.png";
import { useNavigate } from "react-router-dom";


export function CardsColecciones({collection}) {

  const navigate = useNavigate();

  return (
    <div
      className="bg-custom-beige font-title uppercase pb-6 rounded-3xl border-2 border-custom-naranja-oscuro"
      onClick={() => {
        navigate(`/colecciones/${collection.id}`);
      }}
    >
      <div className="h-8 flex items-center justify-end pr-2 pt-2">
        <img src={Editar} alt="Editar Receta" className="max-w-full max-h-full" />
      </div>
      <label className="text-slate-700 text-2xl pl-4 " htmlFor="nameReceta">
        {collection.name}
      </label>
      
      <div className="h-8 flex items-end justify-end mt-20 pr-3 pb-2">
        10
        <img
          src={Recetas}
          alt="Numero de Recetas"
          className="max-w-full max-h-full"
        />
      </div>
    </div>
  );
}
