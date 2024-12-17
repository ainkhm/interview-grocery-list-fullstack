import ky from 'ky';
import Cookies from 'js-cookie';

export const apiClient = ky.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        const token = Cookies.get('access_token');
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ]
  },
});