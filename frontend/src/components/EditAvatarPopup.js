import React from "react";

function EditAvatarPopup({ closeModal, handleEditAvatarClick, handleSubmitAvatar }) {
  return (
      <>
        <h4 className="popup__title">Cambiar foto de perfil</h4>
        <form onSubmit={handleSubmitAvatar} className="popup__form" name="popup1__form" noValidate>
          <input
              onChange={handleEditAvatarClick}
              className="popup__name popup__input"
              id="popup1__name"
              type="text"
              placeholder="URL"
              minLength="2"
              maxLength="500"
              name="name"
              required>
          </input>
          <span className="popup__name-error"></span>
          <button onClick={closeModal} className="popup__button-form popup__button-form_inactive">Guardar</button>
        </form>
      </>
  );
}

export default EditAvatarPopup;
