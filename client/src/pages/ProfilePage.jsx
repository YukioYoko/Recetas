import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import candado from "../images/candado.png";
import editar from "../images/editar.png";
import perfil from "../images/perfil.png";
import { useForm } from "react-hook-form";
import { getProfile, updateProfile } from '../api/profile';
import AlertComponent from "../components/ui/AlertComponent";
import { deleteProfile } from '../api/authUser.api';

export function ProfilePage() {
  const userId = localStorage.getItem('auth_id');
  console.log(userId);
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const [profile, setProfile] = useState(null);
  const [alert, setAlert] = useState(null);
  const id_user = localStorage.getItem('user_id');
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await getProfile(id_user);
        const profileData = response.data;
        setProfile(profileData);
        setValue("first_name", profileData.first_name);
        setValue("last_name", profileData.last_name);
        setPreviewImage(profileData.image);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    }

    loadData();
  }, [id, setValue, id_user]);
  
  const onSubmit = handleSubmit(async (data) => {
    const age = localStorage.getItem('age');
    const phone = localStorage.getItem('phone');
    const email = localStorage.getItem('email');
  
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("age", age);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("username", email);
  
    // Verifica si se proporcionó una nueva imagen
    if (data.image && data.image[0]) {
      // Si se proporcionó una nueva imagen, agrégala al FormData directamente
      formData.append("image", data.image[0]);
    } else if (profile && profile.image) {
      // Si no se proporcionó una nueva imagen pero hay una guardada previamente en el perfil,
      // carga la imagen desde la ruta y agrégala al FormData
      const response = await fetch(profile.image);
      const blob = await response.blob();
      formData.append("image", blob, "imagen_perfil.jpg");
    }
  
    try {
      await updateProfile(id_user, formData);
      navigate("/");
    } catch (error) {
      console.error('Error updating profile:', error);
      setAlert({
        type: "error",
        message: "Error al registrarse. Por favor, intente nuevamente.",
      });
    }
  });
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const onDelete = async () => {
    try {
      await deleteProfile(userId);
      window.location.reload(); // Recargar la página después de eliminar la colección
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  return (
    <div>
      <div className="flex pt-20 px-10 font-body font-bold text-3xl min-h-screen text-custom-naranja-oscuro bg-custom-beige justify-around ">
        <div className="flex justify-end relative  ">
          
          <div className="bg-white bg-center w-60 h-60 rounded-full bg-origin-content flex items-center justify-center w-1/4">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Icono de perfil"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <img
              src={perfil}
              alt="Icono de perfil"
              className="w-full h-full rounded-full object-cover"
            />
          )}
        </div>
        </div>
        <div></div>
        <form onSubmit={onSubmit} className="grid grid-cols-2 gap-x-10 content-start" encType="multipart/form-data">
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
                {...register("image")}
                className="text-2xl font-normal border border-custom-naranja-oscuro focus:outline-none rounded-md p-2 w-full"
                onChange={handleImageChange}
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
        <div>
            <button
              className="font-title text-xl uppercase text-custom-beige bg-custom-naranja-oscuro px-8 py-4 rounded-lg mb-10"
              onClick={() => onDelete()} 
            >
              Eliminar cuenta
            </button>
          </div>
      </div>
    </div>
  );
}
