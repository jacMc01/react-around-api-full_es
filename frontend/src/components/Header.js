import {Link} from "react-router-dom";
import {React, useContext} from "react";
import '../blocks/Header.css';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Header = () => {

  const {isLogin, setIsLogin} = useContext(CurrentUserContext);
  const {loggedInStatus} = useContext(CurrentUserContext);

  const handleLogOut = () => {
    localStorage.removeItem('jwt');
    setIsLogin(false)
    window.location.reload();
  }

  return (
    <header className="header">
      <h1 className="header__title">Around<sup className="header__super-indice">The USA</sup></h1>

      {loggedInStatus ?
        <>
        <h3>
          <span className="header__link" onClick={handleLogOut}> Cerrar Sesión </span>
        </h3>
        </>
        :
        <p className="header__navbar-register">{isLogin ?
          <Link className="header__link" to="/register" onClick={() => setIsLogin(false)}> Regístrate </Link>
          :
          <Link className="header__link" to="/login" onClick={() => setIsLogin(true)}> Iniciar Sesión </Link>}
        </p>
      }
    </header>
  );
}

export default Header;
