import {Link} from 'react-router-dom'

export function Navigation() {
  return (
    <div>
        <Link to="/recipes">
            <h1>Recipe App</h1>
        </Link>
        
        <Link to="/recipes-create">Create Recipe</Link>
    </div>
  )
}


