import { appDispatch } from '@services/store/StoreProvider';
import axios from 'axios';
import { RESET_APP, loginRequest, loginResponse } from '../store/actions';
import Config from 'react-native-config';

export const login = async data => {
  try {
    appDispatch(loginRequest());
    const url = Config.BASE_URL;
    const response = await axios.post(`${url}/auth/login`, {
      data,
    });

    if (response?.data?.success) {
    }
    appDispatch(loginResponse());
    return response;
  } catch (error) {
    console.log(error);
  } finally {
    appDispatch(loginResponse());
  }
};

export const logout = () => ({
  type: RESET_APP,
});
