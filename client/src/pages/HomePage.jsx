import { SliderRecipe } from '../components/SliderRecipe'
import { NavigationLogged } from '../components/NavigationLogged'


export function HomePage() {
  return (
    <div>
        <NavigationLogged/>
      <div className="font-title text-[64px] text-custom-beige p-6">
        <h2 className=''>Destacadas</h2>
        <SliderRecipe/>
        <h2>Recetas Mejor Valoradas</h2>
        <SliderRecipe/>
        <h2>Segun Tus Gustos</h2>
        <SliderRecipe/>
        <h2>Recientes</h2>
        <SliderRecipe/>
      </div>
    </div>
  )
}
