import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { createRecipe,deleteRecipe, updateRecipe, getRecipe } from '../api/recipes.api';
import {useNavigate, useParams} from 'react-router-dom'

export function RecipeFormPage() {
  const { 
    register, 
    handleSubmit, 
    formState: {errors},
    setValue,
   } = useForm();

   const navigate = useNavigate();
   const params = useParams();

  const onSubmit = handleSubmit(async data => {
    if (params.id){
      await updateRecipe(params.id, data)
    }else{
      await createRecipe(data);
    }
    navigate("/recipes")
  })

  useEffect(() => {
    async function loadRecipe() {
      if (params.id){
       const {data} = await getRecipe(params.id)
        setValue('title', data.title)
        setValue('description', data.description)
      }
    }
    loadRecipe();
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          {...register("title", { required: true })}
        />
        {errors.title && <span>Este Campo es Requerido</span>}
        <textarea
          rows="3"
          placeholder="Description"
          {...register("description", { required: true })}
        ></textarea>
        {errors.description && <span>Este Campo es Requerido</span>}
        <button>Save</button>
      </form>

      {params.id && <button onClick={async () => {
        const accept = window.confirm('Estas Seguro')
        if (accept){
          await deleteRecipe(params.id);
          navigate('/recipes')
        }
      }}>Delete</button>}
    </div>
  )
}
