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
      <div
        id="FromRegistro"
        className="flex justify-center items-center flex-col text-xl text-custom-beige bg-custom-rojo px-8 py-4 rounded-lg "
      >
        <form className="w-3/4" action="" onSubmit={handleSubmit}>
          <div id="email" className="flex flex-col pt-3 ">
            <label htmlFor="">CORREO</label>
            <input
              className="py-3 px-2 bg-transparent border-b placeholder-custom-negro outline-none"
              type="email"
              name="email"
              placeholder="Ingresa tu correo electronico"
            />
          </div>
          <div id="password" className="flex flex-col pt-3 uppercase">
            <label htmlFor="">Contraseña</label>
            <input
              className="py-3 px-2 bg-transparent border-b placeholder-custom-negro outline-none"
              type="password"
              name="password"
              placeholder="Ingresa tu contrasena"
            />
          </div>
          <div className="flex justify-center items-center flex-row pl-4 pt-7">
            <div id="SendButton">
              <input
                className="bg-custom-naranja-logo p-3 rounded-full cursor-pointer"
                type="submit"
                value="Ingresar"
              />
            </div>
            <div className="pl-8"></div>
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
