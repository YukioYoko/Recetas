import {Link} from 'react-router-dom'
import logo from '../images/logo.png'
import buscar from '../images/buscar.png'
import { Menu } from './Menu'


export function NavigationLogged() {
  return (
    <div className='flex justify-between items-center py-3 bg-custom-naranja-oscuro px-10'>
        <Link to="/">
          <img src={logo} className='w-28'/>
        </Link>
        <div className='flex bg-custom-beige py-4 w-1/2 px-6 rounded-full items-center justify-between' >
          <input type='text' className='font-body text-xl bg-inherit w-full focus:outline-none' placeholder='Que vamos a comer hoy?'/>
          <img src={buscar} alt="" className='w-7 '/>
        </div>

        <Menu/>
        
    </div>
  )
}