import React from 'react';
import ReactDOM from 'react-dom';

export function Modal({ onClose, children }) {
    const userLogged = localStorage.getItem('user_id');
    const userId = userLogged-1;
    
  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full relative">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-red-500"
        >
          Close
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
