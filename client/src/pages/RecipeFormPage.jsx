import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  createRecipe,
  deleteRecipe,
  updateRecipe,
  getRecipe,
} from "../api/recipes.api";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { NavigationLogged } from "../components/NavigationLogged";

export function RecipeFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateRecipe(params.id, data);
      toast.success("Receta Actualizada", {
        position: "bottom-right",
      });
    } else {
      await createRecipe(data);
      toast.success("Receta Creada", {
        position: "bottom-right",
      });
    }
    navigate("/recipes");
  });

  useEffect(() => {
    async function loadRecipe() {
      if (params.id) {
        const { data } = await getRecipe(params.id);
        setValue("title", data.title);
        setValue("description", data.description);
      }
    }
    loadRecipe();
  }, []);

  return (
    <div className="maxv-w-xl mx-auto">
      <NavigationLogged />
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          placeholder="title"
          {...register("title", { required: true })}
          className="bg-custom-gris p-3 rounded-lg block w-full"
        />
        {errors.title && <span className="text-xs">Este Campo es Requerido</span>}
        <textarea
          rows="3"
          placeholder="Description"
          {...register("description", { required: true })}
          className="bg-custom-gris p-3 rounded-lg block w-full mt-3"
        ></textarea>
        {errors.description && <span>Este Campo es Requerido</span>}
        <button className="text-white font-bold bg-custom-azul-cyan p-3 rounded-lg block w-full mt-3">
          Save
        </button>
      </form>

      {params.id && (
        <div className="flex justify-end">
          <button
            className="font-bold text-white bg-red-500 p-3 rounded-lg w-48 mt-3"
            onClick={async () => {
              const accept = window.confirm("Estas Seguro");
              if (accept) {
                await deleteRecipe(params.id);
                toast.success("Receta Eliminada", {
                  position: "bottom-right",
                });
                navigate("/recipes");
              }
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
