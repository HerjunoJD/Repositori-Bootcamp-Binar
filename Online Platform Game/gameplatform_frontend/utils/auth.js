import Cookies from 'js-cookie';

export function setAuth(name, value) {
  Cookies.set(name, value);
}

export function getAuth() {
  return Cookies.get('token');
}

export function removeAuth() {
  return Cookies.remove('token');
}
