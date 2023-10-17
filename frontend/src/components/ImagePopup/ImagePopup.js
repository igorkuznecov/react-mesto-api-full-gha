import React from 'react';

export default function ImagePopup({ onClose, card }) {
  return (
    <section
      className={`popup popup_type_lightbox ${card ? 'popup_opened' : ''}`}
    >
      <div className='popup__image-container'>
        <button
          type='button'
          aria-label='Закрыть'
          className='popup__close-button'
          onClick={onClose}
        />
        <img
          className='popup__lightbox-image'
          src={card?.link}
          alt={card?.name}
        />
        <p className='popup__image-description'>{card?.name}</p>
      </div>
    </section>
  );
}
