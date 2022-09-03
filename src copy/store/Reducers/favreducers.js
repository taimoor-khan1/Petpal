import {FAVPET} from '../actionType';

const initialState = {
  FavPet: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FAVPET:
      return {
        ...state,
        FavPet: action.favpet,
      };
  }
  return state;
};
