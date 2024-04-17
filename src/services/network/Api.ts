import { navigationRef } from '@services/routing/navigators';
import { CommonActions } from '@react-navigation/native';
import { REFRESH_TOKEN, TOKEN } from './storageTypes';
import axios from 'axios';
import 'moment-timezone';
import moment from 'moment';
import Config from 'react-native-config';
import { Storage } from '@services/storage';

const CancelToken = axios.CancelToken;
let source = CancelToken.source();

export const setAuthHeader = async (token = '') => {
  const localToken = token || Storage.getItem(TOKEN);
  axios.defaults.headers.Authorization = `Bearer ${localToken}`;
  return true;
};
export const setRefreshHeader = async (token = '') => {
  const refreshToken = token || Storage.getItem(REFRESH_TOKEN);
  axios.defaults.headers.refreshToken = refreshToken || '';
  return true;
};

// if a 401 happens, when token is expired
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const url = Config.BASE_URL;
    console.log('url ===>', url);
    const LOGIN = `${url}/auth/login`;
    const REFRESHTOKEN = `${url}/auth/refresh`;
    const refreshToken = Storage.getItem(REFRESH_TOKEN);
    let body;
    if (refreshToken) {
      body = JSON.stringify({
        refreshToken: refreshToken,
        timezone: moment.tz.guess()
      });
    }
    if (
      error &&
      error.response &&
      error.response.status === 401 &&
      originalRequest.url !== LOGIN &&
      originalRequest.url !== REFRESHTOKEN
    ) {
      console.log('originalRequest error ===> ', error);

      originalRequest._retry = true;

      axios.interceptors.response.eject();
      const setOption = {
        method: 'POST',
        url: REFRESHTOKEN,
        headers: {
          'Content-Type': 'application/json'
        },
        data: body
      };

      const tokens = await axios(setOption);

      console.log('refresh token data ---->>', tokens);
      if (tokens?.status === 200) {
        originalRequest.headers.Authorization = `Bearer ${tokens?.data?.loginToken?.accessToken}`;
        originalRequest.headers.refreshToken = tokens?.data?.loginToken?.accessToken;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const { response } = error;
    const { status } = response || {};
    const responseCode = status ? Number(status) : 503;
    if (responseCode === 401) {
      Storage.removeItem(TOKEN);
      navigationRef.dispatch(
        CommonActions.reset({ routes: [{ name: 'Login' }] })
      );
    }
    return Promise.reject(error);
  }
);

/**
 * Set header authorization
 * @param token     Authorization token
 */
/**
 * Cancel all request
 */
const cancelAllRequest = () => {
  source.cancel();
  setTimeout(() => {
    source = CancelToken.source();
  }, 1500);
};

/**
 * Handle Axios response
 * @param res   HTTP Response
 * @returns     Return data
 */
const getResponse = (res) => {
  if (res && (res.status === 200 || res.status === 201 || res.status === 204)) {
    return res.data;
  }
  throw new Error('Some error occur');
};

/**
 * Get request
 * @param path      API url path
 * @param params    Request parameters
 */
const get = (path, params) => {
  return new Promise((resolve, reject) => {
    try {
      axios.get(path, { params }).then(getResponse).then(resolve).catch(reject);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Post request
 * @param path      API url path
 * @param params    Request parameters
 */
const post = (path, params) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(path, params || {})
        .then(getResponse)
        .then(resolve)
        .catch(reject);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Put request
 * @param path      API url path
 * @param params    Request parameters
 * @param headers   Request headers
 */
const put = (path, params, headers) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .put(path, params || {}, { headers })
        .then(getResponse)
        .then(resolve)
        .catch(reject);
    } catch (error) {
      reject(error);
    }
  });
};

const remove = (path, params, headers) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .delete(path, { data: params }, { headers })
        .then(getResponse)
        .then(resolve)
        .catch(reject);
    } catch (error) {
      reject(error);
    }
  });
};

export default {
  get,
  post,
  put,
  remove,
  cancelAllRequest
};
