import Editar from "../images/editar.png";
import Recetas from "../images/recetas.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ModalEditCollection } from "./PopupEditarColeccion";
import { deleteCollection } from "../api/collections.api";
import eliminar from "../images/eliminar.png";

export function CardsColecciones({ collection }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const onDelete = async (collection) => {
    try {
      await deleteCollection(collection.id);
      window.location.reload(); // Recargar la página después de eliminar la colección
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  };

  return (
    <div
      className="bg-custom-beige font-title uppercase pb-6 rounded-3xl border-2 border-custom-naranja-oscuro text-left"
    >
      <div className="h-8 flex items-center justify-end pr-2 pt-2 gap-3">
        <button className="h-[24px]" onClick={(e) => { e.stopPropagation(); setIsModalOpen(true) }}>
          <img src={Editar} alt="Editar Receta" className="max-w-full max-h-full" />
        </button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(collection) }} className="h-[24px]">
          <img src={eliminar} alt="Boton de basurero" className="max-w-full max-h-full"/>
         
        </button>
      </div>
      <div className="text-left pl-[5px]">
        <label className="text-slate-700 text-full pl-4" htmlFor="nameReceta"
          onClick={() => {
            navigate(`/coleccionesinternas/${collection.id}`);
          }}
        >
          {collection.name}
        </label>
      </div>
    
      {isModalOpen && (
        <ModalEditCollection onClose={() => setIsModalOpen(false)} id={collection.id} name={collection.name} />
      )}
    </div>
  );
}
