import { redirectDocument, useNavigate } from "react-router-dom"
import { SliderRecipeCard } from './SliderRecipeCard'

export function SliderRecipe({recipe}) {

    return (
        <div className="bg-custom-beige p-3">
            <SliderRecipeCard/>
        </div>
    )
}