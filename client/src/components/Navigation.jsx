import {Link} from 'react-router-dom'

export function Navigation() {
  return (
    <div className='flex justify-between items-center py-3 bg-custom-naranja-oscuro px-3 w-screen'>
        <Link to="/">
          <img src='../images/logo.png'/>
        </Link>

        <Link className='font-title uppercase text-custom-beige bg-custom-naranja-oscuro px-3 py-3 rounded-lg' to="/login">Entrar</Link>

    </div>
  )
}