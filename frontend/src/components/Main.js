  import {React, useState, useEffect, useContext} from "react";
  import '../../src/index.css';
  import {useForm} from "../hooks/useForm";
  import PopupWithForm from "./PopupWithForm";
  import Card from "./Card";

  import EditAvatarPopup from "./EditAvatarPopup";
  import AddPlacePopup from "./AddPlacePopup";
  import EditProfilePopup from "./EditProfilePopup";

  import {AvatarCustom} from "../hooks/AvatarCustom.js";
  import {PerfilCustom} from "../hooks/PerfilCustom.js";

  import {Route, Switch, Redirect, useHistory, useLocation} from "react-router-dom";
  import Login from "./Session/Login";
  import Register from "./Session/Register";
  import ProtectedRoute from "./ProtectedRoute";

  import {CurrentUserContext} from "../contexts/CurrentUserContext";

  import * as auth from "../utils/auth";

  const Main = () => {

  const [isOpenAvatarModal, openAvatarModal, closeAvatarModal] = useForm(false);
  const [isOpenProfileModal, openProfileModal, closeProfileModal] = useForm(false);
  const [isOpenPlaceModal, openPlaceModal, closePlaceModal] = useForm(false);
  const [isOpenRegisterModal, openRegisterModal, closeRegisterModal] = useForm(false);

  const {handleSubmitCard, currentUser} = useContext(CurrentUserContext);
  const {handleSubmitAvatar} = AvatarCustom();
  const {handleSubmitPerfil} = PerfilCustom();

  const [nameState, setNameState] = useState("Loading");
  const [aboutState, setAboutState] = useState("Loading");
  const [avatarState, setAvatarState] = useState("Loading");



  useEffect(() => {
    if (!currentUser) {
      return;
    }

    // check if jwt token is on local storage
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      return;
    }


    setNameState(currentUser.name);
    setAboutState(currentUser.about);
    setAvatarState(currentUser.avatar);

  }, [currentUser]);

  function handleEditAvatarClick(e) {
    e.preventDefault();

    const input = e.target;
    const spanError = input.nextElementSibling;

    if (input.value.length < input.minLength || input.value.length > input.maxLength) {
      input.classList.add("popup__input_type_error");
      spanError.textContent = "Debe tener entre " + input.minLength + " y " + input.maxLength + " caracteres";
    } else {
      input.classList.remove("popup__input_type_error");
      spanError.textContent = "";
    }
  }

  function handleEditProfileClick(e) {
    e.preventDefault();
    const input = e.target;
    const spanError = input.nextElementSibling;

    if (input.value.length < input.minLength || input.value.length > input.maxLength) {
      input.classList.add("popup__input_type_error");
      spanError.textContent = "Debe tener entre " + input.minLength + " y " + input.maxLength + " caracteres";
    } else {
      input.classList.remove("popup__input_type_error");
      spanError.textContent = "";
    }
  }

  function handleAddPlaceClick(e) {
    e.preventDefault();
    const input = e.target;
    const spanError = input.nextElementSibling;

    if (input.value.length < input.minLength || input.value.length > input.maxLength) {
      input.classList.add("popup__input_type_error");
      spanError.textContent = "Debe tener entre " + input.minLength + " y " + input.maxLength + " caracteres";
    } else {
      input.classList.remove("popup__input_type_error");
      spanError.textContent = "";
    }
  }

  // Login Logic
  const [loggedIn, setLoggedIn] = useState(false);
  const {loggedInStatus, setLoggedInStatus} = useContext(CurrentUserContext)
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    async function handleTokenCheck() {
      const token = localStorage.getItem("jwt");
      if (token) {
        try {
          const tokenValidation = await auth.CheckToken(token);
          if (tokenValidation.status===200) {
            setLoggedIn(true);
            setLoggedInStatus(true);
            history.push("/");
          }
        } catch (error) {
          console.error("Error occurred while checking token:", error);
        }
      } else {
        setLoggedInStatus(false);
      }
    }
    handleTokenCheck();
  }, [loggedInStatus, setLoggedInStatus]);

  const RedirectToHome = () => <Redirect to="/" />;

  return (
      <Switch>
        <Route exact path="/">
          {loggedIn ? <>
            <section className="profile">
              <div className="profile__container">
                <div className="profile__images">
                  <img src={avatarState} alt="a person" className="profile__img" onClick={openAvatarModal}/>
                  <img src="/images/prfile__pencil.png" alt="icon edit images" className="profile__edit"/>
                </div>
                <div className="profile__person">
                  <h2 className={`"profile__name"`}>{nameState}</h2>
                  <p className={`"profile__about"`}>{aboutState}</p>
                </div>
                <button className="profile__button-person"><img src="/images/prfile__pencil.png" alt="heart icon" className="profile__icon" onClick={openProfileModal}/>
                </button>
              </div>
              <button className="profile__btn-image" onClick={openPlaceModal}><img src="/images/profile__plus.png" alt="icon plus" className="profile__button-plus"/>
              </button>
            </section>
            <section className="elements">
              <Card/>
            </section>
            {/*Cambiar Avatar*/}
            <PopupWithForm isOpen={isOpenAvatarModal} closeModal={closeAvatarModal}>
              <EditAvatarPopup closeModal={closeAvatarModal} handleEditAvatarClick={handleEditAvatarClick} handleSubmitAvatar={handleSubmitAvatar}/>
            </PopupWithForm>
            {/*Editar Perfil*/}
            <PopupWithForm isOpen={isOpenProfileModal} closeModal={closeProfileModal}>
              <EditProfilePopup closeModal={closeProfileModal} handleEditProfileClick={handleEditProfileClick} handleSubmitPerfil={handleSubmitPerfil}/>
            </PopupWithForm>
            {/*Agregar Tarjeta*/}
            <PopupWithForm isOpen={isOpenPlaceModal} closeModal={closePlaceModal}>
              <AddPlacePopup closeModal={closePlaceModal} handleAddPlaceClick={handleAddPlaceClick} handleSubmitCard={handleSubmitCard}/>
            </PopupWithForm>
          </> : <Redirect to="/signin" />}
        </Route>
        <Route path="/signin">
          <Login setLoggedIn={setLoggedIn}/>
        </Route>
        <Route path="/signup">
          <Register setLoggedIn={setLoggedIn} isOpenModal={isOpenRegisterModal} openModal={openRegisterModal} closeModal={closeRegisterModal}/>
        </Route>
        <Route path="/register">
          <Redirect to="/signup"/>
        </Route>
        <ProtectedRoute path="/" loggedIn={loggedIn} component={RedirectToHome} />
      </Switch>
  );
  }

  export default Main;
