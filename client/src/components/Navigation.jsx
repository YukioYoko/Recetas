import {Link} from 'react-router-dom'

export function Navigation() {
  return (
    <div className='flex justify-between py-3'>
        <Link to="/recipes">
            <h1 className='text-white font-bold text-3xl mb-4'>Tastopia v0.1</h1>
        </Link>

        <Link className='font-bold text-custom-naranja-logo bg-custom-gris px-3 py-3 rounded-lg' to="/recipes-create">Create Recipe</Link>

    </div>
  )
}