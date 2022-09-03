import {CARDLIST} from '../actionType';
import Axios from '../../network/APIKit';
import Constants from '../../common/Constants';
import utils from '../../../utils';

export const CardList = () => {
  return (dispatch, getState) => {
    const token = getState().Auth.AccessToken;
    // console.log('CardList token ======================>', token);
    let config = {
      headers: {
        Authorization: token,
      },
    };
    const onSuccess = ({data}) => {
      // console.log('CardList response ======================>', data.data);
      dispatch({
        type: CARDLIST,
        cardlist: data.data,
      });
    };
    const onFailure = error => {
      // utils.showResponseError(error);
      console.log('CardList Error ===============>', error);
    };
    Axios.get(Constants.Cardslist, config).then(onSuccess).catch(onFailure);
  };
};
