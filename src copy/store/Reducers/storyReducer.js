import {
  CURRENTINDEX,
  GETSTORIES,
  USERINDEX,
  UPDATESTORIES,
} from '../actionType';

const initialState = {
  Stories: [],
  UserIndex: 0,
  CurrenttIndex: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GETSTORIES:
      return {
        ...state,
        Stories: action.stories,
      };
    case USERINDEX:
      return {
        ...state,
        UserIndex: action.userindex,
      };
    case CURRENTINDEX:
      return {
        ...state,
        CurrenttIndex: action.currentindex,
      };
    case UPDATESTORIES:
      return {
        ...state,
        Stories: action.update,
      };
  }
  return state;
};
