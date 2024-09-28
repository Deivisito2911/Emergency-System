import { getToken } from './tokenHelper';
import { TOKEN_AUTH_KEY } from './url.constant';
import { RETURN_URL_KEY } from './url.constant';
import { URL_AUTHORIZATION_API, URL_LOGIN } from './url.constant';
import Axios from 'axios';

// Obtiene la url y la separa del parametro
const AuthURL =
  URL_LOGIN +
  '?' +
  RETURN_URL_KEY +
  '=' +
  removeTokenAuthU(encodeURI(window.location.href));

export const sessionValidator = async () => {
  const token = getToken();
  try {
    // Manda el token por el Header
    const resp = await Axios.get(URL_AUTHORIZATION_API + 'isLogin', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!resp?.data) throw new Error('Error de sessión');
    return resp.data;
  } catch (error) {
    redirectToLogin();
  }
};

export function redirectToLogin() {
  console.log('redirect')
  localStorage.removeItem(TOKEN_AUTH_KEY);

  window.location.href = removeTokenAuthU(AuthURL);
}

function removeTokenAuthU(urlString: string): string {
  // Use URLSearchParams to handle the query string parameters
  const url = new URL(urlString);
  const urlParams = new URLSearchParams(url.search);
  urlParams.delete('TokenAuthU');
  return new URL(
    url.origin + url.pathname + '?' + urlParams.toString()
  ).toString();
}
