import React from "react";

function AddPlacePopup({ closeModal, handleAddPlaceClick, handleSubmitCard }) {
  return (
    <>
      <h4 className="popup__title">Nuevo lugar</h4>
      <form onSubmit={handleSubmitCard} className="popup__form" name="popup3__form">
        <input
          className="popup__name popup__input"
          id="popup3__name"
          type="text"
          placeholder="Titulo"
          maxLength="30"
          minLength="2"
          onChange={handleAddPlaceClick}
        />
        <span className="popup__name-error"></span>
        <input
          className="popup__about popup__input"
          id="popup3__about"
          type="url"
          placeholder="Enlace de la imagen"
          minLength="2"
          maxLength="200"
          onChange={handleAddPlaceClick}
          required
        />
        <span className="popup__name-error"></span>
        <button onClick={closeModal} className="popup__button-form popup__button-form_inactive">Guardar</button>
      </form>
    </>
  );
}

export default AddPlacePopup;
