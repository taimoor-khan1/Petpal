import {COLORS, BREEDLIST, ACTIVITY, IDENTITYLIST} from '../actionType';
import Axios from '../../network/APIKit';
import Constants from '../../common/Constants';
import utils from '../../../utils';

export const GetColors = () => {
  return (dispatch, getState) => {
    const token = getState().Auth.AccessToken;
    let config = {
      headers: {
        Authorization: token,
      },
    };
    const onSuccess = ({data}) => {
      //   console.log('Colors  response ======================>', data);
      dispatch({
        type: COLORS,
        color: data.data,
      });
    };
    const onFailure = error => {
      utils.showResponseError(error);
      console.log(' colors error ===============>', error);
    };
    Axios.get(Constants.color, config).then(onSuccess).catch(onFailure);
  };
};

export const GetActivity = () => {
  return (dispatch, getState) => {
    const token = getState().Auth.AccessToken;
    let config = {
      headers: {
        Authorization: token,
      },
    };
    const onSuccess = ({data}) => {
      // console.log('Activity response ======================>', data.data);
      dispatch({
        type: ACTIVITY,
        activity: data.data,
      });
    };
    const onFailure = error => {
      utils.showResponseError(error);
      console.log(' Activity error ===============>', error);
    };
    Axios.get(Constants.Activity, config).then(onSuccess).catch(onFailure);
  };
};

export const GetBreed = () => {
  return (dispatch, getState) => {
    const token = getState().Auth.AccessToken;
    let config = {
      headers: {
        Authorization: token,
      },
    };
    const onSuccess = ({data}) => {
      console.log('Breed Response ======================>', data.data);
      dispatch({
        type: BREEDLIST,
        breeds: data.data,
      });
    };
    const onFailure = error => {
      utils.showResponseError(error);
      console.log(' Breed Error ===============>', error);
    };
    Axios.get(Constants.Breed, config).then(onSuccess).catch(onFailure);
  };
};
export const GetIdentities = () => {
  return (dispatch, getState) => {
    const token = getState().Auth.AccessToken;
    let config = {
      headers: {
        Authorization: token,
      },
    };
    const onSuccess = ({data}) => {
      console.log('identities Response ======================>', data.data);
      dispatch({
        type: IDENTITYLIST,
        identities: data.data,
      });
    };
    const onFailure = error => {
      utils.showResponseError(error);
      console.log(' identities Error ===============>', error);
    };
    Axios.get(Constants.GetDocumentTypes, config)
      .then(onSuccess)
      .catch(onFailure);
  };
};
