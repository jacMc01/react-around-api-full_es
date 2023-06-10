import React from "react";
import '../blocks/PopupTooltip.css';

const PopupTooltip = ({children, isOpen, closeModal}) => {

  return (
    <>
      <section className={`popup ${isOpen && "is-open"}`}>
        <div className="popuptooltip__profile-container">
          <button className="popuptooltip__button-close" onClick={closeModal}><img src="/images/close_icon.png" alt="close icon"/></button>
          {children}
        </div>
      </section>
    </>
  );
}

export default PopupTooltip;
