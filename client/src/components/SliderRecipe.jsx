import { redirectDocument, useNavigate } from "react-router-dom"
import { SliderRecipeCard } from './SliderRecipeCard'
import { Link } from 'react-router-dom'

export function SliderRecipe() {

    return (
        <div className="flex p-3 gap-6 mb-12 justify-center">
            <Link to="/recipe">
                <SliderRecipeCard/>
            </Link>
            <Link to="/recipe">
                <SliderRecipeCard/>
            </Link>
            <Link to="/recipe">
                <SliderRecipeCard/>
            </Link>
        </div>
    )
}