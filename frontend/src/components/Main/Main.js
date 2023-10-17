import React from 'react';
import { api } from '../../utils/Api';
import Card from '../Card/Card';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Main({
  onEditAvatar,
  onAddPlace,
  onEditProfile,
  onCardClick,
  onCardLike,
  cards,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main>
      <section className='profile'>
        <div className='profile__avatar-container'>
          <button
            className='profile__overlay'
            onClick={() => onEditAvatar()}
          ></button>
          <img
            src={currentUser.avatar}
            className='profile__avatar'
            alt='Аватар'
          />
        </div>
        <div className='profile__info'>
          <h1 className='profile__name'>{currentUser.name}</h1>
          <button
            className='profile__edit-button'
            aria-label='Редактировать'
            type='button'
            onClick={() => onEditProfile()}
          ></button>
          <p className='profile__description'>{currentUser.about}</p>
        </div>
        <button
          className='profile__add-button'
          aria-label='Добавить место'
          type='button'
          onClick={() => onAddPlace()}
        ></button>
      </section>
      <section className='elements'>
        {cards.map((item) => (
          <Card
            key={item._id}
            card={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
