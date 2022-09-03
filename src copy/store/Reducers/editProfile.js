import {ACTIVITY, BREEDLIST, COLORS,IDENTITYLIST} from '../actionType';

const initialState = {
  Color: [],
  Activity: [],
  Breed: [],
  Identity:[]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case COLORS:
      return {
        ...state,
        Color: action.color,
      };
    case ACTIVITY:
      return {
        ...state,
        Activity: action.activity,
      };
    case BREEDLIST:
      return {
        ...state,
        Breed: action.breeds,
      };
    case IDENTITYLIST:
      return {
        ...state,
        Identity: action.identities,
      };
  }
  return state;
};
