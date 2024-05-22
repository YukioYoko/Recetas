import { Link } from "react-router-dom";
import { NavigationLogged } from "../components/NavigationLogged";
import { useForm } from "react-hook-form";
import { createRecipe } from "../api/recipes.api";
import { useNavigate } from "react-router-dom";
import { createCategory } from "../api/categories.api";
import { createIngredient } from "../api/ingredients.api";
import { createRecipePhoto } from "../api/recipePhotos.api";
import { useState } from "react";

export function CreateRecipePage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const handleAddCategory = () => {
    const category = document.getElementById("categoriasReceta").value;
    if (category) {
      setCategories([...categories, category]);
      document.getElementById("categoriasReceta").value = "";
    }
  };

  const handleAddIngredient = () => {
    const ingredient = document.getElementById("ingredientesReceta").value;
    if (ingredient) {
      setIngredients([...ingredients, ingredient]);
      document.getElementById("ingredientesReceta").value = "";
    }
  };

  const handleRemoveCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const onSubmit = handleSubmit(async (data) => {
    const userId = localStorage.getItem("user_id");

    const recipeData = {
      title: data.title,
      duration: data.duration,
      description: data.description,
      valoration: 0,
      user: userId - 1,
    };

    const createdRecipe = await createRecipe(recipeData);

    for (const ingredient of ingredients) {
      const ingredientData = {
        recipe: createdRecipe.data.id,
        name: ingredient,
      };
      await createIngredient(ingredientData);
    }

    for (const category of categories) {
      const categoryData = {
        recipe: createdRecipe.data.id,
        name: category,
      };
      await createCategory(categoryData);
    }

    // Manejar la carga de imagen
    if (data.recipePhoto.length > 0) {
      const recipePhotoData = {
        recipe: createdRecipe.data.id,
        photo: data.recipePhoto[0],
      };
      await createRecipePhoto(recipePhotoData);
    }

    navigate("/");
  });

  return (
    <div>
      <form onSubmit={onSubmit} encType="multipart/form-data">
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
            <div className="flex items-center">
              <input
                type="text"
                name="ingredientesReceta"
                id="ingredientesReceta"
                className="w-7/12 text-2xl font-normal border border-custom-naranja-oscuro focus:outline-none rounded-md p-2 mt-3 mb-2"
                {...register("ingredients")}
              />
              <button
                type="button"
                className="ml-4 text-custom-beige bg-custom-naranja-oscuro px-4 py-2 rounded text-lg"
                onClick={handleAddIngredient}
              >
                Añadir
              </button>
            </div>
            {errors.ingredients && (
              <span className="text-sm">Este Campo es Requerido</span>
            )}
            <div className="flex flex-wrap gap-2 mb-10 mt-2">
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro pl-6 py-3 rounded-full"
                >
                  {ingredient}
                  <button
                    type="button"
                    className="ml-6 mr-4 text-[20px] text-custom-beige"
                    onClick={() => handleRemoveIngredient(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <h3>Categorias</h3>
            <div className="flex items-center">
              <input
                type="text"
                name="categoriasReceta"
                id="categoriasReceta"
                className="w-7/12 text-2xl font-normal border border-custom-naranja-oscuro focus:outline-none rounded-md p-2 mt-3 mb-2"
                {...register("categories")}
              />
              <button
                type="button"
                className="ml-4 text-custom-beige bg-custom-naranja-oscuro px-4 py-2 rounded text-lg"
                onClick={handleAddCategory}
              >
                Añadir
              </button>
            </div>
            {errors.categories && (
              <span className="text-sm">Este Campo es Requerido</span>
            )}
            <div className="flex flex-wrap gap-2 mt-2 mb-10">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro pl-6 py-3 rounded-full"
                >
                  {category}
                  <button
                    type="button"
                    className="ml-6 mr-4 text-[20px] text-custom-beige"
                    onClick={() => handleRemoveCategory(index)}
                  >
                    &times;
                  </button>
                </div>
              ))}
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
            <div>
              <h3 className="mb-10">Fotos</h3>
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="text-lg"
                {...register("recipePhoto", { required: true })}
              />
              {errors.recipePhoto && (
                <span className="text-sm">Este Campo es Requerido</span>
              )}
            </div>
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
