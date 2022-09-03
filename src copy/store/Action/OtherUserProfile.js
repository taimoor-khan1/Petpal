import {OTHERUSERPROFILE} from '../actionType';
import Axios from '../../network/APIKit';
import Constants from '../../common/Constants';
import utils from '../../../utils';

export const GetUserData = () => {
  return (dispatch, getState) => {
    const token = getState().Auth.AccessToken;
    // console.log('==============>=========>', token);

    let config = {
      headers: {
        Authorization: token,
      },
    };
    const onSuccess = ({data}) => {
      // console.log('Get user Data ================>', data.data);
      dispatch({
        type: OTHERUSERPROFILE,
        otheruserprofile: data.data.records,
      });
    };
    const onFailure = error => {
      utils.showResponseError(error);
      console.log('Get user Data ==================>', error);
    };
    Axios.get(Constants.getProfileURL, config).then(onSuccess).catch(onFailure);
  };
};
