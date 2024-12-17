import Cookies from 'js-cookie';

const expiryDate = new Date(Date.now() + 3600 * 1000);

export const setToken = (token: string) => {
  Cookies.set('access_token', token, {
    expires: expiryDate,
    secure: false,
    sameSite: 'Lax',
  });
};

export const getToken = () => {
  return Cookies.get('access_token');
};

export const removeToken = () => {
  Cookies.remove('access_token');
};
