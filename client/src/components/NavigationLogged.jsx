import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import buscar from "../images/buscar.png";
import { Menu } from "./Menu";
import SearchBar from "./SearchBar";

export function NavigationLogged() {
  return (
    <div className="flex justify-between items-center py-3 bg-custom-naranja-oscuro px-10 relative z-20">
      <Link to="/">
        <img src={logo} className="w-28" />
      </Link>
      <div className="flex bg-custom-beige py-4 w-1/2 px-6 rounded-full items-center justify-between">
        <SearchBar />
        <img src={buscar} alt="" className="w-7 " />
      </div>

      <Menu />
    </div>
  );
}
