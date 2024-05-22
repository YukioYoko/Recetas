import { Link } from "react-router-dom";
import { NavigationLogged } from "../components/NavigationLogged";
import { useForm } from "react-hook-form";
import { createRecipe } from "../api/recipes.api";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../api/categories.api";
import { createIngredient } from "../api/ingredients.api";
import { createRecipePhoto } from "../api/recipePhotos.api";

export function CreateRecipePage() {
  
  
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    const userId = localStorage.getItem('user_id');
    console.log(userId);
    const recipeData = {
      title: data.title,
      duration: data.duration,
      description: data.description,
      valoration: 0,
      user: userId,
    };

    const createdRecipe = await createRecipe(recipeData); 

    const ingredientData = {
      recipe: createdRecipe.data.id,
      name: data.ingredients,
    };

    await createIngredient(ingredientData);

    const categoryData = {
      recipe: createdRecipe.data.id,
      name: data.categories,
    };

    await createCategory(categoryData);

    /*
    const imageRecipeFormData = new FormData();

    imageRecipeFormData.append('recipePhoto', data.recipePhoto[0]);
  
    const imageRecipeData = {
        recipe: createdRecipe.data.id,
        photo: imageRecipeFormData,
      };

    await createRecipePhoto(imageRecipeData);

    /*
    // Separar los ingredientes y categorías en arrays
    const ingredientes = ingredientesReceta.split(",");
    const categorias = categoriasReceta.split(",");

    // Crear cada ingrediente y categoría y asociarlos a la receta creada
    for (let ingrediente of ingredientes) {
      await createIngredient({ name: ingrediente, recipe: recipe });
    }

    for (let categoria of categorias) {
      await createCategory({ name: categoria, recipe: recipe });
    }

    await createRecipePhoto(data);
    */

    navigate("/");
  });

  return (
    <div>
      <NavigationLogged />
      <form onSubmit={onSubmit}>
        <div className="flex pt-20 px-10 font-body font-bold text-3xl min-h-screen text-custom-naranja-oscuro bg-custom-beige justify-around">
          <div className="flex flex-col w-7/12 pb-10">
            <h3>Nombre De La Receta</h3>
            <input
              type="text"
              className="w-7/12 text-2xl font-normal border border-custom-naranja-oscuro focus:outline-none rounded-md p-2 mt-3 mb-2"
              {...register("title", { required: true })}
              name="title"
              placeholder="Ingresa el nombre"
            />
            {errors.title && (
              <span className="text-sm">Este Campo es Requerido</span>
            )}
            <h3 className="mt-10">Duracion</h3>
            <div className="flex text-xs gap-3 mt-3 mb-10">
              <div className="flex flex-col">
                MINUTOS
                <input
                  type="number"
                  className="text-xl font-normal w-[60px] border border-custom-naranja-oscuro p-2 rounded-md mb-2"
                  {...register("duration", { required: true })}
                />
                {errors.duration && (
                  <span className="text-sm">Este Campo es Requerido</span>
                )}
              </div>
            </div>
            <h3>Ingredientes</h3>
            <input
              type="text"
              name="ingredientesReceta"
              id="ingredientesReceta"
              className="w-7/12 text-2xl font-normal border border-custom-naranja-oscuro focus:outline-none rounded-md p-2 mt-3 mb-2"
              {...register("ingredients", { required: true })}
            />
            {errors.ingredients && (
              <span className="text-sm">Este Campo es Requerido</span>
            )}
            <div className="flex gap-2 mb-10 mt-2">
              <Link
                className="font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full"
                to=""
              >
                Aceitunas
              </Link>
              <Link
                className="font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full"
                to=""
              >
                cebolla
              </Link>
              <Link
                className="font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full"
                to=""
              >
                jamon
              </Link>
              <Link
                className="font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full"
                to=""
              >
                ajo
              </Link>
            </div>
            <h3>Categorias</h3>
            <input
              type="text"
              name="categoriasReceta"
              id="categoriasReceta"
              className="w-7/12 text-2xl font-normal border border-custom-naranja-oscuro focus:outline-none rounded-md p-2 mt-3 mb-2"
              {...register("categories", { required: true })}
            />
            {errors.categories && (
              <span className="text-sm">Este Campo es Requerido</span>
            )}
            <div className="flex gap-2 mt-2 mb-10">
              <Link
                className="font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full"
                to=""
              >
                italiana
              </Link>
              <Link
                className="font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full"
                to=""
              >
                pasta
              </Link>
              <Link
                className="font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full"
                to=""
              >
                marisco
              </Link>
              <Link
                className="font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full"
                to=""
              >
                china
              </Link>
            </div>
            <h3>Preparacion</h3>
            <textarea
              rows="5"
              className="w-7/12 text-2xl font-normal border border-custom-naranja-oscuro focus:outline-none rounded-md p-2 mb-2"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span className="text-sm">Este Campo es Requerido</span>
            )}
          </div>
          <div className="flex flex-col justify-between gap-5 w-5/12">
            {/* <div>
              <h3 className="mb-10">Fotos</h3>
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="text-lg"
                {...register("recipePhoto", { required: true })}
              />
              
              <Link
                className="font-title text-xl uppercase text-custom-beige bg-custom-naranja-oscuro px-8 py-4 rounded-lg"
                to=""
              >
                Agregar foto
              </Link>
             
            </div> */}

            <div className="flex justify-end">
              <button className="font-title text-xl uppercase text-custom-beige bg-custom-naranja-oscuro px-8 py-4 rounded-lg mb-10">
                Crear Receta
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
