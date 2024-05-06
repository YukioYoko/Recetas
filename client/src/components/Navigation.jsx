import {Link} from 'react-router-dom'
import logo from '../images/logo.png'
import buscar from '../images/buscar.png'


export function Navigation() {
  return (
    <div className='flex justify-between items-center py-3 bg-custom-naranja-oscuro px-10 fixed top-0 left-0 right-0'>
        <Link to="/">
          <img src={logo} className='w-28'/>
        </Link>
        <div className='flex bg-custom-beige py-4 w-1/2 px-6 rounded-full items-center justify-between' >
          <input type='text' className='font-body text-xl bg-inherit w-full focus:outline-none' placeholder='Que vamos a comer hoy?'/>
          <img src={buscar} alt="" className='w-7 '/>
        </div>

        <div className='space-x-8'>
          <Link className='font-title text-xl uppercase text-black bg-custom-beige px-8 py-4 rounded-lg' to="/login">Registrar</Link>
          <Link className='font-title text-xl uppercase text-custom-beige bg-custom-naranja-logo px-8 py-4 rounded-lg' to="/acceso-login">Entrar</Link>
        </div>
        
    </div>
  )
}