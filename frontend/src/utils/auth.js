import checkRespone from './checkRespone';
export const BASE_URL = 'https://igorkuznecov.nomoredomainsrocks.ru/api';

export function register(password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password: password, email: email }),
  }).then(checkRespone);
}

export function authorize(password, email) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ password: password, email: email }),
  }).then(checkRespone);
}

export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(checkRespone);
}
