// RegisterPage.js
import logo from '../images/logo.png'

export function RegisterPage() {
  return (
    <div class="grid grid-cols-2 font-body">
      <div class="flex flex-col justify-center items-center gap-10 space-x-10 h-screen">
        <div>
          <img src={logo} className='w-28'/>
        </div>
        <div class="text-5xl text-custom-beige bg-custom-naranja-logo px-8 py-4 rounded-lg text-center">
          <h2>¿Qué estás esperando?</h2>
        </div>
        <div class="text-2xl text-custom-beige bg-custom-naranja-logo px-8 py-4 rounded-lg text-center ">
          <h3>Sube, guarda y cocina lo que más te guste</h3>
        </div>
        
      </div>
      <div className="FromRegistro" class="flex justify-center items-center flex-col text-xl text-custom-beige bg-custom-naranja-logo px-8 py-4 rounded-lg bg-custom-rojo " >
        <form  class="w-3/4" action="">
            <div className='Nombre' class="flex flex-col pt-5 ">
              <label htmlFor="">NOMBRE(S)</label>
              <input class="py-3 px-2 bg-transparent border-b  placeholder-custom-negro outline-none" type="text" name="nombre" placeholder='Ingresa tu(s) nombre(s)'/>
            </div>
            <div className='Apellidos' class="flex flex-col pt-3 ">
              <label htmlFor="">APELLIDOS</label>
              <input class="py-3 px-2 bg-transparent border-b placeholder-custom-negro outline-none" type="text" name="apellido" placeholder='Ingresa tus apellidos'/>
            </div>
            <div className='Correo' class="flex flex-col pt-3 ">
              <label htmlFor="">CORREO</label>
              <input class="py-3 px-2 bg-transparent border-b placeholder-custom-negro outline-none" type="email" name="correo" placeholder='Ingresa tu correo electronico'/>
            </div>
            <div className='Contrasena' class="flex flex-col pt-3 uppercase">
              <label htmlFor="">Contraseña</label>
              <input class="py-3 px-2 bg-transparent border-b placeholder-custom-negro outline-none" type="text" name="contrasena" placeholder='Ingresa tu contrasena'/>
            </div>
            <div className='FechaNac' class="flex flex-col pt-3 ">
              <label for="fecha">FECHA DE NACIMIENTO</label>
              <input class="py-3 px-2 bg-transparent border-b text-custom-negro outline-none" type="date" id="fecha" name="fecha"/>
            </div>
            <div className='TerminosCond' class="pt-3 font-xl">
              <label for="terminos">
              <input type="checkbox" id="terminos" name="terminos"/>
                Acepto los términos y condiciones
              </label>
            </div>
          <div class="flex justify-center items-center flex-row pl-4 pt-7">
            <div className='SendButton' >
                <input class="bg-custom-naranja-logo p-3 rounded-full" type="submit" value="Registrarme"/>
            </div>
            <div class="pl-8"></div>
            <div>
              <a href="../login">Ya tengo una cuenta</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage;


