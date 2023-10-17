import React from 'react';
import successImg from '../../images/Success.svg'
import errorImg from '../../images/Error.svg'

export default function InfoTooltip({ isOpen, result, onClose }) {

  const [img, setImg] = React.useState('');
  const [text, setText] = React.useState('');

  function statusSwitch() {
    if (result) {
      setImg(successImg)
      setText('Вы успешно зарегистрировались!')
    } else {
      setImg(errorImg)
      setText('Что-то пошло не так! Попробуйте ещё раз.')
    }
  }

  React.useEffect(() => {
    statusSwitch()
  }, [result]);

  /* React.useEffect(() => {
    function clickClose(evt) {
      if (
        evt.target.classList.contains('popup') &&
        !evt.target.classList.contains('popup__container')
      ) {
        onClose();
      }
    }

    function closeByEsc(evt) {
      if (evt.key === 'Escape') {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener('click', clickClose);
      document.addEventListener('keydown', closeByEsc);

      return () => {
        document.removeEventListener('click', clickClose);
        document.removeEventListener('keydown', closeByEsc);
      };
    }
  }, [isOpen]); */

  return (
    <section className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className='popup__container'>
        <button
          type='button'
          aria-label='Закрыть'
          className='popup__close-button'
          onClick={onClose}
        />
        <img className='popup__info-pic' src={img} />
        <h2 className='popup__title popup__title_centered'>{text}</h2>
      </div>
    </section>
  );
}
