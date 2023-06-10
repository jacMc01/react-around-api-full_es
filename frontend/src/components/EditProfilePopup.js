import React from "react";

function EditProfilePopup({ closeModal, handleEditProfileClick, handleSubmitPerfil }) {
  return (
    <>
      <h4 className="popup__title">Editar perfil</h4>
      <form onSubmit={handleSubmitPerfil} className="popup__form" name="popup__form" noValidate>
        <input
          className="popup__name popup__input"
          id="popup__name"
          type="text"
          placeholder="Nombre"
          minLength="2"
          maxLength="40"
          name="name"
          onChange={handleEditProfileClick}
          required
        />
        <span className="popup__name-error"></span>
        <input
          className="popup__about popup__input"
          id="popup__about"
          type="text"
          placeholder="Acerca de mi"
          minLength="2"
          maxLength="200"
          name="aboutMe"
          onChange={handleEditProfileClick}
          required
        />
        <span className="popup__about-error"></span>
        <button onClick={closeModal} type="submit" className="popup__button-form popup__button-form_inactive">Guardar</button>
      </form>
    </>
  );
}

export default EditProfilePopup;
