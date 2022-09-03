import {GETALLPETS, GETUSERPROFFILE} from '../actionType';
import Axios from '../../network/APIKit';
import Constants from '../../common/Constants';
import utils from '../../../utils';

export const GetAllPets = () => {
  return (dispatch, getState) => {
    const token = getState().Auth.AccessToken;
    let config = {
      headers: {
        Authorization: token,
      },
    };
    const onSuccess = ({data}) => {
      // console.log('home response ======================>', data.data);
      dispatch({
        type: GETALLPETS,
        getAllPets: data.data.records,
      });
    };
    const onFailure = error => {
      utils.showResponseError(error);
      console.log(' home response ===============>', error);
    };
    Axios.get(Constants.pets, config).then(onSuccess).catch(onFailure);
  };
};

export const HandleMarkFav = (data, id, from) => {
  return async (dispatch, getState) => {
    const token = getState().Auth.AccessToken;
    console.log('fav data =========>', token);

    let config = {
      headers: {
        Authorization: token,
      },
    };
    let body = {
      pet_id: id,
    };

    const onSuccess = ({data}) => {
      console.log('fav response ======================>', data);
    };

    const onFailure = error => {
      // utils.showResponseError(error);
      console.log(' fav error ===============>', error);
    };
    Axios.post(Constants.addRemoveFav, body, config)
      .then(onSuccess)
      .catch(onFailure);

    dispatch({
      type: GETALLPETS,
      getAllPets: data,
    });
  };
};
