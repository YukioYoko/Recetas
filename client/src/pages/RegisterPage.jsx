import React, { useState } from "react";
import logo from "../images/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AlertComponent from "../components/ui/AlertComponent";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export function RegisterPage() {
  const [alert, setAlert] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const age = parseInt(form.age.value);
    if (age < 17) {
      setAlert({ type: "error", message: "Debes ser mayor de 18 años para registrarte." });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/tastopia/register/",
        {
          email: form.correo.value, // Use 'email' instead of 'correo'
          firstName: form.nombre.value,
          lastName: form.apellido.value,
          age: form.age.value,
          phone: form.phone.value,
          password: form.contrasena.value, // Use 'password' instead of 'contrasena'
        }
        
      );
      console.log(response);
      const email = await axios.post(
        "http://localhost:8000/tastopia/send-email/",
        {
          email: form.correo.value, // Use 'email' instead of 'correo'
        }
      );
      setAlert({ type: "success", message: "¡Registro exitoso!" });
      navigate("/login");
    } catch (error) {
      console.error("Error registrando usuario:", error);
      toast.error("Error Al Registrar usuario", {
        position: "bottom-right",
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
        <div classNameName="text-2xl text-custom-beige bg-custom-naranja-logo px-8 py-4 rounded-lg text-center">
          <h3>Sube, guarda y cocina lo que más te guste</h3>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col text-xl text-custom-beige bg-custom-naranja-logo px-8 py-4 rounded-lg bg-custom-rojo">
        <form className="w-3/4" onSubmit={handleSubmit}>
          {alert && (
            <AlertComponent type={alert.type} message={alert.message} />
          )}
          <div className="flex flex-col pt-5">
            <label htmlFor="nombre">NOMBRE(S)</label>
            <input
              className="py-3 px-2 bg-transparent border-b placeholder-custom-negro outline-none"
              type="text"
              name="nombre"
              placeholder="Ingresa tu(s) nombre(s)"
            />
          </div>
          <div className="flex flex-col pt-3">
            <label htmlFor="apellido">APELLIDOS</label>
            <input
              className="py-3 px-2 bg-transparent border-b placeholder-custom-negro outline-none"
              type="text"
              name="apellido"
              placeholder="Ingresa tus apellidos"
            />
          </div>
          <div className="flex flex-col pt-3">
            <label htmlFor="correo">CORREO</label>
            <input
              className="py-3 px-2 bg-transparent border-b placeholder-custom-negro outline-none"
              type="email"
              name="correo"
              placeholder="Ingresa tu correo electrónico"
            />
          </div>
          <div className="flex flex-col pt-3 uppercase">
            <label htmlFor="contrasena">Contraseña</label>
            <input
              className="py-3 px-2 bg-transparent border-b placeholder-custom-negro outline-none"
              type="password"
              name="contrasena"
              placeholder="Ingresa tu contraseña"
            />
          </div>
          <div className="flex flex-col pt-3">
            <label htmlFor="age">EDAD</label>
            <input
              className="py-3 px-2 bg-transparent border-b placeholder-custom-negro outline-none text-white"
              type="number"
              name="age"
              placeholder="Ingresa tu edad"
            />
          </div>
          <div className="flex flex-col pt-3">
            <label htmlFor="phone">NÚMERO CELULAR</label>
            <input
              className="py-3 px-2 bg-transparent border-b placeholder-custom-negro outline-none"
              type="text"
              name="phone"
              placeholder="Ingresa tu número celular"
            />
          </div>
          <div className="pt-3 font-xl">
            <label htmlFor="terminos">
              <input type="checkbox" id="terminos" name="terminos" />
              Acepto los términos y condiciones
            </label>
          </div>
          <div className="flex justify-center items-center flex-row pl-4 pt-7">
            <div className="SendButton">
              <input
                className="bg-custom-naranja-logo p-3 rounded-full cursor-pointer"
                type="submit"
                value="Registrarme"
              />
            </div>
            <div className="pl-8">
              <a href="../login">Ya tengo una cuenta</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
