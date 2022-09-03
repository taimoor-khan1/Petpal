import {LOGIN, AUTHENTICATE, LOGOUT, ACCESSTOKEN} from '../actionType';

const initialState = {
  Login: {},
  AccessToken: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        Login: action.Login,
      };
    case AUTHENTICATE:
      return {
        ...state,
        Login: action.Login,
      };
    case ACCESSTOKEN:
      return {
        ...state,
        AccessToken: action.token,
      };
    case LOGOUT:
      return {
        ...state,
        Login: null,
        AccessToken: null,
      };
    case LOGOUT:
      return {
        ...state,
        Login: {},
      };
  }
  return state;
};
