import { NavigationLogged } from "../components/NavigationLogged";
import { RecipeList } from "../components/RecipeList";

export function CategoriesPage() {
  return (
    <div className="bg-custom-beige min-h-screen">
        <NavigationLogged/>
        <div className="py-10 px-10">x
            <div className="flex">
                <aside className="w-1/4">Barra de busqueda</aside>
                <RecipeList/>
            </div>
        </div>
    </div>
    
  )
}
