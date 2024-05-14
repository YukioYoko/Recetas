import { Link } from 'react-router-dom'
import receta from '../images/receta.jpg'
import { NavigationLogged } from '../components/NavigationLogged'
import { useForm } from 'react-hook-form'
import { createRecipe } from '../api/recipes.api'
import { useNavigate } from "react-router-dom"

export function CreateRecipePage() {
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    const onSubmit = handleSubmit(async data => {
        const res = await createRecipe(data)
        navigate("/")
    })

  return (
    <div>
        <NavigationLogged/>
        <form onSubmit={onSubmit}>

            <div className="flex pt-20 px-10 font-body font-bold text-3xl min-h-screen text-custom-naranja-oscuro bg-custom-beige justify-around">
                <div className="flex flex-col w-7/12">
                    <h3>Nombre De La Receta</h3>
                    <input type="text" className="w-7/12 text-2xl font-normal border border-custom-naranja-oscuro focus:outline-none rounded-md p-2 mt-3 mb-10"
                        {...register("title", {required: true})}
                    />
                    <h3>Duracion</h3>
                    <div className="flex text-xs gap-3 mt-3 mb-10">
                        {/* <div className="flex flex-col items-center">
                            HORAS
                            <input type="number" name="horasReceta" id="horasReceta" className="text-xl font-normal w-[60px] border border-custom-naranja-oscuro p-2 rounded-md" 
                                {...register("horasReceta", {required: true})}
                            />
                        </div> */}
                        <div className="flex flex-col items-center">
                            MINUTOS
                            <input type="number" className="text-xl font-normal w-[60px] border border-custom-naranja-oscuro p-2 rounded-md" 
                                {...register("duration", {required: true})}
                            />
                        </div>
                    </div>
                    <h3>Ingredientes</h3>
                    <input type="text" name="ingredientesReceta" id="ingredientesReceta" className="w-7/12 text-2xl font-normal border border-custom-naranja-oscuro focus:outline-none rounded-md p-2 my-3"
                        /* {...register("ingredientesReceta", {required: true})} */
                    />
                    <div className='flex gap-2 mb-10'>
                        <Link className='font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full' to="">Aceitunas</Link>
                        <Link className='font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full' to="">cebolla</Link>
                        <Link className='font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full' to="">jamon</Link>
                        <Link className='font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full' to="">ajo</Link>
                    </div>
                    <h3>Categorias</h3>
                    <input type="text" name="categoriasReceta" id="categoriasReceta" className="w-7/12 text-2xl font-normal border border-custom-naranja-oscuro focus:outline-none rounded-md p-2 my-3"
                        /* {...register("categoriasReceta", {required: true})} */
                    />
                    <div className='flex gap-2 mb-10'>
                        <Link className='font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full' to="">italiana</Link>
                        <Link className='font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full' to="">pasta</Link>
                        <Link className='font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full' to="">marisco</Link>
                        <Link className='font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full' to="">china</Link>
                    </div>
                    <h3>Preparacion</h3>
                    <input type="text"  className="w-7/12 h-[200px] text-2xl font-normal border border-custom-naranja-oscuro focus:outline-none rounded-md p-2 mb-10"
                        {...register("description", {required: true})}
                    />
                    
                    
                </div>
                <div className="flex flex-col justify-between gap-5 w-5/12">
                    
                    
                    <div>
                        <h3 className='mb-10'>Fotos</h3>
                        <Link className='font-title text-xl uppercase text-custom-beige bg-custom-naranja-oscuro px-8 py-4 rounded-lg' to="">Agregar foto</Link>
                        <img src={receta} alt="" className='mt-10 rounded-xl'/>
                    </div>

                    <div className='flex justify-end'>
                        <button className='font-title text-xl uppercase text-custom-beige bg-custom-naranja-oscuro px-8 py-4 rounded-lg mb-10'>Crear Receta</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
  );
}
