
import React from 'react';
import resultFail from '../images/signup-popup-result-fail.svg';
import resultSuccess from '../images/signup-popup-result-success.svg';

function InfoTooltip(props) {
  const resultText = props.resultText;
  let resultImg;

  if (props.signUpResult === true) {
    resultImg = resultSuccess;
  } else {
    resultImg = resultFail;
  }
  return (
    <div className={`signup-popup ${props.isOpen ? 'signup-popup_opened' : ''}`}>
      <div className='signup-popup__container'>
        <img src={resultImg} alt='картинка результата' className='signup-popup__img' />
        <p className='signup-popup__text'>{resultText}</p>
        <button className='signup-popup__close-button' onClick={props.onClose} />
      </div>
    </div>
  );
};

export default InfoTooltip;