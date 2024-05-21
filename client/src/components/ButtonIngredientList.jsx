import React from 'react';

export function ButtonIngredientList({ ingredients, onIngredientClick, selectedIngredients }) {
  if (!Array.isArray(ingredients)) {
    return null; // O puedes retornar un mensaje de error o un componente de carga
  }

  return (
    <div>
      <h3>Ingredientes</h3>
      <ul>
        {ingredients.map(ingredient => (
          <li key={ingredient.id}>
            <button
              onClick={() => onIngredientClick(ingredient)}
              className={`px-4 py-2 rounded ${
                selectedIngredients.includes(ingredient.id) ? 'bg-green-500 text-white' : 'bg-gray-200 text-black'
              }`}
            >
              {ingredient.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
