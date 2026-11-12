import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <header className="navbar">
      <span className="navbar-logo">Minhas Séries</span>

      <nav className="navbar-links">
        <NavLink to="/" end>Início</NavLink>
        <NavLink to="/sobre">Sobre</NavLink>
        <NavLink to="/cadastro">Cadastrar</NavLink>
        <NavLink to="/series">Séries</NavLink>
      </nav>
    </header>
  );
}

export default NavBar;
