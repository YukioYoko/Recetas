import React from 'react';
import ReactDOM from 'react-dom';
import { useForm } from 'react-hook-form'; // Asegúrate de importar useForm
import { createCollection } from '../api/collections.api';
import cancelar from "../images/cancelar.png";

export function ModalCollection({ onClose }) {
  const userId = localStorage.getItem('user_id');
  const isLoggedIn = userId && parseInt(userId) >= 0;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const onSubmit = handleSubmit(async (data) => {
    const dataCollection = {
        user: userId-1,
        name: data.name,
    };
    
    try {
        await createCollection(dataCollection);
        onClose(); // Llama a la función para cerrar el modal
    } catch (error) {
        console.error("Error creating collection:", error);
        
    }
  });

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-custom-beige p-4 rounded-lg shadow-lg max-w-lg w-full relative">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-red-500 font-title"
        >
          <img src={cancelar} alt="Boton para cerrar" />
        </button>
        <h2 className='font-title text-4xl text-custom-naranja-oscuro'>Nueva Colección</h2>
        <div>
          {isLoggedIn ? (
            <form onSubmit={onSubmit}>
                <div className='flex flex-col'>
                    <div>
                        <h2 className='font-title text-xl my-3'>Nombre de la colección</h2>
                        <input 
                            type="text" 
                            {...register("name", { required: true })}
                            name="name"
                            placeholder="Ingresa el nombre de la colección"
                            className='w-full border-b bg-custom-beige'
                        />
                        {errors.name && <p>El nombre es obligatorio.</p>}
                    </div>
                    <div className="flex justify-end mt-[30px]">
                        <button 
                        type="submit" 
                        className="font-title text-xl uppercase text-custom-beige bg-custom-naranja-oscuro px-8 py-4 rounded-lg mb-10"
                        >
                        Crear Colección
                        </button>
                    </div>
                </div>
            </form>
          ) : (
            <p>Por favor, inicie sesión para crear una colección.</p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
