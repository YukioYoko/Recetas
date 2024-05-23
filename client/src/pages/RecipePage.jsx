import { Link, useParams, useNavigate } from "react-router-dom";
import recetaPlaceholder from "../images/receta.jpg";
import tiempo from "../images/tiempo.png";
import estrella from "../images/estrella.png";
import { getRecipe } from "../api/recipes.api";
import { getAllCategories } from "../api/categories.api";
import { getAllPhotos } from "../api/recipePhotos.api";
import { getAllIngredients } from "../api/ingredients.api";
import { Rating } from "../components/Rating";
import { useState, useEffect } from "react";
import { PDF } from "../components/PDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { createComment } from "../api/comments.api";
import { getAllComments } from "../api/comments.api";
import { getProfile } from "../api/profile";

export function RecipePage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [categories, setCategories] = useState([]);
  const [recipePhotos, setRecipePhotos] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [commentContent, setCommentContent] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function loadData() {
      const [categoriesRes, recipePhotosRes, ingredientsRes, commentsRes] =
        await Promise.all([
          getAllCategories(),
          getAllPhotos(),
          getAllIngredients(),
          getAllComments(),
        ]);
      setCategories(categoriesRes.data);
      setRecipePhotos(recipePhotosRes.data);
      setIngredients(ingredientsRes.data);
      setComments(commentsRes.data);
    }
    loadData();
  }, []);

  useEffect(() => {
    async function fetchRecipe() {
      const { data } = await getRecipe(id);
      setRecipe(data);
    }
    fetchRecipe();
  }, [id]);

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    const userId = localStorage.getItem("user_id");
    const response = await getProfile(userId);
    const username = response.data.email;

    const isoString = new Date().toISOString();
    const formattedDate = isoString
      .replace("T", " ")
      .replace("Z", "")
      .split(".")[0];

    const commentData = {
      content: commentContent,
      recipe: id,
      username: username,
      created_at: formattedDate,
    };

    try {
      const response = await createComment(commentData);
      setComments((prevComments) => [...prevComments, response.data]);
      setCommentContent("");
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const handleRatingChange = (newRating, newValorationCount) => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      valoration: newRating,
      valorationCount: newValorationCount,
    }));
  };

  const getRecipeCategories = (recipeId) => {
    return categories.filter((category) => category.recipe === recipeId);
  };

  const getRecipePhotos = (recipeId) => {
    return recipePhotos.filter(
      (recipePhoto) => recipePhoto.recipe === recipeId
    );
  };

  const getRecipeIngredients = (recipeId) => {
    return ingredients.filter((ingredient) => ingredient.recipe === recipeId);
  };

  const getRecipeComments = (recipeId) => {
    return comments.filter((comment) => comment.recipe === recipeId);
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const recipeCategories = getRecipeCategories(recipe.id);
  const recipePhotosData = getRecipePhotos(recipe.id);
  const recipeIngredients = getRecipeIngredients(recipe.id);
  const recipeComments = getRecipeComments(recipe.id);

  return (
    <div>
      <div className="py-10 px-10 font-title font-bold text-3xl min-h-screen text-custom-naranja-oscuro bg-custom-beige justify-around">
        <div className="flex flex-row">
          <div className="w-1/2 mt-10">
            <h3 className="text-5xl my-6">{recipe.title}</h3>
            <Rating
              recipeId={recipe.id}
              currentRating={recipe.valoration}
              currentCount={recipe.valorationCount}
              onRatingChange={handleRatingChange}
            />
            <div className="flex flex-row text-base mt-4 mb-10">
              <img src={tiempo} alt="" className="w-[24px] h-[24px] mr-2" />
              {recipe.duration} MIN
            </div>
            {
              <PDFDownloadLink
                document={<PDF id={id} />}
                fileName={`${recipe.title}.pdf`}
              >
                {({ loading, url, error, blob }) =>
                  loading ? (
                    <button className="font-title text-xl uppercase text-custom-beige bg-custom-naranja-logo px-8 py-4 rounded-lg">
                      Cargando ...
                    </button>
                  ) : (
                    <button className="font-title text-xl uppercase text-custom-beige bg-custom-naranja-logo px-8 py-4 rounded-lg">
                      Descargar
                    </button>
                  )
                }
              </PDFDownloadLink>
            }
          </div>

          <div className="w-1/2">
            <div>
              <img
                src={
                  recipePhotosData.length > 0
                    ? recipePhotosData[0].photo
                    : recetaPlaceholder
                }
                alt=""
                className="mt-4 rounded-xl w-full"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
          <div>
            <h3 className="ml-10">Ingredientes</h3>
            <div className="flex gap-2 my-10 flex-wrap">
              {recipeIngredients.map((ingredient) => (
                <Link
                  key={ingredient.id}
                  className="font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full"
                  to=""
                >
                  {ingredient.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-2 row-span-2">
            <h3 className="ml-10 mb-10">Preparacion</h3>
            <p className="font-body text-lg font-normal">
              {recipe.description}
            </p>
          </div>

          <div>
            <h3 className="ml-10">Categorias</h3>
            <div className="flex gap-2 my-10 flex-wrap">
              {recipeCategories.map((category) => (
                <Link
                  key={category.id}
                  className="font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full"
                  to=""
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-3 mt-20 w-9/12">
            <h3 className="ml-10">Comentarios</h3>
            <form onSubmit={handleSubmitComment}>
              <textarea
                className="w-full h-[200px] text-xl font-normal font-body border border-custom-naranja-oscuro focus:outline-none rounded-md p-2 mt-5"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder="Escribe tu comentario..."
                rows={4}
                cols={50}
              />
              <dir className="flex justify-end my-4">
                <button
                  type="submit"
                  className="font-base text-xl uppercase text-custom-beige bg-custom-naranja-oscuro px-8 py-4 rounded-lg mb-10"
                >
                  Enviar
                </button>
              </dir>
            </form>
            <ul>
              {recipeComments.map((comment) => (
                <li key={comment.id} className="font-body font-normal text-xl text-black px-10 my-3">
                  <div className="ml-8 mb-2">
                    <p className="font-bold mb-2">{comment.username}</p>
                    <p className="text-base font-light">{comment.created_at}</p>
                  </div>

                  <p className="font-light text-2xl">{comment.content}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
