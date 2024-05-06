import {Link} from 'react-router-dom'
import logo from '../images/logo.png'
import buscar from '../images/buscar.png'


export function Navigation() {
  return (
    <div className='flex justify-between items-center py-3 bg-custom-naranja-oscuro px-6'>
        <Link to="/">
          <img src={logo} className='w-28'/>
        </Link>
        <div className='flex bg-custom-beige py-4 w-1/3 px-10 rounded-full items-center justify-between' >
          <label htmlFor="" className='font-body text-xl'>¿Qué vamos a comer hoy?</label>
          <img src={buscar} alt="" className='w-7 '/>
        </div>

        <div className='space-x-8'>
          <Link className='font-title text-xl uppercase text-black bg-custom-beige px-8 py-4 rounded-lg' to="/login">Registrar</Link>
          <Link className='font-title text-xl uppercase text-custom-beige bg-custom-naranja-logo px-8 py-4 rounded-lg' to="/acceso-login">Entrar</Link>
        </div>
        
    </div>
  )
}