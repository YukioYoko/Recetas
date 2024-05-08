import { CardsColeccionesInternas } from "../components/CardsColeccionesInternas"
import { NavigationLogged } from '../components/NavigationLogged'

export function ColeccionesInternas() {
  return (
    <div class="bg-custom-beige min-h-screen pt-10 px-24">
      <NavigationLogged/>
        <div class="font-title text-7xl py-4 ">
            RECETAS ITALIANAS
        </div>
        <div class="grid grid-cols-3 gap-x-4 gap-y-10">
          <CardsColeccionesInternas/>
        </div>
    </div>
  )
}
