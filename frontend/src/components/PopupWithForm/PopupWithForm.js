import React from 'react';

export default function PopupWithForm({
  isOpen,
  onClose,
  name,
  title,
  buttonText,
  children,
  onSubmit,
}) {
  return (
    <section className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button
          type='button'
          aria-label='Закрыть'
          className='popup__close-button'
          onClick={onClose}
        />
        <h2 className='popup__title'>{title}</h2>
        <form name={`${name}-form`} className={`form ${name}-form`} onSubmit={onSubmit}>
          {children}
          <button
            type='submit'
            className='form__save-button'
            name={`${name}-form-save-button`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}
