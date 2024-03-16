import { redirectDocument, useNavigate } from "react-router-dom"

export function RecipeCard({recipe}) {

    const navigate = useNavigate()

    return (
        <div style={{background: "black"}}
            onClick={() => {
                navigate(`/recipes/${recipe.id}`)
            }}
        >
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
        </div>
    )
}
