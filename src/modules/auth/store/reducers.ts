import {
  RESET_APP,
  LOGIN_REQUEST,
  LOGIN_RESPONSE,
} from '@modules/auth/store/actions';

const initialState = {
  loading: false,
  loginData: {},
};

export const core = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case LOGIN_REQUEST: {
      return {...state, loading: true};
    }
    case LOGIN_RESPONSE: {
      return payload
        ? {...state, loginData: payload, loading: false}
        : {...state, loading: false};
    }

    case RESET_APP: {
      return initialState;
    }

    default:
      return state;
  }
};
