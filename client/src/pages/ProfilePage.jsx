import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import candado from "../images/candado.png";
import editar from "../images/editar.png";
import perfil from "../images/perfil.png";
import { useForm } from "react-hook-form";
import { getProfile, updateProfile } from '../api/profile';
import { NavigationLogged } from "../components/NavigationLogged";

export function ProfilePage() {
  const [profile, setProfile] = useState({ user: { first_name: '', last_name: '' } });

  const id = localStorage.getItem('user_id');

  useEffect(() => {
    async function loadData() {
      try {
        const profileData = await getProfile(id);
        setProfile(profileData);
        console.log(profileData);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    }

    loadData();
  }, [id]);

  const { handleSubmit, register } = useForm();
  
  const onSubmit = handleSubmit(async (data) => {
    
    const profileData = {
      first_name: first_na,
      last_name: last_na,
      age: ageLocal,
      phone: phoneLocal,
      email: emailLocal
    };
    await updateProfile(id, profileData);
  });

  const ageLocal = localStorage.getItem('age');
  const phoneLocal = localStorage.getItem('phone');
  const emailLocal = localStorage.getItem('email');
  const first_na = localStorage.getItem('first_name') ;
  const last_na = localStorage.getItem('last_name') ;
  
  console.log(localStorage.getItem('data') );

  return (
    <div>
      <NavigationLogged />
      <div className="flex pt-20 px-10 font-body font-bold text-3xl min-h-screen text-custom-naranja-oscuro bg-custom-beige justify-around">
        <div className="flex justify-end relative">
          <Link to="" className="absolute w-[50px] h-[50px]">
            <img src={editar} alt="Icono editar" className="absolute" />
          </Link>
          <div className="bg-white bg-center w-60 h-60 rounded-full bg-origin-content flex items-center justify-center">
            <img
              src={perfil}
              alt="Icono de perfil"
              className="justify-self-center self-center w-40 h-40"
            />
          </div>
        </div>
        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-x-10 content-start">
          <div className="flex flex-col">
            <h3>Nombre(s)</h3>
            <input
              type="text"
              name="first_name"
              value={first_na}
              {...register("first_name", { required: true })}
              className="text-2xl font-normal border border-custom-naranja-oscuro focus:outline-none rounded-md p-2 mt-3 mb-10"
            />
          </div>
          <div className="flex flex-col">
            <h3>Apellido</h3>
            <input
              type="text"
              name="last_name"
              value={last_na}
              {...register("last_name", { required: true })}
              className="text-2xl font-normal border border-custom-naranja-oscuro focus:outline-none rounded-md p-2 mt-3 mb-10"
            />
          </div>
          <div className="flex flex-col col-span-2">
            <h3>Imagen</h3>
            <div className="flex items-center mb-10">
              <input
                type="file"
                name="image"
                className="text-2xl font-normal border border-custom-naranja-oscuro focus:outline-none rounded-md p-2 w-full"
              />
              <img
                src={candado}
                alt="Imagen de candado"
                className="w-[40px] h-[40px]"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="font-title text-xl uppercase text-custom-beige bg-custom-naranja-oscuro px-8 py-4 rounded-lg mb-10"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
    
  );
}
