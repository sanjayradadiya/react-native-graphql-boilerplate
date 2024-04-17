// Actions
export const RESET_APP = 'RESET_APP';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_RESPONSE = 'LOGIN_RESPONSE';

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});
export const loginResponse = (payload?: any) => ({
  type: LOGIN_RESPONSE,
  payload,
});

export default {
  loginRequest,
  loginResponse
}
