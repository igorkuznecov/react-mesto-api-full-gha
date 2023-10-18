/* eslint-disable */

class Api {
  constructor(config) {
    (this._url = config.url)
  }

  _request(url, options) {
    return fetch(url, options).then(this._handleRespone);
  }

  _handleRespone(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error ${res.status}`);
    }
  }

  getCards() {
    return this._request(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        authorization: localStorage.getItem('jwt'),
        'Content-Type': 'application/json',
      },
    });
  }

  addCard(name, link) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: localStorage.getItem('jwt'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  deleteCard(ID) {
    return this._request(`${this._url}/cards/${ID}`, {
      method: 'DELETE',
      headers: {
        authorization: localStorage.getItem('jwt'),
        'Content-Type': 'application/json',
      },
    });
  }

  getUserInfo() {
    return this._request(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        authorization: localStorage.getItem('jwt'),
        'Content-Type': 'application/json',
      },
    });
  }

  setUserInfo(name, about) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: localStorage.getItem('jwt'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
  }

  changeLikeCardStatus(ID, state) {
    if (state) {
      return this._request(`${this._url}/cards/${ID}/likes`, {
        method: 'PUT',
        headers: {
          authorization: localStorage.getItem('jwt'),
          'Content-Type': 'application/json',
        },
      });
    } else {
      return this._request(`${this._url}/cards/${ID}/likes`, {
        method: 'DELETE',
        headers: {
          authorization: localStorage.getItem('jwt'),
          'Content-Type': 'application/json',
        },
      });
    }
  }

  setLike(ID) {
    return this._request(`${this._url}/cards/${ID}/likes`, {
      method: 'PUT',
      headers: {
        authorization: localStorage.getItem('jwt'),
        'Content-Type': 'application/json',
      },
    });
  }

  deleteLike(ID) {
    return this._request(`${this._url}/cards/${ID}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: localStorage.getItem('jwt'),
        'Content-Type': 'application/json',
      },
    });
  }

  changeAvatar(link) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: localStorage.getItem('jwt'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: link,
      }),
    });
  }
}

export const api = new Api({
  url: 'https://igorkuznecov.nomoredomainsrocks.ru/api'
});

/* export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '3dd76270-4c4f-4c38-aef6-b808f759a447',
    'Content-Type': 'application/json',
  },
}); */
