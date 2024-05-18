import logo from "../images/logo.png";
import axios from 'axios';
import { useNavigate } from "react-router-dom"

export function LoginPage() {
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
  
    try {
      const response = await axios.post('http://localhost:8000/tastopia/login/', {
        email: form.email.value, 
        password: form.password.value // Use 'password' instead of 'contrasena'
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
    <div class="grid grid-cols-2 font-body">
      <div class="flex flex-col justify-center items-center gap-10 space-x-10 h-screen">
        <div>
          <img src={logo} className="w-28" />
        </div>
        <div class="text-5xl text-custom-beige bg-custom-naranja-logo px-8 py-4 rounded-lg text-center">
          <h2>¿Qué estás esperando?</h2>
        </div>
        <div class="text-2xl text-custom-beige bg-custom-naranja-logo px-8 py-4 rounded-lg text-center ">
          <h3>Sube, guarda y cocina lo que más te guste</h3>
        </div>
      </div>
      <div
        className="FromRegistro"
        class="flex justify-center items-center flex-col text-xl text-custom-beige bg-custom-naranja-logo px-8 py-4 rounded-lg bg-custom-rojo "
      >
        <form class="w-3/4" action="" onSubmit={handleSubmit}>
          <div className="email" class="flex flex-col pt-3 ">
            <label htmlFor="">CORREO</label>
            <input
              class="py-3 px-2 bg-transparent border-b placeholder-custom-negro outline-none"
              type="email"
              name="email"
              placeholder="Ingresa tu correo electronico"
            />
          </div>
          <div className="password" class="flex flex-col pt-3 uppercase">
            <label htmlFor="">Contraseña</label>
            <input
              class="py-3 px-2 bg-transparent border-b placeholder-custom-negro outline-none"
              type="password"
              name="password"
              placeholder="Ingresa tu contrasena"
            />
          </div>
          <div class="flex justify-center items-center flex-row pl-4 pt-7">
            <div className="SendButton">
              <input
                class="bg-custom-naranja-logo p-3 rounded-full"
                type="submit"
                value="Ingresar"
              />
            </div>
            <div class="pl-8"></div>
            <div>
              <a href="../register">¿No tienes una cuenta?</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
