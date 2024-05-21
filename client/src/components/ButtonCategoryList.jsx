import React from 'react';

export function ButtonCategoryList({ categories, onCategoryClick, selectedCategories }) {
  if (!Array.isArray(categories)) {
    return null; // O puedes retornar un mensaje de error o un componente de carga
  }

  return (
    <div>
      <h3>Categorías</h3>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <button
              onClick={() => onCategoryClick(category)}
              className={`px-4 py-2 rounded ${
                selectedCategories.includes(category.id) ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
              }`}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
