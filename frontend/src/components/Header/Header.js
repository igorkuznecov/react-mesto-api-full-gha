import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import logo from '../../images/logo.svg';
import { CurrentUserEmailContext } from '../../contexts/CurrentUserEmailContext';

export default function Header({ onExit }) {
  const location = useLocation();
  const currentUserEmail = React.useContext(CurrentUserEmailContext);
  const [email, setEmail] = useState(currentUserEmail);
  const [navElement, setNavElement] = useState('');
  const [navElementLink, setNavElementLink] = useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.pathname === '/sign-up') {
      setEmail('');
      setNavElement('Войти');
      setNavElementLink(() => goToLogin);
    } else if (location.pathname === '/sign-in') {
      setEmail('');
      setNavElement('Регистрация');
      setNavElementLink(() => goToRegister);
    } else {
      setEmail(currentUserEmail);
      setNavElement('Выйти');
      setNavElementLink(() => signOut);
    }
  }, [location, currentUserEmail]);

  function signOut() {
    onExit();
  }

  function goToLogin() {
    navigate('/sign-in', { replace: false });
  }

  function goToRegister() {
    navigate('/sign-up', { replace: true });
  }

  return (
    <header className='header'>
      <div className='header__container'>
        <img
          className='header__logo'
          src={logo}
          alt='лого'
          onClick={() => navigate('/', { replace: false })}
        />
        <div>
          <span className='header__nav'>{email}</span>
          <span className='header__nav' onClick={navElementLink}>
            {navElement}
          </span>
        </div>
      </div>
    </header>
  );
}
