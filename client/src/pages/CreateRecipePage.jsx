import { Link } from 'react-router-dom'
import receta from '../images/receta.jpg'
import { NavigationLogged } from '../components/NavigationLogged'

export function CreateRecipePage() {
  return (
    <div>

            <NavigationLogged/>
        <div className="flex pt-20 px-10 font-body font-bold text-3xl min-h-screen text-custom-naranja-oscuro bg-custom-beige justify-around">
            <div className="flex flex-col w-7/12">
                <h3>Nombre De La Receta</h3>
                <input type="text" name="nombreReceta" id="nombreReceta" className="w-7/12 text-2xl font-normal border border-custom-naranja-oscuro focus:outline-none rounded-md p-2 mt-3 mb-10"/>
                <h3>Duracion</h3>
                <div className="flex text-xs gap-3 mt-3 mb-10">
                    <div className="flex flex-col items-center">
                        HORAS
                        <input type="number" name="horasReceta" id="horasReceta" className="text-xl font-normal w-[60px] border border-custom-naranja-oscuro p-2 rounded-md" />
                    </div>
                    <div className="flex flex-col items-center">
                        MINUTOS
                        <input type="number" name="minutosReceta" id="minutosReceta" className="text-xl font-normal w-[60px] border border-custom-naranja-oscuro p-2 rounded-md" />
                    </div>
                </div>
                <h3>Ingredientes</h3>
                <input type="text" name="nombreReceta" id="nombreReceta" className="w-7/12 text-2xl font-normal border border-custom-naranja-oscuro focus:outline-none rounded-md p-2 my-3"/>
                <div className='flex gap-2 mb-10'>
                    <Link className='font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full' to="">Aceitunas</Link>
                    <Link className='font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full' to="">cebolla</Link>
                    <Link className='font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full' to="">jamon</Link>
                    <Link className='font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full' to="">ajo</Link>
                </div>
                <h3>Categorias</h3>
                <input type="text" name="nombreReceta" id="nombreReceta" className="w-7/12 text-2xl font-normal border border-custom-naranja-oscuro focus:outline-none rounded-md p-2 my-3"/>
                <div className='flex gap-2 mb-10'>
                    <Link className='font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full' to="">italiana</Link>
                    <Link className='font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full' to="">pasta</Link>
                    <Link className='font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full' to="">marisco</Link>
                    <Link className='font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full' to="">china</Link>
                </div>
                <h3>Preparacion</h3>
                <input type="text" name="nombreReceta" id="nombreReceta" className="w-7/12 h-[200px] text-2xl font-normal border border-custom-naranja-oscuro focus:outline-none rounded-md p-2 mb-10"/>
                
                
            </div>
            <div className="flex flex-col justify-between gap-5 w-5/12">
                
                
                <div>
                    <h3 className='mb-10'>Fotos</h3>
                    <Link className='font-title text-xl uppercase text-custom-beige bg-custom-naranja-oscuro px-8 py-4 rounded-lg' to="">Agregar foto</Link>
                    <img src={receta} alt="" className='mt-10 rounded-xl'/>
                </div>

                <div className='flex justify-end'>
                    <Link className='font-title text-xl uppercase text-custom-beige bg-custom-naranja-oscuro px-8 py-4 rounded-lg mb-10' to="">Crear Receta</Link>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
