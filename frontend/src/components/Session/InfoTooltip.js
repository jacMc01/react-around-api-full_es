import React from 'react';
import '../../blocks/InfoTooltip.css';

const InfoTooltip = (props) => {
  return(
    <>
      {props.isRegistered ? <>
        <div className="infotooltip__success">
          <div className="infotooltip__success-container">
            <img className="infotooltip__success-image" src="/images/Union.png" alt="An image of success"/>
            <h1 className="infotooltip__success-title">¡Correcto! Ya estás registrado.</h1>
          </div>
        </div>
      </>
        :
        <>
          <div className="infotooltip__fail">
            <div className="infotooltip__fail-container">
              <img className="infotooltip__fail-image" src="/images/fail.png" alt="An image of fail"/>
              <h1 className="infotooltip__fail-title">Uy, algo salió mal. Por favor, inténtalo de nuevo.</h1>
            </div>
          </div>
        </>
      }
    </>
  )
}

export default InfoTooltip;
