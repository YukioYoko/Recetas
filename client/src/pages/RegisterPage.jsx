// RegisterPage.js
import logo from '../images/logo.png'
import { Navigation } from '../components/NavLog';

export function RegisterPage() {
  return (
    <div class="grid grid-cols-2 gap 4">
      <div class="flex items-center content-center flex-col ">
        <img src={logo} className='w-28'/>
        <h2>Que estas esperando?</h2>
        <h3>Sube, guarda y cocina lo que mas te guste</h3>
      </div>
      <div className="FromRegistro" class="flex justify-center items-center flex-col " >
        <form action="">
          <div className='Nombre' class="flex flex-col pt-5 pr-10 pl-5">
            <label htmlFor="">NOMBRE(S)</label>
            <input type="text" name="nombre" placeholder='Ingresa tu(s) nombre(s)'/>
          </div>
          <div className='Apellidos' class="flex flex-col pt-3 pr-10 pl-5">
            <label htmlFor="">APELLIDOS</label>
            <input type="text" name="apellido" placeholder='Ingresa tus apellidos'/>
          </div>
          <div className='Correo' class="flex flex-col pt-3 pr-10 pl-5">
            <label htmlFor="">CORREO</label>
            <input type="email" name="correo" placeholder='Ingresa tu correo electronico'/>
          </div>
          <div className='Contrasena' class="flex flex-col pt-3 pr-10 pl-5">
            <label htmlFor="">CONTRASENA</label>
            <input type="text" name="contrasena" placeholder='Ingresa tu contrasena'/>
          </div>
          <div className='FechaNac' class="flex flex-col pt-3 pr-10 pl-5">
            <label for="fecha">Selecciona una fecha:</label>
            <input type="date" id="fecha" name="fecha"/>
          </div>
          <div className='TerminosCond' class="pt-3 pr-10 pl-5">
            <label for="terminos">
            <input type="checkbox" id="terminos" name="terminos"/>
            Acepto los términos y condiciones
            </label>
          </div>
          <div class="flex justify-center items-center flex-row pl-4 pt-7">
            <div class='SendButton'>
                <input type="submit" value="Registrarme"/>
            </div>
            <div class="pl-8"></div>
            <div>
              <a href="#">Ya tengo una cuenta</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage;


