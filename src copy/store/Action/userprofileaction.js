import {GETUSERPROFFILE} from '../actionType';
import Axios from '../../network/APIKit';
import Constants from '../../common/Constants';
import utils from '../../../utils';

export const GetUserData = response => {
  return (dispatch, getState) => {
    const token = getState().Auth.AccessToken;
    let config = {
      headers: {
        Authorization: token,
      },
    };
    const onSuccess = ({data}) => {
      response({success: 1, data: data.data.records});
      dispatch({
        type: GETUSERPROFFILE,
        getUserProfile: data.data.records,
      });
    };
    const onFailure = error => {
      response({success: 0, data: null});

      // utils.showResponseError(error);
      console.log('Get user Data ==================>', error);
    };
    Axios.get(Constants.getProfileURL, config).then(onSuccess).catch(onFailure);
  };
};
export const ClearProfileData = response => {
  return (dispatch, getState) => {
    const token = getState().Auth.AccessToken;
    dispatch({
      type: GETUSERPROFFILE,
      getUserProfile: {},
    });
  };
};
export const ProfileEditScreen = () => {
  return (dispatch, getState) => {
    const token = getState().Auth.AccessToken;
  };
};
