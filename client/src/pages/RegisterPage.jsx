// RegisterPage.js
import logo from '../images/logo.png'
import { Navigation } from '../components/NavLog';

export function RegisterPage() {
  return (
    <div>
      <div>
        <img src={logo} className='w-28'/>
        <h2>Que estas esperando?</h2>
        <h3>Sube, guarda y cocina lo que mas te guste</h3>
      </div>
      <div class="FormRegistro">
        <form action="">
          <div class='Nombre'>
            <label htmlFor="">NOMBRE(S)</label>
            <input type="text" name="nombre" placeholder='Ingresa tu(s) nombre(s)'/>
          </div>
          <div class='Apellidos'>
            <label htmlFor="">APELLIDOS</label>
            <input type="text" name="apellido" placeholder='Ingresa tus apellidos'/>
          </div>
          <div class='Correo'>
            <label htmlFor="">CORREO</label>
            <input type="email" name="correo" placeholder='Ingresa tu correo electronico'/>
          </div>
          <div class='Contrasena'>
            <label htmlFor="">CONTRASENA</label>
            <input type="text" name="contrasena" placeholder='Ingresa tu contrasena'/>
          </div>
          <div class='FechaNac'>
            <label for="fecha">Selecciona una fecha:</label>
            <input type="date" id="fecha" name="fecha"/>
          </div>
          <div class='TerminosCond'>
            <label for="terminos">
            <input type="checkbox" id="terminos" name="terminos"/>
            Acepto los términos y condiciones
            </label>
          </div>
          <div class='SendButton'>
              <input type="submit" value="Registrarme"/>
          </div>
        </form>
      </div>
      <div>
        <a href="#">Ya tengo una cuenta</a>
      </div>
    </div>
  )
}

export default RegisterPage;


