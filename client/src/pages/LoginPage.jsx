import { useState } from "react";
import logo from "../images/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AlertComponent from "../components/ui/AlertComponent";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export function LoginPage() {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    try {
      const response = await axios.post(
        "http://localhost:8000/tastopia/login/",
        {
          email: form.email.value,
          password: form.password.value,
        }
      );

      const { token, user_id, first_name, last_name, age, phone, email, auth_id} = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('first_name', first_name);
      localStorage.setItem('last_name', last_name);
      localStorage.setItem('age', age);
      localStorage.setItem('phone', phone);
      localStorage.setItem('email', email);
      localStorage.setItem('auth_id', auth_id);

      toast.success("Inicio de Sesión Exitoso", {
        position: "bottom-right",
      });
      console.log(response.data);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      setAlert({
        type: "error",
        message: "Error al iniciar sesión. Por favor, intente nuevamente.",
      });
    }
  };

  return (
    <div className="grid grid-cols-2 font-body">
      <div className="flex flex-col justify-center items-center gap-10 space-x-10 h-screen">
        <div>
          <Link to="/">
            <img src={logo} className="w-28" />
          </Link>
        </div>
        <div className="text-5xl text-custom-beige bg-custom-naranja-logo px-8 py-4 rounded-lg text-center">
          <h2>¿Qué estás esperando?</h2>
        </div>
        <div className="text-2xl text-custom-beige bg-custom-naranja-logo px-8 py-4 rounded-lg text-center">
          <h3>Sube, guarda y cocina lo que más te guste</h3>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col text-xl text-custom-beige bg-custom-naranja-logo px-8 py-4 rounded-lg bg-custom-rojo">
        <form className="w-3/4" onSubmit={handleSubmit}>
          {alert && (
            <AlertComponent type={alert.type} message={alert.message} />
          )}
          <div className="flex flex-col pt-3">
            <label htmlFor="email">CORREO</label>
            <input
              className="py-3 px-2 bg-transparent border-b placeholder-custom-negro outline-none"
              type="email"
              name="email"
              placeholder="Ingresa tu correo electronico"
            />
          </div>
          <div className="flex flex-col pt-3 uppercase">
            <label htmlFor="password">Contraseña</label>
            <input
              className="py-3 px-2 bg-transparent border-b placeholder-custom-negro outline-none"
              type="password"
              name="password"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <div className="flex justify-center items-center flex-row pl-4 pt-7">
            <div>
              <input
                className="bg-custom-naranja-logo p-3 rounded-full cursor-pointer"
                type="submit"
                value="Ingresar"
              />
            </div>
            <div className="pl-8">
              <a href="../register">¿No tienes una cuenta?</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
