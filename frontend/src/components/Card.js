import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';


function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);

    function handleCardClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }

    const isOwn = props.card.owner._id === currentUser._id;
    const cardDeleteButtonClassName = `cards__delete-button ${!isOwn && 'cards__delete-button_hidden'}`;

    const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
    const cardLikeButtonClassName = `cards__like-button ${isLiked && 'cards__like-button_active'}`;

    return (
        <div className="cards__card">
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <img
                src={props.card.link}
                alt={props.card.name}
                className="cards__image"
                onClick={handleCardClick}
            />
            <div className="cards__info">
                <h2 className="cards__title">{props.card.name}</h2>
                <div className="cards__like-container">
                    <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="cards__like-count">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;