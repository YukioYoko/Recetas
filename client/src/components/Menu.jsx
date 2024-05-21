import { useState } from "react";
import { Link } from "react-router-dom";

import agregar from "../images/agregar.png";
import categorias from "../images/categorias.png";
import colecciones from "../images/colecciones.png";
import perfil from "../images/perfil.png";
import salir from "../images/salida.png";

export function Menu() {
  const [open, setOpen] = useState(false);
  function handleLogout(setOpen) {
    localStorage.setItem('token', "");
    localStorage.setItem('user_id', -1);
    setOpen(false);
    const userId = localStorage.getItem('user_id');
    console.log(userId); // Si necesitas hacer algo con el userId
  }
  return (
    <div>
      <button
        className="w-[32px] h-[24px] cursor-pointer text-custom-beige"
        onClick={() => setOpen(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <div
        className={`${
          !open && "hidden"
        } min-h-screen w-full fixed top-0 right-0 left-0 backdrop-blur-sm`}
        onClick={() => setOpen(false)}
      ></div>

      <div
        className={`${
          open ? "w-[500px]" : "w-0"
        } bg-custom-beige min-h-screen fixed top-0 right-0 transition-all duration-300 overflow-hidden`}
      >
        <div
          className={`${!open && "hidden"} flex flex-col pt-12 pr-6 items-end`}
        >
          <button
            className="mr-4 cursor pointer text-custom-naranja-oscuro"
            onClick={() => setOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-8 h-8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div
            className={
              "w-[350px] mr-[50px] mt-5 text-custom-naranja-oscuro font-title text-[32px]"
            }
          >
            <Link to="/recipe-create" onClick={() => setOpen(false)}>
              <div className="flex items-center px-2  border-b-2 border-custom-naranja-oscuro py-2 hover:pl-[10px] transition-all duration-150">
                <img src={agregar} alt="Agregar" className="w-8 h-8 mr-5" />
                Agregar Receta
              </div>
            </Link>

            <Link to="/categories" onClick={() => setOpen(false)}>
              <div className="flex items-center px-2  border-b-2 border-custom-naranja-oscuro py-2 hover:pl-[10px] transition-all duration-150">
                <img
                  src={categorias}
                  alt="Categorias"
                  className="w-8 h-8 mr-5"
                />
                Categorias
              </div>
            </Link>

            <Link to="/colecciones" onClick={() => setOpen(false)}>
              <div className="flex items-center px-2  border-b-2 border-custom-naranja-oscuro py-2 hover:pl-[10px] transition-all duration-150">
                <img
                  src={colecciones}
                  alt="Colecciones"
                  className="w-8 h-8 mr-5"
                />
                Mis Colecciones
              </div>
            </Link>

            <Link to="/perfil" onClick={() => setOpen(false)}>
              <div className="flex items-center px-2  border-b-2 border-custom-naranja-oscuro py-2 hover:pl-[10px] transition-all duration-150">
                <img src={perfil} alt="Perfil" className="w-8 h-8 mr-5" />
                Mi Perfil
              </div>
            </Link>
            <Link to="#" onClick={() => handleLogout(setOpen(false))}>
              <div className="flex items-center px-2  border-b-2 border-custom-naranja-oscuro py-2 hover:pl-[10px] transition-all duration-150">
                <img src={salir} alt="Salir" className="w-8 h-8 mr-5" />
                Salir
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
