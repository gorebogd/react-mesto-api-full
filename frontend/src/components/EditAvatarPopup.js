import React, {useRef} from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

    const inputRef = useRef();

    function handleSubmit(event) {
        event.preventDefault();
        props.onUpdateAvatar({
            avatar: inputRef.current.value,
        });
    }

    return (
        <PopupWithForm
            isOpen={props.isOpen}
            onClose={props.onClose}
            name='update-avatar'
            title='Обновить Аватар'
            onSubmit={handleSubmit}
            children={
                <>
                    <input
                        ref={inputRef}
                        name="avatar"
                        type="url"
                        placeholder="Введите URL аватара"
                        className="popup__input-text popup__input-text_type_avatar-source"
                        required
                    />
                    <span id="avatar-error" className='popup__error'></span>
                </>
            }
        />
    )
}

export default EditAvatarPopup;