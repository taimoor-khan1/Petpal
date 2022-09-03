import {GETUSERPROFFILE} from '../actionType';

const initialState = {
  UserProfile: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GETUSERPROFFILE:
      return {
        ...state,
        UserProfile: action.getUserProfile,
      };
  }
  return state;
};
