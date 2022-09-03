import {CARDLIST} from '../actionType';

const initialState = {
  CreditCardList: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CARDLIST:
      return {
        ...state,
        CreditCardList: action.cardlist,
      };
  }
  return state;
};
