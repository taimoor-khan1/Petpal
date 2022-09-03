import {GETALLPETS} from '../actionType';

const initialState = {
  GetAllPets: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GETALLPETS:
      return {
        ...state,
        GetAllPets: action.getAllPets,
      };
  }
  return state;
};
