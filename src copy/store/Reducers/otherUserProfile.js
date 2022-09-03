import {OTHERUSERPROFILE} from '../actionType';

const initialState = {
  OtherUser: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case OTHERUSERPROFILE:
      return {
        ...state,
        OtherUser: action.otheruser,
      };
  }
  return state;
};
