import React from 'react';

function ImagePopup(props) {
    return (
        <div className={`popup popup_type_image ${props.isOpen && 'popup_opened'}`}>
            <div className="popup__container_type_image">
                <button type="button" className="popup__close-button" onClick={props.onClose}></button>
                <figure className="popup__figure">
                    <img src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''}
                         className="popup__image"/>
                    <figcaption className="popup__description">{props.card ? props.card.name : ''}</figcaption>
                </figure>
            </div>
        </div>

    )
}

export default ImagePopup;