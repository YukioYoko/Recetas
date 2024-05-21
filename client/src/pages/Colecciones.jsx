import { NavigationLogged } from "../components/NavigationLogged";
import { Link } from "react-router-dom";
import { CollectionList } from "../components/CollectionList";

export function Colecciones() {
  return (
    <div>
      <NavigationLogged />
      <div className="bg-custom-beige min-h-screen pt-10 px-24 ">
        <div className="mb-12">
          <Link
            className="font-title text-xl uppercase text-custom-beige bg-custom-naranja-oscuro px-8 py-4 rounded-lg"
            to=""
          >
            AGREGAR COLECCION
          </Link>
        </div>
        <div>
          <CollectionList />
        </div>
      </div>
    </div>
  );
}
