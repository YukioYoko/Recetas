import { Link } from "react-router-dom";
import candado from "../images/candado.png";
import editar from "../images/editar.png";
import perfil from "../images/perfil.png";
import { NavigationLogged } from "../components/NavigationLogged";

export function ProfilePage() {
  return (
    <div>
      <div className="flex pt-20 px-10 font-body font-bold text-3xl min-h-screen text-custom-naranja-oscuro bg-custom-beige justify-around">
        <div className="flex justify-end relative">
          <Link to="" className="absolute w-[50px] h-[50px]">
            <img src={editar} alt="Icono editar" className=" absolute" />
          </Link>
          <div className="bg-white bg-center w-60 h-60 rounded-full bg-origin-content flex items-center justify-center">
            <img
              src={perfil}
              alt="Icono de perfil"
              className=" justify-self-center self-center w-40 h-40"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-10  content-start ">
          <div className="flex flex-col ">
            <h3>Nombre(s)</h3>
            <input
              type="text"
              name="nombrePerfil"
              id="nombrePerfil"
              className=" text-2xl font-normal border border-custom-naranja-oscuro focus:outline-none rounded-md p-2 mt-3 mb-10"
            />
          </div>
          <div className="flex flex-col ">
            <h3>Apellidos</h3>
            <input
              type="text"
              name="apellidosPerfil"
              id="apellidosPerfil"
              className=" text-2xl font-normal border border-custom-naranja-oscuro focus:outline-none rounded-md p-2 mt-3 mb-10"
            />
          </div>
          <div className="flex flex-col col-span-1">
            <h3>Fecha de nacimiento</h3>
            <input
              type="date"
              name="fechaNacPerfil"
              id="fechaNacPerfil"
              className="text-2xl font-normal border border-custom-naranja-oscuro focus:outline-none rounded-md p-2 mt-3 mb-10"
            />
          </div>
          <div className="flex flex-col col-span-2">
            <h3>Correo</h3>
            <div className="flex items-center mb-10">
              <input
                type="mail"
                name="correoPerfil"
                id="correoPerfil"
                className="text-2xl font-normal border border-custom-naranja-oscuro focus:outline-none rounded-md p-2 w-full"
              />
              <img
                src={candado}
                alt="Imagen de candado "
                className="w-[40px] h-[40px]"
              />
            </div>
          </div>
          <div>
            <Link
              className="font-title text-xl uppercase text-custom-beige bg-custom-naranja-oscuro px-8 py-4 rounded-lg mb-10"
              to=""
            >
              Guardar Cambios
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
