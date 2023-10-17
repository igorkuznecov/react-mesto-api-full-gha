import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      name='profile-edit'
      title='Редактировать профиль'
      buttonText='Сохранить'
      onSubmit={handleSubmit}
    >
        <input
          required
          minLength='2'
          maxLength='40'
          placeholder='Имя'
          type='text'
          className='form__input form__input_profile-name'
          name='profile-form-name'
          value={name || ''}
          onChange={handleNameChange}
        />
        <span className='profile-form-name-error form__error'></span>
        <input
          required
          minLength='2'
          maxLength='200'
          placeholder='О себе'
          type='text'
          className='form__input form__input_profile-job'
          name='profile-form-job'
          value={description || ''}
          onChange={handleDescriptionChange}
        />
        <span className='profile-form-job-error form__error'></span>
    </PopupWithForm>
  );
}
