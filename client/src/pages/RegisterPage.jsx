
// RegisterPage.js
import logo from '../images/logo.png'
import axios from 'axios';
import { useNavigate } from "react-router-dom"

export function RegisterPage() {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
  
    try {
      const response = await axios.post('http://localhost:8000/tastopia/register/', {
        email: form.correo.value, // Use 'email' instead of 'correo'
        firstName: form.nombre.value,
        lastName: form.apellido.value,
        age: form.age.value,
        phone: form.phone.value,
        password: form.contrasena.value // Use 'password' instead of 'contrasena'
      });
      
      console.log(response.data);
      navigate("/");
      // Handle the response here, such as redirecting the user to another page
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle errors here
    }
  };
  return (
    <div className="grid grid-cols-2 font-body">
      <div className="flex flex-col justify-center items-center gap-10 space-x-10 h-screen">
        <div>
          <img src={logo} className="w-28" />
        </div>
        <div className="text-5xl text-custom-beige bg-custom-naranja-logo px-8 py-4 rounded-lg text-center">
          <h2>¿Qué estás esperando?</h2>
        </div>
        <div className="text-2xl text-custom-beige bg-custom-naranja-logo px-8 py-4 rounded-lg text-center ">
          <h3>Sube, guarda y cocina lo que más te guste</h3>
        </div>
      </div>
      <div id="FromRegistro" className="flex justify-center items-center flex-col text-xl text-custom-beige bg-custom-naranja-logo px-8 py-4 rounded-lg bg-custom-rojo " >
        <form  className="w-3/4" action="" onSubmit={handleSubmit}>
            <div id='Nombre' className="flex flex-col pt-5 ">
              <label htmlFor="">NOMBRE(S)</label>
              <input className="py-3 px-2 bg-transparent border-b  placeholder-custom-negro outline-none" type="text" name="nombre" placeholder='Ingresa tu(s) nombre(s)'/>
            </div>
            <div id='Apellidos' className="flex flex-col pt-3 ">
              <label htmlFor="">APELLIDOS</label>
              <input className="py-3 px-2 bg-transparent border-b placeholder-custom-negro outline-none" type="text" name="apellido" placeholder='Ingresa tus apellidos'/>
            </div>
            <div id='Correo' className="flex flex-col pt-3 ">
              <label htmlFor="">CORREO</label>
              <input className="py-3 px-2 bg-transparent border-b placeholder-custom-negro outline-none" type="email" name="correo" placeholder='Ingresa tu correo electronico'/>
            </div>
            <div id='Contrasena' className="flex flex-col pt-3 uppercase">
              <label htmlFor="">Contraseña</label>
              <input className="py-3 px-2 bg-transparent border-b placeholder-custom-negro outline-none" type="password" name="contrasena" placeholder='Ingresa tu contrasena'/>
            </div>
            <div id='age' className="flex flex-col pt-3 ">
              <label htmlFor="age">EDAD</label>
              <input className="py-3 px-2 bg-transparent border-b placeholder-custom-negro outline-none text-white" type="integer" id="age" name="age" placeholder='Ingresa tu edad'/>
            </div>
            <div id='Phone' className="flex flex-col pt-3 ">
              <label htmlFor="">NUMERO CELULAR</label>
              <input className="py-3 px-2 bg-transparent border-b placeholder-custom-negro outline-none" type="text" name="phone" placeholder='Ingresa tu numero celular'/>
            </div>
            <div id='TerminosCond' className="pt-3 font-xl">
              <label htmlFor="terminos">
              <input type="checkbox" id="terminos" name="terminos"/>
                Acepto los términos y condiciones
              </label>
            </div>
          <div className="flex justify-center items-center flex-row pl-4 pt-7">
            <div id="SendButton">
              <input
                className="bg-custom-naranja-logo p-3 rounded-full cursor-pointer"
                type="submit"
                value="Registrarme"
              />
            </div>
            <div className="pl-8"></div>
            <div>
              <a href="../login">Ya tengo una cuenta</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
