import React from "react";

const PopupWithForm = ({children, isOpen, closeModal}) => {

  return (
    <>
    <section className={`popup ${isOpen && "is-open"}`}>
      <div className="popup__profile-container">
        <button className="popup__button-close" onClick={closeModal}><img src="/images/close_icon.png" alt="close icon"/></button>
        {children}
      </div>
    </section>
    </>
  );
}

export default PopupWithForm;
