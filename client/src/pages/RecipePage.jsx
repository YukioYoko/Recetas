import { Link } from "react-router-dom";
import receta from "../images/receta.jpg";
import tiempo from "../images/tiempo.png";
import estrella from "../images/estrella.png";

export function RecipePage() {
  return (
    <div className="py-10 px-10 font-title font-bold text-3xl min-h-screen text-custom-naranja-oscuro bg-custom-beige justify-around">
      <div className="flex flex-row">
        <div>
          <h3 className="text-5xl my-6">
            Ensalada de Quinoa con Vegetales Asados
          </h3>
          <div className="flex gap-1">
            <img src={estrella} alt="" className="w-[32px] h-[32px]" />
            <img src={estrella} alt="" className="w-[32px] h-[32px]" />
            <img src={estrella} alt="" className="w-[32px] h-[32px]" />
            <img src={estrella} alt="" className="w-[32px] h-[32px]" />
            <img src={estrella} alt="" className="w-[32px] h-[32px]" />
          </div>
          <div className="flex flex-row text-base mt-4 mb-10">
            <img src={tiempo} alt="" className="w-[24px] h-[24px] mr-2" />
            50 MIN
          </div>
          <Link
            className="font-title text-xl uppercase text-custom-beige bg-custom-naranja-logo px-8 py-4 rounded-lg"
            to=""
          >
            descargar
          </Link>
        </div>

        <div className="w-1/2">
          <div>
            <img src={receta} alt="" className="mt-4 rounded-xl" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-16">
        <div>
          <h3 className="ml-10">Ingredientes</h3>
          <div className="flex gap-2 my-10">
            <Link
              className="font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full"
              to=""
            >
              Quinoa
            </Link>
            <Link
              className="font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full"
              to=""
            >
              Cebolla
            </Link>
            <Link
              className="font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full"
              to=""
            >
              Calabacin
            </Link>
            <Link
              className="font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full"
              to=""
            >
              aceite
            </Link>
          </div>
        </div>

        <div className="col-span-2 row-span-2">
          <h3 className="ml-10 mb-10">Preparacion</h3>
          <p className="font-body text-lg font-normal">
            Precalienta el horno a 200°C (400°F). Enjuaga la quinoa bajo agua
            fría y cuélala. En una olla, lleva el caldo de verduras a hervir.
            Agrega la quinoa, reduce el fuego a bajo, tapa y cocina durante
            15-20 minutos o hasta que la quinoa esté tierna y el líquido se haya
            absorbido. Retira del fuego y deja reposar tapado durante 5 minutos.
            Mientras tanto, en una bandeja para hornear, coloca las tiras de
            pimiento, rodajas de calabacín, rodajas de berenjena y rodajas de
            cebolla roja. Rocía con aceite de oliva y sazona con sal y pimienta
            al gusto. Mezcla bien para cubrir todas las verduras con el aceite y
            las especias. Hornea las verduras en el horno precalentado durante
            20-25 minutos o hasta que estén tiernas y ligeramente doradas,
            revolviendo ocasionalmente. En un tazón grande, combina la quinoa
            cocida y las verduras asadas. Agrega las hojas de albahaca picadas y
            mezcla suavemente. Sirve la ensalada de quinoa en platos
            individuales y espolvorea con queso feta desmenuzado, si lo deseas.
          </p>
        </div>

        <div>
          <h3 className="ml-10">Categorias</h3>
          <div className="flex gap-2 my-10">
            <Link
              className="font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full"
              to=""
            >
              Ensaladas
            </Link>
            <Link
              className="font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full"
              to=""
            >
              Vegetariana
            </Link>
            <Link
              className="font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full"
              to=""
            >
              jamon
            </Link>
            <Link
              className="font-title text-sm uppercase text-custom-beige bg-custom-naranja-oscuro px-6 py-3 rounded-full"
              to=""
            >
              ajo
            </Link>
          </div>
        </div>

        <div className="col-span-3 mt-20 w-9/12">
          <h3 className="ml-10">Comentarios</h3>
          <input
            type="text"
            name="comentario"
            id="comentario"
            className="w-full h-[200px] text-xl font-normal font-body border border-custom-naranja-oscuro focus:outline-none rounded-md p-2 my-5"
          />
          <div className="flex justify-end">
            <Link
              className="font-base text-xl uppercase text-custom-beige bg-custom-naranja-oscuro px-8 py-4 rounded-lg mb-10"
              to=""
            >
              Enviar
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
