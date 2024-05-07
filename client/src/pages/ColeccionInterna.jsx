import { CardsColeccionInterna } from "../components/CardsColeccionInterna"

export function ColeccionInterna() {
  return (
    <div class="bg-custom-beige min-h-screen pt-10 px-24">
        <div class="font-title text-7xl py-4 ">
            RECETAS ITALIANAS
        </div>
        <div class="grid grid-cols-3 gap-x-4 gap-y-10">
          <CardsColeccionInterna/>
        </div>
    </div>
  )
}
