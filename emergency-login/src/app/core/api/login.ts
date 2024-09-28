import { RETURN_URL_KEY, TOKEN_AUTH_KEY } from '@emgencias-udo/lib/shared-react-auth';
import { config } from '../config/config';
import {
  ErrorConectServer,
  ErrorInvalidPasswordOrUser,
} from '../errors/login-client-errors';
import { UserFormType } from '../types/FormLoginType';

export const fetchLoginInApp = async (loginData: UserFormType) => {
  const resp = await getAuth(loginData);
  const { status } = resp;
  if (status === 401) {
    throw new ErrorInvalidPasswordOrUser();
  }
  const { access_token } = await resp.json();
  sendToReturnURL(access_token);
};

async function getAuth(loginData: UserFormType) {
  let resp;
  try {
    resp = await fetch(config.AUTH_URL, {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch((e) => {
      alert(e);
      throw new ErrorConectServer();
    });
  } catch (e) {
    alert(e);
    throw new ErrorConectServer();
  }
  return resp;
}
async function sendToReturnURL(access_token: string) {
  const urlSearchString = window.location.search;
  const params = new URLSearchParams(urlSearchString);
  const returnUrl = params.get(RETURN_URL_KEY);
  const url = refactorUrl(returnUrl || '', access_token);
  setTimeout(() => (window.location.href = url), 3000);
}

function refactorUrl(urlString: string, access_token: string): string {
  const url = new URL(urlString);
  const urlParams = new URLSearchParams(url.search);
  urlParams.append(TOKEN_AUTH_KEY, access_token);
  return new URL(
    url.origin + url.pathname + '?' + urlParams.toString()
  ).toString();
}
