import React from 'react';
import { Link } from 'react-router-dom';
import meme from '../images/meme.jpeg';

export function NotFoundPage() {
  return (
    <div className='bg-custom-beige min-h-screen flex flex-col items-center justify-center gap-5'>
      <h1 className='font-title text-6xl text-custom-naranja-oscuro'>Lo sentimos, la página que busca no existe.</h1>
      <img src={meme} alt="Meme" className="w-[500px] h-[500px]" />
      <Link to="/" className="font-title uppercase text-custom-beige bg-custom-naranja-oscuro px-4 py-2 rounded text-lg">Volver a la página de inicio</Link>
    </div>
  );
}

