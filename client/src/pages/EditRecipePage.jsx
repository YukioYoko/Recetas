import { Link } from "react-router-dom";
import { NavigationLogged } from "../components/NavigationLogged";
import { useForm } from "react-hook-form";
import { getRecipe, updateRecipe } from "../api/recipes.api";
import { useNavigate, useParams } from "react-router-dom";
import { createCategory, getAllCategories, deleteCategory } from "../api/categories.api";
import { createIngredient, getAllIngredients, deleteIngredient } from "../api/ingredients.api";
import { createRecipePhoto, getAllPhotos, deleteRecipePhoto } from "../api/recipePhotos.api";
import { useState, useEffect } from "react";

export function EditRecipePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const [recipe, setRecipe] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [allIngredients, setAllIngredients] = useState([]);
  const [allRecipePhotos, setAllRecipePhotos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const [originalCategories, setOriginalCategories] = useState([]);
  const [originalIngredients, setOriginalIngredients] = useState([]);
  const [originalPhoto, setOriginalPhoto] = useState(null);

  useEffect(() => {
    async function loadData() {
      const [categoriesRes, ingredientsRes, photosRes] = await Promise.all([
        getAllCategories(),
        getAllIngredients(),
        getAllPhotos(),
      ]);
      setAllCategories(categoriesRes.data);
      setAllIngredients(ingredientsRes.data);
      setAllRecipePhotos(photosRes.data);
    }
    loadData();
  }, []);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const response = await getRecipe(id);
        const recipeData = response.data;
        setRecipe(recipeData);

        // Filtrar y establecer categorías e ingredientes para esta receta
        const recipeCategories = allCategories.filter((category) => category.recipe === recipeData.id);
        const recipeIngredients = allIngredients.filter((ingredient) => ingredient.recipe === recipeData.id);
        const recipePhoto = allRecipePhotos.find((photo) => photo.recipe === recipeData.id);

        setCategories(recipeCategories);
        setOriginalCategories(recipeCategories);
        setIngredients(recipeIngredients);
        setOriginalIngredients(recipeIngredients);
        setOriginalPhoto(recipePhoto);

        // Set the initial values for form fields
        setValue("title", recipeData.title);
        setValue("duration", recipeData.duration);
        setValue("description", recipeData.description);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        // Handle error as needed
      }
    }
    if (id) {
      fetchRecipe();
    }
  }, [id, setValue, allCategories, allIngredients, allRecipePhotos]);

  const handleAddCategory = () => {
    const category = document.getElementById("categoriasReceta").value;
    if (category && !categories.some((c) => c.name === category)) {
      setCategories([...categories, { name: category }]);
      document.getElementById("categoriasReceta").value = "";
    }
  };

  const handleAddIngredient = () => {
    const ingredient = document.getElementById("ingredientesReceta").value;
    if (ingredient && !ingredients.some((i) => i.name === ingredient)) {
      setIngredients([...ingredients, { name: ingredient }]);
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
      user: userId,
    };

    const updatedRecipe = await updateRecipe(id, recipeData);

    // Agregar nuevos ingredientes
    for (const ingredient of ingredients) {
      const existingIngredient = allIngredients.find(
        (i) => i.recipe === updatedRecipe.data.id && i.name === ingredient.name
      );
      if (!existingIngredient) {
        const ingredientData = {
          recipe: updatedRecipe.data.id,
          name: ingredient.name,
        };
        await createIngredient(ingredientData);
      }
    }

    // Eliminar ingredientes que ya no están en la lista
    for (const originalIngredient of originalIngredients) {
      if (!ingredients.some((i) => i.name === originalIngredient.name)) {
        await deleteIngredient(originalIngredient.id);
      }
    }

    // Agregar nuevas categorías
    for (const category of categories) {
      const existingCategory = allCategories.find(
        (c) => c.recipe === updatedRecipe.data.id && c.name === category.name
      );
      if (!existingCategory) {
        const categoryData = {
          recipe: updatedRecipe.data.id,
          name: category.name,
        };
        await createCategory(categoryData);
      }
    }

    // Eliminar categorías que ya no están en la lista
    for (const originalCategory of originalCategories) {
      if (!categories.some((c) => c.name === originalCategory.name)) {
        await deleteCategory(originalCategory.id);
      }
    }

    // Manejar la actualización de la imagen
    if (data.recipePhoto.length > 0) {
      if (originalPhoto) {
        await deleteRecipePhoto(originalPhoto.id); // Eliminar la foto anterior si existe
      }
      const recipePhotoData = {
        recipe: updatedRecipe.data.id,
        photo: data.recipePhoto[0],
      };
      await createRecipePhoto(recipePhotoData);
    }

    navigate("/user-recipes");
  });

  if (!recipe) {
    return <div>Loading...</div>;
  }

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
                  {ingredient.name}
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
                  {category.name}
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
              <h3 className="mb-4">Foto de receta</h3>
              <input
                type="file"
                className="w-full text-2xl font-normal border border-custom-naranja-oscuro focus:outline-none rounded-md p-2 mb-2"
                {...register("recipePhoto")}
                name="recipePhoto"
                accept="image/*"
              />
              {errors.recipePhoto && (
                <span className="text-sm">Este Campo es Requerido</span>
              )}
            </div>
            <div className="w-full flex justify-end">
              <button className="font-title text-xl uppercase text-custom-beige bg-custom-naranja-oscuro px-8 py-4 rounded-lg mb-10">
                actualizar Receta
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
