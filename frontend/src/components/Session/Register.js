import {React, useState, useContext} from 'react';
import '../../blocks/Register.css';
import * as auth from '../../utils/auth'
import InfoTooltip from "./InfoTooltip";
import PopupTooltip from "../PopupTooltip";
import {Link} from "react-router-dom";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";

const Register = (props) => {
  const [isRegistered, setIsRegistered] = useState(null);

  const {setIsLogin} = useContext(CurrentUserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {"input-email": email, "input-password": password} = e.target.elements
    try {
      const response = await auth.Register(email.value, password.value)
      if (response.status === 201) {
        setIsRegistered(true);
      } else {
        setIsRegistered(false);
      }
    } catch (error) {
      setIsRegistered(false);
      console.error("Error occurred during Register:", error);
    }finally {
      props.openModal();
    }
  }

  const handleClick = () => {
    setIsLogin(true);
  }

  return (
    <>
      <main className="main__register">
        <div className="main__register-container">
          <h1 className="main__register-title">Registrarse</h1>
          <form onSubmit={handleSubmit} className="main__register-form">
            <input className="main__input-email" name="input-email" id="input-email" type="email" minLength="2" maxLength="100" required placeholder="Correo electrónico"/>
            <input className="main__input-password" name="input-password" id="input-password" type="password" minLength="2" maxLength="320" required placeholder="Contraseña"/>
            <button className="main__button-register">Registrarse</button>
            <span className="main__register-span">¿Ya eres miembro? <Link to="/signin" onClick={handleClick} className="main__register-link">Inicia sesión aquí</Link></span>
          </form>
        </div>
      </main>
      <PopupTooltip isOpen={props.isOpenModal} closeModal={props.closeModal} >
        <InfoTooltip isRegistered={isRegistered}/>
      </PopupTooltip>
    </>
  )
}

export default Register;
