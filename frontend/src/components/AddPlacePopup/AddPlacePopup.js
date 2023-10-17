import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

export default function AddPlacePopup({ isOpen, onClose, onAddCard }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleAddCard(e) {
    e.preventDefault();
    onAddCard({ name, link });
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      onClose={onClose}
      isOpen={isOpen}
      name='add-card'
      title='Новое место'
      buttonText='Создать'
      onSubmit={handleAddCard}
    >
        <input
          required
          minLength='2'
          maxLength='30'
          type='text'
          placeholder='Название'
          className='form__input form__input_card-name'
          name='input-card-name'
          value={name}
          onChange={handleNameChange}
        />
        <span className='input-card-name-error form__error'></span>
        <input
          required
          type='url'
          placeholder='Ссылка на картинку'
          className='form__input form__input_card-link'
          name='input-card-link'
          value={link}
          onChange={handleLinkChange}
        />
        <span className='input-card-link-error form__error'></span>
    </PopupWithForm>
  );
}
