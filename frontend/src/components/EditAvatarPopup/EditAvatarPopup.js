import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      onClose={onClose}
      isOpen={isOpen}
      name='avatar-change'
      title='Обновить аватар'
      buttonText='Сохранить'
    >
        <input
          required
          type='url'
          placeholder='Ссылка на картинку'
          className='form__input form__input_avatar-link'
          name='avatar-edit-input'
          ref={avatarRef}
        />
        <span className='avatar-edit-input-error form__error'></span>
    </PopupWithForm>
  );
}
