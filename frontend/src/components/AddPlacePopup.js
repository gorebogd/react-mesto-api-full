import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [placeName, setPlaceName] = useState("");
  const [placeLink, setPlaceLink] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    props.onAddPlace({
      name: placeName,
      link: placeLink,
    });
    setPlaceName("");
    setPlaceLink("");
  }

  function handlePlaceNameInput(event) {
    setPlaceName(event.target.value);
  }

  function handlePlaceLinkInput(event) {
    setPlaceLink(event.target.value);
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="add-card"
      title="Новое место"
    >
      <input
        name="place"
        type="text"
        placeholder="Название"
        className="popup__input-text popup__input-text_type_place"
        minLength="1"
        maxLength="30"
        autoComplete="off"
        required
        value={placeName}
        onChange={handlePlaceNameInput}
      />
      <span id="place-error" className="popup__error"></span>
      <input
        name="image"
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input-text popup__input-text_type_url"
        autoComplete="off"
        required
        value={placeLink}
        onChange={handlePlaceLinkInput}
      />
      <span id="image-error" className="popup__error "></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
