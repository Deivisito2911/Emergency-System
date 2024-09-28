import { TOKEN_AUTH_KEY } from './url.constant';
import { redirectToLogin } from './sessionValidator';

export function getToken() {
  const tokenAuth = getTokenFromURL();
  saveToken(tokenAuth);
  if (!(TOKEN_AUTH_KEY in localStorage)) redirectToLogin();
  const token = localStorage.getItem(TOKEN_AUTH_KEY);
  return token;
}

function saveToken(tokenAuth: string | null) {
  if (tokenAuth) {
    localStorage.setItem(TOKEN_AUTH_KEY, tokenAuth);
  }
}

function getTokenFromURL() {
  const urlSearchString = window.location.search;
  const params = new URLSearchParams(urlSearchString);
  const tokenAuth = params.get(TOKEN_AUTH_KEY);
  return tokenAuth;
}
