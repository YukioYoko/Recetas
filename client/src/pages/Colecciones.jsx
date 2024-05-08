import { CardsColecciones } from "../components/CardsColecciones"
import { NavigationLogged } from '../components/NavigationLogged'
import { Link } from 'react-router-dom'

export function Colecciones() {
  return (
    <div>
        <NavigationLogged/>
      <div class="bg-custom-beige min-h-screen pt-10 px-24 ">
          <div class="mb-12">
              <Link className='font-title text-xl uppercase text-custom-beige bg-custom-naranja-oscuro px-8 py-4 rounded-lg' to="">AGREGAR COLECCION</Link>
          </div>
          <div class = "grid grid-cols-3 gap-x-4 gap-y-10">
              <CardsColecciones/>
              <CardsColecciones/>
              <CardsColecciones/>
              <CardsColecciones/>
              <CardsColecciones/>
              <CardsColecciones/>
              <CardsColecciones/>
              <CardsColecciones/>
              <CardsColecciones/>         
          </div>
          
      </div>

    </div>
  );
}
