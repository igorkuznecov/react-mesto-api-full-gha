/* eslint-disable */

class Api {
  constructor(config) {
    (this._url = config.url),
      (this._headers = config.headers),
      (this._authorization = config.headers.authorization);
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
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
  }

  deleteCard(ID) {
    return this._request(`${this._url}/cards/${ID}`, {
      method: 'DELETE',
      headers: this._headers,
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
      headers: this._headers,
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
        headers: this._headers,
      });
    } else {
      return this._request(`${this._url}/cards/${ID}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      });
    }
  }

  setLike(ID) {
    return this._request(`${this._url}/cards/${ID}/likes`, {
      method: 'PUT',
      headers: this._headers,
    });
  }

  deleteLike(ID) {
    return this._request(`${this._url}/cards/${ID}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  changeAvatar(link) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link,
      }),
    });
  }
}

export const api = new Api({
  url: 'http://localhost:3000',
  headers: {
    authorization: localStorage.getItem('jwt'),
        'Content-Type': 'application/json',
  },
});

/* export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '3dd76270-4c4f-4c38-aef6-b808f759a447',
    'Content-Type': 'application/json',
  },
}); */
