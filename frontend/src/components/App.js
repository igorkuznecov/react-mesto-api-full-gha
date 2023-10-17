import React, { useState } from 'react';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import EditProfilePopup from './EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup';
import ImagePopup from './ImagePopup/ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { CurrentUserEmailContext } from '../contexts/CurrentUserEmailContext';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Register from './Register/Register';
import Login from './Login/Login';
import { checkToken } from '../utils/auth';
import ProtectedRouteElement from './ProtectedRoute/ProtectedRoute';
import InfoTooltip from './InfoTooltip/InfoTooltip';

function App() {
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [userEmail, setUserEmail] = React.useState('');
  const [infoPopupResult, setInfoPopupResult] = React.useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [test, settest] = useState('false');
  const [isInited, setIsInited] = useState(false);
  const navigate = useNavigate();

  const isSomePopupOpen =
    isInfoPopupOpen ||
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard;

  React.useEffect(() => {
    function clickClose(evt) {
      if (
        evt.target.classList.contains('popup') &&
        !evt.target.classList.contains('popup__container')
      ) {
        closeAllPopups();
      }
    }

    function closeByEsc(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isSomePopupOpen) {
      document.addEventListener('click', clickClose);
      document.addEventListener('keydown', closeByEsc);

      return () => {
        document.removeEventListener('click', clickClose);
        document.removeEventListener('keydown', closeByEsc);
      };
    }
  }, [isSomePopupOpen]);

  function closeAllPopups() {
    setIsInfoPopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const [currentUser, setCurrenUser] = useState({});

  React.useEffect(() => {
    const savedToken = localStorage.getItem('jwt');
    if (savedToken) {
      checkToken(savedToken)
        .then((res) => {
          setLoggedIn(true);
          setUserEmail(res.email);
        })
        .catch((res) => console.log(`catch err ${res}`))
        .finally(() => {
          setIsInited(true);
        });
    } else {
      setIsInited(true);
    }
  }, [loggedIn]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([user, initialCards]) => {
        setCurrenUser(user);
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(`Catch ${err}`);
      });
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(`Catch ${err}`);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id != card._id));
      })
      .catch((err) => {
        console.log(`Catch ${err}`);
      });
  }

  function handleUpdateUser({ name, about }) {
    api
      .setUserInfo(name, about)
      .then((res) => {
        setCurrenUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Catch ${err}`);
      });
  }

  function handleUpdateAvatar(obj) {
    api
      .changeAvatar(obj.avatar)
      .then((res) => setCurrenUser(res))
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Catch ${err}`);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .addCard(name, link)
      .then((newCard) => setCards([newCard, ...cards]))
      .then(() => {
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Catch ${err}`);
      });
  }

  function handleLogin() {
    console.log(localStorage.getItem('jwt'))
    setLoggedIn(true);
    navigate('/', { replace: true });
  }

  function onExit() {
    setLoggedIn(false);
    localStorage.removeItem('jwt');
    navigate('/sign-in', { replace: true });
  }

  if (!isInited) {
    return null;
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentUserEmailContext.Provider value={userEmail}>
        <Header onExit={onExit} />
      </CurrentUserEmailContext.Provider>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRouteElement
              element={Main}
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={setSelectedCard}
              handleCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
              cards={cards}
            />
          }
        />
        <Route
          path='/sign-up'
          element={
            <Register
              setIsInfoPopupOpen={setIsInfoPopupOpen}
              setInfoPopupResult={setInfoPopupResult}
            />
          }
        />
        <Route
          path='/sign-in'
          element={
            <Login
              handleLogin={handleLogin}
              setUserEmail={setUserEmail}
              setIsInfoPopupOpen={setIsInfoPopupOpen}
              setInfoPopupResult={setInfoPopupResult}
            />
          }
        />
      </Routes>
      <Footer />
      <InfoTooltip
        isOpen={isInfoPopupOpen}
        result={infoPopupResult}
        onClose={closeAllPopups}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <EditProfilePopup
        onClose={closeAllPopups}
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddCard={handleAddPlaceSubmit}
      />
      {/*  <PopupWithForm
        onClose={closeAllPopups}
        name='delete'
        title='Вы уверены?'
        buttonText='Да'
      /> */}
    </CurrentUserContext.Provider>
  );
}

export default App;
