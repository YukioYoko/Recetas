import {Link} from 'react-router-dom'
import logo from '../images/logo.png'
import buscar from '../images/buscar.png'


export function Navigation() {
  return (
    <div className='flex justify-between items-center py-3 bg-custom-naranja-oscuro px-6'>
        <Link to="/">
          <img src={logo} className='w-28'/>
        </Link>
        
    </div>
  )
}