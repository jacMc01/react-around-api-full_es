import {React, useContext} from 'react';
import '../../blocks/Login.css';
import * as auth from '../../utils/auth';
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import { useHistory, Link } from "react-router-dom";

const Login = (props) => {

  const history = useHistory();
  const {setLoggedInStatus,setIsLogin} = useContext(CurrentUserContext);

  const handleSubmit = async (e) => {
    e.preventDefault()

    const {"input-email": email, "input-password": password} = e.target.elements

    try {
      const response = await auth.Login(email.value, password.value)
      if (response.token) {
        localStorage.setItem("jwt", response.token);
        props.setLoggedIn(true);
        setLoggedInStatus(true);
        // Redirect to the main page after logging in with delay of 500 ms
        setTimeout(() => {
          history.push("/");
          // reload the browser
          window.location.reload();
        }, 500);

      } else {
        console.log("Login failed:", response.error);
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }

  }

  const handleClick = () => {
    setIsLogin(false);
  }

  return (
    <>
      <main className="main__login">
        <div className="main__login-container">
          <h1 className="main__login-title">Inicia Sesión</h1>
          <form onSubmit={handleSubmit} className="main__login-form">
            <input className="main__input-email" name="input-email" id="input-email" type="email" minLength="2"
                   maxLength="100" required placeholder="Correo electrónico"/>
            <input className="main__input-password" name="input-password" id="input-password" type="password"
                   minLength="2" maxLength="320" required placeholder="Contraseña"/>
            <button className="main__button-login">Inicia Sesión</button>
            <span className="main__login-span">¿Aún no eres miembro? <Link onClick={handleClick} to="/signup" className="main__login-link">Regístrate aquí</Link></span>
          </form>
        </div>
      </main>
    </>
  )
}


export default Login;
