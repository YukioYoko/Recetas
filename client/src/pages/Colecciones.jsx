import { NavigationLogged } from "../components/NavigationLogged";
import { Link } from "react-router-dom";
import { useState } from "react";
import { CollectionList } from "../components/CollectionList";
import { ModalCollection } from "../components/PopupCrearColeccion";

export function Colecciones() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="bg-custom-beige min-h-screen pt-10 px-24 ">
        <div className="mb-12">
          <button
            className="font-title text-xl uppercase text-custom-beige bg-custom-naranja-oscuro px-8 py-4 rounded-lg"
            onClick={() => setIsModalOpen(true)}
          > 
            AGREGAR COLECCIÓN
          </button>
        </div>
        <div>
          <CollectionList />
        </div>
      </div>
      {isModalOpen && (
        <ModalCollection onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
