import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import candado from "../images/candado.png";
import editar from "../images/editar.png";
import perfil from "../images/perfil.png";
import { useForm } from "react-hook-form";
import { getProfile, updateProfile } from '../api/profile';
import AlertComponent from "../components/ui/AlertComponent";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


export function ProfilePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm();
  const [profile, setProfile] = useState(null);
  const [alert, setAlert] = useState(null);
  const id_user = localStorage.getItem('user_id');

  useEffect(() => {
    async function loadData() {
      try {
        const response = await getProfile(id_user);
        const profileData = response.data;
        setProfile(profileData);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    }

    loadData();
  }, [id]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getProfile(id_user);
        const profileData = response.data;
        setProfile(profileData);
        setValue("first_name", profileData.first_name);
        setValue("last_name", profileData.last_name);
        
      } catch (error) {
        console.error('Error fetching profile data:', error);
        
      }
    }

    fetchData();
  }, [id]);

  
  const onSubmit = handleSubmit(async (data) => {
    const age = localStorage.getItem('age');
    const phone = localStorage.getItem('phone');
    const email = localStorage.getItem('email') ; 
    const profileData = {
      "first_name": data.first_name,
      "last_name": data.last_name,
      "age": age,
      "phone": phone,
      "email": email,
      "username": email
    };
    try{
      await updateProfile(id_user, profileData);
      toast.success("Perfil Actualizado", {
        position: "bottom-right",
      });
      navigate("/");
    }
    catch{
      setAlert({
        type: "error",
        message: "Error al registrarse. Por favor, intente nuevamente.",
      });
    }
    
    
  });


  return (
    <div>
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
        <div>
        </div>
        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-x-10 content-start">
        {alert && (
            <AlertComponent type={alert.type} message={alert.message} />
          )}
          <div className="flex flex-col">
            <h3>Nombre(s)</h3>
            <input
              type="text"
              name="first_name"
              {...register("first_name", { required: true })}
              className="text-2xl font-normal border border-custom-naranja-oscuro focus:outline-none rounded-md p-2 mt-3 mb-10"
            />
          </div>
          <div className="flex flex-col">
            <h3>Apellido</h3>
            <input
              type="text"
              name="last_name"
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
