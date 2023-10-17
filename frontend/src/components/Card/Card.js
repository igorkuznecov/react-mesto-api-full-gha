import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import React from 'react';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `element__like ${
    isLiked && 'element__like_active'
  }`;
  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <article className='element'>
      {isOwn && (
        <button
          className='element__trash'
          type='button'
          aria-label='Удалить'
          onClick={handleCardDelete}
        ></button>
      )}
      <img
        src={card.link}
        className='element__picture'
        alt={card.name}
        onClick={handleClick}
      />
      <h2 className='element__title'>{card.name}</h2>
      <div className='element__likes'>
        <button
          className={cardLikeButtonClassName}
          type='button'
          aria-label='Лайк'
          onClick={handleLikeClick}
        ></button>
        <p className='element__likes-count'>{card.likes.length}</p>
      </div>
    </article>
  );
}
