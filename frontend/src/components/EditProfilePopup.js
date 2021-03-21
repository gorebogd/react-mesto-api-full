import React, {useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    function handleNameChange(event) {
        setName(event.target.value)
    }

    function handleDescriptionChange(event) {
        setDescription(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.onUpdateUser({
            name,
            about: description,
        });
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser.about, currentUser.name, props.isOpen]);

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            name='edit-profile'
            title='Редактировать профиль'
            onSubmit={handleSubmit}
            children={
                <>
                    <input
                        name="name"
                        type="text"
                        placeholder="Имя"
                        className="popup__input-text popup__input-text_type_name"
                        minLength="2"
                        maxLength="40"
                        autoComplete="off"
                        required
                        value={name || ''}
                        onChange={handleNameChange}
                    />
                    <span id="name-error" className='popup__error'></span>
                    <input
                        name="job"
                        type="text"
                        placeholder="Профессия"
                        className="popup__input-text popup__input-text_type_job"
                        minLength="2"
                        maxLength="200"
                        autoComplete="off"
                        required
                        value={description || ''}
                        onChange={handleDescriptionChange}
                    />
                    <span id="job-error" className='popup__error'></span>
                </>

            }/>
    )
}

export default EditProfilePopup;