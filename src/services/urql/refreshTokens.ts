
import { logout } from '@modules/auth/controller/auth.controller';
import { REFRESH_TOKEN, TOKEN } from '@services/network/storageTypes';
import { Storage } from '@services/storage';
import { appDispatch } from '@services/store/StoreProvider';
import moment from 'moment';
import Config from 'react-native-config';

let refreshTokensPromise = null;

const executeRefreshTokens = async () => {
  const REFRESH_TOKEN_URL = `${Config.BASE_URL}/auth/refresh`;
  try {
    let body;
    const refreshToken = Storage.getItem(REFRESH_TOKEN);

    if (refreshToken) {
      body = JSON.stringify({
        refreshToken: refreshToken,
        timezone: moment.tz.guess(),
      });
    }

    const response = await fetch(REFRESH_TOKEN_URL, {
      method: 'POST',
      body,
      headers: {'content-type': 'application/json; charset=utf-8'},
    });

    const tokens = await response.json();

    if (tokens.success) {
     Storage.setItem(
        TOKEN,
        tokens.loginToken?.accessToken,
      );
      Storage.setItem(
        REFRESH_TOKEN,
        tokens.loginToken?.refreshToken,
      );
      return tokens.loginToken;
    } else {
      Storage.removeItem(TOKEN);
      appDispatch(logout());
    }
  } finally {
    refreshTokensPromise = null;
  }
};

const refreshTokens = async () => {
  if (refreshTokensPromise) {
    return refreshTokensPromise;
  }

  refreshTokensPromise = executeRefreshTokens();
  return refreshTokensPromise;
};

export default refreshTokens;
