import {NOTIFICATIONS} from '../actionType';

const initialState = {
  Notification: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATIONS:
      return {
        ...state,
        Notification: action.notification,
      };
  }
  return state;
};
