import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { getUserCollections } from '../api/collections.api';
import { createSaved, getSaves } from '../api/saved-recipes.api';
import cancelar from "../images/cancelar.png"
import add from "../images/boton-agregar.png"

export function Modal({ onClose, recipe }) {
  const [collections, setCollections] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userId = localStorage.getItem('user_id');
  const isLoggedIn = userId && parseInt(userId) >= 0;
  const recipeId = recipe;

  useEffect(() => {
    if (isLoggedIn) {
      const fetchCollections = async () => {
        try {
          const response = await getUserCollections(userId);
          setCollections(response.data);
        } catch (error) {
          console.error("Error fetching collections:", error);
        }
      };

      fetchCollections();
    }
  }, [userId, isLoggedIn]);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await getSaves();
        setSavedRecipes(response.data);
      } catch (error) {
        console.error("Error fetching saved recipes:", error);
      }
    };

    fetchSavedRecipes();
  }, []);

  const saveRecipeInCollection = async (colId) => {
    // Verificar si la receta ya está guardada en esta colección
    const alreadySaved = savedRecipes.some(savedRecipe => savedRecipe.collection === colId && savedRecipe.recipe === recipeId);
    if (alreadySaved) {
      // La receta ya está guardada en esta colección, hacer algo aquí (p. ej., mostrar un mensaje)
      alert('Esta receta ya está guardada en esta colección.');
      return;
    }

    const data = {
      collection: colId,
      recipe: recipeId,
    };

    try {
      await createSaved(data);
      onClose();
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert('Error al guardar la receta en la colección.');
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-custom-beige p-4 rounded-lg shadow-lg max-w-lg w-full relative">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-red-500 font-title"
        >
          <img src={cancelar} alt="Boton para cerrar" />
        </button>
        <h2 className='font-title text-2xl text-custom-naranja-oscuro'>Guardar Receta</h2>
        <div>
          {isLoggedIn ? ( 
            collections.length > 0 ? (
              collections.map((collection) => (
                <div className='relative flex space-x-0 align-items-center w-full text-center'>
                    <button 
                        key={collection.id} 
                        className="relative p-2 border-b font-title text-slate-700" 
                        onClick={() => saveRecipeInCollection(collection.id)}
                    >
                    {collection.name}
                    </button>
                    <button 
                        key={collection.id} 
                        className="relative p-2 border-b font-title text-slate-700" 
                        onClick={() => saveRecipeInCollection(collection.id)}
                    >
                        <img src={add} alt="Boton de agregar" className='relativew-[24px] h-[24px]'/>
                    </button>
                </div>
              ))
            ) : (
              <p>No collections found.</p>
            )
          ) : (
            <p>Por favor, inicie sesión para guardar recetas.</p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
