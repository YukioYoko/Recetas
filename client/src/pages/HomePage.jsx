import { useEffect, useState } from "react";
import { SliderRecipe } from "../components/SliderRecipe";
import { NavigationLogged } from "../components/NavigationLogged";
import receta from "../images/receta.jpg";

export function HomePage() {
  return (
    <div className="">
      <div className="relative h-screen bg-cover bg-center z-0" style={{ backgroundImage: `url(${receta})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center font-title">
          <h1 className="text-[170px] text-custom-beige uppercase">Tastopia</h1>
          <p className="text-custom-beige text-[50px]">El delicioso es saludable o ¿cómo era?</p>
        </div>
      </div>
      <div className="font-title text-[64px] text-custom-beige p-6">
        <h2 className="text-center my-2">Las más nuevas</h2>
        <SliderRecipe filter={"newest"}/>
        <h2 className="text-center my-2">Mejor Valoradas</h2>
        <SliderRecipe filter={"best"}/>
        <h2 className="text-center my-2">Nuestras favoritas</h2>
        <SliderRecipe filter={"all"}/>
      </div>
      
    </div>
  );
}

