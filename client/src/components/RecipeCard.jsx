import { redirectDocument, useNavigate } from "react-router-dom"

export function RecipeCard({recipe}) {

    const navigate = useNavigate()

    return (
        <div className="bg-custom-gris p-3 hover:bg-custom-gris-oscuro hover:cursor-pointer"
            onClick={() => {
                navigate(`/recipes/${recipe.id}`)
            }}
        >
            <h1 className="font-bold uppercase">{recipe.title}</h1>
            <p className="text-slate-400">{recipe.description}</p>
        </div>
    )
}
